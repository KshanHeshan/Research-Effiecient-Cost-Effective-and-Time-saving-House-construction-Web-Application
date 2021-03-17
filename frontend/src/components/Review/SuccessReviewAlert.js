import React, { Component } from 'react';
import {FaCheckCircle} from 'react-icons/fa';

class SuccessReviewAlert extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            // Success alert for reviews
                <div className="alert alert-success" role="alert">
                   <FaCheckCircle className="fa-2x" />  {this.props.message}
                </div>
        );
    }
}

export default SuccessReviewAlert;