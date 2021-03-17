import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import cookie from 'js-cookie';

import Error from '../user/Error';
import MainLogo from '../css/img/HomeConstruction_Main_logo.png';
import { connect } from 'react-redux';

class Login extends Component {

    // constructor
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors:{}
        }
    }

    // Form data handler
    handleForm = (e) => {
        e.preventDefault();
        const data = {email:this.state.email, password:this.state.password}

        // send data to the backend
        axios.post("http://localhost:8000/api/auth/login", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            this.props.setLogin(res.data.user);
        })
        .catch(e => this.setState({errors: e.response.data.errors}))
    }

    // input handler
    handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    render() {

        return (
            <main className="main">
                {/* Login page content */}
                <div className="login-box">
                    <div>
                        <img className="loginPage_img"  src={MainLogo} alt=""></img>
                        <h1>Welcome to Login</h1>
                        <h3>Qualified and professional personnel for your dream home.</h3>
                    </div>
                    <div>
                        <h3><Error error={this.state.errors['error_result']?this.state.errors['error_result']:null}/></h3>
                    </div>
        
                    <form className="text-center" onSubmit={this.handleForm}>
                        
                    
                        <div className="text-center text_inputs">
                        <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                            <input className="text" type="text" name="email" id="user_email" placeholder="Enter your E-mail" onChange={this.handleInput}/>
                            
                        </div>
                        <div className="text-center text_inputs">
                            <Error error={this.state.errors['password']?this.state.errors['password']:null}/>
                            <input className="" type="password" name="password" id="user_password" placeholder="Enter your password" onChange={this.handleInput}/>
                        </div>

                        <div>
                            <button className="btn btn-default fire_gradient buttn_submit" type="submit">Log in</button>
                        </div>

                        <div className="other_links">
                            
                            <Link to="/reset">Did you forget your password ??</Link><br />
                            <Link to="/register">Don't have an account yet ??</Link><br />
                            
                        </div>
                        
                    </form>
                </div>
            </main>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin : (user) => dispatch ({type:"SET_LOGIN", payload:user})
    }
}

export default connect(null, mapDispatchToProps)(Login)