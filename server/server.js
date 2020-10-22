const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');


server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

let todos = [];
let users = ["jerem", "hicham", "julien", "sompha"];
let usersTodos = [
    {"jerem": ["laver le chat", "devenir un bon dev"]},
    {"hicham": ["transmettre son savoir"]},
    {"julien": ["développer Jalia", "soulever du KettleBell"]},
    {"sompha": ["changer la batterie du vélo", "imprimer des tickets"]}
]
let usersTodosMapping = {
    "jerem": 0,
    "hicham": 1,
    "julien": 2,
    "sompha": 3,

}

server.get('/todolist/:name', function(req,res){
    const name = req.params.name;
    Object.values(usersTodos[usersTodosMapping[name]]).map(values => {
        values.map(val => {
            return todos = [...todos, {id: shortid.generate(), text: val}];
        })
    });
    res.send(todos)
})

server.get('/users', function(req, res){
    res.send(users)
})

server.post('/users', function(req,res){
    const newUser = Object.keys(req.body);
    users = [...users, newUser];
    res.json(newUser)
})

server.get('/', function(req,res){
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
        res.json(todos);
    } else {
        res.send('Todo dont exist');
    }
})

server.delete('/:id', function(req, res) {
    todos = todos.filter(todo => todo.id !== req.params.id);
    res.json({todos});
})

server.listen(3001)