import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {List} from 'immutable';


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

export default class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
          loggedIn: false,
          authenticate: false,
          formValue: '',
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
          const user = await axios.get('http://localhost:3001/login');
          const name = this.state.formValue;
          
          if (user.data[name].name === name){
              console.log("vous etes co");
              this.setState({
                loggedIn: true,
                formValue: name
              });              
          } else {
            console.log("vous n'êtes pas un user autorisé");
            this.setState({
                authenticate: true,
              }); 
          }
        } catch(err){
          console.log(err);
        }
    }

    render(){
        if(this.state.loggedIn === true){
            return(<Redirect to={"/shop"}/>)
        } else if (this.state.authenticate === true){
            return(<Redirect to="/authenticate"/>)
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