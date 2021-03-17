import React, { Component } from 'react';
import {FaTimesCircle} from 'react-icons/fa';

class ErrorWorksAlert extends Component {

    // Constructor
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            // Error message alert
            <div className="alert alert-danger" role="alert">
                <FaTimesCircle className="fa-2x"/>  {this.props.message}
            </div>
        );
    }
}

export default ErrorWorksAlert;