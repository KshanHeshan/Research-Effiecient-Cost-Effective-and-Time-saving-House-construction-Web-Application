import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import {FaStar, FaTasks, FaUser, FaPlus} from 'react-icons/fa';
import DashboardLogo from '../css/img/HomeConstruction_Main_logo.png';
import SuccessReviewAlert from '../Works/SuccessWorksAlert';
import ErrorReviewAlert from '../Works/ErrorWorksAlert';
import { connect } from 'react-redux';
import DashboardLogoWhite from '../css/img/Home_Construction_logo_White.png';


class Dashboard extends Component {

    // constructor
    constructor(props) {
        super(props);

        // state
        this.state = {
            name: props.name,
            userImage:props.userImage,
            email: props.email,
            bio: props.bio,
            address: props.address,
            service_price: props.service_price,
            service_price_type: props.service_price_type,
            imgUrl: props.imageUrl,
            reigion: props.reigion,
            zip_code: props.zip_code,
            mobile_number: props.mobile_number,
            tele_number:props.tele_number,
            current_user_rate: props.user_rate,
            userBelongReviews:[],
            userBelongReviewsCount:null,
            userBelongConstructions:[],
            userBelongConstructionsCount:null,
            userSelectedProfileImage:null,
            serviceProviderBelongedCompl_projects:[],
            serviceProviderBelongedReviews:[],
            serviceProviderBelongedReviewsCount:null,
            errors:{},
            alert_message:''
        }
    }

    // input handler
    handleInput = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    // User image preview input handleer
    userProfileImageHandler = (event) =>{
        this.setState({
            userSelectedProfileImage: URL.createObjectURL(event.target.files[0])
        })
    }

    // Form data handler
    handleForm = e => {
        e.preventDefault();
        // data
        const data = {
            email: this.state.email, 
            name: this.state.name, 
            bio: this.state.bio,
            address: this.state.address,
            service_price: this.state.service_price,
            reigion: this.state.reigion, 
            zip_code: this.state.zip_code, 
            mobile_number: this.state.mobile_number, 
            tele_number: this.state.tele_number,
        }
        
        // user data update
        axios.patch("http://localhost:8000/api/auth/update", data)
        .then(res => {
            console.log(res.data);
        })
        .catch(e => this.setState({errors: e.response.data}))
    }

    componentDidMount() 
    {
        // retreive service providers reviews
        axios.get('http://127.0.0.1:8000/api/SPReviews/'+this.props.id)
        .then(response=>{
            this.setState({
                serviceProviderBelongedReviews:response.data,
                serviceProviderBelongedReviewsCount: response.data.length
            });
        });

        // retreive completed projects by user id
        axios.get('http://127.0.0.1:8000/api/complete_projects/'+this.props.id)
        .then(compl_response => {
            console.log(compl_response);
            this.setState({
                serviceProviderBelongedCompl_projects:compl_response.data,
            });
        });
        
    }

