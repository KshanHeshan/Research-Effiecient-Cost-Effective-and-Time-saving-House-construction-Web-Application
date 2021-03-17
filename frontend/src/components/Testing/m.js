import React, { Component } from 'react';
import ImageUploading from 'react-images-uploading';

export class m extends Component {

// fileSelectedHandler = (e) => {
    //     console.log(this.state.imagesAr);
    //     console.log(e.target.files);
    //     this.setState({
    //         imagesAr:e.target.files
    //     });
    // }

    // onSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(this.state.imagesAr);
    //     let images = this.state.imagesAr;
    //     console.log(images);

        // const formData = new FormData();

        // const data = images;

        // formData.append('images', data)
        // images.forEach(file=>{
        //     formData.append("images", file)
        // });
        // console.log(images);
        // formData.append("files", this.state.imagesAr, null)
        // formData.append("file_name", this.state.selectedImage.name)
        // console.log(this.state.selectedImage);
        // console.log("formData"+formData);
        // console.log("URL"+this.state.imageFile);
        // const data = {
        //     fileName:this.state.selectedImage.name,
        //     file:this.state.selectedImage
        // }
    //     axios.post('http://127.0.0.1:8000/api/multiple_images', data)
    //     .then( res => console.log(res))
    // }
    
    onChange = (imageList) => {
        // data for submit
        //Getting total number of images
        var images = imageList.length
        // Create an object of formData 
        const formData = new FormData(); 
     
         //Saving multiple images in formadta varibale
         for(var a = 0; a<images; a++)
         {
          formData.append( 
            "myFile"+a, 
            imageList[a].file, 
            imageList[a].file.name
          ); 
          
         }
        // Update the formData object 
        
       
        // Details of the uploaded file 
       
       
        // Request made to the backend api 
        // Send formData object 
        axios.post("http://localhost/reactimageupload.php", formData); 
      }; 
    

    render() {
        return (
            <div>
                <div className="maincontainer">
       
       <h1 className="mr-5 ml-5 mt-5">Therichpost.com</h1>
       <div className="container mb-5 mt-5">
       
       <ImageUploading
       onChange={this.onChange}
       maxNumber={maxNumber}
       multiple
     >
       {({ imageList, onImageUpload }) => (
         // write your building UI
         <div className="imageuploader">
           <div className="mainBtns">
           <button className="btn btn-primary mr-1" onClick={onImageUpload}>Upload Image</button>
           
           </div>
           {imageList.map((image) => (
             <div className="imagecontainer" key={image.key}>
               <img src={image.dataURL} />
               
             </div>
           ))}
         </div>
       )}
     </ImageUploading>
       
           
     </div>
    
     </div>
            </div>
        )
    }
}

export default m
