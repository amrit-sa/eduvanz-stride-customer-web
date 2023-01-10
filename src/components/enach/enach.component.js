import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { getBanks } from "../../actions/user";
import Select from 'react-select';
import { asset } from "../../common/assets";
import { checkIfsc, checkAccount, updateUserBank, updateBankDetails, getBankDetails } from "../../actions/user";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class Enach extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccountType = this.handleAccountType.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.state = {
            savings: "active",
            bankData: null,
            current: null,
            selectedBank: '',
            myBank: null,
            card_no: null,
            selectedTab: 1,
            name: '',
            ifsc: "",
            cardErroMsg: '',
            expiryErroMsg:'',
            isValidExpiry: false,
            expiry: '',
            isValidNumber: false,
            isValidCvv: false,
            cvv: null,
            cvvErroMsg:'',
            isValidIfsc: true,
            branch_name: null,
            account_holder_name: "",
            account_type: "",
            isIfscError: false,
            isNameError: false,
            isInCorrect: true,
            status: 0
        }
    }


    componentDidMount(){
        const { dispatch } = this.props
        $('.label input').change(function(){
            var $this = $(this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
            })
        dispatch(getBanks());
    }

    componentDidUpdate(){
        $('.error-close').click(function(){
           
            $(this).siblings('input').removeClass('filled')
        })
    }

    brandChange = (e) =>{
        this.setState({selectedBank: e.value, myBank: {name: e.value, icon:e.img }});
    }

    handlebank = (name, icon) =>{
        this.setState({selectedBank: name, myBank:{name: name, icon: icon }});
    }

    handleAccountType = (type) => {
        this.setState({ selectedTab: type});
    }
    clearMessage = (type) => {
        this.setState({ [type]:"" });
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

    handleSubmit = async () => {
            const { selectedBank ,dispatch, user } = this.props
            let card_no = this.state.card_no;
            let ifsc = this.state.ifsc;
            let account_holder_name = this.state.account_holder_name;
            console.log(card_no);
            console.log(ifsc);
            console.log(account_holder_name);
            this.setState({status: 1});
            let obj = {"account_number": this.state.card_no, "ifsc_code": this.state.ifsc}
            let data = {
                bank: selectedBank?selectedBank.name:'',
                account_number: this.state.card_no,
                ifsc: this.state.ifsc,
                name: this.state.account_holder_name,
                account_type: this.state.account_type,
                branch_name: this.state.branch_name,
                id: user,

            }
            
            await dispatch(checkAccount(obj)).then(async (response)=>{
                if(response.status ==="success")
                {
                    await dispatch(updateUserBank(data)).then((response)=>{
                        if(response.status ==="success")
                        {
                            dispatch(updateBankDetails(this.state.card_no));
                        this.setState({status: 2});
                        }else{
                        this.setState({status: 1});
                        }
                });
                }else{
                this.props.history.push('/bank_screen17');
                }
        });
               
    }

    handleContinue = () =>{
        this.props.history.push('/bank_enach');
    }

    renderCard = () =>{
        const { name, expiry, cvv, card_no } = this.state
    let row =(
             <>
                <div className='row'>
                    <div className='col-lg-6'>
                    <div className='label'>
                        <input type="text" placeholder='' maxLength={16} onChange={this.handleCardNumber} value={card_no?card_no:''} name="card_no"/>
                        <span>Card Number</span>
                        { this.state.isValidNumber === true && (
                            <p className='error-msg_ m-0'>{this.state.cardErroMsg}</p>
                        )}
                        { this.state.isValidNumber === true && this.state.cardErroMsg !=='' && (
                            <button onClick={()=>this.clearMessage('card_no')} className='error-close'>
                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                            </button>
                        )}
                    </div>
                    </div>
                    <div className='col-lg-6'>
                    <div className='label'>
                        <input type="text" placeholder='' onChange={this.handleChange} value={name?name:''} name="name"/>
                        <span>Name of the card</span>
                    </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6'>
                    <div className='label'>
                        <input type="text" placeholder='' maxLength={4} onChange={this.handleExpiry} value={expiry?expiry:''} name="expiry"/>
                        <span>Expiry Date(MM/YY)</span>
                        { this.state.isValidExpiry === true && this.state.expiryErroMsg !==''?(
                        <p className='error-msg_ m-0'>{this.state.expiryErroMsg}</p>
                        ):''
                        }
                        { this.state.isValidExpiry === true && this.state.expiryErroMsg !==''?(
                        <button  onClick={()=>this.clearMessage('account_holder_name')}  className='error-close'>
                        <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                        </button>
                            ):''
                        }
                    </div>
                    </div>
                    <div className='col-lg-6'>
                    <div className='label'>
                        <input type="text" placeholder='' maxLength={3} onChange={this.handleNumber} value={cvv?cvv:''} name="cvv"/>
                        <span>CVV</span>
                        { this.state.isValidCvv === true && this.state.cvvErroMsg !==''?(
                        <p className='error-msg_ m-0'>{this.state.cvvErroMsg}</p>
                        ):''
                        }
                        { this.state.isValidCvv === true && this.state.cvvErroMsg !==''?(
                        <button  onClick={()=>this.clearMessage('account_holder_name')}  className='error-close'>
                        <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                        </button>
                            ):''
                        }
                    </div>
                    </div>
                </div>
                { name !=='' && card_no !=='' && expiry !=='' && expiry.length ===4 && cvv !=='' && cvv.length ===3 && (
                    <>
                <div className='row mb-4'>
                    <div className='col-lg-12 d-flex justify-content-center'>
                        
                            <button onClick={this.handleSubmit} className='continue-btn'>Continue</button>
                       
                    </div>
                </div>
                <p className='text-center'><span className='d-inline-block r_s_i_circle mr-2'><i className='rupee'>`</i></span>On clicking continuing, you will redirected our banking partner</p>
               </>
                )}
            </>
    );
        return row;
  }

  renderNetBank = (bankOptions, bankData) =>{
      const { selectedBank } = this.state
        let row = (
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
    {bankData && bankData.length >0 &&(
        bankData.map((item, index)=>(
        <li key={"bank-"+index} onClick={()=>this.handlebank(item.bank_name, item.bank_icon)} className={`cursor-point bank d-flex align-items-center justify-content-center flex-column ${selectedBank === item.bank_name?'active':''}`}>
            <div className='bank_logo'>
            <img src={item.bank_icon} alt="icon-ind2" className='img-fluid'/>
            </div>
            <p className='bank_name text-uppercase m-0 mt-3'>{item.bank_name}</p>
        </li>
        ))
        )
        }
    </ul>
    <div className='row mb-4'>
        <div className='col-lg-12 d-flex justify-content-center'>
            <button onClick={this.handleSubmit} className='continue-btn'>Continue</button>
        </div>
    </div>
    <p className='text-center'><span className='d-inline-block r_s_i_circle mr-2'><i className='rupee'>`</i></span>On clicking continuing, you will redirected our banking partner</p>
    </div>
    );
    return row;
  }
  render() {
            const { isLoading, banks } = this.props
            const { status, selectedTab, selectedBank } = this.state
            let bankOptions = [];
            let bankData;
            if(banks)
            {
                bankData = banks.slice(0,6);
                for(var i = 0; i < banks.length; i++){
                    bankOptions.push({ value: banks[i].bank_name, label: banks[i].bank_name, img: banks[i].bank_icon });
                }
            }
            const rendercardData = this.renderCard();
            const renderNetBankData = this.renderNetBank(bankOptions, bankData);
        return (
            <>
            <Helmet>
                <title> Enach Screen1</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
            <section className='bank_details_wrapper mt-0 pt-5'>
                <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-3'>
                        {/* <h4 onClick={ () => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                            <ul className="breadcrumps">
                                <li className="b_back"><Link to="/ed_doc_others">Back</Link></li>
                            </ul>
                        </div> */}

                        <LogoSideBar sideTitle="Back" backLink='/ed_doc_others' historyGoBack="" history={this.props.history} />

                        <ul className="kyc_timeline">
                            <li className="complete">Registration</li>
                            <li className="complete">Limit Approval</li>
                            <li className="complete">Identity Verifcation</li>
                            <li className="has_child ongoing">AutoPay
                            <span className="sheading">Set up AutoPay & your account is automatically debited on due date </span>
                            <ul className="sub_timeline">
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_profile')} className="active">Bank Account</li>
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_digilocker')} >NACH</li>
                            </ul>
                            </li>
                            <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                        </ul>
                    </div>
                   
                    <div className='col-sm-9'>
                        <div className='w-100 mb-5 c_p_m_b pb-4'>
                            <div className='form_header px-3 py-4'>
                                <h4 className='text-center m-0 form_header_h4'>AutoPay</h4>
                            </div>
                            <div  className='d-flex align-items-center justify-content-center pt-3'>
                                <div className='d-flex align-items-center mx-3 stext-111'>
                                <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/lock_icon.png"} alt="lock" className='img-fluid'/></span>
                                100% Secure
                                </div>
                                <div className='d-flex align-items-center mx-3 stext-111'>
                                <span style={{"width":"10px"}} className="d-inline-block mr-1"><img src={asset+"images/icons/security_icon.png"} alt="security" className='img-fluid'/></span> 
                                Trusted by millions
                                </div>
                            </div>
                            <div className='hr-line my-3'></div>
                        
                            <div className='row justify-content-center py-4'>
                                <div className='col-sm-10'>
                                    <div className='row pt-4 pb-lg-5 pb-4'>
                                        <div className='col-lg-6'>
                                            <button onClick={()=>this.handleAccountType(1)} className= {`account-type-tab ${selectedTab ===1?'active':''}`}>Debit Card</button></div>
                                        <div className='col-lg-6'>
                                            <button onClick={()=>this.handleAccountType(2)} className={`account-type-tab ${selectedTab ===2?'active':''}`}>Netbanking</button>
                                        </div>
                                    </div>
                                    {selectedTab ===1 && (
                                        rendercardData
                                    )}
                                    {selectedTab ===2 && (
                                        renderNetBankData
                                    )}
                                   
                                </div>
                            </div>
                        
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
            </section>
     
            </>
        )
    }
}

function mapStateToProps(state) {
    const { banks, selectedBank } = state.user;
    const { user, isLoading } = state.auth;
    return {
        selectedBank,
        isLoading,
        banks,
        user
    };
}

export default connect(mapStateToProps)(Enach);
