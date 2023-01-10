import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from '../../common/assets';
import { getAccountProfile, getBankDetails } from "../../actions/user";
import { getPlanById } from "../../actions/payment";
import { generateVCard } from "../../actions/payment"

class VirtualCard7 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            mobile: null,
            email: null,
            username: null,
            errorMsg: null,
            viewResend: false,
            logId: null,
            downpayment: null,
            account_no: null,
        }
    }

    async componentDidMount() {
        const { user, dispatch, selectedplan, sfid } = this.props;

        let data = {
            id: user
          }
  
          dispatch(getBankDetails(data)).then((response)=>{
            if(response.status ==="success")
            {
                let getData = response.data;
                this.setState({
                    account_no: getData && getData.account_number__c?getData.account_number__c:''
                });
            }
        });

        let userDet = {
            user_sfid: sfid,
        }
        await dispatch(getAccountProfile(userDet)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({ username: response && response.accountDet?response.accountDet.first_name__c:'',mobile: response && response.accountDet?response.accountDet.phone:'', email: response && response.accountDet?response.accountDet.email__c:'' });
            }
        });
        let obj = {
            plan_id: selectedplan
        }
        await dispatch(getPlanById(obj)).then((response)=>{
            if(response.status ==="success")
            {
               let getData = response.data;
               console.log("downpayment", getData.down_payment__c);
               this.setState({ downpayment: getData.down_payment__c? getData.down_payment__c:0})
            }
        });
    }

    replaceMiddle(string, n) {
        let str;
        if(n > 0)
        {
            str = string.replace(/^(\+?[\d]{2})\d+(\d{4})$/g,"$1****$2");
        }else{
            str = string.replace(/^(\+?[\d]{0})\d+(\d{4})$/g,"$1XXXXXX$2");
        }
       return str
    }

    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
  
    async openPayModal()
    {
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
  
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        var options = {
            key: 'rzp_test_FCJbc6ap4R4xtE',
            amount: (this.state.downpayment*100), //100000,
            name: 'Eduvanz',
            description: 'Test Transaction',
            image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
            "handler": async (response) => {
              console.log("response", response);
              const order_id = response.razorpay_payment_id;
              const order_token = response.razorpay_order_id;
              this.generateVcard();
             //this.props.history.push(`/virtual_card5?order_id=${order_id}&order_token=${order_token}`);
            },prefill: {
                name: this.state.username?this.state.username:'',
                email: this.state.email?this.state.email:'',
                contact: this.state.mobile?this.state.mobile:'',
            },
            "theme": {
              "color": "#F37254"
            }
          };
          var rzp1 = new window.Razorpay(options);
        /*  document.getElementById('rzp-button1').onclick = function (e) {
            rzp1.open();
            e.preventDefault();
          } */
      /*   const rzp1  = new window.Razorpay(options); */
        rzp1.open();
    }

    payNow = (type) =>{
        this.openPayModal();
    }

    generateVcard = async () =>{
        const { user, loan_amount, down_payment, selectedplan, sfid } = this.props
        let obj = {
            user_sfid: sfid,
            down_payment: down_payment,
            card_limit: loan_amount,
            plan_id: selectedplan
          }
          await this.props.dispatch(generateVCard(obj)).then((response)=>{
            if(response.status ==="success")
            {
               this.props.history.push("/view_card");
            }else{
               this.props.history.push("/view_card");
            }
          })
    }

    replaceCardMiddle(string) {
        return string.toString().replace(/^(\+?[\d]{0})\d+(\d{4})$/g,"*******$2");
    }
    
    render() {
        const { user, planData, isLoading, sfid } = this.props;
        if(!sfid)
        {
          window.location="/login";
        }
        let strMobile = '';
        let hMobile = '';
        if(this.state.mobile)
        {
            strMobile = this.replaceMiddle(this.state.mobile, 2);
            hMobile = this.replaceMiddle(this.state.mobile, 0);
        }
        let accNo = '';
        if(this.state.account_no)
        {
            accNo = this.replaceCardMiddle(this.state.account_no);
        }
        return (
            <>
            <Helmet>
                <title>Virtual Card 7</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
                ):''}
            <Header
              user = {user}
            />

            <section className="kyc_pages bank_screen">
               <div className='container'>
                   <div className='row'>
                       <div className='col-sm-12'>
                           <div className='d-flex align-items-center'>
                               <button className='back-btn rounded-circle mr-3 mr-lg-4'>
                                   back
                               </button>
                               <h2 className="back-btn-text m-0">Virtual Card</h2>
                               </div>
                        </div>
                   </div>
                   <div className='row mt-4'>
                    <div className='col-sm-12'>
                        <div className='w-100 virtual_card_process'>
                            <div>
                                <ul className='d-flex list-unstyled m-0 '>
                                    <li className='active'>
                                        <span><img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/></span> 
                                        Apple India
                                        {/* <button className='edit-btn ml-3'>Edit</button> */}
                                    </li>
                                    <li className='active'>
                                        <span><img src={asset+"images/icons/amount_icon.png"} alt="amount_icon" className='img-fluid'/></span>
                                        Enter Amount
                                    </li>
                                    <li className='active'>
                                        <span><img src={asset+"images/icons/payplan_icon.png"} alt="payplan_icon" className='img-fluid'/></span>
                                        Payment plan
                                    </li>
                                    <li className='active'>
                                        <span><img src={asset+"images/icons/summary_icon.png"} alt="summary_icon" className='img-fluid'/></span>
                                        Summary
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                   </div>
                   <div className='row mt-4'>
                        <div className='col-lg-6'>
                            <div className='overflow-hidden mb-lg-0 mb-4' style={{borderRadius:"15px"}}>
                            <img src={asset+"images/ezgif.png"} alt="apple" className='img-fluid'/>
                             </div>
                         </div>
                        <div className='col-lg-6'>
                            <div className='p-r'>
                                <div className='p-o_head d-flex justify-content-between'>
                                    <div className='p-o_head_l'>
                                        <h3 className='mb-1'>{planData && planData.net_tenure__c?planData.net_tenure__c:'--'} {planData && planData.frequency_of_payments__c?planData.frequency_of_payments__c:'--'}</h3>
                                        <p className='m-0'>Tenure</p>
                                    </div>
                                    <div className='p-o_head_r'>
                                        <h3 className='mb-1'> <i className='rupee'></i>{planData && planData.currencyisocode ==='INR'?(<i className='rupee'></i>):'$'}{planData && planData.disbursal_amount__c?planData.disbursal_amount__c.toLocaleString('en-IN'):'--'}</h3>
                                        <p className='m-0'>Monthly</p>
                                    </div>
                                </div>
                                <div className='min-height'>

                                
                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>Due Today <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid'/></span></p>
                                        <h3><i className='rupee'></i>{planData && planData.emi_amount__c?planData.emi_amount__c.toLocaleString('en-IN'):'--'}</h3>
                                    </div>
                                    <div className='emi_r'>
                                    <p className='mb-1'>Tenure</p>
                                        <h3>{planData && planData.net_tenure__c?planData.net_tenure__c:'--'} {planData && planData.frequency_of_payments__c?planData.frequency_of_payments__c:'--'}</h3>
                                    </div>
                                </div>

                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>Interest (APR)</p>
                                        <h3>{planData && planData.fixed_rate__c?planData.fixed_rate__c:'--'} p.a</h3>
                                    </div>
                                    <div className='emi_r'>
                                    <p className='mb-1'>EMI account</p>
                                        <h3 className='d-flex align-items-center justify-content-end'>{accNo?accNo:'*******9172'} 
                                            <img 
                                            src={asset+"images/bank-icon/bank-2.png"} 
                                            className='img-fluid' 
                                            alt="apple" 
                                            style={{"width":'18px'}}
                                            />
                                        </h3>
                                    </div>
                                </div>

                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>First EMI due date</p>
                                        <h3>12 December, 2022</h3>
                                    </div>
                                    <div className='emi_r'>
                                    <p className='mb-1'>Last EMI due date</p>
                                        <h3>12 December, 2022</h3>
                                    </div>
                                </div>
                                </div>
                                <div className='border-line-dotted'></div>

                                <div className='d-flex justify-content-center align-items-center pt-3'>
                                        <p className='poweredBy m-0 mr-2'>Powered by</p>
                                        <img src={asset+"images/fullerton_india.png"} className='img-fluid' alt="fullerton_india" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-sm-12 text-center'>
                            <div className='send-otp-section'>
                               <button onClick={this.payNow} className='d-inline-block continue-btn'>
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-12 t-c'>
                            <h4>Terms &amp; Conditions</h4>
                            <p>Price may also include trade-in credit. Pricing with a trade-in is after trade-in of a specific device. Trade-in values vary based on the condition, year, and configuration of your trade-in device. You must be at least 18 years old. Additional terms from Apple or Apple’s trade-in partner may apply.
                                </p>
                                <p>Representative example: Based on purchase of ₹17430. Total amount payable ₹18462 paid over 9 months as 9 monthly payments of ₹2051 at an interest rate of 14% paper annum. Total interest paid to bank: ₹1032.</p>
                                <p>
                                §No-Cost EMI available for purchases made using qualifying credit cards on 12-month tenure only. Offer available on qualifying purchases made after 1:30 PM IST on 6 December 2021 and before 11:59 PM IST on 19 January 2022. Minimum order spend applies as per your credit card’s issuing bank threshold. Offer cannot be combined with Apple Store for Education or Corporate Employee Purchase Plan pricing. Credit card eligibility is subject to terms and conditions between you and your credit card issuing bank. Offer may be revised or withdrawn at any time without any prior notice. Offer valid for limited period. Terms &amp; Conditions apply.</p>
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
    const { selectedplan, planData } = state.payment;
    const { loan_amount, down_payment } = state.user;
    return {
        loan_amount,
        down_payment,
        selectedplan,
        isLoading,
        planData,
        sfid,
        user
    }
}

export default connect(mapSTP)(VirtualCard7)