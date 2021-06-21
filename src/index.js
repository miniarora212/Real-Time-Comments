import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './App';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteComments from './DeleteComments';
import NotFound from './NotFound';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" component={App} exact />
        <Route path="/delete-comments" component={DeleteComments} exact />
        <Route path="**" component={NotFound}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
