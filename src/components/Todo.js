import React from 'react';

const trashBtn = {
    background: "#ff6f47",
    color: "white",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginLeft: "20px",
    borderRadius: "4px"
}

const todoStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20px",
    paddingLeft: "14px",
    transition: "all 1s ease",
    fontSize: "1.4rem"
}

export default class Todo extends React.Component{
    handleTodo = () => {
        this.props.onClick(this.props.todo)
    }

    handleDelete = () => {
        this.props.onDelete(this.props.todo)
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
        this.props.onEdit(this.props.todo)
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
            <button style={trashBtn} onClick={this.handleDelete}>X</button>
        </div>
    }

    render() {
        return(
            <div style={todoStyle}>{this.renderTitle(this.props.todo)}</div>
        )
    }
}