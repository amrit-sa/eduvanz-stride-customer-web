import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { asset } from "../../../common/assets";
import { removeDocument, ocrCheck, fraudCheck } from "../../../actions/user";
import { openPdfModel } from "../../../actions/model"; 

class AdhaarFront extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frontSrc: null,
            isFrontDraged: false,
            frontFile: null,
            isFileDragged: false,
            validFrontPic: true,
            frontErrorMsg: null,
            isFrontSubmitted: false,
            frontFileType: 0,
            frontType: null,
            frontBase: null,
            isFrontSaved: false,
            isFrontChanged: false,
            frontSuccessMsg:'',
        }
    }

    dragOver = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true});
    }
    
    dragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true});
    }
    
    dragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: false});
    }

    handlePdfView = (baseData) =>{
        this.props.dispatch(openPdfModel(baseData));
    }
    
    fileDrop = async (e) => {
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
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File extension not supported!"});
            }else if(sizeError === 1){
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File size is more than 5 MB"});
            }
        }else{
            reader.onloadend = function (e) {
                let doctype =1;
                let isSubmit = false;
                if(type ==="application/pdf")
                {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isFrontSubmitted: isSubmit,
                    frontFileType: doctype,
                    frontType: type,
                    frontBase: reader.result,
                    frontSrc: [reader.result],
                    isFrontSaved: true,
                    isFrontChanged: true,
                    isFileDragged: false
                //  isFrontCrop: true
                })
                }.bind(this);
                const checkData = await this.checkFraud(files[0], 1);
                if(!checkData.status)
                {
                    this.setState({
                        isFrontSubmitted: false,
                        frontFileType: 0,
                        frontType: '',
                        frontBase: null,
                        frontSrc: null,
                        isFrontSaved: false,
                        isFrontChanged: false,
                        isFileDragged: false
                    })
                }else {
                    if(checkData.type !=="aadhaar_front_bottom")
                    {
                        this.setState({
                            isFrontSubmitted: false,
                            frontFileType: 0,
                            frontType: '',
                            frontBase: null,
                            frontSrc: null,
                            isFrontSaved: false,
                            isFrontChanged: false,
                            isFileDragged: false
                        })
                    }
                }
        }
    }

    handleFrontFileSelect = async (e) => {
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
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
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
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File extension not supported!"});
            }else if(sizeError === 1){
                this.setState({isFileDragged: false, validFrontPic: false, frontErrorMsg: "File size is more than 5 MB"});
            }
        }else{
            
            reader.onloadend = function (e) {
                let doctype =1;
                let isSubmit = false;
                if(type ==="application/pdf")
                {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                isFrontSubmitted: isSubmit,
                frontFileType: doctype,
                frontType: type,
                frontBase: reader.result,
                frontSrc: [reader.result],
                isFrontSaved: true,
                isFrontChanged: true,
                isFileDragged: false,
                // isFrontCrop: true
                })
                }.bind(this);
            const checkData = await this.checkFraud(files[0], 1);
            console.log("checkData", checkData);
            if(!checkData.status)
            {
                this.setState({
                    isFrontSubmitted: false,
                    frontFileType: 0,
                    frontType: '',
                    frontBase: null,
                    frontSrc: null,
                    isFrontSaved: false,
                    isFrontChanged: false,
                    isFileDragged: false,
                    })
            }else {
                if(checkData.type !=="aadhaar_front_bottom")
                {
                    this.setState({
                        isFrontSubmitted: false,
                        frontFileType: 0,
                        frontType: '',
                        frontBase: null,
                        frontSrc: null,
                        isFrontSaved: false,
                        isFrontChanged: false,
                        isFileDragged: false,
                    })
                }
            }
        }
    }

    frontFileRetry = () => {
        var reader = new FileReader();
        reader.readAsDataURL(this.state.frontFile);
        reader.onloadend = function (e) {
            this.setState({
                frontSrc: [reader.result],
               // isFrontCrop: true
            })
            }.bind(this);
    }

    frontFileDelete = async (id) =>{
        const { dispatch, salesForceToken } = this.props
        if(id !=null)
        {
            let data = {
                id: id,
                token: salesForceToken
            }
           await dispatch(removeDocument(data));
        }
        
        this.setState({
            frontSrc: '',
            frontFile: '',
            isFrontSaved: false,
            isFrontSubmitted: false,
            isFrontChanged: false,
        })
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
            frontType: "image/png",
            frontBase: reader.result,
            frontSrc: [reader.result],
            isFrontCrop: false,
            isFrontSaved: true,
            isFrontSubmitted: false
        })
        };
    }

    handleFrontCropCancel = () =>{
        this.setState({ isFrontCrop: false, isFrontSaved: false })
    }

    handleFileDrag = () =>{
        this.setState({ isFileDragged: true});
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

    checkFraud = async (file, type) => {
        const { sfid } = this.props
        return new Promise(async (resolve, reject) => {
            try {
                    const { dispatch } = this.props
                    var formdata = new FormData();
                    formdata.append("sfid", sfid);
                    if(type == 1)
                    {
                        formdata.append("type", "ADHAR-FRONT");
                    }else{
                        formdata.append("type", "ADHAR-BACK");
                    }
                    formdata.append("files", file);
                    await dispatch(fraudCheck(formdata)).then(async (response)=>{
                    console.log("checkFraud", response);
                    if(response.status && response.status =="success")
                    {
                        const res = response.result?response.result:null;
                        const getData = res && res.length > 0 ?res[0]:null;
                        const doctype = getData && getData.type?getData.type:null;
                        if(type == 1)
                        {
                            this.setState({validFrontPic: true, frontSuccessMsg: "Verified Successfully!"});
                            /* var formdata1 = new FormData();
                            formdata1.append("user", user);
                            formdata1.append("imageDetails1", this.state.profile);
                            formdata1.append("imageDetails2", file);
                            formdata1.append("imageDetails3", '');
                            await dispatch(ocrCheck(formdata1)).then((response)=>{
                                if(response.status =="success")
                                {
                                    const result = response.result?response.result:null;
                                    if(result && result.action && result.action == "approve")
                                    {
                                        this.setState({validFrontPic: true,frontErrorMsg:'', frontSuccessMsg: "Verification Successful!"});
                                    }else{
                                        this.setState({validFrontPic: false, frontSuccessMsg:'', frontErrorMsg: "Invalid aadhar front document!"});
                                    }
                                }else{
                                    this.setState({validFrontPic: false, frontSuccessMsg:'', frontErrorMsg: "Invalid aadhar front document!"});
                                }
                            }); */
                        }else if(type == 2)
                        {
                            this.setState({validBackPic: true, frontSuccessMsg:'', backSuccessMsg: "Verified Successfully!"});
                        }else{
                            if(type == 1)
                            {
                                this.setState({validFrontPic: false, backErrorMsg:'', frontErrorMsg: "Invalid aadhar front document!"});
                            }else {
                                this.setState({validBackPic: false, frontSuccessMsg:'', backErrorMsg: "Invalid aadhar back document!"});
                            }
                        }
                        resolve({status: true, type: response.type});
                    }else{
                        if(type == 1)
                        {
                            this.setState({validFrontPic: false, backErrorMsg:'', frontErrorMsg: response.message});
                        }else {
                            this.setState({validBackPic: false, frontErrorMsg:'', backErrorMsg: response.message});
                        }
                        resolve({status: true});
                    }
                });
            } catch (err) {
                console.log("Error", err);
                reject({status: true, message: err && err.message ? err.message : err})
            }
        });
    }

    render()
    {
        let frontInputRef;
        return(
            <div className="col-md-6 text-center">
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
                    {!this.state.isFrontSubmitted?(
                    <>
                        <button type="button" onClick={this.handleFrontCrop} className="btn btn-default"><img src={asset+"images/Vector9.png"} />Crop</button>
                        <button type="button" onClick={this.frontFileRetry} className="btn btn-default"><img src={asset+"images/Vector-8.png"} />Retry</button>
                        <button type="button" onClick={()=>this.frontFileDelete(this.state.frontId)} className="btn_delete"><img src={asset+"images/Vector-delete.svg"} /></button>
                    </>
                    ):''}
                    </div>
                    {this.state.frontFileType ===2?(
                        <img style={{cursor:'pointer', width: '53%', padding: '10px'}} onClick={()=>this.handlePdfView(this.state.frontBase)} src='images/pdf.png' />
                    ):(
                        <img src={this.state.frontSrc} />
                    )}
                    {this.state.validFrontPic && this.state.frontSuccessMsg !=''?
                        (
                        <div className="alert green-success fade show success_img" role="alert">
                        {this.state.frontSuccessMsg}
                        <img style={{maxWidth: 400}} type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                        </div>
                        ):''
                    }
                    {!this.state.validFrontPic && this.state.frontErrorMsg !=='' &&(
                    <div className="alert red-danger fade show" role="alert">
                        {this.state.frontErrorMsg}
                        <img type="button" onClick={this.handleFrontErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_wrong.svg"} />
                    </div>
                    )}
                    </>
                )
                ):(
                <>
                <div 
                    className={`drop-container ${!this.state.frontSrc && !this.state.backSrc?"a_front":"singleimg" }`} 
                    onDragOver={this.dragOver}
                    onDragEnter={this.dragEnter}
                    onDragLeave={this.dragLeave}
                    onDrop={this.fileDrop}
                >
                    <h3>Drag left to upload Front Side!</h3>
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
                {!this.state.validFrontPic && this.state.frontErrorMsg !=='' &&(
                    <div className="alert red-danger fade show" role="alert">
                        {this.state.frontErrorMsg}
                        <img type="button" onClick={this.handleFrontErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_wrong.svg"} />
                    </div>
                    )}
                {this.state.isSuccess?
                (
                <div className="alert green-success fade show success_img" role="alert">
                    Aadhar uploaded successfully
                    <img style={{maxWidth: 400}} type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                </div>
                ):''
                }
                {this.state.validFrontPic && this.state.frontSuccessMsg !=''?
                (
                <div className="alert green-success fade show success_img" role="alert">
                    {this.state.frontSuccessMsg}
                    <img style={{maxWidth: 400}} type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset+"images/icons/icon_right.svg"} />
                </div>
                ):''
                }
                </>
                )}
                </div>
            </div>
        );
    }
}

export default AdhaarFront;