import React from 'react';
import UserForm from './components/UserForm';
import TodoList from './App';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const AppRoutes = (props) => (
    <Router>
      <div>
        <Route exact path="/" component={UserForm} />
        <Route path="/todolist" component={TodoList}/>
      </div>
    </Router>
)
export default AppRoutes;