import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import { asset } from '../common/assets';
import TopBikeDeal from "../common/top-bike-deal"
import FavouriteBrand from "../common/favourite-brand"
import ExploreMore from "../common/explore-more"
import StrideCard from "../common/stride-card";
import RenderProduct from "../common/render-product";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, getRelatedCategory, getViewedProduct } from "../actions/user";
import { setLatLon } from "../actions/product"
import RecentView from "../common/recent-view"
import TopDeal from "../common/top-deal"
import CommonProducts from "../common/CommonProducts";
import { setShowableProducts } from '../actions/product'
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OurPresence from "../common/Our-presence"
import SubcategoryDataCard from "../common/SubcategoryDataCard";
import LocationSearchInput from './Searchplaces'
import ProductBox from "../common/ProductBox";

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

class ClpPgHostel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      accountDet: null,
      coordinates: {
        lat: null,
        lng: null
      },
      locationName: "",
      startDate: null,
      allData: [],
      categoryData: [],
      subCategoryproduct: [],
      category_bundle: [14, 13] // category_bundle IS THE LIST OF SUB CATEGORIES OF PRODUCTS THAT ARE TO BE SHOWN ON HOME PAGE, ADD OTHER CATEGORIES ID AT CORRECT PLACE TO SHOW THAT LIST ALSO
    };
  }

  async componentDidMount() {
    const { showable_products } = this.props;
    if (showable_products && showable_products.length == 0) {

      this.props.dispatch(setShowableProducts()).then(response => {
        if (response.message = "success") {
          this.setState({ allData: response.data })
        }
      })
    } else {
      this.setState({ allData: showable_products })
    }


    let data = { "category_id": "3" }
    await this.props.dispatch(getRelatedCategory(data)).then(res => {
      if (res.responseCode == '200') {
        this.setState({
          categoryData: res && res.data && res.data.categorydata,
          subCategoryproduct: res && res.data && res.data.subCategoryproduct,
        })
      }
    });
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

  setCoordinates = (ll) => {
    this.setState({ coordinates: ll })
    // API CALL FOR LOCATION
    // let data = {
    //   sub_category_id: "",
    //   user_sfid: ""
    // }
    // this.props.dispatch(getProductByCategory(data)).then((response) => console.log(response,"rrrrrrrrrrrrrr"))
    this.props.dispatch(setLatLon(ll))
  }

  setLocationName = (name) => {
    this.setState({ locationName: name })
  }

  handleSearch = () => {
    const { locationName } = this.state;
    {
      locationName.length > 0 ?
        this.props.history.push(`products-list?category=Hostel&area=` + locationName)
        :
        this.props.history.push("products-list?category=Hostel")

    }

  }



  render() {
    const { user, sfid, sub_categories, recentProd } = this.props;
    console.log(this.props, "this")
    return (
      <>
        <Helmet>
          <title>PGs & Hostel</title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <div className='accomodation-banner'>

          <div className='breadCrumb_wrapper' style={{position:"absolute"}}>
            <ul className="breadcrumb_menu d-flex flex-wrap" >
              <li style={{color:"white"}}><a href="/" style={{color:"white"}} onClick={(e) =>{  e.preventDefault(); this.props.history.push('/')}}>Store</a></li>
              <li style={{color:"white"}}>PG/Hostel</li>
            </ul>
          </div>

          <div className='accomodation-banner-caption'>
            <div className='row align-items-center' style={{ position: "relative", bottom: "2.2rem" }}>
              <div className='col-lg-6'>
                <h1 className='text-white'>Discover Your Life. <br />Travel Where You Want</h1>
                <p className='text-white'>Plan &amp; book your perfect trip with travel tips, destination and inspiration from us </p>
              </div>
              <div className='col-lg-6 ml-auto'>
                <div className='bg-white rounded-4 p-4'>
                  <h3>Find your stay</h3>
                  <div className='search_2 mb-4 search_22'>
                    <button type="button" className='search_btn' style={{height:'48px'}}>
                      <img src="images/icons/search_icon.png" alt="" className='img-fluid' style={{paddingBottom:'5px'}} />
                    </button>
                    <LocationSearchInput setCoordinates={this.setCoordinates} setLocationName={this.setLocationName} />
                    <span className="locationIcon"><img src="images/icons/center.png" /></span>
                    {/* <input type="text" placeholder='City/Hostel/Area/Building' /> */}
                  </div>
                  <div className='time-2 mb-4'>
                    <div className='row'>
                      <div className='col-6 border-right'>
                        <div className='d-flex'>
                          <div className='mr-3'>
                            <img src="images/icons/cal3.png" alt=""  />
                          </div>
                          <div>
                            <h5>Move in</h5>
                            <DatePicker
                              selected={this.state.startDate}
                              onChange={(date) => this.setState({ startDate: date })}
                              name="startDate"
                              dateFormat="MM/dd/yyyy"
                            />
                          </div>

                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='d-flex'>
                          <div className='mr-3'>
                            <img src="images/icons/clock2.png" alt="" className='img-fluid' />
                          </div>
                          <div>
                            <h5>Duration</h5>
                            <select>
                              <option>3 Month</option>
                              <option>6 Month</option>
                              <option>9 Month</option>
                            </select>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className='mb-2'>Tenant Type</h5>
                  <div className='row justify-content-evenly'>
                    <div className='col-auto mr-3 radio_wrap '>
                      <div className="custom-radiobox ">
                        <input type="radio" name="gender" value="individual" />
                        <label htmlFor="">Male</label>
                      </div>
                    </div>
                    <div className='col-auto mr-3 radio_wrap'>
                      <div className="custom-radiobox ">
                        <input type="radio" name="gender" value="individual" />
                        <label htmlFor="">Female</label>
                      </div>
                    </div>
                    <div className='col-auto mr-3 radio_wrap'>
                      <div className="custom-radiobox ">
                        <input type="radio" name="gender" value="individual" />
                        <label htmlFor="">Show for all</label>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <button className='continue-btn w-100'
                      style={{ height: "53px" }}
                      disabled={!(this.state.coordinates.lat !== null && this.state.coordinates.lng !== null)}
                      onClick={() => this.handleSearch()}>Search</button>
                  </div>


                </div>
              </div>
            </div>
          </div>
          <img src={asset + "images/accomodation-banner.png"} className='img-fluid' />
        </div>

        <div className="clp-category" style={{ transform: "translateY(10px)" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">

                {sub_categories && sub_categories !== undefined && sub_categories.length > 0 && (
                  <Carousel responsive={responsive}>
                    {sub_categories.map((item, index) => (
                      <div key={'item' + index} onClick={() => this.props.history.push("/products-list?category=" + item.category_name)} className="item">
                        <div className="c_box">
                          <div className="d-inline-flex align-items-center justify-content img-box edu">
                            <img src={item.category_image} className="img-fluid" /></div>
                          <h5>{item.category_name}</h5>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </div>



        {this.state.subCategoryproduct.map((sub_cat_id) =>

          // <SubcategoryDataCard
          //   pushPage={this.pushPage}
          //   dispatch={this.props.dispatch}
          //   getProductByCategoryData={this.getProductByCategoryData}
          //   user={user}
          //   sfid={sfid}
          //   category={sub_cat_id && sub_cat_id.title}
          //   productList={sub_cat_id && sub_cat_id.data}
          // />
          <section className="pt-lg-5 pb-lg-3 overflow-hidden laptop-catgory-block">
            <div className="container">
              <div className="row">
                <div className="col mb-2 laptops">
                  <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel"><h3 className="section_title mb-lg-4 mb-3">{sub_cat_id.title}</h3>
                    <a href={`products-list?category=${sub_cat_id.title}`} className="text-decoration-none fs-14 font-weight-bold d-block">View All <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a>
                  </div>
                  <Carousel responsive={responsive}>
                    {sub_cat_id.data.map((item, index) =>
                      <span className="our-presence">
                        <ProductBox
                          index={index}
                          item={item}
                          pushPage={this.props.pushPage}
                          dispatch={this.props.dispatch}
                          user={this.props.user}
                          sfid={this.props.sfid}
                          page={'accomodation'}
                        ></ProductBox>
                      </span>
                    )
                    }



                  </Carousel>
                </div>
              </div>
            </div>

          </section>
        )
        }




        {/* <OurPresence /> */}
        {/* <div className='container'>
          <div className='row'>
            <div className='col'>
              <h3 className="section_title mb-lg-4 mb-3">Offers (Save extra with 4 offers)</h3>
            </div>
          </div>
          <div className='row'>

            <div className='col-lg-4'>
              <div className='offer-box'>
                <div className='offer-text p-lg-5 p-4'>
                  <p className='mb-3'>#summeroffers</p>
                  <h4 className='mb-4'>30 Hotel Brands. Endless Experiences.</h4>
                  <button className='btn__ white radius50'>Check-in</button>
                </div>
                <img src="images/off02.jpg" className="img-fluid" />
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='offer-box'>
                <div className='offer-text p-lg-5 p-4'>
                  <p className='mb-3'>#summeroffers</p>
                  <h4 className='mb-4'>30 Hotel Brands. Endless Experiences.</h4>
                  <button className='btn__ white radius50'>Check-in</button>
                </div>
                <img src="images/off02.jpg" className="img-fluid" />
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='offer-box'>
                <div className='offer-text p-lg-5 p-4'>
                  <p className='mb-3'>#summeroffers</p>
                  <h4 className='mb-4'>30 Hotel Brands. Endless Experiences.</h4>
                  <button className='btn__ white radius50'>Check-in</button>
                </div>
                <img src="images/off02.jpg" className="img-fluid" />
              </div>
            </div>
          </div>
        </div> */}
        <div className='container'>
          <div className="row">
            <div className="col">
              <div className="card_best_deal d-flex align-items-center">
                <div className="pl-lg-5 col-sm-5">
                  <h4 className="mb-3">Start your learning experience with STRIDE CARD for best deals!</h4>
                  <button className="apply-btn small">Get Stride Card</button>
                </div>

                <div className="right-content">
                  <div className="figure3"><img src="images/card--.png" className="img-fluid" /></div>
                  <div className="figure2"><img src="images/figure.png" className="img-fluid" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h3 className="section_title mb-lg-4 mb-3">Stay Safe</h3>
            </div>
          </div>
          <div className='row mb-5'>

            <div className='col-lg-4'>
              <div className='stay-box color1 p-lg-5 p-4'>
                <div className='row align-items-center'>
                  <div className='col-lg-3'>
                    <img src="images/icons/city.png" className="img-fluid" />
                  </div>
                  <div className='col-lg-9'>
                    <p className='mb-0'>Many States Have Relaxed RT-PCR Test Requirments for travellers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='stay-box color2 p-lg-5 p-4'>
                <div className='row align-items-center'>
                  <div className='col-lg-3'>
                    <img src="images/icons/policy.png" className="img-fluid" />
                  </div>
                  <div className='col-lg-9'>
                    <p className='mb-0'>Many States Have Relaxed RT-PCR Test Requirments for travellers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='stay-box color3 p-lg-5 p-4'>
                <div className='row align-items-center'>
                  <div className='col-lg-3'>
                    <img src="images/icons/city.png" className="img-fluid" />
                  </div>
                  <div className='col-lg-9'>
                    <p className='mb-0'>Many States Have Relaxed RT-PCR Test Requirments for travellers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <RecentView
          recentProd={recentProd}
          sfid={sfid}
          user={user}
          pushPage={this.props.pushPage}
        />

        <div className='container'>
          <div className='row mb-5'>
            <div className='col-12'>
              <div className='app-store p-lg-5 p-4'>
                <div className='row justify-content-center'>
                  <div className='col-lg-10'>
                    <div className='row align-items-center'>
                      <div className='col-lg-4'>
                        <div className='text-center'>
                          <div className='qr-code mb-3'>
                            <img src="images/QR_code.jpg" className="img-fluid" />
                          </div>

                          <p className='mb-0'>Scan to download</p>
                        </div>

                      </div>
                      <div className='col-lg-8'>
                        <h3 className='mb-4'>Almost there!</h3>
                        <p className='mb-4'>You’re just inches away from getting personalized shopping, exclusive deals, and being able to shop and pay later  whatever you want.</p>

                        <div className="d-flex">
                          <button className="mr-2"><img src="../images/appstore.png" className="img-fluid" /></button>
                          <button><img src="../images/playstore.png" className="img-fluid" /></button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>



        {/* <TopBikeDeal/> */}
        {/* <TopDeal cat_id={3} />
        <FavouriteBrand />
        <ExploreMore category={3} history={this.props.history} />
        <StrideCard />
        <div className="py-5"></div>

        {this.state.allData.length > 0 &&
          this.state.category_bundle.map(sub_cat_id =>

            <CommonProducts
              pushPage={this.pushPage}
              dispatch={this.props.dispatch}
              getProductByCategoryData={this.getProductByCategoryData}
              user={user}
              sfid={sfid}
              productList={this.state.allData.find(obj => obj.category_id == sub_cat_id)}
            />

          )} */}

        {/* <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={14}
                card_name={"PG"}
            />
            <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={13}
                card_name={"Hostel"}
            /> */}




      </>
    );
  }
}

ClpPgHostel.propTypes = {
  ...propTypes,
  history: PropTypes.any,
  user: PropTypes.any,
  sfid: PropTypes.any,
  isSearching: PropTypes.bool,
  searchDet: PropTypes.bool,
  pushPage: PropTypes.func,
  sub_categories: PropTypes.any,
  recentProd: PropTypes.any,
}

function mapStateToProps(state) {
  const { showable_products } = state.product
  return {
    showable_products
  };
}

export default reduxForm({ form: 'CLP-PgHostel' })(connect(mapStateToProps)(ClpPgHostel));

