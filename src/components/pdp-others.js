import React, { Component } from "react";
import Helmet from "react-helmet";
import $ from "jquery"
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import SimilarProduct from "../common/similar-product"
import RecentView from "../common/recent-view"
import OfferAvailable from "../common/offer-available"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { favProduct, getSimilarProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import GenericModal from "./model/GenericModal";
import MoreSellers from "./model/more-sellers";
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

class PdpOthers extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      content: "",
      userData: null,
      proData: null,
      partnerData: null,
      morePlansOpen: false,
      moreSellersOpen: false,
    };
  }

  scomponentDidMount() {
    this.mounted = true;
    const { product, sfid, subcat_id } = this.props
    let data = {
      sub_category_id: subcat_id.category_id,

      // category: product && product.product_sub_category__c?product.product_sub_category__c:'',
      user_sfid: sfid
    }
    this.props.dispatch(getSimilarProduct(data));
  }

  // setFavourite(pid, id) {
  //   const { user, sfid } = this.props;

  //   let data = {
  //     user_sfid: sfid,
  //     product_id: pid,
  //     device_id: ''
  //   }
  //   this.props.dispatch(favProduct(data)).then((response) => {
  //     if (response && response.status && response.status === "success") {
  //       this.getFavCount();
  //       if ($(`#${id}`).hasClass('active')) {
  //         $(`#${id}`).removeClass('active');
  //       } else {
  //         $(`#${id}`).addClass('active');
  //       }
  //     }
  //   });
  // }

  // getFavCount = () => {
  //   const { sfid } = this.props;
  //   let data = {
  //     user_sfid: sfid
  //   }
  //   this.props.dispatch(getFavoriteProductCount(data));
  // }

  viewMorePlans = () =>{
    this.setState({ morePlansOpen: !this.state.morePlansOpen })
}

  handleBuy = (pid) => {
    this.props.handleProBuy(pid);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleseller = () => {
    this.setState({ moreSellersOpen: true })
}

  render() {
    const { user } = this.props;
    const { product, recentProd, similarProd, sfid } = this.props;
    const proImages = product && product.images ? product.images : [];
    Object.keys(product).forEach((key) => {
      if (product[key] == null) {
        product[key] = ''
      }
    })
    return (
      <>
        <Helmet>
          <title>aaaaaaaaaaProduct Details</title>
        </Helmet>
        <section className="breadCrumb_wrapper">
          <div className="container">
            <div className="row">
              <div className="col">
                <ul className="breadcrumb_menu d-flex flex-wrap">
                  <li><a href="#">Store</a></li>
                  <li><a href="#">{product.product_category__c ? product.product_category__c : ''}</a></li>
                  <li><a href="#">{product.brand__c ? product.brand__c : ''}</a></li>
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
                    <div><img src={asset + "images/apple-m1pro.png"} className="img-fluid" /></div>

                  </div>
                  <div className="col-sm-8" id="prd">
                    <div className="pd_img_box mb-lg-0 mb-3">
                      <button className="fullscreen"><img src={asset + 'images/fullscreen.png'} className="img-fluid" /></button>
                      <Carousel responsive={responsive}>
                        {
                          proImages && proImages.length > 0 && proImages.map((item, index) => (
                            <div key={`pro-img-${index}`} className="item d-flex flex-column">
                              <div className="img-box">
                                <a href={`data:image/jpg;base64,${item.base64}`} data-lightbox="gallery">
                                  <img src={`data:image/jpg;base64,${item.base64}`} className="img-fluid" />
                                </a>
                                {/* <img src={`data:image/jpg;base64,${item.base64}`} className="img-fluid"/> */}
                              </div>
                            </div>
                          )
                          )}

                        {/* 
                                
                                <a href="http://via.placeholder.com/700x700" data-lightbox="gallery">
                                <img src={`data:image/jpg;base64,${item.base64}`} className="img-fluid"/>
                                </a>
                                
                                
                                <div className="item d-flex flex-column">
                                
                                <div className="img-box">
                                        <img src={asset+"images/macbook.png"} className="img-fluid"/>
                                    </div>
                                </div>
                                <div className="item d-flex flex-column">
                                <div className="img-box">
                                        <img src={asset+"images/macbook.png"} className="img-fluid"/>
                                    </div>
                                </div>
                                <div className="item d-flex flex-column">
                                <div className="img-box">
                                        <img src={asset+"images/macbook.png"} className="img-fluid"/>
                                    </div></div> */}
                      </Carousel>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <h5 className="s_t">Storage</h5>
                <div className="storage">
                  <button className="st_v selected">216GB</button>
                  <button className="st_v">512GB</button>
                </div>
                <h5 className="s_t">Memory</h5>
                <div className="storage">
                  <button className="st_v selected">216GB</button>
                  <button className="st_v">512GB</button>
                </div>
                <h5 className="s_t">Color</h5>
                <div className="color">
                  <button className="cl_v selected"><i style={{ "backgroundColor": "#B6A179" }}></i></button>
                  <button className="cl_v"><i style={{ "backgroundColor": "#272425" }}></i></button>
                  <button className="cl_v"><i style={{ "backgroundColor": "#6389CB" }}></i></button>
                  <button className="cl_v"><i style={{ "backgroundColor": "#F2C758" }}></i></button>
                </div>

                <div className="d-flex justify-content-between mt-lg-5 mt-3 align-items-center">
                  <div className="product_compare_checkbox">
                    <div className="custom-control custom-checkbox mr-sm-2 d-flex">
                      <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                      <label className="custom-control-label" htmlFor="customControlAutosizing"> Go to Compare</label>
                    </div>
                  </div>
                  <div>
                    <button className="share_btn_">Share <img src={asset + "images/share.png"} alt="qr-code" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="overall_ p-lg-4">
          <div className="container-fluid">
            <div className="row  justify-content-between">

              <div className="col-sm-7 mb-lg-0 mb-3 border-right">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1"><strong>Delivery:</strong> 1–2 weeks Free Shipping <button className="link">Get delivery dates</button></p>
                  <p className="mb-0 pr_t">Stride Price</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0"><strong>Sold by:</strong> {product.seller_information__c}<button onClick={() => { this.setState({ moreSellersOpen: true }) }} className="link">More Sellers</button></p>
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
          <BuyNow_Bar 
                    product={product}
                    viewMorePlans={this.viewMorePlans}
                    dispatch = {this.props.dispatch}
                    sfid = {this.props.sfid}
                    handleBuy={this.handleBuy}
                    handleseller={this.handleseller}
                    handleClose = {this.props.handleClose}
                    showPopup= {this.props.showPopup}
                    />
        <section className="pd_section">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="bg_white px-lg-5 px-2 pd_info_wrapper">
                  <div className="row mb-4">
                    <div className="col-sm-8">
                      <h5 className="pd_info_title">General</h5>
                      <table className="w-100 pd_info_table">
                        <tbody>
                          <tr>
                            <td>Sales Package</td>
                            <td>MacBook Air, 30 W USB-C Power Adapter, USB-C Charge Cable (2m), User Guide, Warranty Documents</td>
                          </tr>
                          <tr>
                            <td>Model Number</td>
                            <td>Z124J005KD</td>
                          </tr>
                          <tr>
                            <td>Part Number</td>
                            <td>Z1270005E</td>
                          </tr>
                          <tr>
                            <td>Series</td>
                            <td>MacBook PRO</td>
                          </tr>
                          <tr>
                            <td>Color</td>
                            <td>Black</td>
                          </tr>
                          <tr>
                            <td>Type</td>
                            <td>Thin and Light Laptop</td>
                          </tr>
                          <tr>
                            <td>Suitable For</td>
                            <td>Processing &amp; Multitasking</td>
                          </tr>
                          <tr>
                            <td>Battery Backup</td>
                            <td>Upto 15 Hours</td>
                          </tr>
                          <tr>
                            <td>Power Supply</td>
                            <td>30 W AC Adapter</td>
                          </tr>
                          <tr>
                            <td>MS Office Provided</td>
                            <td>No</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-sm-4 pt-4">
                      <img src={asset + "images/ezgif2.png"} alt="ezgif2" className="img-fluid" />
                    </div>
                  </div>
                  {/*  <div className="row mb-4">
                          <div className="col-sm-8">
                              <h5 className="pd_info_title">General</h5>
                              <table className="w-100 pd_info_table">
                                <tbody>
                                <tr>
                                  <td>Sales Package</td>
                                  <td>MacBook Air, 30 W USB-C Power Adapter, USB-C Charge Cable (2m), User Guide, Warranty Documents</td>
                                </tr>
                                <tr>
                                  <td>Model Number</td>
                                  <td>Z124J005KD</td>
                                </tr>
                                <tr>
                                  <td>Part Number</td>
                                  <td>Z1270005E</td>
                                </tr>
                                <tr>
                                  <td>Series</td>
                                  <td>MacBook PRO</td>
                                </tr>
                                <tr>
                                  <td>Color</td>
                                  <td>Black</td>
                                </tr>
                                <tr>
                                  <td>Type</td>
                                  <td>Thin and Light Laptop</td>
                                </tr>
                                <tr>
                                  <td>Suitable For</td>
                                  <td>Processing &amp; Multitasking</td>
                                </tr>
                                <tr>
                                  <td>Battery Backup</td>
                                  <td>Upto 15 Hours</td>
                                </tr>
                                <tr>
                                  <td>Power Supply</td>
                                  <td>30 W AC Adapter</td>
                                </tr>
                                <tr>
                                  <td>MS Office Provided</td>
                                  <td>No</td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          
                          <div className="col-sm-4 pt-4">
                            
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-sm-8">
                              <h5 className="pd_info_title">General</h5>
                              <table className="w-100 pd_info_table">
                                <tbody>
                                <tr>
                                  <td>Sales Package</td>
                                  <td>MacBook Air, 30 W USB-C Power Adapter, USB-C Charge Cable (2m), User Guide, Warranty Documents</td>
                                </tr>
                                <tr>
                                  <td>Model Number</td>
                                  <td>Z124J005KD</td>
                                </tr>
                                <tr>
                                  <td>Part Number</td>
                                  <td>Z1270005E</td>
                                </tr>
                                <tr>
                                  <td>Series</td>
                                  <td>MacBook PRO</td>
                                </tr>
                                <tr>
                                  <td>Color</td>
                                  <td>Black</td>
                                </tr>
                                <tr>
                                  <td>Type</td>
                                  <td>Thin and Light Laptop</td>
                                </tr>
                                <tr>
                                  <td>Suitable For</td>
                                  <td>Processing &amp; Multitasking</td>
                                </tr>
                                <tr>
                                  <td>Battery Backup</td>
                                  <td>Upto 15 Hours</td>
                                </tr>
                                <tr>
                                  <td>Power Supply</td>
                                  <td>30 W AC Adapter</td>
                                </tr>
                                <tr>
                                  <td>MS Office Provided</td>
                                  <td>No</td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          
                          <div className="col-sm-4 pt-4">
                           
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-sm-8">
                              <h5 className="pd_info_title">General</h5>
                              <table className="w-100 pd_info_table">
                                <tbody>
                                <tr>
                                  <td>Sales Package</td>
                                  <td>MacBook Air, 30 W USB-C Power Adapter, USB-C Charge Cable (2m), User Guide, Warranty Documents</td>
                                </tr>
                                <tr>
                                  <td>Model Number</td>
                                  <td>Z124J005KD</td>
                                </tr>
                                <tr>
                                  <td>Part Number</td>
                                  <td>Z1270005E</td>
                                </tr>
                                <tr>
                                  <td>Series</td>
                                  <td>MacBook PRO</td>
                                </tr>
                                <tr>
                                  <td>Color</td>
                                  <td>Black</td>
                                </tr>
                                <tr>
                                  <td>Type</td>
                                  <td>Thin and Light Laptop</td>
                                </tr>
                                <tr>
                                  <td>Suitable For</td>
                                  <td>Processing &amp; Multitasking</td>
                                </tr>
                                <tr>
                                  <td>Battery Backup</td>
                                  <td>Upto 15 Hours</td>
                                </tr>
                                <tr>
                                  <td>Power Supply</td>
                                  <td>30 W AC Adapter</td>
                                </tr>
                                <tr>
                                  <td>MS Office Provided</td>
                                  <td>No</td>
                                </tr>
                                </tbody>
                              </table>
                            </div>
                          
                          <div className="col-sm-4 pt-4">
                            
                          </div>
                        </div> */}
                </div>

              </div>
            </div>
          </div>
        </section>
        <GenericModal onClose={() => { this.setState({ moreSellersOpen: !this.state.moreSellersOpen }) }} isOpen={this.state.moreSellersOpen}>
          <MoreSellers />
        </GenericModal>
        <OfferAvailable />
        <SimilarProduct
          sfid={sfid}
          user={user}
          pushPage={this.props.pushPage}
          similarProd={similarProd}
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

PdpOthers.propTypes = {
  ...propTypes,
  user: PropTypes.any,
  sfid: PropTypes.any,
  similarProd: PropTypes.any,
  recentProd: PropTypes.any,
  isSearching: PropTypes.bool,
  searchDet: PropTypes.bool,
  pushPage: PropTypes.func,
  handleProBuy: PropTypes.func,
  product: PropTypes.any
}

export default reduxForm({ form: 'PDP-Others' })(PdpOthers);

