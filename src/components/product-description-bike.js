import React, { Component } from "react";
import $ from "jquery"
import Helmet from "react-helmet";
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import RenderProduct from "../common/render-product";
import SimilarProduct from "../common/similar-product";
import { getFavoriteProductCount, getPincode } from "../actions/product";
import { Carousel } from 'react-responsive-carousel';
//import ThreeSixty from 'react-360-view';
import React360Viewer from '../common/slider-360-view'
import { getProductByCategory, favProduct, getSelectedProduct, getSimilarProduct } from "../actions/user";
import RecentView from "../common/recent-view";
import PaymentPlan from "./model/payment-plans";
import SocialShare from "./SocialShare";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Modal} from "react-bootstrap"
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
class ProductDescriptionBike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      morePlansOpen: false,
      pincode: "",
      pincodelength: "",
      checkpincode: [],
      pincodedetails: [],
    };
  }
  componentDidMount() {
    const { product, sfid, subcat_id } = this.props

    document.addEventListener('onwheel', function (e) {
      e.preventDefault(); // Prevent user scroll during page jump
    }, {
      passive: false
    }); document.addEventListener('onmousewheel', function (e) {
      e.preventDefault(); // Prevent user scroll during page jump
    }, {
      passive: false
    });

    let data = {
      "sub_category_id": subcat_id.category_id,
      user_sfid: sfid
    }
    this.props.dispatch(getSimilarProduct(data));
    $('.fds_accordion .tab').click(function () {
      $(this).parent().siblings().children('.tab').removeClass('show');
      $(this).addClass('show')
      $(this).parent().siblings().children('.content').slideUp();
      $(this).next().slideToggle();
    })
  }
  setFavourite(pid, id) {
    const { sfid } = this.props;
    let data = {
      user_sfid: sfid,
      product_id: pid,
      device_id: ''
    }
    this.props.dispatch(favProduct(data)).then((response) => {
      if (response && response.status && response.status === "success") {
        this.getFavCount();
        if ($(`#${id}`).hasClass('active')) {
          $(`#${id}`).removeClass('active');
        } else {
          $(`#${id}`).addClass('active');
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

  getProductByCategoryData = (category) => {
    window.scrollTo(0, 0)
    const { sfid } = this.props
    let data = {
      category: category,
      user_sfid: sfid
    }
    return this.props.dispatch(getProductByCategory(data)).then((response) => { return response });
  }

  handlepincode = (e) => {
    this.setState({ pincode: e })
    const len = this.state.pincode.length
    this.setState({ pincodelength: len })
  }
  getpincode = () => {
    // const len = this.state.pincode.length
    // this.setState({ pincodelength: len })
    let data = {
      "pincode": this.state.pincode
    }
    this.props.dispatch(getPincode(data))
      .then((response) => {
        if (response && response.status === 'success') {
          this.setState({ pincodedetails: response })
          window.$('#showPriceModal').modal('show')
          console.log(this.state.pincodedetails)
        }

      });
  }

  modalClose = () => {
    window.$('#showPriceModal').modal('hide')
  }


  render() {
    const { product, product_search, similarProd, sfid, user, recentProd } = this.props;
    const proImages = product && product.multiimages ? product.multiimages : '';
    const color = product_search && product_search.colors ? product_search.colors : null;

    return (
      <>
        <Helmet>
          <title>Product Details</title>
        </Helmet>
        <section className="breadCrumb_wrapper electric-bike-breadcum">
          <div className="container">
            <div className="row">
              <div className="col">
                <ul className="breadcrumb_menu d-flex flex-wrap">
                  <li><a href="#">Store</a></li>
                  <li><a href="#">{product.product_category__c ? product.product_category__c : ''}</a></li>
                  <li><a href="#">{product.product_sub_category__c ? product.product_sub_category__c : ''}</a></li>
                  <li>{product.name}</li>
                </ul>
              </div>
            </div>
          </div>

        </section>

        <section className="pd_section py-lg-5 py-4 pdp-page-bg-gradient">
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <div className="left-image-sticky-top">
                  <section className="section-slide">
                    <Carousel responsive={responsive} draggable={false}>

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

                  {/* <div className="bike_image text-center p-4 mt-4">

                    {
                      proImages && proImages.length > 0 ? (
                        <ThreeSixty threesixty={threesixty}
                        amount={36}
                        imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
                        fileName="chair_{index}.jpg?v1"
                        />

                        <img src={proImages} alt={product.name ? product.name : ''} style={{ height: "25rem" }} />


                      ) : (
                          <ThreeSixty
                          amount={36}
                          imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
                          fileName="chair_{index}.jpg?v1"
                          />
                            <React360Viewer
                            amount={36}
                            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
                            fileName="chair_{index}.jpg?v1"
                            buttonClass="dark"
                          />

                          <React360Viewer
                          amount={4}
                          imagePath={asset+"images/products"}
                          fileName="bike_{index}.png?v1"
                          buttonClass="dark"
                          />
                          <React360Viewer
                            amount={36}
                            imagePath="https://scaleflex.cloudimg.io/width/600/q35/https://scaleflex.ultrafast.io/https://scaleflex.airstore.io/demo/chair-360-36"
                            fileName="chair_{index}.jpg?v1"
                            buttonClass="light"
                          />

                          <img src={asset+"images/products/bike.png"} className="img-fluid"/>
                        )}
                  </div> */}
                  {/* <div className="bike_image text-center p-4">
                      {
                        proImages && proImages.length > 0 ? (
                          <React360Viewer
                            amount={4}
                            imagePath={asset + "images/products"}
                            fileName="bike_{index}.png?v1"
                            buttonClass="dark"
                          />
                          // <img src={`data:image/jpg;base64,${proImages[0].base64}`} className="img-fluid"/>
                        ) : (
                          // <img src={asset+"images/products/bike.png"} className="img-fluid"/>
                          <React360Viewer
                            amount={4}
                            imagePath={asset + "images/products"}
                            fileName="bike_{index}.png?v1"
                            buttonClass="dark"
                          />
                        )}
                    </div> */}
                {/* </Carousel> */}

                <div className="py-4 px-md-5 px-4 bike-pricing mb-lg-0 mb-3">
                  <div className="row align-items-center">
                    <div className="col-lg-7 px-0">
                      <div className="row">
                        <div className="col-lg-5 pr-0 border-right mb-lg-0 mb-3">
                          <p className="m-0">Ex Showroom Price</p>
                          <h5 className="m-0">₹ {product.ex_showroom_price__c}</h5>
                        </div>
                        <div className="col-lg-6 mb-lg-0 mb-3 px-2">
                          <p className="m-0">No Cost EMI Starting</p>
                          <h5 className="m-0 fw-bold d-flex">{product.min_avi_emi__c ? <> ₹ {product.min_avi_emi__c}/mo* <span>
                            <button className="link"
                              onClick={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }}
                            >View Plans</button>
                          </span> </> : 'NA'}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 d-flex justify-content-end px-0">
                      <button onClick={() => this.setFavourite(product && product.sfid ? product.sfid : '', `fav-mobile-item-${product && product.id ? product.id : 0}`)} id={`fav-mobile-item-${product && product.id ? product.id : 0}`} className={`wish-btn wist_list_btn ${product && product.isFavorite ? "active" : ""}`}>
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                      </button>

                      <button type="button" onClick={() => this.handleBuy(product && product.sfid ? product.sfid : '')} className="apply-btn px-5">Buy Now </button>
                    </div>
                    {/* <button className="link"
                        onClick={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }}
                      >View Plans</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">


              <div className="d-flex justify-content-between">
                <span>

                  <h4>{product.name ? String(product.name).slice(0, 15) : ''}  </h4>
                  <p className="product-width">{product.name ? product.name : ''}</p>
                </span>

                <SocialShare />

              </div>


              <ul className="d-flex list-unstyled flex-wrap bike-spec mb-3">
                <li className="mr-3">
                  <p>Bore Stroke</p>
                  <h5>{product.bore_stroke__c && product.bore_stroke__c}</h5>
                </li>
                <li className="mr-3">
                  <p>Wheelbase</p>
                  <h5>{product && product.wheel_size__c ? product.wheel_size__c : ''}</h5>
                </li>
                <li className="mr-3">
                  <p>Max Power</p>
                  <h5>{product && product.motor_power__c ? product.motor_power__c : "NA"} PS</h5>
                </li>
                <li className="mr-3">
                  <p>Max Torque</p>
                  <h5>{product && product.torque__c ? product.torque__c : "NA"} {product && product.torque__c ? 'NM' : ""}</h5>
                </li>
                <li className="mr-3">
                  <p>Compression</p>
                  <h5>{product.compression__c && product.compression__c}</h5>
                </li>
              </ul>

              {/* <h5 className="mb-3">Enter pincode to get the On road price </h5>
              <div className="pin-input d-flex mb-5">
                <div className="map-pin">
                  <img src={asset + "images/icons/map-pin.png"} />
                </div>
                <div className="input-wrap position-relative">
                  <input type="text" className="error" placeholder="Enter Pincode " fields={6} onChange={(e) => this.handlepincode(e.target.value)} />
                  <span className="icon"><i className="fa fa-arrow-right" aria-hidden="true" type="button" onClick={this.getpincode}></i></span>
                  {this.state.pincodelength == 5 ? <span className="success">This is valid pincode</span> : <span className="error">Enter valid Pincode</span>}

                </div>
              </div> */}

              <div className="mb-5">
                <div className="custom-radio-check mb-4">
                  <input type="radio" name="bike" />
                  <label></label>
                  <div className="txt">
                    <h5 className="">Standard Delivery</h5>
                    <p>{product && product.delivery_mode__c ? product.delivery_mode__c : 'NA'}</p>
                  </div>

                </div>
                <div className="custom-radio-check">
                  <input type="radio" name="bike" />
                  <label></label>
                  <div className="txt">
                    <h5 className="">Express Store Pickup available</h5>
                    <p>Please select model and pin code to see </p>
                    <p>availability at your nearest dealership</p>
                  </div>
                </div>
              </div>

              <div className="d-flex  align-items-center mb-4">
                {color && color.length > 0 && (
                  <h5 className="s_t">Color</h5>

                )}
                <div className="ml-auto">
                  <div className="product_compare_checkbox">
                    <div className="custom-control custom-checkbox mr-sm-2">
                      <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                      <a className="custom-control-label" htmlFor="customControlAutosizing" href={"/products-list?category=" + encodeURI(product.product_sub_category__c) + "&compare=" + product.sfid}> Add to Compare</a>

                    </div>
                  </div>
                </div>
              </div>
              {color && color.length > 0 && (
                <div className="color mb-4">
                  {color.map((item, index) => (
                    <button type="button" key={`color-${index}`} onClick={() => this.handleFilter(item.product, product.sfid)} className={`cl_v ${item.product == product.sfid ? "selected" : ""}`}><i style={{ "backgroundColor": item.color }}></i></button>
                  ))}
                </div>
              )}
              <div className="mb-4">
                <h4 className="mb-4 sub-title-txt">Feature Details &amp; Specification</h4>

                <div className="fds_accordion_wrap">
                  <div className="fds_accordion">
                    <div className="tab">Engine</div>
                    <div className="content">
                      <div className="row">
                        <div className="col-md-6">
                          <p>Engine CC</p>
                          <h5>{product.enginecc__c && product.enginecc__c} </h5>
                        </div>
                        <div className="col-md-6">
                          <p>Engine Type</p>
                          <h5>NA</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>Max Power</p>
                          <h5>{product && product.motor_power__c ? product.motor_power__c : "NA"} PS</h5>
                        </div>
                        <div className="col-md-6">
                          <p>Max Torque</p>
                          <h5>{product && product.torque__c ? product.torque__c : "NA"} {product && product.torque__c ? 'NM' : ""}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>Fuel System</p>
                          <h5>NA</h5>
                        </div>
                        <div className="col-md-6">
                          <p>Compression</p>
                          <h5>{product.compression__c && product.compression__c}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>Bore Stroke</p>
                          <h5>{product.bore_stroke__c && product.bore_stroke__c}</h5>
                        </div>
                        <div className="col-md-6">
                          <p>Exhaust</p>
                          <h5>{product.exhaust__c && product.exhaust__c} </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab">Dimension and Weight</div>
                    <div className="content">NA</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab">Transmission</div>
                    <div className="content">{product && product.transmission__c ? product.transmission__c : "NA"}</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab">Chassis and Suspension</div>
                    <div className="content">{product && product.chassis__c ? product.chassis__c : "NA"}</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab">Braking</div>
                    <div className="content">{product && product.rear_brake__c ? product.rear_brake__c : "NA"}</div>
                  </div>
                  <div className="fds_accordion">
                    <div className="tab">Wheel and Tyres</div>
                    <div className="content">{product && product.tyre_type__c ? product.tyre_type__c : "NA"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        { this.state.morePlansOpen ? <PaymentPlan data={this.state.morePlansOpen} isOpen={this.state.morePlansOpen} product_sfid={product} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : "" }

    {/*<RenderProduct*/ }
    {/*    pushPage = {this.pushPage}*/ }
    {/*    getProductByCategoryData = {this.getProductByCategoryData}*/ }
    {/*    user = {user}*/ }
    {/*    sfid={sfid}*/ }
    {/*    category={"EV"}*/ }
    {/*    card_name={"More from Jawa"}*/ }
    {/*/>*/ }
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




        <div className="modal fade" id="showPriceModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
          <div className="modal-dialog " role="document" style={{ top: "15%" }}>
            <div className="modal-content ">

              <div className="modal-header bg-black text-light">
                <h5>On-road Price Breakup</h5>

                <button type="button" onClick={() => this.modalClose()} >
                  <i className="fa fa-close text-light"></i>
                </button>

              </div>

              <div className="modal-body">

                <div className="container">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Ex-Showroom Price</td>
                        <td><i className="fa fa-rupee">`</i>1,94,900</td>
                      </tr>

                      <tr>
                        <td>RTO Charges</td>
                        <td><i className="fa fa-rupee">`</i>24,900</td>
                      </tr>

                      <tr>
                        <td>Insurance Charges</td>
                        <td><i className="fa fa-rupee">`</i>2,900</td>
                      </tr>

                      <tr>
                        <th>Ex-Showroom Price</th>
                        <th><i className="fa fa-rupee">`</i>2,22,700</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Modal show={this.props.showPopup} onHide={this.props.handleClose} animation={false}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Access Stride Marketplace while our team evaluates your application</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

ProductDescriptionBike.propTypes = {
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

export default reduxForm({ form: 'PDP-Laptop' })(ProductDescriptionBike);


