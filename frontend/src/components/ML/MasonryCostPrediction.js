import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

export default class MasonryCostPrediction extends Component {

    // Continue button function
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    // Back button function
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <main className="main">
                {/* Masonry Cost Prediction page content */}
                <div className="text-center">
                    <h1>Masonry Cost Prediction</h1>
                </div>
                
                <div>
                <div className="content container">
                <hr/>
                    <br/>
                        <div className="prediction_table">
                            <table className="table table-hover">
                                <thead className="text-center fire_gradient">
                                    <tr>
                                        <th className="text-left"><b>Description :</b></th>
                                        <th className="text-right"><b>Cost Estimation (Rs.) :</b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-left">Job Specification :</td>
                                        <td className="text-right">Both Floor and Tilings</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">Total Square Feets :</td>
                                        <td className="text-right">20000</td>
                                    </tr>
                                    <tr className="cost_prediction">
                                        <td className="text-left fire_gradient"><b>Total cost (Rs.) :</b></td>
                                        <td className="text-right">620,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                </div>
                <br/>
                <br/>
                <div className="row col-12">
                    <div className="text-right left_btn col-4">
                        <Link className="" to="#"  onClick={this.back}><FaArrowCircleLeft className="arrow_left_btn"/></Link> Re-search a carpenter
                    </div>
                    <div className="col-4"></div>
                    <div className="text-right right_btn col-4">
                        Select a Mason <Link className="" to="#"  onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
                
            </main>
        )
    }
}
