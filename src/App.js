import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { PrivateRoute } from "./Components/PrivateRoute";
import LoginPage from './Components/LoginPage/LoginPage';
import UsersTable from './Components/UsersTable/UsersTable';

/** Component representing an App, with Login Form,
 *  after successful login redirect to Users Table, 
 * otherwise redirect to Login Page. 
 * @extends  React.Component
*/
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>            
                    <PrivateRoute exact path="/command" component={UsersTable} />
                    <Route path="/" component={LoginPage} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;