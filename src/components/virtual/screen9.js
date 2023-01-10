import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import HeaderNew from "../../common/headerNew";
import { asset } from "../../common/assets";
import { Modal,Button } from "react-bootstrap"
import { sendUserOtp, getAccountProfile, getBankDetails,paymentStatus } from "../../actions/user";
import { verifyUserOtp } from "../../actions/auth"; 
import { getPlanById, generateVCard } from "../../actions/payment";

class VirtualCard4 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            mobile: null,
            timer: '00:18',
            account_no: null,
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            errorMsg: null,
            viewResend: false,
            logId: null,
            bank: null,
            downpayment: null,
            openTab  :false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleOtpChange = this.handleOtpChange.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.textInput1 = React.createRef();
        this.textInput2 = React.createRef();
        this.textInput3 = React.createRef();
        this.textInput4 = React.createRef();
    }

    async componentDidMount() {
        const { user, dispatch, selectedplan, sfid } = this.props;
       // this.props.history.goBack();
        $('.continue-btn').on('click', function(){
            $(this).parent('.send-otp-section').hide();
            $('.send-otp-fillup-section').fadeIn();
        })
        $('.resend-btn').on('click', function(){
            $(this).parent('.send-otp-fillup-section').hide();
            $('.send-otp-section').fadeIn();
        })

        $('.detectLocation').on('click', function(){
            $('#allAddress, #addressForm').hide();
            $('#locationMap').show();
        })

        $('.enterManually').on('click', function(){
            $('#allAddress, #locationMap').hide();
            $('#addressForm').show();

        })

        $('.addressForm input').change(function(){
            var $this = $(this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
        $('.select-style select').change(function(){
            var $this = $(this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
        let acObj = {
            user_sfid: sfid,
        }
        await dispatch(getAccountProfile(acObj)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({mobile: response.accountDet.phone,email :response.accountDet.email__c,name : `${response.accountDet.first_name__c} ${response.accountDet.last_name__c}` });
            }
        });
        let obj = {
            plan_id: selectedplan,
            user_sfid: sfid
        }
        await dispatch(getPlanById(obj)).then((response)=>{
            if(response.status ==="success")
            {
               let getData = response.data;
               const bank = response && response.bank?response.bank:null;
              // console.log("downpayment", getData.down_payment__c);
               this.setState({ bank: bank, downpayment: getData.down_payment__c? getData.down_payment__c:0})
            }
        });
        let paymentStatus = localStorage.getItem("paymentStatus")
        if(paymentStatus == "Failed"){
            this.setState({openTab : true},()=>{
                localStorage.removeItem('paymentStatus')
            })
        }
    }

    inputfocus = (elmnt, getvalue) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
          const next = elmnt.target.tabIndex - 2;
          if (next > -1) {
            //  console.log("next", next);
              this.reverseFocueInputS(next);
          }
        }
        else {
          const pattern = /^[0-9]$/;
          if(pattern.test(elmnt.target.value))
          {
            const next = elmnt.target.tabIndex;
            if (next < 4) {
                console.log("else next", next);
                this.focueInputS(next);
            }
          }else{
            this.setState({[getvalue]: ''});
            document.getElementById(getvalue).value = '';
          }
        }
    
    }

    reverseFocueInputS = (next) =>{
        if(next ===2)
        {
            this.textInput3.current.focus();
        }else if(next ===1)
        {
            this.textInput2.current.focus();
        } else if(next ===0)
        {
            this.textInput1.current.focus();
        }
    }

    focueInputS = (next) =>{
        if(next ===1)
        {
            this.textInput2.current.focus();
        }else if(next ===2)
        {
            this.textInput3.current.focus();
        } else if(next ===3)
        {
            this.textInput4.current.focus();
        }
    }

    startTimer() {
        var presentTime = this.state.timer;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = this.checkSecond((timeArray[1] - 1));
        if(s==59){m=m-1}
        if(m === '00' && s === '00')
        {
          this.setState({viewResend: true});
        }
        if(m<0){
          return
        }
        this.setState({timer:  m + ":" + s});
        setTimeout(this.startTimer, 1000);
    }

    checkSecond(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec};
        if (sec < 0) {sec = "59"};
        return sec;
    }

    handleOtpChange(value1, event) {
        this.setState({ [value1]: event.target.value, errorMsg: '' });
        if(value1 ==="otp4" && event.target.value)
        {
            this.handleSubmitotp(event.target.value);
        }
        
    }

    handleSubmitotp = async (otp4) =>{
        const { otp1, otp2, otp3 } = this.state
        const { dispatch, history } = this.props;
        if(otp1 && otp2 && otp3)
        {
            const givenOtp = parseInt(this.state.otp1+this.state.otp2+this.state.otp3+otp4);
            if(this.state.logId){
            let data = { 
                otp: givenOtp,
                logId: this.state.logId
            }
            await dispatch(verifyUserOtp(data))
            .then((response) => {
                if(response.status ==='success')
                {
                    this.setState({
                        otp1:'',
                        otp2:'',
                        otp3:'',
                        otp4:''
                    });
                    if(this.state.downpayment)
                    {
        this.openPayModal();
        // history.push(`/choosePaymentType`);
                    }else{
                        this.generateVcard();
                    }
                          
                }else{
                    this.setState({ errorMsg: true});
                }
            });
        }else{
            if(givenOtp == "1111"){
                if(this.state.downpayment)
                    {
                        // history.push(`/choosePaymentType`);
        this.openPayModal();

                    }else{
                        this.generateVcard();
                    }
            }else{
                this.setState({ errorMsg: true});
            }
        }
        }
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
            amount: 100, //100000,
            name: 'Eduvanz',
            description: 'Test Transaction',
            image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
            "handler": async (response) => {
              console.log("response", response);
              let data = {
                  plan: this.props.selectedplan,
                //   product_id: this.props.product_id
              }
            //  await this.props.dispatch(updatePaymentData(data));
             this.props.history.push("/strideCard");
            
            },
            "modal": {
                "ondismiss": function(){
                    console.log('Checkout form closed');
                    
                }
            },
            
            prefill: {
                name: this.state.name?this.state.name:'',
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
      
  rzp1.on("payment.failed", function (response) {
    // alert('response.error.code hello');
    // this.props.dispatch(paymentStatus("Failed"))
    window.location= "/loanSummary"
    // this.props.history.push("/loanSummary");
    
    // window.location =`/order-reject/${this.state.plansfid}/${this.state.planfailid}` 
  });
        rzp1.open();
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
    generateVcard = async () =>{
        const { user, loan_amount, down_payment, selectedplan } = this.props
        let sfid = localStorage.getItem("sfid")
        let borrowLimit = localStorage.getItem('loan_amount')
        let obj = {
            user_sfid: sfid,
            merchant_sfid : "00171000006tj13AAA",
            card_limit :  borrowLimit,
            // down_payment: down_payment,
            // card_limit: loan_amount,
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

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
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

    handleSendOtp = () =>{
        const { user, dispatch } = this.props
        let data = {
            id: parseInt(user)
        }
        $('.send-otp-section').hide();
        $('.send-otp-fillup-section').fadeIn();
        this.startTimer()
       dispatch(sendUserOtp(data)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({logId: response.logId});
                $('.send-otp-section').hide();
                $('.send-otp-fillup-section').fadeIn();
            }
        });
        
    }

    handleResendSendOtp = () =>{
        // this.props.history.push("/choosePaymentType")
        this.setState({
            otp1:'',
            otp2:'',
            otp3:'',
            otp4:''
        });
        const { user, dispatch } = this.props
        let data = {
            id: parseInt(user)
        }
        this.startTimer()
         dispatch(sendUserOtp(data)).then((response)=>{
            if(response.status ==="success")
            {
                this.setState({logId: response.logId});
                $('.send-otp-section').hide();
                $('.send-otp-fillup-section').fadeIn();
            }
        });
        
    }

    replaceCardMiddle(string) {
        return string.toString().replace(/^(\+?[\d]{0})\d+(\d{4})$/g,"*******$2");
     }
    
    render() {
        const { user, planData, sfid,storeDetails,username,isSearching,searchDet,favorite_count } = this.props;
        const { bank } = this.state
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
        if(bank && bank.account_number__c)
        {
            accNo = this.replaceCardMiddle(bank.account_number__c);
        }
        return (
            <>
            <Helmet>
                <title>Virtual Card 4</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
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

            <section className="kyc_pages bank_screen">
               <div className='container'>
                   <div className='row'>
                       <div className='col-sm-12'>
                           <div className='d-flex align-items-center'>
                               <button type='button' onClick={() => this.props.history.goBack()} className='back-btn rounded-circle mr-3 mr-lg-4'>
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
                                        <span><img src={storeDetails.icon} alt="apple_logo" className='img-fluid'/></span> 
                                        {storeDetails.name}
                                        <button type='button' onClick={()=> this.props.history.push("/virtualCard")} className='edit-btn ml-3'>Edit</button>
                                    </li>
                                    <li className='active' onClick={()=>this.props.history.push('/amountLimit')}>
                                        <span><img src={asset+"images/icons/amount_icon.png"} alt="amount_icon" className='img-fluid'/></span>
                                        Enter Amount
                                    </li>
                                    <li className='active' onClick={()=>this.props.history.push('/paymentPlan')}>
                                        <span><img src={asset+"images/icons/payplan_icon.png"} alt="payplan_icon" className='img-fluid'/></span>
                                        Payment plan
                                    </li>
                                    <li className='active' onClick={()=> this.props.history.push("/loanSummary")}>
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
                                        <h3 className='mb-1'>{planData.net_tenure__c?planData.net_tenure__c:'--'} {planData.frequency_of_payments__c?planData.frequency_of_payments__c:'--'}</h3>
                                        <p className='m-0'>Tenure</p>
                                    </div>
                                    <div className='p-o_head_r'>
                                        <h3 className='mb-1'> <i className='rupee'></i>{planData.currencyisocode ==='INR'?(<i className='rupee'></i>):'$'}{planData.disbursal_amount__c?planData.disbursal_amount__c.toLocaleString('en-IN'):'--'}</h3>
                                        <p className='m-0'>Monthly</p>
                                    </div>
                                </div>
                                <div className='min-height'>

                                
                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>Due Today <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid'/></span></p>
                                        <h3><i className='rupee'></i>{planData.emi_amount__c?planData.emi_amount__c.toLocaleString('en-IN'):'--'}</h3>
                                    </div>
                                    <div className='emi_r'>
                                    <p className='mb-1'>Tenure</p>
                                        <h3>{planData.net_tenure__c?planData.net_tenure__c:'--'} {planData.frequency_of_payments__c?planData.frequency_of_payments__c:'--'}</h3>
                                    </div>
                                </div>

                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>Interest (APR)</p>
                                        <h3>{planData.fixed_rate__c?planData.fixed_rate__c:'--'} p.a</h3>
                                    </div>
                                    <div className='emi_r'>
                                    <p className='mb-1'>EMI account</p>
                                    {accNo && (
                                        <h3 className='d-flex align-items-center justify-content-end'>{accNo}
                                            {bank && bank.bank_icon && (
                                            <img 
                                            src={bank.bank_icon} 
                                            className='img-fluid' 
                                            alt="apple" 
                                            style={{"width":'18px'}}
                                            />
                                            )}
                                        </h3>
                                    )}
                                    </div>
                                </div>

                                <div className='d-flex row_emi'>
                                    <div className='emi_l'>
                                        <p className='mb-1'>First EMI due date</p>
                                        <h3>{planData.first_emi_date__c?planData.first_emi_date__c:'--'}</h3>
                                    </div>
                                    <div className='emi_r'>
                                    <p className='mb-1'>Last EMI due date</p>
                                        <h3>{planData.last_emi_date__c?planData.last_emi_date__c:'--'}</h3>
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
                    <div className='row'>
                        <div className='col-sm-12 text-center'>
                            <div className='send-otp-section'>
                                <p className='otp-txt mt-4 mb-4'><img src={asset+"images/icons/icon-ind.png"} alt="icon-ind2" className='img-fluid'/> You will receive OTP on + {strMobile}</p>
                                <button onClick={this.handleSendOtp} className='d-inline-block continue-btn'>
                                    Continue
                                </button>
                            </div>

                            <div className='send-otp-fillup-section text-center mt-5'>
                                <h4 className='e_otp_txt'>Enter OTP sent to {hMobile}</h4>
                                <div className='otp-fill-boxes d-flex justify-content-center'>
                                <input 
                                        ref={this.textInput1}
                                        name="otp1"
                                        id="otp1"
                                        type="text" 
                                        autoComplete="off"
                                        value={this.state.otp1}
                                        maxLength={1} 
                                        onChange={e => this.handleOtpChange("otp1", e)}
                                        tabIndex="1" 
                                        placeholder={0}
                                        onKeyUp={e => this.inputfocus(e,"otp1")}
                                        className={`${this.state.errorMsg && this.state.otp1?"error":""}`}
                                         />
                                    <input 
                                        ref={this.textInput2}
                                        type="text" 
                                        maxLength={1}
                                        name="otp2"
                                        id="otp2"
                                        autoComplete="off"
                                        value={this.state.otp2}
                                        onChange={e => this.handleOtpChange("otp2", e)}
                                        tabIndex="2" 
                                        placeholder={0}
                                        onKeyUp={e => this.inputfocus(e,"otp2")}
                                        className={`${this.state.errorMsg && this.state.otp2?"error":""}`}
                                        />
                                    <input 
                                        ref={this.textInput3}
                                        type="text" 
                                        maxLength={1}
                                        name="otp3"
                                        id="otp3"
                                        autoComplete="off"
                                        value={this.state.otp3}
                                        onChange={e => this.handleOtpChange("otp3", e)}
                                        tabIndex="3" 
                                        placeholder={0}
                                        onKeyUp={e => this.inputfocus(e,"otp3")}
                                        className={`${this.state.errorMsg && this.state.otp3?"error":""}`}
                                        />
                                    <input 
                                        ref={this.textInput4}
                                        type="text" 
                                        maxLength={1}
                                        name="otp4"
                                        id="otp4" 
                                        autoComplete="off"
                                        value={this.state.otp4}
                                        onChange={e => this.handleOtpChange("otp4", e)}
                                        tabIndex="4" 
                                        placeholder={0}
                                        onKeyUp={e => this.inputfocus(e,"otp4")}
                                        className={`${this.state.errorMsg && this.state.otp4?"error":""}`}
                                        />
                                </div>
                                {(this.state.otp1 || this.state.otp2 || this.state.otp3 || this.state.otp4) && this.state.errorMsg?(
                                <span className='d-inline-block invalid_otp'>Please enter valid OTP</span>
                                ):''}
                                 {!this.state.viewResend && (
                                     <p className='mb-4'><img src={asset+"images/icons/icon-ind.png"} alt="icon-ind2" className='img-fluid'/> Verification code valid for next {' '+this.state.timer} min</p>  
                                 )}
                                
                                {this.state.viewResend && (
                                <button onClick={this.handleResendSendOtp} className='d-inline-block resend-btn'>
                                    Resend OTP
                                </button>
                                 )}
                            </div>
                            
                            <p className='arg-txt mt-4'>I have reviewed and agree to the <span>Truth in Lending Disclosure</span> and <span>Loan Agreement</span> provided by Eduvanz and have received the Credit <span>Score Disclosure</span>.</p>
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
            <Modal
    //   {...props}
    show = {this.state.openTab}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          Payment Failed !!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      Please try Again, Your Payment is failed.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{
            this.setState({openTab : false})
        }}>Close</Button>
      </Modal.Footer>
    </Modal>
     
            </>
        )
    }
}

const mapSTP = state => {
    const { user, sfid,username } = state.auth;
    const { selectedplan, planData } = state.payment;
    const {storeDetails ,isSearching, searchDet, favorite_count } = state.product;
    const { loan_amount, down_payment } = state.user;
    return {
        loan_amount,
        down_payment,
        sfid,
        user,
        selectedplan,
        planData,storeDetails,isSearching, searchDet, favorite_count,username
    }
}

export default connect(mapSTP)(VirtualCard4)