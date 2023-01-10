import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import { asset } from '../common/assets';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, getRelatedCategory, getViewedProduct,getEductionBrandLanding, getBrandlanding } from "../actions/user";
import RecentView from "../common/recent-view"
import TrandingProduct from "../common/tranding-product";
import Laptop20000 from "../common/laptop20000";
import Laptop40000 from "../common/Laptop40000";
import PremiumLaptop from "../common/PremiumLaptop";
import SmartPhone10000 from "../common/Smartphone10,000";
import SmartPhone20000 from "../common/Smartphone20,000";
import SmartPhone30000 from "../common/Smartphone30000";
import PremiumPhone from "../common/PremiumPhone";


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

class BplElectronics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            accountDet: null,
            electronicbrand: [],
            subcat: [],
        };
    }

    async componentDidMount() {
        // console.log(this.props,"hello")
        let data = { "category_id": 1 }

        const response = await this.props.dispatch(getRelatedCategory(data));
        // console.log(response,"aaaaaaaaaaaaaa")

        let qr = new URLSearchParams(window.location.search);
        let br_name = qr.get("name");


        if (response.message == "success") {

            this.setState({ subcat: response.data.categorydata })
        }
        this.props.dispatch(getViewedProduct({ user_id: this.props.sfid }));
        let branddata = { "brand": br_name }
        // get Electronic Brand
        let obj = { "category_id": 1 }
        //  this.props.dispatch(getRelatedCategory(obj)).then((response) => {

        //       })


        this.props.dispatch(getEductionBrandLanding(branddata)).then(
            (response) => {

                if (response.responseCode === 200) {

                    this.setState({ mba_date: response.data }, () => {
                        this.setState({ mob_products: response.data.branddata }, () => console.log(this.state.mob_products[0], "hhhhhhhhhhhhhhhhhhhhh"))
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

        console.log(this.state.subcat, "sub_category")
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
                                        <li>Electronics</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <img src={asset + "images/banner_landing.png"} className='object-cover' />
                            </div>
                        </div>
                        <div className='row electronicsBox'>

                            <div className=' d-flex brand_image'>

                                {this.state.subcat && this.state.subcat.length > 0 && this.state.subcat.map((item, index) =>

                                    <div className="col-sm-6 block p-0" key={index}>
                                        <div className="col-lg-8">
                                            <div className="card-imgbrand" style={{
                                                backgroundImage: `url(${asset + "images/rectangle_landing.png"})`
                                            }}>
                                                <img src={item.category_image} alt="" className="inside-img" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <h6 className="text-position">{item.category_name}</h6>

                                            <a href="#" class="viewAll">View More </a>
                                        </div>
                                    </div>

                                )}

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
                                            <div className=" product-card  product-card1">
                                                <div className="product-tab">
                                                    Creator Friendly
                                                </div>
                                                <h6>
                                                    No Cost EMI
                                                </h6>
                                                <h6 class="prize">
                                                    Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/tab_landing.png"} className="product-tabimg" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="product-card product-card2">
                                        <div class="mobile_img">
                                            <img src={asset + "images/mobile_landing.png"} className="product-tabright" />
                                        </div>
                                        <div class="mobile_text">
                                            <div className="product-tabblue" >
                                                E-learning
                                            </div>
                                            <h6><span className="">No Cost EMI</span>
                                                <br />
                                                <span className="">
                                                    Starting ₹2,200
                                                </span>
                                            </h6>
                                        </div>
                                    </div>

                                </div>
                                <div class="col product-curated">
                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            <div className=" product-card product-card3">
                                                <div className="product-tabcenter">
                                                    Gaming
                                                </div>
                                                <h6>
                                                    No Cost EMI Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/laptop_landing1.png"} className="product-imgcenter" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col align-self-end">

                                    <div className="product-card product-card2">
                                        <div class="mobile_img">
                                            <img src={asset + "images/laptop_landing.png"} className="product-tabright" />
                                        </div>
                                        <div class="mobile_text">
                                            <div className="product-tabblue product_pink" >
                                                Business Purposes
                                            </div>
                                            <h6><span className="">No Cost EMI</span>
                                                <br />
                                                <span className="">
                                                    Starting ₹2,200
                                                </span>
                                            </h6>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 d-flex flex-column">
                                            <div className="product-card product-card1">
                                                <div className="product-blue">
                                                    Coder Friendly
                                                </div>
                                                <h6>
                                                    No Cost EMI
                                                </h6>
                                                <h6>
                                                    Starting ₹2,200
                                                </h6>
                                                <img src={asset + "images/desktop_landing.png"} className="product-tabimg mt-4" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='container mt-5'>
                            <div className='row mb-4'>
                                <div className='col-12'>
                                    <img src={asset + "images/banner_landing.png"} alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='add-box mb-4'>
                                        <img src={asset + "images/add01.jpg"} alt="" className="img-fluid" />
                                    </div>

                                </div>
                                <div className='col-lg-6'>
                                    <div className='add-box mb-4'>
                                        <img src={asset + "images/add02.jpg"} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='add-box mb-4'>
                                        <img src={asset + "images/add03.jpg"} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='add-box mb-4'>
                                        <img src={asset + "images/add04.jpg"} alt="" className="img-fluid" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>







                <div className="py-5"></div>
                <TrandingProduct
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                />
                {/* <Laptop20000
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                />
                <Laptop40000
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                /> */}
                {/* <PremiumLaptop
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                /> */}
                <SmartPhone10000
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                />
                <SmartPhone20000
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                />
                <SmartPhone30000
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                />
                <PremiumPhone
                    pushPage={this.pushPage}
                    getProductByCategoryData={this.getProductByCategoryData}
                    dispatch={this.props.dispatch}
                    user={user}
                    sfid={sfid}
                />
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

BplElectronics.propTypes = {
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

export default reduxForm({ form: 'BPL-Electronics' })(BplElectronics);

