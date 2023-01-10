import React, { Component } from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { reduxForm, propTypes } from 'redux-form'
import Helmet from 'react-helmet'
import RecentView from '../common/recent-view';
import SimilarProduct from '../common/similar-product'
import Compare from '../common/compare'
import { asset } from '../common/assets'
import ContentLoader from 'react-content-loader'
import {
    catProductSearch,
    getCategoryFilters,
    getCompareProducts,
    getFavoriteProductCount,
    getBlogs,
} from '../actions/product'
import {
    getProductByCategory,
    favProduct,
    getSimilarProduct,
    getViewedProduct,
    getProductById,
} from '../actions/user'
import NewsArticle from '../common/news-article';
import GoogleMapReact from 'google-map-react';
import Roomavilable from "./model/room-accomodation";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Modal} from "react-bootstrap"
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class PdpAccomodation extends Component {
    constructor(props) {
        super(props)
        {
            this.state = {
                center: {
                    lat: this.props.product.location__latitude__s,
                    lng: this.props.product.location__longitude__s
                },
                zoom: 11,
                category: null,
                pgdetails: "",
                morePlansOpen: false,
            }

        }
    }

    async componentDidMount() {
        // this.setState({centre:{lat: this.props.product.location__latitude__s,lng: this.props.product.location__longitude__s}})
        console.log(this.state.center, "centre")
        const { subcat_id, sfid, user } = this.props
        await this.props.dispatch(getBlogs(this.props.product.sfid)).then((response) => {
            if (response) {
                this.setState({ relatedBlogData: response })
            }
        })
        let data = {
            sub_category_id: subcat_id.category_id,
            user_sfid: sfid
        }
        this.props.dispatch(getSimilarProduct(data));
    }

    setFavourite(pid, id) {
        const { user, sfid } = this.props
        if (sfid) {
            let data = {
                user_sfid: sfid,
                product_id: pid,
                device_id: '',
            }
            this.props.dispatch(favProduct(data)).then((response) => {
                if (response && response.status && response.status === 'success') {
                    this.getFavCount()
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
            })
        } else {
            this.props.pushPage('/login')
        }
    }

    getFavCount = () => {
        const { sfid } = this.props
        let data = {
            user_sfid: sfid,
        }
        this.props.dispatch(getFavoriteProductCount(data))
    }
    handleBuy = (pid) => {
        this.props.handleProBuy(pid)
    }

    render() {
        console.log('chcckkkkk',this.props.showPopup)
        const { product, similarProd, sfid, recentProd, user } = this.props;
        // const centre={lat: product.location__latitude__s,lng: product.location__longitude__s}=this.state

        return (
            <>
                <Helmet>
                    <title>Eduvanz | Products</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <div className="row mr-0">
                    <div className="col-lg-12">
                        <div className="breadCrumb_wrapper pt-3">
                            <ul className="breadcrumb_menu d-flex flex-wrap">
                                <li><a href="#">Store</a></li>
                                <li><a
                                    href="#">{product.product_category__c ? product.product_category__c : ''}</a>
                                </li>
                                <li>{product.product_sub_category__c ? product.product_sub_category__c : ''}</li>
                                <li>{product.name}</li>
                                <li>{product.locality__c}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='container'>

                    <div className="col-md-8 section-heading-margin">
                        <h4 className='learn-more'>{product.name}{product.locality__c}</h4>
                        {/* <div className='row'>
                            <div className='col-6 d-flex'>
                                <small className='mr-2'>.Female</small>
                                <small className='mr-2'>.2Bedroom</small>
                                <small className='mr-2'>.1Bedroom</small>
                                <small className='mr-2'>.1Bath</small>
                                <small className='mr-2'><a href='#'>View location</a></small>
                            </div>
                        </div> */}
                    </div>
                    <div className='row'>
                        <div className='col-12 row'>
                            <div className='col-6'>
                                <div className='card'>
                                    <img src={product.popupImage[0]} alt="" style={{ "height": "318px" }} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='card' style={{ "height": "319px" }}>
                                    <div className="d-flex flex-wrap text-center">
                                        <div className="room-image">
                                            <img src={product.popupImage[1]} alt="" height={120} width={250} />
                                        </div>
                                        <div className="room-image">
                                            <img src={product.popupImage[2]} alt="" height={120} width={250} />
                                        </div>
                                        <div className="room-image">
                                            <img src={product.popupImage[3]} alt="" height={120} width={250} />
                                        </div>
                                        <div className="room-image">
                                            <img src={product.popupImage[4]} alt="" height={120} width={250} />
                                            <button className="available_room" onClick={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }}>View +{product.popupImage.length} Photos</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overall_ p-lg-4 ">
                        <div className="container-fluid">
                            <div className="row  justify-content-between">

                                <div className="col-sm-6 mb-lg-0 mb-3 d-none d-md-none d-lg-block">
                                    <div className='row'>

                                        <div className='col-md-12 d-flex'>
                                            <div className='col-md-4'>
                                                <span className='move_in_date'>Move in</span>
                                                <input type="date" onChange={(e) => localStorage.setItem("checkin", e.target.value)}></input>
                                                <hr style={{ width: '75%', border: '1px solid #000000', marginTop: '0%' }} />
                                            </div>
                                            <div className='col-md-4'>
                                                <h5 className='move_in_date'>Duration</h5>
                                                {/* <input type="text" ></input> */}
                                                {/* <hr style={{ width: '75%', border: '1px solid #000000', marginTop: '0%' }} /> */}
                                                <select onChange={(e) => localStorage.setItem("duration", e.target.value)}>
                                                    <option value="3 Month">3 Month</option>
                                                    <option value="6 Month">6 Month</option>
                                                    <option value="9 Month">9 Month</option>
                                                </select>
                                            </div>
                                            <div className='col-md-4'></div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-6 d-flex justify-content-lg-end flex-wrap mobile-flex-card">
                                    <div className="mr-lg-5 mr-3 text-lg-right mb-lg-0 mb-3 d-none d-mb-block d-lg-block">
                                        <p className="n_emi_c mb-1">No Cost EMI Starting <strong>₹ {product && product.min_avi_emi__c && product.min_avi_emi__c}/mo</strong></p>

                                    </div>
                                    <div className="d-flex justify-content-end mb-lg-0 mb-3">
                                        <button type='button'
                                        // onClick={() => this.setFavourite(product && product.sfid ? product.sfid : '', `fav-mobile-item-${product && product.id ? product.id : 0}`)} id={`fav-mobile-item-${product && product.id ? product.id : 0}`} className={`wist_list_btn ${product && product.isFavorite ? "active" : ""}`}
                                        >

                                            <i
                                                onClick={() => this.setFavourite(product && product.sfid ? product.sfid : '', `fav-mobile-item-${product && product.id ? product.id : 0}`)}
                                                id={`fav-mobile-item-${product && product.id ? product.id : 0}`}
                                                className={`wist_list_btn d-flex justify-content-center align-items-center ${product && product.isFavorite ? "active" : " fa fa-heart-o"}`} aria-hidden="true"></i>
                                        </button>
                                        <button type="button" onClick={() => this.handleBuy(product && product.sfid ? product.sfid : '')} className="pay-btn">Enquire Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row section-marign-top">
                        <div className="col-md-8 section-heading-margin">
                            <h4 className='learn-more'>About the place</h4>
                        </div>
                        <div className='col-md-8 ' style={{ "color": "#525252", "borderRadius": " 8px" }}>
                            <p>Come and stay in this superb duplex T2, in the heart of the historic center of Bordeaux.
                                Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of the city
                                thanks to its ideal location. Close to many shops,
                                bars and restaurants, you can access the apartment by tram A and C and bus routes 27 and 44.</p>
                            <a href="#">Read More</a>
                            <hr style={{ border: "1.5465px solid #E5E7EB" }}></hr>
                        </div>



                        {/* <div className='col-md-4 mb-3 card' style={{ "background": "#FFFFFF", "boxShadow": " 0px 4px 39px rgba(166, 166, 166, 0.25)", "height": "200px", "borderRadius": " 20px" }}>
                            <h3 style={{ "letter-spacing": "-0.035em" }}>
                                Get Stride Virtual Card
                            </h3>
                            <p>A virtual card is a unique & digitally generated 16-digit credit card number that helps you pay for all online subscriptions.
                                Your card number is private, reducing any fraud risks.</p>
                            <button style={{ "background": "#1E232D", "borderRadius": "10px", "width": "145.25px", "height": "50px", "color": "white" }}>+create</button>
                        </div> */}
                    </div>
                    <div className="row section-marign-top">
                        <div className="col-md-8 section-heading-margin">
                            <h4 className='learn-more'>Room Facilities</h4>
                        </div>
                        <div className='col-md-8 card ' style={{ "backgroundColor": "rgba(229, 234, 255, 0.4)", "height": "422px", "borderRadius": " 8px" }}>

                            {/* flex-wrap: wrap */}
                            <div className="d-flex flex-wrap text-center">

                                {product.facilities.map((item, index) => (
                                    <div className="facility-width" key={index}>
                                        <img src={item.image} alt="" />
                                        <p>{item.title} </p>

                                    </div>
                                ))}
                                <hr style={{ border: "1.5465px solid #E5E7EB" }}></hr>
                            </div>

                        </div>

                    </div>

                    <div className="row section-marign-top">
                        <div className="col-md-8 section-heading-margin">
                            <h4 className='learn-more'>Amenities and Services</h4>
                        </div>
                        <div className='col-md-8 card ' style={{ "backgroundColor": "rgba(229, 234, 255, 0.4)", "height": "196px", "borderRadius": " 8px" }}>
                            <div className="d-flex flex-wrap text-center">
                                {product.amenities.map((item, index) => (
                                    <div className="facility-width" key={index}>
                                        <img src={item.image} alt="" />
                                        <p>{item.title} </p>
                                    </div>
                                ))}
                                <hr style={{ border: "1.5465px solid #E5E7EB" }}></hr>
                            </div>

                        </div>
                    </div>
                    <div className="row section-marign-top">
                        <div className="col-md-8 section-heading-margin">
                            <h4 className='learn-more'>Available Occupancies</h4>
                        </div>
                        <div className='col-md-8 card ' style={{ "backgroundColor": "rgba(229, 234, 255, 0.4)", "height": "333px", "borderRadius": " 8px" }}>
                            <div className="d-flex flex-wrap text-center">
                                {product.available_occupancies.map((item, index) => (
                                    <div className="Available-Occupancies" key={index}>
                                        <img src={item.image} alt="" />
                                        <p>{item.title} </p>
                                        <h6>{item.price}</h6>
                                    </div>
                                ))}

                            </div>
                            <div className='available-board'>

                            </div>
                        </div>
                    </div>
                    <div className="row section-marign-top">
                        <div className="col-md-8 section-heading-margin">
                            <h4 className='learn-more'>Best-in-class Safety and Hygiene Certified by Equinox Labs</h4>
                        </div>
                        <div className="row mb-4 w-100">
                            <div className="col-12">
                                <div className="">
                                    <div className="row">
                                        <div className={"col-sm-8"}>
                                            <div className="row">
                                                {product.best_in_class.map(item => (
                                                    <div className="col-sm-6 d-flex justify-content-between">
                                                        <div className="d-flex flex-wrap text-center">
                                                            <div className='d-flex best-in-class'>
                                                                <img src={item.image} alt="" />
                                                                <p>{item.title}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <hr style={{ border: "1.5465px solid #E5E7EB" }}></hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div id="FAQ" className="my-4">
                                <div className="row mx-0">
                                    <div className='col-12'>
                                        <h4 className="mb-4">Frequently asked questions</h4>
                                    </div>
                                </div>
                                <div className="accordion px-2">
                                    <div className="faq">
                                        <div className='question'>
                                            <h4>How is the this Accomodate different from what i've learnt in college?</h4>
                                        </div>
                                        <div className='answer'>
                                            <p>hello</p>
                                        </div>
                                        <div className='question'>
                                            <h4>What is the advantage in taking this Hostel?</h4>
                                        </div>
                                        <div className='answer'>
                                            <p>hello</p>
                                        </div>
                                        <div className='question'>
                                            <h4>How is the this hostel different from what i've selected?</h4>
                                        </div>
                                        <div className='answer'>
                                            <p>hello</p>
                                        </div>
                                        {/* {faqs && faqs !== undefined && faqs.length > 0 ? (
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
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ border: "1.5465px solid #E5E7EB" }}></hr>
                    <div className='row'>
                        <h5 className="mb-4">
                            Where you'll be
                        </h5>
                        <div className='col-12 mb-3 d-flex'>

                            <div className='col-8 '>
                                <iframe id="iframeId" src={`https://maps.google.com/maps?q=${this.state.lat},${this.state.lng}&hl=es;&output=embed`} height="300px" width="100%"></iframe>
                                <div style={{ height: '100vh', width: '100%' }}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: "AIzaSyAzKciuMDI5r9f6r16O8MqqsGQdsF0bHBc" }}
                                        defaultCenter={this.state.center}
                                        defaultZoom={this.state.zoom}
                                    >
                                        {/* <AnyReactComponent
                                            lat={product.location__latitude__s}
                                            lng={product.location__longitude__s}
                                            text="Not Found"
                                        /> */}
                                    </GoogleMapReact>
                                </div>
                            </div>
                            <div className='col-4 card ' style={{ "backgroundColor": "rgba(229, 234, 255, 0.4)", "borderRadius": " 8px" }}>
                                <h6>Facilities Near You</h6>
                                <div className="d-flex flex-wrap text-center">
                                    {product.facilities_near_you.map((item =>
                                        <div className='facilities-near'>
                                            <img src={item.image} alt="" />
                                            <p>{item.title}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



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


                {this.state?.relatedBlogData && (
                    <NewsArticle blogList={this.state.relatedBlogData} />
                )}
                {this.state.morePlansOpen ? <Roomavilable data={product.popupImage} isOpen={this.state.morePlansOpen} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : ""}
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
        )
    }
}
PdpAccomodation.propTypes = {
    ...propTypes,
    history: PropTypes.any,
    user: PropTypes.any,
    sfid: PropTypes.any,
    similarProd: PropTypes.any,
    recentProd: PropTypes.any,
    isSearching: PropTypes.bool,
    searchDet: PropTypes.bool,
    pushPage: PropTypes.func,
    handleProBuy: PropTypes.func,
}


export default reduxForm({ form: 'PDP-Acco' })(PdpAccomodation);