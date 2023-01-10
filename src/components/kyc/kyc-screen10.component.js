import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { asset } from "../../common/assets";
import { Link } from 'react-router-dom';
import  fs  from 'fs';
import WebCam from '../webCam/face-api';
import {  livenessCheck,  openCamera, closeCamera,convertToBase64, updateProfile, removeProfile, getProfileDocument, getAccountProfile,uploadProfile,profileUpload } from "../../actions/user"
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class KycScreen10 extends Component {

    constructor() {
        super()
        this.state = {
            livenessScore: 0,
            isLive: false,
            photoFile: null,
            photoUrl: null,
            isDragg: false,
            isFileCropped: false,
            profileId: null,
            profile: null,
            isTakePic: false,
            file: null,
            fileSrc: '',
            fileType: '',
            fileTypeSrc: '',
            isRetryEnable: false,
            isSaved: false,
            isSubmitted: false,
            isFileDrag: false,
            errorMsg: '',
            picErrorMsg: '',
            successMsg: '',
            validPic: true,
            isValidProfile: false,
            liveness: false,
            attempt: 0,
            docVerified : true,
            crop: {
                unit: '%',
                x: 10,
                y: 10,
                width: 80,
                height: 80,
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { user, sfid } = this.props;
        let data = {
            sfid: sfid
        }
        await this.props.getProfileDocument(data).then((response) => {
            if (response.status === "success") {
                const getData = response.data;
                if (getData && getData.base64 !== undefined && getData.base64 !== "") {
                    const base = getData && getData.base64 ? getData.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    this.setState({
                        fileSrc: base64 ? [`data:image/${getData.filetype};base64,${base64}`] : '',
                        fileType: `image/${getData.filetype}`,
                        liveness: 1000,
                        isFileCropped: false,
                        isSubmitted: true,
                        getImage : true,
                        profileId: null
                    });
                }
            }
        });

        let obj = {
            user_sfid: sfid,
        }

        this.props.getAccountProfile(obj).then((response) => {
            if (response.status === "success") {
                const getData = response.accountDet ? response.accountDet : null;
                this.setState({ accountDet : getData });
            }
        });

    }

    dataURLtoFile = (dataurl, filename) => {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    checkLiveness = (file) => {

        const { sfid } = this.props
        const { attempt } = this.state
        var formdata = new FormData();
        formdata.append("files", file);
        // formdata.append("sfid", sfid);
        this.props.checkLiveness(formdata).then((response) => {
            if (response.message) {
                const profileAttempt = attempt + 1;
                const getData = response.message ? response.message : null;
                const result = getData.result ? getData.result : null;
                this.setState({ attempt: profileAttempt })
                if (getData && getData.statusCode === 101 && result && result.isLive) {
                    const result = getData && getData.result ? getData.result : null;
                    const livenessScore = result && result.livenessScore !== undefined ? result.livenessScore : 0;
                    const validPic = result && result.isLive !== undefined ? result.isLive : false
                    this.setState({ validPic: true,docVerified: true, liveness: validPic,getImage:false, livenessScore: livenessScore, isLive: validPic,isValidProfile : true, successMsg: "Verified Successful!" });
                } else {
                    if (profileAttempt > 2) {
                        // alert('here')
                        this.setState({ validPic: false,isValidProfile : true,getImage:false,docVerified: false, picErrorMsg: 'Your photo not verified Still you can submit to backend verification', liveness: true, livenessScore: 1000, isLive: true });
                    } else {
                        // alert('there')
                        this.setState({ validPic: false, picErrorMsg:  "Face Verification Failed" ,getImage:false,docVerified : false, livenessScore: 0, isLive: false });
                    }
                }
            }
        });
    }

    handleFile = e => {
        this.setState({ isDragg: false });
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        let type = e.target.files[0].type;
        let sizeError = 0;
        let fileError = 0;
        const files = e.target.files;
        let fileSize = files[0].size / 1024 / 1024;
        console.log('e.target.files[0]',files[0])
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png)$/i;;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.setState({ isFileDrag: false, validPic: false, errorMsg: "File extension not supported!" });
            } else if (sizeError === 1) {
                this.setState({ isFileDrag: false, validPic: false, errorMsg: "File size is more than 5 MB" });
            }
        } else {

            let formData = new FormData();
            this.setState({filesUpload : e.target.files[0]})
            formData.append('files',e.target.files[0]);

            this.props.convertToBase64(formData).then((response)=>{
                console.log(response,"convertToBase64 response  ")
                this.setState({
                    fileSrc : `data:${response.filetype};base64,${response.base64}`,
                    file: response.base64,
                    isSaved: true,
                    isFileDrag: false,
                    fileType: response.filetype,
                    fileTypeSrc: response.filetype,
                    validPic: true,
                    errorMsg: ''
                })
            })
            
            this.checkLiveness(files[0]);
            // reader.onloadend = function (e) {
            //     this.setState({
            //         fileSrc: reader.result,
            //         file: reader.result,
            //         isSaved: true,
            //         isFileDrag: false,
            //         fileType: type,
            //         fileTypeSrc: type,
            //         validPic: true,
            //         errorMsg: ''
            //         // isFileCropped: true
            //     })
            // }.bind(this);
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const d = new Date()
        const time = d.getTime()
        let baseURL = this.state.fileSrc;
        console.log(baseURL, "BASE URL!")
        let data = {
            "token": this.props.salesForceToken,
            "id": this.props.sfid,
            "parent_id": this.props.sfid,
            "fname": "eduvan-web-" + time + '.jpg',
            // "base64": baseURL.replace(`data:${this.state.fileType};base64,`, ""),
            "base64": this.state.file,
            "doctype": "photo",
            livenessScore: this.state.livenessScore,
            isLive: this.state.isLive,
            docVerified : this.state.docVerified
        }
        console.log(data,"dataaaaaaaaaaaaaaaaa")

        this.props.uploadProfile({"user_sfid":localStorage.getItem('sfid')}).then(res=>{
            if(res.status== "success"){
                console.log(res,'yhdydufigi')
                // this.props.history.push("/ed_digilocker");
            }
          })
          this.props.updateProfile(data).
          then((reponse) => {
              if(reponse ==="success")
              {
              }
            })
            .catch((error) => {
              console.log(error);
            });
                    var FormData = require('form-data');
                var profileData = new FormData();
                profileData.append('files', this.state.filesUpload);
                profileData.append('user_sfid', localStorage.getItem('sfid'));
                this.props.profileUpload(profileData).then(res=>{
                    if(res){
                this.props.history.push("/ed_digilocker");

                    }
                })
    }
    handleContinue = () => {
        this.props.history.push("/ed_digilocker");
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
                this.dataURLtoFile(reader.result, 'eduvan-web-' + time + '.jpg')
            }
        })
    }

    getBase64 = file => {
        let baseURL = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
        };
        return baseURL.replace("data:image/png;base64,", "")
    };

    dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, { type: mime });
        this.setState({ croppedImage: croppedImage })
    }

    dragOver = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isDragg: true });
    }

    dragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isDragg: true });
    }

    dragLeave = (e) => {
        e.preventDefault();
        this.setState({ isDragg: false });
    }

    fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let type = files[0].type;
        this.setState({ isDragg: false, isFileDrag: false });
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.PDF)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.setState({ isFileDrag: false, validPic: false, errorMsg: "File extension not supported!" });
            } else if (sizeError === 1) {
                this.setState({ isFileDrag: false, validPic: false, errorMsg: "File size is more than 5 MB" });
            }
        } else {
            this.checkLiveness(files[0]);
            reader.onloadend = function (e) {
                this.setState({
                    fileSrc: [reader.result],
                    file: [reader.result],
                    isSaved: true,
                    isFileDrag: false,
                    fileType: type,
                    fileTypeSrc: type,
                    validPic: true,
                    errorMsg: ''
                })
            }.bind(this);
        }

    }

    handleFileCrop = () => {
        this.setState({
            isFileCropped: true,
            crop: {
                unit: '%',
                x: 10,
                y: 10,
                width: 80,
                height: 80,
                // aspect: 9 / 9
            }
        });
    }

    handleFileRetry = () => {
        this.setState({
            fileSrc: '',
            fileType: null,
            // isFileCropped: true
        },()=>{
            // this.props.openCamera();
        });
    }

    handleFileDelete = async (id) => {
        const { removeProfile, salesForceToken } = this.props;
        if (id != null) {
            let data = {
                id: id,
                token: salesForceToken
            }
            await removeProfile(data);
        }
        await this.setState({
            file: null,
            fileSrc: '',
            liveness: false,
            isSaved: false,
            isSubmitted: false,
            successMsg: '',
            profileId: null
        })
    }

    handleFileCropSave = () => {
        const reader = new FileReader()
        console.log("croppedImage", this.state.croppedImage);
        //  this.checkLiveness(this.state.croppedImage);
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = async () => {

            this.setState({
                fileSrc: [reader.result],
                isFileCropped: false,
                fileType: "image/png",
                isSaved: true,
            });
        };

    }

    handleCancelCrop = () => {
        this.setState({ isFileCropped: false });
    }

    handleTakePic = () => {
        this.props.openCamera();
    }

    async baseDataURLtoFile(dataurl, filename) {
        return new Promise((resolve, reject) => {
            try {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const profile = new File([u8arr], filename, { type: mime });
                resolve({ status: true, data: profile });
            } catch (err) {
                reject({ status: false, data: err.message ? err.message : err })
            }
        });
    }

    async profileDataURLtoFile(dataurl, filename) {
        return new Promise((resolve, reject) => {
            try {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                const profile = new File([u8arr], filename, { type: mime });
                resolve({ status: true, data: profile });
            } catch (err) {
                reject({ status: false, data: err.message ? err.message : err })
            }
        });
    }

    capturePicture = async (base64) => {

        this.setState({
            fileSrc: base64,
            file: base64,
            isSaved: true,
            isFileDrag: false,
            fileType: 'image/webp',
            fileTypeSrc: 'image/webp',
            validPic: true,
            errorMsg: ''
        });
        //  this.setState({isFileCropped: true});
        /*  this.setState({
             fileSrc: base64,
             file: base64,
             isSaved: true,
             fileType: 'image/webp',
             fileTypeSrc: 'image/webp',
             liveness: true
         }); */
         console.log('ed_doc_profileed_doc_profile',base64)
        const profile = await this.baseDataURLtoFile(base64, 'profile.png');
        if (profile.status) {
            this.checkLiveness(profile.data);
        }
        /*  const getDat = await this.profileDataURLtoFile(base64?`data:image/webp;base64,${base64}`:'', "profile.jpg");
         console.log("getDat ------------->", getDat)
         if(getDat.status)
         {
             const files = getDat.data;
             this.checkLiveness(files);
         } */
    }

    handleFileDrag = () => {
        this.setState({ isFileDrag: true });
    }

    handleErrorClose = () => {
        this.setState({ validPic: true, errorMsg: '', picErrorMsg: '', successMsg: '' });
    }


    render() {
        const { profile_pic, isValidProfile } = this.state
        console.log('isValidProfileisValidProfileisValidProfile',this.state.liveness , this.state.fileSrc , isValidProfile)
        const { isLoading, history } = this.props
        let inputRef;
        return (
            <>
                <Helmet>
                    <title>Eduvanz Profile</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages">
                    <div className={`container-zero ${!this.state.fileSrc ? 'dragarea' : ''} ${this.state.isFileDrag ? 'active' : ''}`}>

                        <div className="flex-w flex-tr">
                            <div className="kyc_leftbar login-bg profileCol">

                                {/* <h4 onClick={() => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                                <div className="navigations">
                                    <ul className="breadcrumps">
                                        <li className="b_back"><Link to="/ed_doc">Back</Link></li>
                                    </ul>
                                </div> */}
                              <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place."  backLink='' />

                                <ul className="kyc_timeline pl-0 mt-0 pb-4">
                                    <li className="complete">Registration</li>
                                    <li className="complete">Limit Approval</li>

                                    <li className="has_child ongoing">Verification <span className="sheading">Keep your document ready</span>
                                        <ul className="sub_timeline pl-1">
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('ed_doc_profile')} className={this.state.accountDet && this.state.accountDet.is_photo_verified__c ?"complete" : "active"}>Photograph</li>
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('ed_digilocker')} className={this.state.accountDet && this.state.accountDet.aadhaar_verified__c ?"complete" : "active"}>Identity Card</li>
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('ed_doc_pan')} className={this.state.accountDet && this.state.accountDet.is_pan_document_uploaded__c ?"complete" : "active"}>PAN Card</li>
                                        </ul>
                                    </li>
                                    <li>AutoPay <span className="sheading">Set up AutoPay & your account is automatically debited on due date</span></li>
                                    <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                                </ul>
                            </div>
                            <div className="kyc_rightbar flex-w flex-col-m justify-content-center bg_conta">
                                <div className="form_width_1 ext10">
                                    <div className="form_details">
                                        <h4 className="bg-1 text-center imgaligned"><img src={asset + "images/icons/icon_camera.svg"} /> Click a Selfie!</h4>
                                        {!this.state.fileSrc ? (
                                            <ul className="horizontal_list">
                                                <li>100% safe </li>
                                                {/* <li>Not shared with anyone</li> */}
                                                <li>Your information is not shared with anyone</li>
                                                {/* <li>Picture is not blurred</li> */}
                                            </ul>
                                        ) : ""}
                                        <form className="otpform otpform-others fullwidth limit_img" onDragEnter={this.handleFileDrag}>
                                            {this.state.fileSrc ? (
                                                this.state.isFileCropped ? (
                                                    <div className="text-center mn_height_4">
                                                        <ReactCrop
                                                            src={this.state.fileSrc}
                                                            crop={this.state.crop}
                                                            onImageLoaded={this.onImageLoaded}
                                                            onComplete={this.onCropComplete}
                                                            onChange={this.onCropChange}
                                                        />
                                                        <div className='row justify-content-center profile_btn_width'>
                                                            <button type="button" onClick={this.handleFileCropSave} className="btn btn-default btn_c_1">Ok</button>
                                                            <button type="button" onClick={this.handleCancelCrop} className="btn btn-default btn_c_1">Cancel</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="d-flex flex-col-m mn_height_4 cropped_img">
                                                            <img src={this.state.fileSrc} />
                                                            
                                                            <div className="text-center valignimg pb-3 pt-3"> 
                                                            <img src={asset+"images/icons/icon-ind.png"} /> Please ensure that only face is visible
                                                            </div>

                                                            <div className="text-center valignimg pb-3 pt-3"> 
                                                            {this.state.validPic === false && this.state.picErrorMsg != '' && (
                                                                <div className="image_box alert text-center red-danger fade show" role="alert">
                                                                    {this.state.picErrorMsg}
                                                                    <img type="button" onClick={this.handleErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_wrong.svg"} />
                                                                </div>
                                                            )}
                                                            {this.state.validPic === true && this.state.successMsg != '' && (
                                                                <div className="lightGreen_succes image_box alert text-center green-success fade show" role="alert">
                                                                    {this.state.successMsg}
                                                                    <img type="button" onClick={this.handleErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_right.svg"} />
                                                                </div>
                                                            )}
                                                            </div>
                                                                <div className="btn_retry_crop clickPic">
                                                                    <button type="button" onClick={this.handleFileRetry} className="btn btn-default btn_c_1"><img src={asset + "images/Vector-8.png"} />Retry</button>
                                                                    <button type="button" onClick={this.handleFileCrop} className="btn btn-default btn_c_1"><img src={asset + "images/Vector9.png"} />Crop</button>
                                                                </div>
                                    
                                                                <button type="button" onClick={() => this.handleFileDelete(this.state.profileId)} className="btn_delete"><img src={asset + "images/Vector-delete.svg"} /></button>
                                                            
                                                            
                                                        </div>

                                                    </>
                                                )
                                            ) : (
                                                this.props.isOpenCamera ? (
                                                    <WebCam
                                                        closeCamera={this.props.closeCamera}
                                                        capturePicture={this.capturePicture}
                                                    />
                                                ) : (
                                                    <div className="col-md-12">
                                                        <div className="row justify-content-center style_2">
                                                            <div className="col-md-4">
                                                                <div className="img_boxed">
                                                                    <div className="img_validate">
                                                                        <img src={asset + "images/img_blurred_1.png"} />
                                                                    </div>
                                                                    <p>Picture is not blurred</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="img_boxed">
                                                                    <div className="img_validate">
                                                                        <img src={asset + "images/img_masked_1.png"} />
                                                                    </div>
                                                                    <p>Remove mask, glasses, cap, etc</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <div className="img_boxed">
                                                                    <div className="img_validate itsvalid">
                                                                        <img src={asset + "images/img_original_1.png"} />
                                                                    </div>
                                                                    <p>Clear with good background light</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form_spacing d-flex flex-col-m mn_height_3">
                                                            <div className="upload_box boxstyle_2 d-block text-center uploadboxht">

                                                                <p><span className="d-block"> File should be .JPG, .PNG or .JPEG, Max file size is 5 MB  </span></p>
                                                                <div
                                                                    className={`col-sm drop-container singleimg`}
                                                                    onDragOver={this.dragOver}
                                                                    onDragEnter={this.dragEnter}
                                                                    onDragLeave={this.dragLeave}
                                                                    onDrop={this.fileDrop}
                                                                >
                                                                    <h3>Drop you image here</h3>
                                                                    {this.state.isDragg && (<h5 style={{ color: '#a5a5a5' }}>Upload image file upto 5MB by dropping in this window</h5>)}
                                                                </div>
                                                                <input
                                                                    type='file'
                                                                    style={{ display: 'none' }}
                                                                    ref={refParam => inputRef = refParam}
                                                                    accept="image/x-png,image/gif,image/jpeg,image/jpg"
                                                                    id='profile_pic'
                                                                    value={profile_pic}
                                                                    onChange={this.handleFile}
                                                                />
                                                                <button type="button" onClick={() => inputRef.click()} className={"btn btn-upload"}>
                                                                    Upload Photo
                                                                </button>
                                                                <div className="or_type1">or</div>
                                                                <button onClick={this.handleTakePic} type="button" className={"btn btn-camera"}>
                                                                    Take Photo
                                                                </button>
                                                                {this.state.validPic === false && this.state.errorMsg != '' && (
                                                                    <div className="alert red-danger fade show" role="alert">
                                                                        {this.state.errorMsg}
                                                                        <img type="button" onClick={this.handleErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_wrong.svg"} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                            {/* {isValidProfile ? ( */}
                                                {this.state.getImage ? 
                                                <div className='row justify-content-center '>
                                                    <button
                                                        onClick={this.handleContinue}
                                                        type="button"
                                                        style={{ marginTop: '5px' }}
                                                        className={`bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300 btn-width`}
                                                        >Continue</button>
                                                </div>
                                                :<div className='row justify-content-center '>
                                                    <button
                                                        onClick={this.handleSubmit}
                                                        type="button"
                                                        style={{ marginTop: '5px' }}
                                                        disabled={this.state.liveness && this.state.fileSrc && isValidProfile ? false : true}
                                                        className={`${this.state.liveness && this.state.fileSrc && isValidProfile ? 'bg_dark' : ''} cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300 btn-width`}
                                                        >Continue</button>
                                                </div>}
                                            {/* ) : ''} */}
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

function mapDispatchToProps(dispatch) {
    return {
        getAccountProfile: (getData) => {
            return dispatch(getAccountProfile(getData));
        },
        updateProfile: (getData) => {
            return dispatch(updateProfile(getData));
        },
        profileUpload: (getData) => {
            return dispatch(profileUpload(getData));
        },
        closeCamera: () => {
            dispatch(closeCamera());
        },
        getProfileDocument: (getData) => {
            return dispatch(getProfileDocument(getData));
        },
        uploadProfile: (getData) =>{
            return dispatch(uploadProfile(getData));
        },
        openCamera: () => {
            dispatch(openCamera());
        },
        removeProfile: (getData) => {
            dispatch(removeProfile(getData))
        },
     
        convertToBase64 :(getData) =>{
            return dispatch(convertToBase64(getData));
        },
        checkLiveness :(getData) =>{
            return dispatch(livenessCheck(getData));
        }
    }
}

function mapStateToProps(state) {
    const { salesForceToken, user, sfid, isLoading } = state.auth;
    const { message } = state.message;
    const { isOpenCamera } = state.user;
    return {
        salesForceToken,
        sfid,
        user,
        isLoading,
        message,
        isOpenCamera
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(KycScreen10);