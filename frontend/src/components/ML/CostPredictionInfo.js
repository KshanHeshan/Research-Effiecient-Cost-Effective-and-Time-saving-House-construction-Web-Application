import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {FaArrowCircleRight} from 'react-icons/fa';

export class CostPredictionInfo extends Component {

    // constructor
    constructor(props) {
        super(props);
        this.myDivToFocus = React.createRef();
    }

    // continue function
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    
    render() {
        // calling handle change function
        const {handleChange} = this.props;

        return (
            <main className="main-expand">
                <div>
                    {/* Cost prediction info page content */}
                    <div className="text-center">
                    <div ref={this.myDivToFocus}></div>
                        <h1>House Construction Cost Prediction info</h1>
                        <br/>
                        <div className="text-center jumbotron jumbotron-fluid">
                            <form action="/predict_cost_v2" method="POST" onSubmit={this.handleForm} >
                                    <div className="form-row d-flex justify-content-center">
                                        <div className="col-md-3 mb-3">
                                            {/* Construction project name */}
                                            <label htmlFor="validationServer01">Construction Project Name :</label>
                                            <input type="text" className="form-control" id="validationServer01" name="construction_projectName" onChange={handleChange('construction_projectName')} required />
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">
                                        <div className="col-md-3 mb-3">
                                            {/* Area */}
                                            <label htmlFor="validationServer01">Area :</label>
                                            <input type="number" className="form-control" id="validationServer01" name="area" onChange={handleChange('area')} required />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Height */}
                                            <label htmlFor="validationServer01">Height :</label>
                                            <input type="number" className="form-control" id="validationServer01" name="height" onChange={handleChange('height')} required />
                                        </div>
                                    </div>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <div className="form-row d-flex justify-content-center">
                                        <div className=" col-md-3 mb-3">
                                            {/* Number of floors */}
                                            <label htmlFor="validationServer01">Number of Floors :</label>
                                            <select className="custom-select" name="no_floors" id="inputGroupSelect01" onChange={handleChange('no_floors')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="1">1 Floor</option>
                                            <option value="2">2 Floors</option>
                                            </select>
                                        </div>
                                        <div className=" col-md-3 mb-3">
                                            {/* Number of rooms */}
                                            <label htmlFor="validationServer01">Number of Rooms :</label>
                                            <select className="custom-select" name="no_rooms" id="inputGroupSelect01" onChange={handleChange('no_rooms')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="1">1 Room</option>
                                            <option value="2">2 Rooms</option>
                                            <option value="3">3 Rooms</option>
                                            <option value="4">4 Rooms</option>
                                            <option value="5">5 Rooms</option>
                                            <option value="6">6 Rooms</option>
                                            <option value="7">7 Rooms</option>
                                            <option value="8">8 Rooms</option>
                                            <option value="9">9 Rooms</option>
                                            <option value="10">10 Rooms</option>
                                            <option value="11">11 Rooms</option>
                                            <option value="12">12 Rooms</option>
                                            <option value="13">13 Rooms</option>
                                            <option value="14">14 Rooms</option>
                                            <option value="15">15 Rooms</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Number of bathrooms */}
                                            <label htmlFor="validationServer01">No.of Bathrooms :</label>
                                            <select className="custom-select" name="no_bathrooms" id="inputGroupSelect01" onChange={handleChange('no_bathrooms')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="1">1 Bathroom</option>
                                            <option value="2">2 Bathrooms</option>
                                            <option value="3">3 Bathrooms</option>
                                            <option value="4">4 Bathrooms</option>
                                            <option value="5">5 Bathrooms</option>
                                            <option value="6">6 Bathrooms</option>
                                            <option value="7">7 Bathrooms</option>
                                            <option value="8">8 Bathrooms</option>
                                            <option value="9">9 Bathrooms</option>
                                            <option value="10">10 Bathrooms</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">
                                        <div className="col-md-3 mb-3">
                                            {/* Number of doors */}
                                            <label htmlFor="validationServer01">Number of doors :</label>
                                            <select className="custom-select" name="no_doors" id="inputGroupSelect01" onChange={handleChange('no_doors')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="1">1 Door</option>
                                            <option value="2">2 Doors</option>
                                            <option value="3">3 Doors</option>
                                            <option value="4">4 Doors</option>
                                            <option value="5">5 Doors</option>
                                            <option value="6">6 Doors</option>
                                            <option value="7">7 Doors</option>
                                            <option value="8">8 Doors</option>
                                            <option value="9">9 Doors</option>
                                            <option value="10">10 Doors</option>
                                            <option value="11">11 Doors</option>
                                            <option value="12">12 Doors</option>
                                            <option value="13">13 Doors</option>
                                            <option value="14">14 Doors</option>
                                            <option value="15">15 Doors</option>
                                            <option value="16">16 Doors</option>
                                            <option value="17">17 Doors</option>
                                            <option value="18">18 Doors</option>
                                            <option value="19">19 Doors</option>
                                            <option value="20">20 Doors</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Number of windows */}
                                            <label htmlFor="validationServer01">Number of Windows :</label>
                                            <select className="custom-select" name="no_windows" id="inputGroupSelect01" onChange={handleChange('no_windows')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="1">1 Window</option>
                                            <option value="2">2 Windows</option>
                                            <option value="3">3 Windows</option>
                                            <option value="4">4 Windows</option>
                                            <option value="5">5 Windows</option>
                                            <option value="6">6 Windows</option>
                                            <option value="7">7 Windows</option>
                                            <option value="8">8 Windows</option>
                                            <option value="9">9 Windows</option>
                                            <option value="10">10 Windows</option>
                                            <option value="11">11 Windows</option>
                                            <option value="12">12 Windows</option>
                                            <option value="13">13 Windows</option>
                                            <option value="14">14 Windows</option>
                                            <option value="15">15 Windows</option>
                                            <option value="16">16 Windows</option>
                                            <option value="17">17 Windows</option>
                                            <option value="18">18 Windows</option>
                                            <option value="19">19 Windows</option>
                                            <option value="20">20 Windows</option>
                                            <option value="21">21 Windows</option>
                                            <option value="22">22 Windows</option>
                                            <option value="23">23 Windows</option>
                                            <option value="24">24 Windows</option>
                                            <option value="25">25 Windows</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Wall material */}
                                            <label htmlFor="validationServer01">Wall Material :</label>
                                            <select className="custom-select" name="wall_material" id="inputGroupSelect01" onChange={handleChange('wall_material')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Cement Block">Cement Block</option>
                                            <option value="Bricks">Bricks</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">

                                        <div className="col-md-3 mb-3">
                                            {/* Celing material */}
                                            <label htmlFor="validationServer01">Celing Material :</label>
                                            <select className="custom-select" name="celing_material" id="inputGroupSelect01" onChange={handleChange('celing_material')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Ceiling Tiles">Ceiling Tiles</option>
                                            <option value="Wood">Wood</option>
                                            <option value="Concrete">Concrete</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Floor material */}
                                            <label htmlFor="validationServer01">Floor Material :</label>
                                            <select className="custom-select" name="floor_material" id="inputGroupSelect01" onChange={handleChange('floor_material')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Cement">Cement</option>
                                            <option value="Tiles">Tiles</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Roof material */}
                                            <label htmlFor="validationServer01">Roof Material :</label>
                                            <select className="custom-select" name="roof_material" id="inputGroupSelect01" onChange={handleChange('roof_material')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Asbastos">Asbastos</option>
                                            <option value="Concrete">Concrete</option>
                                            <option value="Roof Tiles">Roof Tiles</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">
                                        <div className="col-md-3 mb-3">
                                            {/* Timber type for carpentry */}
                                            <label htmlFor="validationServer01">Timber type for Carpentry works :</label>
                                            <select className="custom-select" name="timber_for_carpentry" id="inputGroupSelect01" onChange={handleChange('timber_for_carpentry')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Mahogani">Mahogani</option>
                                            <option value="Thekka">Thekka</option>
                                            <option value="Burutha">Burutha</option>
                                            <option value="Jack">Jack</option>
                                            <option value="Kubuk">Kubuk</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Timber type for Ceiling */}
                                            <label htmlFor="validationServer01">Timber type for Ceiling :</label>
                                            <select className="custom-select" name="timber_for_celing" id="inputGroupSelect01" onChange={handleChange('timber_for_celing')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Mahogani">Mahogani</option>
                                            <option value="Thekka">Thekka</option>
                                            <option value="Burutha">Burutha</option>
                                            <option value="Jack">Jack</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Location Situation */}
                                            <label htmlFor="validationServer01">Location Situation :</label>
                                            <select className="custom-select" name="loc_situation" id="inputGroupSelect01" onChange={handleChange('loc_situation')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Near">Near</option>
                                            <option value="Cannot measure">Cannot measure</option>
                                            <option value="Far">Far</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">
                                        <div className="col-md-3 mb-3">
                                            {/* Location Nature */}
                                            <label htmlFor="validationServer01">Location Nature :</label>
                                            <select className="custom-select" name="loc_nature" id="inputGroupSelect01" onChange={handleChange('loc_nature')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="Poor soil Condition">Poor soil Condition</option>
                                            <option value="Wet Land">Wet Land</option>
                                            <option value="Conflicting Utilities">Conflicting Utilities</option>
                                            <option value="Good">Good</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Number of windows */}
                                            <label htmlFor="validationServer01">Number of Pillers :</label>
                                            <select className="custom-select" name="no_pillers" id="inputGroupSelect01" onChange={handleChange('no_pillers')}>
                                            <option defaultValue>Choose...</option>
                                            <option value="1">1 Piller</option>
                                            <option value="2">2 Pillers</option>
                                            <option value="3">3 Pillers</option>
                                            <option value="4">4 Pillers</option>
                                            <option value="5">5 Pillers</option>
                                            <option value="6">6 Pillers</option>
                                            <option value="7">7 Pillers</option>
                                            <option value="8">8 Pillers</option>
                                            <option value="9">9 Pillers</option>
                                            <option value="10">10 Pillers</option>
                                            <option value="11">11 Pillers</option>
                                            <option value="12">12 Pillers</option>
                                            <option value="13">13 Pillers</option>
                                            <option value="14">14 Pillers</option>
                                            <option value="15">15 Pillers</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* Number of windows */}
                                            <label htmlFor="validationServer01">Number of door frames :</label>
                                            <select className="custom-select" name="no_of_door_frames" id="inputGroupSelect01" onChange={handleChange('no_of_door_frames')}>
                                                <option defaultValue>Choose...</option>
                                                <option value="1">1 Door Frame</option>
                                                <option value="2">2 Door Frames</option>
                                                <option value="3">3 Door Frames</option>
                                                <option value="4">4 Door Frames</option>
                                                <option value="5">5 Door Frames</option>
                                                <option value="6">6 Door Frames</option>
                                                <option value="7">7 Door Frames</option>
                                                <option value="8">8 Door Frames</option>
                                                <option value="9">9 Door Frames</option>
                                                <option value="10">10 Door Frames</option>
                                                <option value="11">11 Door Frames</option>
                                                <option value="12">12 Door Frames</option>
                                                <option value="13">13 Door Frames</option>
                                                <option value="14">14 Door Frames</option>
                                                <option value="15">15 Door Frames</option>
                                                <option value="16">16 Door Frames</option>
                                                <option value="17">17 Door Frames</option>
                                                <option value="18">18 Door Frames</option>
                                                <option value="19">19 Door Frames</option>
                                                <option value="20">20 Door Frames</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">
                                    <div className="col-md-3 mb-3">
                                            {/* Number of windows */}
                                            <label htmlFor="validationServer01">Number of window frames :</label>
                                            <select className="custom-select" name="no_of_window_frames" id="no_of_window_frames" onChange={handleChange('no_of_window_frames')}>
                                                <option defaultValue>Choose...</option>
                                                <option value="1">1 Window Frame</option>
                                                <option value="2">2 Window Frames</option>
                                                <option value="3">3 Window Frames</option>
                                                <option value="4">4 Window Frames</option>
                                                <option value="5">5 Window Frames</option>
                                                <option value="6">6 Window Frames</option>
                                                <option value="7">7 Window Frames</option>
                                                <option value="8">8 Window Frames</option>
                                                <option value="9">9 Window Frames</option>
                                                <option value="10">10 Window Frames</option>
                                                <option value="11">11 Window Frames</option>
                                                <option value="12">12 Window Frames</option>
                                                <option value="13">13 Window Frames</option>
                                                <option value="14">14 Window Frames</option>
                                                <option value="15">15 Window Frames</option>
                                                <option value="16">16 Window Frames</option>
                                                <option value="17">17 Window Frames</option>
                                                <option value="18">18 Window Frames</option>
                                                <option value="19">19 Window Frames</option>
                                                <option value="20">20 Window Frames</option>
                                                <option value="21">21 Window Frames</option>
                                                <option value="22">22 Window Frames</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* number of walls */}
                                            <label htmlFor="validationServer01">Number of walls :</label>
                                            <input type="number" className="form-control" id="validationServer01" name="no_of_walls" onChange={handleChange('no_of_walls')} required />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            {/* number of walls */}
                                            <label htmlFor="validationServer01">Carpentry Job Spec :</label>
                                            <select className="custom-select" name="carpenterJobSpec" id="inputGroupSelect01" onChange={handleChange('carpenterJobSpec')} required>
                                                <option defaultValue>Choose...</option>
                                                <option value="Only Interior">Only Interior</option>
                                                <option value="Only Ceiling">Only Ceiling</option>
                                                <option value="Both Interior and Ceiling">Both Interior and Ceiling</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row d-flex justify-content-center">
                                        <div className="col-md-3 mb-3">
                                            {/* number of walls */}
                                            <label htmlFor="validationServer01">Masonry Job Spec :</label>
                                            <select className="custom-select" name="masonJobSpec" id="inputGroupSelect01" onChange={handleChange('masonJobSpec')} required>
                                                <option defaultValue>Choose...</option>
                                                <option value="Only Walls">Only Walls</option>
                                                <option value="Only Floors">Only Floors</option>
                                                <option value="Both Walls and Floors">Both Walls and Floors</option>
                                            </select>
                                        </div>
                                    </div>
                            </form>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="row col-12">
                    <div className="text-right left_btn col-4">
                    </div>
                    <div className="col-4"></div>
                    <div className="text-right right_btn col-4">
                        {/* Continue Button */}
                        Service Providers Info <Link className="" to="#" onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default CostPredictionInfo