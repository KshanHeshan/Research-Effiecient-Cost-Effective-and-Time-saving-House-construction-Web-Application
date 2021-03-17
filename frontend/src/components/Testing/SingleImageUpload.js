import React, { Component } from 'react';
import MaleDefaultImage from '../css/img/male_default.jpg';
import axios from 'axios';

export class SingleImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedImage:null,
            imageFile:null,
            images:[],
            imgURL:''
        }
    }

    handleChange = (event) => {
        this.setState({
            selectedImage:event.target.files[0],
            imageFile:URL.createObjectURL(event.target.files[0])
        });
        
    }

    fileUploadHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.selectedImage, this.state.selectedImage.name)
        formData.append("file_name", this.state.selectedImage.name)
        console.log(this.state.selectedImage);
        console.log(formData);
        console.log(this.state.imageFile);
        const data = {
            fileName:this.state.selectedImage.name,
            file:this.state.selectedImage
        }
        console.log(data);
        axios.post('http://localhost:8000/api/user_image_upload', formData)
        .then( res => console.log(res))
    }

    componentDidMount()
    {
        axios.get('http://localhost:8000/api/user_image_uploads')
        .then(imagesResponse => 
            {
            this.setState({
                images:imagesResponse.data.data
                // imgURL:imagesResponse.url
            })
        }
        )
    }

    render() {
        return (
            <main className="main">
                <div>
                    <h1>User Image Upload</h1>
                    <div>
                        <form encType="multipart/form-data">
                            <div>
                                <div className="">
                                    <img className="profile_picture" name="Userimage" src={this.state.imageFile} alt="" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <input type="file" onChange={this.handleChange}/>
                                <button onClick={this.fileUploadHandler}>Upload</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div className="row">
                    {
                        this.state.images.map(img=>{
                            return(
                                <div key={img.id}>
                                    <p>{img.id}</p>
                                    <p>{img.image_url}</p>
                                    <img src={img.image_url}/>
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}

export default SingleImageUpload
