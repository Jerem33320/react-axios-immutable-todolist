import React from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import {List} from 'immutable';
import axios from 'axios';
import shortid from 'shortid';

const api = axios.create({
  baseURL: `http://localhost:3001`
})

export default class TodoList extends React.Component{
  constructor(){
    super();
    this.state={
      todos: new List(),
      formValue: '',
      selectedTodo: {},
      formValueEdit: ''
    }
  }

  componentDidMount(){
    this.getTodos();
  }

  getTodos = async () => {
    try{
      const {data} = await api.get('/');
      this.setState({
        todos: List(data)
      });
    } catch(err){
      console.log(err);
    }
  }

  addTodo = async () => {
    try {
      let todo = await api.post('/',{
        id: shortid.generate(),
        text: this.state.formValue
      });
      const mapTodo = todo.data;
      const newArrOfTodos = [...this.state.todos, mapTodo];
      this.setState({
        todos: newArrOfTodos
      });
      this.getTodos();
    } catch(err){
      console.log(err)
    } 
  }

  deleteTodo = async (id) => {
    console.log(id);
    try {
      await api.delete(`/${id}`)
      // const newDelArr = this.state.todos.filter(todo => console.log(todo))
      // // console.log(newDelArr);
      // this.setState({
      //   todos: newDelArr
      // })
      const indexTodo = this.state.todos.indexOf(id)
      this.setState({
        todos: this.state.todos.delete(indexTodo)
      })
      this.getTodos();
    } catch (err) {
      console.log(err);
    }
  }

  // const immTodoToSendToServer = maTodo.toJS()
  // const todoFromServer = await monServer.....
  // // il update son tableau de son coté et renvoie la meme todo
  // const immTodoAgain = Map(todoFromServer)
  // const updatedTodos = this.state.todos.push(immTodoAgain)
  // editTodo = async (id) => {
  //   try {
  //     await api.put(`/${id}`)
  //     this.setState({
  //       formValue: this.state.todos.update(id, todo => todo[id].text)
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // edit= async (todo) => {
  //   const immTodo = todo.toJS();
  //   try {
  //     const todoFromServer = await api.post('/');
  //     const immTodoServer = Map(todoFromServer);
  //     this.setState({
  //       todos: this.state.todos.push(immTodoServer),
  //       formValue: ''
  //     });
  //     this.getTodos();
  //   } catch(err){
  //     console.log(err)
  //   } 
  // }

  handleValue = (value) => {
    this.setState({
      formValue: value
    })
  }

  // deleteTodo = (todo) => {
  //   const indexTodo = this.state.todos.indexOf(todo)
  //   this.setState({
  //     todos: this.state.todos.delete(indexTodo)
  //   })
  // }

  // editChange = (value) => {
  //   this.setState({
  //     formValueEdit: value
  //   })
  // }

  handleTodoCancel = () => {
    this.setState({
      selectedTodo: {}
    })
  }

  // handleTodoEdit = (selectedTodo, todo) => {
  //   const updatedTodoText = this.state.formValueEdit;
  //   const indexTodo = this.state.todos.indexOf(todo);
  //   this.setState({
  //     todos: this.state.todos.update(indexTodo, () => todo = 
  //     {
  //       id: selectedTodo.id,
  //       text: updatedTodoText
  //     }),
  //     selectedTodo: {} 
  //   })
  // }

  actualTodo = (todo) => {
    this.setState({
      selectedTodo: todo
    })
  }
  
  render(){
    return(
      <div>
        <h1>Test</h1>
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
          }
          )
        }
      </div>
    )
  }
}
