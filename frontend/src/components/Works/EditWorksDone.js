import React, { Component } from 'react';
import SuccessWorksDoneAlert from '../Works/SuccessWorksAlert';
import ErrorWorksDoneAlert from '../Works/ErrorWorksAlert';
import axios from 'axios';

class EditWorksDone extends Component {

    // Constructor
    constructor(props) 
    {
        super(props);
        // Binding
        this.onChangeWorksDoneSubject = this.onChangeWorksDoneSubject.bind(this);
        this.onChangeWorksDoneDuration = this.onChangeWorksDoneDuration.bind(this);
        this.onChangeWorksDoneCost = this.onChangeWorksDoneCost.bind(this);
        this.onChangeWorkDescription = this.onChangeWorkDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        // state
        this.state={
            works_subject:'',
            works_duration:'',
            works_cost:'',
            works_description:'',
            alert_message:''
        }
    }

    componentDidMount() 
    {
        // retreive work dones data by id
        axios.get('http://127.0.0.1:8000/api/works_done/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                works_subject:response.data.works_subject,
                works_duration:response.data.works_duration,
                works_cost:response.data.works_cost,
                works_description:response.data.works_description
            });
        });
    }


    onChangeWorksDoneSubject(e) {
        this.setState({
            works_subject:e.target.value 
        });
    }

    onChangeWorksDoneDuration(e) {
        this.setState({
            works_duration:e.target.value 
        });
    }

    onChangeWorksDoneCost(e) {
        this.setState({
            works_cost:e.target.value 
        });
    }

    onChangeWorkDescription(e) {
        this.setState({
            works_description:e.target.value 
        });
    }

    // Onsubmit function
    onSubmit(e) {
        e.preventDefault();
        const works = {
            works_subject : this.state.works_subject,
            works_duration : this.state.works_duration,
            works_cost : this.state.works_cost,
            works_description: this.state.works_description
        }

        const formData = new FormData();
        formData.append("works_subject", this.state.works_subject)
        formData.append("works_duration", this.state.works_duration)
        formData.append("works_cost", this.state.works_cost)
        formData.append("works_meters", this.state.works_meters)
        formData.append("works_no_doors", this.state.works_no_doors)
        formData.append("works_no_windows", this.state.works_no_windows)
        formData.append("works_description", this.state.works_description)

        // send data to update a selected work done
        axios.put('http://127.0.0.1:8000/api/works_done/update/'+this.props.match.params.id, formData)
    .then(res=>{
            this.setState({alert_message:"success"})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
        
    }

    render() {
        return (
            <main className="main">
                {/* Work done update content */}
                <h2><u>Update your Works Done</u></h2>

                <hr/>
                {/* Alerts */}
                {this.state.alert_message=="success"?<SuccessWorksDoneAlert message={"Works Done updated successfully...."} />:null}
                {this.state.alert_message=="error"?<ErrorWorksDoneAlert message={"Error occured while updating the works done !!!!"} />:null}
                <br/>

                {/* Form */}
                <form onSubmit={this.onSubmit} className="form-signin">
                    <div className="form-label-group md_text_inputs">
                        <label htmlFor="inputSubject">Work Subject :</label>
                        <input type="text" id="inputSubject" className="form-control" placeholder="Work Subject :" required="" autoFocus="" value={this.state.works_subject} onChange={this.onChangeWorksDoneSubject}/>
                    </div>
                    <br/>
                    <div className="form-label-group md_text_inputs">
                        <label htmlFor="inputMessage">Work Duration :</label>
                        <textarea type="text" id="inputMessage" className="form-control" placeholder="Duration :" required="" value={this.state.works_duration} onChange={this.onChangeWorksDoneDuration}/>
                    </div>
                    <br/>
                    <div className="text-left">
                        <label>Cost :</label>
                        <input type="number" id="inputRate" className="form-control" placeholder="Cost :" required="" autoFocus="" value={this.state.works_cost} onChange={this.onChangeWorksDoneCost}/>
                    </div>
                    <br/>
                    <div className="form-label-group md_text_inputs">
                        <label>Description :</label>
                        <textarea className="text form-control" name="workDescription" id="reviewMessage" placeholder="Description :" autoFocus="" value={this.state.works_description} onChange={this.onChangeWorkDescription}/>
                    </div>
                    <br/>
                    {/*  Submit and cancel buttons */}
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

export default EditWorksDone;