import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';

export class Summary extends Component {

    // Constructor
    constructor(props){

        super(props);

        // state
        this.state={
            totalMasonryCost:0,
            totalCarpentryCost:0,
            totalCost:0,
            carpenter_name:'',
            mason_name:'',
            carpMeters:0,
            masMeters:0
        }
    }

    componentDidMount(){

        // values
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
            carpenter_id ,
            mason_id,
            loc_nature,
            loc_situation,
            timber_for_carpentry,
            timber_for_celing,
            no_pillers,
            no_of_door_frames,
            no_of_window_frames,
            no_of_walls,
        }} = this.props;



        // data
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


        // data
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

        
        // Retreive all predictions
        axios.post("http://127.0.0.1:5000/predict_cost", costData)
        .then(res => this.setState({
            carpMeters:res.data.carp_meters,
            masMeters:res.data.mas_meters,

        }));

        // Retreive all predictions
        axios.post("http://127.0.0.1:5000/predict_constr_cost", data)
        .then(res => this.setState({
            totalCost:res.data.prediction,
            totalCarpentryCost:res.data.carp_cost,
            totalMasonryCost:res.data.mas_cost,
        }));
        

        // Retreive selected carpenter details
        axios.get('http://localhost:8000/api/carpenter_details/'+carpenter_id)
        .then(res1=>{
            console.log(res1);
            this.setState({
                carpenter_name:res1.data.name
            })
            
        })

        // Retreive selected mason details
        axios.get('http://localhost:8000/api/mason_details/'+mason_id)
        .then(res2=>{
            console.log(res2);
            this.setState({
                mason_name:res2.data.name
            })
            
        })



    }
    
    // Continue button function
    continue = e => {
        e.preventDefault();

        // Retrieve data to store
        const {values: {
            area ,
            height,
            construction_projectName,
            no_floors ,
            no_rooms ,
            no_bathrooms ,
            no_doors ,
            no_windows ,
            wall_material ,
            celing_material ,
            floor_material ,
            roof_material ,
            carpenter_id,
            carpenterNuMeters,
            carpenterJobSpec,
            timberType,
            mason_id,
            masonNuMeters,
            masonJobSpec,
            loc_nature,
            loc_situation,
            timber_for_carpentry,
            timber_for_celing,
            no_pillers,
            no_of_door_frames,
            no_of_window_frames,
            no_of_walls
        }} = this.props;

        // Assign data to a variable
        const construction_project_data = {
            user_id:this.props.id,
            area:area,
            height:height,
            construction_projectName:construction_projectName,
            no_floors:no_floors,
            no_rooms:no_rooms,
            no_bathrooms:no_bathrooms,
            no_doors:no_doors,
            no_windows:no_windows,
            wall_material:wall_material,
            celing_material:celing_material,
            floor_material:floor_material,
            roof_material:roof_material,
            carpenter_id:carpenter_id,
            carpenter:this.state.carpenter_name,
            mason_id:mason_id,
            mason:this.state.mason_name,
            carpenterNuMeters:this.state.carpMeters,
            carpenterJobSpec:carpenterJobSpec,
            timberType:timberType,
            masonNuMeters:this.state.masMeters,
            masonJobSpec:masonJobSpec,
            loc_nature:loc_nature,
            loc_situation:loc_situation,
            timber_for_carpentry:timber_for_carpentry,
            timber_for_celing:timber_for_celing,
            constructionCost:this.state.totalCost,
            masonCost:this.state.totalMasonryCost,
            carpenterCost:this.state.totalCarpentryCost,
            no_pillers:no_pillers,
            no_of_door_frames:no_of_door_frames,
            no_of_window_frames:no_of_window_frames,
            no_of_walls:no_of_walls
        }

        // Send data to store
        axios.post('http://localhost:8000/api/constructions/store', construction_project_data)
        .then(contruct_res => {
            console.log(contruct_res);
        })
        this.props.nextStep();
    }

    // Back button function
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {

        // Values form props
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
                        carpenter ,
                        mason,
                        carpenterNuMeters,
                        carpenterJobSpec,
                        timber_for_carpentry,
                        masonNuMeters,
                        masonJobSpec,
                        no_of_walls,
                        height,
                        no_pillers,
                    }} = this.props;

        return (
            <main className="main">
                {/* Final summary page content */}
                <div className="text-center">
                    <h1>Complete Summary and Confirmation</h1>

                </div>
                <div className="summary_box">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="text-left"><h5><b>Description</b></h5></th>
                                <th className="text-center"><h5><b></b></h5></th>
                                <th className="text-right"><h5><b>Amount</b></h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Construction data */}
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
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Height</td>
                                <td></td>
                                <td className="text-right">{height}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of floors</td>
                                <td></td>
                                <td className="text-right">{no_floors} floor(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Rooms</td>
                                <td></td>
                                <td className="text-right">{no_rooms} Room(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Bathrooms</td>
                                <td></td>
                                <td className="text-right">{no_bathrooms} Bathroom(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Doors</td>
                                <td></td>
                                <td className="text-right">{no_doors} door(s)</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of Doors</td>
                                <td></td>
                                <td className="text-right">{no_of_walls} door(s)</td>
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
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of walls</td>
                                <td></td>
                                <td className="text-right">{no_of_walls}</td>
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
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of pillers</td>
                                <td></td>
                                <td className="text-right">{no_pillers}</td>
                            </tr>
                            <tr className="">
                                <td><b>Carpentry Cost Prediction Info</b></td>
                                <td></td>
                                <td></td>
                            </tr>

                            {/* Carpenter data */}
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Carpenter</td>
                                <td></td>
                                <td className="text-right">{this.state.carpenter_name}</td>
                            </tr>
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
                            <tr className="">
                                <td><b>Carpentery Cost Prediction</b></td>
                                <td></td>
                            <td className="text-right">LKR. {this.state.totalCarpentryCost}</td>
                            </tr>
                            <tr className="">
                                <td><b>Masonry</b></td>
                                <td></td>
                                <td></td>
                            </tr>

                            {/* Mason data */}
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Mason</td>
                                <td></td>
                                <td className="text-right">{this.state.mason_name}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Job Specification</td>
                                <td></td>
                                <td className="text-right">{masonJobSpec}</td>
                            </tr>
                            <tr className="">
                                <td>&nbsp; &nbsp; &nbsp; &nbsp; Number of meters</td>
                                <td></td>
                                <td className="text-right">{this.state.masMeters}</td>
                            </tr>
                            <tr className="">
                                <td><b>Masonry Cost Prediction</b></td>
                                <td></td>
                                <td className="text-right">LKR. {this.state.totalMasonryCost}</td>
                            </tr>
                            <tr className="">
                                <td><b>Total House Construction Cost Prediction</b></td>
                                <td></td>
                                <td className="text-right">LKR. {this.state.totalCost}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr/>
                <div className="row col-12">
                    <div className="text-left left_btn col-4">
                        {/* Back button */}
                        <Link className="" to="#"  onClick={this.back}><FaArrowCircleLeft className="arrow_left_btn"/></Link> Re-search a Mason
                    </div>
                    <div className="col-4"></div>
                    <div className="text-right right_btn col-4">
                        {/* Confirm button / Continue button */}
                        Confirm <Link className="" to="#"  onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    
    return {
        id: state.auth.user.id
    }
}

export default connect(mapStateToProps, null)(Summary)
