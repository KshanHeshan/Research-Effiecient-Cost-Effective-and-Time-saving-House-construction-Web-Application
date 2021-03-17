import React, { Component } from 'react';
import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

class ReviewEdit extends Component {

    // Constructor
    constructor(props) 
    {
        super(props);
        // Binding
        this.onChangeReviewSubject = this.onChangeReviewSubject.bind(this);
        this.onChangeReviewMessage = this.onChangeReviewMessage.bind(this);
        this.onChangeReviewRate = this.onChangeReviewRate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        // state
        this.state={
            review_subject:'',
            review_message:'',
            review_rate:null,
            alert_message:''
        }
    }

    componentDidMount() 
    {
        // find the currect review to edit
        axios.get('http://127.0.0.1:8000/api/reviews/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                review_subject:response.data.review_subject,
                review_message:response.data.review_message,
                review_rate:response.data.review_rate
            });
            // console.log(parseFloat(response.data.review_rate));
        });

        
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

    onChangeReviewRate(newRating) {
        this.setState({
            review_rate:newRating
        })
    }

    // Onsubmit function to store updated review data
    onSubmit(e) {
        e.preventDefault();
        const review = {
            review_subject : this.state.review_subject,
            review_message : this.state.review_message,
            review_rate : this.state.review_rate
        }

        // send data to the backend
        axios.put('http://127.0.0.1:8000/api/reviews/update/'+this.props.match.params.id, review)
        .then(res=>{
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
    }

    render() {
        return (
            <main className="main">

                {/* Alert */}
                {this.state.alert_message==="success"?<SuccessReviewAlert message={"Review updated successfully...."} />:null}
                {this.state.alert_message==="error"?<ErrorReviewAlert message={"Error occured while updating the review"} />:null}

                <hr/>

                <h2><u>Update your review</u></h2>

                <hr/>
                {/* form */}
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
                    <div className="">
                        <label>Rate : {this.state.review_rate} 
                        <ReactStars
                            count={5}
                            onChange={this.onChangeReviewRate}
                            size={50}
                            value={this.state.review_rate}
                            edit={true}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd000"
                        />
                        </label>
                    </div>
                    <br/>
                    <div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        &nbsp;
                        <button type="reset" className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </main>
        );
    }
}

export default ReviewEdit;