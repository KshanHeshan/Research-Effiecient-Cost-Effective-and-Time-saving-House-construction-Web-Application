import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FaEdit} from 'react-icons/fa';

export default class ShowWorkDone extends Component {
    
    // Constructor
    constructor(props) 
    {
        super(props);        
        this.state={
            imageURL:'',
            customImg:'',
            pro_img_1:'',
            pro_img_2:'',
            pro_img_3:'',
            pro_img_4:'',
            work_id:'',
            works_subject:'',
            works_duration:'',
            works_cost:'',
            works_description:'',
            works_meters:''
        }
    }

    componentDidMount() 
    {
        // retrieve previous project details
        axios.get('http://127.0.0.1:8000/api/works_done/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                work_id:response.data.id,
                imageURL:response.data.image_url,
                customImg:response.data.custom_image,
                pro_img_1:response.data.project_image_1,
                pro_img_2:response.data.project_image_2,
                pro_img_3:response.data.project_image_3,
                pro_img_4:response.data.project_image_4,
                works_subject:response.data.works_subject,
                works_duration:response.data.works_duration,
                works_cost:response.data.works_cost,
                works_description:response.data.works_description,
                works_meters:response.data.works_meters
            });
        });
    }
    
    render() {
        return (
            <main className="main">
                {/* Previous project's details */}
                <div className="text-center">
                    <h1>{this.state.works_subject}</h1>
                </div>
                <hr/>
                <br/>
                <div className="container">
                    <div className="row col-12 justify-content-center main_img">
                        <img className="shadow-lg" src={this.state.imageURL+this.state.customImg} />
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                    <div className="row col-12 justify-content-center">
                        <div className="col-3 text-center sub_images">
                            <img src={this.state.imageURL+this.state.pro_img_1}/>
                        </div>
                        <div className="col-3 text-center sub_images">
                            <img src={this.state.imageURL+this.state.pro_img_2}/>
                        </div>
                        <div className="col-3 text-center sub_images">
                            <img src={this.state.imageURL+this.state.pro_img_3}/>
                        </div>
                        <div className="col-3 text-center sub_images">
                            <img src={this.state.imageURL+this.state.pro_img_4}/>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="container">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="">
                                <td className="text-center">TIme Duration :</td>
                                <td className="text-center">{this.state.works_duration}</td>
                            </tr>
                            <tr className="">
                                <td className="text-center">Total Moters :</td>
                                <td className="text-center">{this.state.works_meters}</td>
                            </tr>
                            <tr className="">
                                <td className="text-center">Total Cost :</td>
                                <td className="text-center">{this.state.works_cost}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                    <div className="text-center">
                        <p>{this.state.works_description}</p>
                    </div>
                    <hr/>
                    <div className="text-center">
                        {/* Edit button for works done */}
                    <Link className="btn btn-warning text-white" to={`/works_done/edit/${this.state.work_id}`}><FaEdit/> Edit</Link>
                    </div>
                    <hr/>
                </div>
                <div className="row text-center">
                </div>
            </main>
        )
    }
}
