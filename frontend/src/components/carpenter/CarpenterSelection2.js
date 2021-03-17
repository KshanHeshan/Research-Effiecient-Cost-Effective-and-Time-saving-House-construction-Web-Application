import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import {FaArrowCircleLeft, FaArrowCircleRight} from 'react-icons/fa';
import userLogo from '../css/img/male_default.jpg';
import CarpenterProjectModal from '../carpenter/CarpenterProjectModal';

// Functions required for the search filter
function searchByName(term){
    return function(name){
        return name.name.toLowerCase().includes(term.toLowerCase()) || !term;
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

class CarpenterSelection extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            totalCost:0,
            carpCost:0,
            masCost:0,
            roundedCarpCosts:0,
            roundedCarpMeter:0,
            carpMeter:0,
            masMeter:0,
            term:'',
            term2:'',
            term3:'',
            term4:'',
            Recommendcarpenters:[],
            suggestedcarpenters:[]
        }

        // Binding
        this.searchHandlerForName = this.searchHandlerForName.bind(this);
        this.searchHandlerForRegion = this.searchHandlerForRegion.bind(this);
        this.searchHandlerForServicePrice = this.searchHandlerForServicePrice.bind(this);
        this.searchHandlerForJobSpecification = this.searchHandlerForJobSpecification.bind(this);
        
    }

    // search handlers in search filter
    searchHandlerForName(event) {
        this.setState({
            term:event.target.value
        })
    }

    searchHandlerForRegion(event2) {
        this.setState({
            term2:event2.target.value
        })
    }

    searchHandlerForServicePrice(event3) {
        this.setState({
            term3:event3.target.value
        })
    }

    searchHandlerForJobSpecification(event4) {
        this.setState({
            term4:event4.target.value
        })
    }

    // End of search handlers in search filter

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    // One of the life cycle method
    componentDidMount() 
    {

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

        // Retrieve all predictions
        axios.post("http://127.0.0.1:5000/predict_cost", data)
        .then(res => this.setState({
            carpMeter:res.data.carp_meters,
            masMeter:res.data.mas_meters
        }));

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
        console.log(data);

    axios.post("http://127.0.0.1:5000/predict_constr_cost", costData)
    .then(res => this.setState({
            carpCost:res.data.carp_cost,
            roundedCarpCosts:res.data.roundedCarpCost
        })
    );

    axios.get('http://127.0.0.1:8000/api/dash_carpenters')
        .then(response=>{
            this.setState({
                Recommendcarpenters:response.data
            })
        });

    }

    // One of the life cycle method
    componentDidUpdate() {
        console.log("Yes... Updated"+this.state.roundedCarpCost);
        axios.get('http://localhost:8000/api/constructions/carpenter_suggest/'+this.state.roundedCarpCosts)
        .then(responseUpdate => 
            this.setState({
            suggestedcarpenters:responseUpdate.data
        })
        )

    }
    
    render() {

        const {handleChange} = this.props;

        return (
            // Carpenter Selection / Recommendation page starts from here
            <main className="main">
            <h1>Carpenter Selection</h1>
            
            {/* <h4>{this.state.suggestedcarpenters.length}</h4> */}
            <hr/>
            
            <div>
                {/* Tab System */}
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

                  {/* Recommendation Tab */}
                <div id="recommendation" className="tab-pane fade active show">
                    <div className="container">
                      <div className="maso_recom_box">
                            <div className="content">
                                <div className="text-center">
                                        <h4>For you, we recommend the following Masons</h4>
                                        <h5>In order to select a carpenter, please tick checkbox</h5>
                                    </div>
                                    <br />
                                    <div className="row col-12 justify-content-center text-center">
                                                {
                                                    this.state.suggestedcarpenters.length ?

                                                    this.state.suggestedcarpenters.map(recommendedCarpenter => {
                                                        return (
                                                            <div className="card col-3" key={recommendedCarpenter.id}>
                                                                <div>
                                                                    <input name="carpenter_id" type="checkbox" className="checkbox checked"  value={recommendedCarpenter.belonged_user_id} onChange={handleChange('carpenter_id')}/>
                                                                </div>                                                                
                                                                <div className="card-header image_frame">
                                                                    <h4>{recommendedCarpenter.works_subject}</h4>
                                                                    <img src={recommendedCarpenter.image_url+recommendedCarpenter.custom_image}/>
                                                                </div>
                                                                <div className="card-body">
                                                                    <CarpenterProjectModal
                                                                        url={recommendedCarpenter.image_url}
                                                                        main_img={recommendedCarpenter.custom_image}
                                                                        img_1={recommendedCarpenter.project_image_1}
                                                                        img_2={recommendedCarpenter.project_image_2}
                                                                        img_3={recommendedCarpenter.project_image_3}
                                                                        img_4={recommendedCarpenter.project_image_4}
                                                                        subject = {recommendedCarpenter.works_subject}
                                                                        duration = {recommendedCarpenter.works_duration}
                                                                        cost = {recommendedCarpenter.works_cost}
                                                                        description={recommendedCarpenter.works_description}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <div className="text-center justify-content-center">
                                                        <div className="text-center">No Carpenter recommendation ??? Try the search filter to find a perfect carpenter for your requirements....</div>
                                                    </div>
                                                }
                                                
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                </div>
                {/* Recommendation tab ends from here */}

                {/* Search Filter starts here */}
                <div id="search" className="tab-pane fade">
                    <div className=" text-center">
                        <h4>Carpenter Search Filter</h4>
                        <hr/>
                        <div className="container form-group">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3 search_filter_inputs">
                                        <input type="text" className="form-control" id="name" placeholder="Search by name...." onChange={this.searchHandlerForName}/>
                                    </div>
                                    <div className="col-md-6 mb-3 search_filter_inputs">
                                        <input type="text" className="form-control" id="address" placeholder="Search by address...." onChange={this.searchHandlerForRegion}/>
                                    </div>
                                </div>
                                <div className="row">
                                    
                                    <div className=" col-md-12 mb-3 search_filter_inputs">
                                        <select className="custom-select" name="no_floors" id="inputGroupSelect01" onChange={this.searchHandlerForJobSpecification}>
                                            <option defaultValue>Select a Job Specification....</option>
                                            <option value="only interior">Only Interior</option>
                                            <option value="only roof">Only Roof</option>
                                            <option value="both">Both Interior and Roof</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr/>
                        <div  className="row text-center">
                        {
                            this.state.Recommendcarpenters.filter(searchByName(this.state.term)).filter(searchByReigion(this.state.term2)).filter(searchByJobSpecification(this.state.term4)).map(recommendedCarpenter => 
                                    <label className="option_item" key={recommendedCarpenter.id}>
                                        <input name="carpenter_id" type="checkbox" className="checkbox"  value={recommendedCarpenter.id} onChange={handleChange('carpenter_id')}/>
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
                                                    <h4>{recommendedCarpenter.name}</h4>
                                                </div>
                                                <div className="user_info">
                                                    <h5>Address : {recommendedCarpenter.reigion}</h5>
                                                    <h5>Service Rate : {recommendedCarpenter.service_price} / {recommendedCarpenter.payment_type}</h5>  
                                                </div>
                                                <div className="text-center">
                                                    <ReactStars classNames="rating text-center"
                                                        count={5}
                                                        size={20}
                                                        value={recommendedCarpenter.new_user_rate}
                                                        edit={false}
                                                        isHalf={true}
                                                        activeColor="#ffd000"
                                                    />
                                                </div> 
                                            </div>
                                        </div>
                                    </label>
                                ) 
                        }

                        </div>
                        <hr/>
                        </div>
                    </div>
                {/* Search Filter ends here */}

              </div>
            </div>
            <div className="row col-12">
                    {/* Back button */}
                    <div className="text-left left_btn col-4">
                        <Link className="" to="#"  onClick={this.back}><FaArrowCircleLeft className="arrow_left_btn"/></Link> Total Cost Prediction Info Summary
                    </div>
                    <div className="col-4"></div>
                    {/* Continue Button */}
                    <div className="text-right right_btn col-4">
                        Mason Selection <Link className="" to="#"  onClick={this.continue}><FaArrowCircleRight className="arrow_right_btn"/></Link>
                    </div>
                </div>
            </main>
        )
    }
}

export default CarpenterSelection
