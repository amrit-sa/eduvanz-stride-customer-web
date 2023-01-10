import React, { Component, useState, useEffect, useRef } from 'react'
import $ from 'jquery';
import { connect, useDispatch } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets";
import { getPlans, selectPlan, storeDownPayment } from "../../actions/payment";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import "./payment-plans.css";
import { getDocCategory, getDocTypeName } from "../../actions/uploadFile"
import { validatePan, faceMatch, getProfileDocument, uploadDocument, convertToBase64, documentSubmit, getPanDocument, removeDocument, getAccountProfile, fraudCheck } from "../../actions/user"
// import crossicon from "../../../public/images/icons/Vectorc.png";



class UploadDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.isOpen,
            DocCategory: [],
            DocName: [],
            showcat: false,
            showtype: false,

            selectyeddocType: "",
            selecteddocName: "",


            profile: null,


            file: "",
            fileName: "",
            is_fileUploaded: false,
            upload_error: false,
            upload_success: false,
            selectOption:false,
        }

    }
    componentDidMount() {
        this.props.dispatch(getDocCategory()).then((response) => {
            console.log(response, "response")
            this.setState({ DocCategory: response.data })
        })

        // this.props.dispatch(getDocTypeName()).then((response) => {
        //     console.log(response, "response")
        //     this.setState({ DocName: response.data })
        // })
    }


    selectdocType =  (selected) => {
        //console.log(selected + "ajjjjjjjjjjj");
        this.setState({ selectyeddocType: selected })
        this.setState({ showcat: !this.state.showcat })
        const givenData = {category:selected}
        this.props.dispatch(getDocTypeName(givenData)).then((response) => {
            console.log(response, "ajjjjjjjjjjj")
            this.setState({ DocName: response.data.document_types })
        })
    }

    selectdocName(selected) {
        this.setState({ selecteddocName: selected })
        this.setState({ showtype: !this.state.showtype })
    }




    fileToBase64 = (file, cb) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            cb(null, reader.result)
        }
        reader.onerror = function (error) {
            cb(error, null)
        }
    }

    onUploadFileChange = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
            return
        }

        let formData = new FormData();
        formData.append('files', target.files[0]);

        this.props.dispatch(convertToBase64(formData)).then((response) => {
            console.log(response, "response")
            this.setState({
                file: response.base64,
                fileName: target.files[0]
            })
        })



        // this.fileToBase64(target.files[0], (err, result) => {
        //     if (result) {
        //         this.setState({ file: result })
        //         this.setState({ fileName: target.files[0] })
        //     }
        // })
    }



    sumbit = () => {
        const data = {
            "catType": this.state.selectyeddocType,
            "doctype": this.state.selecteddocName,
            "fname": this.state.fileName.name,
            "parent_id": this.props.sfid,
            "base64": this.state.file
        }
        this.props.dispatch(documentSubmit(data)).then((response) => {
            console.log(response);
            if (response.status == 'success') {
                
                this.setState({ selectOption: true })
                this.setState({ selectyeddocType: "" })
                this.setState({ selecteddocName: "" })
                this.setState({ fileName: "" })
                this.setState({ file: "" })
                this.setState({ is_fileUploaded: true })
                this.setState({ upload_error: false })
                this.setState({ upload_success: true })
            }

            if (response.status == 'error') {

                this.setState({ selectyeddocType: "" })
                this.setState({ selecteddocName: "" })
                this.setState({ fileName: "" })
                this.setState({ file: "" })
                this.setState({ is_fileUploaded: true })
                this.setState({ upload_error: true })
                this.setState({ upload_success: false })

            }

        })
    }


    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        // console.log(this.state.DocName + "oooooooooooooooo")
        let frontInputRef;
        return (
            <>
                <Dialog className="MuiDialog-paperWidthSm cursor-point" open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title" style={{ "height": "45rem", "maxWidth": "60rem !important" }}>
                    <DialogContent>
                        <section>
                            <div className=''>

                                <div className='d-flex justify-content-between text-left'>
                                    <h4 className='fw-bold'>Upload Additional Document</h4>
                                    <span className='text-right'>
                                        <img src={asset + "images/icons/cross3.png"} alt="crosicon" onClick={() => this.handleClose()} />
                                    </span>

                                </div>

                            </div>

                            <div className='container'>

                                <div className='col-sm-12' > 

                                {!this.state.selectOption &&  
                                <>
                                    <div className='w-100 shopping_content_wrapper mt-4'>
                                        <div className='maxWidth965 '>
                                            <div className="">


                                                <select className="form-select" aria-label="Default select example"
                                                    onChange={(e) => {
                                                        this.selectdocType(e.target.value)
                                                    }
                                                    }
                                                >
                                                    <option value="" >Select Document Category </option>
                                                    {this.state.DocCategory.map((item, index) =>
                                                        <option key={index} value={item} >{item}</option>

                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>









                                    <div className='w-100 shopping_content_wrapper mt-3'>
                                        <div className='maxWidth965 '>

                                            <div className="">

                                                <select className="form-select" aria-label="Default select example"
                                                    onChange={(e) => {
                                                        this.selectdocName(e.target.value)
                                                    }
                                                    }
                                                >
                                                    <option value="" >Select Document Name </option>
                                                    {this.state.DocName && this.state.DocName.length > 0 && this.state.DocName.map((item, index) =>
                                                        <option key={index} value={item} >{item}</option>

                                                    )}
                                                </select>



                                            </div>
                                        </div>
                                    </div>
                                    </>
                                }


                                    <div className='w-100 shopping_content_wrapper mt-3'>
                                        <div className='maxWidth965 '>
                                            <div className="text-center">

                                                {this.state.is_fileUploaded ?

                                                    this.state.upload_success ?
                                                        <h3 className='text-success'>Document Uploaded Successfully</h3>
                                                        :
                                                        this.state.upload_error ?
                                                            <h3 className='text-danger'>Error while uploading document </h3>
                                                            : ''


                                                    :

                                                    <>




                                                        <div className='col-12'>
                                                            <img src={asset + "images/Frame.png"} height="120" />


                                                            <h5 className='fw-bold'>Upload Document</h5>
                                                            <p className='mb-0'>File should be PDF, Max file size 5 MB</p>
                                                            <p>Only 3 Months income is verified</p>
                                                        </div>

                                                        <input
                                                            type="file"
                                                            name="filetobase64"
                                                            style={{ display: 'none' }}
                                                            ref={refParam => frontInputRef = refParam}
                                                            onChange={this.onUploadFileChange}
                                                            accept="application/pdf"
                                                        />
                                                        <button className=' btn btn-upload' onClick={() => frontInputRef.click()}
                                                        >Upload Document</button>

                                                        {this.state.fileName &&
                                                            <div className='d-flex justify-content-evenly'>

                                                                <p className="filename">{this.state.fileName.name}</p>
                                                                {this.state.selecteddocName.length > 0 && this.state.selectyeddocType.length > 0 ?
                                                                    <button className='btn btn-dark btn-submit' onClick={() => this.sumbit()}>Submit</button>
                                                                    :
                                                                    <button className='btn btn-dark  btn-submit disabled'>Submit</button>

                                                                }

                                                            </div>
                                                        }

                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>





                                </div>

                            </div>
                        </section>
                    </DialogContent>
                </Dialog>

            </>
        )
    }
}

// export default PaymentPlans
function mapStateToProps(state) {
    const { salesForceToken, user, sfid, isLoading } = state.auth;
    const { message } = state.message;
    const { userMessage, userBase, loan_amount } = state.user;
    return {
        salesForceToken,
        userBase,
        user,
        sfid,
        isLoading,
        message,
        userMessage,
        loan_amount
    };
}



export default connect(mapStateToProps)(UploadDocument)