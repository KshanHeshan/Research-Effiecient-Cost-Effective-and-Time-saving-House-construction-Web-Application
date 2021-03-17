import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import {FaStar, FaTasks, FaUser, FaPlus} from 'react-icons/fa';
import DashboardLogo from '../css/img/HomeConstruction_Main_logo.png';
import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import { connect } from 'react-redux';
import DashboardLogoWhite from '../css/img/Home_Construction_logo_White.png';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email,
            address: props.address,
            imgUrl: props.imageUrl,
            reigion: props.reigion,
            zip_code: props.zip_code,
            mobile_number: props.mobile_number,
            tele_number:props.tele_number,
            userBelongReviews:[],
            userBelongReviewsCount:null,
            userBelongConstructions:[],
            userBelongConstructionsCount:null,
            userSelectedProfileImage:null,
            serviceProviderBelongedCompl_projects:[],
            errors:{},
            alert_message:''
        }
        
    }

    handleInput = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }

    userProfileImageHandler = (event) =>{
        this.setState({
            userSelectedProfileImage: URL.createObjectURL(event.target.files[0])
        })
    }

    handleForm = e => {
        e.preventDefault();
        const data = {email: this.state.email, name: this.state.name, address: this.state.address, imgUrl: this.state.imgUrl, reigion: this.state.reigion, zip_code: this.state.zip_code, mobile_number: this.state.mobile_number, tele_number: this.state.tele_number}
        axios.patch("http://localhost:8000/api/auth/update", data)
        .then(res => {
            console.log(res.data);
        })
        .catch(e => this.setState({errors: e.response.data}))
    }

    componentDidMount() 
    {
        axios.get('http://127.0.0.1:8000/api/breviews/'+this.props.id)
        .then(response=>{
            this.setState({
                userBelongReviews:response.data,
                userBelongReviewsCount: response.data.length
            });
        });

        axios.get('http://127.0.0.1:8000/api/construction_proj/'+this.props.id)
        .then(contru_response => {
            this.setState({
                userBelongConstructions:contru_response.data,
                userBelongConstructionsCount:contru_response.data.length
            })
        })

        axios.get('http://127.0.0.1:8000/api/complete_projects/'+this.props.id)
        .then(compl_response => {
            console.log(compl_response);
            this.setState({
                serviceProviderBelongedCompl_projects:compl_response.data,
            })
        })
        
    }

    onDeleteReview(review_id)
    {
        axios.delete('http://127.0.0.1:8000/api/reviews/delete/'+review_id)
        .then(response=>{

            var userBelongReviews = this.state.userBelongReviews;

            for(var i = 0; i < userBelongReviews.length; i++)
            {
                if(userBelongReviews[i].id == review_id)
                {
                    userBelongReviews.splice(i,1);
                    this.setState({userBelongReviews:userBelongReviews});
                }
            }

            this.setState({alert_message:'success'})

        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
    }

    onDeleteConstructionProject(constructionProject_id)
    {
        axios.delete('http://127.0.0.1:8000/api/constructions/delete/'+constructionProject_id)
        .then(response=>{

            var userBelongConstructions = this.state.userBelongConstructions;

            for(var i = 0; i < userBelongConstructions.length; i++)
            {
                if(userBelongConstructions[i].id == constructionProject_id)
                {
                    userBelongConstructions.splice(i,1);
                    this.setState({userBelongConstructions:userBelongConstructions});
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
                <div className="container-fluid">
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
                                        <a className="nav-link text-white" id="v-pills-construction-tab" data-toggle="pill" href="#v-pills-construction" role="tab" aria-controls="v-pills-construction" aria-selected="true">Construction Projects</a>
                                    </li>
                                    <li className="nav-item butn_styles">
                                        <a className="nav-link text-white" id="v-pills-review-tab" data-toggle="pill" href="#v-pills-review" role="tab" aria-controls="v-pills-review" aria-selected="true">Reviews</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        

                        <section role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Dashboard</h2>
                                    <hr className="shadow-lg" />
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="dashboard_item_1 text-right text-white">
                                                <div className="inner_box_adjust_1">
                                                    <div>
                                                        <h4>1</h4>
                                                    </div>
                                                    <div>
                                                        <FaUser className="fontAwesome_icon_size"/>
                                                        <h5>Users</h5>
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
                                </div>
                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Profile</h2>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Account Details</h4>
                                            <hr/>
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
                                                        <label htmlFor="inputAddress">Address :</label>
                                                        <input type="text" className="form-control" id="inputAddress" placeholder="Address" name="address" onChange={this.handleInput} value={this.state.address}/>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6 profile_inputs">
                                                            <label htmlFor="inputName">Zip Code :</label>
                                                            <input type="text" className="form-control" id="inputPassword" placeholder="Zip Code" name="zip_code" onChange={this.handleInput} value={this.state.zip_code}/>
                                                        </div>
                                                        <div className="form-group col-md-6 profile_inputs">
                                                            <label htmlFor="inputEmail">Reigion :</label>
                                                            <select className="custom-select" name="reigion" value={this.state.reigion} id="inputGroupSelect01" onChange={this.handleInput} required>
                                                                <option defaultValue>Choose your reigion...</option>
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
                                <div className="tab-pane fade" id="v-pills-construction" role="tabpanel" aria-labelledby="v-pills-construction-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Construction Projects</h2>
                                    <hr/>
                                    {this.state.alert_message=="success"?<SuccessReviewAlert message={"Construction Project deleted successfully...."} />:null}
                                    {this.state.alert_message=="error"?<ErrorReviewAlert message={"Error occured while deleting the Construction Project"} />:null}
                                    
                                    <br/>
                                    <div className="d-flex justify-content-left">
                                        <Link className="btn btn-lg btn-outline-success" to="/process"><FaPlus/> Add Construction Project</Link>
                                    </div>
                                    <hr/>
                                    <div>
                                        <table className="table table-hover text-center">
                                            <thead>
                                                <tr>
                                                <th scope="col">Project Name</th>
                                                <th scope="col">Carpenter Name</th>
                                                <th scope="col">Mason Name</th>
                                                <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {
                                                    this.state.userBelongConstructions.length ?

                                                    this.state.userBelongConstructions.map(belongedConstruction => {
                                                        return(
                                                            <tr key={belongedConstruction.id}>
                                                                
                                                                <td>1</td>
                                                                <td><Link to={`/carpenter/${belongedConstruction.carpenter_id}`}>{belongedConstruction.carpenter}</Link></td>
                                                                <td><Link to={`/mason/${belongedConstruction.mason_id}`}>{belongedConstruction.mason}</Link></td>
                                                                <td>
                                                                    <Link className="btn btn-success text-white" to={`constructions/${belongedConstruction.id}`}>Show</Link>&nbsp;
                                                                    <Link className="btn btn-warning text-white" to={`process/edit/${belongedConstruction.id}`}>Edit</Link>&nbsp;
                                                                    <a href="#" className="btn btn-danger" onClick={this.onDeleteConstructionProject.bind(this, belongedConstruction.id)}>Delete</a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td></td>
                                                        <td>No Construction projects Created yet....</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-pills-review" role="tabpanel" aria-labelledby="v-pills-review-tab">
                                    <h2><img className="dashboard_logo_image" src={DashboardLogo} alt="" /> Reviews</h2>
                                    <hr/>
                                    {/* <Link className="btn btn-lg btn-outline-success" to="/add_reviews"><FaPlus /> Add a review</Link> */}
                                    <br/>
                                    {this.state.alert_message=="success"?<SuccessReviewAlert message={"Review deleted successfully...."} />:null}
                                    {this.state.alert_message=="error"?<ErrorReviewAlert message={"Error occured while deleting the review"} />:null}
                                    <br/>
                                    <div>
                                        <table className="table table-hover text-center">
                                            <thead>
                                                <tr>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Message</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {   
                                                this.state.userBelongReviews.length ?
                                                    
                                                    this.state.userBelongReviews.map(blongedReview => {
                                                        
                                                        return(
                                                            <tr key={blongedReview.id}>
                                                                <td className="text-center">{blongedReview.review_subject}</td>
                                                                <td className="text-center">{blongedReview.review_message}</td>
                                                                <td className="text-center">
                                                                    <ReactStars classNames="text-center"
                                                                        count={5}
                                                                        // onChange={this.ratingChanged}
                                                                        size={20}
                                                                        value={blongedReview.review_rate}
                                                                        edit={false}
                                                                        isHalf={true}
                                                                        // emptyIcon={<i className="far fa-star"></i>}
                                                                        // halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                        // fullIcon={<i className="fa fa-star"></i>}
                                                                        activeColor="#ffd000"
                                                                    />
                                                                </td>
                                                                <td>
                                                                <Link to={`reviews/${blongedReview.id}`} className="btn btn-success">Show</Link>&nbsp;
                                                                <Link to={`reviews/edit/${blongedReview.id}`} className="btn btn-warning">Edit</Link>&nbsp;
                                                                <a href="#" className="btn btn-danger" onClick={this.onDeleteReview.bind(this, blongedReview.id)}>Delete</a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <td></td>
                                                        <td>No Reviews Added yet....</td>
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
                                    <br/>
                                    <div>
                                        <table className="table table-hover text-center">
                                            <thead>
                                                <tr>
                                                <th scope="col">id</th>
                                                <th scope="col">User_id</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col">Message</th>
                                                <th scope="col">Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {   
                                                this.state.userBelongReviews.length ?
                                                    
                                                    this.state.userBelongReviews.map(blongedReview => {
                                                        
                                                        return(
                                                            <tr key={blongedReview.id}>
                                                                <th scope="row">{blongedReview.id}</th>
                                                                <td className="text-center">{blongedReview.user_id}</td>
                                                                <td className="text-center">{blongedReview.review_subject}</td>
                                                                <td className="text-center">{blongedReview.review_message}</td>
                                                                <td className="text-center">
                                                                    <ReactStars classNames="text-center"
                                                                        count={5}
                                                                        // onChange={this.ratingChanged}
                                                                        size={20}
                                                                        value={blongedReview.review_rate}
                                                                        edit={false}
                                                                        isHalf={true}
                                                                        // emptyIcon={<i className="far fa-star"></i>}
                                                                        // halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                        // fullIcon={<i className="fa fa-star"></i>}
                                                                        activeColor="#ffd000"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <tr>
                                                        <th scope="row"></th>
                                                        <td></td>
                                                        <td>No Reviews Added yet....</td>
                                                        <td></td>
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
        address: state.auth.user.address,
        imageUrl: state.auth.user.image_url,
        reigion: state.auth.user.reigion,
        zip_code: state.auth.user.zip_code,
        mobile_number: state.auth.user.mobile_number,
        tele_number:state.auth.user.tele_number
    }
}

export default connect(mapStateToProps, null)(Dashboard)