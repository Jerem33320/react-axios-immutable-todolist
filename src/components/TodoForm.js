import React from 'react';
import shortid from 'shortid';

const formInput = {
    border: "none",
    outline: "none",
    height: "30px",
    fontSize: "1rem",
    borderRadius: "6px",
    paddingLeft: "14px",
}

const formBtn = {
    padding: "4px",
    border: "none",
    backgroundColor: "#ff6f47",
    borderRadius: "6px",
    fontSize: "18px",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "white",
    marginLeft: "20px"
}

export default class TodoForm extends React.Component{
    handleValue = (e) => {
        this.props.onChange(e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text: this.props.formValue,
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        style={formInput}
                        onChange={this.handleValue}
                    />
                    <button style={formBtn} disabled={!this.props.formValue} onSubmit={this.handleSubmit}>Add</button>
                </form>
            </div>
        )
    }
}