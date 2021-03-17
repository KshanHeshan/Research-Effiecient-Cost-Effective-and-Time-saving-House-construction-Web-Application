import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';


class MasonProjectModal extends Component {
    
    constructor(){
        super();
        this.state={
            show:false
        }
    }

    handleShow(){
        this.setState({
            show:true
        })
    }

    closeModal(){
        this.setState({
            show:false
        })
    }

    render() {
        return (
            <div>
                <Button onClick={()=>{this.handleShow()}} className="btn-sm btn btn-success">View Project</Button>
                <Modal
                    show={this.state.show}
                    onHide={()=>{this.closeModal()}}
                    dialogClassName="modal-width-large"
               >
                   <Modal.Header closeButton>
                       <Modal.Title><h4>{this.props.subject}</h4></Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                        <hr/>
                        <div className="row col-12 justify-content-center">
                            <div className="col-3 image_frame text-center">
                                <img src={this.props.url+this.props.main_img}/>
                            </div>
                        </div>
                        <div className="row col-12 justify-content-center">
                            <div className="col-3 sub_images text-center">
                                <img src={this.props.url+this.props.img_1}/>
                            </div>
                            <div className="col-3 sub_images text-center">
                                <img src={this.props.url+this.props.img_2}/>
                            </div>
                            <div className="col-3 sub_images text-center">
                                <img src={this.props.url+this.props.img_3}/>
                            </div>
                            <div className="col-3 sub_images text-center">
                                <img src={this.props.url+this.props.img_4}/>
                            </div>
                        </div>
                        <hr/>
                       <div className="text-center">
                            <h4>{this.props.duration}</h4>
                            <h4>{this.props.cost}</h4>
                            <h4>{this.props.description}</h4>
                       </div>
                   </Modal.Body>
                   <Modal.Footer>
                       <div>
                           <button className="btn btn-danger" onClick={()=>{this.closeModal()}}>Close</button>
                       </div>
                   </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MasonProjectModal
