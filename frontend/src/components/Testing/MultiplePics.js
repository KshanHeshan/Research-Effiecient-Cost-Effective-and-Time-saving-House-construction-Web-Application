import React, { Component } from 'react';
import defaultImage from '../css/img/male_default.jpg';
import axios from 'axios';

class MultiplePics extends Component {

  constructor(){
    super();
    this.state = {
      custom_image:null,
      custom_image_url:{defaultImage},
      project_image_1:null,
      project_image_1_url:{defaultImage},
      project_image_2:null,
      project_image_2_url:{defaultImage},
      project_image_3:null,
      project_image_3_url:{defaultImage},
      project_image_4:null,
      project_image_4_url:{defaultImage},
      images:[]
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

  fileUploadHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("custom_image", this.state.custom_image, this.state.custom_image.name)
    formData.append("project_image_1", this.state.project_image_1, this.state.project_image_1.name)
    formData.append("project_image_2", this.state.project_image_2, this.state.project_image_2.name)
    formData.append("project_image_3", this.state.project_image_3, this.state.project_image_3.name)
    formData.append("project_image_4", this.state.project_image_4, this.state.project_image_4.name)
    // formData.append("file_name", this.state.selectedImage.name)
    // console.log(this.state.selectedImage);
    console.log(formData);
    // console.log(this.state.imageFile);
    // const data = {
    //     fileName:this.state.selectedImage.name,
    //     file:this.state.selectedImage
    // }
    // console.log(data);
    axios.post('http://localhost:8000/api/multiple_images', formData)
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
      <main className="main-nopaddingUp">
          <div>
          <form>
            <div class="row col-12 justify-content-center">
                <div class="col-3 image_frame text-center">
                  <img src={this.state.custom_image_url}/>
                  <input type="file" onChange={this.handleChangeCustomImageInput} alt=""/>
                </div>
            </div>
            <div class="row col-12 justify-content-center">
                <div class="col-3 image_frame text-center">
                  <img src={this.state.project_image_1_url}/>
                  <input type="file" onChange={this.handleChangeProjectImage01} alt=""/>
                </div>
                <div class="col-3 image_frame text-center">
                  <img src={this.state.project_image_2_url}/>
                  <input type="file" onChange={this.handleChangeProjectImage02} alt=""/>
                </div>
                <div class="col-3 image_frame text-center">
                  <img src={this.state.project_image_3_url}/>
                  <input type="file" onChange={this.handleChangeProjectImage03} alt=""/>
                </div>
                <div class="col-3 image_frame text-center">
                  <img src={this.state.project_image_4_url}/>
                  <input type="file" onChange={this.handleChangeProjectImage04} alt=""/>
                </div>
            </div>
            <div>
            <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
          </form>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div>
            <div class="row col-12 justify-content-center">
            {
                        this.state.images.map(img=>{
                            return(
                                <div key={img.id}>
                                    <p>{img.id}</p>
                                    <p>{img.image_url}</p>
                                    <img src={img.image_url+img.custom_image}/>
                                    <img src={img.image_url+img.project_image_1}/>
                                    <img src={img.image_url+img.project_image_2}/>
                                    <img src={img.image_url+img.project_image_3}/>
                                    <img src={img.image_url+img.project_image_4}/>
                                </div>
                            )
                        })
                    }
            </div>
          </div>
      </main>
    )
  }
}

export default MultiplePics
