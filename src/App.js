import React from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import {List, Map} from 'immutable';
import axios from 'axios';
import shortid from 'shortid';
import {NavLink} from 'react-router-dom';

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

const api = axios.create({
  baseURL: `http://localhost:3001`
})

const Links = () => (
  <nav>
      <NavLink 
        activeStyle={{color: 'red', textDecoration: "none"}} 
        to="/"
      >Home</NavLink>
  </nav>
)

class TodoList extends React.Component{
  constructor(){
    super();
    this.state={
      todos: new List(),
      formValue: '',
      selectedTodo: new Map(),
      formValueEdit: ''
    }
  }

  componentDidMount(){
    this.getTodos();
  }

  getTodos = async () => {
    try{
      const {data} = await api.get('/');
      const todos = data.map(todo => Map(todo));
      this.setState({
        todos: List(todos)
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

      await api.post("/", data);
      const todos =  this.state.todos.push(Map(data));
      
      this.setState({
        todos: todos
      });
    } catch(err){
      console.log(err)
    } 
  }

  deleteTodo = async (todo) => {
    try {
      const indexTodo = this.state.todos.indexOf(todo);
      await api.delete(`/${todo.toJS().id}`);
      const todos = this.state.todos.delete(indexTodo);
      this.setState({
        todos: todos
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

      await api.put(`/${mapTodo.toJS().id}`, updatedTodo.toJS());

      console.log('updatedTodo', updatedTodo);
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
    console.log('todo' , todo);
    const mapTodo = this.state.selectedTodo.withMutations(map => map.set("id", todo.get("id")).set("text", todo.get("text")))
    console.log('mapTodo', mapTodo);
    this.setState({
      selectedTodo: mapTodo
    })
  }

  render(){
    return(
      <div style={container}>
        <Links/>
        <h1>TodoList with React Express Axios Immutable</h1>
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
