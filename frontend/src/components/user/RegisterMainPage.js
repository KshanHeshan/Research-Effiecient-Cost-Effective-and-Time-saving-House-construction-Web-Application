import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MainLogo from '../css/img/HomeConstruction_Main_logo.png';

class RegisterMainPage extends Component {
    render() {
        return (
            <main className="main">
                {/* Register main page content */}
                <div className="registry-box">
                    <img className="registerPage_img" src={MainLogo} alt=""></img>
                    <div>
                        <h1>Welcome to Registration </h1>
                        <h3>Join with us today to be a successfull and professional personnel.</h3>
                    </div>
                    <hr/>
                    <div className="container">
                        <div className="row text-white container">
                            {/* Path to service providers */}
                            <div className="col-md-6 container">
                                <Link to="/provi_register" className="btn btn-lg text-white fire_gradient shadow">Service/ Job Suppliers</Link>
                                <br/>
                                <p className="text-dark container">
                                    The people who are looking forward to provide their services and make their Business success.
                                </p>
                            </div>
                                                  {/* Path for the customer */}
                            <div className="col-md-6 container">
                                <Link to="/cus_register" className="btn btn-lg text-white fire_gradient shadow">Service Seekers</Link>
                                <br/>
                                <p className="text-dark container">
                                    The people who are looking for the services for their dream house construction and make their dream come true.
                                </p>
                            </div>                        
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default RegisterMainPage
