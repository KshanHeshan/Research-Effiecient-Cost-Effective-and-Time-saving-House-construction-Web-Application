import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaAt} from 'react-icons/fa';
import MainLogo from '../css/img/HomeConstruction_Main_logo.png';

class PasswordReset extends Component {
    render() {
        return (
            <div>
                <main>
                    {/* Password reset page content */}
                <div className="text-center">
                <img className="loginPage_img"  src={MainLogo} alt=""></img>
                    <h1>Welcome to Password Reset Page !</h1>
                    <h5>Please type your E-mail in the following text-field.</h5>
                    <h5> You will be getting an email to the e-mail you mentioned if you are a registered user previously.</h5>  
                </div>
                <div className="password_reset-box">
                    <form action="">
                        <div className="text-center text_inputs">
                            <FaAt /> &nbsp;
                            <input type="email" name="" placeholder="Type the E-mail..."></input>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-default fire_gradient buttn_submit" type="submit">Send E-mail</button>
                        </div>
                        <div className="other_links text-center">
                            <Link to="/login">Remembered Password ??</Link><br />
                        </div>
                    </form>
                </div>
                </main>
            </div>
        );
    }
}

export default PasswordReset
