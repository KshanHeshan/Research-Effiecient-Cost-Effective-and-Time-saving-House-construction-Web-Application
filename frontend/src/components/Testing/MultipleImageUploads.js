import React, { Component } from 'react';
import axios from  'axios';

export default class MultipleImageUploads extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)

        const form = new FormData();
        form.append('images', this.state.file);

        axios.post('http://127.0.0.1:8000/api/multiple_images', form)
        .then( res => console.log(res))
    }

    render() {
        return (
            <form>
                <div className="text-center">
                    <div className="form-group img_pre_sps">
                        {(this.fileArray || []).map(url => (
                            <img className="upload_img" src={url} alt="..." />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
            </form >
        )
    }
}
