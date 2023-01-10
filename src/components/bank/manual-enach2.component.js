import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import { getBanks, getBankDetails, createRazorPayOrder, enachRegistration,markStage } from "../../actions/user";
import { updatePreviousPath } from "../../actions/auth";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';
import Select from 'react-select';
import seedrandom from '@tensorflow/tfjs-layers/dist/tf-layers.node';

class ManualEnach2 extends Component {
  constructor() {
    super()
    this.state = {
        selectedBank: null,
        bankDetails: null,
        status: 0,
        myBank: null,
        selectedTab: 1,
        ifsc: null,
        account_holder_name: null,
        account_no:null,
        cardNumber:'',
        DebitCardName:'',
        cardExpiryDate:'',
        cardExpiryError:true,
        cardCvv:'',
        debitCardSelect : true,
        isErrorName:true,
        isDebitCardName:true,
        errorname:'',
        failMessage:'',
        isCvv:true,
        failMessagecvv:'',
        isCardNum:true,
        failMessageNum:'',
        failMessageExpiry:'',
        isError:false,
        errormsg:''
    }
}

  componentDidMount()
  {
      const { user, dispatch, sfid } = this.props
      let url = window.location.href
      let record = url.split('/')
      let recordId = record[record.length - 2];
      let lenderId = record[record.length - 1];
      this.setState({recordId,lenderId})
      if(!sfid)
      {
        const path = window.location.pathname;
        dispatch(updatePreviousPath(path));
        this.props.history.push('/login');
      }
      dispatch(getBanks());
      $('.label input').change(function(){
          var $this = $(this);
          if($this.val())
              $this.addClass('filled')
          else
              $this.removeClass('filled')
        })

        $('.b_c_a_tabs_conteiner .b_c_a_tabs_content').hide();
        $(".b_c_a_tabs_conteiner .b_c_a_tabs_content").eq(0).show()

        $('.b_c_a_tabs button').on('click', function(){
            var tab_id2 = $(this).attr('data-target');
            $('.b_c_a_tabs_content').hide();
            console.log($("#"+ tab_id2));
            $(this).addClass('active');
            $(this).parent().siblings().find('button').removeClass('active');
            $("#" + tab_id2).show();
        })

        let data = {
          user_sfid: this.props.sfid
        }

        this.props.dispatch(getBankDetails(data)).then((response)=>{
          if(response.status ==="success")
          {
              let getData = response.data;
             // let bankData = getData && getData.bank_list?getData.bank_list:null;
              this.setState({
                  ifsc: getData && getData && getData.ifsc__c?getData.ifsc__c:'',
                  account_holder_name: getData && getData.bank_account_holder_name__c?getData.bank_account_holder_name__c:'',
                  account_no: getData && getData.account_number__c?getData.account_number__c:'',
                  bankDetails: getData,
                  selectedBank: getData && getData.bank_name?getData.bank_name:''
              });
          }
      });
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

  async openPayModal(cust_id, order_id)
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
          order_id: order_id,
          customer_id: cust_id,
          recurring: "1",
          //amount: 100000, //  = INR 1
          name: 'Eduvanz',
          description: 'Test Transaction',
          image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
          "handler": (response) => {
            console.log("response", response);
            let data = {
              user_sfid: localStorage.getItem('sfid')
            }
            let newObj = {
              "user_sfid": localStorage.getItem('sfid'),
              "token_id": order_id,
              "amount": "9999",
              "customer_id": cust_id,
              "nach_type": "e-nach",
              "order_id": order_id,
              lender_id : this.state.lenderId
            }
            this.props.dispatch(enachRegistration(newObj));
                let stage_data = { "opportunity_id": this.state.recordId, "stagename": "Pre-disbursal" }
                this.props.dispatch(markStage(stage_data));
            this.setState({status: 1});
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

  handleSubmit = (type) =>{
    const { dispatch, user, sfid } = this.props
      let data = {
        user_sfid: sfid, 
        type: type
      }
      dispatch(createRazorPayOrder(data)).then((response)=>{
          if(response.status === "success")
          {
            const getData = response.data;
            const customer_id = getData && getData.customer_id?getData.customer_id:'';
            const order_id = getData && getData.customer_id?getData.order_id:'';
            this.openPayModal(customer_id, order_id);
          }else if (response.status === "error"){
            // this.setState({isError : true, errormsg : response.message})
          }   
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleNumber = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(e.target.value !=='')
    {
        if (!pattern.test(e.target.value)) {
            this.setState({isValidCvv: true, cvv : "", cvvErroMsg: 'Enter Valid CVV'});
        }else
        {
            this.setState({isValidCvv: false, cvv : e.target.value.toString()});
        }
    }else{
        this.setState({isValidCvv: false, cvv : e.target.value.toString()});
    }
  }

  brandChange = (e) => {
    console.log(e.value);
    this.setState({selectedBank:e.value});
  }

  handleExpiry = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(e.target.value !=='')
    {
        if (!pattern.test(e.target.value)) {
            this.setState({isValidExpiry: true, expiry : "", expiryErroMsg: 'Enter Valid CVV'});
        }else
        {
            this.setState({isValidExpiry: false, expiry :  e.target.value.toString(), expiryErroMsg: ''});
        }
    }else{
        this.setState({isValidExpiry: false, expiry : e.target.value.toString(), expiryErroMsg: ''});
    }
  }

  handleCardNumber = (e) =>{
    var cardNo=e.target.value;
    var masterCardRegex=/^(?:5[1-5][0-9]{14})$/;
    var visaCardRegex=/^(?:4[0-9]{12})(?:[0-9]{3})$/;
    var americanExpCardRegex=/^(?:3[47][0-9]{13})$/;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(cardNo)
    {
        if(pattern.test(e.target.value))
        {
            var cardName="";
            if(masterCardRegex.test(cardNo)){
            cardName="Master Card";
            }else if(visaCardRegex.test(cardNo)){
            cardName="Visa Card";
            }else if(americanExpCardRegex.test(cardNo)){
            cardName="American Express Card";
            }
            if(!cardName)
            {
                this.setState({isvalid: false, cardErroMsg: 'Enter valid card number'});
            }else{
                this.setState({isvalid: true, cardErroMsg: ''});
            }
            this.setState({card_no: cardNo});
        }else{
            this.setState({isvalid: false, cardErroMsg: 'Enter valid card number', card_no: ''});
        }
    }else{
        this.setState({isvalid: true, cardErroMsg: '', card_no: cardNo});
    }
  }

  handlebank = (name, icon) =>{
    this.setState({selectedBank: name, myBank:{name: name, icon: icon }});
    console.log("name ------------------>", name);
  }

  replaceMiddle(string, n) {
    let str;
    if (n > 0) {
        str = string.replace(/^(\+?[\d]{2})\d+(\d{4})$/g, "$1****$2");
    } else {
        str = string.replace(/^(\+?[\d]{0})\d+(\d{4})$/g, "$1XXXXXX$2");
    }
    return str
}
  handleBlur = () =>{

    if(this.state.cardNumber && this.state.cardNumber.length<16 || !this.state.cardNumber){
      this.setState({cardNoError:true})
    }else{
      this.setState({cardNoError:false})
    }
  }
  containsNumber = (str) => {
    return /\d/.test(str);
  }

  handleBlurCard = () =>{
    let firstName = this.state.DebitCardName
    let regExp = /[^a-zA-Z\d\s:]/g;
    let found = regExp.test(firstName)
    let checkNo = this.containsNumber(firstName)
    // alert(found)
    // alert(checkNo)
    if(!this.state.DebitCardName || found || checkNo){
      this.setState({cardNameError:true})
    }else{
      this.setState({cardNameError:false})
    }
  }
  

onAlpha = (e) => {
  /*for first name*/
  if (e.target.name == "DebitCardName" ) {
    const value = e.target.value;
    const regMatch = /^[a-zA-Z ]*$/.test(value);

    if (regMatch ) {
      console.log('hhhh1')
      this.setState({
        DebitCardName: value,isDebitCardName:true,errorname: ""
      })
    }
    // else{
    //   console.log('hhhh2')
    //   this.setState({
    //     isDebitCardName:false,errorname: "Please enter card Name"
    //   })
    // }
    
  }
}

handleCard = (e) => {
  
  if (e.target.name == "cardNumber" ) {
    const value = e.target.value;
    const regMatch = /^[0-9]*$/.test(value);

    if (regMatch) {
      console.log("hh1")
      this.setState({
        cardNumber: value,isCardNum:true,failMessageNum:''
      })
    }
    if(value.length<16){
      this.setState({
            isCardNum: false,failMessageNum: "Please enter valid number."
          })
    }
 
    }
    
  }



  handleExpiry1 = (e) => {
  
    if (e.target.name == "cardExpiryDate" ) {
      const value = e.target.value;
      const regMatch = /^[0-9]*$/.test(value);
      if (regMatch ) {
        console.log('h1')
        this.setState({
          cardExpiryDate: value,cardExpiryError: true,failMessageExpiry: ""
        })
      }
  
      if(value.length<4){
        this.setState({
          cardExpiryError: false,failMessageExpiry: "Please enter valid Expiry."
            })
      }
    
      
    }
  }

handleCVV = (e) => {
  
  if (e.target.name == "cardCvv" ) {
    const value = e.target.value;
    const regMatch = /^[0-9]*$/.test(value);
    if (regMatch ) {
      console.log('h1')
      this.setState({
        cardCvv: value,isCvv: true,failMessagecvv: ""
      })
    }

    if(value.length<3){
      this.setState({
        isCvv: false,failMessagecvv: "Please enter 3 digit Cvv."
          })
    }
  
    
  }
}






  render() {
    const { isLoading, banks } = this.props
    const { selectedBank, status, bankDetails, account_holder_name, account_no, ifsc } = this.state
    const aAcNumber = this.replaceMiddle(account_no?account_no.toString():'', 2);
    let bankOptions = [];
    let bankData;
    console.log(this.state.selectedBank);
    if(banks)
    {
        // bankData = banks.slice(0,6);
        bankData = banks.slice()
        for(var i = 0; i < banks.length; i++){
          bankOptions.push({ value: banks[i].bank_name, label: banks[i].bank_name, img: banks[i].bank_icon });
        }
    }
   console.log("ISTrue",this.state.isMobile,this.state.isCvv,this.state.isErrorName,this.state.cardExpiryDate.length==5)
   
    return (
            <>
            <Helmet>
                <title>Enach </title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
            <section className='bg-light'>
              <div className='container-fluid'>
                  <div className='row justify-content-center'>
                      <div className='col-sm-3 bg-enach px-lg-5 login-bg'>
                          {/* <h4 onClick={ () => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                          <div className="navigations">
                              <ul className="breadcrumps">
                                  <li className="b_back cursor-point"><a href={void(0)} onClick={() => this.props.history.goBack()} >Back</a></li>
                              </ul>
                          </div> */}

                          <LogoSideBar sideTitle="Back" backLink='' historyGoBack="goBack" history={this.props.history} /> 

                          <ul className="kyc_timeline mt-0 pl-0">
                              <li className="complete">Registration</li>
                              <li className="complete">Limit Approval</li>
                              <li className="complete"> Verification</li>
                              <li className="has_child ongoing">AutoPay
                              <span className="sheading">Set up AutoPay & your account is automatically debited on due date  </span>
                              <ul className="sub_timeline">
                                  <li style={{cursor:'pointer'}}  >Bank Account</li>
                                  <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_enach')} className="active">NACH</li>
                              </ul>
                              </li>
                              <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                          </ul>
                      </div>
                      <div className='col-sm-9 mt-5 px-lg-6 py-lg-3 pb-lg-5' >
                          <div className='w-100 mb-5 c_p_m_b pb-4'>
                            <div className='form_header px-3 py-4'>
                                <h4 className='text-center m-0 form_header_h4'>AutoPay</h4>
                            </div>
                            
                            <div  className='d-flex align-items-center justify-content-center pt-3'>
                                <div className='d-flex align-items-center mx-3 stext-111'>
                                <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/lock_icon.png"} alt="mc" className='img-fluid'/></span>
                                100% Secure
                                </div>
                                <div className='d-flex align-items-center mx-3 stext-111'>
                                <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/security_icon.png"} alt="mc" className='img-fluid'/></span> 
                                Trusted by millions
                                </div>
                            </div>

                            <hr/>

                            <div className='row justify-content-center py-4'>
                              <div className='col-sm-10'>
                                <p className='font-weight-medium text-center'>Ensure timely Auto debit of EMIs from your bank account </p>

                                <div className='top_btn_wrap  mb-3'>
                                  <div className='row mx-0'>
                                    <div className='col-lg-4 mb-3'>
                                      <button className='top_btn clr1'><span>01</span>Enter bank details <img src={asset+"images/icons/cv01.png"} className='mr-3'/></button></div>
                                    <div className='col-lg-4 mb-3'><button className='top_btn clr2'><span>02</span> Sign the debit mandate via OTP <img src={asset+"images/icons/cv02.png"} className='mr-3'/></button></div>
                                    <div className='col-lg-4 mb-3'><button className='top_btn clr3'><span>03</span> Submit Consent Form <img src={asset+"images/icons/cv03.png"} className='mr-3'/></button></div>
                                  </div>
                                </div>
                              {status ===1?(
                                <>
                                  <div className='col-sm-12 text-center'>
                                    <div className='bank_d_wrap  mb-5'>
                                      <div className='row align-items-center mx-0'>
                                          <div className='col-lg-4 border-right text-center'>
                                          <span className='bank_d font-weight-medium d-flex align-items-center justify-content-center'>
                                                    <img src={bankDetails && bankDetails.bank_icon?bankDetails.bank_icon:asset+'images/bank-icon/bank-1.png'} className='mr-2' style={{"width":"30px"}}/>
                                                    {bankDetails && bankDetails.bank_name?`${bankDetails.bank_name}`:'ICICI'}
                                                  </span>
                                          </div>
                                          <div className='col-lg-4 border-right text-center'>
                                            <span className='bank_d'>
                                            Account Number: {aAcNumber}
                                            </span>
                                            </div>
                                          <div className='col-lg-4 text-center'>
                                            <span className='bank_d'>
                                            IFSC code: {ifsc}
                                            </span>
                                            </div>
                                      </div>
                                    </div>
                                      <img src={asset+'images/orders/check-circel-tick.png'} className='mb-3' alt="success" />
                                      <h1>Verified</h1>
                                      <p>Awesome! We have verified your account successfully</p>
                                      <div className='row mt-5'>
                                          <div className='col-sm-12 text-center'>
                                              <button
                                                  type='submit'
                                                  className='d-inline-block continue-btn'
                                                  onClick={() => this.props.history.push(`/payment_success/${this.state.recordId}`)}
                                              >
                                                  Continue
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                </>
                              ):(
                              <div className='enach-wrap'>

                              <div className='b_c_a_tabs'>
                                <div className='row'>
                                    <div className='col-lg-6' onClick = {(e)=>{
                                      e.preventDefault()
                                      this.setState({debitCardSelect : true,netBankingSelect:false})
                                    }}>
                                    <button type='button' data-target="dc" className='active'>
                                      <img src={asset+"images/icons/debit-card.png"} className='mr-3'/>
                                      Debit Card</button>
                                    </div>
                                    <div className='col-lg-6'onClick = {(e)=>{
                                      e.preventDefault()
                                      this.setState({netBankingSelect : true,debitCardSelect:false})
                                    }}>
                                        <button type='button' data-target="nb">
                                        <img src={asset+"images/icons/netbanking.png"} className='mr-3'/>
                                        Net Banking</button> 
                                    </div>
                                </div>
                              </div> 


                              <div className='b_c_a_tabs_conteiner px-5 py-4'>
                                <div className='b_c_a_tabs_content' id="dc">
                                   {this.state.debitCardSelect ? <><div className='row'>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                          <span>Card Number</span>
                                          <input type="text" placeholder='' value={this.state.cardNumber} name='cardNumber' id="cardNumber" maxLength={16} onChange={this.handleCard} 
                                          // onBlur = {this.handleBlur}
                                          />
                                        {/* {this.state.cardNoError?<p className='error-msg_ m-0'>Enter Valid card number</p>:""} */}
                                        <div className="input-group-addon input-group-addon-sty">
                                        {this.state.isCardNum == false  && (
                    <span style={{ color: "red", marginTop:"-45px", marginLeft:"-15px" }} className="text-left">
                      {this.state.failMessageNum}
                    </span>
                  )}
                            
                          </div>
                                        </div>
                                        </div>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <span>Name of the card</span>
                                            <input type="text" placeholder='' value={this.state.DebitCardName} name='DebitCardName'id="DebitCardName" maxLength={20} onChange={this.onAlpha} 
                                            // onBlur={this.handleBlurCard}
                                            />
                                            
                                            
                                        </div>
                                        {this.state.isDebitCardName==false  && (
                                                                <span style={{ color: "red" }}>
                                                                    {this.state.errorname}
                                                                </span>
                                                            )}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <span>Expiry Date(MM/YY)</span>
                                            <input type="text" placeholder='' value={this.state.cardExpiryDate} name='cardExpiryDate' maxLength={4} onChange={this.handleExpiry1} />
                                       
                                        </div>
                                        {this.state.cardExpiryError==false&& (
                                                                <span style={{ color: "red", marginTop:"-30px",position:'absolute' }}>
                                                                    Enter a valid date
                                                                </span>
                                                            )}
                                        </div>
                                        <div className='col-lg-6'>
                                        <div className='label'>
                                            <span>CVV</span>
                                            <input type="text" value={this.state.cardCvv} placeholder='' id="cardCvv" name='cardCvv' 
                                            // value={this.state.cardCvv}
                                             onChange={this.handleCVV} maxLength={3} 
                                            // onBlur={this.handleBlurCVV}
                                            />
                                        {/* {this.state.cardCVVError?<p className='error-msg_ m-0'>Enter Valid CVV</p>:""} */}
                                        
                                        </div>
                                        {this.state.isCvv == false && (
                    <span style={{ color: "red", marginTop:"-30px",position:'absolute' }} className="text-left">
                      {this.state.failMessagecvv}
                    </span>
                  )}
                                        </div>
                                    </div> </>: ""}
                    {this.state.netBankingSelect ? <>
                      <div className='back_search_wrapper'>
                                        <div className='mt-lg-5 mt-4'>
                                            <div className='label'>
                                                <Select
                                                    options={bankOptions}
                                                    placeholder="Search your bank"
                                                    name="brand"
                                                    onChange={this.brandChange}
                                                />
                                            </div>
                                        </div>
                                        <ul className='list-unstyled m-0 bank_list d-flex flex-wrap mt-4'>
                                            {bankDetails && bankDetails.length > 0 && (
                                                bankDetails.map((item, index) => (
                                                    <li key={"bank-" + index} onClick={() => this.handlebank(item.bank_name, item.bank_icon)} className={`cursor-point bank d-flex align-items-center justify-content-center flex-column ${selectedBank === item.bank_name ? 'active' : ''}`}>
                                                        <div className='bank_logo'>
                                                            <img src={item.bank_icon} alt="icon-ind2" className='img-fluid' />
                                                        </div>
                                                        <p className='bank_name text-uppercase m-0 mt-3'>{(item.bank_name).split(" ")[0]}</p>
                                                    </li>
                                                ))
                                            )
                                            }
                                        </ul>
                                        {selectedBank && (
                                            <div className='row'>
                                                <div className='col-sm-12 text-center'>
                                                    <button
                                                        type='submit'
                                                        className='d-inline-block continue-btn'
                                                        onClick={this.handleContinue}
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
</> : ""}
                                      <div className='d-flex justify-content-center'>
                                  <div className='d-flex align-items-center'>
                                    
                                    <span style={{"width":"38px"}} className="d-inline-block mr-1"><img src={bankDetails && bankDetails.bank_icon?bankDetails.bank_icon:asset+'images/bank-icon/bank-1.png'} alt="state-bank" className='img-fluid'/></span>
                                    {account_holder_name?account_holder_name:''} - {aAcNumber?aAcNumber:''}
                                  </div>
                                </div>
                                    <div className='px-3 text-center'>
                                      <p>When you click Continue, you will be redirected to our banking partner.</p>
                                      <button
                                     // disabled = { (this.state.DebitCardName!='' && !this.state.isDebitCardName) && (this.state.cardCvv!='' && !this.state.isCvv) && ( !this.state.isErrorName && this.state.DebitCardName !='') && (this.state.cardExpiryDate!='' && !this.state.cardExpiryError) && (this.state.cardNumber!='' && !this.state.isCardNum) ? false : true }
                                     disabled = { this.state.DebitCardName!=''  && (this.state.cardCvv!='' && this.state.isCvv) && (this.state.cardNumber!='' && this.state.isCardNum) && (this.state.cardExpiryDate!='' && this.state.cardExpiryError) ? false : true }
                                      type="button" onClick={()=>this.handleSubmit('DebitCard')} className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                                    </div>
                                </div> 

                                <div className='b_c_a_tabs_content' id="nb">
                                  
                                     {/* <div className='row mb-4'>
                                    {bankData && bankData.length >0 &&(
                                      bankData.map((item, index)=>(
                                      <div key={"bank-"+index} onClick={()=>this.handlebank(item.bank_name, item.bank_icon)} className={`col-2 text-center bank ${selectedBank === item.bank_name?'active':''}`}>
                                        <div className='bank_logo mb-2'>
                                          <img src={item.bank_icon}/>
                                        </div>
                                        {item.bank_name}
                                      </div>
                                      )))}
                                  </div> */}
                                   {/* <div className='row'>
                                    <div className='col px-lg-4'>
                                        <div className="search__">
                                            <Select 
                                                options={bankOptions}
                                                placeholder="Search your bank"
                                                name="bank"
                                                onChange={this.brandChange}
                                            />
                                          <input 
                                              name='sub_search'
                                              placeholder='Search your bank'/>
                                          <button className='bg-transparent'>
                                          <i className="fa fa-search" aria-hidden="true"></i> 
                                          </button>
                                        </div>
                                    </div>
                                  </div> */}

<div className='back_search_wrapper'>
                                        <div className='mt-lg-5 mt-4'>
                                            <div className='label'>
                                                <Select
                                                    options={bankOptions}
                                                    placeholder="Search your bank"
                                                    name="brand"
                                                    onChange={this.brandChange}
                                                />
                                            </div>
                                        </div><br/><br/><br/>
                                        <ul className='row mb-4'>
                                            {
                                            bankData && bankData.length > 0 && (
                                                bankData.map((item, index) => {
                                                  if(item.bank_icon !== null){
                                                    return <li key={"bank-" + index} onClick={() => this.handlebank(item.bank_name, item.bank_icon)} className={`col-2 text-center bank ${selectedBank === item.bank_name?'active':''}`}>
                                                    <div className='bank_logo mb-2'>
                                                        <img src={item.bank_icon} alt="icon-ind2" className='img-fluid' />
                                                    </div>
                                                    <p className='bank_name text-uppercase m-0 mt-3'>{(item.bank_name).split(" ")[0]}</p>
                                                    
                                                    {/* <p className='bank_name text-uppercase m-0 mt-3'>{(item.bank_name)}</p> */}
                                                </li>
                                                  }    
                                                })
                                            )
                                            }
                                        </ul>
                                    </div>

                                    <div className='d-flex justify-content-center'>
                                    <div className='d-flex align-items-center'>
                                    {bankDetails && bankDetails.bank_icon ?
                                     <span style={{"width":"38px"}} className="d-inline-block mr-1"><img src={bankDetails?bankDetails.bank_icon:''} alt="state-bank" className='img-fluid'/></span>
                                     :
                                     "" 
                                     }
                                    {account_holder_name?account_holder_name:''} - {aAcNumber?aAcNumber:''}
                                    </div>
                                  </div>
                                  <div className='px-3 text-center'>
                                      <p>On clicking continuing, you will redirected our banking partner</p>
                                      <button type="button" disabled = {this.state.selectedBank ? false : true} onClick={()=>this.handleSubmit('NetBanking')} className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                                  </div>
                                  {this.state.isError && 
                                  <div className='text-center text-danger'>
                                    {this.state.errormsg}
                                  </div>
                                  }
                                </div> 
                              </div>

                              </div> 
                              )}
                              </div>
                            </div>
                            <div className='enach-footer p-3 pr-5 shadow'>
                              <div className='d-flex justify-content-lg-end justify-content-center'>
                                {/* <div className='d-flex align-items-center'>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Get our App <span className='ml-2'><img src={asset+"images/icons/app-icon.png"} alt="app" /></span></div>
                                    <div className="s-l" style={{"height":"27px"}}></div>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Help <span className='help-icon ml-2'>?</span></div>
                                </div> */}
                                  <GetOurApp 
                  dispatch={this.props.dispatch}
                />
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
            </section>
           </>
    );
  }
}

function mapStateToProps(state) {
  const { banks } = state.user;
  const { salesForceToken, user, isLoading, sfid } = state.auth;
  return {
      salesForceToken,
      banks,
      sfid,
      user,
      isLoading
  };
}


export default connect(mapStateToProps) (ManualEnach2);
