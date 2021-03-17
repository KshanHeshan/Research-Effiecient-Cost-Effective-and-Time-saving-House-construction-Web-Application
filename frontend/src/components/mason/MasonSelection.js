import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';
import userLogo from '../css/img/male_default.jpg';
import MasonProjectModal from '../mason/MasonProjectModal';

// Functions for search filtering
function searchForName(term){
    return function(naming){
        return naming.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

function searchByReigion(term2){
    return function(reigion){
        return reigion.reigion.toLowerCase().includes(term2.toLowerCase()) || !term2;
    }
}

function searchByJobSpecification(term4){
    return function(job_specifi){
        return job_specifi.job_spec.toLowerCase().includes(term4.toLowerCase()) || !term4;
    }    
}

// function searchByPriceRate(term3){
//     return function(priceRate){
//         return priceRate.service_price.toLowerCase().includes(term3.toLowerCase()) || !term3;
//     }    
// }

// function searchByPriceRate(term3){
//     return function(priceRate){
//         return priceRate.service_price.toLowerCase().includes(term3.toLowerCase()) || !term3;
//     }
// }

class MasonSelection extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state={
            totalCost:0,
            carpCost:0,
            masCost:0,
            carpMeter:0,
            masMeter:0,
            roundedMasonCosts:0,
            term:'',
            term2:'',
            term3:'',
            term4:'',
            RecommendedMasons:[],
            SuggestedMasons:[],
        }

        // Binding
        this.searchHandlerForName = this.searchHandlerForName.bind(this);
        this.searchHandlerForReigion = this.searchHandlerForReigion.bind(this);
        this.searchHandlerForRate = this.searchHandlerForPriceRate.bind(this);
        this.searchHandlerForJobSpecification = this.searchHandlerForJobSpecification.bind(this);
    }

    // search handlers for search filter functionality
    searchHandlerForName(event){
        this.setState({
            term:event.target.value
        })
    }

    searchHandlerForReigion(event2){
        this.setState({
            term2:event2.target.value
        })
    }

    searchHandlerForPriceRate(event3){
        this.setState({
            term3:event3.target.value
        })
    }

    searchHandlerForJobSpecification(event4){
        this.setState({
            term4:event4.target.value
        })
    }
    
    // Continue function
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    // Back function
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    // componentDidMount method in react life cycle
    componentDidMount() 
    {
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

        axios.post("http://127.0.0.1:5000/predict_cost", data)
        .then(res => this.setState({
            carpMeter:res.data.carp_meters,
            masMeter:res.data.mas_meters
        }));

        // Assign the data of construction to a variable
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
            carpenterNuMeters:this.state.carpMeter,
            carpenterJobSpec:carpenterJobSpec,
            timberType:timberType,
            masonNuMeters:this.state.masMeter,
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

        // Send the construction data to store to laravel backend
        axios.post("http://127.0.0.1:5000/predict_constr_cost", costData)
        .then(res => this.setState({
                totalCost:res.data.prediction,
                carpCost:res.data.carp_cost,
                masCost:res.data.mas_cost,
                roundedMasonCosts:res.data.roundedMasonCost
            })
        );

        // Retreive all masons
        axios.get('http://127.0.0.1:8000/api/dash_masons')
        .then(response=>{
            this.setState({
                RecommendedMasons:response.data
            })
        });
    }

    componentDidUpdate() {

        // Retrieve recommended masons
        axios.get('http://localhost:8000/api/constructions/mason_suggest/'+this.state.roundedMasonCosts)
        .then(responseUpdate => this.setState({
            SuggestedMasons:responseUpdate.data
        }))
    }

    render() {

        // calling the handle change method
        const {handleChange} = this.props;
        
        return (
            <main className="main">
                {/* Mason selection content */}
                <h1>Mason Selection</h1>
                
                <hr/>
                <div>
                    <div>
                        <ul className="nav d-flex justify-content-center">
                            <li className="nav-item selection_tab_btn active">
                                <a className="nav-link" data-toggle="tab" href="#recommendation">Recommendation</a>
                            </li>
                            <li className="nav-item selection_tab_btn">
                                <a className="nav-link" data-toggle="tab" href="#search">Search</a>
                            </li>
                        </ul>
                    <hr className="shadow-lg"/>
                    </div>
                <div className="tab-content">
                    <div id="recommendation" class="tab-pane fade active show">
                        <div className="container">
                        {/* <h4>Recommendation</h4> */}
                        <div className="maso_recom_box">
                                <div className="content">
                                    <div className="text-center">
                                            <h4>For you, we recommend the following Masons</h4>
                                        </div>
                                        <br />
                                        <div className="row col-12 justify-content-center text-center">
                                            
                                                    {
                                                        this.state.SuggestedMasons.length ?

                                                        this.state.SuggestedMasons.map(recommendedMason => {
                                                            return (
                                                                <div className="card col-3" key={recommendedMason.id}>
                                                                    <div>
                                                                        <input name="mason_id" type="checkbox" class="checkbox" value={recommendedMason.belonged_user_id} onChange={handleChange('mason_id')}/>
                                                                    </div>
                                                                    <div className="card-header image_frame">
                                                                        <h4>{recommendedMason.works_subject}</h4>
                                                                        <img src={recommendedMason.image_url+recommendedMason.custom_image}/> 
                                                                    </div>
                                                                    <div className="card-body">
                                                                    <MasonProjectModal
                                                                        url={recommendedMason.image_url}
                                                                        main_img={recommendedMason.custom_image}
                                                                        img_1={recommendedMason.project_image_1}
                                                                        img_2={recommendedMason.project_image_2}
                                                                        img_3={recommendedMason.project_image_3}
                                                                        img_4={recommendedMason.project_image_4}
                                                                        subject = {recommendedMason.works_subject}
                                                                        duration = {recommendedMason.works_duration}
                                                                        cost = {recommendedMason.works_cost}
                                                                        description={recommendedMason.works_description}
                                                                    />
                                                                </div>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <div className="row col-12 text-center justify-content-center">
                                                            <h4 className="text-center">No Mason recommendation ??? Try the search filter to find a perfect Mason for your requirements....</h4>
                                                        </div>
                                                    }
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* Recommendation tab ends here */}

                    {/* Search tab */}
                    <div id="search" className="tab-pane fade">
                        <div className=" text-center">
                            <h4>Mason Search Filter</h4>
                        <hr/>
                            <div className="container form-group">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3 search_filter_inputs">
                                            <input type="text" className="form-control" id="name" placeholder="Search by name...." onChange={this.searchHandlerForName}/>
                                        </div>
                                        <div className="col-md-6 mb-3 search_filter_inputs">
                                            <input type="text" className="form-control" id="address" placeholder="Search by address...." onChange={this.searchHandlerForReigion}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-md-6 mb-3 search_filter_inputs">
                                            <input type="text" className="form-control" id="priceRate" placeholder="Search by Price Rate...." onChange={this.searchHandlerForPriceRate}/>
                                        </div> */}
                                        <div className=" col-md-12 mb-3 search_filter_inputs">
                                            <select className="custom-select" name="no_floors" id="inputGroupSelect01" onChange={this.searchHandlerForJobSpecification}>
                                                <option defaultValue>Select a Job Specification....</option>
                                                <option value="only walls">Only Walls</option>
                                                <option value="only floor">Only Floor</option>
                                                <option value="both">Both Interior and Roof</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <hr/>
                            <div className="row">
                            {
                                this.state.RecommendedMasons.filter(searchForName(this.state.term)).filter(searchByReigion(this.state.term2)).filter(searchByJobSpecification(this.state.term4)).map(recommendedMason => {
                                    return (
                                        
                                        <label className="option_item" key={recommendedMason.id}>
                                            <input name="mason_id" type="checkbox" class="checkbox" value={recommendedMason.id} onChange={handleChange('mason_id')}/>
                                            <div className="user_card option_inner">
                                                
                                                <div className="user_card-header">
                                                    <div className="animated_wave-bg">
                                                    
                                                        <div className="animated_wave-01"></div>
                                                        <div className="animated_wave-02"></div>
                                                        <div className="animated_wave-03"></div>
                                                    </div>
                                                    <div className="user_profile_pic-content">
                                                        <img className="user_profile_pic" src={userLogo} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="user_card-content">
                                                    <div className="tickmark">
                                                        
                                                    </div>
                                                    <div className="user_name">
                                                        <h4>{recommendedMason.name}</h4>
                                                    </div>
                                                    <div className="user_info">
                                                        <h5>Address : {recommendedMason.reigion}</h5>
                                                        <h5>Service Rate : {recommendedMason.service_price} / {recommendedMason.payment_type}</h5>  
                                                    </div>
                                                    <div className="text-center">
                                                        <ReactStars classNames="rating text-center"
                                                            count={5}
                                                            size={20}
                                                            value={recommendedMason.new_user_rate}
                                                            edit={false}
                                                            isHalf={true}
                                                            activeColor="#ffd000"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    )
                                })
                            }
                            </div>
                            <hr/>
                        </div>
                        {/* Search ends here */}
                    </div>
                </div>
                </div>
                <div className="row col-12">
                    <div className="text-left left_btn col-4">
                        {/* back button */}
                        <Link className="" to="#"  onClick={this.back}><FaArrowCircleLeft className="arrow_left_btn"/></Link> Carpenter Selection
                    </div>
                    <div className="col-4"></div>
                    <div className="text-right right_btn col-4">
                        {/* Continue button */}
                        Complete Summary and confirmation <Link className="" to="#"  onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default MasonSelection
