const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

let todos = [];

server.get('/', function(req,res){
    console.log(todos);
    res.send(todos)
})

server.post('/', function(req, res){
    const newTodo = {id: todos.length + 1, ...req.body};
    todos =  [...todos, newTodo];

    res.json(newTodo)
})

server.put('/:id', function(req, res) {
    const id = req.params.id;
    const updatedTodo = [...req.body];
    if(id != null) {
        todos = updatedTodo;
        console.log('todos', todos);
        res.json(todos);
    } else {
        res.send('Todo dont exist');
    }
})

// server.put('/:id', function(req, res) {
//     const newTodo = {id: todos.length + 1, ...req.body};
//     todos =  [...todos, newTodo];

//     res.json(newTodo)
// })

server.delete('/:id', function(req, res) {
    todos = todos.filter(todo => todo.id !== req.params.id);
    res.json({todos});
})

server.listen(3001)