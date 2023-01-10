
import React, { Component } from "react";
import Helmet from "react-helmet";
import $ from "jquery"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import SimilarProduct from "../common/similar-product"
import RecentView from "../common/recent-view"
import OfferAvailable from "../common/offer-available"
import { Carousel } from 'react-responsive-carousel';
import 'react-multi-carousel/lib/styles.css';
import { favProduct, getSimilarProduct, getSelectedProduct,getProductById } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import { asset } from "../common/assets";
import { useState } from 'react';
import Simplelightbox from "../common/simple-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import PaymentPlan from "./model/payment-plans";
import GenericModal from "./model/GenericModal";
import MoreSellers from "./model/more-sellers";
import SocialShare from "./SocialShare";
import BuyNow_Bar from "./BuyNow_Bar";

const content = [
  {
    caption: 'Hello world am here for you',
  }

]
const options = {
  buttons: {
    iconColor: "#610604",
    iconPadding: "10px"
  },
  caption: {
    caption: 'Helloooooo world there is something for you',
    captionColor: "#61O6O4",
    captionFontSize: "20px",
  },
  settings: {
    overlayColor: "#D8B863"
  },
  thumbnails: {
    thumbnailsAlignment: "center",
  },
};


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


class PdpLaptop extends Component {


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

      // category: product && product.product_sub_category__c?product.product_sub_category__c:'',
      user_sfid: sfid
    }
    this.props.dispatch(getSimilarProduct(data));
    window.scrollTo(0, 0);
  }

  viewMorePlans = () => {
    this.setState({ morePlansOpen: !this.state.morePlansOpen })
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

  handleBuy = (pid) => {
    this.props.handleProBuy(pid);
  }

  handleFilter = (search_sfid, product_sfid) => {
    console.log('selcted id',search_sfid,product_sfid)
    const { user } = this.props
    if (search_sfid !== product_sfid) {
      // let obj = {
      //   sfid: search_sfid, user_id: user
      // }
    //   {
      let obj ={  
        "sfid": product_sfid,
        //"user_sfid":  user
    }
      //this.props.dispatch(getSelectedProduct(obj));
      this.props.dispatch(getProductById(obj))
    }
  }

  handleseller = () => {
    this.setState({ moreSellersOpen: true })
  }

  render() {


    const { user } = this.props;
    const { product_search, product, recentProd, similarProd, sfid } = this.props;
    const proImages = product && product.multiimages ? product.multiimages : [];
    const color = product_search && product_search.colors ? product_search.colors : null;
    const storage = product_search && product_search.storage ? product_search.storage : null;
    const memory = product_search && product_search.memory ? product_search.memory : null;
    //console.log(product_search,"product search hhhhhhh")
    // console.log(product,"productttttttttttt");
    Object.keys(product).forEach((key) => {
      if (product[key] == null) {
        product[key] = ''
      }
    })
    return (
      <>
        <Helmet>
          <title>Product Details</title>
        </Helmet>

        <section className="breadCrumb_wrapper">
          <div className="container">
            <div className="row">
              <div className="col">
                <ul className="breadcrumb_menu d-flex flex-wrap">
                  <li><a href="#">Store</a></li>
                  <li><a href="#">{product.product_category__c ? product.product_category__c : '1'}</a></li>
                  <li><a href="#">{product.product_sub_category__c ? product.product_sub_category__c : ''}</a></li>
                  <li>{product.name ? String(product.name).slice(0, 15) : ''}</li>
                </ul>
              </div>
            </div>
          </div>

        </section>

        <section className="pd_section py-lg-5 py-4 pdp-page-bg">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-9">
                <div className="row">
                  <div className="col-sm-5 col-md-12 col-lg-4 mb-lg-0 mb-3 order-two">
                    <h2 className="pd_title">{product.name ? String(product.name).slice(0, 15) : ''}</h2>
                    <p className="">{product.name ? product.name : ''}</p>
                    <div><img src={`${asset}images/apple-m1pro.png`} className="img-fluid" /></div>

                  </div>
                  <div className="col-sm-7 col-md-12 col-lg-8" id="prd">
                    <div className="pd_img_box mb-lg-0 mb-3">
                      <button className="fullscreen"><img src={`${asset}images/fullscreen.png`} className="img-fluid" /></button>
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
                          {/*  <div className="item d-flex flex-column">
                                  <div className="img-box">
                                          <img src={product.image_url__c} className="img-fluid"/>
                                      </div>
                                  </div>
                                  <div className="item d-flex flex-column">
                                  <div className="img-box">
                                          <img src={product.image_url__c} className="img-fluid"/>
                                      </div>
                                  </div> */}
                        </Carousel>
                      </section>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                {storage && storage.length > 0 && (
                  <>
                    <h5 className="s_t" style={{ fontFamily: 'Graphik', fontStyle: 'normal' }}>Storage</h5>
                    <div className="storage">
                      {storage.map((item, index) => (
                        <button type="button" key={`storage-${index}`} onClick={() => this.handleFilter(product.sfid,item.product)} className={`st_v ${item.storage == product.storage_size__c ? "selected" : ""}`}>{item.storage}</button>
                      ))}
                    </div>
                    

                  </>
                )}
                {memory && memory.length > 0 && (
                  <>
                    <h5 className="s_t">Memory</h5>
                    <div className="storage">
                      {memory.map((item, index) => (
                        <button type="button" key={`memory-${index}`} onClick={() => this.handleFilter(product.sfid,item.product)} className={`st_v ${item.memory == product.ram__c ? "selected" : ""}`}>{item.memory}</button>
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
                        <button type="button" key={`color-${index}`} onClick={() => this.handleFilter(product.sfid,item.product)} className={`cl_v ${item.color== product.color__c? "selected" : ""}`}><i style={{ "backgroundColor": item.color }}></i></button>
                      ))}
                    </div>
                  </>
                )}


                <div className="d-flex justify-content-between mt-lg-5 mt-3 align-items-center align-items-center">
                  <div className="product_compare_checkbox">
                    <div className="custom-control custom-checkbox mr-sm-2 d-flex">
                      <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                      <a className="custom-control-label" htmlFor="customControlAutosizing" href={"/products-list?category=Laptop&compare=" + product.sfid}> <span className="pr_t">Go to Compare</span></a>
                    </div>
                  </div>

                  {/* Social media share dropdown button */}
                  <SocialShare />

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="overall_ p-lg-4 common-bottom-fixed-bar">
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
                    showPopup= {this.props.showPopup}
                    handleClose = {this.props.handleClose}
          viewMorePlans={this.viewMorePlans}
          dispatch={this.props.dispatch}
          sfid={this.props.sfid}
          handleBuy={this.handleBuy}
          handleseller={this.handleseller}
        />

        <section className="pd_section pd-section-marign">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="bg_white px-lg-5 px-2 pd_info_wrapper">
                  <div className="row mb-4">
                    <div className="col-sm-8">
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
                              <td>
                                <input type='color' value={product.color__c} /></td>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <GenericModal onClose={() => { this.setState({ moreSellersOpen: !this.state.moreSellersOpen }) }} isOpen={this.state.moreSellersOpen}>
          <MoreSellers />
        </GenericModal>
        <OfferAvailable />
        {this.state.morePlansOpen ? <PaymentPlan data={this.state.morePlansOpen} isOpen={this.state.morePlansOpen} product_sfid={product} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : ""}
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

        {/* <SimpleReactLightbox>
       <Simplelightbox/>
     </SimpleReactLightbox>   */}


      </>
    );
  }
}

PdpLaptop.propTypes = {
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
  product_search: PropTypes.any
}

export default reduxForm({ form: 'PDP-Laptop' })(PdpLaptop);
