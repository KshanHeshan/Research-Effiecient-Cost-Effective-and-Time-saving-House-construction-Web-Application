import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';
import axios from 'axios';

export class PredictionSummary extends Component {

    // Constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            totalCost:0,
            carpCost:0,
            masCost:0,
            carpMeters:0,
            masMeters:0
        }
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

    componentDidMount() {

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
            timberType:timber_for_carpentry,
        }

    // Retrieve all predictions
    axios.post("http://127.0.0.1:5000/predict_cost", data)
    .then(res => this.setState({
        carpMeters:res.data.carp_meters,
        masMeters:res.data.mas_meters,
    }));

    // Data
    const costData = {
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
        carpenterNuMeters:this.state.carpMeters,
        carpenterJobSpec:carpenterJobSpec,
        masonNuMeters:this.state.masMeters,
        masonJobSpec:masonJobSpec,
        loc_nature:loc_nature,
        loc_situation:loc_situation,
        timber_for_carpentry:timber_for_carpentry,
        timber_for_celing:timber_for_celing,
        no_pillers:no_pillers,
        no_of_door_frames:no_of_door_frames,
        no_of_window_frames:no_of_window_frames,
        no_of_walls:no_of_walls,
        timberType:timber_for_carpentry,
    }
    // Retrieve all predictions
    axios.post("http://127.0.0.1:5000/predict_constr_cost", costData)
    .then(res => this.setState({
        totalCost:res.data.prediction,
        carpCost:res.data.carp_cost,
        masCost:res.data.mas_cost,
    }));
    }

    render() {

        // Values from props
        const {values: {
            area ,
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
            no_of_walls,

        }} = this.props;

        return (
            <main className="main">
                <div className="text-center">
                    <h1>Prediction Info Summary</h1>
                </div>
                <div className="summary_box">
                    {/* Form */}
                    <form>
                        <div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="text-left"><h5><b>Description</b></h5></th>
                                        <th className="text-center"><h5><b></b></h5></th>
                                        <th className="text-right"><h5><b>Amount</b></h5></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* Construction info */}
                                    <tr className="">
                                        <td><b>Building Info</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Area (SqFt.)</td>
                                        <td></td>
                                        <td className="text-right">{area}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of floors</td>
                                        <td></td>
                                        <td className="text-right">{no_floors} floor(s)</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Rooms</td>
                                        <td></td>
                                        <td className="text-right">{no_rooms} room(s)</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Bathrooms</td>
                                        <td></td>
                                        <td className="text-right">{no_bathrooms} bathroom(s)</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Doors</td>
                                        <td></td>
                                        <td className="text-right">{no_doors} door(s)</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Windows</td>
                                        <td></td>
                                        <td className="text-right">{no_windows} window(s)</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Wall Material</td>
                                        <td></td>
                                        <td className="text-right">{wall_material}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Celing Material</td>
                                        <td></td>
                                        <td className="text-right">{celing_material}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Floor Material</td>
                                        <td></td>
                                        <td className="text-right">{floor_material}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Roof Material</td>
                                        <td></td>
                                        <td className="text-right">{roof_material}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Location Nature</td>
                                        <td></td>
                                        <td className="text-right">{loc_nature}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Location Situation</td>
                                        <td></td>
                                        <td className="text-right">{loc_situation}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Walls</td>
                                        <td></td>
                                        <td className="text-right">{no_of_walls}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Timber type for carpentry</td>
                                        <td></td>
                                        <td className="text-right">{timber_for_carpentry}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Pillers</td>
                                        <td></td>
                                        <td className="text-right">{no_pillers}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Timber Type for Ceiling</td>
                                        <td></td>
                                        <td className="text-right">{timber_for_celing}</td>
                                    </tr>
                                    <tr className="">
                                        <td><b>Carpentry</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    {/* Carpentry info */}
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Job Specification</td>
                                        <td></td>
                                        <td className="text-right">{carpenterJobSpec}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Timber Type</td>
                                        <td></td>
                                        <td className="text-right">{timber_for_carpentry}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of meters</td>
                                        <td></td>
                                        <td className="text-right">{this.state.carpMeters}</td>
                                    </tr>

                                    {/* Masonry info */}
                                    <tr className="">
                                        <td><b>Masonry</b></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Job Specification</td>
                                        <td></td>
                                        <td className="text-right">{masonJobSpec}</td>
                                    </tr>
                                    <tr className="">
                                        <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of square meters</td>
                                        <td></td>
                                        <td className="text-right">{this.state.masMeters}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </form>

                <div>
                </div>

                {/* Cost predictions */}
                <div className="text-center">
                    <h1>Cost Predictions</h1>
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
                                    <tr>
                                        <td className="text-left"><b>&nbsp;&nbsp; Carpentry Cost Prediction</b></td>
                                        <td className="text-right">Rs (LKR). {this.state.carpCost}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left"><b>&nbsp;&nbsp; Masonry Cost Prediction</b></td>
                                        <td className="text-right">Rs (LKR). {this.state.masCost}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left"><b>&nbsp;&nbsp; Total House Construction Cost Prediction</b></td>
                                        <td className="text-right">Rs (LKR). {this.state.totalCost}</td>
                                    </tr>
                                </tbody>
                            </table>
                </div>
                </div>
                <hr/>
                
                </div>
                </div>
                <hr/>
                <div className="row col-12">
                    <div className="text-left left_btn col-4">
                        {/* Back button */}
                        <Link className="" to="#"  onClick={this.back}><FaArrowCircleLeft className="arrow_left_btn"/></Link> Services Cost Prediction Info
                    </div>
                    <div className="col-4"></div>
                    <div className="text-right right_btn col-4">
                        {/* Continue button */}
                        Carpenter Selection <Link className="" to="#"  onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default PredictionSummary
