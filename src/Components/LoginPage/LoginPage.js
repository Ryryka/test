import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './LoginPage.css';
import axios from 'axios';

/** Component representing a Login Form. 
 * @extends Component
*/
class LoginPage extends Component {
    /**    
     * @param {string} email - The email value.
     * @param {string} pwd - The password value.
     */
    constructor(props) {
        super(props);

        this.initialState = {
            email: '',
            pwd: ''
        };

        this.state = this.initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // validateField(fieldName, value) {
    //     let fieldValidationErrors = this.state.formErrors;
    //     let emailValid = this.state.emailValid;
    //     let passwordValid = this.state.passwordValid;
    //   switch(fieldName) {
    //       case 'email':
    //         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    //         fieldValidationErrors.email = emailValid ? '' : ' is invalid';
    //         break;
    //       case 'password':
    //         passwordValid = value.length >= 3;
    //         fieldValidationErrors.password = passwordValid ? '': ' is too short';
    //         break;
    //       default:
    //         break;
    //     }
    //     this.setState({formErrors: fieldValidationErrors,
    //                     emailValid: emailValid,
    //                     passwordValid: passwordValid
    //                   }, this.validateForm);
    //   }

    /** @function validateForm
     * @return true if email and password fields are not empty. 
     */
    validateForm() {
        return this.state.email.length > 0 && this.state.pwd.length > 0;
    }
    /** @function handleChange
    *  Runs on every keystroke to update the React state
    */
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    /** @function handleSubmit
    *  Send post requests using axios to the server
    */
    handleSubmit = event => {
        event.preventDefault();

        const { email, pwd } = this.state;

        axios.post('http://194.187.110.62:20001/login', { email, pwd })
            .then((user) => {
                if (user.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user.data));
                    this.props.history.push('/command')
                }
                return user.data;
            })
            .catch((error) => {
                this.setState({ error: error.message });
                // this.setState({ error: error.response.data.error });
                console.log(error.response.status + ' error', error);
                if (error.response.status == 401) {
                    this.setState({ error: 'Wrong password or email' })
                } else {
                    this.setState({ error: error.response.data.error })
                }
            });

    }

    render() {
        const { error } = this.state;
        // const shouldMarkError = (field) => {
        //     const hasError = errors[field];
        //     const shouldShow = this.state.touched[field];
        //     return hasError ? shouldShow : false;
        // }

        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>

                    <p className={error ? "error-message" : ""}>{error}</p>

                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        // className={errors.email ? "error" : ""}
                        />
                    </FormGroup>
                    <FormGroup controlId="pwd" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.pwd}
                            onChange={this.handleChange}
                            type="password"
                            minLength="3"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}
export default LoginPage