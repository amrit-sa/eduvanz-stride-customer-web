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
import RecentView from "../common/recent-view"
import TopDeal from "../common/top-deal"
import CommonProducts from "../common/CommonProducts";
import { setShowableProducts } from '../actions/product'
import SubcategoryDataCard from "../common/SubcategoryDataCard";
import { connect } from 'react-redux'

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

class ClpVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      accountDet: null,
      allData: [],
      categoryData: [],
      subCategoryproduct: [],
      category_bundle: [16, 15] // category_bundle IS THE LIST OF SUB CATEGORIES OF PRODUCTS THAT ARE TO BE SHOWN ON HOME PAGE, ADD OTHER CATEGORIES ID AT CORRECT PLACE TO SHOW THAT LIST ALSO  
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

    let data = { "category_id": 4 }
    await this.props.dispatch(getRelatedCategory(data)).then(res => {
      if (res.responseCode == '200') {
        this.setState({
          categoryData: res && res.data && res.data.categorydata,
          subCategoryproduct: res && res.data && res.data.subCategoryproduct,
        })
      }
    });;;
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

    return (
        <>
            <Helmet>
              <title>Vehicle</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            <div className="clp">
            <div className="container">
                <div className='row pt-4'>
                        <div className='col-lg-12'>
                            <div className='breadCrumb_wrapper'>
                                <ul className="breadcrumb_menu d-flex flex-wrap">
                                    <li><a href="#">Store</a></li>
                                    <li>Auto-mobile</li>
                                </ul>
                            </div>
                        </div>
                 </div>
                    <div className='row auto-mobile-bg'>
                        <div className='col-lg-12'>
                            <div className="clp-banner yellow banner_static">
                                <div className="caption">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="">
                                            <h3 className="font-weight-normal">Ride your favorite bike</h3>
                                            <h2 className="mb-4">No Cost EMI starting ₹2,200</h2>
                                            <button onClick={() => window.location = "products-list?category=Petrol"} className="btn-continue">Explore Now</button>
                                            </div>
                                            
                                        </div>
                                        <div className="col-lg-6">
                                        <img src={asset+"images/bike.png"} className='object-cover'/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </div>
            </div>

        <div className="clp-category clp-wheeler">
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

        <TopDeal cat_id={4} />
        {/* <TopBikeDeal/> */}
        <FavouriteBrand />
        <ExploreMore category={4}
          user={user}
          pushPage={this.pushPage}
          sfid={sfid}
          history={this.props.history} />
        <StrideCard />
        <div className="py-5"></div>
        {this.state.subCategoryproduct.map(sub_cat_id =>

          <SubcategoryDataCard
            pushPage={this.pushPage}
            dispatch={this.props.dispatch}
            getProductByCategoryData={this.getProductByCategoryData}
            user={user}
            sfid={sfid}
            category={sub_cat_id && sub_cat_id.title}
            productList={sub_cat_id && sub_cat_id.data}
          />

        )}

        {/* {this.state.allData.length > 0 &&
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
                category={16}
                card_name={"Go Green with Electric Bikes"}
            />
                <RenderProduct
                    pushPage = {this.pushPage}
                    getProductByCategoryData = {this.getProductByCategoryData}
                    user = {user}
                    sfid={sfid}
                    category={15}
                    card_name={"Top Picks in Petrol Bikes"}
                /> */}




        {/* <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={16}
                card_name={"Best Deals on Electric Scooters"}
            /> */}
        {/* <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={16}
                card_name={"Best Deals Petrol Scooters"}
            /> */}
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

ClpVehicles.propTypes = {
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
export default reduxForm({ form: 'CLP-Vehicles' })(connect(mapStateToProps)(ClpVehicles));

