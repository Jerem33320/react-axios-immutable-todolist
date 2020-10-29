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
    const name = req.params.name;
    const userTodos = usersTodos[name].todos;
    res.json(userTodos)
})

//AddTodo
server.post('/:name', function(req, res){
    const name = req.params.name;
    const todoValue = req.body;
    console.log("TEST ADD Todo : ", todoValue);

    let username = usersTodos[name].name;
    console.log('username', username);
    console.log('todos', usersTodos[name].todos);
    ///travailler sur addTodo check username 
    ///pas besoin de faire if
    ///push todo dans les todos du user
             
    // if(name === username) {
    //     // usersTodos.map((key, index) => {
    //     //     usersTodos.user[key] = [...usersTodos.user[key], todoValue];
    //     //     const userTodo = usersTodos.user[key];
    //     //     usersTodos = {...usersTodos, userTodo}
    //     //     console.log("userstodos of add todo", usersTodos);
    //     // })
    // }
    let todos = usersTodos[name].todos;
    todos = [...todos, todoValue];
    console.log("todos", todos);
    res.json(todos)
})

//DELETE TODO
server.delete('/:name/:id', function(req, res) {
    const name = req.params.name;
    const id = req.params.id;
    
    const todos = usersTodos.user[name].todos.filter(todo => todo.id !== id);
    res.json({todos})

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