    // ondelete function for completed projects
    onDeleteCompletedProject(completedProject_id)
    {
        axios.delete('http://127.0.0.1:8000/api/works_done/delete/'+completedProject_id)
        .then(response=>{

            var serviceProviderBelongedCompl_projects = this.state.serviceProviderBelongedCompl_projects;

            for(var i = 0; i < serviceProviderBelongedCompl_projects.length; i++)
            {
                if(serviceProviderBelongedCompl_projects[i].id == completedProject_id)
                {
                    serviceProviderBelongedCompl_projects.splice(i,1);
                    this.setState({serviceProviderBelongedCompl_projects:serviceProviderBelongedCompl_projects});
                }
            }

            this.setState({alert_message:'success'})

        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
    }    

    render() {
        return (
            <main className="main-expand">
                {/* Dashboard */}
                <div className="container-fluid">
                    {/* Sidebar tabs */}
                    <div className="row">
                        <nav className="col-md-2 d-none d-md-block sidebar_gradient sidebar">
                            <div className="sidebar-sticky sideBar">
                                <ul className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <li className="text-center side-user-img">
                                        <img src={DashboardLogoWhite} className="side-bar-user-img" alt="" />
                                    </li>
                                    <li className="butn_styles nav-item">
                                        <a className="nav-link text-white" id="v-pills-dashboard-tab" data-toggle="pill" href="#v-pills-dashboard" role="tab" aria-controls="v-pills-dashboard" aria-selected="true">Dashboard</a>
                                    </li>
                                    <li className="nav-item butn_styles">
                                        <a className="nav-link text-white" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">Profile</a>
                                    </li>
                                    <li className="nav-item butn_styles">
                                        <a className="nav-link text-white" id="v-pills-completed-projects-tab" data-toggle="pill" href="#v-pills-completed-projects" role="tab" aria-controls="v-pills-projects" aria-selected="true">Completed Projects</a>
                                    </li>
                                    <li className="nav-item butn_styles">
                                        <a className="nav-link text-white" id="v-pills-rating-tab" data-toggle="pill" href="#v-pills-rating" role="tab" aria-controls="v-pills-rating" aria-selected="true">Ratings</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        

                        <section role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            {/* tab content */}
                            <div className="tab-content" id="v-pills-tabContent">
                                {/* Dashboard tab */}
                                <div className="tab-pane fade show active" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Dashboard</h2>
                                    <hr className="shadow-lg" />
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="dashboard_item_1 text-right text-white">
                                                <div className="inner_box_adjust_1">
                                                    <div>
                                                        <h4>{this.state.current_user_rate}</h4>
                                                    </div>
                                                    <div>
                                                        <FaUser className="fontAwesome_icon_size"/>
                                                        <h5>Rating</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="dashboard_item_2 text-right text-white">
                                                <div className="inner_box_adjust_2">
                                                    <div>
                                                        <h4>{this.state.userBelongConstructionsCount}</h4>
                                                    </div>
                                                    <div>
                                                        <FaTasks className="fontAwesome_icon_size"/>
                                                        <h5>Projects</h5>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="dashboard_item_3 text-right text-white">
                                                <div className="inner_box_adjust_3">
                                                        <div>
                                                            <h4 className="text-right">{this.state.userBelongReviewsCount}</h4>
                                                        </div>
                                                        <div>
                                                            <FaStar className="fontAwesome_icon_size"/>
                                                            <h5>Reviews</h5>
                                                        </div>
                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <br/>
                                    <h2>Progress</h2>
                                    <hr/>
                                    
                                </div>

                                {/* Profile tab */}
                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Profile</h2>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Account Details</h4>
                                            <hr/>
                                            {/* form */}
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 profile_inputs">
                                                        <label htmlFor="inputName">Name :</label>
                                                        <input type="text" className="form-control" id="inputPassword" name="name" onChange={this.handleInput} value={this.state.name} />
                                                    </div>
                                                    
                                                    <div className="form-group col-md-6 profile_inputs">
                                                        <label htmlFor="inputEmail">Email :</label>
                                                        <input type="email" className="form-control" id="inputEmail" name="email" onChange={this.handleInput} value={this.state.email}/>
                                                    </div>
                                                    <br/>
                                                </div>

                                                <div className="form-group profile_inputs">
                                                    <label htmlFor="inputAddress">Bio :</label>
                                                    <textarea type="text" className="form-control" id="inputAddress" placeholder="Bio :" name="bio" onChange={this.handleInput} value={this.state.bio}/>
                                                </div>

                                                <div className="form-group profile_inputs">
                                                    <label htmlFor="inputAddress">Address :</label>
                                                    <input type="text" className="form-control" id="inputAddress" placeholder="Address" name="address" onChange={this.handleInput} value={this.state.address}/>
                                                </div>

                                                <div className="form-row">
                                                    <div className="form-group col-md-12 profile_inputs">
                                                        <label htmlFor="inputName">Service Price :</label>
                                                        <input type="text" className="form-control" id="inputPassword" name="service_price" placeholder="Service Price :" onChange={this.handleInput} value={this.state.service_price} />
                                                    </div>
                                                </div>

                                                    <div className="form-row">
                                                        <div className="form-group col-md-6 profile_inputs">
                                                            <label htmlFor="inputName">Zip Code :</label>
                                                            <input type="text" className="form-control" id="inputPassword" placeholder="Zip Code" name="zip_code" onChange={this.handleInput} value={this.state.zip_code}/>
                                                        </div>
                                                        <div className="form-group col-md-6 profile_inputs">
                                                            <label htmlFor="inputEmail">Reigion :</label>
                                                            <select className="custom-select" name="reigion" id="inputGroupSelect01" onChange={this.handleInput} value={this.state.reigion} required>
                                                                <option value="Central">Central</option>
                                                                <option value="North-Western">North-Western</option>
                                                                <option value="North-Central">North-Central</option>
                                                                <option value="Northern">Northern</option>
                                                                <option value="Eastern">Eastern</option>
                                                                <option value="Uwa">Uwa</option>
                                                                <option value="Southern">Southern</option>
                                                                <option value="Western">Western</option>
                                                                <option value="Sabaragamuwa">Sabaragamuwa</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6 profile_inputs">
                                                            <label htmlFor="inputName">Mobile Number :</label>
                                                            <input type="text" className="form-control" id="inputPassword" placeholder="Mobile Number" name="mobile_number" onChange={this.handleInput} value={this.state.mobile_number}/>
                                                        </div>
                                                        <div className="form-group col-md-6 profile_inputs">
                                                            <label htmlFor="inputEmail">Telephone Number :</label>
                                                            <input type="text" className="form-control" id="inputEmail" placeholder="Telephone Number" name="tele_number" onChange={this.handleInput} value={this.state.tele_number}/>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button className="text-white btn btn-lg fire_gradient" type="submit" onClick={this.handleForm}>Update Account Info</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <hr/>
                                </div>

                                {/* Completed projects tab */}
                                <div className="tab-pane fade" id="v-pills-completed-projects" role="tabpanel" aria-labelledby="v-pills-completed-projects-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Completed Projects</h2>
                                    <hr/>
                                    <br/>

                                    {/* Alert */}
                                    {this.state.alert_message=="success"?<SuccessReviewAlert message={"Completed Project (Previous Work done) deleted successfully...."} />:null}
                                    {this.state.alert_message=="error"?<ErrorReviewAlert message={"Error occured while deleting the Completed Project (Previous Work done)"} />:null}
                                    
                                    <div>
                                        <Link className="btn btn-lg btn-outline-success" to="/addWorks_done"><FaPlus/> Add a project</Link>
                                    </div>
                                    <br/>
                                    {/* View all the completed projects */}
                                    <div>
                                        <table className="table table-hover text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Duration</th>
                                                    <th scope="col">Cost</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.serviceProviderBelongedCompl_projects.length ?
                                                    
                                                    this.state.serviceProviderBelongedCompl_projects.map(compl_cons => {
                                                        return (
                                                                <tr key={compl_cons.id}>
                                                                    <th scope="row"></th>
                                                                    <td>{compl_cons.works_subject}</td>
                                                                    <td>{compl_cons.works_duration} Days</td>
                                                                    <td>LKR. {compl_cons.works_cost}</td>
                                                                    <td>
                                                                        <Link className="btn btn-success text-white" to={`works_done/${compl_cons.id}`}>Show</Link>&nbsp;
                                                                        <Link className="btn btn-warning text-white" to={`works_done/edit/${compl_cons.id}`}>Edit</Link>&nbsp;
                                                                        <a href="#" className="btn btn-danger" onClick={this.onDeleteCompletedProject.bind(this, compl_cons.id)}>Delete</a>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <th scope="row"></th>
                                                        <td></td>
                                                        <td>No Completed projects uploded yet....</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Rating Tab */}

                                <div className="tab-pane fade" id="v-pills-rating" role="tabpanel" aria-labelledby="v-pills-rating-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Ratings</h2>
                                    <hr/>
                                    {/* <Link className="btn btn-lg btn-outline-success" to="/add_reviews"><FaPlus /> Add a review</Link> */}
                                    <br/>
                                    <div>
                                        <h4>Current Rating : {this.state.current_user_rate}</h4>
                                    </div>
                                    <br/>
                                    <div>
                                        {/* View all the ratings */}
                                        <table className="table table-hover text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Subject</th>
                                                    <th scope="col">Message</th>
                                                    <th scope="col">Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {   
                                                this.state.serviceProviderBelongedReviews.length ?
                                                    
                                                    this.state.serviceProviderBelongedReviews.map(serviceProviderblongedReview => {
                                                        
                                                        return(
                                                            <tr key={serviceProviderblongedReview.id}>
                                                                <td className="text-center">{serviceProviderblongedReview.review_subject}</td>
                                                                <td className="text-center">{serviceProviderblongedReview.review_message}</td>
                                                                <td className="text-center">
                                                                    <ReactStars classNames="text-center"
                                                                        count={5}
                                                                        size={20}
                                                                        value={serviceProviderblongedReview.review_rate}
                                                                        edit={false}
                                                                        isHalf={true}
                                                                        activeColor="#ffd000"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td></td>
                                                        <td>No Reviews Added for you yet....</td>
                                                        <td></td>
                                                        
                                                    </tr>
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div> 

                            </div>
                        </section>
                            
                        
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    
    return {
        id: state.auth.user.id,
        name: state.auth.user.name,
        email: state.auth.user.email,
        bio: state.auth.user.bio,
        address: state.auth.user.address,
        service_price: state.auth.user.service_price,
        imageUrl: state.auth.user.image_url,
        reigion: state.auth.user.reigion,
        zip_code: state.auth.user.zip_code,
        mobile_number: state.auth.user.mobile_number,
        tele_number:state.auth.user.tele_number,
        user_rate: state.auth.user.new_user_rate,
        user_image:state.auth.user.user_image
    }
}

export default connect(mapStateToProps, null)(Dashboard)