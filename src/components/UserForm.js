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
    backgroundColor: "black",
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

// au depart 1 user tombe dans la vue où il y'a un formulaire de connexion, 
// lorsqu'il clic sur se co tu fais axios et tu:
// get la list des users depuis le serveur nodejs,
// s'il existe tu passes à la prochaine route (lui montrer les todos).
// s'il n'existe pas, l'enmener vers une route ou il va s'enregistrer 
// donc tu dois ajouter des routes (react-router) + 
// maintenir un autre tableau des users en plus de celui des todos que
// tu as + creer des routes express pour les users
// gerer les routes express et faire des checks basics sur l'existence
// d'un user ou son ajout dans le tableau users

export default class UserForm extends React.Component{
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

    getUser = async (e) => {
        e.preventDefault();
        try{
          const {data} = await api.get('/');
          console.log(data);
          if (data.includes(this.state.formValue)){
              console.log("vous etes co");
              this.setState({
                loggedIn: true
              });              
          } else {
            console.log("vous n'êtes pas un user autorisé");
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
                <h1>Se Connecter à l'App TodoList</h1>
                <form onSubmit={this.getUser}>
                    <input 
                        style={formInput}
                        onChange={this.handleValue}
                    />
                    <button style={formBtn} disabled={!this.state.formValue} onSubmit={this.getUser}>Se connecter</button>
                </form>
            </div>
        )
    }
}