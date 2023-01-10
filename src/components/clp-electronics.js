import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import TopDeal from "../common/top-deal"
import FavouriteBrand from "../common/favourite-brand"
import ExploreMore from "../common/explore-more"
import StrideCard from "../common/stride-card";
import ProductMobile from "../common/mobile"
import ProductLaptop from "../common/Laptop"
import ProductTablet from "../common/tablet"
import { asset } from '../common/assets';
import ProductTelevision from "../common/television"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, getRelatedCategory, getViewedProduct, } from "../actions/user";
import RecentView from "../common/recent-view"
import CommonProducts from "../common/CommonProducts";
import {setShowableProducts} from '../actions/product'
import { connect } from 'react-redux'
import SubcategoryDataCard from "../common/SubcategoryDataCard";

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

class ClpElectronics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      accountDet: null,
      allData: [],
      categoryData :[],
      subCategoryproduct :[],
      category_bundle: [5, 6, 7, 8] // category_bundle IS THE LIST OF SUB CATEGORIES OF PRODUCTS THAT ARE TO BE SHOWN ON HOME PAGE, ADD OTHER CATEGORIES ID AT CORRECT PLACE TO SHOW THAT LIST ALSO
    };
  }

  async componentDidMount() {
    const {showable_products} = this.props;
    if(showable_products && showable_products.length == 0){

      this.props.dispatch(setShowableProducts()).then(response => {
        if (response.message = "success") {
          this.setState({ allData: response.data })
        }
      })
    }else{
      this.setState({allData:showable_products})
    }


    let data = { "category_id": "1" }
    await this.props.dispatch(getRelatedCategory(data)).then(res=>{
      if(res.responseCode == '200'){
        this.setState({
          categoryData : res && res.data && res.data.categorydata,
          subCategoryproduct : res && res.data && res.data.subCategoryproduct,
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

  selectCateg = (subCategory) => {
    // this.props.navigateTo(subCategory.category_name)
    this.props.history.push("products-list?category="+subCategory.category_name)
    // window.location = "products-list?category=" + subCategory.category_name
  }



  render() {
    const { user, sfid, sub_categories, recentProd ,showable_products} = this.props;
   // console.log("this.state.allDatathis.state.allDatathis.state.allData",JSON.stringify(this.state.allData),this.state.category_bundle)
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
                    <li><a href="/" onClick={(e)=>{  e.preventDefault(); this.props.history.push('/')}}>Store</a></li>
                    <li>Electronics</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="clp-banner sky banner_static">
                  <div className="caption">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="pl-lg-5 ml-4">
                          <h3 className="font-weight-normal">Get the best laptops</h3>
                          <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                          <button onClick={() => window.location = "products-list?category=Laptop"} className="btn-continue">Explore Now</button>
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <img src={asset + "images/lap.png"} className='object-cover' />
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
              <div className="col-lg-10 category_carousel">
                {sub_categories && sub_categories !== undefined && sub_categories.length > 0 && (
                  <Carousel responsive={responsive}>
                    {sub_categories.map((item, index) => (
                      //  <div key={'item'+index} onClick={()=> window.location = "/products-list?category="+item.category_name} className="item">
                      <div key={'item' + index} onClick={() => this.selectCateg(item)} className="item">
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


        <TopDeal cat_id={1} />
        <FavouriteBrand />
        <ExploreMore category={1} 
        user = {user}
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
              category = {sub_cat_id && sub_cat_id.title}
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


        {/* <ProductLaptop 
              pushPage = {this.pushPage}
              getProductByCategoryData = {this.getProductByCategoryData}
              dispatch = {this.props.dispatch}
              user = {user}
              sfid={sfid}
            />
            <ProductMobile 
              pushPage = {this.pushPage}
              getProductByCategoryData = {this.getProductByCategoryData}
              dispatch = {this.props.dispatch}
              user = {user}
              sfid={sfid}
            />
            <ProductTelevision
               pushPage = {this.pushPage}
               dispatch = {this.props.dispatch}
               sfid={sfid}
               user = {user}
            />
            <ProductTablet
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              sfid={sfid}
              user = {user}
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

ClpElectronics.propTypes = {
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

function mapStateToProps(state) {
  const {showable_products } = state.product
  return {
    showable_products
  };
}

export default reduxForm({ form: 'CLP-Electronics' })(connect(mapStateToProps)(ClpElectronics));


