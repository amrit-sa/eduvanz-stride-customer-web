import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import HeaderNew from '../common/headerNew';



class ProductsListing extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
        }
    }



    componentDidMount(){ }


    render() {
        
        return (
            <>
            <HeaderNew/>
            <div className='inner-page'>
               <div className='container'>
                   <div className='row'>
                       <div className='col mb-2'>
                           <h5>Results found for "College"</h5>
                       </div>
                   </div>
                   <div className='row'>
                       <div className='col'>
                           <ul className='search_filter_options'>
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
                                    <button>All Filters <i className="fa fa-sliders" aria-hidden="true"></i></button>
                                </li>
                                <li>
                                    <button>Compare</button>
                                </li>
                            </ul>
                       </div>
                   </div>
                   <div className='row'>
                       <div className='col'>
                       <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                            <label className="switch mb-0">
                                <input type="checkbox" name="expandAll"/>
                                <span className="slider round"></span>
                            </label>
                            <p className='mb-1 ml-2'>No Cost EMI</p>
                        </div>
                       </div>
                   </div>
                   <div className='row mb-4'>
                       <div className='col'>
                           <h5 className='show_number_of_item'>Showing 25 of 78</h5>
                       </div>
                   </div>

                   <div className='row'>
                        <div className='col-sm-4'>
                            <div className='search-result-box mb-4'>
                                <div className='img-box'>
                                    <div className='position-absolute seller_tag'>
                                        Bestseller
                                    </div>
                                    <img src="images/university.jpg" alt="" className='img-fluid'/>
                                </div>
                                <div className='d-flex mt-3 justify-content-between px-3'>
                                    <div>
                                        <h5>Narsee Monjee College of Commerce &amp; Economics</h5>
                                        <p className='p1'><span><img src="images/education-icon.png" alt="" className='img-fluid'/></span>Affilated by Mumbai University</p>
                                    </div>
                                    <div className='diploma-icon ml-3'>
                                        <img src="images/diploma.png" alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div className='price-width-discount'>
                                            <p className='mb-0 p2'>Stride Price</p>
                                            <span className='current-price'>₹81,990</span> <span className='previous-price'>₹89,990</span> 
                                        </div>
                                        <div className='discount ml-2 border-left pl-2'>
                                            <span className='d-block'>30%</span>OFF
                                        </div>
                                    </div>
                                    <div className='wishlist'>
                                        <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='search-result-box mb-4'>
                                <div className='img-box'>
                                    <div className='position-absolute seller_tag'>
                                        Bestseller
                                    </div>
                                    <img src="images/university.jpg" alt="" className='img-fluid'/>
                                </div>
                                <div className='d-flex mt-3 justify-content-between px-3'>
                                    <div>
                                        <h5>Narsee Monjee College of Commerce &amp; Economics</h5>
                                        <p className='p1'><span><img src="images/education-icon.png" alt="" className='img-fluid'/></span>Affilated by Mumbai University</p>
                                    </div>
                                    <div className='diploma-icon ml-3'>
                                        <img src="images/diploma.png" alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div className='price-width-discount'>
                                            <p className='mb-0 p2'>Stride Price</p>
                                            <span className='current-price'>₹81,990</span> <span className='previous-price'>₹89,990</span> 
                                        </div>
                                        <div className='discount ml-2 border-left pl-2'>
                                            <span className='d-block'>30%</span>OFF
                                        </div>
                                    </div>
                                    <div className='wishlist'>
                                        <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                </div>
                             </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='search-result-box mb-4'>
                                <div className='img-box'>
                                    <div className='position-absolute seller_tag'>
                                        Bestseller
                                    </div>
                                    <img src="images/university.jpg" alt="" className='img-fluid'/>
                                </div>
                                <div className='d-flex mt-3 justify-content-between px-3'>
                                    <div>
                                        <h5>Narsee Monjee College of Commerce &amp; Economics</h5>
                                        <p className='p1'><span><img src="images/education-icon.png" alt="" className='img-fluid'/></span>Affilated by Mumbai University</p>
                                    </div>
                                    <div className='diploma-icon ml-3'>
                                        <img src="images/diploma.png" alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div className='price-width-discount'>
                                            <p className='mb-0 p2'>Stride Price</p>
                                            <span className='current-price'>₹81,990</span> <span className='previous-price'>₹89,990</span> 
                                        </div>
                                        <div className='discount ml-2 border-left pl-2'>
                                            <span className='d-block'>30%</span>OFF
                                        </div>
                                    </div>
                                    <div className='wishlist'>
                                        <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>

                        <div className='col-sm-4'>
                            <div className='search-result-box mb-4'>
                                <div className='img-box'>
                                    <div className='position-absolute seller_tag'>
                                        Bestseller
                                    </div>
                                    <img src="images/university.jpg" alt="" className='img-fluid'/>
                                </div>
                                <div className='d-flex mt-3 justify-content-between px-3'>
                                    <div>
                                        <h5>Narsee Monjee College of Commerce &amp; Economics</h5>
                                        <p className='p1'><span><img src="images/education-icon.png" alt="" className='img-fluid'/></span>Affilated by Mumbai University</p>
                                    </div>
                                    <div className='diploma-icon ml-3'>
                                        <img src="images/diploma.png" alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div className='price-width-discount'>
                                            <p className='mb-0 p2'>Stride Price</p>
                                            <span className='current-price'>₹81,990</span> <span className='previous-price'>₹89,990</span> 
                                        </div>
                                        <div className='discount ml-2 border-left pl-2'>
                                            <span className='d-block'>30%</span>OFF
                                        </div>
                                    </div>
                                    <div className='wishlist'>
                                        <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='search-result-box mb-4'>
                                <div className='img-box'>
                                    <div className='position-absolute seller_tag'>
                                        Bestseller
                                    </div>
                                    <img src="images/university.jpg" alt="" className='img-fluid'/>
                                </div>
                                <div className='d-flex mt-3 justify-content-between px-3'>
                                    <div>
                                        <h5>Narsee Monjee College of Commerce &amp; Economics</h5>
                                        <p className='p1'><span><img src="images/education-icon.png" alt="" className='img-fluid'/></span>Affilated by Mumbai University</p>
                                    </div>
                                    <div className='diploma-icon ml-3'>
                                        <img src="images/diploma.png" alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div className='price-width-discount'>
                                            <p className='mb-0 p2'>Stride Price</p>
                                            <span className='current-price'>₹81,990</span> <span className='previous-price'>₹89,990</span> 
                                        </div>
                                        <div className='discount ml-2 border-left pl-2'>
                                            <span className='d-block'>30%</span>OFF
                                        </div>
                                    </div>
                                    <div className='wishlist'>
                                        <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            <div className='search-result-box mb-4'>
                                <div className='img-box'>
                                    <div className='position-absolute seller_tag'>
                                        Bestseller
                                    </div>
                                    <img src="images/university.jpg" alt="" className='img-fluid'/>
                                </div>
                                <div className='d-flex mt-3 justify-content-between px-3'>
                                    <div>
                                        <h5>Narsee Monjee College of Commerce &amp; Economics</h5>
                                        <p className='p1'><span><img src="images/education-icon.png" alt="" className='img-fluid'/></span>Affilated by Mumbai University</p>
                                    </div>
                                    <div className='diploma-icon ml-3'>
                                        <img src="images/diploma.png" alt="" className='img-fluid'/>
                                    </div>
                                </div>
                                <div className='px-3 pb-3'>
                                <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <div className='price-width-discount'>
                                            <p className='mb-0 p2'>Stride Price</p>
                                            <span className='current-price'>₹81,990</span> <span className='previous-price'>₹89,990</span> 
                                        </div>
                                        <div className='discount ml-2 border-left pl-2'>
                                            <span className='d-block'>30%</span>OFF
                                        </div>
                                    </div>
                                    <div className='wishlist'>
                                        <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                </div>
                             </div>
                        </div>
                        
                   </div>
               </div>
            </div>
            </>
        )
    }
}

const mapSTP = state => {
    return {currentUser: state.currentUser}
}

export default connect(mapSTP)(ProductsListing)