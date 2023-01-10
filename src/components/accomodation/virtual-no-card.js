import React, { Component } from 'react'
import $ from "jquery"
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import HeaderNew from "../../common/headerNew"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from '../../common/assets'
import { getActiveVirtualCards, getClosedVirtualCards, checkVirtualCards,setStore,updateMerchant } from "../../actions/product";
import { getAccountProfile } from "../../actions/user";
import {  getStore } from "../../actions/product";

const responsive = {
  superLargeDesktop: {
      breakpoint: { max: 4000, min: 1680 },
      items: 1
  },
  desktop: {
      breakpoint: { max: 1680, min: 1024 },
      items: 1
  },
  tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
  },
  mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
  }
};

const responsive2 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1680 },
    items: 5
    },
    desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
}



class VirtualNoCard extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          showCard:false,
          userData: null,
          proData: null,
          index: 0
      };
      this.handleSelect = this.handleSelect.bind(this);
    }

    async componentDidMount()
    {
      const { sfid , dispatch, user } = this.props
      $('.question').click(function(){
        $(this).siblings('.question').next().slideUp();
        $(this).siblings('.question').removeClass('active');
        $(this).toggleClass('active');
        $(this).next('.answer').slideToggle();
      });
      let data = {
          user_sfid: sfid, //'00171000007WK7dAAG'
      }
      await dispatch(checkVirtualCards(data));
      dispatch(getActiveVirtualCards(data));
      dispatch(getClosedVirtualCards(data));
      dispatch(getStore());
      if (user) {
        let obj = {
          user_sfid: sfid,
        }
        this.props.dispatch(getAccountProfile(obj)).then((response) => {
          if (response.status === "success") {
            const getObj = response.accountDet;
            const proData = getObj && getObj.account_profile ? getObj.account_profile : null;
            this.setState({ userData: getObj, proData: proData });
          }
        });
      }
    }

    handleSelect = (selectedIndex, e) =>{
      console.log("selectedIndex", selectedIndex);
        this.setState({index: selectedIndex});
    }

    replaceMiddle = (string) => {
      if(string)
      {
        return string.toString().replace(/^(\+?[\d]{4})\d+(\d{4})$/g,"$1-XXXXXX-$2");
      }else{
        return '';
      }
    }

    handleCvvView = (name) =>{
      if(this.state[name])
      {
        this.setState({[name]: false});
      }else{
        this.setState({[name]: true});
      }
    }

    handleCreateCard = () => {
      const { user } = this.props
      if (!user) {
        window.location = "/login";
      } else {
        window.location = "/virtualCard";
        // const getObj = this.state.userData;
        // const address = getObj && getObj.current_address_id__c ? getObj.current_address_id__c : null;
        // if (getObj.account_status__c === "Full User") {
        //   window.location = "/virtual_card1";
        // } else if (!getObj.email__c) {
        //   window.location = "/ed_custdetails";
        // } else if (getObj.pan_number__c && !getObj.pan_verified__c) {
        //   window.location = "/ed_pan_update";
        // }
        // else if (!getObj.pan_number__c) {
        //   window.location = "/ed_pan_update";
        // } else if (!getObj.is_qde_1_form_done__c) {
        //   window.location = "/ed_qdform";
        // } else if (!getObj.ipa_basic_bureau__c && getObj.pan_verified__c) {
        //   window.location = "/edawaiting";
        // } else if (!getObj.ipa_basic_bureau__c && !getObj.pan_verified__c) {
        //   window.location = "/edreject";
        // } else if (getObj.ipa_basic_bureau__c && !getObj.pan_verified__c) {
        //   window.location = "/edawaiting";
        // } else if (getObj.ipa_basic_bureau__c && getObj.pan_verified__c && !getObj.is_limit_confirm__c) {
        //   window.location = "/ed_limit";
        // } else if (!getObj.is_qde_2_form_done__c) {
        //   window.location = "/ed_salary";
        // } else if (!address) {
        //   window.location = "/ed_address";
        // } else if (!getObj.is_kyc_document_verified__c) {
        //   window.location = "/ed_doc_profile";
        // } else if (!getObj.is_bank_detail_verified__c) {
        //   window.location = "/edonebanklist";
        // } else {
        //   window.location = "/virtual_card1";
        // }
      }
  
  
    }
    handleSelect = (item) => {
      // localStorage.setItem('storeSelected',item)
      // this.setState({ isStoreSelected: true })
      this.props.dispatch(setStore(item))
      this.props.dispatch(updateMerchant(item.sfid));
      this.props.history.push("/amountLimit");
  }
    render() {
      const { store, sfid, favorite_count, user, username, isSearching, searchDet, virtual_active_cards, virtual_closed_cards, isLoading } = this.props;
      let storeList = null;
      console.log('storstorstorstorstorstor',this.state.index)
      if(store && store.data && store.data.length>0)
      {
        storeList = store.data.slice(0,9);
      }
      return <>
                <Helmet>
                    <title>Virtual no card</title>
                </Helmet>
                {isLoading ? (
                  <div className="loading">Loading&#8230;</div>
                ) : ''}
                <HeaderNew
                    username = {username?username:''}
                    user = {user?user:''}
                    history = {this.props.history}
                    isSearching = {isSearching}
                    searchDet = {searchDet}
                    sfid={sfid}
                    favorite_count={favorite_count}
                />

              

              <div className="virtual-card-banner">
                <div className="inner-page2">
                    <div className="container banner-content">
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper pt-4'>
                                    <ul className="breadcrumb_menu white d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li>Virtual Card</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                          <div className='px-3'><h3 className='text-white font-weight-semibold mb-4'>My Virtual Card</h3></div>
                          <div className='col-lg-12'>
                            
                           
                            {
                              this.state.showCard ?  
                              <div className='row'>
                              <div className='col-lg-8'>
                                <div className='card-left px-5'>
                                  <div className='row h-100'>
                                    <div className='col-lg-7 pr-0 d-flex align-items-center justify-content-center'>
                                    <div className='pl-lg-5'>
                                        <h3 className='font-weight-semibold mb-4'>What is Stride Virtual Card?</h3>
                                        <p>A virtual card is a unique &amp; digitally generated 16-digit credit card number that helps you pay for all online subscriptions. Your card number is private, reducing any fraud risks.</p>
                                        <button className='btn__ black'>+ Create New Card</button>
                                    </div>
                                    </div>
                                    <div className='col-lg-5 pl-0 d-flex align-items-end'>
                                        <img src={asset+"images/handsome-smiling2x.png"} alt="" className="img-fluid"/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-lg-4'>
                                <div className='card-right p-4'>
                                  <h3 className='font-weight-semibold mb-4'>Benefits for You</h3>
                                  <div className='border rounded10 p-3 mb-3'>
                                    <div className='row'>
                                      <div className='col-lg-2 pr-0'>
                                        <img src={asset+"images/icons/ic1.png"} alt="" className="img-fluid"/>
                                      </div>
                                      <div className='col-lg-10'>
                                        <p className='mb-0'>Discover exclusive offers on subscriptions curated for your business</p>
                                        </div>
                                    </div>
                                  </div>
                                  <div className='border rounded10 p-3 mb-3'>
                                    <div className='row'>
                                      <div className='col-lg-2 pr-0'>
                                      <img src={asset+"images/icons/ic2.png"} alt="" className="img-fluid"/>
                                      </div>
                                      <div className='col-lg-10'>
                                        <p className='mb-0'>Earn cashback and collect the rewards in your Open account</p>
                                        </div>
                                    </div>
                                  </div>
                                  <div className='border rounded10 p-3'>
                                    <div className='row'>
                                      <div className='col-lg-2 pr-0'>
                                      <img src={asset+"images/icons/ic3.png"} alt="" className="img-fluid"/>
                                      </div>
                                      <div className='col-lg-10'>
                                        <p className='mb-0'>Renew or pay for a new subscription with Open's virtual card</p></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> 

                            :  
                            
                            <>
                            <div className='row'>
                                  <div className='col-lg-5'>
                                <div className='card-left'>
                                  <div className='row h-100'>
                                    <div className='col-lg-8 pr-0 d-flex align-items-center justify-content-center'>
                                    <div className='p-4'>
                                        <h3 className='font-weight-semibold mb-4'>What is Stride Virtual Card?</h3>
                                        <p>Stride Virtual Card is the easiest way to pay for all your online shopping with a flexi repayment plan.Enjoy a safe and secure world of shopping online,backed by our Virtual card!</p>
                                        <button type='button' onClick={this.handleCreateCard} className='btn__ black'>+ Create New Card</button>
                                    </div>
                                    </div>
                                    <div className='col-lg-5 pl-0 d-flex align-items-end ml-21p'>
                                        <img src={asset+"images/handsome-smiling2x.png"} alt="" className="img-fluid"/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {virtual_active_cards && virtual_active_cards.length > 0? (
                              <div className='col-lg-6'>
                                <div className='card-right p-4'>
                                  <div className='row align-items-center h-100'>
                                    <div className='col-lg-6'>
                                        <div className='row'>
                                          <div className='col-8 border-right'>
                                          <img src={asset+"images/icons/apple.png"} alt="" className="img-fluid mb-3"/>
                                          <p className='mb-0'>Card Value:</p>
                                          <h2 className='mb-3'><i className='rupee'>`</i> 2,40,000</h2>

                                          {/* <div className='valid-time'>Valid for next <span>23:59:59</span></div> */}
                                          </div>
                                          {/* <div className='col-4 text-center'>
                                          <button className='act_btn'>
                                          <img src={asset+"images/icons/shopping.png"} alt="" className="img-fluid"/>
                                          <p>Go to Apple</p>
                                                </button>
                                             <button className='act_btn'>
                                              <img src={asset+"images/icons/copy.png"} alt="" className="img-fluid"/>
                                              <p>Copy Number</p>
                                                </button>
                                              <button className='act_btn'>
                                                  <img src={asset+"images/icons/delete.png"} alt="" className="img-fluid"/>
                                                  <p>Delete Card</p>
                                                </button>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='single-card'>
                                        <Carousel responsive={responsive} activeIndex={this.state.index} onSelect={this.handleSelect}>
                                            {virtual_active_cards.map((item, index)=> (
                                            <div key={`active-vcard-${index}`} className='position-relative'onClick={e=>{
                                              e.preventDefault()
                                              alert('hhi')
                                              
                                                                                          }}>
                                            <div className='card_txt'>
                                                <div className='mb-lg- mb-4 d-flex align-items-center'>
                                                      <img src="images/stride.png" alt="Eduvanz" className='img-fluid'/>
                                                      <div className='active-card ml-2'>
                                                        Active
                                                      </div>
                                                </div>
                                                <div className='d-flex c_card_number mb-lg-4 mb-3'>
                                                    <span>{this.replaceMiddle(item.vcard_number__c)}</span> 
                                                </div>
                                                <div className='d-flex align-items-end mb-4'>
                                                    <div className='card_valid_time' style={{"width":"30%"}}>
                                                        <h5>Expiry</h5>
                                                        <div className='ex_date'>{item.vcard_expiry__c}</div>
                                                    </div>
                                                    <div className='card_valid_time' style={{"width":"20%"}}>
                                                        {this.state[`cvv_${item.card_number__c}`]?(
                                                        <div className='cvv_number'>{item.vcard_cvv__c}</div>
                                                        ):(
                                                          <h5>***</h5>
                                                        )}
                                                    </div>
                                                    <div style={{"width":"30%"}}>
                                                    <div onClick={() => this.handleCvvView(`cvv_${item.card_number__c}`)} className="cursor-point" ><img src={asset+"images/view-white.png"} alt="view-white" className='img-fluid'/></div>  
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <div><img src={asset+"images/visa-white.png"} alt="visa-white" className='img-fluid'/></div>
                                                </div>
                                              </div>
                                            <img src={asset+"images/v-card.png"} alt="" className="img-fluid"/>
                                            </div>
                                            ))}
{/* 
                                            <div className='position-relative'>
                                            <div className='card_txt'>
                                                <div className='mb-lg- mb-4 d-flex align-items-center'>
                                                      <img src={asset+"images/stride.png"} alt="Eduvanz" className='img-fluid'/>
                                                      <div className='active-card ml-2'>
                                                        Active
                                                      </div>
                                                </div>
                                                <div className='d-flex c_card_number mb-lg-4 mb-3'>
                                                    <span>***</span>
                                                    <span>***</span>
                                                    <span>***</span>
                                                    <span>1289</span>  
                                                </div>
                                                <div className='d-flex align-items-end mb-4'>
                                                    <div className='card_valid_time' style={{"width":"30%"}}>
                                                        <h5>Expery</h5>
                                                        <div className='ex_date'>****</div>
                                                    </div>
                                                    <div className='card_valid_time' style={{"width":"20%"}}>
                                                    <h5>***</h5>
                                                        <div className='cvv_number'>907</div>
                                                    </div>
                                                    <div style={{"width":"30%"}}>
                                                    <div><img src={asset+"images/view-white.png"} alt="view-white" className='img-fluid'/></div>  
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <div><img src={asset+"images/visa-white.png"} alt="visa-white" className='img-fluid'/></div>
                                                </div>
                                              </div>
                                            <img src={asset+"images/v-card.png"} alt="" className="img-fluid"/>
                                            </div> */}
                                        </Carousel>
                                        </div>
                                    </div>
                                  
                                  </div>
                             
                                </div>
                              </div>
                                        ):(
                                          <div className='col-lg-6'>
                                            <div className='card-right p-4'>
                                              <div className='row'>
                                                  <div className='p-4'>
                                                      <h3 className='font-weight-semibold mb-4'>Benefits for You</h3>
                                                  </div>
                                              </div>
                                              <div className='row '>
                                                  <div className='col-lg-12'>
                                                    <img className="img-fluid" style={{maxHeight: '160px'}} src={asset+"images/stride-01.png"} />
                                                  </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                  </div>
                                  
                            </>
                            }

                          </div>
                        </div>
                        <div className='row mt-4'>
                          <div className='col-12'>
                              <h3 className='text-white font-weight-semibold mb-4'>Popular Stores</h3>
                              <ul className='popular-store-logos'>
                                {storeList && storeList.length > 0 && storeList.map((item, index)=>(
                                  <li key={`store-${index}`} onClick={() => this.handleSelect(item)}><img src={item.icon} className='img-fluid'/></li>
                                ))}
                                {/* <li><img src={asset+"images/icons/myntra.png"} className='img-fluid'/></li>
                                <li><img src={asset+"images/icons/amazon.png"} className='img-fluid'/></li>
                                <li><img src={asset+"images/icons/flipkart.png"} className='img-fluid'/></li>
                                <li><img src={asset+"images/icons/upgrad.png"} className='img-fluid'/></li>
                                <li><img src={asset+"images/icons/udemy.png"} className='img-fluid'/></li>
                                <li><img src={asset+"images/icons/byjus.png"} className='img-fluid'/></li>
                                */}
                                {/* {store && store.data && store.data.length > 9 && (
                                <li className='more'>+15 <span>More</span></li> 
                                )} */}
                              </ul>
                          </div>
                        </div>
                    </div>
                    <img src={asset+"images/virtual-card-banner.jpg"} className='object-cover'/>
                </div>
            </div>
            
            {virtual_closed_cards && virtual_closed_cards.length > 0 && (
            <div className='overflow-hidden'>
            <div className='container'>
            <div className='row'>
                <div className='col-12 previously-used'>
                  <h3 className='font-weight-semibold mb-4'>Previously used cards</h3>
                  <Carousel responsive={responsive2} className="puc">
                    {virtual_closed_cards.map((item, index)=>(
                      <div key={`closed-vcard-${index}`} className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        {item.closeddate && (
                        <p>Expired on {item.closeddate}</p>
                        )}
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> {item.card_limit__c}</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src={asset+"images/visa2.png"} className='img-fluid'/>
                        </div>
                        </div>
                      </div>
                    ))}

                      {/* <div className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        <p>Expired on 22, Dec 2021</p>
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> 2,00,000</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src={asset+"images/visa2.png"} className='img-fluid'/>
                        </div>
                        </div>
                      </div>
                      <div className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        <p>Expired on 22, Dec 2021</p>
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> 2,00,000</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src={asset+"images/visa2.png"} className='img-fluid'/>
                        </div>
                        </div>
                      </div>
                      <div className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        <p>Expired on 22, Dec 2021</p>
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> 2,00,000</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src={asset+"images/visa2.png"} className='img-fluid'/>
                        </div>
                        </div>
                      </div>
                      <div className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        <p>Expired on 22, Dec 2021</p>
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> 2,00,000</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src="../images/visa2.png" className='img-fluid'/>
                        </div>
                        </div>
                      </div>
                      <div className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        <p>Expired on 22, Dec 2021</p>
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> 2,00,000</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src={asset+"images/visa2.png"} className='img-fluid'/>
                        </div>
                        </div>
                      </div>
                      <div className='prev-used-card'>
                        <div className='header d-flex align-items-center justify-content-between'>
                         <h5 className='font-weight-semibold mb-0'>Stride</h5>
                            <div className='logo'>
                            <img src={asset+"images/icons/amazon.png"} className='img-fluid'/>
                            </div>
                        </div>
                        <div className='p-3'>
                        <h5 className='mb-1'>Amazon.in</h5>
                        <p>Expired on 22, Dec 2021</p>
                        <h2 className='mb-3 font-weight-semibold'><i className='rupee'>`</i> 2,00,000</h2>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='inactive-card'>Closed</div>
                            <img src={asset+"images/visa2.png"} className='img-fluid'/>
                        </div>
                        </div>
                      </div> */}

                  </Carousel>
                </div>
              </div>
            </div>
            </div>
            )}
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                <div className='super-card rounded10 p-4 py-lg-5'>
                  <div className='row'>
                    <div className='col-lg-6 d-flex align-items-end'>
                        <h2  className='font-weight-semibold mb-4 text-white'>Stride<br/>Super Card</h2>
                    </div>
                    <div className='col-lg-6'>
                        <h3  className='font-weight-semibold mb-4 text-white'>How to pay with Stride</h3>
                        <ul className='htps'>
                          <li num="1">
                              <p className='mb-0'>When your ready to pay press “Create a one-time card</p>
                          </li>
                          <li num="2">
                              <p className='mb-0'>When your ready to pay press “Create a one-time card</p>
                          </li>
                          <li num="3">
                              <p className='mb-0'>When your ready to pay press “Create a one-time card</p>
                          </li>
                        </ul>
                    </div>
                  </div>
                </div>

                <h3 className='font-weight-semibold mb-4'>Frequently asked questions</h3>

                <div className="accordion mb-5">
                    <div className="faq">
                      <div className="question py-4">
                          <h4>How is the this course different from what i've learnt other schools?</h4>
                      </div>
                      <div className="answer">
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                      </p>
                      </div>
                      <div className="question py-4">
                          <h4>What is the advantage in taking this program?</h4>
                      </div>
                      <div className="answer">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                      </p>
                      </div>
                      <div className="question py-4">
                          <h4>How is the this course different from what i've learnt in college?</h4>
                      </div>
                      <div className="answer">
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                      </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          
           
      </>;
    }
  }

  function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { virtual_active_cards, virtual_closed_cards, favorite_count,store } = state.product;
    // const {  } = state.user
    return {
      user,
      sfid,
      store,
      username,
      isLoading,
      favorite_count,
      virtual_active_cards,
      virtual_closed_cards
    };
  }
   
  export default connect(mapStateToProps)(VirtualNoCard);