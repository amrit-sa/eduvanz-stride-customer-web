import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import Helmet from "react-helmet";
import { asset } from "../common/assets";
import NewsArticle from '../common/news-article'
import RelatedCourse from '../common/related-course'
import {
    favProduct,
    getFaqsById,
    getLearnById,
    getInstructorById,
    getFeedbackById,
    getSimilarProduct
} from "../actions/user";
import { getBlogs, getCompareProducts, getFavoriteProductCount, getTestimonial } from "../actions/product";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import SimilarProduct from "../common/similar-product";
import RecentView from "../common/recent-view";
import MoreSellers from "./model/more-sellers";
import PaymentPlan from "./model/payment-plans";
import SocialShare from './SocialShare';
// import cardimg from '../images/decbitcards-item.png';
// import cardimg from '../images/decbitcards-item.png';



class PdpEducation extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            isFav: props.product.isFavorite,
            morePlansOpen: false,
            alumniData: [],
            placementData: [],
            relatedBlogData: [],
            expertData: []
        }
    }

    scrollToTargetAdjusted = (target_id) => {
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

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        const { product, subcat_id } = this.props
        let faqdata = {
            id: product.sfid,
        }
        this.props.dispatch(getTestimonial({ "sfid": product.sfid, "is_alumni": true })).then((response) => {
            if (response && response.data) {
                console.log('alumni', response.data)
                this.setState({ alumniData: response.data });
            }
        });
        this.props.dispatch(getTestimonial({ "sfid": product.sfid, "is_placed": true })).then((response) => {
            if (response && response.data) {
                console.log('placement', response.data)
                this.setState({ placementData: response.data });
            }
        });
        this.props.dispatch(getTestimonial({ "sfid": product.sfid, "is_expert": true })).then((response) => {
            if (response && response.data) {
                console.log('expert', response.data)
                this.setState({ expertData: response.data });
            }
        });
        this.props.dispatch(getBlogs(product.sfid)).then((response) => {
            if (response) {
                console.log('blog', response)
                this.setState({ relatedBlogData: response });
            }
        });


        const { sfid } = this.props
        let data = {
            sub_category_id: subcat_id.category_id,
            user_sfid: sfid
        }
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

            }
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        window.location = '/edplans?product='+this.props.product.sfid;
    }

    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    render() {
        const { user } = this.props;
        const { faqs, feedback, instructor, product, similarProd, sfid, recentProd } = this.props
        console.log(this.props.product, "product")
        Object.keys(product).forEach((key) => {
            if (product[key] == null) {
                product[key] = ''
            }
        })
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Education </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {/* banner */}
                <div className="education-tab-header">
                    <div className="sub-header d-none d-lg-block">
                        <div class="site-header-wrap container">
                            <div className="sub-left-menu ">
                                <ul className="sub-main-menu">
                                    <li className="menu-link active-menu">
                                        <button className="text-white btn-color-hover" id={"AboutTheCourse-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("AboutTheCourse")
                                        }}>About the course
                                        </button>
                                    </li>
                                    <li className="menu-link">
                                        <button className="text-white btn-color-hover" id={"whatYoullLearn-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("whatYoullLearn")
                                        }}>What you’ll learn
                                        </button>
                                    </li>
                                    <li className="menu-link">
                                        <button className="text-white btn-color-hover" id={"instructors-top"} onClick={() => {
                                            this.scrollToTargetAdjusted("instructors")
                                        }}>Instructors
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
                                        <button class="apply-btn ml-3" >Apply Now</button>
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
                                <div className="col-lg-6">
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
                                            <a href={product.brochure_url} target="_blank" download className="db_btn">Download Brochure</a>
                                        </div>
                                        <div className="mr-4">
                                            <SocialShare />
                                        </div>

                                        <div className="mr-4 line_var"></div>
                                        <div className="d-flex align-items-center mt-lg-0 mt-3">
                                            <button className="play_btn">
                                                <a href={product.video_url__c} target={"_blank"}><i className="fa fa-play" aria-hidden="true"></i></a>
                                            </button>
                                            <div className="ml-3">
                                                <a href={product.video_url__c} target={"_blank"} className={"text-black"}>Watch</a>
                                                <a href={product.video_url__c} target={"_blank"} className="d-block text-black font-weight-bold">Intro Video</a>
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
                        <div className="col">
                            <div className="">
                                <ul className="d-flex cf_box_wrap">
                                    <li>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset + "images/c01.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">Duration <span>{product.course_duration__c}</span></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset + "images/c02.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">Course Type <span>{product.learning_format__c}</span></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset + "images/c03.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">NASSCOM Certificate <span>{product.nasscom_certificate}</span></div>
                                        </div>
                                    </li>
                                    <li className='border-0'>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset + "images/icons/zero-emi.png"} alt="" width={50} className="img-fluid" />
                                            </div>
                                            <div className="duration">No Cost EMI Starting
                                                <div className="d-flex">
                                                    <span>₹ {product.minimum_payment__c}/month</span>
                                                    <button className="link" style={{ marginLeft: "10px" }} onClick={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }}>View Plans</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='apply-flex wishlist' style={{ gap: "2rem" }}>
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
                                                className={`fs-5 d-flex justify-content-center align-items-center ${product && (this.state.isFav) ? "active fa fa-heart" : "fa fa-heart-o"}`}></i>
                                        </button>


                                        <button className="apply-btn" onClick={this.handleSubmit}>Apply Now</button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="row mb-4">
                        {product.features && product.features.map((item, i) => (
                            <div className="col" >
                                <div className="d-flex align-items-center edu_ins">
                                    <div className="icon_box mr-3"><img src={asset + `images/b0${i + 1}.png`} alt=""
                                        className="img-fluid" /></div>
                                    <p className="mb-0">{item}</p>
                                </div>
                            </div>

                        ))
                        }


                        {/* <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b01.png"} alt=""
                                                                            className="img-fluid"/></div>
                                        <p className="mb-0">Fresh Graduates</p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b02.png"} alt=""
                                                                            className="img-fluid"/></div>
                                        <p className="mb-0">Aspiring Entrepreneur</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b03.png"} alt=""
                                                                            className="img-fluid"/></div>
                                        <p className="mb-0">Experienced Career Professionals</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b04.png"} alt=""
                                                                            className="img-fluid"/></div>
                                        <p className="mb-0">Jobs in 100+ Top Companies</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset + "images/b05.png"} alt=""
                                                                            className="img-fluid"/></div>
                                        <p className="mb-0">Dedicated Support</p>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                    </div>
                    <div className="row my-4">
                        <div className="col-12">
                            <ul className="nav nav-tabs activebrd" id="searchTab">
                                <li className="nav-item">
                                    <button className="nav-link active" onClick={() => {
                                        this.scrollToTargetAdjusted("AboutTheCourse")
                                    }}>About the course
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => {
                                        this.scrollToTargetAdjusted("whatYoullLearn")
                                    }}>What you’ll learn
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => {
                                        this.scrollToTargetAdjusted("instructors")
                                    }}>Instructors
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={() => {
                                        this.scrollToTargetAdjusted("FAQ")
                                    }}>FAQ
                                    </button>
                                </li>
                            </ul>
                            {/*  */}
                            {/*<div className="tab-content" id="searchTabContent">*/}
                            {/*<div className="tab-pane fade show active" id="AboutTheCourse" role="tabpanel" aria-labelledby="home-tab">*/}
                            {/*</div>*/}
                            {/*<div className="tab-pane fade" id="whatYoullLearn" role="tabpanel" aria-labelledby="whatYoullLearn-tab">*/}

                            {/*</div>*/}
                            {/*<div className="tab-pane fade" id="instructors" role="tabpanel" aria-labelledby="instructors-tab">*/}


                            {/*</div>*/}
                            {/*<div className="tab-pane fade" id="FAQ" role="tabpanel" aria-labelledby="FAQ-tab">*/}


                            {/*</div>*/}
                            {/*</div>*/}

                            
                            <div id="AboutTheCourse">
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="p-4  about_course">
                                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                                <h4 className="mb-4">About the course</h4>
                                                <button className="link">Read more</button>
                                            </div>
                                            {
                                                product.course_outline__c && product.course_outline__c.map(item => (
                                                    <>
                                                        <h5 className="mb-3" key={item.key}>{item.key}</h5>
                                                        <ul className='list-style-circle'>
                                                            {
                                                                item.data.map(data => (
                                                                    <li key={data}>{data}
                                                                    </li>
                                                                ))
                                                            }

                                                        </ul>
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="whatYoullLearn">
                                {(product.syllabus__c || product.video_url__c) &&
                                    <div className="my-4 ">
                                        <div className="row mx-0">
                                            <div className='col-12'>
                                                <h4 className="mb-4">What you’ll learn</h4>
                                            </div>
                                        </div>
                                        <div className="row mx-0">
                                            {product.syllabus__c &&
                                                <div className="col-sm-6">

                                                    <p>{
                                                        product.syllabus__c.description && product.syllabus__c.description
                                                    }</p>

                                                    <div className="d-flex justify-content-between mb-4">
                                                        {
                                                            <div>{product.syllabus__c.section} • {product.syllabus__c.lectures_count} • {product.syllabus__c["length"]}</div>
                                                        }
                                                        <div>
                                                            <button className="link">View All</button>
                                                        </div>
                                                    </div>

                                                    <ul className="course-list mb-0">


                                                        {
                                                            product.syllabus__c.lectures_data && product.syllabus__c.lectures_data.map((item, index) => (
                                                                <li key={item.lecture_title} className="d-flex flex-wrap align-items-center">
                                                                    <div className="mr-3 img-box">
                                                                        <img src={`${asset}images/wu0${index + 1}.png`} alt=""
                                                                            className="img-fluid" />
                                                                    </div>
                                                                    <div>
                                                                        <h6>{item.lecture_title}</h6>
                                                                        <p className="mb-0">{item.description}</p>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }

                                                        {/*<li className="d-flex flex-wrap align-items-center">*/}
                                                        {/*    <div className="mr-3 img-box">*/}
                                                        {/*        <img src={`${asset}images/wu03.png`} alt=""*/}
                                                        {/*             className="img-fluid"/>*/}
                                                        {/*    </div>*/}
                                                        {/*    <div>*/}
                                                        {/*        <h6>Case Study: New Neighbours</h6>*/}
                                                        {/*        <p className="mb-0">7 lectures • 30m</p>*/}
                                                        {/*    </div>*/}
                                                        {/*</li>*/}

                                                    </ul>
                                                </div>
                                            }
                                            {product.video_url__c &&
                                                <div className="col-sm-6 p-3">

                                                    <div className="video-frame">
                                                        <iframe width="560" height="315"
                                                            src={product.video_url__c}
                                                            title="YouTube video player" frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen></iframe>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                }

                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                            <h4 className="mb-lg-5 mb-4 ">Why Learn with Stride </h4>
                                            <div className="row">



                                                {product.highlights_of_the_course__c && product.highlights_of_the_course__c.map((item, i) => (
                                                    <div className="col-sm-6 b-right">
                                                        <div className="d-flex align-items-start w_l_s_box mb-5">
                                                            <div className="icon-box mr-4">
                                                                {/* <img src={`${asset}images/icons/social-media2.png`} alt="ezgif2" className="img-fluid" />
                                                             */}

                                                                <img src={item.image} alt="ezgif2"
                                                                    className="img-fluid" />
                                                            </div>
                                                            <div>
                                                                <h6>{item.title}</h6>
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))

                                                }

                                                {/* <div className="col-sm-6 b-right">
                                                    <div className="d-flex align-items-start w_l_s_box mb-5">
                                                        <div className="icon-box mr-4">
                                                            <img src={`${asset}images/au01.png`} alt="ezgif2"
                                                                 className="img-fluid"/>
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
                                                                 className="img-fluid"/>
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
                                                                 className="img-fluid"/>
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
                                                                 className="img-fluid"/>
                                                        </div>
                                                        <div>
                                                            <h6>Top Notch Courses</h6>
                                                            <p>Prepare for leadership roles after working as an
                                                                individual contributor or lorem ipsum lorem ipsem
                                                                functional specialist</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                 */}
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
                                <div className="row">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>Learn from Industry Experts</h4>
                                    </div>
                                    {
                                        this.state.expertData && this.state.expertData !== undefined && this.state.expertData.length > 0 ? (
                                            <>                                    {this.state.expertData.map((item, index) => (
                                                <div key={'item' + index} className="col-sm-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                            <img src={`${item.image}`} />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>{item.name}</h5>

                                                            <p className="m-0">{item.title}</p>

                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                            </>
                                        ) : ''
                                    }
                                </div>
                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>Alumni</h4>
                                    </div>
                                    {
                                        this.state.alumniData.map(item => (
                                            <div className="col-md-3" key={item.uid}>
                                                <div className='learn-more-card'>
                                                    <figure>
                                                        <img src={item.image} alt="" />
                                                    </figure>
                                                    <div className="card-inner-text">
                                                        <h5>{item.name}</h5>
                                                        <p>{item.title}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                                <div className="row section-marign-top">
                                    <div className="col-md-12 section-heading-margin">
                                        <h4 className='learn-more'>Featured Placements</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <div className='row'>
                                            {
                                                this.state.placementData.map(item => (
                                                    <div key={item.uid} className='col-6 col-md-4'>
                                                        <div className='partner-card-img chopped'>
                                                            <a href=""><img className={"img-fluid"}
                                                                src={item.placed_logo} alt="" /></a>
                                                        </div>
                                                    </div>
                                                ))
                                            }


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className='placement-card'>
                                            <figure>
                                                <img className={"img-fluid"} src={`../images/placement-cell.png`}
                                                    alt="" />
                                            </figure>
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
                            <div id="instructors">
                                {instructor && instructor !== undefined && instructor.length > 0 ? (
                                    <>
                                        <div className="row mt-4 mb-3 mx-0">
                                            <div className="col-12">
                                                <h4>Leading Instructors</h4>
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            {instructor.map((item, index) => (
                                                <div key={'item' + index} className="col-sm-3">
                                                    <div className="li_box">
                                                        <div className="img-box">
                                                            <img src={`${item.image_url__c}`}
                                                                className="img-fluid" />
                                                        </div>
                                                        <div className="mt-3 text-center">
                                                            <h5>{item.name}</h5>
                                                            <p className="m-0">{item.dipartment__c}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </>
                                ) : ''
                                }


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
                {this.state.morePlansOpen ? <PaymentPlan data={this.state.morePlansOpen} product_sfid={product} isOpen={this.state.morePlansOpen} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : ""}
                <RelatedCourse sfid={sfid}
                    user={user}
                    similarProd={similarProd} />
                {/* <RecentView
                    recentProd={recentProd}
                    sfid={sfid}
                    user={user}
                    pushPage={this.props.pushPage}
                /> */}
                {this.state.relatedBlogData && <NewsArticle blogList={this.state.relatedBlogData} />}
                {/*<PaymentPlans/>*/}
            </>
        )
    }
}

PdpEducation.propTypes = {
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

export default reduxForm({ form: 'PDP-Educa' })(PdpEducation);