import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';
import axios from 'axios';

class ServiceProvider extends Component {

    constructor(){
        super();
        this.state={
            carpMeters:'',
            masMeters:''
        }
    }

    componentDidMount(){
        // Values from props
        const {values: {
            area ,
            height,
            no_floors ,
            no_rooms ,
            no_bathrooms ,
            no_doors ,
            no_windows ,
            wall_material ,
            celing_material ,
            floor_material ,
            roof_material ,
            carpenterNuMeters,
            carpenterJobSpec,
            timberType,
            masonNuMeters,
            masonJobSpec,
            loc_nature,
            loc_situation,
            timber_for_carpentry,
            timber_for_celing,
            no_pillers,
            no_of_door_frames,
            no_of_window_frames,
            no_of_walls,
        }} = this.props;

        // Data
        const data = {
            area:area,
            height:height,
            no_floors:no_floors,
            no_rooms:no_rooms,
            no_bathrooms:no_bathrooms,
            no_doors:no_doors,
            no_windows:no_windows,
            wall_material:wall_material,
            celing_material:celing_material,
            floor_material:floor_material,
            roof_material:roof_material,
            carpenterNuMeters:carpenterNuMeters,
            carpenterJobSpec:carpenterJobSpec,
            timberType:timberType,
            masonNuMeters:masonNuMeters,
            masonJobSpec:masonJobSpec,
            loc_nature:loc_nature,
            loc_situation:loc_situation,
            timber_for_carpentry:timber_for_carpentry,
            timber_for_celing:timber_for_celing,
            no_pillers:no_pillers,
            no_of_door_frames:no_of_door_frames,
            no_of_window_frames:no_of_window_frames,
            no_of_walls:no_of_walls,
        }

    // Retrieve all predictions
    axios.post("http://127.0.0.1:5000/predict_cost", data)
    .then(res => this.setState({
        carpMeters:res.data.carp_meters,
        masMeters:res.data.mas_meters,
    }));
    }

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

        // Calling handle change function from props
        const {handleChange} = this.props;

        return (
            <main className="main">
                {/* Carpentry and Masonry Cost Prediction Info content */}
                <div className="text-center">
                    <h1>Carpentry and Masonry Cost Prediction Info</h1>
                    {this.state.carpMeters}
                    {this.state.masMeters}
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
                                    {/* Carpentry data */}
                                    <tr>
                                        <td className="text-left"><b>Carpentry</b></td>
                                        <td className="text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Job Specification :</td>
                                        <td className="text-right">
                                            <select className="custom-select" name="carpenterJobSpec" id="inputGroupSelect01" onChange={handleChange('carpenterJobSpec')} required>
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
                                            <select className="custom-select" name="carpenterJobSpec" id="inputGroupSelect01" onChange={handleChange('timberType')} required>
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
                                            <input type="number" className="form-control" id="validationServer01" name="carpenterNuMeters" onChange={handleChange('carpenterNuMeters')} required />
                                        </td>
                                    </tr>

                                    {/* Masonry data */}
                                    <tr>
                                        <td className="text-left"><b>Masonry</b></td>
                                        <td className="text-right"></td>
                                    </tr>
                                    <tr>
                                        <td className="text-left">&nbsp; &nbsp; &nbsp; &nbsp; Job Specification :</td>
                                        <td className="text-right">
                                            <select className="custom-select" name="masonJobSpec" id="inputGroupSelect01" onChange={handleChange('masonJobSpec')} required>
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
                                            <input type="number" className="form-control" id="validationServer01" name="masonNuMeters" onChange={handleChange('masonNuMeters')} required />
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

export default ServiceProvider
