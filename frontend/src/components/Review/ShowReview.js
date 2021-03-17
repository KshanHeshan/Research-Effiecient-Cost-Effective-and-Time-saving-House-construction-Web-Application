import React, { Component } from 'react';
import axios from 'axios';

export default class ShowReview extends Component {
    
    // constructor
    constructor(props) 
    {
        super(props);
        // state        
        this.state={
            review_subject:'',
            review_message:'',
            review_rate:''
        }
    }

    componentDidMount() 
    {
        // Retreive a selected reviews' data
        axios.get('http://127.0.0.1:8000/api/reviews/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                review_subject:response.data.review_subject,
                review_message:response.data.review_message,
                review_rate:response.data.review_rate
            });
        });
    }

    render() {
        return (
            <main className="main">
                {/* View review page content */}
                <div className="text-center">
                    <h1>{this.state.review_subject}</h1>
                </div>
                <hr/>
                <br/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="text-left"></th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>Messgae :</td>
                            <td>{this.state.review_message}</td>
                        </tr>
                        <tr className="">
                            <td>Review Rate :</td>
                            <td className="text-right">{this.state.review_rate}</td>
                        </tr>
                    </tbody>
                </table>
            </main>
        )
    }
}
