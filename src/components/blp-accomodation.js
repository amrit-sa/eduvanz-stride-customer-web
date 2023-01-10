import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import { asset } from '../common/assets';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, getRelatedCategory, getViewedProduct, } from "../actions/user";
import RecentView from "../common/recent-view"
import OurPresence from "../common/Our-presence";
import PropertiesLonavla from "../common/Properties-Lonavla";
import PropertiesAlibag from "../common/Properties-Alibag";
import PropertiesCalagute from "../common/Properties-Calangute";
import StrideCard from "../common/stride-card";
import StaySafe from "../common/stay-safe";
import MobileStoreButton from 'react-mobile-store-button';

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

class BlpAccomodation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            accountDet: null,
            iOSUrl: 'https://itunes.apple.com/us/app/all-of-the-lights/id959389722?mt=8',
        };
    }

    async componentDidMount() {
        let data = { "category_id": "3" }
        await this.props.dispatch(getRelatedCategory(data));
        this.props.dispatch(getViewedProduct({ user_id: this.props.sfid }));
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
        console.log(this.props, sfid, "sub_category")
        return (
            <>
                <Helmet>
                    <title>Electronics</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <div className="clp">
                    <div className="container">
                        <div className='row pt-4'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li>Accomodation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <img src={asset + "images/education_landing-8.png"} className='object-cover' />
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className='col-lg-6 '>
                                <div className='brand_image  '>
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <img src={asset + "images/education_landing-2.png"} alt="" className="card-imgbrand" />
                                        </div>
                                        <div className="col-lg-6">
                                            <h6 className="text-position">Hostels</h6>
                                        </div>
                                    </div>



                                </div>

                            </div>
                            <div className='col-lg-6 '>
                                <div className='brand_image '>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <img src={asset + "images/education_landing-1.png"} alt="" className="card-imgbrand" />
                                        </div>
                                        <div className="col-lg-6">
                                            <h6 className="text-position">PGs</h6>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
                        <div className="row">
                            <div className="col-lg-12">
                                <img src={asset + "images/education_landing-8.png"} className='object-cover' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className=' d-flex brand_image  '>
                                <div className="row">

                                    <div className="col-lg-6">
                                        <img src={asset + "images/education_landing-2.png"} alt="" className="card-imgbrand" />
                                    </div>
                                    <div className="col-lg-6">
                                        <h6 className="text-position">Hostels</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <img src={asset + "images/education_landing-1.png"} alt="" className="card-imgbrand" />
                                    </div>
                                    <div className="col-lg-6">
                                        <h6 className="text-position">PGs</h6>
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
                                                <div className="product-tab">
                                                    Budget Friendly
                                                </div>
                                                <h6 style={{ marginTop: '12px', marginLeft: '30px' }}>
                                                    No Cost EMI
                                                </h6>
                                                <h6 style={{ marginLeft: '30px', marginTop: '-6px' }}>
                                                    Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/accomodation_landing-10.png"} className="product-tabimg" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="product-card">
                                        <img src={asset + "images/accomodation_landing-1.png"} className="product-tabright" />
                                        <div className="product-tabblue">
                                            reading Room
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
                                                    laundry Services
                                                </div>
                                                <h6><span className="text-sizecenter">
                                                    No Cost EMI Starting ₹2,200
                                                </span>
                                                    <br />
                                                </h6>
                                                <img src={asset + "images/accomodation_landing-9.png"} className="product-imgcenter" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col align-self-end">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            <div className=" product-card">
                                                <img src={asset + "images/accomodation_landing-5.png"} className="product-tabright" />
                                                <div className="product-tabpink">
                                                    Covid Measures
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
                                                    Community
                                                </div>
                                                <h6 style={{ marginTop: '12px', marginLeft: '30px' }}>
                                                    No Cost EMI
                                                </h6>
                                                <h6 style={{ marginLeft: '30px', marginTop: '-6px' }}>
                                                    Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/accomodation_landing-2.png"} className="product-tabimg" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <OurPresence
                                    pushPage={this.pushPage}
                                    getProductByCategoryData={this.getProductByCategoryData}
                                    dispatch={this.props.dispatch}
                                    user={user}
                                    sfid={sfid}
                                />
                                <div className="row mb-4 w-100">
                                    <div className="col-12">
                                        <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <img src={asset + "images/accomodation_landing-11.png"} alt="ezgif2" className="Your-space" />
                                                    <img src={asset + "images/accomodation_landing-7.png"} alt="ezgif2" className="img-fluid" width={180} style={{ position: "absolute", top: 160, left: 80 }} />
                                                    {/* <img src={`../images/allumini1.png`} alt="ezgif2" className="img-fluid" width={180} style={{ position: "absolute", top: 30, left: 170 }} /> */}

                                                </div>
                                                <div className={"col-sm-6"}>
                                                    <b>Your Space</b>
                                                    <div className="d-flex justify-content-between">

                                                        You’re just inches away from getting personalized shopping,
                                                        exclusive deals, and being able to shop and pay later  whatever you want.

                                                        At Your-Space, we endeavor to work together as management with our student residents, for the community.
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <PropertiesLonavla
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />

                        <PropertiesAlibag
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />
                        <PropertiesCalagute
                            pushPage={this.pushPage}
                            getProductByCategoryData={this.getProductByCategoryData}
                            dispatch={this.props.dispatch}
                            user={user}
                            sfid={sfid}
                        />
                        <StrideCard />
                        <StaySafe />
                        <div className="row mb-4 w-100">
                            <div className="col-12">
                                <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <img src={asset + "images/accomodation_landing-8.png"} alt="ezgif2" className="img-fluid" />
                                            <img src={asset + "images/accomodation_landing-6.png"} alt="ezgif2" className="img-fluid" width={180} style={{ position: "absolute", top: 100, left: 100 }} />
                                            {/* <img src={asset+"images/accomodation_landing-11.png"} alt="ezgif2" className="img-fluid" width={180} style={{ position: "absolute", top: 30, left: 170 }} /> */}
                                            <div className="scan-button">Scan to Download</div>
                                        </div>
                                        <div className="col-sm-6 p-4">
                                            <b>Exclusive tonight only deals.Only in the app.</b>
                                            <div className="d-flex justify-content-between">

                                                You’re just inches away from getting personalized shopping,
                                                exclusive deals, and being able to shop and pay later  whatever you want.
                                            </div>

                                            <MobileStoreButton
                                                store="ios"
                                                url={this.state.iOSUrl}
                                                linkProps={{ title: 'iOS Store Button' }}
                                                className="app-store"
                                            />
                                            <MobileStoreButton
                                                store="android"
                                                url={this.state.iOSUrl}
                                                linkProps={{ title: "iOS Store Button" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

BlpAccomodation.propTypes = {
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

export default reduxForm({ form: 'BLP-Accomodation' })(BlpAccomodation);

