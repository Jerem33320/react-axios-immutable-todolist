import React from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import {List} from 'immutable';
import axios from 'axios';
import shortid from 'shortid';

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

// Faire une List (comme ce que tu avais) où chaque Todo est un Map
// comme ca: structure immutable, List + les objets dedans
// quand tu recuperes Todos depuis le server, tu map dessus
// et tu transforme chaque entrée en Map
// et après tu ne fais que modifier des map, ajouter map et supprimer un map
// quand tu envoies au server, il faut pas envoyer un map,
// il faut envoyer un objet JS, donc tu fais tonMap.toJS()
// la logique serveur ne changera pas

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
    try {
      await api.delete(`/${id}`)
      const indexTodo = this.state.todos.indexOf(id);
      const delTodos = this.state.todos.delete(indexTodo);
      this.setState({
        todos: delTodos
      })
      this.getTodos();
    } catch (err) {
      console.log(err);
    }
  }

  handleTodoEdit = async (todo) => {
    try {
      const updatedTodoText = this.state.formValueEdit;
      const indexTodo = this.state.todos.indexOf(todo);
      const updatedTodo = this.state.todos.update(indexTodo, todo =>
      ({
        id: todo.id,
        text: updatedTodoText
      }));

      await api.put(`/${todo.id}`, updatedTodo);

      this.setState({
        todos: updatedTodo,
        formValueEdit: updatedTodo.text,
        selectedTodo: {}
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
      selectedTodo: {}
    })
  }

  actualTodo = (todo) => {
    this.setState({
      selectedTodo: todo
    })
  }
  
  render(){
    return(
      <div style={container}>
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
