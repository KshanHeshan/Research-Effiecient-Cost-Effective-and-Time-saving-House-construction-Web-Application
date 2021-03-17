import React, { Component } from 'react';
import axios from 'axios';
import SuccessReviewAlert from '../Review/SuccessReviewAlert';
import ErrorReviewAlert from '../Review/ErrorReviewAlert';
import defaultImage from '../css/img/male_default.jpg';
import '../Works/WorkDoneFunctions';
import {connect} from 'react-redux';
import Error from '../user/Error';

class AddWorksDone extends Component {

    // constructor
    constructor()
    {
        super();
        // binding
        this.onChangeWorkSubject = this.onChangeWorkSubject.bind(this);
        this.onChangeWorkDuration = this.onChangeWorkDuration.bind(this);
        this.onChangeWorkCost = this.onChangeWorkCost.bind(this);
        this.onChangeWorkDescription = this.onChangeWorkDescription.bind(this);
        this.onChangeWorkMeters = this.onChangeWorkMeters.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // state
        this.state={
            work_subject:'',
            work_duration:'',
            work_cost:'',
            work_meters:'',
            work_description:'',
            alert_message:'',
            errors:'',
            custom_image:null,
            custom_image_url:{defaultImage},
            project_image_1:null,
            project_image_1_url:{defaultImage},
            project_image_2:null,
            project_image_2_url:{defaultImage},
            project_image_3:null,
            project_image_3_url:{defaultImage},
            project_image_4:null,
            project_image_4_url:{defaultImage}
        }
    }

    handleChangeCustomImageInput = (event) => {
        this.setState({
            custom_image:event.target.files[0],
            custom_image_url:URL.createObjectURL(event.target.files[0])
        });
    }
    
    handleChangeProjectImage01 = (event2) => {
        this.setState({
            project_image_1:event2.target.files[0],
            project_image_1_url:URL.createObjectURL(event2.target.files[0])
        });
    }
    
    handleChangeProjectImage02 = (event3) => {
        this.setState({
            project_image_2:event3.target.files[0],
            project_image_2_url:URL.createObjectURL(event3.target.files[0])
        });
    }
    
    handleChangeProjectImage03 = (event4) => {
        this.setState({
            project_image_3:event4.target.files[0],
            project_image_3_url:URL.createObjectURL(event4.target.files[0])
        });
    }
    
    handleChangeProjectImage04 = (event5) => {
        this.setState({
            project_image_4:event5.target.files[0],
            project_image_4_url:URL.createObjectURL(event5.target.files[0])
        });
    }

    // function to handle inputs
    onChangeWorkSubject(e){
        this.setState({
            work_subject:e.target.value
        });
    }

    onChangeWorkDuration(e){
        this.setState({
            work_duration:e.target.value
        });
    }

    onChangeWorkCost(e){
        this.setState({
            work_cost:e.target.value
        });
    }

    onChangeWorkDescription(e){
        this.setState({
            work_description:e.target.value
        });
    }

    onChangeWorkMeters(e){
        this.setState({
            work_meters:e.target.value
        })
    }

    // onSubmit function
    onSubmit(e) 
    {
        e.preventDefault();
        // work done data
        const formData = new FormData();
        formData.append("belonged_user_id", this.props.id)
        formData.append("user_service_type", this.props.service_type)
        formData.append("work_subject", this.state.work_subject)
        formData.append("work_duration", this.state.work_duration)
        formData.append("work_cost", this.state.work_cost)
        formData.append("work_meters", this.state.work_meters)
        formData.append("work_description", this.state.work_description)
        formData.append("custom_image", this.state.custom_image)
        formData.append("project_image_1", this.state.project_image_1)
        formData.append("project_image_2", this.state.project_image_2)
        formData.append("project_image_3", this.state.project_image_3)
        formData.append("project_image_4", this.state.project_image_4)
    
        console.log(formData);

        // Store work done data using a api
        axios.post('http://127.0.0.1:8000/api/works_done/store', formData)
        .then(res=>
            {
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({
                alert_message:"error",
                errors:error.response.data.errors
            })
        }
        );
    }

