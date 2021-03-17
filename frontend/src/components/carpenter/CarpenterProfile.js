import React, { Component } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import {connect} from 'react-redux';

import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import {FaEye, FaPlusCircle} from 'react-icons/fa';
import DefaultUserImage from '../css/img/male_default.jpg';
import '../css/custom.css';

class CarpenterProfile extends Component {

    constructor(props) 
    {
        super(props);
        // Binding
        this.onChangeReviewSubject = this.onChangeReviewSubject.bind(this);
        this.onChangeReviewMessage = this.onChangeReviewMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        // State
        this.state={
            review_user_id:this.props.id,
            review_subject:'',
            review_message:'',
            review_rate:'',
            carpenter_id:'',
            carpenter_bio:'',
            carpenter_name:'',
            job_specifi:'',
            payment_type:'',
            service_price:'',
            carpenter_address:'',
            carpenter_email:'',
            carpenter_contact:'',
            carpenter_tel:'',
            carpenter_rate:0,
            carpenterBelongedReviews:[],
            carpenterBelongedPreviousProjects:[],
            alert_message:''
        }
    }

    // onChange handler for review subject
    onChangeReviewSubject(e) {
        this.setState({
            review_subject:e.target.value 
        });
    }

    // onChange handler for review message
    onChangeReviewMessage(e) {
        this.setState({
            review_message:e.target.value 
        });
    }

    // Component did mount life cycle method
    componentDidMount() 
    {
        // Retireve particular carpenter's details
        axios.get('http://localhost:8000/api/dash_carpenters/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                carpenter_id:response.data.id,
                carpenter_name:response.data.name,
                carpenter_bio:response.data.bio,
                job_specifi:response.data.job_spec,
                payment_type:response.data.service_price_type,
                service_price:response.data.service_price,
                carpenter_address:response.data.address,
                carpenter_email:response.data.email,
                carpenter_contact:response.data.mobile_number,
                carpenter_tel:response.data.tele_number,
                carpenter_rate:response.data.new_user_rate
            });
        });

        // Retrieve reviews for the service providers
        axios.get('http://localhost:8000/api/reviews/service_providers/'+this.props.match.params.id)
        .then(response_2=>
            {
            this.setState({
                carpenterBelongedReviews:response_2.data
            })
        }
        );

        // Retrieving service provider belonged completed projects (work dones / privious projects)
        axios.get('http://localhost:8000/api/previous_projects/'+this.props.match.params.id)
        .then(projectsResponse=>{
            this.setState({
                carpenterBelongedPreviousProjects:projectsResponse.data
            })
        });
    }

    ratingChanged = (newRating) => {
        this.setState({
            review_rate:newRating
        })
    };

    // OnSubmit methods to handle the form submission
    onSubmit(e) {
        e.preventDefault();
        const review = {
            review_on_id: this.state.carpenter_id,
            review_user_id : this.props.id,
            review_subject : this.state.review_subject,
            review_message : this.state.review_message,
            review_rate : this.state.review_rate
        }

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
                <div>
                    <div className="topic">
                        <h1 style={{textTransform:'capitalize'}}>{this.state.carpenter_name} </h1>
                        <h3>Make your profile more qualified and professional to attract customers....</h3>
                    </div>
                    <br />
                    {/* Carpenter profile Starts here */}
                    <div className="about-info">
                        <img src={DefaultUserImage} className="bio-image" alt=""></img>

                        <div className="bio">
                            <h3>BIO</h3>
                            <p>{this.state.carpenter_bio}</p>
                            
                            <table className="table table-hover">
                                <tr className="row">
                                    <td className="col-md-5"><label>Price Rate : </label></td>
                                    <td className="col-md-7">LKR. {this.state.service_price} / {this.state.payment_type}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Rating : </label></td>
                                    <td className="col-md-7">{this.state.carpenter_rate}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>E-Mail : </label></td>
                                    <td className="col-md-7">{this.state.carpenter_email}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Mobile Number : </label></td>
                                    <td className="col-md-7">{this.state.carpenter_contact}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Tele - Number : </label></td>
                                    <td className="col-md-7">{this.state.carpenter_tel}</td>
                                </tr>
                                <tr className="row">
                                    <td className="col-md-5"><label>Address : </label></td>
                                    <td className="col-md-7">{this.state.carpenter_address}</td>
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
                                    this.state.carpenterBelongedPreviousProjects.length ?

                                    this.state.carpenterBelongedPreviousProjects.map(carpenterBelongedPreviousProject => {
                                        return (
                                            
                                                <div className="job job-1">
                                                    
                                                    <h3>{carpenterBelongedPreviousProject.works_subject}</h3>
                                                    <hr />
                                                    <table className="table table-hover">
                                                        <tr className="row">
                                                            <td className="col-md-5"><label>Time Duration : </label></td>
                                                            <td className="col-md-7">{carpenterBelongedPreviousProject.works_duration}</td>
                                                        </tr>
                                                        <tr className="row">
                                                            <td className="col-md-5"><label>Total Cost : </label></td>
                                                            <td className="col-md-7">{carpenterBelongedPreviousProject.works_cost}</td>
                                                        </tr>
                                                    </table>
                                                    <p>{carpenterBelongedPreviousProject.works_description}</p>
                                                </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <h2 className="text-center">No previous projects added by {this.state.carpenter_name}</h2>
                                    </div>
                                }
                            </div>
                        </div>

                        {/* Tab panel in the carpenter profile */}
                        <div className="feedback_section">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><FaEye /> &nbsp;Reviews</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><FaPlusCircle /> &nbsp;Form</a>
                                </li>
                            </ul>

                            {/* Reviews list on a particular carpenter */}
                            <div className="tab-content container" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="text-center">
                                        <h1><b><u>Reviews on {this.state.carpenter_name}</u></b></h1>
                                    </div>
                                    <div className="row">
                                        {
                                            this.state.carpenterBelongedReviews.length ?

                                            this.state.carpenterBelongedReviews.map(carpenterBelongedReview => {
                                                return(
                                                    <div className="notify_item col-12">
                                                        <div className="notify_image">
                                                            <img className="main_notified_image" src={DefaultUserImage} alt="#" />
                                                            <ReactStars classNames="rating"
                                                                        count={5}
                                                                        onChange={this.ratingChanged}
                                                                        size={20}
                                                                        value={carpenterBelongedReview.review_rate}
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
                                                            <p>{carpenterBelongedReview.review_message}</p>
                                                            <span className="notify_time">{carpenterBelongedReview.created_at}</span>
                                                        </div>
                                                    </div>      
                                                )                                        
                                            })
                                            :
                                            <div className="row justify-content-center">
                                                <h5 className="row justify-content-center">Be the first one who added a review on {this.state.carpenter_name}</h5>
                                            </div>
                                        }
                                </div>
                            </div>

                            {/* Add a review on a carpenter */}
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="container">
                                    <div className="text-center">
                                        <h1><b><u>Make a Review on {this.state.carpenter_name}</u></b></h1>
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
                                        <div className="text-center">
                                            <label>Rate :<ReactStars classNames="rating"
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

export default connect(mapStateToProps, null)(CarpenterProfile)