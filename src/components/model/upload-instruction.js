import React, { Component } from 'react'
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap"
import { closeUploadModel } from "../../actions/model" 


class UploadManually extends Component {

    constructor() {
        super()
        this.state = {
            isFileSelected: false,
            isDragg: false,
            documents: []
        }
    }

    closeModel = () => {
        this.props.dispatch(closeUploadModel())
    }

    render() {
        const { upload_manual_show } = this.props
        return (
            <>
                <Modal show={upload_manual_show} >
                    <Modal.Header>
                        <Modal.Title>Last check before your upload manually</Modal.Title>
                    </Modal.Header>
                    <form>
                    <Modal.Body>
                    <div className="col-md-12">
                        <div className="form_spacing d-flex flex-col-m mn_height_3">
                            <div className="boxstyle_2 d-block text-center mt-4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <img src='images/image_processing.png' alt="" />
                                    </div>
                                </div>
                                <button type="button" onClick={this.closeModel} className={"btn btn-upload"}>
                                    Upload Manually
                                </button>
                                <button type="button" onClick={this.closeModel} className={"btn btn-upload"}>
                                    Continue Digitally
                                </button>
                                <ul>
                                    <li>MOST POPULAR: 90%+ users choose digital. </li>
                                    <li>FAST: 4x faster than manual Upload. </li>
                                    <li>SECURE: RBI secure network. </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    </Modal.Body>
                    </form>
                </Modal>
            </>
        )
    }

}

function mapStateToProps(state) {
    const { upload_manual_show } = state.model;
    return {
        upload_manual_show,
    };
  }

export default connect(mapStateToProps)(UploadManually)