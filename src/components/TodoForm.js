import React from 'react';
import shortid from 'shortid';

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
                        onChange={this.handleValue}
                    />
                    <button disabled={!this.props.formValue} onSubmit={this.handleSubmit}>Add</button>
                </form>
            </div>
        )
    }
}