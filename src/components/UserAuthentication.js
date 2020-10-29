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

export default class UserAuthentication extends React.Component{
    constructor(){
        super();
        this.state={
          users: new List(),
          authIn: false,
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
            // {"jerem":{"name":"jerem","todos":[]}}
            const name = this.state.formValue;
            const user = {
                [name]: {
                  name: name,
                  todos: []
                }
              }

          await axios.post('http://localhost:3001/auth', user);
          
          const users = this.state.users.push(user);
          
          if (user[name].name === name){
              console.log("Auth success");
              this.setState({
                authIn: true,
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
        if(this.state.authIn === true){
            return(<Redirect to="/login"/>)
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