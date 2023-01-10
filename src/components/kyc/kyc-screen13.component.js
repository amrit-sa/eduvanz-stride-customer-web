import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { asset } from "../../common/assets";
import { uploadDocument, getOtherDocument, removeDocument, fraudCheck, isStatementUpload } from "../../actions/user"
import { openPdfModel } from "../../actions/model";
import GetOurApp from '../../common/get-our-app'
import LogoSideBar from '../../common/logo-side-bar'

class KycScreen13 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFrontUploading: false,
            isBackUploading: false,
            isFrontDraged: false,
            isBackDraged: false,
            defaultTab: 0,
            frontType: '',
            backType: '',
            frontFile: '',
            backFile: '',
            frontBase: '',
            backBase: '',
            frontSrc: '',
            backSrc: '',
            frontId: null,
            backId: null,
            isFrontCrop: false,
            isBackCrop: false,
            isSuccess: false,
            selectedTab: 1,
            isFrontSaved: false,
            isBackSaved: false,
            isFrontSubmitted: false,
            isBackSubmitted: false,
            isFrontChanged: false,
            isBackChanged: false,
            isFileDragged: false,
            frontErrorMsg: '',
            validFrontPic: true,
            backErrorMsg: '',
            validBackPic: true,
            frontFileType: 0,
            backFileType: 0,
            isFrontSuccess: false,
            isBackSuccess: false,
            frontSuccessMsg: '',
            backSuccessMsg: '',
            frontDocAttempt: 0,
            backDocAttempt: 0,
            isFrontVerify: true,
            isBackVerify: true,
            crop: {
                unit: '%',
                x: 10,
                y: 10,
                width: 80,
                height: 50,
                //  aspect: 16 / 9
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const { user, sfid } = this.props;
        let data = {
            sfid: sfid
        }
        await this.props.dispatch(getOtherDocument(data)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                const voterBack = response.voterbackdata ? response.voterbackdata : null;
                const voterFront = response.voterfrontdata ? response.voterfrontdata : null;
                const drivingBack = response.drivingfrontdata ? response.drivingfrontdata : null;
                const drivingFront = response.drivingbackdata ? response.drivingbackdata : null;
                const passport = response.passport ? response.passport : null;
                if (drivingFront && drivingFront.base64 !== undefined && drivingFront.base64 !== "") {
                    const base = drivingFront && drivingFront.base64 ? drivingFront.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    let type = 0;
                    let DocBase = ""
                    if (drivingFront.filetype !== null) {
                        if (drivingFront.filetype === "PDF" || drivingFront.filetype === "pdf") {
                            type = 2;
                            DocBase = `data:application/pdf;base64,${base64}`;
                        } else {
                            type = 1;
                            DocBase = `data:image/${drivingFront.filetype};base64,${base64}`;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontSrc: DocBase,
                        isFrontCrop: false,
                        selectedTab: 1,
                        defaultTab: 1,
                        isFrontSubmitted: true,
                        frontBase: DocBase,
                        frontId: null,
                        isFrontSuccess: true
                    });
                } else if (voterFront && voterFront.base64 !== undefined && voterFront.base64 !== "") {
                    const base = voterFront && voterFront.base64 ? voterFront.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    let type = 0;
                    let DocBase = ""
                    if (voterFront.filetype !== null) {
                        if (voterFront.filetype === "PDF" || voterFront.filetype === "pdf") {
                            type = 2;
                            DocBase = `data:application/pdf;base64,${base64}`;
                        } else {
                            type = 1;
                            DocBase = `data:image/${voterFront.filetype};base64,${base64}`;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontSrc: DocBase,
                        isFrontCrop: false,
                        selectedTab: 2,
                        defaultTab: 2,
                        isFrontSubmitted: true,
                        frontBase: DocBase,
                        frontId: null,
                        isFrontSuccess: true,
                    });
                } else if (passport && passport.base64 !== undefined && passport.base64 !== "") {
                    const base = passport && passport.base64 ? passport.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    let type = 0;
                    let DocBase = ""
                    if (passport.filetype !== null) {
                        if (passport.filetype === "PDF" || passport.filetype === "pdf") {
                            type = 2;
                            DocBase = `data:application/pdf;base64,${base64}`;
                        } else {
                            type = 1;
                            DocBase = `data:image/${passport.filetype};base64,${base64}`;
                        }

                    }
                    this.setState({
                        frontFileType: type,
                        frontSrc: DocBase,
                        isFrontCrop: false,
                        selectedTab: 3,
                        defaultTab: 3,
                        isFrontSubmitted: true,
                        frontBase: DocBase,
                        frontId: null,
                        isFrontSuccess: true,
                        isBackSuccess: true,
                    });
                }
                if (drivingBack && drivingBack.base64 !== undefined && drivingBack.base64 !== "") {
                    const base = drivingBack && drivingBack.base64 ? drivingBack.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    let type = 0;
                    let DocBase = ""
                    if (drivingBack.filetype) {
                        if (drivingBack.filetype === "PDF" || drivingBack.filetype === "pdf") {
                            type = 2;
                            DocBase = `data:application/pdf;base64,${base64}`;
                        } else {
                            type = 1;
                            DocBase = `data:image/${drivingBack.filetype};base64,${base64}`;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backSrc: DocBase,
                        isBackCrop: false,
                        selectedTab: 1,
                        defaultTab: 1,
                        isBackSubmitted: true,
                        backBase: DocBase,
                        backId: null,
                        isBackSuccess: true,
                    });
                } else if (voterBack && voterBack.base64 !== undefined && voterBack.base64 !== "") {
                    const base = voterBack && voterBack.base64 ? voterBack.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    let type = 0;
                    let DocBase = ""
                    if (voterBack.filetype) {
                        if (voterBack.filetype === "PDF" || voterBack.filetype === "pdf") {
                            type = 2;
                            DocBase = `data:application/pdf;base64,${base64}`;
                        } else {
                            type = 1;
                            DocBase = `data:image/${voterBack.filetype};base64,${base64}`;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backSrc: DocBase,
                        isBackCrop: false,
                        selectedTab: 2,
                        defaultTab: 2,
                        isBackSubmitted: true,
                        backBase: DocBase,
                        backId: null, isBackSuccess: true,
                    });
                } else if (passport && passport.base64 !== undefined && passport.base64 !== "") {
                    const base = passport && passport.base64 ? passport.base64 : null;
                    const base64 = base && base.base64 ? base.base64 : null;
                    let type = 0;
                    let DocBase = ""
                    if (passport.filetype !== null) {
                        if (passport.filetype === "PDF" || passport.filetype === "pdf") {
                            type = 2;
                            DocBase = `data:application/pdf;base64,${base64}`;
                        } else {
                            type = 1;
                            DocBase = `data:image/${passport.filetype};base64,${base64}`;
                        }

                    }
                    this.setState({
                        backFileType: type,
                        backSrc: DocBase,
                        isBackCrop: false,
                        selectedTab: 3,
                        defaultTab: 3,
                        isBackSubmitted: true,
                        backBase: DocBase,
                        backId: null,
                        isBackSuccess: true,
                        isFrontSuccess: true,
                    });
                }
            }
        });
    }

    dragOver = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true });
    }

    dragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: true });
    }

    dragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isFrontDraged: false });
    }

    fileDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let type = files[0].type;
        this.setState({ isFrontDraged: false, frontFile: files[0] });
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.setState({ isFileDragged: false, validFrontPic: false, frontErrorMsg: "File extension not supported!" });
            } else if (sizeError === 1) {
                this.setState({ isFileDragged: false, validFrontPic: false, frontErrorMsg: "File size is more than 5 MB" });
            }
        } else {
            reader.onloadend = function (e) {

                let doctype = 1;
                let isSubmit = false;
                if (type === "application/pdf") {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isFrontSubmitted: isSubmit,
                    frontFileType: doctype,
                    frontType: type,
                    frontBase: reader.result,
                    frontSrc: [reader.result],
                    isFileDragged: false,
                })
            }.bind(this);

            const checkData = await this.checkFraud(files[0], 1);
            if (!checkData) {
                this.setState({
                    isFrontSubmitted: true,
                    isFrontSaved: false,
                    isFrontChanged: false,
                    isFileDragged: false
                })
            } else {
                this.setState({
                    isFrontSaved: true,
                    isFrontChanged: true,
                })
            }
        }
    }

    backDragOver = (e) => {
        e.preventDefault();
        this.setState({ isBackDraged: true });
    }

    backDragEnter = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isBackDraged: true });
    }

    backDragLeave = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        this.setState({ isBackDraged: false });
    }

    handlePdfView = (baseData) => {
        this.props.dispatch(openPdfModel(baseData));
    }

    backFileDrop = async (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        let type = files[0].type;
        this.setState({ isBackDraged: false, backFile: files[0] });
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.setState({ isFileDragged: false, validBackPic: false, backErrorMsg: "File extension not supported!" });
            } else if (sizeError === 1) {
                this.setState({ isFileDragged: false, validBackPic: false, backErrorMsg: "File size is more than 5 MB" });
            }
        } else {
            reader.onloadend = function (e) {
                let doctype = 1;
                let isSubmit = false;
                if (type === "application/pdf") {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isBackSubmitted: isSubmit,
                    backFileType: doctype,
                    backType: type,
                    backBase: reader.result,
                    backSrc: [reader.result],
                    isFileDragged: false,
                })
            }.bind(this);
            const checkData = await this.checkFraud(files[0], 2);
            if (checkData) {
                this.setState({
                    isBackSubmitted: true,
                    isBackSaved: false,
                    isBackChanged: false,
                    isFileDragged: false,
                })
            } else {
                this.setState({
                    isBackSaved: true,
                    isBackChanged: true
                })
            }
        }
    }

    handleFrontFileSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        this.setState({ frontFile: files[0] });
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.setState({ isFileDragged: false, validFrontPic: false, frontErrorMsg: "File extension not supported!" });
            } else if (sizeError === 1) {
                this.setState({ isFileDragged: false, validFrontPic: false, frontErrorMsg: "File size is more than 5 MB" });
            }
        } else {
            reader.onloadend = function (e) {
                let doctype = 1;
                let isSubmit = false;
                if (type === "application/pdf") {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isFrontSubmitted: isSubmit,
                    frontFileType: doctype,
                    frontType: type,
                    frontBase: reader.result,
                    frontSrc: [reader.result],
                    isFileDragged: false,
                    frontUpload: true,
                    // isSuccess:true
                })
            }.bind(this);
            const checkData = await this.checkFraud(files[0], 1);
            if (!checkData) {
                this.setState({
                    isFrontSubmitted: true,
                    isFrontSaved: false,
                    isFrontChanged: false,
                    isFileDragged: false,
                })
            } else {
                this.setState({
                    isFrontSaved: true,
                    isFrontChanged: true,
                })
            }
        }
    }

    handleBackFileSelect = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let type = files[0].type;
        this.setState({ backFile: files[0] });
        var reader = new FileReader();
        var url = reader.readAsDataURL(files[0]);
        let sizeError = 0;
        let fileError = 0;
        let fileSize = files[0].size / 1024 / 1024;
        let fname = files[0].name;
        var re = /(\.jpg|\.jpeg|\.png|\.JPG|\.JPEG|\.PNG|\.pdf)$/i;
        if (fileSize > 5) {
            sizeError = 1;
        }
        if (!re.exec(fname)) {
            fileError = 1;
        }
        if (fileError === 1 || sizeError === 1) {
            if (fileError === 1) {
                this.setState({ isFileDragged: false, validBackPic: false, backErrorMsg: "File extension not supported!" });
            } else if (sizeError === 1) {
                this.setState({ isFileDragged: false, validBackPic: false, backErrorMsg: "File size is more than 5 MB" });
            }
        } else {
            reader.onloadend = function (e) {
                let doctype = 1;
                let isSubmit = false;
                if (type === "application/pdf") {
                    doctype = 2;
                    isSubmit = true;
                }
                this.setState({
                    isBackSubmitted: isSubmit,
                    backFileType: doctype,
                    backType: type,
                    backBase: reader.result,
                    backSrc: [reader.result],
                    isFileDragged: false,
                    backUpload: true
                })
            }.bind(this);
            const checkData = await this.checkFraud(files[0], 2);
            if (!checkData) {
                this.setState({
                    isBackSubmitted: true,
                    isBackSaved: false,
                    isBackChanged: false,
                    isFileDragged: false,
                    //  isBackCrop: true,
                })
            } else {
                this.setState({
                    isBackSaved: true,
                    isBackChanged: true,
                })
            }
        }
    }

    backFileRetry = () => {
        // var reader = new FileReader();
        // reader.readAsDataURL(this.state.backFile);
        // reader.onloadend = function (e) {
        //     this.setState({
        //         backSrc: [reader.result],
        //         // isBackCrop: true
        //     })
        //     }.bind(this);
        this.setState({ backSrc: "", backErrorMsg: "", backSuccessMsg: "", isSuccessBack: false })
    }

    frontFileRetry = () => {
        // var reader = new FileReader();
        // reader.readAsDataURL(this.state.frontFile);
        // reader.onloadend = function (e) {
        //     this.setState({
        //         frontSrc: [reader.result],
        //         // isFrontCrop: true
        //     })
        //     }.bind(this);
        this.setState({ frontSrc: "", frontErrorMsg: "", frontSuccessMsg: "", isSuccessFront: false })
    }

    backFileDelete = async (id) => {
        const { dispatch, salesForceToken } = this.props
        if (id != null) {
            let data = {
                id: id,
                token: salesForceToken
            }
            await dispatch(removeDocument(data));
        }
        let tab = 0;
        if (this.state.frontSrc !== '') {
            tab = this.state.defaultTab;
        }
        this.setState({
            backSrc: '',
            backFile: '',
            defaultTab: tab,
            isBackSubmitted: false,
            isBackSaved: true,
            isBackChanged: false,
            backSuccessMsg: "", isSuccessBack: false, backErrorMsg: ""
        })
    }

    frontFileDelete = async (id) => {
        const { dispatch, salesForceToken } = this.props
        if (id != null) {
            let data = {
                id: id,
                token: salesForceToken
            }
            await dispatch(removeDocument(data));
        }
        let tab = 0;
        if (this.state.backSrc !== '') {
            tab = this.state.defaultTab;
        }
        this.setState({
            frontSrc: '',
            defaultTab: tab,
            frontFile: '',
            isFrontSubmitted: false,
            isFrontSaved: true,
            isFrontChanged: false,
            frontErrorMsg: "", frontSuccessMsg: "", isSuccess: false
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
                this.dataURLtoFile(reader.result, 'eduvan-web-' + time + '.jpg')
            }
        })
    }

    dataURLtoFile(dataurl, filename) {
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
    onImageLoadedBack = image => {
        this.imageRef = image
    }

    onCropChangeBack = (cropBack) => {
        this.setState({ cropBack });
    }

    onCropCompleteBack = cropBack => {
        if (this.imageRef && cropBack.width && cropBack.height) {
            const croppedImageUrlBack = this.getCroppedImgBack(this.imageRef, cropBack)
            this.setState({ croppedImageUrlBack })
        }
    }

    getCroppedImgBack(image, cropBack) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = cropBack.width;
        canvas.height = cropBack.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            cropBack.x * scaleX,
            cropBack.y * scaleY,
            cropBack.width * scaleX,
            cropBack.height * scaleY,
            0,
            0,
            cropBack.width,
            cropBack.height
        )
        const d = new Date()
        const time = d.getTime()
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFileBack(reader.result, 'eduvan-web-' + time + '.jpg')
            }
        })
    }

    dataURLtoFileBack(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImageBack = new File([u8arr], filename, { type: mime });
        this.setState({ croppedImageBack: croppedImageBack })
    }

    handleFrontCrop = () => {
        this.setState({
            isFrontCrop: true, frontErrorMsg: "",
            frontSuccessMsg: "",
        });
    }

    handleFrontCropSave = () => {
        const reader = new FileReader();
        reader.readAsDataURL(this.state.croppedImage);
        reader.onload = () => {
            this.setState({
                frontType: "image/png",
                frontBase: reader.result,
                frontSrc: [reader.result],
                isFrontCrop: false,
                isFrontSaved: true
            })
        };
    }

    handleFrontCropCancel = () => {
        this.setState({ isFrontCrop: false, isFrontSaved: true });
    }

    handleBackCrop = () => {
        this.setState({
            isBackCrop: true, backSuccessMsg: "",
            backErrorMsg: "",
        });
    }

    handleBackCropSave = () => {
        const reader = new FileReader()
        let baseURL = "";
        reader.readAsDataURL(this.state.croppedImageBack);
        reader.onload = () => {
            this.setState({
                backType: "image/png",
                backBase: reader.result,
                backSrc: [reader.result],
                isBackCrop: false,
                isBackSaved: true
            })
        };
    }

    handleBackCropCancel = () => {
        this.setState({ isBackCrop: false, isBackSaved: true });
    }

    handleSubmit = e => {
        e.preventDefault()
        let dockType = [];
        let docBase = [];
        let fileType = [];
        let is_doc_verified = [];
        let eduFileType = [];
        if (this.state.isFrontChanged) {
            let frontBase = this.state.frontBase;
            const fronBase64 = frontBase.replace(`data:${this.state.frontType};base64,`, "");
            docBase.push(fronBase64);
            if (this.state.selectedTab === 1) {
                dockType.push("Driving-Front");
                is_doc_verified.push(this.state.isFrontVerify)
                eduFileType.push("Driving Licence");
            } else if (this.state.selectedTab === 2) {
                dockType.push("Voter-Front");
                is_doc_verified.push(this.state.isFrontVerify)
                eduFileType.push("Voter Id Front");
            } else {
                dockType.push("Passport-Front");
                is_doc_verified.push(this.state.isFrontVerify)
                eduFileType.push("Passport Front");
            }
            fileType.push(this.state.frontType);
        }
        if (this.state.isBackChanged) {
            let backBase = this.state.backBase;
            const backBase64 = backBase.replace(`data:${this.state.backType};base64,`, "");
            docBase.push(backBase64);
            if (this.state.selectedTab === 1) {
                dockType.push("Driving-Back");
                is_doc_verified.push(this.state.isBackVerify)
                eduFileType.push("Driving Licence");
            } else if (this.state.selectedTab === 2) {
                dockType.push("Voter-Back");
                is_doc_verified.push(this.state.isBackVerify)
                eduFileType.push("Voter Id Back");
            } else {
                dockType.push("Passport-Back");
                is_doc_verified.push(this.state.isBackVerify)
                eduFileType.push("Passport Back");
            }
            fileType.push(this.state.backType);
        }
        const d = new Date()
        const time = d.getTime()
        let data = {
            "token": this.props.salesForceToken,
            "parent_id": this.props.sfid,
            "fname": "eduvan-web-" + time + '.jpg',
            "base64": docBase,
            "doctype": dockType,
            "basetype": fileType,
            "catType": "ID Proof",
            is_doc_verified: is_doc_verified,
            "fileType": eduFileType,
            "id": parseInt(this.props.user)
        }
        this.props.dispatch(uploadDocument(data)).
            then((reponse) => {
                if (reponse === "success") {
                    let sfids = localStorage.getItem('sfid')
                    this.props.dispatch(isStatementUpload({ user_sfid: sfids, isAadharUpload: true,is_force_verification : this.state.isFrontVerify && this.state.isBackVerify ? false : true }))
                    this.props.history.push("/ed_doc_pan");
                    this.setState({ isSuccess: true });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleTab = (tab) => {
        this.setState({
            selectedTab: parseInt(tab),
            frontSuccessMsg: '',
            frontErrorMsg: '',
            backSuccessMsg: '',
            backErrorMsg: '',
            validFrontPic: true,
            validBackPic: true,
        });
        this.frontFileDelete();
        this.backFileDelete();
    }

    handleFileDrag = () => {
        this.setState({ isFileDragged: true });
    }

    handleFrontErrorClose = () => {
        this.setState({ validFrontPic: true, frontErrorMsg: '' });
    }

    handleBackErrorClose = () => {
        this.setState({ validBackPic: true, backErrorMsg: '' });
    }

    checkFraud = async (file, type) => {
        const { sfid } = this.props
        const { frontDocAttempt, backDocAttempt } = this.state
        const tab = this.state.selectedTab;
        return new Promise(async (resolve, reject) => {
            try {
                const { dispatch } = this.props
                var formdata = new FormData();
                formdata.append("files", file);
                formdata.append("sfid", sfid);
                if (tab === 1) {
                    if (type == 1) {
                        formdata.append("type", "DRIVING-LIICENSE-FRONT");
                    } else {
                        formdata.append("type", "DRIVING-LIICENSE-BACK");
                    }
                    /* formdata.append("type", "DRIVING-LIICENSE"); */
                } else if (tab === 2) {
                    if (type == 1) {
                        formdata.append("type", "VOTER-ID-FRONT");
                    } else {
                        formdata.append("type", "VOTER-ID-BACK");
                    }
                    /* formdata.append("type", "VOTER-ID"); */
                } else {
                    if (type == 1) {
                        formdata.append("type", "PASSPORT");
                    } else {
                        formdata.append("type", "PASSPORT");
                    }
                    /* formdata.append("type", "PASSPORT"); */
                }
                await dispatch(fraudCheck(formdata)).then(async (response) => {
                    if (response.status == "success") {
                        const res = response.result ? response.result : null;
                        const getData = res && res.length > 0 ? res[0] : null;
                        const doctype = getData && getData.type ? getData.type : null;
                        if (type == 1) {
                            this.setState({ validFrontPic: true, isFrontSuccess: true,isFrontVerify : true, frontSuccessMsg: "Verification Successful!" });
                            resolve(true);
                            /* const check = await this.checkFrontFile(doctype);
                            if(check)
                            {
                                this.setState({validFrontPic: true, frontSuccessMsg: "Verification Successful!"});
                                resolve(true);
                            }else{
                                this.setState({validFrontPic: false, frontErrorMsg: "Invalid Document!"});
                                resolve(false);
                            } */

                        } else {
                            this.setState({ validBackPic: true, isBackSuccess: true, isBackVerify: true, backSuccessMsg: "Verification Successful!" });
                            resolve(true);
                            /* const check = await this.checkBackFile(doctype);
                            if(check)
                            {
                                this.setState({validBackPic: true, backSuccessMsg: "Verification Successful!"});
                                resolve(true);
                            }else{
                                this.setState({validBackPic: false, backErrorMsg: "Invalid Document!"});
                                resolve(false);
                            } */
                        }
                    } else {
                        if (type == 1) {
                            const doctAttempt = frontDocAttempt + 1;
                            this.setState({ frontDocAttempt: doctAttempt });
                            if (doctAttempt > 2) {
                                this.setState({ validFrontPic: false, isFrontSuccess: true, isFrontVerify: false, frontErrorMsg: "Your document not verified Still you can submit to backend verification" });
                                resolve(true);
                            } else {
                                this.setState({ validFrontPic: false, frontSuccessMsg: '', isFrontVerify: false, frontErrorMsg: response.message ? response.message : "Invalid Document" });
                                resolve(false);
                            }
                        } else {
                            const doctAttempt = backDocAttempt + 1;
                            this.setState({ backDocAttempt: doctAttempt });
                            if (doctAttempt > 2) {
                                this.setState({ validBackPic: false, isBackSuccess: true, isBackVerify: false, backErrorMsg: "Your document not verified Still you can submit to backend verification" });
                                resolve(true);
                            } else {
                                this.setState({ validBackPic: false, backSuccessMsg: '', isBackVerify: false, backErrorMsg: response.message ? response.message : "Invalid Document" });
                                resolve(false);
                            }
                        }
                    }
                });
            } catch (err) {
                reject(err.message ? err.message : err)
            }
        });
    }

    checkFrontFile = async (type) => {
        return new Promise(async (resolve, reject) => {
            const doctype = this.state.selectedTab;
            console.log("doctype", doctype);
            if (doctype == 1) {
                resolve(true);
            } else if (doctype == 2 && (type == "voterid_front_new" || type == "voterid_front")) {
                resolve(true);
            } else if (doctype == 3 && type == "passport_front") {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    checkBackFile = async (type) => {
        return new Promise(async (resolve, reject) => {
            const doctype = parseInt(this.state.selectedTab);
            console.log("doctype", doctype);
            if (doctype == 1) {
                resolve(true);
            } else if (doctype == 2 && type == "voterid_back") {
                resolve(true);
            } else if (doctype == 3 && type == "passport_front") {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    render() {
        let inputRef;
        let frontInputRef;
        const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
        const { isLoading, history } = this.props;
        const { defaultTab } = this.state
        return (
            <>
                <Helmet>
                    <title> Kyc Screen 13 </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages">
                    <div className={`container-zero ${(!this.state.backSrc || !this.state.frontSrc) ? 'dragarea' : ''}  ${this.state.isFileDragged ? 'active' : ''}`}>
                        <div className="flex-w flex-tr">
                            <div className="kyc_leftbar login-bg">

                                {/* <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_doc_aadhar">Back</Link></li>
      </ul>
     </div> */}

                                <LogoSideBar sideTitle="Back" backLink='/ed_doc_aadhar' historyGoBack="" />

                                <ul className="kyc_timeline p-0 mt-1">
                                    <li className="complete">Registration</li>
                                    <li className="complete">Limit Approval</li>
                                    <li className="has_child ongoing"> Verification <span className="sheading">Keep your document ready</span>
                                        <ul className="sub_timeline pl-2">
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/ed_doc_profile')} className="complete">Photograph</li>
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/ed_digilocker')} className="active">Identity Card</li>
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/ed_doc_pan')} >PAN Card</li>
                                        </ul>
                                    </li>
                                    <li>AutoPay <span className="sheading">Set up AutoPay & your account is automatically debited on due date</span></li>
                                    <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                                </ul>
                            </div>
                            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
                                <div className="form_width_1 ext8 mb-1 mt-1">
                                    <div className="form_details">
                                        <h4 className="bg-1 text-center imgaligned"><img src={asset + "images/icons/icon_briefcase.svg"} />Please Upload Your Identity Proof</h4>
                                        <ul className="horizontal_list">
                                            <li>Max file size 5 MB</li>
                                            <li>File should be PDF, JPEG, PNG</li>
                                            <li>Image should be clear</li>
                                        </ul>
                                        <div className='bank_customer_activity_wrapper mt-3 mb-3'>
                                            <div className='b_c_a_tabs'>
                                                <Nav variant="pills" activeKey={this.state.selectedTab} onSelect={this.handleTab} defaultActiveKey={this.state.selectedTab} className='row'>
                                                    <div className='col-lg-4'>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey={1} disabled={defaultTab != 0 && defaultTab != 1 ? true : false} >Driving License</Nav.Link>
                                                        </Nav.Item>
                                                    </div>
                                                    <div className='col-lg-4'>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey={2} disabled={defaultTab != 0 && defaultTab != 2 ? true : false} >Voter ID</Nav.Link>
                                                        </Nav.Item>
                                                    </div>
                                                    <div className='col-lg-4'>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey={3} disabled={defaultTab != 0 && defaultTab != 3 ? true : false} >Passport</Nav.Link>
                                                        </Nav.Item>
                                                    </div>
                                                </Nav>
                                            </div>
                                        </div>
                                        <form className="otpform otpform-others fullwidth" onDragEnter={this.handleFileDrag} >
                                            <div className="d-flex flex-col-m mn_height_4">
                                                <div className="row justify-content-center">
                                                    <div className="max-width-700">
                                                        <div className="row">
                                                            <div className="col-md-6 text-center">
                                                                <h1 className="upload_headings">Front</h1>
                                                                <div className="upload_box d-block cropped_img">
                                                                    {this.state.frontSrc ? (
                                                                        this.state.isFrontCrop ? (
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
                                                                        ) : (
                                                                            <>
                                                                                <div className="btn_align_top">
                                                                                    {this.state.frontSrc ? (
                                                                                        <>
                                                                                            <button type="button" onClick={this.frontFileRetry} className="btn btn-default"><img src={asset + "images/Vector-8.png"} />&nbsp;Retry</button>
                                                                                            <button type="button" onClick={this.handleFrontCrop} className="btn btn-default"><img src={asset + "images/Vector9.png"} />Crop</button>
                                                                                            <button type="button" onClick={() => this.frontFileDelete(this.state.frontId)} className="btn_delete"><img src={asset + "images/Vector-delete.svg"} /></button>
                                                                                        </>
                                                                                    ) : ''}
                                                                                </div>
                                                                                {this.state.frontFileType === 2 ? (
                                                                                    <img style={{ cursor: 'pointer', width: '53%', padding: '10px' }} onClick={() => this.handlePdfView(this.state.frontBase)} src='images/pdf.png' />
                                                                                ) : (
                                                                                    <img src={this.state.frontSrc} />
                                                                                )}

                                                                            </>
                                                                        )
                                                                    ) : (
                                                                        <>
                                                                            <div
                                                                                className={`drop-container ${!this.state.frontSrc && !this.state.backSrc ? "a_front" : "singleimg"}`}
                                                                                onDragOver={this.dragOver}
                                                                                onDragEnter={this.dragEnter}
                                                                                onDragLeave={this.dragLeave}
                                                                                onDrop={this.fileDrop}
                                                                            >
                                                                                <h3>Drag and drop</h3>
                                                                                {this.state.isFrontDraged && (<h5 style={{ color: '#a5a5a5' }}>Upload file upto 5MB by dropping in this window</h5>)}
                                                                            </div>
                                                                            <div className="or_type1">or</div>

                                                                            <input
                                                                                type="file"
                                                                                style={{ display: 'none' }}
                                                                                ref={refParam => frontInputRef = refParam}
                                                                                onChange={this.handleFrontFileSelect}
                                                                                accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                                                                            />
                                                                            <button type="button" onClick={() => frontInputRef.click()} className={"btn btn-upload"}>
                                                                                Upload Photo
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    {!this.state.validFrontPic && this.state.frontErrorMsg !== '' && (
                                                                        <div className="alert red-danger fade show" role="alert">
                                                                            {this.state.frontErrorMsg}
                                                                            <img type="button" onClick={this.handleFrontErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_wrong.svg"} />
                                                                        </div>
                                                                    )}
                                                                    {this.state.isSuccessFront ?
                                                                        (
                                                                            <div className="alert green-success fade show" role="alert">
                                                                                File uploaded successfully
                                                                                <img type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_right.svg"} />
                                                                            </div>
                                                                        ) : ''
                                                                    }<br /><br /><br />
                                                                    {this.state.validFrontPic && this.state.frontSuccessMsg != '' ?
                                                                        (
                                                                            <div className="alert green-success fade show success_img" role="alert">
                                                                                {this.state.frontSuccessMsg}
                                                                                <img style={{ maxWidth: 400 }} type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_right.svg"} />
                                                                            </div>
                                                                        ) : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 text-center">
                                                                <h1 className="upload_headings">Back</h1>
                                                                <div className="upload_box d-block cropped_img">
                                                                    {this.state.backSrc ? (
                                                                        this.state.isBackCrop ? (
                                                                            <>
                                                                                <div className="btn_align_top align-center">
                                                                                    <button type="button" onClick={this.handleBackCropSave} className="btn btn-default">&nbsp;Ok</button>
                                                                                    <button type="button" onClick={this.handleBackCropCancel} className="btn btn-default">&nbsp;Cancel</button>
                                                                                </div>
                                                                                <ReactCrop
                                                                                    src={this.state.backSrc}
                                                                                    crop={this.state.cropBack}
                                                                                    onImageLoaded={this.onImageLoadedBack}
                                                                                    onComplete={this.onCropCompleteBack}
                                                                                    onChange={this.onCropChangeBack}
                                                                                />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <div className="btn_align_top">
                                                                                    {this.state.backSrc ? (
                                                                                        <>
                                                                                            <button type="button" onClick={this.backFileRetry} className="btn btn-default"><img src={asset + "images/Vector-8.png"} />&nbsp;Retry</button>
                                                                                            <button type="button" onClick={this.handleBackCrop} className="btn btn-default"><img src={asset + "images/Vector9.png"} />Crop</button>
                                                                                            <button type="button" onClick={() => this.backFileDelete(this.state.backId)} className="btn_delete"><img src={asset + "images/Vector-delete.svg"} /></button>
                                                                                        </>
                                                                                    ) : ''}
                                                                                </div>
                                                                                {this.state.backFileType === 2 ? (
                                                                                    <img style={{ cursor: 'pointer', width: '53%', padding: '10px' }} onClick={() => this.handlePdfView(this.state.backBase)} src={asset + 'images/pdf.png'} />
                                                                                ) : (
                                                                                    <img src={this.state.backSrc} />
                                                                                )}
                                                                            </>
                                                                        )
                                                                    ) : (
                                                                        <>
                                                                            <div
                                                                                className={`col-sm drop-container ${!this.state.frontSrc && !this.state.backSrc ? "a_back" : "singleimg"}`}
                                                                                onDragOver={this.backDragOver}
                                                                                onDragEnter={this.backDragEnter}
                                                                                onDragLeave={this.backDragLeave}
                                                                                onDrop={this.backFileDrop}
                                                                            >
                                                                                <h3>Drag and drop</h3>
                                                                                {this.state.isBackDraged && (<h5 style={{ color: '#a5a5a5' }}>Upload file upto 5MB by dropping in this window</h5>)}
                                                                            </div>
                                                                            <div className="or_type1">or</div>
                                                                            <input
                                                                                type="file"
                                                                                style={{ display: 'none' }}
                                                                                ref={refParam => inputRef = refParam}
                                                                                onChange={this.handleBackFileSelect}
                                                                                accept="image/x-png,image/gif,image/jpeg,image/jpg,application/pdf"
                                                                            />
                                                                            <button type="button" onClick={() => inputRef.click()} className={"btn btn-upload"}>
                                                                                Upload Photo
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    {this.state.isSuccessBack ?
                                                                        (
                                                                            <div className="alert green-success fade show" role="alert">
                                                                                File uploaded successfully
                                                                                <img type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_right.svg"} />
                                                                            </div>
                                                                        ) : ''
                                                                    }
                                                                    {this.state.validBackPic && this.state.backSuccessMsg !== '' && (
                                                                        <div className="alert green-success fade show success_img" role="alert">
                                                                            {this.state.backSuccessMsg}
                                                                            <img type="button" className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_right.svg"} />
                                                                        </div>
                                                                    )
                                                                    }<br /><br /><br />
                                                                    {!this.state.validBackPic && this.state.backErrorMsg !== '' && (
                                                                        <div className="alert red-danger fade show" role="alert">
                                                                            {this.state.backErrorMsg}
                                                                            <img type="button" onClick={this.handleBackErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_wrong.svg"} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form_spacing text-center">
                                                    {/* {(this.state.isFrontChanged || this.state.isBackChanged) && (this.state.frontBase !="" || this.state.backBase !="") && ( */}
                                                    {(this.state.isFrontSuccess && this.state.isBackSuccess) ?
                                                        <button
                                                            type="button"
                                                            onClick={this.handleSubmit}
                                                            className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                                                            style={styles}
                                                        >Submit</button>
                                                        :
                                                        <button
                                                            type="button"
                                                            //   onClick={this.handleSubmit}
                                                            disabled={false}
                                                            className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                                                        //   style={styles}
                                                        >Submit</button>}

                                                    {/* )} */}
                                                </div>
                                                {/* {(this.state.isFrontChanged || this.state.isBackChanged) && this.state.frontBase !="" && this.state.backBase !="" && (
                 <div className="form_spacing text-center">
                 <button 
                      type="button" 
                      onClick={this.handleSubmit}
                      className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                      style={styles}
                      >Submit</button>
                 </div>
                 )} */}
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
    return {
        salesForceToken,
        sfid,
        user,
        isLoading,
        message
    };
}

export default connect(mapStateToProps)(KycScreen13)