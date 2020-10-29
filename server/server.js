const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

let usersTodos = {}

//AUTH
//FORMAT {"jerem": {"name": "jerem", "todos": []}}
server.post('/auth', function(req, res){
    let user = req.body;
    usersTodos = {...usersTodos, user};
    usersTodos = usersTodos.user;
        console.log(usersTodos);
    res.json(usersTodos);
})

//LOGIN
server.get('/login', function(req, res){
    res.json(usersTodos)
})

//getTodos
server.get('/shop', function(req,res){
    res.status(200)
    res.json(usersTodos)
})

//AddTodo
server.post('/:name', function(req, res){
    const name = req.params.name;
    const todoValue = req.body;
    // console.log("TEST ADD Todo : ", todoValue);
   
    let todos = usersTodos[name].todos;
    todos = [...todos, todoValue];
    // console.log("todos", usersTodos[name].todos);
    res.json(todos)
})

//DELETE TODO
server.delete('/:name/:id', function(req, res) {
    const name = req.params.name;
    const id = req.params.id;
    
    console.log("deltodos:" , usersTodos[name].todos);
    const todos = usersTodos[name].todos.filter(todo => todo.id !== id);
    res.json(todos)
})

server.put('/:id', function(req, res) {
    const id = req.params.id;
    const updatedTodo = req.body;
    if(id != null) {
        console.log("TEST UPDATE TODO", updatedTodo);
        res.json(updatedTodo);
    } else {
        res.send('Todo dont exist');
    }
})


// Logout
server.get('/logout', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout();
  
    // destroy session data
    // req.session = null;
  
    // redirect to homepage
    res.redirect('/');
});

//si user different de null c'est qu'il existe
// Object.keys(todosByUsers).find(name => name === req.body.name) 

server.listen(3001)