import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import User from '../pages/users/user';
import helloWorld from "../pages/hello/hello";
import EditUser from "../pages/users/userEdit";


const Router = () => {
    console.log("router start render ...");
    return(
            <Switch>
                <Route exact path="/" component={helloWorld}/>
                <Route exact path="/user" component={User}/>
                <Route exact path="/user/editUser" component={EditUser}/>

            </Switch>
)};


export default Router;