import React, { Component } from "react";
import Helmet from "react-helmet";
import $ from "jquery"
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import SimilarProduct from "../common/similar-product"
import RecentView from "../common/recent-view"
import OfferAvailable from "../common/offer-available"
import { Carousel } from 'react-responsive-carousel';
import 'react-multi-carousel/lib/styles.css';
import { favProduct, getSimilarProduct, getSelectedProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import PaymentPlan from "./model/payment-plans";
import GenericModal from "./model/GenericModal";
import MoreSellers from "./model/more-sellers";
import SocialShare from "./SocialShare";
import BuyNow_Bar from "./BuyNow_Bar";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

class PdpElectronicsWatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            userData: null,
            proData: null,
            partnerData: null,
            morePlansOpen: false,
            moreSellersOpen: false,
        };
    }

    async componentDidMount() {

        const { product, sfid, subcat_id } = this.props
        let data = {
            sub_category_id: subcat_id.category_id,
            user_sfid: sfid
        }
        this.props.dispatch(getSimilarProduct(data));
        window.scrollTo(0, 0);
    }

    viewMorePlans = () => {
        this.setState({ morePlansOpen: !this.state.morePlansOpen })
    }

    // setFavourite(pid, id) {
    //     const { user, sfid } = this.props;

    //     let data = {
    //         user_sfid: sfid,
    //         product_id: pid,
    //         device_id: ''
    //     }
    //     this.props.dispatch(favProduct(data)).then((response) => {
    //         if (response && response.status && response.status === "success") {
    //             this.getFavCount();
    //             if ($(`#${id}`).hasClass('active')) {
    //                 $(`#${id}`).removeClass('active');
    //             } else {
    //                 $(`#${id}`).addClass('active');
    //             }
    //         }
    //     });
    // }

    // getFavCount = () => {
    //     const { sfid } = this.props;
    //     let data = {
    //         user_sfid: sfid
    //     }
    //     this.props.dispatch(getFavoriteProductCount(data));
    // }

    handleBuy = (pid) => {
        this.props.handleProBuy(pid);
    }

    handleFilter = (search_sfid, product_sfid) => {
        const { user } = this.props
        if (search_sfid !== product_sfid) {
            let obj = {
                sfid: search_sfid, user_id: user
            }
            this.props.dispatch(getSelectedProduct(obj));
        }
    }

    handleseller = () => {
        this.setState({ moreSellersOpen: true })
    }

    render() {
        const { product_search, user, product, recentProd, similarProd, sfid } = this.props;
        const proImages = product && product.multiimages ? product.multiimages : [];
        const color = product_search && product_search.colors ? product_search.colors : null;
        const storage = product_search && product_search.storage ? product_search.storage : null;
        const memory = product_search && product_search.memory ? product_search.memory : null;
        Object.keys(product).forEach((key) => {
            if (product[key] == null) {
                product[key] = ''
            }
        })
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Smart Watch </title>
                </Helmet>

                <section className="breadCrumb_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <ul className="breadcrumb_menu d-flex flex-wrap">
                                    <li><a href="#">Store</a></li>
                                    <li><a href="#">{product.product_category__c ? product.product_category__c : ''}</a></li>
                                    <li><a href="#">{product.product_sub_category__c ? product.product_sub_category__c : ''}</a></li>

                                    <li>{product.name ? String(product.name).slice(0, 15) : ''}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pd_section py-lg-5 py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm-4 mb-lg-0 mb-3">
                                        <h2 className="pd_title">{product.name ? String(product.name).slice(0, 15) : ''}</h2>
                                        <p className="">{product.name ? product.name : ''}</p>
                                    </div>
                                    <div className="col-sm-8" id="prd">
                                        <div className="pd_img_box mb-lg-0 mb-3">
                                            <button className="fullscreen"><img src={asset + 'images/fullscreen.png'} className="img-fluid" /></button>
                                            <section className="section-slide">
                                                <Carousel responsive={responsive}>
                                                    {
                                                        proImages && proImages.length > 0 && proImages.map((item, index) => (
                                                            <div key={`pro-img-${index}`} className="item d-flex flex-column">
                                                                <div className="img-box">
                                                                    <a href={`data:image/jpg;base64,${item.base64}`} data-lightbox="gallery">
                                                                        <img src={item} className="img-fluid" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )
                                                        )}
                                                    <div className="item d-flex flex-column">

                                                        <div className="img-box">
                                                            <img src={product.image_url__c} className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </Carousel>
                                            </section>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">

                                <div className="storagesCol">
                                    <h5 class="s_t">Style</h5>
                                   
                                    <div class="storage">
                                        <button type="button" class="st_v selected ">GPS</button>
                                        <button type="button" class="st_v ">GPS + Cellular</button>
                                    </div>

                                    <h5 class="s_t">Size</h5>
                                   
                                    <div class="storage">
                                        <button type="button" class="st_v selected ">41mm</button>
                                        <button type="button" class="st_v ">45mm</button>
                                    </div>
                                </div>

                                {storage && storage.length > 0 && (
                                    <>
                                        <h5 className="s_t">Storage</h5>
                                        <div className="storage">
                                            {storage.map((item, index) => (
                                                <button type="button" key={`storage-${index}`} onClick={() => this.handleFilter(item.product, product.sfid)} className={`st_v ${item.product == product.sfid ? "selected" : ""}`}>{item.storage}</button>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {memory && memory.length > 0 && (
                                    <>
                                        <h5 className="s_t">Memory</h5>
                                        <div className="storage">
                                            {memory.map((item, index) => (
                                                <button type="button" key={`memory-${index}`} onClick={() => this.handleFilter(item.product, product.sfid)} className={`st_v ${item.product == product.sfid ? "selected" : ""}`}>{item.memory}</button>
                                            ))}
                                            {/* <button className="st_v">512GB</button> */}
                                        </div>
                                    </>
                                )}
                                {color && color.length > 0 && (
                                    <>
                                        <h5 className="s_t">Color</h5>
                                        <div className="color">
                                            {color.map((item, index) => (
                                                <button type="button" key={`color-${index}`} onClick={() => this.handleFilter(item.product, product.sfid)} className={`cl_v ${item.product == product.sfid ? "selected" : ""}`}><i style={{ "backgroundColor": item.color }}></i></button>
                                            ))}
                                        </div>
                                    </>
                                )}


                                <div className="d-flex justify-content-between mt-lg-5 mt-3 align-items-center">
                                    <div className="product_compare_checkbox">
                                        <div className="custom-control custom-checkbox mr-sm-2 d-flex">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <a className="custom-control-label" htmlFor="customControlAutosizing" href={"/products-list?category=Smart%20Watch&compare=" + product.sfid}> <span className="pr_t">Go to Compare</span></a>
                                        </div>
                                    </div>
                                    <div>
                                        {/* <button className="share_btn_ d-flex align-items-center"> <img src={asset + "images/share.png"} alt="qr-code" /> <span className="pr_t">Share</span></button> */}
                                        <SocialShare />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <BuyNow_Bar
                    product={product}
                    viewMorePlans={this.viewMorePlans}
                    dispatch={this.props.dispatch}
                    sfid={this.props.sfid}
                    handleClose = {this.props.handleClose}
                    showPopup= {this.props.showPopup}
                    handleBuy={this.handleBuy}
                    handleseller={this.handleseller}
                />
                {/* <div className="overall_ p-lg-4 common-bottom-fixed-bar">
                    <div className="container">
                        <div className="row justify-content-between">

                            <div className="col-sm-7 mb-lg-0 mb-3 border-right">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1"><strong>Delivery:</strong> 1–2 weeks Free Shipping <button className="link">Get delivery dates</button></p>
                                    <p className="mb-0 pr_t">Stride Price</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0"><strong>Sold by:</strong> {product.seller_information__c}<button onClick={() => {this.setState({ moreSellersOpen: true }) }} className="link">More Sellers</button></p>
                                    <p className="mb-0"><span className="mr-2">₹{product.price__c}</span> <del>₹{product.mrp__c}</del></p>
                                </div>
                            </div>
                            <div className="col-sm-5 d-flex justify-content-center">
                                <div className="mr-lg-2 mr-3 text-lg-right mb-lg-0 mb-3 d-none d-mb-block d-lg-block">
                                    <p className="n_emi_c mb-1 pr_t">No Cost EMI Starting <strong>₹{product.min_avi_emi__c}/mo</strong></p>
                                    <button className="link" onClick={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }}>View Plans</button>
                                </div>
                                <div className="d-flex justify-content-end mb-lg-0 mb-3">
                                    <button type="button" onClick={() => this.setFavourite(product && product.sfid ? product.sfid : '', `fav-television-item-${product && product.id ? product.id : 0}`)} id={`fav-television-item-${product && product.id ? product.id : 0}`} className={`wist_list_btn ${product && product.isFavorite ? "active" : ""}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    <button type="button" onClick={() => this.handleBuy(product && product.sfid ? product.sfid : '')} className="pay-btn">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}


                <section className="pd_section">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col">
                                <div className="bg_white px-lg-5 px-2 pd_info_wrapper">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="mb-5">
                                                <h5 className="pd_info_title">General</h5>
                                                <table className="w-100 pd_info_table">
                                                    <tbody>
                                                        {product && product.package_contents__c && (
                                                            <tr>
                                                                <td>Sales Package</td>
                                                                <td>{product.package_contents__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.model_name_number__c && (
                                                            <tr>
                                                                <td>Model Number</td>
                                                                <td>{product.model_name_number__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.part_no__c && (
                                                            <tr>
                                                                <td>Part Number</td>
                                                                <td>{product.part_no__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.series__c && (
                                                            <tr>
                                                                <td>Series</td>
                                                                <td>{product.series__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.color__c && (
                                                            <tr>
                                                                <td>Color</td>
                                                                <td><input type='color' value={product.color__c} /></td>
                                                            </tr>
                                                        )}
                                                        {product && product.type__c && (
                                                            <tr>
                                                                <td>Type</td>
                                                                <td>{product.type__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.suitable_for__c && (
                                                            <tr>
                                                                <td>Suitable For</td>
                                                                <td>{product.suitable_for__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.battery_capacity__c && (
                                                            <tr>
                                                                <td>Battery Backup</td>
                                                                <td>{product.battery_capacity__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.power_supply_voltage_hz__c && (
                                                            <tr>
                                                                <td>Power Supply</td>
                                                                <td>{product.power_supply_voltage_hz__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.operating_system__c && (
                                                            <tr>
                                                                <td>MS Office Provided</td>
                                                                <td>{product.operating_system__c}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mb-5">
                                                <h5 className="pd_info_title">Processor/Memory</h5>
                                                <table className="w-100 pd_info_table">
                                                    <tbody>
                                                        {product && product.package_contents__c && (
                                                            <tr>
                                                                <td>Sales Package</td>
                                                                <td>{product.package_contents__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.model_name_number__c && (
                                                            <tr>
                                                                <td>Model Number</td>
                                                                <td>{product.model_name_number__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.part_no__c && (
                                                            <tr>
                                                                <td>Part Number</td>
                                                                <td>{product.part_no__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.series__c && (
                                                            <tr>
                                                                <td>Series</td>
                                                                <td>{product.series__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.color__c && (
                                                            <tr>
                                                                <td>Color</td>
                                                                <td><input type='color' value={product.color__c} /></td>
                                                            </tr>
                                                        )}
                                                        {product && product.type__c && (
                                                            <tr>
                                                                <td>Type</td>
                                                                <td>{product.type__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.suitable_for__c && (
                                                            <tr>
                                                                <td>Suitable For</td>
                                                                <td>{product.suitable_for__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.battery_capacity__c && (
                                                            <tr>
                                                                <td>Battery Backup</td>
                                                                <td>{product.battery_capacity__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.power_supply_voltage_hz__c && (
                                                            <tr>
                                                                <td>Power Supply</td>
                                                                <td>{product.power_supply_voltage_hz__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.operating_system__c && (
                                                            <tr>
                                                                <td>MS Office Provided</td>
                                                                <td>{product.operating_system__c}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mb-5">
                                                <h5 className="pd_info_title">Operating System</h5>
                                                <table className="w-100 pd_info_table">
                                                    <tbody>
                                                        {product && product.package_contents__c && (
                                                            <tr>
                                                                <td>Sales Package</td>
                                                                <td>{product.package_contents__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.model_name_number__c && (
                                                            <tr>
                                                                <td>Model Number</td>
                                                                <td>{product.model_name_number__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.part_no__c && (
                                                            <tr>
                                                                <td>Part Number</td>
                                                                <td>{product.part_no__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.series__c && (
                                                            <tr>
                                                                <td>Series</td>
                                                                <td>{product.series__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.color__c && (
                                                            <tr>
                                                                <td>Color</td>
                                                                <td><input type='color' value={product.color__c} /></td>
                                                            </tr>
                                                        )}
                                                        {product && product.type__c && (
                                                            <tr>
                                                                <td>Type</td>
                                                                <td>{product.type__c}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mb-5">
                                                <h5 className="pd_info_title">Port / Slot</h5>
                                                <table className="w-100 pd_info_table">
                                                    <tbody>
                                                        {product && product.package_contents__c && (
                                                            <tr>
                                                                <td>Sales Package</td>
                                                                <td>{product.package_contents__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.model_name_number__c && (
                                                            <tr>
                                                                <td>Model Number</td>
                                                                <td>{product.model_name_number__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.part_no__c && (
                                                            <tr>
                                                                <td>Part Number</td>
                                                                <td>{product.part_no__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.series__c && (
                                                            <tr>
                                                                <td>Series</td>
                                                                <td>{product.series__c}</td>
                                                            </tr>
                                                        )}
                                                        {product && product.color__c && (
                                                            <tr>
                                                                <td>Color</td>
                                                                <td><input type='color' value={product.color__c} /></td>
                                                            </tr>
                                                        )}
                                                        {product && product.type__c && (
                                                            <tr>
                                                                <td>Type</td>
                                                                <td>{product.type__c}</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="col-sm-4 pt-4">
                                            <img src={asset + "images/ewatch.png"} alt="ezgif2" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4 px-5">
                            <div className="col-12">
                                <img src={asset + "images/ewatch_2.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_3.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_4.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_5.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_6.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_7.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_8.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_9.png"} className="img-fluid" alt="" />
                                <img src={asset + "images/ewatch_10.png"} className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                <GenericModal onClose={() => { this.setState({ moreSellersOpen: !this.state.moreSellersOpen }) }} isOpen={this.state.moreSellersOpen}>
                    <MoreSellers />
                </GenericModal>
                {this.state.morePlansOpen ? <PaymentPlan data={this.state.morePlansOpen} product_sfid={product} isOpen={this.state.morePlansOpen} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : ""}
                <OfferAvailable
                    sfid={sfid}
                    user={user}
                    pushPage={this.props.pushPage}
                    similarProd={similarProd}
                />
                <SimilarProduct
                    similarProd={similarProd}
                    sfid={sfid}
                    user={user}
                    pushPage={this.props.pushPage}
                />
                <RecentView recentProd={recentProd}
                    sfid={sfid}
                    user={user}
                    pushPage={this.props.pushPage} />

            </>
        );
    }
}

PdpElectronicsWatch.propTypes = {
    ...propTypes,
    user: PropTypes.any,
    sfid: PropTypes.any,
    similarProd: PropTypes.any,
    recentProd: PropTypes.any,
    isSearching: PropTypes.bool,
    searchDet: PropTypes.bool,
    pushPage: PropTypes.func,
    handleProBuy: PropTypes.func,
    product: PropTypes.any,
    product_search: PropTypes.any,
}

export default reduxForm({ form: 'PDP-Smart-Watch' })(PdpElectronicsWatch);
