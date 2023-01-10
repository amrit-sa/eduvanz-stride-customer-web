import React, { Component } from "react";
import $ from "jquery";
import Helmet from "react-helmet";
import { connect } from 'react-redux'
import HeaderNew from "../common/headerNew"
import Footer from "../common/footer";
import AboutUs from "../common/about"
import { asset } from "../common/assets";
import NewsArticle from '../common/news-article'
import RelatedCourse from '../common/related-course'
import { getProductById, getAccountProfile, favProduct, getFaqsById, getLearnById, getInstructorById, getFeedbackById } from "../actions/user";

class ProductDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      userData: null,
      partnerData: null,
    };
  }

  async componentDidMount() {
    const { user, sfid } = this.props;
    let data = {
      user_id: user,
      sfid: this.props.id,
    }
    await this.props.dispatch(getProductById(data));
    let faqdata = {
      id: this.props.id,
    }
    await this.props.dispatch(getFaqsById(faqdata));
    await this.props.dispatch(getLearnById(faqdata));
    await this.props.dispatch(getInstructorById(faqdata));
    await this.props.dispatch(getFeedbackById(faqdata));
    if(sfid)
    {
      let obj = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(obj)).then((response)=>{
        if(response.status ==="success")
        {
            const getObj = response.accountDet;
            const partnerData = getObj && getObj.account_partner__c?getObj.account_partner__c:null;
            this.setState({userData: getObj, partnerData: partnerData});
        }
      });
    }
    
    //faq
    $('.question').click(function(){
      $(this).siblings('.question').next().slideUp();
      $(this).siblings('.question').removeClass('active');
      $(this).toggleClass('active');
      $(this).next('.answer').slideToggle();
  });

   
  }

  render() {
    const { product, faqs, learn, instructor, feedback } = this.props;
    const proImages = product && product.images?product.images:[];
   
    console.log("ii",instructor);
    return (
          <>
            <Helmet>
              <title>Home</title>
            </Helmet>
            <HeaderNew/>

            {/* banner */}
                <div className="pdesc-banner">
                    <div className="inner-page">
                        <div className="container banner-content">
                        <div className='row'>
                            <div className='col-12'>
                            <div className="breadCrumb_wrapper pt-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li><a href="#">{product.product_category__c?product.product_category__c:''}</a></li>
                                        <li><a href="#">{product.product_sub_category__c?product.product_sub_category__c:''}</a></li>
                                      
                                        </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                           <div className="row">
                                <div className="col-sm-7">
                                <span className="logo-brand mt-4"><img src={asset+"images/brand/upgard.png"} alt="upgard" className="img-fluid"/></span>  
                                
                                <h2 className="mt-4">{product.name?product.name:''}</h2>
                                <p className="mt-3">Learn people management, HR analytics, performance &amp; reward management, and much more with a prestigious certification from LIBA.</p>

                                <p>Stride Price: ₹{product.mrp__c?product.mrp__c.toLocaleString('en-IN'):''} 5,54,000 30% OFF</p>

                                <div className="d-flex flex-wrap">
                                    <div className="mr-3"><button className="db_btn">Download Brochure</button></div>
                                    <div className="mr-4"><button className="share_btn_"><img src={asset+"images/share.png"} alt="upgard" className="img-fluid"/></button></div>
                                    <div className="mr-4 line_var"></div>
                                    <div className=" d-flex align-items-center  mt-lg-0 mt-3 mb-3">
                                      <button className="play_btn">
                                        <i className="fa fa-play" aria-hidden="true"></i>
                                      </button>
                                      <div className="ml-3">
                                      Watch 
                                      <span className="d-block font-weight-bold">Intro Video</span>
                                      </div>
                                     </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <img src={asset+"images/pdesc-banner.png"} alt="upgard" className="img-fluid"/>
                    </div>
                   
                </div>
            {/* banner */}
            <div className="container">
              <div className="row">
                  <div className="col">
                      <div className="">
                        <ul className="d-flex flex-wrap cf_box_wrap">
                          <li>
                            <div className="d-flex cf_box">
                              <div className="img-box">
                                <img src={asset+"images/c01.png"} alt="" className="img-fluid"/>
                              </div>
                              <div className="duration">Duration <span>18 Months</span></div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex cf_box">
                              <div className="img-box">
                                <img src={asset+"images/c02.png"} alt="" className="img-fluid"/>
                              </div>
                              <div className="duration">Course Type <span>Online</span></div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex cf_box">
                              <div className="img-box">
                                <img src={asset+"images/c03.png"} alt="" className="img-fluid"/>
                              </div>
                              <div className="duration">NASSCOM Certificate <span>Included</span></div>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex cf_box">
                              <div className="img-box">
                                <img src={asset+"images/c01.png"} alt="" className="img-fluid"/>
                              </div>
                              <div className="duration">No Cost EMI Starting 
                                <div className="d-flex">
                                  <span>₹ 3,500/month</span> <button>View Plans</button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                          <button className="wish-btn">
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            </button>
                            <button className="apply-btn ml-3">Apply Now </button>
                          </li>
                        </ul>
                      </div>

                  </div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-5">
                  <div className="row">
                  <div className="col-sm-6">
                      <div className="d-flex align-items-center edu_ins">
                        <div className="icon_box mr-3"><img src={asset+"images/b01.png"} alt="" className="img-fluid"/></div>
                        <p className="mb-0">Early &amp; Mid Career Professionals</p>
                      </div>
                  </div>
                    <div className="col-sm-6">
                    <div className="d-flex align-items-center edu_ins">
                        <div className="icon_box mr-3"><img src={asset+"images/b02.png"} alt="" className="img-fluid"/></div>
                        <p className="mb-0">Aspiring Entrepreneur</p>
                      </div>
                    </div>
                  </div>
                    
                </div>
                <div className="col-sm-7">
                  <div className="row">
                  <div className="col-sm-4">
                  <div className="d-flex align-items-center edu_ins">
                        <div className="icon_box mr-3"><img src={asset+"images/b03.png"} alt="" className="img-fluid"/></div>
                        <p className="mb-0">Experienced Career Professionals</p>
                      </div>
                  </div>
                    <div className="col-sm-4">
                    <div className="d-flex align-items-center edu_ins">
                        <div className="icon_box mr-3"><img src={asset+"images/b04.png"} alt="" className="img-fluid"/></div>
                        <p className="mb-0">Jobs in 100+ Top Companies</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                    <div className="d-flex align-items-center edu_ins">
                        <div className="icon_box mr-3"><img src={asset+"images/b05.png"} alt="" className="img-fluid"/></div>
                        <p className="mb-0">Dedicated Support</p>
                      </div>
                    </div>
                  </div>
                    
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                <ul className="nav nav-tabs" id="searchTab" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#AboutTheCourse" role="tab" aria-controls="home" aria-selected="true">About the course</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="whatYoullLearn-tab" data-toggle="tab" href="#whatYoullLearn" role="tab" aria-controls="whatYoullLearn" aria-selected="false">What you’ll learn</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="instructors-tab" data-toggle="tab" href="#instructors" role="tab" aria-controls="Instructors" aria-selected="false">Instructors</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="instructors-tab" data-toggle="tab" href="#FAQ" role="tab" aria-controls="FAQ" aria-selected="false">FAQ</a>
                      </li>
                    </ul>
                    {/*  */}
                    <div className="tab-content" id="searchTabContent">
                      <div className="" id="AboutTheCourse" role="tabpanel" aria-labelledby="home-tab">
                      <div id="">
                          <div className="row mb-4">
                          <div className="col">
                            <div className="p-4 rounded about_course" style={{"backgroundColor":"#f2f2f2"}}>
                            <h4 className="mb-4">About the course</h4>
                            <h5 className="mb-3">Who should do this course?</h5>
                            <ul>
                              <li>The Masters in CFD program is a 12 month long, intensive program. The program comprises of 6 courses that train you on all the essential engineering concepts and tools that are essential to get into top OEMs. as a CFD Engineer.</li>
                            </ul>
                            <h5>What are the course deliverables?</h5>
                            <ul>
                              <li>Get Certified from Skill-Lync</li>
                              <li>Work on 15+ Industry oriented projects</li>
                              <li>Get Lifetime job assistance from the career success team</li>
                            </ul>
                            </div>  
                          </div>
                        </div>
                        </div>
                      </div>
                      <div className="" id="whatYoullLearn" role="tabpanel" aria-labelledby="whatYoullLearn-tab">
                      <div id="">
                  <div className="row mb-4 align-items-end">
                    <div className="col-sm-6">
                      <h4 className="mb-4">What you’ll learn</h4>
                        <p>This beginner-level, six-course certificate, professionals with in-demand skills -and training -- that can help you advance your career.
                        </p>
                        <div className="d-flex justify-content-between mb-4">
                          <div>19 sections • 168 lectures • 15h 30m total length</div>
                          <div>
                            <button>View All</button>
                          </div>
                        </div>

                        <ul className="course-list mb-0">
                        {learn && learn !== undefined && learn.length > 0?(
                                        learn.map((item, index) => (
                          <li key={'item' + index} className="d-flex flex-wrap align-items-center">
                            <div className="mr-3 img-box">
                                <img src={asset+"images/wu01.png"} alt="" className="img-fluid"/>
                            </div>
                            <div>
                              <h6>{item.title__c}</h6>
                              <p className="mb-0">7 lectures • 30m</p>
                            </div>
                          </li>
                             ))
                             ):''
                             }
                          {/* <li className="d-flex flex-wrap align-items-center">
                            <div className="mr-3 img-box">
                                <img src={asset+"images/wu02.png"} alt="" className="img-fluid"/>
                            </div>
                            <div>
                              <h6>What is a Skilled Communicator?</h6>
                              <p className="mb-0">7 lectures • 30m</p>
                            </div>
                          </li>
                          <li className="d-flex flex-wrap align-items-center">
                            <div className="mr-3 img-box">
                                <img src={asset+"images/wu03.png"} alt="" className="img-fluid"/>
                            </div>
                            <div>
                              <h6>Case Study: New Neighbours</h6>
                              <p className="mb-0">7 lectures • 30m</p>
                            </div>
                          </li> */}
                          
                        </ul>
                    </div>
                    <div className="col-sm-6">
                          <div className="video-frame">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/9xwazD5SyVg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="w_l_b p-4">
                        <h4 className="mb-lg-5 mb-4">Why Learn with Stride</h4>
                          <div className="row">
                          <div className="col-sm-6 b-right">
                              <div className="d-flex align-items-start w_l_s_box mb-4">
                                <div className="icon-box mr-4">
                                  <img src={asset+"images/au01.png"} alt="ezgif2" className="img-fluid"/>
                                </div>
                                <div>
                                  <h6>Global Students Community</h6>
                                  <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-start w_l_s_box">
                                <div className="icon-box mr-4">
                                  <img src={asset+"images/au02.png"} alt="ezgif2" className="img-fluid"/>
                                </div>
                                <div>
                                  <h6>Top Notch Courses</h6>
                                  <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="d-flex align-items-start w_l_s_box mb-4">
                                <div className="icon-box mr-4">
                                  <img src={asset+"images/au04.png"} alt="ezgif2" className="img-fluid"/>
                                </div>
                                <div>
                                  <h6>Global Students Community</h6>
                                  <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                </div>
                              </div>
                              <div className="d-flex align-items-start w_l_s_box">
                                <div className="icon-box mr-4">
                                  <img src={asset+"images/au03.png"} alt="ezgif2" className="img-fluid"/>
                                </div>
                                <div>
                                  <h6>Top Notch Courses</h6>
                                  <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                      <div className="col">
                        <div className="card_best_deal d-flex align-items-center">
                          <div className="pl-lg-5 col-sm-5">
                            <h4 className="mb-3">Start your learning experience with STRIDE CARD for best deals!</h4>
                            <button className="apply-btn small">Get Stride Card</button>
                          </div>

                          <div className="right-content">
                            <div className="figure3"><img src={asset+"images/card--.png"} className="img-fluid"/></div>
                            <div className="figure2"><img src={asset+"images/figure.png"} className="img-fluid"/></div>
                          </div>
                        </div>
                      </div>
                  </div>
                      </div>

                      </div>
                      <div className="" id="instructors" role="tabpanel" aria-labelledby="instructors-tab">
                        
              <div id="">
                <div className="row ">
                  <div className="col-12">
                    <h4>Leading Instructors</h4>
                  </div>
                </div>
                <div className="row mb-4">
                {instructor && instructor !== undefined && instructor.length > 0?(
                                        instructor.map((item, index) => (
                  <div key={'item' + index} className="col-sm-3">
                    <div className="li_box">
                      <div className="img-box">
                        <img src={`data:image/jpg;base64,${item.image_url__c}`} className="img-fluid"/>
                      </div>
                      <div className="mt-3 text-center">
                        <h5>{item.name}</h5>
                        <p className="m-0">{item.dipartment__c}</p>
                      </div>
                    </div>
                  </div>
                     ))
                     ):''
                     }
                  {/* <div className="col-sm-3">
                    <div className="li_box">
                      <div className="img-box">
                        <img src={asset+"images/li02.png"} className="img-fluid"/>
                      </div>
                      <div className="mt-3 text-center">
                        <h5>Ayushi Singh</h5>
                        <p className="m-0">HR Lead</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="li_box">
                      <div className="img-box">
                        <img src={asset+"images/li03.png"} className="img-fluid"/>
                      </div>
                      <div className="mt-3 text-center">
                        <h5>Ayushi Singh</h5>
                        <p className="m-0">HR Lead</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="li_box">
                      <div className="img-box">
                        <img src={asset+"images/li04.png"} className="img-fluid"/>
                      </div>
                      <div className="mt-3 text-center">
                        <h5>Ayushi Singh</h5>
                        <p className="m-0">HR Lead</p>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="row">
                  <div className="bgMagnolia p-lg-4 p-3">
                      <div className="row">
                        <div className="col-12">
                          <h5 className="mb-4">See what they are saying about us</h5>
                        </div>
                      </div>
                      <div className="row">
                      {feedback && feedback !== undefined && feedback.length > 0?(
                                        feedback.map((item, index) => (
                        <div key={'item' + index} className="col-sm-3">
                          <div className="s_w_s">
                          <p>{item.description__c}</p>
                          <div className="d-flex align-items-start">
                            <div className="avator mr-3">
                                <img src={asset+"images/li01.png"} className="object-cover"/>
                            </div>
                            <div className="txt">
                              <h6>{item.name}</h6> 
                              <p>{item.dipartment__c}</p> 
                            </div>
                          </div>
                          </div>
                        </div>
                          ))
                          ):''
                          }
{/*                           
                        <div className="col-sm-3">
                          <div className="s_w_s">
                          <p>Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
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
                          <p>Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                          <div className="d-flex align-items-start">
                            <div className="avator mr-3">
                                <img src={asset+"images/li03.png"} className="object-cover"/>
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
                          <p>Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                          <div className="d-flex align-items-start">
                            <div className="avator mr-3">
                                <img src={asset+"images/li04.png"} className="object-cover"/>
                            </div>
                            <div className="txt">
                              <h6>Neel Doshi</h6> 
                              <p>Machine Learning by coursera</p> 
                            </div>
                          </div>
                          </div>
                        </div> */}
                      </div>
                  </div>
                </div>
              </div>

                      </div>
                      <div className="" id="FAQ" role="tabpanel" aria-labelledby="FAQ-tab">
                        
              <div id="" className="mb-4">
                <h4 className="mb-4">Frequently asked questions</h4>
                <div className="accordion">
                    <div className="faq">
                    {faqs && faqs !== undefined && faqs.length > 0?(
                                        faqs.map((item, index) => (
                      <>
                      <div  key={'item' + index}>
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
                    ):''
                    }
                    </div>
                  </div>
              </div>

                      </div>
                    </div>
                  </div>
              </div>


              


            





            
            </div>

            <NewsArticle/> 
            <RelatedCourse/>  
            <AboutUs/>
            <Footer />
          </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid } = state.auth;
  const { product, userMessage, product_id, faqs, learn, instructor, feedback } = state.user;
  return {
      user,
      sfid,
      product,
      product_id,
      userMessage,
      faqs,
      learn,
      instructor,
      feedback
  };
}

export default connect(mapStateToProps)(ProductDescription);
