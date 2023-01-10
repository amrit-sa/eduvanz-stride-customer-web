import React, { Component } from 'react'
import $ from "jquery"
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import AboutUs from "../../common/about"
import Footer from "../../common/footer";
import HeaderNew from "../../common/headerNew"
import NewsArticle from "../../common/news-article"


class Accomodation3 extends React.Component {


  componentDidMount(){
    $('.filter_accordion').eq(0).children('.content').show()
    $('.filter_accordion .tab').click(function(){
        $(this).parent().siblings().children('.tab').removeClass('show');
        $(this).addClass('show')
        $(this).parent().siblings().children('.content').slideUp();
        $(this).next().slideToggle();
      })
  }


    render() {
      const { user, username, isSearching, searchDet } = this.props;
      return<>
      
      <Helmet>
          <title>Accomodation 3</title>
      </Helmet>
      <HeaderNew
          username = {username?username:''}
          user = {user?user:''}
          history = {this.props.history}
          isSearching = {isSearching}
          searchDet = {searchDet}
      />
       <div className='accomodation-banner mb-5'>
       <div className='accomodation-banner-caption'>
                <div className='row align-items-center justify-content-center'>
                        <div className='col-lg-9'>
                          <h1 className='text-white text-center mb-4'>Discover Your Life. <br/>Travel Where You Want</h1>
                          <p className='text-white text-center'>Plan &amp; book your perfect trip with travel tips, destination and inspiration from us </p>

                          <div className='accomodation-search-box px-4 py-3 mt-4 dsds'>
                              <div className='row align-items-center'>
                                <div className='col-lg-3 px-lg-4 bdr'>
                                  <label className='font-weight-semibold mb-0'>Location</label>
                                  <input type="text" placeholder='location' className=''/>
                                </div>
                                <div className='col-lg-4 px-lg-4 bdr'>
                                <label className='font-weight-semibold mb-0'>Move in</label>
                                  <input type="text" placeholder='Add dates' className=''/>
                                </div>
                                <div className='col-lg-5 px-lg-4'>
                                    <div className='row align-items-center'>
                                      <div className='col-lg-6'>
                                      <label className='font-weight-semibold mb-0'>Move in</label>
                                        <input type="text" placeholder='Add Durations' className=''/>
                                      </div>
                                      <div className='col-lg-6'>
                                          <button type='button' className='pay-btn w-100'>Search</button>
                                      </div>
                                    </div>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
                    <img src="../images/accomodation3.jpg" className='img-fluid'/>
      </div>

      <div className='container'>
          <div className='row'>
            <div className='col-12'>
                <h2 className='section_title mb-lg-4 mb-3'>Your Second home in Pune</h2>
            </div>
          </div>
          <div className='d-flex justify-content-between mb-4'>
              <div className=''>
                  <h5 className='show_number_of_item'>Showing 25 of 78</h5>
              </div>
              <div  className='list-view-options'>
                  <button className='lvo-btn selected'>
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.91668 16.7708H4.3125C5.37104 16.7708 6.22918 17.629 6.22918 18.6875V21.0833C6.22918 22.1419 5.37104 23 4.3125 23H1.91668C0.858143 23 0 22.1419 0 21.0833V18.6875C0 17.629 0.858143 16.7708 1.91668 16.7708Z" fill="black"/>
                    <path d="M18.6862 16.7708H21.082C22.1406 16.7708 22.9987 17.629 22.9987 18.6875V21.0833C22.9987 22.1419 22.1406 23 21.082 23H18.6862C17.6277 23 16.7695 22.1419 16.7695 21.0833V18.6875C16.7695 17.629 17.6277 16.7708 18.6862 16.7708Z" fill="black"/>
                    <path d="M1.91668 8.38544H4.3125C5.37104 8.38544 6.22918 9.24358 6.22918 10.3021V12.6979C6.22918 13.7565 5.37104 14.6146 4.3125 14.6146H1.91668C0.858143 14.6146 0 13.7565 0 12.6979V10.3021C0 9.24353 0.858143 8.38544 1.91668 8.38544Z" fill="black"/>
                    <path d="M18.6862 8.38544H21.082C22.1406 8.38544 22.9987 9.24358 22.9987 10.3021V12.6979C22.9987 13.7565 22.1406 14.6146 21.082 14.6146H18.6862C17.6277 14.6146 16.7695 13.7565 16.7695 12.6979V10.3021C16.7695 9.24353 17.6277 8.38544 18.6862 8.38544Z" fill="black"/>
                    <path d="M1.91668 0H4.3125C5.37104 0 6.22918 0.858143 6.22918 1.91668V4.3125C6.22918 5.37104 5.37104 6.22918 4.3125 6.22918H1.91668C0.858143 6.22918 0 5.37104 0 4.3125V1.91668C0 0.858143 0.858143 0 1.91668 0Z" fill="black"/>
                    <path d="M10.3034 16.7708H12.6992C13.7578 16.7708 14.6159 17.629 14.6159 18.6875V21.0833C14.6159 22.1419 13.7578 23 12.6992 23H10.3034C9.24486 23 8.38672 22.1419 8.38672 21.0833V18.6875C8.38676 17.629 9.24486 16.7708 10.3034 16.7708Z" fill="black"/>
                    <path d="M10.3034 8.38544H12.6992C13.7578 8.38544 14.6159 9.24358 14.6159 10.3021V12.6979C14.6159 13.7565 13.7578 14.6146 12.6992 14.6146H10.3034C9.24486 14.6146 8.38672 13.7565 8.38672 12.6979V10.3021C8.38676 9.24353 9.24486 8.38544 10.3034 8.38544Z" fill="black"/>
                    <path d="M10.3034 0H12.6992C13.7578 0 14.6159 0.858143 14.6159 1.91668V4.3125C14.6159 5.37104 13.7578 6.22918 12.6992 6.22918H10.3034C9.24486 6.22918 8.38672 5.37104 8.38672 4.3125V1.91668C8.38676 0.858143 9.24486 0 10.3034 0Z" fill="black"/>
                    <path d="M18.6862 0H21.082C22.1406 0 22.9987 0.858143 22.9987 1.91668V4.3125C22.9987 5.37104 22.1406 6.22918 21.082 6.22918H18.6862C17.6277 6.22918 16.7695 5.37104 16.7695 4.3125V1.91668C16.7695 0.858143 17.6277 0 18.6862 0Z" fill="black"/>
                  </svg>
                  </button>
                  <button className='lvo-btn ml-4'>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5001 11.5C12.2582 11.5 12.9994 11.2752 13.6298 10.854C14.2601 10.4328 14.7515 9.83407 15.0416 9.13362C15.3317 8.43317 15.4077 7.66241 15.2597 6.91882C15.1118 6.17522 14.7467 5.49219 14.2106 4.95609C13.6745 4.41999 12.9915 4.0549 12.2479 3.90699C11.5043 3.75908 10.7336 3.83499 10.0331 4.12513C9.33266 4.41526 8.73397 4.90659 8.31276 5.53698C7.89155 6.16737 7.66673 6.9085 7.66673 7.66666C7.66673 8.68333 8.0706 9.65835 8.78949 10.3772C9.50838 11.0961 10.4834 11.5 11.5001 11.5ZM11.5001 5.75C11.8791 5.75 12.2497 5.86241 12.5649 6.07301C12.8801 6.28362 13.1258 6.58296 13.2708 6.93319C13.4159 7.28341 13.4539 7.66879 13.3799 8.04059C13.306 8.41238 13.1234 8.7539 12.8554 9.02195C12.5873 9.29 12.2458 9.47255 11.874 9.5465C11.5022 9.62046 11.1168 9.5825 10.7666 9.43743C10.4164 9.29237 10.117 9.0467 9.90641 8.73151C9.69581 8.41631 9.5834 8.04574 9.5834 7.66666C9.5834 7.15833 9.78533 6.67082 10.1448 6.31138C10.5042 5.95193 10.9917 5.75 11.5001 5.75ZM19.7992 8.77546L19.1102 8.54641C19.2342 7.47301 19.1299 6.38551 18.8041 5.35525C18.4783 4.32498 17.9385 3.37521 17.2199 2.56823C16.5013 1.76124 15.6203 1.11527 14.6345 0.672667C13.6488 0.230064 12.5806 0.000831336 11.5001 0C10.4054 0.000422596 9.32357 0.235457 8.32742 0.689267C7.33127 1.14308 6.44396 1.80512 5.72526 2.63079C5.00657 3.45646 4.47318 4.42658 4.16106 5.47579C3.84893 6.52499 3.7653 7.62891 3.91581 8.71316C2.99871 8.88416 2.15068 9.31683 1.47397 9.959C1.00551 10.4044 0.6331 10.9409 0.379629 11.5355C0.126158 12.1301 -0.00301432 12.7703 5.3386e-05 13.4167V17.3219C0.00206742 18.3581 0.339104 19.366 0.96087 20.195C1.58264 21.024 2.4558 21.6298 3.45006 21.9219L6.20048 22.7844C6.66245 22.9281 7.1436 23.0009 7.62744 23C8.06634 22.9994 8.50316 22.9395 8.92598 22.8217L14.4652 21.183C14.9586 21.0483 15.4792 21.0483 15.9726 21.183L18.2602 21.9497C18.8239 22.0869 19.4115 22.0943 19.9786 21.9714C20.5457 21.8486 21.0775 21.5985 21.5339 21.2402C21.9903 20.8819 22.3594 20.4247 22.6134 19.903C22.8673 19.3813 22.9996 18.8087 23.0001 18.2285V13.294C22.9979 12.3025 22.6891 11.336 22.1161 10.5269C21.5431 9.71773 20.7338 9.10565 19.7992 8.7745V8.77546ZM7.43481 3.60525C7.96789 3.07001 8.60142 2.64531 9.29904 2.35552C9.99667 2.06573 10.7446 1.91655 11.5001 1.91655C12.2555 1.91655 13.0035 2.06573 13.7011 2.35552C14.3987 2.64531 15.0322 3.07001 15.5653 3.60525C16.6407 4.68734 17.2452 6.15041 17.2472 7.67599C17.2491 9.20158 16.6485 10.6662 15.5759 11.7511L12.1709 15.0621C11.9932 15.2364 11.7542 15.334 11.5053 15.334C11.2564 15.334 11.0175 15.2364 10.8398 15.0621L7.43481 11.7655C6.35714 10.681 5.75227 9.21422 5.75227 7.68535C5.75227 6.15648 6.35714 4.68971 7.43481 3.60525ZM21.0834 18.2285C21.084 18.5187 21.0184 18.8053 20.8915 19.0663C20.7646 19.3274 20.5798 19.5561 20.3512 19.735C20.1352 19.9086 19.8836 20.0326 19.6143 20.098C19.345 20.1634 19.0646 20.1687 18.793 20.1135L16.5457 19.3583C15.6957 19.1141 14.7948 19.1088 13.9419 19.343L8.3989 20.9798C7.86633 21.1267 7.30271 21.1171 6.77548 20.952L4.00206 20.0895C3.40181 19.916 2.87406 19.5524 2.49805 19.0533C2.12203 18.5543 1.91805 17.9467 1.91672 17.3219V13.4167C1.91457 13.0293 1.99167 12.6456 2.14329 12.2891C2.29492 11.9326 2.51785 11.6109 2.79839 11.3438C3.23755 10.9252 3.79699 10.6551 4.39785 10.5714C4.78416 11.5289 5.35942 12.3988 6.08931 13.1292L9.50769 16.4383C10.042 16.9614 10.76 17.2544 11.5077 17.2544C12.2555 17.2544 12.9735 16.9614 13.5078 16.4383L16.9223 13.1196C17.6868 12.352 18.2791 11.4304 18.6598 10.4161L19.1744 10.5867C19.7325 10.7867 20.2153 11.154 20.557 11.6385C20.8986 12.123 21.0825 12.7011 21.0834 13.294V18.2285Z" fill="#7C7C7C"/></svg>
                  </button>
                  
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
                                              <div className='price-box'><input type="text" id="amount" readOnly/></div>
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
                                      <button>Compare</button>
                                  </li>
                              </ul>
                              <div className='ml-auto d-flex justify-content-end align-items-center'>
                              <label className="switch mb-0">
                                  <input type="checkbox" name="expandAll"/>
                                  <span className="slider round"></span>
                              </label>
                              <p className='mb-0 ml-2'>No Cost EMI</p>
                          </div>
                        </div>
          </div>
          <div className='row'>
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac01.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac02.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac03.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac04.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac05.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac06.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac07.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div> 
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac01.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>        
          </div>
          <div className='row justify-content-center mt-5'>
            <button className='d-inline-flex flex-column justify-content-center align-items-center'>
              Show More 
              <span><img src="images/icons/dropdown-arrow.png" alt="upgard" className="img-fluid"/></span>
            </button>
          </div>
          <hr className='mb-5'></hr>

          <div className="d-flex justify-content-between mb-4">
              <h3 className="section_title mb-lg-4 mb-3">Recently Viewed</h3>
              {/* <button className="link">View All</button> */}
          </div>
          <div className='row'>
          <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac01.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac02.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac03.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
            <div className='col-lg-3 col-md-6'>
                <div className='search-result-box mb-4'>
                    <div className='img-box noverlay'>
                        <div className='position-absolute seller_tag blue'>
                            Bestseller
                        </div>
                        <img src="images/products/ac04.jpg" alt="" className='object-cover'/>
                    </div>
                    <div className='d-flex mt-3 justify-content-between px-3'>
                        <div>
                            <h5>Best Ambience Norman House, Viman Nagar Pune </h5>
                        </div>
                        <div className='diploma-icon ml-3'>
                          <div className='wishlist'>
                              <button><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                          </div>
                        </div>
                    </div>
                  
                    <div className='px-3 pb-3'>
                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                    <p className='d-flex align-items-center font-weight-semibold'><img src="images/icons/your-space.png" alt=""  className='img-fluid mr-2'/>Your Space</p>

                    <p className='d-flex align-items-center'><img src="images/icons/unisex.png" alt=""  className='img-fluid mr-2'/> Unisex</p>
                    </div>
                    <p className='d-flex align-items-center'><img src="images/icons/map-pin2.png" alt=""  className='img-fluid mr-2'/> University 27.5 Km away</p>
                    </div>
                </div>
            </div>  
          </div>
      </div>
     

      <Footer />
            <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div className="modal-dialog filter_all" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4>Filters</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid"/>
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
                                                <input type="text" id="priceAmount" readOnly/></div>
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
                                <div className="content">Transmission</div>
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
    }
  }
   
  export default Accomodation3;