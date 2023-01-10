import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from 'react-redux'
import Slider from "../common/slider";
import Footer from "../common/footer";
import Categories from "../common/categories"
import ShopByStore from "../common/shop-by-store"
import BestSeller from "../common/best-seller"
import StrideCard from "../common/stride-card";
import ExploreMore from "../common/explore-more"
import AboutUs from "../common/about"
import FavouriteBrand from "../common/favourite-brand"
import TopDeal from "../common/top-deal"
// import ProductMobile from "../common/mobile"
// import ProductLaptop from "../common/Laptop"
// import ProductTablet from "../common/tablet"
// import ProductElectricBike from "../common/electric-bike"
// import ProductTelevision from "../common/television"
// import Upskilling from "../common/upskilling"
// import TestPreparation from "../common/test-preparation"
// import School from "../common/school"
// import HigherStudies from "../common/higher-studies"
import NewsArticle from "../common/news-article"
import HeaderNew from "../common/headerNew"
import { clearLocalStorage, getProductByCategory, getHomeData } from "../actions/user";
import {setShowableProducts} from '../actions/product'
import CommonProducts from "../common/CommonProducts";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      allData: [],
      category_bundle: [5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16] // category_bundle IS THE LIST OF SUB CATEGORIES OF PRODUCTS THAT ARE TO BE SHOWN ON HOME PAGE, ADD OTHER CATEGORIES ID AT CORRECT PLACE TO SHOW THAT LIST ALSO
    };

  }

  componentDidMount() {
    this.props.dispatch(clearLocalStorage());

    // this.props.dispatch(getHomeData()).then(response => {
    //   if (response.message = "success") {
    //     this.setState({ allData: response.data })
    //   }
    // })
    
    this.props.dispatch(setShowableProducts()).then(response => {
      if (response.message = "success") {
        this.setState({ allData: response.data })
      }
    })
    
  }

  pushPage = (url) => {
    this.props.history.push(url);
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
    const { user, username, isSearching, searchDet, sfid, favorite_count, category_id ,showable_products } = this.props;
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        {/* <Header
              user = {user}
            /> */}
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
          sfid={sfid}
          favorite_count={favorite_count}
          appUrl={this.props.appUrl}
        />
        <Slider />
        <Categories  history={this.props.history}/>
        <TopDeal  pushPage={this.pushPage}/>
        <FavouriteBrand />
        {/* <ShopByStore /> */}
        {/* <StrideCard /> */}
        <BestSeller
          pushPage={this.pushPage}
          dispatch={this.props.dispatch}
        />
        {/* <ExploreMore category={this.props.category_id}/> */}


        {/* ************   NEW COMPONENT    ************ */}

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
        
         )} 

        {/* ************    OLD COMPONENTS    ************ */}
        
        {/* <ProductLaptop 
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              getProductByCategoryData = {this.getProductByCategoryData}
              user = {user}
              sfid={sfid}
            /> 

            <ProductMobile 
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              getProductByCategoryData = {this.getProductByCategoryData}
              user = {user}
              sfid={sfid}
            />
            <ProductElectricBike 
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              sfid={sfid}
              user = {user}
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
            />
            <Upskilling
               pushPage = {this.pushPage}
               dispatch = {this.props.dispatch}
               sfid={sfid}
               user = {user}
               />
            <TestPreparation
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              sfid={sfid}
              user = {user}
              />
            <School
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              sfid={sfid}
              user = {user}
              />
            <HigherStudies
              pushPage = {this.pushPage}
              dispatch = {this.props.dispatch}
              sfid={sfid}
              user = {user}
              /> */}

        <NewsArticle
          dispatch={this.props.dispatch}
        />
        {/* <ProductCamera/> */}
        <AboutUs />


        {/* <Banner /> */}
        {/* <Product /> */}
        {/* <TopDeals /> */}
        {/* <Buying /> */}
        {/* <Client /> */}
        {/* <section className="bg0 p-t-23 p-b-30 bg-bule">
              <div className="container">
                <div className="row padd-common">
                  <div className="p-b-10 col-md-6">
                    <h3 className="ltext-103 cl5 p-b-30">Pay on the go, wherever you go</h3>
                    <p>
                      Download the Eduvanz app and discover a new way to pay over time
                      almost anywhere
                    </p>
                    <div className="app-bg">
                      <h6>Text me the app</h6>
                      <div className="row">
                        <div className="col-md-10">
                          <form>
                            <div className="form-group float-label-control">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                              />
                            </div>
                          </form>
                        </div>
                        <div className="col-md-2">
                          <a
                            href="#"
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                          >
                            <i className="lnr lnr-arrow-right-circle right-circle" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-b-10 col-md-6">
                    <img src="images/banner.png" className="w-100" />
                  </div>
                </div>
              </div>
            </section> */}
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { appUrl, user, sfid, username } = state.auth;
  const { isSearching, searchDet, favorite_count ,showable_products } = state.product
  return {
    favorite_count,
    isSearching,
    searchDet,
    username,
    appUrl,
    user,
    sfid,
    showable_products
  };
}

export default connect(mapStateToProps)(Home);
