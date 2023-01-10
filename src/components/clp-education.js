import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import InstitutesNearYou from "../common/institutes-near-you";
import FavouriteBrand from "../common/favourite-brand"
import ExploreMore from "../common/explore-more"
import NewsArticle from "../common/news-article"
import RenderProductCard from "../common/render-product-card";
import { getProductByCategory, getRelatedCategory } from "../actions/user";
import { asset } from '../common/assets';
import {getBestDeals} from "../actions/product";
import {getProductsJSX} from "../helpers/DealLayoutGenerator";
import School from "../common/school";
import TopDeal from "../common/top-deal"
import CommonProducts from "../common/CommonProducts";
import {setShowableProducts} from '../actions/product'
import SubcategoryDataCard from "../common/SubcategoryDataCard";
import { connect } from 'react-redux'

class ClpEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      accountDet: null,
      products:[],
      allData: [],
      categoryData :[],
      subCategoryproduct :[],
      category_bundle: [12, 11, 10, 9] // category_bundle IS THE LIST OF SUB CATEGORIES OF PRODUCTS THAT ARE TO BE SHOWN ON HOME PAGE, ADD OTHER CATEGORIES ID AT CORRECT PLACE TO SHOW THAT LIST ALSO
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
    
    this.props.dispatch(getBestDeals()).then((response)=>{
      this.setState({products:response})
    });
    let data = { "category_id":"2" }
    await this.props.dispatch(getRelatedCategory(data)).then(res=>{
      if(res.responseCode == '200'){
        this.setState({
          categoryData : res && res.data && res.data.categorydata,
          subCategoryproduct : res && res.data && res.data.subCategoryproduct,
        })
      }
    });
  }

  pushPage = (url) => {
    this.props.pushPage(url);
  }
  getProductByCategoryData = (sub_category_id) => {
    window.scrollTo(0, 0)
    const { sfid } = this.props
    let data = {
      sub_category_id: sub_category_id,
      user_sfid: sfid
    }
    return this.props.dispatch(getProductByCategory(data)).then((response) => { return response });
  }

  render() {
    const { user, sfid, sub_categories,sub_category_id } = this.props;
    return (
      <>
        <Helmet>
          <title>Eduvanz | Education</title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <div className="clp pb-5">
          <div className="container">
            <div className='row pt-4'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="/" onClick={(e)=> {  e.preventDefault(); this.props.history.push('/')}}>Store</a></li>
                    <li>Education</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="clp-banner gradient">
                  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">

                    <ol className="carousel-indicators ban-pagination">
                      <li data-target="#carousel" data-slide-to="0" className="active">
                        <img src={asset+"images/banner/1.svg"} className='object-cover' />
                      </li>
                      <li data-target="#carousel" data-slide-to="1">
                        <img src={asset+"images/banner/2.svg"} className='object-cover' />
                      </li>
                      <li data-target="#carousel" data-slide-to="2">
                        <img src={asset+"images/banner/3.svg"} className='object-cover' />
                      </li>
                      <li data-target="#carousel" data-slide-to="3">
                        <img src={asset+"images/banner/4.svg"} className='object-cover' />
                      </li>
                    </ol>


                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item active">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">School</h3>
                                <h2 className="mb-4">Find the India’s top schools for your kid.</h2>
                                <button className="btn-continue"  onClick={()=>window.location="products-list?category=K-12"}>Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student1.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">Get the best laptops</h3>
                                <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student2.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">Get the best laptops</h3>
                                <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student1.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">Get the best laptops</h3>
                                <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student1.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* <a href="#carousel" className="carousel-control-prev" role="button" data-slide="prev">
			<span className="carousel-control-prev-icon" aria-hidden="true"></span>
			<span className="sr-only"></span>
		</a>
		<a href="#carousel" className="carousel-control-next" role="button" data-slide="next">
			<span className="carousel-control-next-icon" aria-hidden="true"></span>
			<span className="sr-only"></span>
		</a> */}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>


        <section className="bg0 pt-3 pb-5 overflow-hidden top-deal">
          <div className="container pl-3">
            <div className="row">
              <div className="col-12">
                <h3 className="section_title mb-lg-4 mb-2">Top Courses with Affordable EMIs</h3>
              </div>
              <div className="col-12  mb-3">
                <button className="st_v mb-4 selected rounded-pill">All</button>
                {sub_categories && sub_categories.length > 0 && sub_categories.map((item, index)=>(
                <button type="button" key={`cat-index-${index}`} onClick={() => this.props.history.push(`products-list?category=${item.category_name}`)} className='btn btn-light border-dark rounded-pill py-2 mr-2'>
                  {item.logo__c && (
                  <img style={{maxWidth: '27px'}} src={item.category_image} alt="pig" className="img-fluid" />
                  )}
                  <span className='ml-2'>{item.category_name}</span>
                </button>
                ))}
              </div>


              {/* <div className="col">
                <div className="topdeal_wrapper">
                  <ul className="d-flex topdeal educate list-unstyled">
                    {getProductsJSX(this.state.products)}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>


          <div className="container">
            <div className="col d-flex  justify-content-end">
              <div className="cont">
                {/* <p><input type="text" id="amount"/></p> */}
                <div id="slider-range-max2"></div>
              </div>
            </div>
          </div>
        </section>

        <TopDeal cat_id={2}/>

        <FavouriteBrand textName="Learn from your favourite provider" />
        <ExploreMore category={2} 
        user = {user}
          pushPage={this.pushPage}
          sfid={sfid}
          cateTextName= 'Browse by category'
          history={this.props.history}
        />
        <InstitutesNearYou univstNear ='Universities near you' />
        <section className="bg0 pt-5 overflow-hidden bestSeller">
          <div className="container">
            <div className="row justify-content-center px-3">
              <div className="col-sm-12   bg_GhostWhite educate">
                <div className="row align-items-center">
                  <div className="col-lg-6 text-center">
                    <div className="card_img position-relative py-3">
                      <img src={asset+"images/bag_1.png"} className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-6 stride_txt">
                    <div className="row">
                      <div className="col-sm-10">
                        <div className="py-lg-5 py-4 ">
                          <h3 className="text-primary">Find your <span className="text-primary">Course</span> & <br /> Achieve Your Goals</h3>
                          <p className="fs-20 text-primary">Connect to thousands of talented individuals from your Industry in few simple steps.</p>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="py-5"></div>


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
        {/* <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Trending courses"}
          category={9}
          user={user}
        />
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Test Preparation"}
          category={12}
          user={user}
        />
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"University Programs"}
          category={11}
          user={user}
        />
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Schools for Your Kids"}
          category={10}
          user={user}
        />
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Upskilling Courses"}
          category={9}
          user={user}
        /> */}


        <div className="container">
          <div className="row">
              <div className="bgMagnolia p-lg-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">See what students are saying about Us</h5>
                    </div>
                  </div>
                  <div className="row">
                                              
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>‘’Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li02.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Neel Doshi</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>‘’Good course show me how to stimulate my brain. Create a new habits and consistently maintain it over the time. learning new things makes my brain easily to adapt with any things. ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li03.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Ayushi Shah</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>‘’This course was AMAZING! I learned so much and will be putting my new knowledge to good personal use, as well as teaching others about what influences neurogenesis, and highly recommending this course to others!!”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li04.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Anjali Verma</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>‘’Scientific approach to sleep and dreaming. There were many AHA moments in the course especially in the dream and lucid dreaming sessions ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li04.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Saurabh Pandey</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <NewsArticle/>
      </>
    );
  }
}

ClpEducation.propTypes = {
  ...propTypes,
  history: PropTypes.any,
  user: PropTypes.any,
  sfid: PropTypes.any,
  isSearching: PropTypes.bool,
  searchDet: PropTypes.bool,
  pushPage: PropTypes.func,
  sub_categories: PropTypes.any,
}


function mapStateToProps(state) {
  const {showable_products } = state.product
  return {
    showable_products
  }; 
}

export default reduxForm({form: 'CLP-Education'})(connect(mapStateToProps)(ClpEducation));

