import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import Helmet from "react-helmet";
import { asset } from "../common/assets";
import NewsArticle from '../common/news-article'
import RelatedCourse from '../common/related-course';
import WebCam from './webCam/face-api';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux';
import { livenessCheck } from '../actions/user';
import { videomodal_open } from '../actions/model';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {
    favProduct,
    getFaqsById,
    getLearnById,
    getInstructorById,
    getFeedbackById,
    getSimilarProduct,
    openCamera,
    closeCamera, convertToBase64
} from "../actions/user";

import { getBlogs, getFavoriteProductCount, getTestimonial } from "../actions/product";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import SimilarProduct from "../common/similar-product";
// import cardimg from '../images/decbitcards-item.png';
// import cardimg from '../images/decbitcards-item.png';

import Carousel from 'react-multi-carousel';
import OfferAvailable from "../common/offer-available";
import RecentView from "../common/recent-view";
import PaymentPlan from "./model/payment-plans";
import SocialShare from './SocialShare';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1680 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


class PdpSchool extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            isFav: props.product.isFavorite,
            morePlansOpen: false,
            relatedBlogData: [],
            highlight: "",
            gender: "Male"
        }

    }


    handleVideomodal = (video_url) => {
        this.props.dispatch(videomodal_open(video_url))
    }

    scrollToTargetAdjusted = (target_id) => {
        this.setState({ highlight: target_id })
        var element = document.getElementById(target_id);
        var headerOffset = 200;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    handleScroll = () => {
        // console.log("SCROLL")
        const ids = ['AboutTheCourse', 'whatYoullLearn', 'instructors', 'FAQ']
        for (let i = 0; i < ids.length; i++) {
            if (this.isInViewport(ids[i])) {
                // console.log(ids[i],"is now visible")
                for (let j = 0; j < ids.length; j++) {
                    document.getElementById(ids[j] + "-top").classList.remove("btn-active")
                }
                document.getElementById(ids[i] + "-top").classList.add("btn-active")
                break;
            }
        }
    }

    handleBuy = (pid) => {
        this.props.handleProBuy(pid);
        localStorage.setItem("student_name", this.state.childName)
        localStorage.setItem("class_name", this.state.childSection)
        localStorage.setItem("gender", this.state.gender)
        localStorage.setItem("session", "2000-22")
        localStorage.setItem("idcardimage", this.state.fileSrc)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    handleTakePic = () => {
        this.props.openCamera();
    }
    async componentDidMount() {
        // window.addEventListener('scroll', this.handleScroll);

        const { product } = this.props
        let faqdata = {
            id: product.sfid,
        }
        const { sfid, subcat_id } = this.props
        let data = {
            sub_category_id: subcat_id.category_id,

            // category: product && product.product_sub_category__c?product.product_sub_category__c:'',
            user_sfid: sfid
        }
        this.props.dispatch(getBlogs(product.sfid)).then((response) => {
            if (response) {
                console.log('blog', response)
                this.setState({ relatedBlogData: response });
            }
        });
        this.props.dispatch(getSimilarProduct(data));
        await this.props.dispatch(getFaqsById(faqdata));
        await this.props.dispatch(getLearnById(faqdata));
        await this.props.dispatch(getInstructorById(faqdata));
        await this.props.dispatch(getFeedbackById(faqdata));
        $('.filter_accordion').eq(0).children('.content').show()
        $('.filter_accordion .tab').click(function () {
            $(this).parent().siblings().children('.tab').removeClass('show');
            $(this).addClass('show')
            $(this).parent().siblings().children('.content').slideUp();
            $(this).next().slideToggle();
        })
        //faq
        $('.question').click(function () {
            $(this).siblings('.question').next().slideUp();
            $(this).siblings('.question').removeClass('active');
            $(this).toggleClass('active');
            $(this).next('.answer').slideToggle();
        });

        //education header
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 600) {
                $('.education-tab-header').addClass('fixed-header');
                //$('nav div').addClass('visible-title');
            } else {
                $('.education-tab-header').removeClass('fixed-header');
                //$('nav div').removeClass('visible-title');
            }
        });


    }
    isInViewport = (id) => {
        const rect = document.getElementById(id).getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }


    setFavourite(pid, id) {
        const { user, sfid } = this.props;

        let data = {
            user_sfid: sfid,
            product_id: pid,
            device_id: ''
        }
        this.props.dispatch(favProduct(data)).then((response) => {
            if (response && response.status && response.status === "success") {
                this.getFavCount();
                this.setState({ isFav: !this.state.isFav })
                if ($(`#${id}`).hasClass('active')) {
                    $(`#${id}`).removeClass('active')
                    $(`#${id}`).removeClass('fa-heart')
                    $(`#${id}`).addClass('fa-heart-o')
                } else {
                    $(`#${id}`).addClass('active')
                    $(`#${id}`).addClass('fa-heart')
                    $(`#${id}`).removeClass('fa-heart-o')

                }
            }
        });
    }

    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
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
    handleCancelCrop = () => {
        this.setState({ isFileCropped: false });
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
        var re = /(\.jpg|\.jpeg|\.png)$/i;
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
            // this.checkLiveness(files[0]);
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
                    this.setState({ validPic: true, liveness: validPic, livenessScore: livenessScore, isLive: validPic, isValidProfile: true, successMsg: "Verified Successful!" });
                } else {
                    if (profileAttempt > 2) {
                        this.setState({ validPic: false, picErrorMsg: 'Your photo not verified Still you can submit to backend verification', liveness: true, livenessScore: 1000, isLive: true });
                    } else {
                        this.setState({ validPic: false, picErrorMsg: getData.message ? getData.message === "Internal Server Error" ? "Face Verification Failed" : getData.cause : getData.cause, livenessScore: 0, isLive: false });
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
        console.log('e.target.files[0]', files[0])
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
            this.setState({ filesUpload: e.target.files[0] })
            formData.append('files', e.target.files[0]);

            this.props.convertToBase64(formData).then((response) => {
                console.log(response, "convertToBase64 response  ")
                this.setState({
                    fileSrc: `data:${response.filetype};base64,${response.base64}`,
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
        // const profile = await this.baseDataURLtoFile(base64, 'profile.png');
        // console.log(profile,"xxxxxxxxxxxxxxxxxxxxx")
        // if (profile.status) {
        //     this.checkLiveness(profile.data);
        // }
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
    // handleFileCrop = () => {
    //     const reader = new FileReader()
    //     console.log("croppedImage", this.state.croppedImage);
    //     //  this.checkLiveness(this.state.croppedImage);
    //     reader.readAsDataURL(this.state.croppedImage);
    //     reader.onload = async () => {

    //         this.setState({
    //             fileSrc: [reader.result],
    //             isFileCropped: false,
    //             fileType: "image/png",
    //             isSaved: true,
    //         });
    //     };

    // }
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
            fileSrc: null,
            fileType: null,
            // isFileCropped: true
        });
        // this.props.openCamera();
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
    handleFileDelete = async (id) => {
        const { removeProfile, salesForceToken } = this.props;

        await this.setState({
            file: null,
            fileSrc: '',
            fileSrc: "",
            liveness: false,
            isSaved: false,
            isSubmitted: false,
            successMsg: '',
            profileId: null
        })
    }
    handleSubmit = () => {

        // this.props.history.push('/')
        // window.location.reload(false)
    }
    render() {
        // let frontInputRef;
        const { profile_pic, isValidProfile } = this.state
        const { user } = this.props;
        const { faqs, feedback, instructor, product, similarProd, sfid, recentProd } = this.props;
        let inputRef;
        const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
        // console.log('this.state.fileSrcthis.state.fileSrc', (this.state.gender || this.state.fileSrc || this.state.childName || this.state.childSection))
        // console.log(product, "propsss")
        return (
            <>
                <Helmet>
                    <title>Eduvanz | K-12 </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {/* banner */}

                <div className="education-tab-header">
                    <div className="sub-header d-none d-lg-block">
                        <div className="site-header-wrap container">
                            <div className="sub-left-menu ">
                                <ul className="sub-main-menu">
                                    <li className="menu-link active-menu">
                                        <button className="text-white btn-color-hover" id={"FeeDetail-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("FeeDetail")
                                        }}>Fee Details & Academic Stats
                                        </button>
                                    </li>
                                    <li className="menu-link">
                                        <button className="text-white btn-color-hover" id={"Facilities-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("Facilities")
                                        }}>Facilities
                                        </button>
                                    </li>
                                    <li className="menu-link">
                                        <button className="text-white btn-color-hover" id={"Admission-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("Admission")
                                        }}>Admission Criteria
                                        </button>
                                    </li>
                                    <li className="menu-link">
                                        <button className="text-white btn-color-hover" id={"Gallery-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("Gallery")
                                        }}>Gallery
                                        </button>
                                    </li>
                                    <li className="menu-link">
                                        <button className="text-white btn-color-hover" id={"FAQ-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("FAQ")
                                        }}>FAQ
                                        </button>
                                    </li>
                                    {/*<li class="nav-link active"> <a href='#AboutTheCourse'> About the course</a></li>*/}
                                    {/*<li className="menu-link active"><a  href='#whatYoullLearn'> What you’ll Learn</a></li>*/}
                                    {/*<li className="menu-link"><a href='#instructors'>Instructors</a></li>*/}
                                    {/*<li className="menu-link"><a href='#FAQ'>FAQ</a></li>*/}
                                </ul>
                            </div>
                            <div className="sub-right-menu pdp-page-des">
                                <ul className="sub-main-menu">
                                    <li><a href="#"><img className="storeicon"
                                        src={asset + "images/coins1.png"} /> Credit
                                        Limit: <b>₹2,80,000</b> </a></li>
                                    <li className="">
                                        <button type="button" id="fav-education-item-0"
                                            className="wish-btn wist_list_btn " onClick={() => {
                                                this.setFavourite(product && product.sfid ? product.sfid : '', `fav-education-item-${product && product.id ? product.id : 0}`)
                                            }}><i className="fa fa-heart-o"
                                                aria-hidden="true"></i></button>
                                        <button className="apply-btn ml-3">Apply Now</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pdesc-banner before-d-none">
                    <div className="inner-page inner-padd-zero">
                        <div className="container banner-content">
                            <div className='row mx-0'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5 nobg-color'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            <li><a
                                                href="#">{product.product_category__c ? product.product_category__c : ''}</a>
                                            </li>
                                            <li>{product.product_sub_category__c ? product.product_sub_category__c : ''}</li>
                                            <li>{product.name}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-lg-4 mx-0">
                                <div className="col-lg-5">
                                    <button
                                        className='btn bg-white text-danger font-weight-bold rounded-3 px-3'>Upgrad
                                    </button>
                                    <h2 className="mt-4">{product.name ? product.name : ''}</h2>
                                    <p className="mt-3 fs-15 text-dark">Learn people management, HR analytics,
                                        performance & reward management, and much more with a prestigious certification
                                        from LIBA. </p>
                                    <p className='fs-13 text-dark my-3'><span>Stride Price: </span><span
                                        className='ml-2'>₹{product && product.mrp__c ? product.mrp__c.toLocaleString('en-IN') : ''}</span><span
                                            className='ml-2'><del>5,54,000</del></span><span className='ml-2 text-primary'>30% OFF</span>
                                    </p>
                                    <div className="d-flex flex-wrap align-items-center mt-lg-4">
                                        <div className="mr-3">
                                            <button className="btn btn-outline-light" 
                                            onClick={(e)=>{
                                     e.preventDefault()
                                    window.open(`https://maps.google.com/maps?q=${product.location__latitude__s},${product.location__longitude__s}`, '_blank')}}
                                    >Show on map</button>
                                        </div>
                                        <div className="mr-4">
                                            <SocialShare />
                                        </div>
                                        <div className="mr-4 line_var"></div>
                                        <div className=" d-flex align-items-center mt-lg-0 mt-3"
                                            onClick={() => this.handleVideomodal(product.video_url__c)}
                                        >
                                            <button className="play_btn">
                                                <i className="fa fa-play" aria-hidden="true"></i>
                                            </button>
                                            <div className="ml-3">
                                                Watch
                                                <span className="d-block font-weight-bold" >Intro Video</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">&nbsp;</div>
                            </div>
                        </div>
                        <img src={product.image_url__c} alt="upgard" className="img-fluid w-100" />
                    </div>

                </div>
                {/* banner */}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="row">
                                <div className="col">
                                    <div className="">
                                        <ul className="d-flex cf_box_wrap" style={{ maxHeight: "5.4rem" }}>
                                            <li>
                                                <div className="d-flex  cf_box">
                                                    <div className="dropdown">
                                                        Select Class
                                                        <span>
                                                            <select class="form-select" aria-label="Default select example"
                                                                style={{ fontWeight: "500", border: "none" }}
                                                            >
                                                                {product.select_class && product.select_class.map((item) => (
                                                                    <option value={item}>{item}</option>
                                                                ))}
                                                            </select>
                                                        </span>
                                                    </div>

                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex cf_box">
                                                    <div className="duration">Year <span>{product.year} </span></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col">
                                    <div className="">
                                        <ul className="d-flex  cf_box_wrap" style={{ maxHeight: "5.4rem" }}>
                                            <li>
                                                <div className="d-flex cf_box">
                                                    <div className="img-box">
                                                        <img src={asset + "images/c01.png"} alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="duration">Last Date <span>{product && product.last_date && product.last_date}</span></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex cf_box">
                                                    <div className="img-box">
                                                        <img src={asset + "images/c02.png"} alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="duration">Board <span>{product && product.learning_format__c && product.learning_format__c}</span></div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex cf_box">
                                                    <div className="img-box">
                                                        <img src={asset + "images/c03.png"} alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="duration">Addmission <span className='text-success'>{product && product.admission && product.admission}</span></div>
                                                </div>
                                            </li>

                                            <li className='apply-flex wishlist' style={{justifyContent:'space-between'}}>
                                                {/* <button type='button'
                                                    onClick={() => this.setFavourite(product && product.sfid ? product.sfid : '', `fav-education-item-${product && product.id ? product.id : 0}`)}
                                                    id={`fav-education-item-${product && product.id ? product.id : 0}`}
                                                    className={`wish-btn wist_list_btn ${product && (this.state.isFav) ? "active" : ""}`}>
                                                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                </button> */}

                                                <button type='button' >
                                                    <i
                                                        aria-hidden="true"
                                                        onClick={() =>
                                                            this.setFavourite(
                                                                product && product.sfid && product.sfid,
                                                                `fav-education-item-${product && product.id ? product.id : 0}`,
                                                            )
                                                        }
                                                        id={`fav-education-item-${product && product.id ? product.id : 0}`}
                                                        className={`fs-5 d-flex justify-content-center align-items-center mr-5 ${product && (this.state.isFav) ? "active fa fa-heart" : "fa fa-heart-o"}`}></i>
                                                </button>

                                                <button className="apply-btn" data-toggle="modal" data-target="#education_modal">Apply Now</button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row mb-4">
                        <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b06.png"} alt=""
                                            className="img-fluid" /></div>
                                        <p className="mb-0">Private Ownership</p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b07.png"} alt=""
                                            className="img-fluid" /></div>
                                        <p className="mb-0">Year of Establishment 2019</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b08.png"} alt=""
                                            className="img-fluid" /></div>
                                        <p className="mb-0">Campus Size 1.2 Acres</p>
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b09.png"} alt=""
                                            className="img-fluid" /></div>
                                        <p className="mb-0">Admission Taken 800+ Students</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b10.png"} alt=""
                                            className="img-fluid" /></div>
                                        <p className="mb-0">School Type Co-Education</p>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#F3F2FF66" }}>
                    <div className="container">
                        <div className="row my-4" >
                            <div className="col-12">
                                <ul className="nav nav-tabs" id="searchTab">
                                    <li className="nav-item">
                                        <button className={`nav-link ${this.state.highlight == "FeeDetail" ? 'active' : ''}`} onClick={() => {
                                            this.scrollToTargetAdjusted("FeeDetail")
                                        }}

                                        >Fee Details & Academic Stats
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${this.state.highlight == "Facilities" ? 'active' : ''}`} onClick={() => {
                                            this.scrollToTargetAdjusted("Facilities")
                                        }}>Facilities
                                        </button>
                                    </li>

                                    <li className="nav-item">
                                        <button className={`nav-link ${this.state.highlight == "Admission" ? 'active' : ''}`} onClick={() => {
                                            this.scrollToTargetAdjusted("Admission")
                                        }}>Admission Criteria
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className={`nav-link ${this.state.highlight == "Gallery" ? 'active' : ''}`} onClick={() => {
                                            this.scrollToTargetAdjusted("Gallery")
                                        }}>Gallery
                                        </button>
                                    </li><li className="nav-item">
                                        <button className={`nav-link ${this.state.highlight == "FAQ" ? 'active' : ''}`} onClick={() => {
                                            this.scrollToTargetAdjusted("FAQ")
                                        }}>FAQ
                                        </button>
                                    </li>
                                </ul>

                                <div id="FeeDetail" style={{ backgroundColor: "#F3F2FF66" }}>
                                    <div className="row mb-4">
                                        <div className="col">
                                            <div className="p-4  about_course">
                                                <div className='row mb-4'>
                                                    <div className={"col-sm-7"}>
                                                        <h4 className="mb-4">Fees details of Primary School</h4>
                                                        <div className="row">
                                                            <div className="col">

                                                                <p className="mb-0">Monthly Fees</p>
                                                                <h2 className="mb-2">{product.mrp__c}</h2>
                                                                <button className={"link"}>What is the cost & how is this calculated?</button>

                                                            </div>
                                                            <div className="col">
                                                                <p className="mb-0">Total cost for a new admission (First Year)</p>
                                                                <h2 className="mb-2">1,35,000</h2>
                                                                <button className={"link"}>What is the cost & how is this calculated?</button>

                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <span>Notes: 5% off on tution fees for younger child.</span>

                                                    </div>
                                                    <div className={"col-sm-5"}>
                                                        <h5 className="">Academic Stats</h5>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Classes Offered</p>
                                                            </div>
                                                            <p><strong>{product.classes_offered__c}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Language of Instruction</p>
                                                            </div>
                                                            <p><strong>{product.language_of_instruction__c}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Academic Session</p>
                                                            </div>
                                                            <p><strong>{product.academic_session}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Student faculty Ratio</p>
                                                            </div>
                                                            <p><strong>{product.student_faculty_ratio__c}</strong></p>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-4" >
                        <div className="col-12">

                            <div id="Facilities">

                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>Top Facilities</h4>
                                    </div>
                                    {product.amenities_offered__c &&
                                        <Carousel responsive={responsive}>
                                            {product.amenities_offered__c && product.amenities_offered__c.map(item => (
                                                <div className="col-md-12">
                                                    <div className='icon-card'>
                                                        <figure>
                                                            <img src={item.logo} alt="" />
                                                        </figure>
                                                        <div className="card-inner-text text-center">
                                                            <h5>{item.title}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </Carousel>
                                    }

                                </div>


                            </div>
                            <div id="Admission">

                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>Admission Criteria</h4>
                                    </div>
                                    <div className="row mb-4 w-100">
                                        <div className="col-12">
                                            <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" width={180} />
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" width={180} style={{ position: "absolute", top: 100, left: 100 }} />
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" width={180} style={{ position: "absolute", top: 30, left: 170 }} />

                                                    </div>
                                                    <div className={"col-sm-6"}>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Classes Age/Qualification</p>
                                                            </div>
                                                            <p><strong>{product.classes_age_classification}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Marks</p>
                                                            </div>
                                                            <p><strong>{product.marks}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Total Seats</p>
                                                            </div>
                                                            <p><strong>{product.total_seats}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Student Interaction</p>
                                                            </div>
                                                            <p><strong>{product.student_interactiom}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Parents Interaction</p>
                                                            </div>
                                                            <p><strong>{product.parent_interaction}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Form Availability</p>
                                                            </div>
                                                            <p><strong>{product.form_availability}</strong></p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <div className={"d-flex"}>
                                                                <img src={asset + "images/b05.png"} alt=""
                                                                    className="" height={20} />
                                                                <p className="pl-2">Form Payment</p>
                                                            </div>
                                                            <p><strong>{product.form_payment}</strong></p>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>Documents Required</h4>
                                    </div>
                                    <div className="row mb-4 w-100">
                                        <div className="col-12">
                                            <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                                <div className="row">
                                                    <div className={"col-sm-8"}>
                                                        <div className="row">
                                                            {product.documents_required_for_admission__c && product.documents_required_for_admission__c.map(item => (
                                                                <div className="col-sm-6 d-flex justify-content-between">
                                                                    <div className={"d-flex"}>
                                                                        <img src={asset + "images/icons/check-circel-tick.png"} alt=""
                                                                            className="" height={20} />
                                                                        <p className="pl-4">{item}</p>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        </div>





                                                    </div>
                                                    <div className={"col-sm-4"}>
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" />



                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div id="Gallery">
                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>School Gallery</h4>
                                    </div>
                                    <div className="row mb-4 w-100">
                                        <div className="col-12">
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" />
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" />
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" />
                                                        <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>See what Students are saying about us</h4>
                                    </div>
                                    {feedback && feedback !== undefined && feedback.length > 0 ? (

                                        <div className="row">
                                            {feedback.map((item, index) => (
                                                <div key={'item' + index} className="col-sm-3">

                                                    <div className='testimonials-card'>
                                                        <p>{item.description__c}</p>
                                                        <div className="client-details">
                                                            <figure>
                                                                <img src={`../images/client-img.png`} />
                                                            </figure>
                                                            <figcaption>
                                                                <h5>{item.name}</h5>
                                                                <p>{item.dipartment__c}</p>
                                                            </figcaption>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    ) : ''
                                    }

                                </div>

                            </div>


                            <div className="row mb-4">
                                <div className="col-12">
                                    <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                        <h4 className="mb-lg-5 mb-4 ">Why Learn with Stride</h4>
                                        <div className="row">

                                            {/* {product.highlights_of_the_course__c.map((item,i) => (
                                                    <div className="col-sm-6 b-right">
                                                    <div className="d-flex align-items-start w_l_s_box mb-5">
                                                        <div className="icon-box mr-4">
                                                            <img src={item.image} alt="ezgif2"
                                                                 className="img-fluid"/>
                                                        </div>
                                                        <div>
                                                            <h6>{item.title}</h6>
                                                            <p>{ item.description}</p>
                                                        </div>
                                                    </div>
                                                    </div>
                                                ))
                                                    
                                                } */}

                                            <div className="col-sm-6 b-right">
                                                <div className="d-flex align-items-start w_l_s_box mb-5">
                                                    <div className="icon-box mr-4">
                                                        <img src={`${asset}images/au01.png`} alt="ezgif2"
                                                            className="img-fluid" />
                                                    </div>
                                                    <div>
                                                        <h6>Global Students Community</h6>
                                                        <p>Prepare for leadership roles after working as an
                                                            individual contributor or lorem ipsum lorem ipsem
                                                            functional specialist</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start w_l_s_box">
                                                    <div className="icon-box mr-4">
                                                        <img src={`${asset}images/au02.png`} alt="ezgif2"
                                                            className="img-fluid" />
                                                    </div>
                                                    <div>
                                                        <h6>Top Notch Courses</h6>
                                                        <p>Prepare for leadership roles after working as an
                                                            individual contributor or lorem ipsum lorem ipsem
                                                            functional specialist</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-start w_l_s_box mb-5 px-lg-4">
                                                    <div className="icon-box mr-4">
                                                        <img src={`${asset}images/au04.png`} alt="ezgif2"
                                                            className="img-fluid" />
                                                    </div>
                                                    <div>
                                                        <h6>Global Students Community</h6>
                                                        <p>Prepare for leadership roles after working as an
                                                            individual contributor or lorem ipsum lorem ipsem
                                                            functional specialist</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-start w_l_s_box px-lg-4">
                                                    <div className="icon-box mr-4">
                                                        <img src={`${asset}images/au03.png`} alt="ezgif2"
                                                            className="img-fluid" />
                                                    </div>
                                                    <div>
                                                        <h6>Top Notch Courses</h6>
                                                        <p>Prepare for leadership roles after working as an
                                                            individual contributor or lorem ipsum lorem ipsem
                                                            functional specialist</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="card_best_deal d-flex align-items-center">
                                        <div className="pl-lg-5 col-md-4 order-two">
                                            <h4 className="mb-3">Start your learning experience with STRIDE CARD for
                                                best deals!</h4>
                                            <button className="apply-btn small">Get Stride Card</button>
                                        </div>
                                        <div className="pl-lg-5 col-md-4">
                                            <div className="figure3">
                                                <img src={`../images/decbitcards-item.png`} className="img-fluid" />
                                            </div>


                                        </div>
                                        <div className="pl-lg-5 col-md-4">
                                            <div className="right-content">
                                                <div className="figure2"><img src={`${asset}images/figure.png`}
                                                    className="img-fluid" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="FAQ" className="my-4">
                                <div className="row mx-0">
                                    <div className='col-12'>
                                        <h4 className="mb-4">Frequently asked questions</h4>
                                    </div>
                                </div>
                                <div className="accordion px-2">
                                    <div className="faq">
                                        {faqs && faqs !== undefined && faqs.length > 0 ? (
                                            faqs.map((item, index) => (
                                                <>
                                                    <div key={'item' + index}>
                                                        <div className="question">
                                                            <h4>{item.question__c}</h4>
                                                        </div>
                                                        <div className="answer">
                                                            <p>{item.answer__c}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        ) : ''
                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className={"pt-3 pb-3"}>
                    <OfferAvailable />

                </div>
                {this.state.morePlansOpen ? <PaymentPlan data={this.state.morePlansOpen} isOpen={this.state.morePlansOpen} product_sfid={product} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : ""}
                <RecentView
                    recentProd={recentProd}
                    sfid={sfid}
                    user={user}
                    pushPage={this.props.pushPage}
                />
                <RelatedCourse sfid={sfid}
                    user={user}
                    similarProd={similarProd} />
                {this.state.relatedBlogData && <NewsArticle blogList={this.state.relatedBlogData} />}
                {/*<PaymentPlans/>*/}







                <div className="modal fade bd-example-modal-xl" id="education_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog modal-xl" >
                        <div className="modal-content  ">

                            <div className="modal-header">


                                <button type="button" className="close"
                                    data-dismiss="modal"
                                    id={'modal-close3'}
                                    aria-label="Close"
                                >
                                </button>

                            </div>

                            <div className="modal-body">


                                <div className="row">



                                    <div className="col-5">
                                        <img src={product.image_url__c} alt="upgard" className="img-fluid w-100 h-100" />

                                    </div>

                                    <div className="col-7">


                                        <div className=" flex-w flex-col-m justify-content-center">
                                            <div className="form_width_2 ext8 mb-1 mt-1">
                                                <div className="form_details">

                                                    <form className="otpform otpform-others fullwidth" onDragEnter={this.handleFileDrag}>
                                                        <div className="d-flex flex-col-m mn_height_4">
                                                            <div className="row justify-content-center">
                                                                <div className="max-width-700">
                                                                    <div className="row">
                                                                        <div className="col-sm-12 text-center px-5 pt-3">
                                                                            <div className=" d-block cropped_img container">

                                                                                <h5 className="p-3 mb-0" style={{ textAlign: "left" }}>Add Child Details</h5>

                                                                                <div className='row' >
                                                                                    <div className='col-6'>
                                                                                        <input placeholder="Child Name" value={this.state.childName} onChange={e => {
                                                                                            e.preventDefault()
                                                                                            this.setState({ childName: e.target.value })
                                                                                        }} />
                                                                                    </div>

                                                                                    <div className='col-6'>
                                                                                        {/* <input placeholder="Class Section" value={this.state.childSection} onChange={e => {
                                                                                            e.preventDefault()
                                                                                            this.setState({ childSection: e.target.value })
                                                                                        }} /> */}

                                                                                        <select class="form-select" id="class_selection" aria-label="Default select example"
                                                                                            onChange={e => {
                                                                                                e.preventDefault();
                                                                                                this.setState({ childSection: e.target.value })
                                                                                            }}
                                                                                            style={{ fontWeight: "500", border: "none" }}
                                                                                        >
                                                                                            <option value="">Class Section</option>
                                                                                            {product.select_class && product.select_class.map((item) => (
                                                                                                <option value={item}>{item}</option>
                                                                                            ))}
                                                                                        </select>

                                                                                    </div>
                                                                                </div>


                                                                                <p className='text-left mt-2 mb-0'>Gender</p>
                                                                                <div className='b_c_a_tabs ' >

                                                                                    <div class="row">
                                                                                        <div class="col-lg-4">
                                                                                            <button type="button" class={this.state.gender == "Male" ? "active" : ""} data-target="cc" onClick={e => {
                                                                                                e.preventDefault()
                                                                                                this.setState({ gender: "Male" })
                                                                                            }}>Boy</button>
                                                                                        </div>
                                                                                        <div class="col-lg-4">
                                                                                            <button type="button" class={this.state.gender == "Female" ? "active" : ""} data-target="cc" onClick={e => {
                                                                                                e.preventDefault()
                                                                                                this.setState({ gender: "Female" })
                                                                                            }}>Girl</button>
                                                                                        </div>
                                                                                        <div class="col-lg-4">
                                                                                            <button type="button" class={this.state.gender == "Others" ? "active" : ""} data-target="cc" onClick={e => {
                                                                                                e.preventDefault()
                                                                                                this.setState({ gender: "Others" })
                                                                                            }}>Others</button>
                                                                                        </div>

                                                                                    </div>

                                                                                </div>

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
                                                                                                <div className='row justify-content-center'>
                                                                                                    <button type="button" onClick={this.handleFileCropSave} className="btn btn-default btn_c_1">Ok</button>
                                                                                                    <button type="button" onClick={this.handleCancelCrop} className="btn btn-default btn_c_1">Cancel</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <>
                                                                                                <div className="d-flex flex-col-m mn_height_4 cropped_img">
                                                                                                    <img src={this.state.fileSrc} />
                                                                                                    <div className="btn_retry_crop">
                                                                                                        <button type="button" onClick={this.handleFileRetry} className="btn btn-default btn_c_1"><img src={asset + "images/Vector-8.png"} />Retry</button>
                                                                                                        <button type="button" onClick={this.handleFileCrop} className="btn btn-default btn_c_1"><img src={asset + "images/Vector9.png"} />Crop</button>
                                                                                                    </div>

                                                                                                    <button type="button" onClick={() => this.handleFileDelete(this.state.profileId)} className="btn_delete"><img src={asset + "images/Vector-delete.svg"} /></button>


                                                                                                    {/* {this.state.validPic === true && this.state.successMsg != '' && (
                                                                <>
                                                                <div className="image_box alert text-center green-success fade show" role="alert">
                                                                    Uploaded Successfully!!
                                                                    <img type="button" onClick={this.handleErrorClose} className="close" data-dismiss="alert" aria-label="Close" src={asset + "images/icons/icon_right.svg"} />
                                                                </div></>
                                                            )} */}
                                                                                                </div>

                                                                                            </>
                                                                                        )
                                                                                    ) :


                                                                                        (
                                                                                            this.props.isOpenCamera ? (
                                                                                                <WebCam
                                                                                                    closeCamera={this.props.closeCamera}
                                                                                                    capturePicture={this.capturePicture}
                                                                                                />
                                                                                            )
                                                                                                :
                                                                                                (
                                                                                                    <div className="col-md-12">
                                                                                                        <div className="form_spacing d-flex flex-col-m mn_height_3">
                                                                                                            <div className="upload_box boxstyle_2 d-block text-center uploadboxht">
                                                                                                                <div style={{ display: '-webkit-inline-box', marginLeft: '-100px', gap: '30px' }}>
                                                                                                                    <p><span className="">Max file size 5 MB</span></p>
                                                                                                                    <p><span className="">File should be JPG,JPEG,PNG</span></p>
                                                                                                                    <p><span className="">Image should be clear</span></p>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    className={`col-sm drop-container singleimg`}
                                                                                                                    onDragOver={this.dragOver}
                                                                                                                    onDragEnter={this.dragEnter}
                                                                                                                    onDragLeave={this.dragLeave}
                                                                                                                    onDrop={this.fileDrop}
                                                                                                                >
                                                                                                                    <h2><img src="../images/idcardicon.png" className='mr-2' style={{ width: "25px" }} />Upload ID Card</h2>
                                                                                                                    <h3>Drag and drop your file here</h3>
                                                                                                                    {this.state.isDragg && (<h5 style={{ color: '#a5a5a5' }}>Upload file upto 5MB by dropping in this window</h5>)}
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

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                        )}
                                                                                    {/* {isValidProfile ? (
                                                <div className='row justify-content-center'>
                                                    <button
                                                        type="button"
                                                        style={{ marginTop: '5px' }}
                                                        disabled={this.state.liveness && this.state.fileSrc ? false : true}
                                                        className={`${this.state.liveness && this.state.fileSrc ? 'bg_dark' : ''} cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300`}
                                                        >Submit</button>
                                                </div>
                                            ) : ''} */}
                                                                                </form>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form_spacing text-center pt-4">

                                                                <button
                                                                    type="button"
                                                                    onClick={() => this.handleBuy(product && product.sfid ? product.sfid : '')}
                                                                    // onClick={this.handleSubmit}
                                                                    className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                                                                    style={(this.state.gender && this.state.fileSrc && this.state.childName && this.state.childSection) ? styles : {}}
                                                                    disabled={(this.state.gender && this.state.fileSrc && this.state.childName && this.state.childSection) ? false : true}
                                                                >Continue</button>

                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>







                                    </div>


                                </div>





                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        // getAccountProfile: (getData) =>{
        //     return dispatch(getAccountProfile(getData));
        // },
        // updateProfile: (getData) =>{
        //     return dispatch(updateProfile(getData));
        // },
        closeCamera: () => {
            dispatch(closeCamera());
        },
        // getProfileDocument: (getData) =>{
        //     return dispatch(getProfileDocument(getData));
        // },
        openCamera: () => {
            dispatch(openCamera());
        },
        convertToBase64: (getData) => {
            return dispatch(convertToBase64(getData));
        },
        // removeProfile: (getData) =>{
        //     dispatch(removeProfile(getData))
        // },
        closeCamera: () => {
            dispatch(closeCamera());
        },
        checkLiveness: (getData) => {
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

PdpSchool.propTypes = {
    ...propTypes,
    user: PropTypes.any,
    sfid: PropTypes.any,
    similarProd: PropTypes.any,
    pushPage: PropTypes.func,
    handleProBuy: PropTypes.func,
    product: PropTypes.any,
    faqs: PropTypes.any,
    learn: PropTypes.any,
    instructor: PropTypes.any,
    feedback: PropTypes.any
}

const decoratedComponent = connect(mapStateToProps, mapDispatchToProps)(PdpSchool)

export default reduxForm({ form: 'PDP-Educa' })(decoratedComponent);