import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

class UpdateServiceProvider extends Component {

    // continue button function
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    // back button function
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {

        // Calling handlechange method from props
        const {handleChange} = this.props;

        // Values from props
        const {values: {
            carpenterNuMeters,
            carpenterJobSpec,
            timberType,
            masonNuMeters,
            masonJobSpec,
        }} = this.props;

        return (
            <main className="main">
                {/* Carpentry and Masonry Cost Prediction Info page content */}
                <div className="text-center">
                    <h1>Carpentry and Masonry Cost Prediction Info</h1>
                </div>
                <div>
                <div className="content container">
                <hr/>
                    <br/>
                    <br/>
                        <div className="prediction_table">
                            <table className="table table-hover">
                                <thead className="text-center fire_gradient">
                                    <tr>
                                        <th className="text-left"><b>Description :</b></th>
                                        <th className="text-right"><b></b></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Carpentry info */}
                                    <tr>
                                        <td className="text-left"><b>Carpentry</b></td>
                                        <td className="text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Job Specification :</td>
                                        <td className="text-right">
                                            <select className="custom-select" name="carpenterJobSpec" id="inputGroupSelect01" value={carpenterJobSpec} onChange={handleChange('carpenterJobSpec')} required>
                                                <option defaultValue>Choose...</option>
                                                <option value="Only Interior">Only Interior</option>
                                                <option value="Only Ceiling">Only Ceiling</option>
                                                <option value="Both Interior and Ceiling">Both Interior and Ceiling</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Timber Type :</td>
                                        <td className="text-right">
                                            <select className="custom-select" name="carpenterJobSpec" id="inputGroupSelect01" value={carpenterJobSpec} onChange={handleChange('timberType')} required>
                                                <option defaultValue>Choose...</option>
                                                <option value="Thekka">Thekka</option>
                                                <option value="Burutha">Burutha</option>
                                                <option value="Mahogani">Mahogani</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Total Meters :</td>
                                        <td className="text-right">
                                            <input type="number" className="form-control" id="validationServer01" name="carpenterNuMeters" value={carpenterNuMeters} onChange={handleChange('carpenterNuMeters')} required />
                                        </td>
                                    </tr>
                                    {/* Masonry info */}
                                    <tr>
                                        <td className="text-left"><b>Masonry</b></td>
                                        <td className="text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Job Specification :</td>
                                        <td className="text-right">
                                            <select className="custom-select" name="masonJobSpec" id="inputGroupSelect01" value={masonJobSpec} onChange={handleChange('masonJobSpec')} required>
                                                <option defaultValue>Choose...</option>
                                                <option value="Only Walls">Only Walls</option>
                                                <option value="Only Floors">Only Floors</option>
                                                <option value="Both Walls and Floors">Both Walls and Floors</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Total Square Meters :</td>
                                        <td className="text-right">
                                            <input type="number" className="form-control" id="validationServer01" name="masonNuMeters" value={masonNuMeters} onChange={handleChange('masonNuMeters')} required />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr/>
                        </div>
                        </div>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="text-left left_btn col-4">
                        {/* Back button */}
                        <Link className="" to="#"  onClick={this.back}><FaArrowCircleLeft className="arrow_left_btn"/></Link> Total Cost Prediction Info
                    </div>
                    <div className="text-center col-4"></div>
                    <div className="text-right right_btn col-4">
                        {/* Continue button */}
                        Predictions Info Summary <Link className="" to="#"  onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default UpdateServiceProvider
