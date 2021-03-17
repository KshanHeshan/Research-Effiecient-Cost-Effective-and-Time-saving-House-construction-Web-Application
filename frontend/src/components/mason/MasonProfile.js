import React, { Component } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import {connect} from 'react-redux';

import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import {FaEye, FaPlusCircle} from 'react-icons/fa';
import DefaultUserImage from '../css/img/male_default.jpg';
import '../css/custom.css';

class MasonProfile extends Component {
    // Constructor
    constructor(props) 
    {
        super(props);
        this.state={
            review_user_id:this.props.id,
            review_subject:'',
            review_message:'',
            review_rate:0.0,
            mason_id:'',
            mason_name:'',
            mason_bio:'',
            job_specifi:'',
            payment_type:'',
            service_price:'',
            mason_address:'',
            mason_email:'',
            mason_contact:'',
            mason_tel:'',
            mason_rate:0,
            masonBelongedReviews:[],
            masonBelongedPreviousProjects:[],
            alert_message:''
        }

        // Binding
        this.onChangeReviewSubject = this.onChangeReviewSubject.bind(this);
        this.onChangeReviewMessage = this.onChangeReviewMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // OnChange handlers
    onChangeReviewSubject(e) {
        this.setState({
            review_subject:e.target.value 
        });
    }

    onChangeReviewMessage(e) {
        this.setState({
            review_message:e.target.value 
        });
    }

    // One of the life cycle method in react
    componentDidMount() 
    {
        // Retrieving user details
        axios.get('http://127.0.0.1:8000/api/dash_masons/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                mason_id:response.data.id,
                mason_name:response.data.name,
                mason_bio:response.data.bio,
                job_specifi:response.data.job_spec,
                payment_type:response.data.payment_type,
                service_price:response.data.service_price,
                mason_address:response.data.address,
                mason_email:response.data.email,
                mason_contact:response.data.mobile_number,
                mason_tel:response.data.tele_number,
                mason_rate:response.data.new_user_rate
            });
        });

        // Retrieving service provider belonged reviews
        axios.get('http://localhost:8000/api/reviews/service_providers/'+this.props.match.params.id)
        .then(response_2=>{
            this.setState({
                masonBelongedReviews:response_2.data
            })
        });

        // Retrieving service provider belonged completed projects (work dones / privious projects)
        axios.get('http://localhost:8000/api/previous_projects/'+this.props.match.params.id)
        .then(projectsResponse=>{
            this.setState({
                masonBelongedPreviousProjects:projectsResponse.data
            })
        });
    }

    ratingChanged = (newRating) => {
        this.setState({
            review_rate:newRating
        })
    };

    // Onsubmit method
    onSubmit(e) {
        e.preventDefault();
        const review = {
            review_on_id: this.state.mason_id,
            review_user_id : this.props.id,
            review_subject : this.state.review_subject,
            review_message : this.state.review_message,
            review_rate : this.state.review_rate
        }

        // Data submit to store
        axios.post('http://127.0.0.1:8000/api/reviews/store', review)
        .then(res=>{
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
    }

    render() {
        return (
            <main className="main">
                {/* USer Details */}
                <div>
                    <div className="topic">
                        <h1>{this.state.mason_name} </h1>
                        <h3>Make your profile more qualified and professional to attract customers....</h3>
                    </div>
                    <br />
                    <div className="about-info">
                        <img src={DefaultUserImage} className="bio-image" alt=""></img>
                        <div className="bio">
                        <h3>BIO</h3>
                        <p>{this.state.mason_bio}</p>
                        <br/>
                        {/* User Details */}
                        <table className="table table-hover">
                                <tr className="row">
                                    <td className="col-md-5"><label>Price Rate : </label></td>
                                    <td className="col-md-7">LKR. {this.state.service_price} / {this.state.payment_type}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Rating : </label></td>
                                    <td className="col-md-7">{this.state.mason_rate}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>E-Mail : </label></td>
                                    <td className="col-md-7">{this.state.mason_email}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Mobile Number : </label></td>
                                    <td className="col-md-7">{this.state.mason_contact}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Tele - Number : </label></td>
                                    <td className="col-md-7">{this.state.mason_tel}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Address : </label></td>
                                    <td className="col-md-7">{this.state.mason_address}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Job Specification : </label></td>
                                    <td className="col-md-7"  style={{textTransform:'capitalize'}}>{this.state.job_specifi}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div>
                        {/* User previous projects */}
                            {
                                this.state.masonBelongedPreviousProjects.length ?

                                this.state.masonBelongedPreviousProjects.map(masonBelongedPreviousProject => {
                                    return (
                                        
                                            <div className="job job-1">
                                                
                                                <h3>{masonBelongedPreviousProject.works_subject}</h3>
                                                <hr />
                                                <table className="table table-hover">
                                                    <tr className="row">
                                                        <td className="col-md-5"><label>Time Duration : </label></td>
                                                        <td className="col-md-7">{masonBelongedPreviousProject.works_duration}</td>
                                                    </tr>
                                                    <tr className="row">
                                                        <td className="col-md-5"><label>Total Cost : </label></td>
                                                        <td className="col-md-7">Rs. {masonBelongedPreviousProject.works_cost}</td>
                                                    </tr>
                                                </table>
                                                <p>{masonBelongedPreviousProject.works_description}</p>
                                            </div>
                                        
                                    )
                                })
                                :
                                <div>
                                    <h2 className="text-center">No previous projects added by {this.state.mason_name}</h2>
                                </div>
                            }
                        </div>
                        {/* Feedback tabs */}
                    </div>
                        <div className="feedback_section">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                                    aria-selected="true"><FaEye /> &nbsp;Reviews</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                                    aria-selected="false"><FaPlusCircle /> &nbsp;Form</a>
                                </li>
                            </ul>
                            <div className="tab-content container" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="text-center">
                                        <h1><b><u>Reviews on {this.state.mason_name}</u></b></h1>
                                    </div>
                                <div className="row">
                                    {
                                        this.state.masonBelongedReviews.length ?

                                        this.state.masonBelongedReviews.map(masonBelongedReview => {
                                            return (
                                                <div className="notify_item col-12">
                                                    <div className="notify_image">
                                                        <img className="main_notified_image" src={DefaultUserImage} alt="#" />
                                                        <ReactStars classNames="rating"
                                                                    count={5}
                                                                    onChange={this.ratingChanged}
                                                                    size={20}
                                                                    value={masonBelongedReview.review_rate}
                                                                    edit={false}
                                                                    isHalf={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="orangeRed"
                                                                />
                                                    </div>
                                                    <div className="notify_info">
                                                    <hr />
                                                        <p>{masonBelongedReview.review_message}</p>
                                                        <span className="notify_time">{masonBelongedReview.created_at}</span>
                                                    </div>
                                                </div>      
                                            )
                                        })
                                        :
                                        <div className="row col-12 justify-content-center">
                                            <h5>Be the first one who added a review on {this.state.mason_name}</h5>
                                        </div>
                                    }
                                </div>

                                
                            </div>
                        
                            {/* Review form */}
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="container">
                                <div className="text-center">
                                    <h1><b><u>Make a Review on {this.state.mason_name}</u></b></h1>
                                    <h4>This will help encourage them as well as to improve them....</h4>
                                </div>

                                <hr />
                                {/* Alert message */}
                                {this.state.alert_message==="success"?<SuccessReviewAlert message={"Review added successfully...."} />:null}
                                {this.state.alert_message==="error"?<ErrorReviewAlert message={"Error occured while adding the review...."} />:null}

                                <form onSubmit={this.onSubmit} className="form-signin">
                                    <div className="form-label-group md_text_inputs">
                                        <label htmlFor="inputSubject">Subject</label>
                                        <input type="text" id="inputSubject" className="form-control" placeholder="Subject" required="" autoFocus="" value={this.state.review_subject} onChange={this.onChangeReviewSubject}/>
                                    </div>
                                    <br/>
                                    <div className="form-label-group md_text_inputs">
                                        <label htmlFor="inputMessage">Message</label>
                                        <textarea type="text" id="inputMessage" className="form-control" placeholder="Message" required="" value={this.state.review_message} onChange={this.onChangeReviewMessage}/>
                                    </div>
                                    <br/>
                                    <div className="text-left">
                                        <label>Rate : <ReactStars classNames="rating"
                                                            count={5}
                                                            onChange={this.ratingChanged}
                                                            size={50}
                                                            edit={true}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd000"
                                                        /> </label>
                                        
                                    </div>
                                    <br/>
                                    <div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        &nbsp;
                                        <button type="reset" className="btn btn-danger">Cancel</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.user.id
    }
}

export default connect(mapStateToProps, null)(MasonProfile)