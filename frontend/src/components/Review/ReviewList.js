import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

import {FaPlus, FaTrash, FaEye} from 'react-icons/fa';
import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import Pagination from 'react-js-pagination';

class ReviewList extends Component {

    // Constructor
    constructor() 
    {
        super();

        // state
        this.state={
            reviews: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message:''
        }

        // binding
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() 
    {
        // Retreive all reviews
        axios.get('http://127.0.0.1:8000/api/reviews')
        .then(response=>{
            this.setState({
                reviews:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page
            });
        });
    }

    // Page change handler
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        axios.get('http://127.0.0.1:8000/api/reviews?page='+pageNumber)
        .then(response=>{
            this.setState({
                reviews:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page
            });
        });
    }

    // Ondelete function to delete reviews
    onDelete(review_id)
    {
        axios.delete('http://127.0.0.1:8000/api/reviews/delete/'+review_id)
        .then(response=>{
            var reviews = this.state.reviews;
            for(var i = 0; i < reviews.length; i++)
            {
                if(reviews[i].id == review_id)
                {
                    reviews.splice(i,1);
                    this.setState({reviews:reviews});
                }
            }
            this.setState({alert_message:'success'})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
    }

    render() {
        
        return (
            <main className="main">
                {/* Review list */}
                <div>
                <div className="text-center">
                    <h2 className="text-center"><u>Reviews List</u></h2>
                </div>
                    <br/>

                    {this.state.alert_message==="success"?<SuccessReviewAlert message={"Review deleted successfully...."} />:null}
                    {this.state.alert_message==="error"?<ErrorReviewAlert message={"Error occured while deleting the review"} />:null}

                    <Link className="btn btn-success" to="/add_reviews"><FaPlus /> Add a Review</Link>

                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th className="text-center" scope="col">Review Id</th>
                            <th className="text-center" scope="col">Belongs</th>
                            <th className="text-center" scope="col">Subject</th>
                            <th className="text-center text-truncate" scope="col">Message</th>
                            <th className="text-center" scope="col">Rate</th>
                            <th className="text-center" scope="col">Created AT</th>
                            <th className="text-center" scope="col">Updated AT</th>
                            <th className="text-center" scope="col">Actions</th>
                            </tr>
                        </thead>
                        {/* Display all the reviews */}
                        <tbody>
                            {
                                this.state.reviews.map(review=>{
                                    return (
                                        <tr key={review.id}>
                                            <th scope="row">{review.id}</th>
                                            <td className="text-center">{review.user_id}</td>
                                            <td className="text-center">{review.review_subject}</td>
                                            <td className="text-center text-truncate" style={{maxWidth:"150px"}}>{review.review_message}</td>
                                            <td className="text-center"><ReactStars classNames="rating"
                                                    count={5}
                                                    size={20}
                                                    value={review.review_rate}
                                                    edit={false}
                                                    isHalf={true}
                                                    activeColor="#ffd000"
                                                />
                                            </td>
                                            <td className="text-center">{review.created_at}</td>
                                            <td className="text-center">{review.updated_at}</td>
                                            <td className="text-center">
                                                <Link to={`reviews/${review.id}`} className="btn btn-success"><FaEye/></Link>&nbsp;
                                                <Link to={`reviews/edit/${review.id}`} className="btn btn-warning">Edit</Link>&nbsp;
                                                <a href="" className="btn btn-danger" onClick={this.onDelete.bind(this, review.id)}><FaTrash/></a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        {/* Page navigation */}
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={this.state.pageRangeDisplayed}
                            onChange={this.handlePageChange}
                            itemClass='page-item'
                            linkClass='page-link'
                        />
                    </div>
                </div>
            </main>
        );
    }
}

export default ReviewList;