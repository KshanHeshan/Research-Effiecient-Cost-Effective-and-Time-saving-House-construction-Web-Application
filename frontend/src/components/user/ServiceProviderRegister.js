import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import axios from 'axios';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import RegisterLogo from '../css/img/HomeConstruction_Main_logo.png';
import Error from '../user/Error';

export class ServiceProviderRegister extends Component {

    // Constructor
    constructor(props) {
        super(props);
        // State
        this.state = {
            name:"",
            bio:"",
            service_price:"",
            email:"",
            address:"",
            job_spec:'',
            service_type:'',
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
            service_price:this.state.service_price,
            email:this.state.email, 
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

        // sending new user data to the backend to store
        axios.post("http://localhost:8000/api/auth/register", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            // cookie.set('user', res.data.user);
            this.props.setLogin(res.data.user);
            this.props.history.push('/dashboard');
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
                {/* Register page content */}
                <div className="registry-box">
                    <img className="registerPage_img" src={RegisterLogo} alt=""></img>
                    <div>
                        <h2>Welcome to Service Provider Registration </h2>
                        <h3>Join with us today to be a successfull and professional personnel.</h3>
                        
                    </div>
                    <hr/>
                    <form action="" method="POST" className="text-center" name="regForm"  onSubmit={this.handleForm}>
                    <h4>Account Info</h4>
                        <div className="form-row">
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['name']?this.state.errors['name']:null}/>
                                <input name="name" type="text" className="form-control" id="inputName" placeholder="Type your Full Name here...." onChange={this.handleInput}/>
                            </div>
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Type your Email here...."  onChange={this.handleInput}/>
                            </div>
                            <br/>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['service_type']?this.state.errors['service_type']:null}/>
                                <select className="custom-select" name="service_type" id="inputGroupSelect01" onChange={this.handleInput}>
                                    <option defaultValue>Choose your service type...</option>
                                    <option value="Masonry">Architect</option>
                                    <option value="Carpentry">Carpentry</option>
                                    <option value="Masonry">Masonry</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6 profile_inputs">
                                <Error error={this.state.errors['job_spec']?this.state.errors['job_spec']:null}/>
                                <select className="custom-select" name="job_spec" id="inputGroupSelect01" onChange={this.handleInput} placeholder="Job">
                                    <option defaultValue>Choose your Job Specification...</option>
                                    <optgroup label="Carpentry">
                                    <hr/>    
                                        <option value="only interior">Only Interior</option>
                                        <option value="only ceiling">Only Ceiling</option>
                                        <option value="both interior and ceiling">Both interior and ceiling</option>
                                    </optgroup>
                                    <optgroup label="Masonry">
                                    <hr/>
                                        <option value="only walls">Only Walls</option>
                                        <option value="only floor">Only floor</option>
                                        <option value="both walls and floor">Both walls and floors</option>
                                    </optgroup>
                                </select>
                            </div>
                            <br/>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 profile_inputs">
                                <Error error={this.state.errors['service_price']?this.state.errors['service_price']:null}/>
                                <input name="service_price" type="number" className="form-control" id="inputPassword" placeholder="Enter your service price here....." onChange={this.handleInput}/>
                            </div>
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
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin : (user) => dispatch ({type:"SET_LOGIN", payload:user})
    }
}

export default connect(null, mapDispatchToProps)(ServiceProviderRegister)
