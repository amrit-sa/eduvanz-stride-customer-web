import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { updateProfile } from "../../actions/user"
import GetOurApp from '../../common/get-our-app'
import LogoSideBar from '../../common/logo-side-bar'

class AadharVerififcation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            isFrontDraged: false,
            isBackDraged: false,
            frontFile:'',
            backFile:'',
            frontSrc:'',
            backSrc:'',
            isFrontCrop: false,
            isBackCrop: false
        }
    }

    dragOver = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true});
       // console.log('dragOver',files);
    }
    
    dragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true});
       // console.log('dragEnter',files);
    }
    
    dragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
      //  console.log('dragLeave',files);
        this.setState({ isFrontDraged: false});
    }
    
    fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({isFrontDraged: false,frontFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        reader.onloadend = function (e) {
            this.setState({
                frontSrc: [reader.result]
            })
            }.bind(this);
        console.log('fileDrop',files[0]);
    }

    backDragOver = (e) => {
        e.preventDefault();
        this.setState({ isBackDraged: true});
       // console.log('dragOver',files);
    }
    
    backDragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isBackDraged: true});
       // console.log('dragEnter',files);
    }
    
    backDragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
      //  console.log('dragLeave',files);
        this.setState({ isBackDraged: false});
    }
    
    backFileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({isBackDraged: false, backFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        reader.onloadend = function (e) {
            this.setState({
                backSrc: [reader.result]
            })
            }.bind(this);
        console.log('fileDrop',files);
    }

    handleFrontFileSelect = (e) => {
        e.preventDefault();
        const files = e.target.files;
        this.setState({frontFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        reader.onloadend = function (e) {
            this.setState({
                frontSrc: [reader.result]
            })
            }.bind(this);
        console.log('fileDrop',files);
    }

    handleBackFileSelect = (e) => {
        e.preventDefault();
        const files = e.target.files;
        this.setState({backFile:files[0]});
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        reader.onloadend = function (e) {
            this.setState({
                backSrc: [reader.result]
            })
            }.bind(this);
        console.log('fileDrop',files);
    }

    backFileRetry = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.backFile);
        reader.onloadend = function (e) {
            this.setState({
                backSrc: [reader.result]
            })
            }.bind(this);
    }

    frontFileRetry = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.frontFile);
        reader.onloadend = function (e) {
            this.setState({
                frontSrc: [reader.result]
            })
            }.bind(this);
    }

    backFileDelete = () =>{
        this.setState({
            backSrc: '',
            backFile: ''
        })
    }

    frontFileDelete = () =>{
        this.setState({
            frontSrc: '',
            frontFile: ''
        })
    }

    
    onImageLoaded = image => {
        this.imageRef = image
    }
    
    onCropChange = (crop) => {
        this.setState({ crop });
    }
    
    onCropComplete = crop => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
            this.setState({ croppedImageUrl })
        }
    }
    
    getCroppedImg(image, crop) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
         )
        const d = new Date()
        const time = d.getTime()
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'eduvan-web-'+time+'.jpg')
            }
        })
    }

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage }) 
    }

    handleFrontCrop = () =>{
        this.setState({isFrontCrop: true});
    }

    handleFrontCropSave = () =>{
        const reader = new FileReader()
        let baseURL = "";
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = () => {
          this.setState({
            frontSrc: [reader.result],
            isFrontCrop: false
        })
        };
    }

    handleBackCrop = () =>{
        this.setState({isBackCrop: true});
    }

    handleBackCropSave = () =>{
        const reader = new FileReader()
        let baseURL = "";
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = () => {
          this.setState({
            backSrc: [reader.result],
            isBackCrop: false
        })
        };
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const d = new Date()
        const time = d.getTime()
        const reader = new FileReader()
        let baseURL = "";
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = () => {
          baseURL = reader.result;
          let data = {
              "token": this.props.salesForceToken,
              "id": "00171000005MEj0AAG",
              "fname": "eduvan-web-"+time+'.jpg',
              "base64": baseURL.replace("data:image/png;base64,", ""),
              "doctype": "photo"
          }
          this.props.dispatch(updateProfile(data)).
          then((reponse) => {
              console.log(reponse);
            })
            .catch((error) => {
              console.log(error);
            });
        };
    }

    render() {
        let inputRef;
        let frontInputRef;
        return (
            <>
            <Helmet>
            <title> Aadhar Verification </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            <section className="kyc_pages">
            <div className="container-zero">
            <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-2">
       
            {/* <h4 className="mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="">Back</Link></li>
      </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='' historyGoBack=""  />
     
     <ul className="kyc_timeline">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing">Identity Verifcation <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline">
            <li className="complete">Photograph</li>
            <li className="active">Identity Card</li>
            <li>PAN Card</li>
        </ul>
     </li>
     <li>AutoPay <span className="sheading">Set up AutoPay & your account is automatically debited on due date</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
            </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
            <div className="form_width_1 ext8 mb-1 mt-1">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src="images/icons/icon_briefcase.svg" /> Aadhar KYC </h4>
                <ul className="horizontal_list">
                <li>Max file size 5 MB</li>
                <li>File should be pdf, JPEG, PNG</li>
                <li>Image should be clear</li>
                </ul>
                <form  className="otpform otpform-others fullwidth" >
                <div className="d-flex flex-col-m mn_height_4">
                  <div className="row justify-content-center">
                    <div className="max-width-700">
                    <div className="row">
                    <div className="col-sm-6 text-center">
                            <h1 className="upload_headings">Front</h1>
                            <div className="upload_box d-block">
                            {this.state.frontSrc?(
                            this.state.isFrontCrop?(
                                <>
                                <button type="button" onClick={this.handleFrontCropSave} className="btn btn-default">&nbsp;Save</button>
                                <ReactCrop
                                    src={this.state.frontSrc}
                                    crop={this.state.crop}
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                /> 
                                </>
                            ):(
                                <>
                                <button type="button" onClick={this.handleFrontCrop} className="btn btn-default"><img src="images/Vector9.png" />&nbsp;Crop</button>
                                <button type="button" onClick={this.frontFileRetry} className="btn btn-default"><img src="images/Vector-8.png" />&nbsp;Retry</button>
                                <button type="button" onClick={this.frontFileDelete} className="btn btn-default"><img src="images/Vector-7.png" />Delete</button>
                                <img src={this.state.frontSrc} />
                                </>
                            )
                            ):(
                            <>
                            <div 
                                className={`col-sm drop-container ${this.state.isFrontDraged?"drag-area":""}`} 
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.fileDrop}
                            >
                                <h3>Drag and drop</h3>
                            </div>
                            <div className="or_type1">or</div>
                            
                            <input
                                type="file"
                                style={{display: 'none'}}
                                ref={refParam => frontInputRef = refParam}
                                onChange={this.handleFrontFileSelect}
                                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            />
                            <button type="button" onClick={() => frontInputRef.click()} className={"btn btn-upload"}>
                                 Upload Front
                            </button>
                            <div className="alert green-success fade show" role="alert">
  Aadhar uploaded successfully
  <img type="button" className="close" data-dismiss="alert" aria-label="Close" src="images/icons/icon_right.svg" />
</div>
                            </>
                            )}
                            </div>
                        </div>
                        <div className="col-sm-6 text-center">
                            <h1 className="upload_headings">Back</h1>
                            <div className="upload_box d-block">
                            {this.state.backSrc?(
                                 this.state.isBackCrop?(
                                    <>
                                    <button type="button" onClick={this.handleBackCropSave} className="btn btn-default">&nbsp;Save</button>
                                    <ReactCrop
                                        src={this.state.backSrc}
                                        crop={this.state.crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    /> 
                                    </>
                                ):(
                                <>
                                    <button type="button" onClick={this.handleBackCrop} className="btn btn-default"><img src="images/Vector9.png" />&nbsp;Crop</button>
                                    <button type="button" onClick={this.backFileRetry} className="btn btn-default"><img src="images/Vector-8.png" />&nbsp;Retry</button>
                                    <button type="button" onClick={this.backFileDelete} className="btn btn-default"><img src="images/Vector-7.png" />Delete</button>
                                    <img src={this.state.backSrc} />
                                </>
                                )
                            ):(
                            <>
                            <div 
                                className={`col-sm drop-container ${this.state.isBackDraged?"drag-area":""}`}
                                onDragOver={this.backDragOver}
                                onDragEnter={this.backDragEnter}
                                onDragLeave={this.backDragLeave}
                                onDrop={this.backFileDrop}
                            >
                                <h3>Drag and drop</h3>
                            </div>
                            <div className="or_type1">or</div>
                            <input
                                type="file"
                                style={{display: 'none'}}
                                ref={refParam => inputRef = refParam}
                                onChange={this.handleBackFileSelect}
                                accept="image/x-png,image/gif,image/jpeg,image/jpg"
                            />
                            <button type="button" onClick={() => inputRef.click()} className={"btn btn-upload"}>
                                    Upload Back
                            </button>
                            <div className="alert red-danger fade show" role="alert">
  File size should not be more than 5 MB.
  <img type="button" className="close" data-dismiss="alert" aria-label="Close" src="images/icons/icon_wrong.svg" />
</div>
                            
                            </>
                            )}
                        </div>      
                         </div>               
                </div>
                 </div>
                 </div>
                 <div className="form_spacing text-center"><button type="submit" disabled="" className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Submit</button></div>
                  <p className="text-center mb-4"><Link className="blue_link" href="">Don’t have aadhar?</Link></p>
</div>
                </form>
                </div>
              </div>
              <div className="pos_abs">
                        <GetOurApp 
                  dispatch={this.props.dispatch}
                />                      
                    </div>
            </div>
            </div>
            </div>
            </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { salesForceToken } = state.auth;
    const { message } = state.message;
    return {
        salesForceToken,
        message
    };
  }

export default connect(mapStateToProps)(AadharVerififcation)