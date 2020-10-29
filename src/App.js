import React from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import {List, Map} from 'immutable';
import axios from 'axios';
import shortid from 'shortid';
import User from './entities/User';

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  fontFamily: "Arial, Helvetica, sans-serif",
  backgroundColor: "rgb(236, 187, 96)",
  color: "white"
}

// const navStyle = {
//   color: 'white', 
//   fontWeight: "bold",
//   textDecoration: "none", 
//   border: "1px solid white",
//   padding: "10px"
// }

class TodoList extends React.Component{
  constructor(){
    super();
    this.state={
      todos: new List(),
      formValue: '',
      selectedTodo: new Map(),
      formValueEdit: '',
      currentUser: '',
      username: '',
    }
  }

  componentDidMount(){
    this.getUserTodos();
  }

  getUserTodos = async () => {
    try{
      const data = await axios.get('http://localhost:3001/shop');
      const userObject = Object.values(data.data);
      const immUser = new User(userObject[0]);

      const name = Object.keys(data.data).shift();
      const findTodos = data.data[name].todos;
      const todos = findTodos.map(todo => Map(todo));
      this.setState({
        todos: List(todos),
        currentUser: immUser,
        username: name
      });
    } catch(err){
      console.log(err);
    }
  }

  addTodo = async () => {
    try {
      const data = {
        id: shortid.generate(),
        text: this.state.formValue
      };

      await axios.post('http://localhost:3001/'+ this.state.username, data);
      const todos =  this.state.todos.push(Map(data));

      this.state.currentUser.todos.push(todos);
      this.setState({
        todos: todos,
      });
    } catch(err){
      console.log(err)
    } 
  }

  deleteTodo = async (todo) => {
    try {
      await axios.delete('http://localhost:3001/'+ this.state.username + `/${todo.toJS().id}`);
      const indexTodo = this.state.todos.indexOf(todo);
      const todos = this.state.todos.delete(indexTodo);

      this.setState({
        todos: todos,
      })
    } catch (err) {
      console.log(err);
    }
  }

  handleTodoEdit = async (todo) => {
    try {
      const mapTodo = Map(todo)
      const updatedTodoText = this.state.formValueEdit;
      const indexTodo = this.state.todos.indexOf(mapTodo);
      const updatedTodo = this.state.todos.update(indexTodo, todo =>
        Map({
          id: mapTodo.toJS().id,
          text: updatedTodoText
        }));

      this.setState({
        todos: updatedTodo,
        formValueEdit: updatedTodo.text,
        selectedTodo: this.state.selectedTodo.clear()
      })
    } catch (err) {
      console.log(err);
    }
  }

  handleValue = (value) => {
    this.setState({
      formValue: value
    })
  }

  editChange = (value) => {
    this.setState({
      formValueEdit: value
    })
  }

  handleTodoCancel = () => {
    this.setState({
      selectedTodo: this.state.selectedTodo.clear()
    })
  }

  actualTodo = (todo) => {
    const mapTodo = this.state.selectedTodo.withMutations(map => map.set("id", todo.get("id")).set("text", todo.get("text")))
    this.setState({
      selectedTodo: mapTodo
    })
  }

  // logout = async() => {
  //   await api.get('/logout');
  //   this.setState({
  //     islogged: false,
  //     currentUser: 'unset'
  //   })
  //   console.log("vous êtes déco");
  // }

  render(){
    return(
      <div style={container}>
        {/* <Links /> */}
        {/* <nav>
            <NavLink 
              activeStyle={navStyle}
              to="/login"
            ><button onClick={this.logout}>Logout</button></NavLink>
        </nav> */}
        <h1>Welcome on your TodoList {this.state.username}</h1>
        <TodoForm 
          formValue={this.state.formValue}
          onChange={this.handleValue}
          onSubmit={this.addTodo}
        />
        {
          this.state.todos.map(todo => {
            return (
              <Todo
                todo={todo}
                key={todo.id}
                todoValue={todo.text}
                onDelete={this.deleteTodo}
                selectedTodo={this.state.selectedTodo}
                onChange={this.editChange}
                onClick={this.actualTodo}
                onEdit={this.handleTodoEdit}
                onCancel={this.handleTodoCancel}
              />
            )
          })
        } 
      </div>
    )
  }
}

export default TodoList;
