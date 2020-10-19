import React from 'react';

export default class Todo extends React.Component{
    
    handleTodo = () => {
        this.props.onClick(this.props.todo)
    }

    handleDelete = () => {
        this.props.onDelete(this.props.todo.id)
    }

    handleValue = (e) => {
        this.props.onChange(e.target.value)
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.onCancel(this.props.todo)
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.props.onEdit({
            id: this.props.selectedTodo.id,
            text: this.props.selectedTodo.text
        }, this.props.todo)
    }

    renderTitle = () => {
        if (this.props.todo.id === this.props.selectedTodo.id) {
            return <form>
                <input onChange={this.handleValue}/>
                <button onClick={this.handleEdit}>Edit</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </form>
        } 
        return <div value={this.props.selectedTodo} onClick={this.handleTodo}>
            {this.props.todoValue}
            <button onClick={this.handleDelete}>X</button>
        </div>
    }

    render() {
        return(
            <div>{this.renderTitle(this.props.todo)}</div>
        // <div>{this.props.todoValue}</div>
        )
    }
}