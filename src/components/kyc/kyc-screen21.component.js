import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { uploadDocument, getPanDocument, removeDocument } from "../../actions/user"
import { openPdfModel } from "../../actions/model";
import GetOurApp from '../../common/get-our-app'
import LogoSideBar from '../../common/logo-side-bar'

class KycScreen21 extends Component {

  constructor(props) {
      super(props)
      this.state = {
          isFrontUploading: false,
          isFrontDraged: false,
          isFileDrag: false,
          frontType:'',
          frontFile:'',
          frontBase:'',
          frontSrc:'',
          isFrontCrop: false,
          isSuccess: false,
          isUpload: false,
          isSaved: false,
          isSubmitted: false,
          panId: null,
          errorMsg: '',
          validPic: true,
          frontFileType: 0,
          crop: {
            unit: '%',
            x: 10,
            y: 10,
            width: 80,
            height: 50,
          //  aspect: 16 / 9
          }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const { salesForceToken, user} = this.props;
    let data = {
      id: parseInt(user),
      token : salesForceToken
    }
    this.props.dispatch(getPanDocument(data)).then((response)=>{
      if(response.status ==="success")
      {
           let getData = response.data;
           if(getData.pan_front !==undefined && getData.pan_front !=="")
           {
              let resData = getData.pan_front;
              let type = 0;
              let DocBase = ""
              if(resData.formate !==null )
              {
                  if(resData.formate ==="application/pdf")
                  {
                      type=2;
                      DocBase = "data:application/pdf;base64,"+resData.base;
                  }else{
                      type=1;
                      DocBase = "data:image/jpg;base64,"+resData.base;
                  }
                  
              } 
               this.setState({
                  frontFileType: type,
                  frontSrc: DocBase,
                  frontBase: DocBase,
                  isFrontCrop: false,
                  isSubmitted: true,
                  panId: resData.id
                });
           }
      }
    });
  }

  dragOver = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.setState({ isFrontDraged: true});
  }

