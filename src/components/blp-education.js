import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import { asset } from '../common/assets';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, getRelatedCategory, getViewedProduct, getEductionBrandLanding } from "../actions/user";
import RecentView from "../common/recent-view"
import Upskilling from "../common/upskilling";
import ProfessionsinDemand from "../common/Professions In-Demand";
import MBA from "../common/MBA";
import AIML from "../common/AI-ML";
import Fullstack from "../common/FullStack";
import UIDesign from "../common/UIDesign";
import Marketing from "../common/Marketing";
import Ethicalhacking from "../common/Ethical-Hacking";
import Brand_listing_bar from "../common/Brand_listing_bar";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

class BlpEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            accountDet: null,
            educationbrand: [],
        };
    }

    async componentDidMount() {

        let data = { "category_id": "2" }
        await this.props.dispatch(getRelatedCategory(data));
        this.props.dispatch(getViewedProduct({ user_id: this.props.sfid }));

        let qr = new URLSearchParams(window.location.search);
        let br_name = qr.get("name");

        let branddata = { "brand": br_name }


        this.props.dispatch(getEductionBrandLanding(branddata)).then(
            (response) => {

                if ((response.responseCode && response.responseCode === 200) || (response.status && response.status === 'success')) {

                    this.setState({ mba_date: response.data }, () => {
                        this.setState({ upskills_data: response.data.branddata }, () => console.log(this.state.upskills_data, "hhhhhhhhhhhhhhhhhhhhh"))
                    }
                    );
                }
            })




    }

    pushPage = (url) => {
        this.props.pushPage(url);
    }
    getProductByCategoryData = (category) => {
        window.scrollTo(0, 0)
        const { sfid } = this.props
        let data = {
            sub_category_id: category,
            user_sfid: sfid
        }
        return this.props.dispatch(getProductByCategory(data)).then((response) => { return response });
    }



    render() {
        const { user, sfid, sub_categories, recentProd } = this.props;
        // console.log(this.props, sfid, "sub_category")
        return (
            <>
                <Helmet>
                    <title>Education</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <div className="clp">
                    <div className="container">
                        <div className='row pt-4'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li>Education</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <img src={asset + "images/education_landing-8.png"} className='object-cover' />
                            </div>
                        </div>
                        <div className='row electronicsBox mt-4'>
                            <div className=' d-flex brand_image edu_student '>
                                <div className="col-sm-6 block p-0">

                                    <div className="col-lg-8 studentBG">
                                        <img src={asset + "images/education_landing-2.png"} alt="" className="card-imgbrand" />
                                    </div>
                                    <div className="col-lg-4">
                                        <h6 className="text-position">Higher Education
                                        <a href="#" class="viewAll">View More </a>
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-sm-6 block p-0">
                                    <div className="col-lg-8 studentBG2">
                                        <img src={asset + "images/education_landing-1.png"} alt="" className="card-imgbrand" />
                                    </div>
                                    <div className="col-lg-4">
                                        <h6 className="text-position">Upskilling Courses
                                            <a href="#" class="viewAll">View More </a>
                                        </h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel">
                            <h3 className="section_title mb-lg-4 mb-3">Products curated just for You</h3>
                        </div>

                        <div class="container">
                            <div class="row">
                                <div class="col align-self-start ">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            <div className=" product-card">
                                                <div className="product-tabeducation" >
                                                    Working professional
                                                </div>
                                                <h6 style={{ marginTop: '12px', marginLeft: '30px' }}>
                                                    No Cost EMI
                                                </h6>
                                                <h6 style={{ marginLeft: '30px', marginTop: '-6px' }}>
                                                    Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/education_landing-6.png"} className="product-tabimg" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="product-card">
                                        <img src={asset + "images/education_landing-7.png"} className="product-tabright" />
                                        <div className="product-tabblue">
                                            Doctorate
                                        </div>
                                        <h6><span className="text-size">
                                            No Cost EMI
                                        </span>
                                            <br />
                                            <span className="text-start">
                                                Starting ₹2,200
                                            </span> </h6>
                                    </div>

                                </div>
                                <div class="col align-self-center product-curated">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            <div className=" product-card">
                                                <div className="product-tabcenter">
                                                    Master’s
                                                </div>
                                                <h6><span className="text-sizecenter">
                                                    No Cost EMI Starting ₹2,200
                                                </span>
                                                    <br />
                                                </h6>
                                                <img src={asset + "images/education_landing-3.png"} className="product-imgcenter" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col align-self-end">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            <div className=" product-card">
                                                <img src={asset + "images/education_landing-11.png"} className="product-tabright" />
                                                <div className="product-tabpink" >
                                                    Afordable courses
                                                </div>
                                                <h6><span className="text-size">
                                                    No Cost EMI
                                                </span>
                                                    <br />
                                                    <span className="text-start">
                                                        Starting ₹2,200
                                                    </span> </h6></div>
                                            <div className="product-card">
                                                <div className="product-blue" style={{ marginTop: '20px', marginLeft: '12px' }}>
                                                    Study Abroad
                                                </div>
                                                <h6 style={{ marginTop: '12px', marginLeft: '30px' }}>
                                                    No Cost EMI
                                                </h6>
                                                <h6 style={{ marginLeft: '30px', marginTop: '-6px' }}>
                                                    Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/education_landing-4.png"} className="product-tabimg" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <Upskilling
                                    pushPage={this.pushPage}
                                    getProductByCategoryData={this.getProductByCategoryData}
                                    dispatch={this.props.dispatch}
                                    user={user}
                                    sfid={sfid}
                                />
                            </div>
                        </div>
                        <div className='container'>
                            <div className='row mb-4'>
                                <div className='col-12'>
                                    <img src={asset + "images/education_landing-8.png"} alt="" className="img-fluid" />
                                </div>
                            </div>

                        </div>
                        <ProfessionsinDemand />
                        {/* <MBA
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        /> */}
                        <Brand_listing_bar
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                            name={"MBA"}
                        />

                        <Brand_listing_bar
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                            name={"AI/ML"}
                        />

                        <Brand_listing_bar
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                            name={"Full Stack Development"}
                        />

                        <Brand_listing_bar
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                            name={"UI Design"}
                        />

                        <Brand_listing_bar
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                            name={"Marketing"}
                        />

                        <Brand_listing_bar
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                            name={"Ethical Hacking"}
                        />

                        {/* <AIML
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />
                        <Fullstack
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />
                        <UIDesign
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />
                        <Marketing
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />
                        <Ethicalhacking
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        /> */}
                    </div>
                </div>







                <div className="py-5"></div>


                <RecentView
                    recentProd={recentProd}
                    sfid={sfid}
                    user={user}
                    pushPage={this.props.pushPage}
                />
            </>
        );
    }
}

BlpEducation.propTypes = {
    ...propTypes,
    history: PropTypes.any,
    user: PropTypes.any,
    sfid: PropTypes.any,
    isSearching: PropTypes.bool,
    searchDet: PropTypes.bool,
    recentProd: PropTypes.any,
    pushPage: PropTypes.func,
    sub_categories: PropTypes.any,
}

export default reduxForm({ form: 'BLP-Education' })(BlpEducation);

