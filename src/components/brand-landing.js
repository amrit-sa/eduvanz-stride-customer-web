import React, { Component } from "react"
import { Helmet } from "react-helmet"
import HeaderNew from "../common/headerNew"
import Footer from "../common/footer";
import AboutUs from "../common/about";
import ProductElectricBike from "../common/electric-bike"
import TopProduct from "../common/top-product"
import { asset } from "../common/assets";

class BrandLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            accountDet: null
        };
    }

    render() {
        const { user, username, isSearching, searchDet } = this.props;

        return (
            <>
                <Helmet>
                    <title>Brand Landing Page</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <HeaderNew
                    username={username ? username : ''}
                    user={user ? user : ''}
                    history={this.props.history}
                    isSearching={isSearching}
                    searchDet={searchDet}
                />
                <div className="landing-banner">
                    <div className="inner-page">
                        <div className="container banner-content">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='breadCrumb_wrapper pt-xl-5 pt-4'>
                                        <ul className="breadcrumb_menu white d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            <li><a href="#">Electronics</a></li>
                                            <li>Lenovo</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center mt-xl-5 mt-4'>
                                <div className='col-lg-5 col-12'>
                                    <img src={asset+"images/lenovo.png"} className='img-fluid mb-xl-5 mb-4' />

                                    <h5 className='text-white font-weight-normal'>Lenovo is proud to introduce latest products and solutions. Explore our online showcase and see how we keep the world connected.</h5>
                                </div>
                            </div>
                        </div>
                        <img src={asset+"images/banner4.jpg"} className='object-cover' />
                    </div>
                </div>


                <div className="pdesc-banner before-d-none">
                    <div className="banners" style={{ backgroundImage: `url(${asset}images/bl_bg_1.png)` }}>
                        <div className="container banner-content">
                            <div className='row mx-0'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap ">
                                            <li className=''><a href="#" className=''>Store</a></li>
                                            <li className=''><a href="#" className=''>Education</a></li>
                                            <li className=''>Upgrad</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-lg-4">
                                <div className="col-lg-4">
                                    <img src={asset+"images/bl_upgrad.png"} className='img-fluid' />
                                    <p className="mt-5">Powering career success for every member of the global workforce as their trusted lifelong learning partner. Making our learners achieve their desired outcomes. </p>
                                </div>
                                <div className="col-lg-5">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="pdesc-banner before-d-none">
                    <div className="banners" style={{ backgroundImage: `url(${asset}images/bl_bg_2.png)` }}>
                        <div className="container banner-content">
                            <div className='row mx-0'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap ">
                                            <li className='text-white'><a href="#" className='text-white'>Store</a></li>
                                            <li className='text-white'><a href="#" className='text-white'>Elecronics </a></li>
                                            <li className='text-white'>Lenovo</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-lg-4">
                                <div className="col-lg-4">
                                    <img src={asset+"images/bl_ys.png"} className='img-fluid' />
                                    <p className="mt-5 text-white">India’s Premier Student Housing Brand. Your-Space have made sure to cover all the key elements needed to create an ideal balance for young adults at India’s most trusted hostel, Your-Space. </p>
                                </div>
                                <div className="col-lg-5">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container-fluid">
                    <div className="row category-boxes mt-4  overflow-hidden">
                        <div className="col-lg-6 box">
                            <div className="row  align-items-center">
                                <div className="col-lg-8 px-0">
                                    <img src={asset+"images/dd1.jpg"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4  text-center">
                                    <h2 className="text-white">Laptop</h2>
                                    <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 box">
                            <div className="row  align-items-center h-100">
                                <div className="col-lg-8 px-0 h-100">
                                    <img src={asset+"images/dd2.jpg"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4  text-center">
                                    <h2 className="text-white">Mobile</h2>
                                    <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 box">
                            <div className="row  align-items-center h-100">
                                <div className="col-lg-8 px-0  h-100">
                                    <img src={asset+"images/dd3.jpg"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4  text-center">
                                    <h2 className="text-white">All-in-One</h2>
                                    <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 box">
                            <div className="row  align-items-center h-100">
                                <div className="col-lg-8 px-0 h-100">
                                    <img src={asset+"images/dd4.jpg"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4 text-center">
                                    <h2 className="text-white">Tablet</h2>
                                    <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="container-fluid px-0">
                    <div className="row mx-0 bl mt-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-lg-8 px-0 h-100">
                                    <img src={asset+"images/dd7.png"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4 text-center">
                                    <h2 className="text-white">Higher Education</h2>
                                    <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-lg-8 px-0 h-100">
                                    <img src={asset+"images/dd8.png"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4 text-center">
                                    <h2 className="text-white">Upskilling</h2>
                                    {/* <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid px-0">
                    <div className="row mx-0 bl mt-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-lg-8 px-0 h-100">
                                    <img src={asset+"images/dd5.png"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4 text-center">
                                    <h2 className="text-white">Hostel</h2>
                                    <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row align-items-center">
                                <div className="col-lg-8 px-0 h-100">
                                    <img src={asset+"images/dd6.png"} className='img-fluid' />
                                </div>
                                <div className="col-lg-4 text-center">
                                    <h2 className="text-white">PG</h2>
                                    {/* <button className="link">View More <i className="fa fa-angle-right" aria-hidden="true"></i></button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg0 pt-lg-5 pt-3 pb-5 overflow-hidden top-deal">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3 className="section_title mb-lg-4 mb-3">
                                    Products curated for you
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="topdeal_wrapper">
                                    <ul className="d-flex topdeal list-unstyled m-0">
                                        <li>
                                            <div className="item one p-4">
                                                <span className="tag-pink tag">Creator Friendly</span>
                                                <div className="row mt-4">
                                                    <div className="col-5">
                                                        <h4>
                                                            No Cost EMI
                                                            <span className="d-block">Starting ₹2,200 </span>
                                                        </h4>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="img-box2">
                                                            <img src={asset+"images/dd4.jpg"} className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="item two p-4">
                                                <div className="row mt-4">
                                                    <div className="col-7">
                                                        <div className="img-box2">
                                                            <img src={asset+"images/dd4.jpg"} className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-5 text-right">
                                                        <span className="tag-blue tag">E-learning</span>
                                                        <h4 className="mt-4"> No Cost EMI <span className="d-block">Starting ₹2,200 </span></h4>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>


                                        <li>
                                            <div className="item saven p-4">


                                                <div className="top text-center">
                                                    <span className="tag tag-blue">Gaming</span>
                                                    <h4 className="mt-4">No Cost EMI Starting <span className="d-inline-block">₹2,200 </span></h4>
                                                </div>
                                                <div className="img-box">
                                                    <img src={asset+"images/laptop11.jpg"} className="img-fluid" />
                                                </div>

                                            </div>
                                        </li>
                                        <li>

                                            <div className="item two p-4">
                                                <div className="row mt-4">
                                                    <div className="col-5">
                                                        <div className="img-box2">
                                                            <img src={asset+"images/dd4.jpg"} className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-7 text-right">
                                                        <span className="tag-pink tag">Business Purposes</span>
                                                        <h4 className="mt-4"> No Cost EMI <span className="d-block">Starting ₹2,200 </span></h4>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="item one p-4">
                                                <span className="tag-blue tag">Coder Friendly</span>
                                                <div className="row mt-4">
                                                    <div className="col-5">
                                                        <h4>
                                                            No Cost EMI
                                                            <span className="d-block">Starting ₹2,200 </span>
                                                        </h4>
                                                    </div>
                                                    <div className="col-7">
                                                        <div className="img-box2">
                                                            <img src={asset+"images/dd4.jpg"} className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                        <li>
                                            <div className="item saven p-4">


                                                <div className="top text-center">
                                                    <span className="tag tag-blue">Gaming</span>
                                                    <h4 className="mt-4">No Cost EMI Starting <span className="d-inline-block">₹2,200 </span></h4>
                                                </div>
                                                <div className="img-box">
                                                    <img src={asset+"images/laptop11.jpg"} className="img-fluid" />
                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex  justify-content-end">
                            <div className="cont">
                                {/* <p><input type="text" id="amount"/></p> */}
                                <div id="slider-range-max2"></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12">
                            <img src={asset+"images/add01.png"} className="img-fluid" />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='add-box mb-4'>
                                <img src={asset+"images/add01.jpg"} alt="" className="img-fluid" />
                            </div>

                        </div>
                        <div className='col-lg-6'>
                            <div className='add-box mb-4'>
                                <img src={asset+"images/add02.jpg"} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='add-box mb-4'>
                                <img src={asset+"images/add03.jpg"} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='add-box mb-4'>
                                <img src={asset+"images/add04.jpg"} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>

                </div>
                <TopProduct />
                <TopProduct />
                <TopProduct />
                <TopProduct />
                <TopProduct />
                <ProductElectricBike 
                    dispatch = {this.props.dispatch}
                />
                <AboutUs />
                <Footer />
            </>
        );
    }
}


export default BrandLanding;