    render() {
        return (
            <main className="main">
                {/* Add work done page content */}
                <div>
                    <div className="text-center">
                        <h2 className="text-center"><u>Works Done Form</u></h2>
                    </div>

                    <div className="text-center">
                        <h3>Fill the following form to add your details of completed projects....</h3>
                    </div>

                    {/* Alert message */}
                    {this.state.alert_message=="success"?<SuccessReviewAlert message={"Complete projects(Work Done) added successfully...."} />:null}
                    {this.state.alert_message=="error"?<ErrorReviewAlert message={"Error occured while adding the completed projects(Work Done)...."} />:null}

                    {/* Form */}
                    <form onSubmit={this.onSubmit} method="POST" className="text-center" encType="multipart/form-data">
                        
                        <div className="text-center text_inputs">
                            <Error error={this.state.errors['work_subject']?this.state.errors['work_subject']:null}/>
                            <input className="text" type="text" name="work_subject" id="reviewSubject" placeholder="Enter the subject" onChange={this.onChangeWorkSubject}/>
                        </div>
                        <div className="text-center text_inputs">
                            <Error error={this.state.errors['work_duration']?this.state.errors['work_duration']:null}/>
                            <input className="text" type="text" name="work_duration" id="reviewSubject" placeholder="Enter the duration" onChange={this.onChangeWorkDuration}/>
                        </div>
                        <div className="text-center text_inputs">
                            <Error error={this.state.errors['work_cost']?this.state.errors['work_cost']:null}/>
                            <input className="text" type="text" name="work_cost" id="reviewMessage" placeholder="Enter the cost" onChange={this.onChangeWorkCost}/>
                        </div>
                        <div className="text-center text_inputs">
                            <Error error={this.state.errors['work_meters']?this.state.errors['work_meters']:null}/>
                            <input className="text" type="number" name="work_meters" id="reviewMessage" placeholder="Enter the meters" onChange={this.onChangeWorkMeters}/>
                        </div>
                        <div className="text-center text_inputs">
                            <Error error={this.state.errors['work_description']?this.state.errors['work_description']:null}/>
                            <textarea className="text" name="work_description" id="reviewMessage" placeholder="Enter project description" onChange={this.onChangeWorkDescription}/>
                        </div>
                        <div>
                                <div className="row col-12 justify-content-center">
                                    <div className="col-3 image_frame text-center">
                                    <img src={this.state.custom_image_url}/>
                                    <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                    <input type="file" onChange={this.handleChangeCustomImageInput} alt=""/>
                                    </div>
                                </div>
                                <div className="row col-12 justify-content-center">
                                    <div className="col-3 image_frame text-center">
                                        <img src={this.state.project_image_1_url}/>
                                        <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                        <input type="file" onChange={this.handleChangeProjectImage01} alt=""/>
                                    </div>
                                    <div className="col-3 image_frame text-center">
                                        <img src={this.state.project_image_2_url}/>
                                        <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                        <input type="file" onChange={this.handleChangeProjectImage02} alt=""/>
                                    </div>
                                    <div className="col-3 image_frame text-center">
                                        <img src={this.state.project_image_3_url}/>
                                        <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                        <input type="file" onChange={this.handleChangeProjectImage03} alt=""/>
                                    </div>
                                    <div className="col-3 image_frame text-center">
                                        <img src={this.state.project_image_4_url}/>
                                        <Error error={this.state.errors['email']?this.state.errors['email']:null}/>
                                        <input type="file" onChange={this.handleChangeProjectImage04} alt=""/>
                                    </div>
                                </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <button className="btn btn-default fire_gradient buttn_submit" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.user.id,
        service_type:state.auth.user.service_type
    }
}

export default connect(mapStateToProps, null)(AddWorksDone)