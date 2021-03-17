import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import cookie from 'js-cookie';
import { connect } from 'react-redux';

import {FaExclamationCircle} from 'react-icons/fa';
import RegisterLogo from '../css/img/HomeConstruction_Main_logo.png';
import Error from './Error';

class CustomerRegister extends Component {

    // Constructor
    constructor(props) {
        super(props);

        // State
        this.state = {
            name:"",
            bio:"",
            email:"",
            address:"",
            service_price:0,
            job_spec:"service seeker",
            service_type:"customer",
            reigion:"",
            zip_code:"",
            password:"",
            password_confirmation:"",
            mobile_number:"",
            tele_number:"",
            errors:{}
        }
    }

    // Form data handler
    handleForm = (e) => {
        e.preventDefault();
        const data = {
            name:this.state.name,
            bio:this.state.bio,
            email:this.state.email,
            service_price:this.state.service_price,
            address:this.state.address,
            job_spec:this.state.job_spec,
            service_type:this.state.service_type, 
            reigion:this.state.reigion, 
            zip_code:this.state.zip_code, 
            password:this.state.password, 
            password_confirmation: this.state.password_confirmation,
            mobile_number:this.state.mobile_number,
            tele_number:this.state.tele_number
        }

        // customer data send through an api to backend
        axios.post("http://localhost:8000/api/auth/register", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            // cookie.set('user', res.data.user);
            this.props.setLogin(res.data.user);
            this.props.history.push('/dashboard');
        })
        .catch(e => this.setState({errors: e.response.data.errors}))
        console.log(data);
        
    }

    // Input handler
    handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }
    
    render() {
        const error = this.state.errors
        return (
            <main className="main">
                {/* customer Registration page content*/}
                <div className="registry-box">
                    <img className="registerPage_img" src={RegisterLogo} alt=""></img>
                    <div>
                        <h2>Welcome to Home Construction Registration </h2>
                        <h3>Join with us today to make your dream home come true.</h3>
                        
                    </div>
                    <div>
                                <div className="text-center">
                                    { error.errors ? (<h5 className="alert alert-danger  d-flex justify-content-center fade-in "><FaExclamationCircle/>&nbsp;{error.errors}</h5>):("")}
                                </div>
                    </div>
                    <hr/>

                    {/* Form */}
                    <form action="" method="POST" className="text-center" name="regForm"  onSubmit={this.handleForm}>
                    <h4>Account Info</h4>
                        <div className="form-row">
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['name']?this.state.errors['name']:null}/>
                                <input name="name" type="text" className="form-control" id="inputPassword" placeholder="Type your Full Name here...." onChange={this.handleInput}/>
                            </div>
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Type your Email here...."  onChange={this.handleInput}/>
                            </div>
                            <br/>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 profile_inputs">
                                <Error error={this.state.errors['bio']?this.state.errors['bio']:null}/>
                                <textarea name="bio" type="text" className="form-control" id="inputPassword" placeholder="Enter your own bio here....." onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['password']?this.state.errors['password']:null}/>
                                <input name="password" type="password" className="form-control" id="inputPassword" placeholder="Type your password here...." onChange={this.handleInput}/>
                            </div>
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['password_confirmation']?this.state.errors['password_confirmation']:null}/>
                                <input name="password_confirmation" type="password" className="form-control" id="inputEmail" placeholder="Confirm your password here...." onChange={this.handleInput}/>
                            </div>
                        </div>
                        <hr/>
                        <h4>Personal Info</h4>
                        <div className="form-group profile_inputs">
                            <Error error={this.state.errors['address']?this.state.errors['address']:null}/>
                            <input name="address" type="text" className="form-control" id="inputAddress" placeholder="Type your Address here...." onChange={this.handleInput}/>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['zip_code']?this.state.errors['zip_code']:null}/>
                                <input name="zip_code" type="number" className="form-control" id="inputPassword" placeholder="Type your Zip Code here...." onChange={this.handleInput}/>
                            </div>
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['reigion']?this.state.errors['reigion']:null}/>
                                <select className="custom-select" name="reigion" id="inputGroupSelect01" onChange={this.handleInput}>
                                    <option value="Central">Central</option>
                                    <option value="North-Western">North-Western</option>
                                    <option value="North-Central">North-Central</option>
                                    <option value="Northern">Northern</option>
                                    <option value="Eastern">Eastern</option>
                                    <option value="Uwa">Uwa</option>
                                    <option value="Southern">Southern</option>
                                    <option value="Western">Western</option>
                                    <option value="Sabaragamuwa">Sabaragamuwa</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['mobile_number']?this.state.errors['mobile_number']:null}/>
                                <input name="mobile_number" type="text" className="form-control" id="inputPassword" placeholder="Type your Mobile Number here...." onChange={this.handleInput}/>
                            </div>
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['tele_number']?this.state.errors['tele_number']:null}/>
                                <input name="tele_number" type="text" className="form-control" id="inputEmail" placeholder="Type your Telephone Number here...." onChange={this.handleInput}/>
                            </div>
                        </div>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-lg fire_gradient text-white" type="submit">Register</button>
                        </div>
                    </form>
                    <div className="other_links">
                            <Link to="/login">Already have an account ??</Link><br />
                    </div>
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

export default connect(null, mapDispatchToProps)(CustomerRegister)
