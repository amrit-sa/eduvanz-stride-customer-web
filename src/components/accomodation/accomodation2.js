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


class Accomodation2 extends React.Component {


  componentDidMount(){
    $('.button2').click(function(){
      $('#gallery div:first img').click();
    })

    $('.faq_accordion .tab').click(function(){
      $(this).parent().siblings().children('.tab').removeClass('show');
      $(this).addClass('show')
      $(this).parent().siblings().children('.content').slideUp();
      $(this).next().slideToggle();
         
    })
  }


    render() {
      const { user, username, isSearching, searchDet } = this.props;
      return (
      <>
       <Helmet>
          <title>Accomodation 2</title>
      </Helmet>
      <HeaderNew
          username = {username?username:''}
          user = {user?user:''}
          history = {this.props.history}
          isSearching = {isSearching}
          searchDet = {searchDet}
      />

      <div className='accomodation-container'>

      <div className='container'>
        <div className='row'>
          <div className='col-12'>
          <h4 className="mb-3">2BHK with Ambience Norman Dorm House, Viman Nagar Pune</h4>
          <ul className='room-desc d-flex'>
            <li>Female</li>
            <li>1 bedroom</li>
            <li>1 bed</li>
            <li>1 bath</li>
            <li className='location'><i className="fa fa-map-marker" aria-hidden="true"></i> View Location</li>
          </ul>
          </div>
        </div>
        
        <div className='row' id="gallery">
          <div className='col-lg-6 p-3'>
          <div className='lightbox-thumbs'>
          <a href="images/r01.jpg" data-lightbox="gallery" className='fancybox'>
              <img src="images/r01.jpg" className="img-fluid"/>
            </a>
          </div>
            
          </div>
          <div className='col-lg-6'>
            <div className='row'>
            <div className='col-lg-6 p-3'>
            <div className='lightbox-thumbs'>
            <a href="images/r02.jpg" data-lightbox="gallery" className='fancybox'>
            <img src="images/r02.jpg" className="img-fluid"/>
          </a>
            </div>
            
            </div>
            <div className='col-lg-6 p-3'>
            <div className='lightbox-thumbs'>
            <a href="images/r03.jpg" data-lightbox="gallery" className='fancybox'>
            <img src="images/r03.jpg" className="img-fluid"/>
          </a>
            </div>
            
            </div>
            <div className='col-lg-6 p-3'>
            <div className='lightbox-thumbs'>
            <a href="images/r04.jpg" data-lightbox="gallery" className='fancybox'>
            <img src="images/r04.jpg" className="img-fluid"/>
          </a>
            </div>
            
            </div>
            <div className='col-lg-6 p-3'>
             <div className='lightbox-thumbs'>
                <div className='position-absolute w-100 h-100 d-flex align-items-center justify-content-center see-all'>
                  <button className='button2'>View 5+ photos</button>
                </div>
                <a href="images/r05.jpg" data-lightbox="gallery" className='fancybox'>
                  <img src="images/r05.jpg" className="img-fluid"/>
                </a>
             </div>
           
            </div>
            </div>
          </div>
        </div>
      </div>

        <div className="overall_ p-lg-4">
                <div className="container">
                  <div className="row  justify-content-between">

                    <div className="col-sm-6 mb-lg-0 mb-3">
                    <div className='row'>
                        <div className='col-auto time-3'>
                            <h5>Move in</h5>
                            <h4  className=''>19/02/2022</h4>
                        </div>
                        <div className='col-auto  time-3'>
                            <h5>Duration</h5>
                              <h4 className=''>3 Months</h4>
                       </div>
                    </div>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-lg-end flex-wrap align-items-center">
                          <div className="mr-lg-5 mr-3 text-lg-right mb-lg-0 mb-3">
                              <p className="n_emi_c mb-1">No Cost EMI Starting <strong>₹6,825/mo</strong></p>
                          </div>
                          <div className="d-flex justify-content-end mb-lg-0 mb-3">
                            <button type="button" className="wist_list_btn"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                            <button type="button" className="pay-btn">Enquire Now</button>
                          </div>
                      </div>
                    </div>
                </div>
            </div>

            <div className="container">
              <div className="row">
                  <div className='col-12'>
                    <div className='df p-5 mb-5'>
                        <div className='row'>
                            <div className='col-lg-8'>
                              <h3 className='mb-4'>About the place</h3>
                              <p>Come and stay in this superb duplex T2, in the heart of the historic center of Bordeaux.
                                Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of the city thanks to its ideal location. Close to many shops, bars and restaurants, you can access the apartment by tram A and C and bus routes 27 and 44.</p>
                                <button className='link'>Read More <i className="fa fa-chevron-right" aria-hidden="true"></i></button>

                                <hr/>

                                <h3 className='mb-4'>Room Facilities</h3>
                                <ul className='d-flex flex-wrap service-facilities-list'>
                                  <li>
                                    <img src="images/room/rs1.png" className="img-fluid"/>
                                    <p>Attached Washroom</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs2.png" className="img-fluid"/>
                                    <p>Bed &amp; Mattress</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs3.png" className="img-fluid"/>
                                    <p>Ceiling Fans</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs4.png" className="img-fluid"/>
                                    <p>Hot Water Supply</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs5.png" className="img-fluid"/>
                                    <p>Sliding Window</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs6.png" className="img-fluid"/>
                                    <p>Spacious Cupboard</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs7.png" className="img-fluid"/>
                                    <p>Study Table &amp; Chair</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rs8.png" className="img-fluid"/>
                                    <p>Tubelight LED</p>
                                  </li>
                                </ul>
                                <hr  className='mb-5'/>

                                <h3  className='mb-4'>Amenities and Services</h3>
                                <ul className='d-flex flex-wrap service-facilities-list'>
                                  <li>
                                    <img src="images/room/rf1.png" className="img-fluid"/>
                                    <p>High-Speed WIFI</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rf2.png" className="img-fluid"/>
                                    <p>Hot and Delicious Meals</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rf3.png" className="img-fluid"/>
                                    <p>Professional Housekeeping</p>
                                  </li>
                                  <li>
                                    <img src="images/room/rf2.png" className="img-fluid"/>
                                    <p>Hot and Delicious Meals</p>
                                  </li>
                               
                                </ul>
                                <hr className='mb-5'/>

                                <h3  className='mb-4'>Available Occupancies</h3>
                                <ul className='d-flex flex-wrap occupancies-list'>
                                  <li>
                                    <img src="images/room/occ01.png" className="img-fluid"/>
                                    <p>Double Occupancy</p>
                                    <span>₹23,199 /mo*</span>
                                  </li>
                                  <li>
                                    <img src="images/room/occ02.png" className="img-fluid"/>
                                    <p>Single Occupancy</p>
                                    <span>₹23,199 /mo*</span>
                                  </li>
                                  <li>
                                    <img src="images/room/occ03.png" className="img-fluid"/>
                                    <p>Triple Occupancy</p>
                                    <span>₹23,199 /mo*</span>
                                  </li>
                                  
                               
                                </ul>
                                <hr className='mb-5'/>

                                <h3 className='mb-4'>Best-in-class Safety and Hygiene Certified by Equinox Labs</h3>

                                <ul className='best-services-list d-flex flex-wrap'>
                                  <li>
                                      <img src="images/room/icon01.png" className="img-fluid"/>
                                      Garden view
                                  </li>
                                  <li>
                                      <img src="images/room/icon06.png" className="img-fluid"/>
                                      Kitchen
                                  </li>
                                  <li>
                                      <img src="images/room/icon02.png" className="img-fluid"/>
                                      Wifi
                                  </li>
                                  <li>
                                      <img src="images/room/icon07.png" className="img-fluid"/>
                                      Pets allowed
                                  </li>
                                  <li>
                                      <img src="images/room/icon03.png" className="img-fluid"/>
                                      Free washer - in building
                                  </li>
                                  <li>
                                      <img src="images/room/icon08.png" className="img-fluid"/>
                                      Dryer
                                  </li>
                                  <li>
                                      <img src="images/room/icon04.png" className="img-fluid"/>
                                      Central air conditioning
                                  </li>
                                  <li>
                                      <img src="images/room/icon09.png" className="img-fluid"/>
                                      Security cameras on property
                                  </li>
                                  <li>
                                      <img src="images/room/icon05.png" className="img-fluid"/>
                                      Refrigerator
                                  </li>
                                  <li>
                                      <img src="images/room/icon10.png" className="img-fluid"/>
                                      Bicycles
                                  </li>
                                </ul>

                                <button className='btn__ black'>Show all 37 amenities</button>
                            </div>
                            <div className='col-lg-4'>
                              <div className='bg-white question-box_ px-lg-5 px-4 pt-lg-5 pt-4'>
                                <h3>What is Stride Virtual Card?</h3> 
                                <p>A virtual card is a unique &amp; digitally generated 16-digit credit card number that helps you pay for all online subscriptions. Your card number is private, reducing any fraud risks.</p>
                                <button className='btn__ black'>+ Create</button>
                                <div className='handsome-figure'>
                                  <img src="images/room/handsome.png"/>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>

                <hr className='mb-5'/>
                <h3 className='mb-4'>Frequently asked questions</h3>

                <div className="faq_accordion_wrapper">
                  <div className="faq_accordion">
                    <div className="tab">How is the this Accomodate different from what i've learnt in college?</div>
                    <div className="content">
                      <p>Your payments are automatically withdrawn from your connected card according to the agreed payment schedule, but you can make early payments anytime you wish.</p>
                   </div>
                  </div>
                  <div className="faq_accordion">
                    <div className="tab">What is the advantage in taking this Hostel?</div>
                    <div className="content">How can I extend my due date?</div>
                  </div>
                  <div className="faq_accordion">
                    <div className="tab">How is the this hostel different from what i've selected?</div>
                    <div className="content">Transmission</div>
                  </div>
                </div>
                </div>
              </div>

              <hr className='mb-5'/>
                <h3 className='mb-4'>Where you’ll be</h3>
              
              <div className='row mb-5'>
                <div className='col-lg-8'>
                  <div className='map'>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143504.70633942424!2d72.76947791103298!3d19.062922652739932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650194152343!5m2!1sen!2sin" width="600" height="450" loading="lazy"></iframe>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='p-lg-5 p-4 near_'>
                   <h5 className=' mb-4'>Facilities near you</h5> 
                   <div className='row'>
                     <div className='col-4 text-center mb-lg-5 mb-4'>
                        <img src="images/room/a1.png"/>
                        <p className='mb-0'>Food &amp; Restaurant</p>
                     </div>
                     <div className='col-4 text-center  mb-4'>
                        <img src="images/room/a2.png"/>
                        <p className='mb-0'>Central Park</p>
                     </div>
                     <div className='col-4 text-center  mb-4'>
                        <img src="images/room/a3.png"/>
                        <p className='mb-0'>Insituitions</p>
                     </div>
                     <div className='col-4 text-center  mb-lg-5 mb-4'>
                        <img src="images/room/a4.png"/>
                        <p className='mb-0'>24X7 Healthcare</p>
                     </div>
                     <div className='col-4 text-center  mb-4'>
                        <img src="images/room/a5.png"/>
                        <p className='mb-0'>Lake View</p>
                     </div>
                     <div className='col-4 text-center  mb-4'>
                        <img src="images/room/a6.png"/>
                        <p className='mb-0'>Groceries</p>
                     </div>
                     <div className='col-4 text-center  mb-lg-5 mb-4'>
                        <img src="images/room/a7.png"/>
                        <p className='mb-0'>Cinema</p>
                     </div>
                     <div className='col-4 text-center  mb-4'>
                        <img src="images/room/a8.png"/>
                        <p className='mb-0'>Commute</p>
                     </div>
                     <div className='col-4 text-center  mb-4'>
                        <img src="images/room/a9.png"/>
                        <p className='mb-0'>Banks</p>
                     </div>
                   </div>
                  </div>
                </div>
              </div>

            </div>


      </div>
      <NewsArticle/>
      <AboutUs/>
      <Footer/>
      </>
        )
    }
  }
   
  export default Accomodation2;