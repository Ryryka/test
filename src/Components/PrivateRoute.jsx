import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'));
export const PrivateRoute = ({ component: Component, ...rest }) => (
 
    <Route {...rest} render={props => (

        (user && user.token)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/' }} />
        // : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)