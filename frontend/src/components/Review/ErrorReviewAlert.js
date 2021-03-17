import React, { Component } from 'react';
import {FaTimesCircle} from 'react-icons/fa';

class ErrorReviewAlert extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            // Error alert for reviews
            <div className="alert alert-danger" role="alert">
                <FaTimesCircle className="fa-2x"/>  {this.props.message}
            </div>
        );
    }
}

export default ErrorReviewAlert;