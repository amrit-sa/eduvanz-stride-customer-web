import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets";
import { openVirtualCardModel } from "../../actions/model"; 
import { updatePayment, generateVCard, getVCard } from "../../actions/payment" 
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class VirtualCard5 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            cardData: null,
            cardUrl: null,
            havecard: true,
            cardNumber: null,
            expiryDate: null,
            isShowCvv: false,
            cvv: null
        }
    }

    async componentDidMount()
    {
        const queryParams = new URLSearchParams(window.location.search)
        const order_id = queryParams.get("order_id")
        const order_token = queryParams.get("order_token")
        console.log("order_id", order_id);
        console.log("order_token", order_token);
        if(order_id && order_token)
        {
            let data = {
                order_id: order_id,
                order_token: order_token
            }
            this.props.dispatch(updatePayment(data)).then((response)=>{
                if(response.status ==="success")
                {
                    this.setState({status: true});
                    this.generateVcard();
                }
            })
        }else{
            this.setState({status: true})
        }
        const { user } = this.props
        this.getVirtualCard();
    }

    generateVcard = async () =>{
        const { user, loan_amount, down_payment, selectedplan, merchant_id } = this.props
        let obj = {
            user_id: user,
            card_limit: loan_amount,
            plan_id: selectedplan,
            merchant_sfid: merchant_id
        }
        this.setState({ havecard: true });
        await this.props.dispatch(generateVCard(obj)).then((response)=>{
            if(response.status ==="success")
            {
                this.getVirtualCard();
            }else{
                this.setState({ havecard: false});
            }
        })
    }

    getVirtualCard = async () =>{
        const { user } = this.props
        let objData = {
            user_id: user
        }
        await this.props.dispatch(getVCard(objData)).then((response)=>{
            if(response.status ==="success")
            {
                this.props.history.push("/view_card");
                const getData    = response.data?response.data:null;
                const cardNumber = getData && getData.vcard_number__c? getData.vcard_number__c:null;
                const expiry     = getData && getData.vcard_expiry__c? getData.vcard_expiry__c:null;
                const cvv        = getData && getData.vcard_cvv__c? getData.vcard_cvv__c:null;
                if(cardNumber)
                {
                    this.setState({havecard: true, cardNumber: cardNumber, expiryDate: expiry , cvv: cvv});
                }else{
                    this.setState({ havecard: false });
                }
                
            }else{
                this.setState({ havecard: false });
            }
        })
    }

    handleViewCvv = () =>{
        if(this.state.isShowCvv)
        {
            this.setState({ isShowCvv: false})
        }else{
            this.setState({ isShowCvv: true})
        }
    }

    handleVirtualCardView = () =>{
        this.props.dispatch(openVirtualCardModel());
    }


    render() {
        const { user, isLoading, sfid } = this.props;
        if(!sfid)
        {
          window.location="/login";
        }
        return (
            <>
            <Helmet>
                <title>Virtual Card 5</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            <Header
              user = {user}
            />
            {isLoading?(
                <div className="loading">Loading&#8230;</div>
            ):''}
            <section className="kyc_pages bank_screen">
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-sm-12'>
                        <div className=''>
                                <span>
                                    <img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/></span> Apple India
                                </div>
                        </div>
                    </div>
                    <div className='row mt-4 align-items-center'>
                        <div className='col-lg-6'>
                            <h2 className='txt-l  mb-lg-5 mb-4'>Your One-time Card ready to use </h2>
                            <div className='a_a_box mb-lg-5 mb-4'>
                             <span className='a_x_txt'>Available Amount: <i className='rupee'>`</i>2,00,000</span>
                            </div>
                            <div className='d-flex'>
                                <button type='button' className='btn__ white mr-3 mr-0'>Go to Apple India</button>
                                <OverlayTrigger
                                            placement="top"
                                            trigger="click"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={(
                                                
                                                <Tooltip>
                                                copied
                                              </Tooltip>
                                                    
                                            )}>
                                                <button type='button' onClick={() => {navigator.clipboard.writeText(this.state.cardNumber)}} className='btn__ black'>Copy Card Number</button>
                                        </OverlayTrigger>
                            </div>
                        </div>
                        {this.state.cardNumber && (
                        <div className='col-lg-6'>
                            <div className=''>
                                <div className='card_bg'>
                                {/* {this.state.cardUrl && (<iframe width={650} height={650} src={this.state.cardUrl} title="W3Schools Free Online Web Tutorials"></iframe>)} */}
                                    <div className='card_txt'>
                                       {/*  <button className='card_close'>
                                            <img src={asset+"images/icons/icon-close.png" alt="icon-close" className='img-fluid'/>
                                        </button> */}
                                        <div className='mb-lg-5 mb-4'>
                                        <img src={asset+"images/Eduvanz.png"} alt="Eduvanz" className='img-fluid'/>
                                        
                                        </div>
                                        <div className='d-flex c_card_number mb-lg-4 mb-3'>
                                            <span>{this.state.cardNumber}</span>
                                        </div>
                                        <div className='d-flex align-items-end mb-4'>
                                            <div className='card_valid_time' style={{"width":"30%"}}>
                                                <h5>Expiry</h5>
                                                <div className='ex_date'>{this.state.expiryDate}</div>
                                            </div>
                                            <div className='card_valid_time' style={{"width":"20%"}}>
                                            <h5>CVV</h5>
                                                <div className='cvv_number'>{this.state.isShowCvv?this.state.cvv:'---'}</div>
                                            </div>
                                            <div style={{"width":"30%"}}>
                                            <div onClick={this.handleViewCvv} className="cursor-point"><img src={asset+"images/view-white.png"} alt="view-white" className='img-fluid'/></div>  
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-end'>
                                            <div><img src={asset+"images/visa-white.png"} alt="visa-white" className='img-fluid'/></div>
                                        </div>
                                        <button 
                                        onClick={()=>this.handleVirtualCardView()}
                                        className='share_btn rounded-circle position-absolute d-flex align-items-center justify-content-center'>
                                        <img src={asset+"images/icons/share_icon.png"} alt="share_icon" className='img-fluid'/>
                                        </button>
                                    </div> 
                                    <img src={asset+"images/card_bg.png"} alt="card_bg"  className='img-fluid'/>
                                   
                                </div>
                            {/* <img src={asset+"images/abstract_memphis.png"} alt="abstract_memphis" className='img-fluid'/> */}
                            </div>
                        </div>
                        )}
                        {!this.state.havecard && (
                            <div className='col-lg-6'>
                                <div className='d-flex justify-content-center'>
                                    <div className='card border-0' style={{cursor:'pointer'}} onClick={this.generateVcard}>
                                        <div className='card-body'>
                                            <p className='font-weight-bold fs-19 mb-0 text-capitalize' ><i className='fa fa-information'></i> Your Card is not ready Try Again</p>
                                        </div>
                                    </div>
                                    {/* <button type="button" onClick={this.generateVcard} className='btn__ black'></button> */}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='h_i_w mt-5 mb-5'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <h2 className='mb-lg-5 mb-4 text-center title'>Confused about next steps?</h2>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='h_i_w_box'>
                                <div className='icon icon1'>
                                    <img src={asset+"images/icons/icon_1.png"} alt="icon_1" className='img-fluid'/>
                                </div>
                                <h4>Copy Card Number </h4>
                                <p>Copy Card Number on this page</p>
                                </div>
                             
                            </div>
                            <div className='col-lg-4'>
                            <div className='h_i_w_box'>
                            <div className='icon icon2'>
                                    <img src={asset+"images/icons/icon_2.png"} alt="icon_2" className='img-fluid'/>
                                </div>
                                <h4>Copy Card Number </h4>
                                <p>Copy Card Number on this page</p>
                                    </div>
                          </div>
                            <div className='col-lg-4'>
                            <div className='h_i_w_box'>
                            <div className='icon icon3'>
                                    <img src={asset+"images/icons/icon_3.png"} alt="icon_3" className='img-fluid'/>
                                </div>
                                <h4>Copy Card Number </h4>
                                <p>Copy Card Number on this page</p>
                                    </div>
                           </div>
                        </div>
                    </div>
                   
                </div>
            </section>
            </>
        )
    }
}

const mapSTP = state => {
    const { user, isLoading, sfid } = state.auth;
    const { selectedplan } = state.payment;
    const { merchant_id } = state.product;
    const { loan_amount, down_payment } = state.user;
    return {
        currentUser: state.currentUser,
        selectedplan,
        down_payment,
        loan_amount,
        merchant_id,
        isLoading,
        sfid,
        user
    }
}

export default connect(mapSTP)(VirtualCard5)