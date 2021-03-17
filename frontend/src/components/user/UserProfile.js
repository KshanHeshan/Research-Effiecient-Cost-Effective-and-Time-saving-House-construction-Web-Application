import React, { Component } from 'react';
import axios from 'axios';
import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import {FaEye, FaPlusCircle} from 'react-icons/fa';
import DefaultUserImage from '../css/img/male_default.jpg';
import '../css/custom.css';
import ReactStars from 'react-rating-stars-component';

class UserProfile extends Component {

    // constructor
    constructor() 
    {
        super();
        // Binding
        this.onChangeReviewSubject = this.onChangeReviewSubject.bind(this);
        this.onChangeReviewMessage = this.onChangeReviewMessage.bind(this);
        this.onChangeReviewRate = this.onChangeReviewRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        // State
        this.state={
            review_subject:'',
            review_message:'',
            review_rate: 0,
            alert_message:''
        }
    }

    // Input handlers
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

    onChangeReviewRate(e) {
        this.setState({
            review_rate:e.target.value 
        });
    }

    ratingChanged = (newRating) => {
        this.setState({
            review_rate:newRating
        });
    };

    onSubmit(e) {
        e.preventDefault();
        // New Review data
        const review = {
            review_subject : this.state.review_subject,
            review_message : this.state.review_message,
            review_rate : this.state.review_rate
        }

        // Retrieve reviews belongs to a user
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
                {/* User profile content */}
                <div>
                    <div className="topic">
                        <h1>Name : Mr. Unknown </h1>
                        <h3>Make your profile more qualified and professional to attract customers....</h3>
                    </div>
                    <br />
                    <div className="about-info">
                        <img src={DefaultUserImage} className="bio-image" alt=""></img>

                        <div className="bio">
                            <h3>BIO</h3>
                            <hr />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iure magnam, accusamus itaque fugiat consectetur beatae nobis, est voluptate facilis placeat iste nesciunt cupiditate velit aut incidunt sunt! Fugiat, nostrum.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo voluptas ipsam obcaecati quidem voluptatum excepturi debitis nulla nobis possimus, dolor perspiciatis. Eum quasi est, facilis dolores tenetur sint numquam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo voluptas ipsam obcaecati quidem voluptatum excepturi debitis nulla nobis possimus, dolor perspiciatis. Eum quasi est, facilis dolores tenetur sint numquam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo voluptas ipsam obcaecati quidem voluptatum excepturi debitis nulla nobis possimus, dolor perspiciatis. Eum quasi est, facilis dolores tenetur sint numquam.
                        </div>

                            <div className="job job-1">
                                <h3>123 Workshop</h3>
                                <hr />
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt repellat fugit amet veritatis quas ut nisi laudantium eum quae nam? Voluptate, numquam ratione labore sapiente quam illum quas omnis dicta.
                                </p>
                            </div>
                            <div className="job job-2">
                                <h3>ABC Workshop</h3>
                                <hr />
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, ipsam! Qui et voluptates eius, cum quasi similique repellat iure est quas placeat perspiciatis doloribus ipsa magni obcaecati ullam? Beatae, sint.
                                </p>
                            </div>
                            <div className="job job-3">
                                <h3>EFG Workshop</h3>
                                <hr />
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima nulla incidunt voluptates non sit repellat aliquid asperiores eius, tempore id assumenda animi voluptatum, nisi molestias? Aliquam aliquid eaque id. Tenetur!
                                </p>
                            </div>
                        </div>

                        {/* Review section */}
                        <div className="feedback_section">
                            {/* View review tab */}
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
                                        <h1><b><u>Reviews on Mr. Unknown</u></b></h1>
                                    </div>
                                <div className="notify_item row">
                                    <div className="notify_image">
                                        <img className="main_notified_image" src={DefaultUserImage} alt="#" />
                                    </div>
                                    <div className="notify_info">
                                    <hr />
                                        <p>Added a <span>review</span> on your work. Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                            Laudantium, dignissimos dolores fugit placeat, eveniet et in porro nulla ut voluptatum nemo nisi 
                                            explicabo quibusdam debitis provident fugiat minus. Officiis, quisquam.</p>
                                        <span className="notify_time">10 Minutes ago...</span>
                                    </div>
                                </div>

                                <div className="notify_item row">
                                    <div className="notify_image">
                                        <img className="main_notified_image" src={DefaultUserImage} alt="#" />
                                    </div>
                                    <div className="notify_info">
                                    <hr />
                                        <p>Added a <span>picture</span> on your work. Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                            Laudantium, dignissimos dolores fugit placeat, eveniet et in porro nulla ut voluptatum nemo nisi 
                                            explicabo quibusdam debitis provident fugiat minus. Officiis, quisquam.</p>
                                        <span className="notify_time">10 Minutes ago...</span>
                                    </div>
                                </div>
                            </div>

                            {/* Review add tabb */}
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="container">
                                <div className="text-center">
                                    <h1><b><u>Make a Review on Mr. Unknown</u></b></h1>
                                    <h4>This will help encourage them as well as to improve them....</h4>
                                </div>

                                <hr />
                                {/* Alert message */}
                                {this.state.alert_message==="success"?<SuccessReviewAlert message={"Review added successfully...."} />:null}
                                {this.state.alert_message==="error"?<ErrorReviewAlert message={"Error occured while adding the review...."} />:null}

                                {/* Review add form */}
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
                                        <label>Rate :<ReactStars
                                                        count={5}
                                                        onChange={this.ratingChanged}
                                                        size={50}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd000"
                                                    /></label>
                                        
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

export default UserProfile;