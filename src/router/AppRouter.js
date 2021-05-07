import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import BaseComponent from '../components/Shared/BaseComponent';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import LoginComponent from '../components/Login/LoginComponent';
import HomeComponent from '../components/Home/HomeComponent';
import TicketComponent from '../components/Ticket/TicketComponent';
import CreateTicketComponent from '../components/Ticket/CreateTicketComponent';
import UserComponent from '../components/Users/UsersComponent';
import NotFoundComponent from '../components/NotFound/NotFoundComponent';

const AppRouter = () => (
    <BrowserRouter>
        <BaseComponent>
            <Switch>
                <PublicRoute path="/login" component={LoginComponent} />
                <PrivateRoute path="/" exact component={HomeComponent} />
                <PrivateRoute path="/ticket/:id" component={TicketComponent}/>
                <PrivateRoute path="/create-ticket" component={CreateTicketComponent} />
                <AdminRoute path="/user" component={UserComponent} />
                <Route path="*" component={NotFoundComponent} />
            </Switch>
        </BaseComponent>
    </BrowserRouter>
);

export default AppRouter;