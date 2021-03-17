import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaGlobeAsia, FaPhoneSquare} from 'react-icons/fa';

import ErrorGif from '../css/img/source.gif';
import MainLogo from '../css/img/HomeConstruction_Main_logo.png';

class Error404 extends Component {
    render() {
        return (
            <main className="main">
                {/* Error 404 page content */}
                <div className="error_info">

                    <div className="describ text-center">
                        
                        <img className="error_page_logo" src={MainLogo} alt=""></img>
                        <h1><span className="error_topic">404</span> Error Occured</h1>
                        <h3>Looks like you lost your way....</h3>
                        <h4>The Page you are looking for couldn't find.</h4>
                        <h5>Please check the following to continue.</h5>
                        <br />

                        <h5>
                            <ul className="text-justify">
                                <li>Please check the URL you typed whether it is correct or not.</li>
                                <li>Please check your <FaGlobeAsia /> internet connection.</li>
                                <li>Else, you can redirect to home page by clicking the below Home Button.</li>
                            </ul>
                        </h5>

                        <h5>If you are experiencing any other problem, you can <FaPhoneSquare /> contact us.</h5>
                        <h5>Or</h5>
                        <h5  className="other_links">Drop an Email to <Link to="#">HomeConstruction@complains.com</Link></h5>
                    </div>

                    <img className="error_image" src={ErrorGif} alt=""></img>

                    <div className="button_area">
                        
                        <hr />
                        <Link className="btn btn-default fire_gradient buttn_submit" to="/">Home</Link>
                        
                    </div>
                </div>
            </main>
        );
    }
}

export default Error404;
