import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import { getProductById, getAddress, addProductRating } from "../actions/user";
import { getPlanById } from "../actions/payment";
import { updatePreviousPath } from "../actions/auth";
import moment from 'moment';

class OrderReject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view : false,
      rating: 0,
      planData: {},
      product_id:'',
      newDate:'--'
        };
  }
  async componentDidMount() {
    const { history, user, dispatch, selectedplan, sfid } = this.props
    let product_id = localStorage.getItem('product_id')
    this.setState({product_id : product_id })
    if(!sfid)
    {
        const path = window.location.pathname;
        dispatch(updatePreviousPath(path));
        history.push("/login");
    }
    let id=window.location.href;
    let storeid=id.split('/');
    const planId=storeid[storeid.length-1];
    
    let obj = {
        plan_id: localStorage.getItem('planId')
    }
    await dispatch(getPlanById(obj)).then((response) => {
      
        if (response.status === "success") {
            let getData = response.data;
            
            this.setState({ planData: getData?getData:{},downpayment: getData.down_payment__c ? getData.down_payment__c : 0 })
        }
    });
    let data = {
      user_sfid: sfid,
    }
    await dispatch(getAddress(data));
    
    let proObj = {
        sfid: product_id,
    }
    this.props.dispatch(getProductById(proObj));
  }

  showDetail = ()=>{
    this.setState({view:true})
  }
  hideDetail = ()=>{
    this.setState({view:false})
  }
  handleRating = (value) =>{
    
    const { dispatch, sfid, product } = this.props
    let data = {
        user_sfid: sfid, 
        rating: value, 
        product_sfid: product.sfid? product.sfid : this.state.product_id
    }
    dispatch(addProductRating(data))
    this.setState({ rating: value});
  }
  handlehelpsupport = () => {
    
    window.location="/support"
  }

  retryPayment=(e)=>{
    e.preventDefault();
    const{product} = this.props;
    let plan_id = localStorage.getItem('planId');
    this.props.history.push(`/edplan_details_pay/${this.state.product_id}/${plan_id}`)
  }

  render() { 
    const { sfid, favorite_count, user, username, isSearching, searchDet, isLoading, currentAddress, product } = this.props
    const { rating, planData } = this.state
    const proImages = product && product.images ? product.images[0] : null;

    if(Object.keys(planData).length>0 && planData.first_emi_date__c && this.state.newDate.length < 4){
    let first_e = planData.first_emi_date__c;
    let temp_f = first_e.split(' ');
    let month_num = moment().month(temp_f[1].slice(0, -1)).format("M");
    let startDate = temp_f[0]+'-'+month_num+'-'+temp_f[2];
    let newwDate = moment(startDate, "DD-MM-YYYY").add(Number(planData.net_tenure__c), 'months').format('DD-MMM-YYYY');
    this.setState({newDate : newwDate})
    }

    console.log('product cancel',product)
    return (
      <>
        <Helmet>
          <title>Order Reject </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
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
        <div className="inner-page">
          <div className="container">
            <div className="row mx-0 mt-lg-5">
            <div className="d-flex align-items-start">
                <img src={asset+'images/orders/reject.png'} className='d-inline-block' width='32' />
                <div className="ml-3">
                  <h3 className="d-inline-block font-weight-bold mb-3">Order Confirmation Pending</h3>
                  <h5 className="font-weight-bold mb-1">Hello {username},</h5>
                  <p className="">Your transaction has failed due to some technical error. 
                  <button type='button' className="link" onClick={this.retryPayment}>Please try again!</button></p>
                </div>
              </div>
            </div>
            <div className="row mx-0 mt-3">
              <div className="col-lg-8 mb-4">
                <div className="card border-0 rounded-1">
                  <div className="card-body p-2 p-lg-5">
                    <div className="row mx-0">
                      <div className="col-lg-3">

                        <img src={proImages ? `data:image/jpg;base64,${proImages.base64}` : asset + 'images/orders/laptop.png'} className='w-100' />
                      </div>
                      <div className="col-lg-5">
                        <img src={asset+'images/orders/apple-icon.png'} className='mb-4' />
                        
                        <h4>{product?.name ? product?.name : '2021 Apple MacBook Pro(14-inch/35.97cm, Apple m1 pro'}</h4>
                        <p className="text-capitalize">Quantity : 1</p>
                        <p className="text-capitalize">offer price : ₹ {product?.price__c ? product?.price__c.toLocaleString('en-IN') : ''}</p>
                        <p className="text-capitalize">Order ID : {product?.sfid ? product?.sfid : '345678'}</p>
                      </div>
                      <div className="col-lg-4">
                        <div className="d-flex align-items-start">
                          <img src={asset+'images/orders/home-location-alt.png'} className='' />
                          <div className="ml-3">
                            <h4>Delivery Address</h4>
                            <p>{currentAddress ? `${currentAddress?.address__c}${currentAddress?.city__c ? ", " + currentAddress.city__c : ""}${currentAddress.state__c ? ", " + currentAddress.state__c : ""}${currentAddress.pincode__c ? ", " + currentAddress.pincode__c : ""}`:''}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <ol className="step-indicator">
                      <li className="active">
                        <div className="step"><img src={asset+'images/orders/vector.png'} className='d-inline-block' /></div>
                        <div className="caption hidden-xs hidden-sm">
                        <div className="d-flex  justify-content-center align-items-center mb-2">
                            <img src={asset+'images/orders/reject.png'} className='d-inline-block' width='24' />
                            <h6 className="d-inline-block font-weight-bold mb-0 ml-2">Order Confirmation Pending</h6>
                          </div>
                          <div className="">
                            <p className="mb-0">Your Product is being packed</p>
                            {/* <p className="text-center text-muted">March 16, 2022</p> */}
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="step"><img src={asset+'images/orders/truck.png'} className='d-inline-block' width='62px' /></div>
                        <div className="caption hidden-xs hidden-sm">
                          <div className="d-flex  justify-content-center align-items-center mb-2">
                            <h6 className="d-inline-block font-weight-bold mb-0 ml-2">Product Shipped</h6>
                          </div>
                          <div className="">
                            <p className="mb-0">Your Product is yet to be Shipped </p>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="step"><img src={asset+'images/orders/home.png'} className='d-inline-block' /></div>
                        <div className="caption hidden-xs hidden-sm">
                          <div className="d-flex  justify-content-center align-items-center mb-2">
                            <h6 className="d-inline-block font-weight-bold mb-0 ml-2">Product Deliverd</h6>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="row mx-0 mt-lg-5 mt-3 align-items-stretch">
                  <div className="col-lg-8 pl-lg-0 mb-3 p-0 pr-lg-3">
                    <div className="card shadow border-0 rounded-1">
                      <div className="card-body">
                        <div className="d-flex align-items-center px-4">
                          <img src={asset+'images/orders/rating.png'} className='d-inline-block' width='80px' />
                          <div className="ml-lg-5 text-center">
                            <h5 className="font-weight-normal mb-3">Rate your experience withour service </h5>
                            {/* <img src='/images/orders/mask_group.png' className='d-inline-block' width="100%" /> */}
                            <>
                            <ul className="feedback">
                                <li className={`angry ${rating===1?"active":""}`}>
                                <div onClick={()=>this.handleRating(1)}>
                                    <svg className="eye left">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="eye right">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="mouth">
                                    <use xlinkHref="#mouth"></use>
                                    </svg>
                                </div>
                                </li>
                                <li className={`sad ${rating===2?"active":""}`}>
                                <div onClick={()=>this.handleRating(2)}>
                                    <svg className="eye left">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="eye right">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="mouth">
                                    <use xlinkHref="#mouth"></use>
                                    </svg>
                                </div>
                                </li>
                                <li className={`ok ${rating===3?"active":""}`}>
                                <div onClick={()=>this.handleRating(3)} />
                                </li>
                                <li className={`good ${rating===4?"active":""}`} >
                                <div onClick={()=>this.handleRating(4)}>
                                    <svg className="eye left">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="eye right">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="mouth">
                                    <use xlinkHref="#mouth"></use>
                                    </svg>
                                </div>
                                </li>
                                <li onClick={()=>this.handleRating(5)} className={`happy ${rating===5?"active":""}`}>
                                <div>
                                    <svg className="eye left">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                    <svg className="eye right">
                                    <use xlinkHref="#eye"></use>
                                    </svg>
                                </div>
                                </li>
                            </ul>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
                                <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1" />
                                </symbol>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
                                <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5" />
                                </symbol>
                            </svg>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 pl-lg-3 mb-3 p-0 pr-lg-0">
                    <div className="card shadow border-0 rounded-1">
                      <div className="card-body text-center">
                        <img src={asset+'images/orders/chat.png'} className='d-inline-block' />
                        <p className="my-4">Need help with anything?</p>
                        <button className="btn btn-outline-dark rounded mb-2" onClick={()=>this.handlehelpsupport()}>Contact Us</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3" >
                <div className="p-4" style={{ backgroundImage: `url(${asset}"images/orders/union.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                  <h2 className="text-capitalize text-center pt-5 px-5 pb-3 mt-3">payment details</h2>
                  <hr className="dotted mb-5" />
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h4 font-weight-normal" >Order Total</p>
                    <p className="h4 font-weight-bold" > ₹ {product?.mrp__c ? product?.mrp__c.toLocaleString('en-IN') : ''}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h4 font-weight-normal">Amount Paid</p>
                    <p className="h4 font-weight-bold"> ₹ {this.state.downpayment ? this.state.downpayment.toLocaleString('en-IN') : '0.00'}</p>
                  </div>
                  {this.state.view === true &&
                  <>
                  <hr className="dotted mb-5" />
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-bold">Total Product Cost</p>
                    <p className="h5 font-weight-bold"> ₹ {product?.mrp__c ? product?.mrp__c.toLocaleString('en-IN') : ''}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Instant Discount</p>
                    <p className="h5 font-weight-bold text-success"> {'--'}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-bold">Loan Details</p>
                    <p className="h5 font-weight-bold"> ₹ {product?.mrp__c ? product?.mrp__c.toLocaleString('en-IN') : ''}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Tenure</p>
                    <p className="h5 font-weight-normal"> {planData && planData.net_tenure__c?planData.net_tenure__c:'--'} Months</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Interest</p>
                    <p className="h5 font-weight-normal"> {planData && planData.interest_rate_apr__c?planData.interest_rate_apr__c:'--'}%</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Auto-Pay</p>
                    <p className="h5 font-weight-normal"> Active</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">First EMI Due Date</p>
                    <p className="h5 font-weight-normal"> {planData && planData.first_emi_date__c?planData.first_emi_date__c:'--'}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Last EMI Due Date</p>
                    <p className="h5 font-weight-normal">{planData && planData.last_emi_date__c?planData.last_emi_date__c: this.state.newDate}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-bold">Upfront amount paid</p>
                    <p className="h5 font-weight-bold"> ₹ --</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Downpayment</p>
                    <p className="h5 font-weight-normal">₹ {planData && planData.down_payment__c?planData.down_payment__c.toLocaleString('en-IN'):'--'}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Processing Fee</p>
                    <p className="h5 font-weight-normal">₹ {planData && planData.processing_fee__c?planData.processing_fee__c.toLocaleString('en-IN'):'--'}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Delivery Fee</p>
                    <p className="h5 font-weight-normal">₹ {'--'}</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="h5 font-weight-normal">Reward Points</p>
                    <p className="h5 font-weight-bold text-success">₹ --</p>
                  </div>
                  <div className="text-center">
                    <button className="py-3 h5 text-primary" onClick={this.hideDetail} >View Less Details</button>
                  </div>
                  </>
                  }
                  {this.state.view !== true &&
                  <>
                  <div className="text-center">
                    <button className="py-3 h5 text-primary" onClick={this.showDetail} >View More Details</button>
                  </div>
                  </>
                  }
                  {/* <div className="text-center">
                    <button className="py-3 h5 text-primary" onClick={setView(true)} >View More Details</button>
                    <button className="py-3 h5 text-primary" onClick={setView(true)} >View Less Details</button>
                  </div> */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { plan_id, product_id, currentAddress, product } = state.user
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet } = state.product
  return {
    isSearching,
    isLoading,
    searchDet,
    username,
    user,
    sfid,
    currentAddress,
    product,
    plan_id,
    product_id,
  };
}


export default connect(mapStateToProps)(OrderReject);