  dragEnter = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
    //  this.setState({ isFrontDraged: true});
  }

  dragLeave = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.setState({ isFrontDraged: false});
  }

  fileDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      let type = files[0].type;
      this.setState({isFrontDraged: false,frontFile:files[0]});
      var reader = new FileReader();
      var url = reader.readAsDataURL(files[0]);
      let sizeError = 0;
      let fileError = 0;
      let fileSize = files[0].size / 1024 / 1024;
      let fname = files[0].name;
      var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;;
      if(fileSize > 5)
      {
          sizeError = 1;
      }
      if(!re.exec(fname))
      {
          fileError = 1;
      }
      if(fileError === 1 || sizeError === 1)
      {
          if(fileError === 1)
          {
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File extension not supported!"});
          }else if(sizeError === 1){
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File size is more than 5 MB"});
          }
      }else{
      reader.onloadend = function (e) {
          let doctype =1;
          if(type ==="application/pdf")
          {
              doctype = 2;
          }
          this.setState({
            frontFileType: doctype,
            frontType: type,
            frontBase: reader.result,
            frontSrc: [reader.result],
            isSaved: true,
            isFileDrag: false
           // isFrontCrop: true
          })
          }.bind(this);
      }
  }


  handleFrontFileSelect = (e) => {
      e.preventDefault();
      const files = e.target.files;
      let type = files[0].type;
      this.setState({frontFile:files[0]});
      var reader = new FileReader();
      var url = reader.readAsDataURL(files[0]);
      let sizeError = 0;
      let fileError = 0;
      let fileSize = files[0].size / 1024 / 1024;
      let fname = files[0].name;
      var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;;
      if(fileSize > 5)
      {
          sizeError = 1;
      }
      if(!re.exec(fname))
      {
          fileError = 1;
      }
      if(fileError === 1 || sizeError === 1)
      {
          if(fileError === 1)
          {
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File extension not supported!"});
          }else if(sizeError === 1){
              this.setState({isFileDrag: false, validPic: false, errorMsg: "File size is more than 5 MB"});
          }
      }else{
      reader.onloadend = function (e) {
          let doctype =1;
          if(type ==="application/pdf")
          {
              doctype = 2;
          }
          this.setState({
            frontType: type,
            frontFileType: doctype,
            frontBase: reader.result,
            frontSrc: [reader.result],
            isSaved: true,
            isFileDrag: false
           // isFrontCrop: true
          })
          }.bind(this);
    }
  }

  frontFileRetry = () => {
      var reader = new FileReader();
      reader.readAsDataURL(this.state.frontFile);
      reader.onloadend = function (e) {
          this.setState({
              frontSrc: [reader.result],
              isFileDrag: false
             // isFrontCrop: true
          })
          }.bind(this);
  }

  frontFileDelete = async (id) =>{
    const { dispatch, salesForceToken } = this.props;
      if(id !=null)
      {
          let data = {
              id: id,
              token: salesForceToken
          }
          await  dispatch(removeDocument(data)); 
      }
      this.setState({
          frontSrc: '',
          frontFile: '',
          isSubmitted: false,
          isSaved: false,
          isFileDrag: false
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
      const reader = new FileReader();
      reader.readAsDataURL(this.state.croppedImage);
      reader.onload = () => {
        this.setState({
          frontType: "image/png",
          frontBase: reader.result,
          frontSrc: [reader.result],
          isFrontCrop: false
      })
      };
  }

  handleFrontCropCancel = () =>{
      this.setState({ isFrontCrop: false, isSaved: true });
  }

  handleSubmit = async e => {
      e.preventDefault()
      const upload_url = process.env.REACT_APP_HEROKU_API_URL;
      let frontBase = this.state.frontBase; 
      const fronBase64 = frontBase.replace(`data:${this.state.frontType};base64,`, "");
      const d = new Date()
      const time = d.getTime()
      const getExt = this.state.frontType.split("/");
      let ext = getExt[1];
        let data = {
            "parentId": this.props.sfid,
            "fname": "eduvan-web-"+time+'.'+ext,
            "base64": fronBase64,
            "doctype": "Pan-Front"
          }
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer  " + this.props.salesForceToken,);
          myHeaders.append("content-type", "application/json ");
          myHeaders.append('Access-Control-Allow-Origin', '*');
          myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(data),
              redirect: 'follow'
          };
         const getData = await fetch("https://cors-anywhere.herokuapp.com/"+upload_url, requestOptions).then((response) => response.json())
              .then((response) => {
                  return response;
              });

        console.log("getData", getData);
  }

  handlePdfView = (baseData) =>{
    this.props.dispatch(openPdfModel(baseData));
  }

  handleFileDrag = () =>{
    this.setState({ isFileDrag: true});
  }

  handleErrorClose = () =>{
    this.setState({validPic: true, errorMsg:''});
  }

    render() {
        let inputRef;
        let frontInputRef;
        const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
        const { isLoading, userMessage, history } = this.props;
        return (
            <>
            <Helmet>
            <title> Kyc Screen 14 </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
             ):''}
            <section className="kyc_pages">
            <div className={`container-zero ${!this.state.frontSrc?'dragarea':''} ${this.state.isFileDrag?'active':''}`}>
           
            <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-2">
       
            {/* <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_doc_others">Back</Link></li>
      </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='/ed_doc_others' historyGoBack=""  />
     
     <ul className="kyc_timeline">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing">Identity Verifcation <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline">
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_profile')} className="complete">Photograph</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_digilocker')} className="complete">Identity Card</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_pan')} className="active">PAN Card</li>
        </ul>
     </li>
     <li>AutoPay <span className="sheading">Set up AutoPay & your account is automatically debited on due date</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
            </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
            <div className="form_width_1 ext8 mb-1 mt-1">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src="images/icons/icon_briefcase.svg" /> PAN KYC </h4>
                <ul className="horizontal_list">
                  <li>Max file size 5 MB</li>
                  <li>File should be pdf, JPEG, PNG</li>
                  <li>Image should be clear</li>
                </ul>
                <form  className="otpform otpform-others fullwidth" onDragEnter={this.handleFileDrag}>
                <div className="d-flex flex-col-m mn_height_4">
                  <div className="row justify-content-center">
                    <div className="max-width-700">
                    <div className="row">
                    <div className="col-sm-12 text-center">
                            <h1 className="upload_headings">Front</h1>
                            <div className="upload_box d-block cropped_img">
                            {this.state.frontSrc?(
                            this.state.isFrontCrop?(
                                <>
                                <div className="btn_align_top align-center">
                                  <button type="button" onClick={this.handleFrontCropSave} className="btn btn-default">&nbsp;Ok</button>
                                  <button type="button" onClick={this.handleFrontCropCancel} className="btn btn-default">&nbsp;Cancel</button>
                                  </div>
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
                                <div className="btn_align_top">
                                  {!this.state.isSubmitted?(
                                  <>
                                    <button type="button" onClick={this.handleFrontCrop} className="btn btn-default"><img src="images/Vector9.png" />&nbsp;Crop</button>
                                    <button type="button" onClick={this.frontFileRetry} className="btn btn-default"><img src="images/Vector-8.png" />&nbsp;Retry</button>
                                  </>
                                  ):''
                                  }
                                <button type="button" onClick={()=> this.frontFileDelete(this.state.panId)} className="btn_delete"><img src="images/Vector-delete.svg" /></button>
                                </div>
                                {this.state.frontFileType ===2?(
                                    <img style={{cursor:'pointer', width: '53%', padding: '10px'}} onClick={()=>this.handlePdfView(this.state.frontBase)} src='images/pdf.png' />
                                ):(
                                    <img src={this.state.frontSrc} />
                                )}
                                {this.state.isSuccess?
                                  (
                                  <div className="alert green-success fade show" role="alert">
                                    File uploaded successfully
                                    <img type="button" className="close" data-dismiss="alert" aria-label="Close" src="images/icons/icon_right.svg" />
                                  </div>
                                  ):''
                                }
                              
                                </>
                            )
                            ):(
                            <>
                            <div 
                                className={`drop-container singleimg`}
                                onDragOver={this.dragOver}
                                onDragEnter={this.dragEnter}
                                onDragLeave={this.dragLeave}
                                onDrop={this.fileDrop}
                            >
                                <h3>Drag and drop</h3>
                                {this.state.isFrontDraged && (<h5 style={{color: '#a5a5a5'}}>Upload file upto 5MB by dropping in this window</h5>)}

                            </div>
                            <div className="or_type1">or</div>
                            
                            <input
                                type="file"
                                style={{display: 'none'}}
                                ref={refParam => frontInputRef = refParam}
                                onChange={this.handleFrontFileSelect}
                                accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                            />
                            <button type="button" onClick={() => frontInputRef.click()} className={"btn btn-upload"}>
                                 Upload Front
                            </button>
                            {this.state.validPic===false && this.state.errorMsg !='' && (
                                    <div className="alert red-danger fade show" role="alert">
                                    {this.state.errorMsg}
                                    <img type="button" onClick={this.handleErrorClose} className="close" data-dismiss="alert" aria-label="Close" src="images/icons/icon_wrong.svg" />
                                </div>
                                 )}
                            </>
                            )}
                            </div>
                        </div>         
                </div>
                 </div>
                 </div>
                 <div className="form_spacing text-center">
                 <button 
                      type="button" 
                      onClick={this.handleSubmit}
                      disabled={this.state.isSaved && this.state.frontBase !=="" && this.state.isFrontCrop ===false?false:true} 
                      className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                      style={this.state.isSaved && this.state.frontBase !=="" && this.state.isFrontCrop ===false?styles:{}}
                      >Submit</button>
                 </div>
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
  const { salesForceToken, user, sfid, isLoading } = state.auth;
  const { message } = state.message;
  const { userMessage } = state.user;
  return {
      salesForceToken,
      user,
      sfid,
      isLoading,
      message,
      userMessage
  };
}

export default connect(mapStateToProps)(KycScreen21)