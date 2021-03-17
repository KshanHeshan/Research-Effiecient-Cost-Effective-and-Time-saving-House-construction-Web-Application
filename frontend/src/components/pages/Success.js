import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Success extends Component {

    // Back button functionality
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <main className="main">
                {/* Success page content */}
                <div className="text-center">
                    <h1>Thank you...!!!!</h1>
                </div>
                <hr/>
                <div className="d-flex justify-content-center">
                    {/* Back button */}
                    <Link to="/dashboard" className="text-white btn btn-lg fire_gradient">Finish</Link>
                </div>
            </main>
        )
    }
}

export default Success
