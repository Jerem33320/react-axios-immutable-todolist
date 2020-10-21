import React from 'react';
import {List} from 'immutable';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const homeStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgb(33, 83, 150)",
    color: "white",
    fontfamily: "Arial, sans-serif"
}

const formInput = {
    border: "none",
    outline: "none",
    height: "30px",
    fontSize: "1rem",
    borderRadius: "6px",
    paddingLeft: "14px",
}

const formBtn = {
    padding: "6px",
    border: "none",
    backgroundColor: "#ff6f47",
    borderRadius: "6px",
    fontSize: "18px",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "white",
    marginLeft: "20px"
}

const api = axios.create({
    baseURL: `http://localhost:3001/users`
})

export default class UserAuthentication extends React.Component{
    constructor(){
        super();
        this.state={
          users: new List(),
          loggedIn: false,
          formValue: ''
        }
      }

    handleValue = (e) => {
        this.setState({
            formValue: e.target.value
        })
    }

    createUser = async (e) => {
        e.preventDefault();
        try{
          const data = this.state.formValue;
          await api.post('/', data);
          console.log(data);
          const users = this.state.users.push(data);
          
          if (data.includes(this.state.formValue)){
              console.log("vous etes co");
              this.setState({
                loggedIn: true,
                users: users
              });              
          } else {
            console.log("Authentication failed");
          }
        } catch(err){
          console.log(err);
        }
    }

    render(){
        if(this.state.loggedIn === true){
            return(<Redirect to="/todolist"/>)
        }
        return(
            <div style={homeStyle}>
                <h1>S'authentifier sur l'App TodoList</h1>
                <form onSubmit={this.createUser}>
                    <input 
                        style={formInput}
                        onChange={this.handleValue}
                    />
                    <button style={formBtn} disabled={!this.state.formValue} onSubmit={this.createUser}>S'authentifier</button>
                </form>
            </div>
        )
    }
}