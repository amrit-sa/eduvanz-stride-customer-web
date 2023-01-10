import React, { Component } from 'react'
import $ from 'jquery';
import Helmet from "react-helmet";
import RecentView from '../common/recent-view'
import SimilarProduct from "../common/similar-product";
import HeaderNew from '../common/headerNew';
import AboutUs from "../common/about"
import {connect} from "react-redux";

class QuickFilter extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isCompareEnable: false,
            selectedBrand: [],
        }
        
    }

     componentDidMount() {

          
            $('.filter_accordion').eq(0).children('.content').show()
            $('.filter_accordion .tab').click(function () {
            $(this).parent().siblings().children('.tab').removeClass('show');
            $(this).addClass('show')
            $(this).parent().siblings().children('.content').slideUp();
            $(this).next().slideToggle();
        })

    }



    render() {
        const { user, username, isSearching, searchDet, sfid, favorite_count } = this.props;
        const { isCompareEnable} = this.state
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Laptop </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <HeaderNew
                username = {username?username:''}
                user = {user?user:''}
                history = {this.props.history}
                isSearching = {isSearching}
                searchDet = {searchDet}
                sfid={sfid}
                favorite_count={favorite_count}
                />
                
                <div className="pdesc-banner before-d-none">
                    <div className="inner-page">
                        <div className="container banner-content">
                            <div className='row mx-0'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            <li><a href="#">Electronics</a></li>
                                            <li>Laptop</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-around mt-lg-4">
                                <div className="col-lg-4">
                                    <h2 className="mt-4">Laptop</h2>
                                    <p className="mt-3">One stop shop for all your <br /> laptop needs </p>
                                    <div className="search___ mt-lg-5">
                                        <input
                                            name='sub_search'
                                            placeholder='Search for the laptop that suits you' />
                                            <button className='bg-transparent'>
                                                <i className="fa fa-search" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                <div className="col-lg-5">&nbsp;</div>
                            </div>
                        </div>
                        <img src="images/unrecognizable.jpg" alt="upgard" className="img-fluid" />
                    </div>

                </div>
                {/* banner */}
                <div className='inner-page'>
                    <div className='container'>
                        <div className='row mb-4'>
                            <div className='col-12'>
                                <img src="images/add-asus.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add01.jpg" alt="" className="img-fluid" />
                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add02.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add03.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add04.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-4 mb-5'>
                            <div className='col d-flex flex-wrap'>
                                <ul className='search_filter_options m-0'>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                EMI
                                            </button>
                                            <div className="dropdown-menu price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                                <div className='d-flex'>
                                                    <p className='at'>Amount</p>
                                                    <div className='price-box'><input type="text" id="amount" readOnly /></div>
                                                </div>
                                                <div id="slider-range"></div>
                                                <ul className='r_l d-flex justify-content-between mt-2'>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                                <ul className='r_l_t d-flex justify-content-between mt-2'>
                                                    <li>1000 <span>Min</span></li>
                                                    <li>15000</li>
                                                    <li className='text-right'>30000<span>Max</span></li>
                                                </ul>
                                                <div className='text-right mt-3'>
                                                    <button className='apply-btn ml-3'>Apply</button>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Level
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Price
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Brand
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button data-toggle="modal" data-target="#myModal2">All Filters <i className="fa fa-sliders" aria-hidden="true"></i></button>
                                    </li>
                                    <li>
                                        <button type='button' className={`${isCompareEnable?"active-btn":""}`}>Compare</button>
                                    </li>
                                </ul>
                                <div className='ml-auto d-flex justify-content-end align-items-center'>
                                    <label className="switch mb-0">
                                        <input type="checkbox" name="expandAll" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p className='mb-1 ml-2'>No Cost EMI</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className='row mb-5'>
                            <div className='col d-flex justify-content-between selected-items-row py-3'>
                                <div className='d-flex align-items-center'>
                                    <p className='m-0 si_b mr-3'>items selected</p>
                                    <ul className='m-0 selected-prod d-flex flex-wrap'>
                                        <li>
                                                <img src="images/mac-book.png" alt="upgard" className="img-fluid"/>  
                                            </li>
                                    </ul>
                                </div>

                                <div>
                                    <button type='button' onClick={this.handleCompare} className='apply-btn'>Compare Products</button>
                                        <button type='button' onClick={this.handleClearCompare} className='ml-3'><img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid"/></button>
                                </div>
                            
                            </div>
                        </div> */}

                      
                        <div className='row mb-4 mx-0'>
                            <div className='col'>
                                <h5 className='show_number_of_item'>Showing 25 of 78</h5>
                            </div>
                        </div>

                        <div className='row mb-4'>
                            <div className='col-lg-3 col-md-4 cursor-point'>
                                    <div className='search-result-box mb-4'>
                                        <div className='img-box mb-4 noverlay'>
                                        <div className='position-absolute seller_tag blue'>
                                            Bestseller
                                        </div>
                                            <img src="images/products/lap-01.png" alt="" className='img-fluid' />
                                            </div>
                                                <div className='px-3 pb-3'>
                                                    <div>
                                                        <p>Dell XPS 9500 15.6 inches FHD Laptop (10th Gen...</p>
                                                        <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex'>
                                                            <div className='price-width-discount'>
                                                                <p className='mb-0 p2'>Stride Price</p>
                                                                <span className='current-price'>₹</span> <span className='previous-price'>₹89,990</span>
                                                            </div>
                                                            <div className='discount ml-2 border-left pl-2'>
                                                                <span className='d-block'>30%</span>OFF
                                                            </div>
                                                        </div>
                                                        <div className='wishlist'>
                                                            <button type='button'><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                            </div>
                            <div className='col-lg-3 col-md-4 cursor-point'>
                                    <div className='search-result-box mb-4'>
                                        <div className='img-box mb-4 noverlay'>
                                        <div className='position-absolute seller_tag blue'>
                                            Bestseller
                                        </div>
                                            <img src="images/products/lap-01.png" alt="" className='img-fluid' />
                                            </div>
                                                <div className='px-3 pb-3'>
                                                    <div>
                                                        <p>Dell XPS 9500 15.6 inches FHD Laptop (10th Gen...</p>
                                                        <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex'>
                                                            <div className='price-width-discount'>
                                                                <p className='mb-0 p2'>Stride Price</p>
                                                                <span className='current-price'>₹</span> <span className='previous-price'>₹89,990</span>
                                                            </div>
                                                            <div className='discount ml-2 border-left pl-2'>
                                                                <span className='d-block'>30%</span>OFF
                                                            </div>
                                                        </div>
                                                        <div className='wishlist'>
                                                            <button type='button'><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                            </div>
                            <div className='col-lg-3 col-md-4 cursor-point'>
                                    <div className='search-result-box mb-4'>
                                        <div className='img-box mb-4 noverlay'>
                                        <div className='position-absolute seller_tag blue'>
                                            Bestseller
                                        </div>
                                            <img src="images/products/lap-01.png" alt="" className='img-fluid' />
                                            </div>
                                                <div className='px-3 pb-3'>
                                                    <div>
                                                        <p>Dell XPS 9500 15.6 inches FHD Laptop (10th Gen...</p>
                                                        <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex'>
                                                            <div className='price-width-discount'>
                                                                <p className='mb-0 p2'>Stride Price</p>
                                                                <span className='current-price'>₹</span> <span className='previous-price'>₹89,990</span>
                                                            </div>
                                                            <div className='discount ml-2 border-left pl-2'>
                                                                <span className='d-block'>30%</span>OFF
                                                            </div>
                                                        </div>
                                                        <div className='wishlist'>
                                                            <button type='button'><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                            </div>
                            <div className='col-lg-3  col-md-4 cursor-point'>
                                    <div className='search-result-box mb-4'>
                                        <div className='img-box mb-4 noverlay'>
                                        <div className='position-absolute seller_tag blue'>
                                            Bestseller
                                        </div>
                                            <img src="images/products/lap-01.png" alt="" className='img-fluid' />
                                            </div>
                                                <div className='px-3 pb-3'>
                                                    <div>
                                                        <p>Dell XPS 9500 15.6 inches FHD Laptop (10th Gen...</p>
                                                        <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex'>
                                                            <div className='price-width-discount'>
                                                                <p className='mb-0 p2'>Stride Price</p>
                                                                <span className='current-price'>₹</span> <span className='previous-price'>₹89,990</span>
                                                            </div>
                                                            <div className='discount ml-2 border-left pl-2'>
                                                                <span className='d-block'>30%</span>OFF
                                                            </div>
                                                        </div>
                                                        <div className='wishlist'>
                                                            <button type='button'><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                            </div>
                        </div>

                        <div className='row mb-4'>
                            <div className='col-12 text-center'>
                                <h5>Show More</h5>
                                <button className='show-more'>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </button>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                </div>
                <SimilarProduct/>
                <RecentView/>
                
               <AboutUs/> 
               
                
                <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog filter_all" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4>Filters</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                <div className="filter_accordion_wrap">
                                    <div className="filter_accordion">
                                        <div className="tab">EMI</div>
                                        <div className="content">
                                            <div className="price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                                <div className='d-flex'>
                                                    <p className='at'>Amount</p>
                                                    <div className='price-box'>
                                                        <input type="text" id="priceAmount" readOnly /></div>
                                                </div>
                                                <div id="price-range"></div>
                                                <ul className='r_l d-flex justify-content-between mt-2'>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                                <ul className='r_l_t d-flex justify-content-between mt-2'>
                                                    <li>1000 <span>Min</span></li>
                                                    <li>15000</li>
                                                    <li className='text-right'>30000<span>Max</span></li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Price</div>
                                        <div className="content">Dimension and Weight</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Brands</div>
                                        {this.props.category_brands && this.props.category_brands.length > 0 && this.props.category_brands.map((item, index) =>(
                                            <a key={`brand-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id={`drop-${index}`} onChange={ e =>this.onBrandSelect(e, item.sfid)} value={item.sfid} defaultChecked={this.state.selectedBrand.includes(item.sfid)} />
                                                    <label className="custom-control-label" htmlFor={`drop-${index}`}>{item.name}</label>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Processor</div>
                                        <div className="content">Chassis and Suspension</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Color</div>
                                        <div className="content">Braking</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Display Size</div>
                                        <div className="content">Wheel and Tyres</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">ROM</div>
                                        <div className="content">Wheel and Tyres</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">RAM</div>
                                        <div className="content">Wheel and Tyres</div>
                                    </div>
                                </div>
                                <div className='text-right mt-3'>
                                    <button className='link'>Clear All</button>
                                    <button className='apply-btn ml-3'>Apply</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}


function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, favorite_count, sub_categories, category_brands } = state.product
    const { similarProd, recentProd } = state.user
    return {
        category_brands,
        favorite_count,
        sub_categories,
        similarProd,
        isSearching,
        recentProd,
        isLoading,
        searchDet,
        username,
        user,
        sfid
    };
}

export default connect(mapStateToProps)(QuickFilter);
