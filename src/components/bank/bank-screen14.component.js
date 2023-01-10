import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import { Redirect } from 'react-router-dom';
import { updateLimit, checkIfsc, checkAccount, updateUserBank, updateBankDetails, getBankDetails } from "../../actions/user";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen14 extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccountType = this.handleAccountType.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleIfscChange = this.handleIfscChange.bind(this);
        this.state = {
            savings: "active",
            bankData: null,
            current: null,
            account_no: "",
            ifsc: "",
            isValidNumber: false,
            isValidIfsc: true,
            branch_name: null,
            account_holder_name: "",
            account_type: "",
            isAccountError: false,
            isIfscError: false,
            isNameError: false,
            isInCorrect: true,
            status: 0,
            UserAttempts: 3
        }
    }


    componentDidMount() {
        $('.label input').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
        let data = {
            user_sfid: this.props.sfid
        }

        this.props.dispatch(getBankDetails(data)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                this.setState({
                    ifsc: getData ? getData.ifsc__c : '',
                    account_holder_name: getData ? getData.bank_account_holder_name__c : '',
                    account_no: getData ? parseInt(getData.account_number__c) : ''
                });

                if (getData && getData.ifsc__c) {
                    // this.handleIfscChange( {} ,  getData.ifsc__c )
                    this.setState({ isValidIfsc: true })
                }
            }
        });

        $("input").trigger('change');

    }

    componentDidUpdate() {
        $('.error-close').click(function () {

            $(this).siblings('input').removeClass('filled')
        })
    }

    handleAccountType = (type) => {
        if (type == "current") {
            this.setState({ savings: "", current: "active", account_type: "current" });
        }
        else if (type == "savings") {
            this.setState({ current: "", savings: "active", account_type: "savings" })
        }
    }
    clearMessage = (type) => {
        if (type == "account_no") {
            this.setState({ account_no: "" });
        }
        else if (type == "ifsc") {
            this.setState({ ifsc: "" })
        }
        else if (type == "account_holder_name") {
            this.setState({ account_holder_name: "" })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleNumber = (e) => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
            }
            else {
                this.setState({ [e.target.name]: e.target.value });
            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }


    handleSubmit = async () => {
        const { selectedBank, dispatch, user, sfid } = this.props
        let account_no = this.state.account_no;
        let ifsc = this.state.ifsc;
        let account_holder_name = this.state.account_holder_name;
        console.log(account_no);
        console.log(ifsc);
        console.log(account_holder_name);
        if (account_no !== '') {
            if (ifsc !== '' && this.state.isValidIfsc) {
                if (account_holder_name !== '') {
                    this.setState({ status: 1 });
                    let obj = { "account_number": this.state.account_no, "ifsc_code": this.state.ifsc }
                    let data = {
                        bank: selectedBank ? selectedBank.name : '',
                        account_number: this.state.account_no,
                        ifsc: this.state.ifsc,
                        name: this.state.account_holder_name,
                        account_type: this.state.account_type,
                        branch_name: this.state.branch_name,
                        user_sfid: sfid,
                    }
                    // dispatch(updateUserBank(data));

                    dispatch(checkAccount(obj)).then(response => {
                        if (response.status === "success") {
                            dispatch(updateUserBank(data)).then((response) => {
                                if (response.status === "success") {
                                    dispatch(updateBankDetails(this.state.account_no));
                                    this.setState({ status: 2, isInCorrect: true });
                                } else {
                                    if (this.state.UserAttempts === 1) {
                                        this.props.history.push('/ed_bank_upload');
                                        this.setState({ UserAttempts: 0, isInCorrect: true });
                                    }
                                    this.setState({ UserAttempts: this.state.UserAttempts - 1, status: 0, isInCorrect: false });
                                }
                            });
                        } else {

                            if (this.state.UserAttempts === 1) {
                                this.props.history.push('/ed_bank_upload');
                                this.setState({ UserAttempts: 0, isInCorrect: true });
                            }
                            this.setState({ UserAttempts: this.state.UserAttempts - 1, status: 0, isInCorrect: false });
                        }
                    });
                }
                else {
                    this.setState({ isNameError: true })
                }
            }
            else {
                this.setState({ isIfscError: true })
            }
        }
        else {
            this.setState({ isAccountError: true })
        }

    }

    handleIfscChange = async (event) => {
        event.persist();
        let ifsc = event.target.value;
        console.log("ifsc", ifsc);
        var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
        if (ifsc.length === 11) {
            console.log("ifsc if 1", ifsc);
            if (ifsc.match(reg)) {
                console.log("ifsc if 2", ifsc);
                this.setState({ isValidIfsc: true, ifsc: event.target.value });
                let data = {
                    ifsc: event.target.value
                }
                await this.props.dispatch(checkIfsc(data)).then((response) => {
                    if (response.status == 'success') {
                        console.log("ifsc if 3", ifsc);
                        const resData = response.data;
                        if (Object.keys(resData).length == 0) {
                            this.setState({ isIfscError: true })
                        } else {
                            this.setState({ isIfscError: false })
                        }
                        this.setState({ isValidIfsc: true, ifsc: event.target.value, branch_name: resData && resData.branch ? resData.branch : '' });
                    } else {
                        console.log("ifsc succces api else 3", ifsc);
                        if (ifsc.match(reg)) {
                            console.log("ifsc succces api else if 3", ifsc);
                            this.setState({ isValidIfsc: true, ifsc: event.target.value });
                        } else {
                            console.log("ifsc succces api else if 3", ifsc);
                            this.setState({ isValidIfsc: false, ifsc: event.target.value });
                        }
                    }
                });
            } else {
                this.setState({ isValidIfsc: false, ifsc: event.target.value });
            }
        } else {
            this.setState({ isValidIfsc: false, ifsc: event.target.value.toUpperCase() });
        }
    }

    handleContinue = async () => {
        const { higherLimit, dispatch, history, user, sfid } = this.props
        if (higherLimit) {
            let data = {
                user_sfid: sfid
            }
            await dispatch(updateLimit(data)).then((response)=>{
                    history.push("/ed_limit");
             });
        }else{
            history.push('/home');
        }
    }
    containsNumber = (str) => {
        return /\d/.test(str);
    }
    handleFirstName = (e) => {
        e.preventDefault()
        let firstName = this.state.account_holder_name
        let regExp = /[^a-zA-Z\d\s:]/g;
        let found = regExp.test(firstName)
        let checkNo = this.containsNumber(firstName)
        if (found || checkNo) {
            this.setState({ firstNameError: true })
        } else {
            this.setState({ firstNameError: false })
        }
    }
    render() {
        const { selectedBank, isLoading } = this.props
        const { status, isInCorrect } = this.state
        console.log('selectedBankselectedBank', selectedBank)
        if (!selectedBank) {
            return <Redirect to="/ed_select_bank" />
        }
        console.log('UserAttempts', this.state.UserAttempts);
        return (
            <>
                <Helmet>
                    <title>Bank screen 14</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className='bank_details_wrapper  bg0 login page_registration_none pt-0'>
                    <div className='container-zero'>
                        <div className='flex-w flex-tr lfht'>
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
                            <li className="complete">Identity Verifcation</li>
                            <li className="has_child ongoing">AutoPay
                            <span className="sheading">Set up AutoPay & your account is automatically debited on due date </span>
                            <ul className="sub_timeline">
                                <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_select_bank')} className="active">Bank Account</li>
                                {/* <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_enach')} >NACH</li> */}
                            </ul>
                            </li>
                            <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                        </ul>
                    </div>
                    {status === 1?(
                        <>
                        
                        <div className=' mh-100 col-sm-6 mx-auto  bg-white shadow-sm text-center d-flex flex-column justify-content-end shadowforBank my-auto' style={{height:'65vh'}}>
                           <div className="d-flex w-50 mx-auto">
                         <img src="./images/progressbar.png" alt="progess" />
                           </div>
                            <h1>Wait till the penny drops!</h1>
                            <p>We are depositing Re.1 in your account for verification</p>
                        </div>
                        </>
                    ):status === 2?(
                        <>
                        <div className='col-sm-9 text-center'>
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <div>
                            <img src='./images/icons/verifiedimage111.png' alt="" />
                            <h1>Verified</h1>
                            <p>Awesome! We have verified your account successfully</p>
                            <div className='row mt-5'>
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
                            </div>
                            </div>
                        </div>
                        </>
                    ):(
                    <div className='col-sm-9 size-210 bor10 flex-w p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img'>
                    <div className='w-100 mb-5 c_p_m_b pb-4 loginform'>
                        <div className='form_header px-3 py-4'>
                            <h4 className='text-center m-0 form_header_h4'>Enter bank details</h4>
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
                        
                        <div className='d-flex justify-content-center mt-4'>
                            <div className='d-flex align-items-center'>
                            <span style={{"width":"38px"}} className="d-inline-block mr-1"><img src={selectedBank?`${selectedBank.icon}`:''} alt="state-bank" className='img-fluid'/></span>
                            {selectedBank?selectedBank.name:''} 
                            <span style={{"width":"10px"}} className="cursor-point d-inline-block ml-1" onClick={() => this.props.history.push('/ed_select_bank')}><img src={asset+"images/icons/icon_Edit.png"} alt="icon_Edit" className='img-fluid'/></span>
                            </div>
                        </div>
                        {selectedBank.supportNach ?"":<div className='d-flex justify-content-center mt-4'>
                            <div className='d-flex align-items-center'>
                            <span className="badge badge-pill badge-pink " >This bank doesn't support digital NACH!</span>
                            </div>
                        </div> }
                        
                    
                        <div className='row justify-content-center py-4 selected_bankForm'>
                            <div className='col-sm-10'>
                                <div className='row'>
                                    <div className='col-12'>
                                    {!isInCorrect && (
                                        <div className='py-4'>
                                            <div className='alert alert-warning d-flex justify-content-center'>
                                                <p className='mb-0'>Penny drop failed due to incorrect details</p>
                                            </div>
                                        </div>
                                    
                                    )}
                                                </div>
                                </div>
                                <div className='row pt-4 pb-lg-5 pb-4'>
                                    <div className='col-lg-6'>
                                        <button onClick={()=>this.handleAccountType('savings')} className= {`account-type-tab ${this.state.savings}`}>Saving</button></div>
                                    <div className='col-lg-6'>
                                    <button onClick={()=>this.handleAccountType('current')} className={`account-type-tab ${this.state.current}`}>Current</button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                    <div className='label'>
                                        <span>{'Account Number'}</span>
                                        <input type="text" placeholder='Account Number'  maxLength="18" onChange={this.handleNumber} value={this.state.account_no?this.state.account_no:''} name="account_no" />
                                        { this.state.isAccountError === true || this.state.isValidNumber === true || this.state.account_no.length<9?(
                                        <p className='error-msg_ m-0'>Enter Valid Account Number</p>
                                        ):''
                                        }
                                        { this.state.isAccountError ||  this.state.isValidNumber ?(
                                        <button onClick={()=>this.clearMessage('account_no')} className='error-close'>
                                        <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                        </button>
                                          ):''
                                        }
                                    </div>
                                    </div>
                                    <div className='col-lg-6'>
                                    <div className='label'>
                                        <span>IFSC Code</span>
                                        <input type="text" placeholder='' onChange={this.handleIfscChange} maxLength={11} value={this.state.ifsc?this.state.ifsc:''} name="ifsc"/>
                                         {this.state.isIfscError === true || !this.state.isValidIfsc?(
                                        <p className='error-msg_ m-0'>Enter Valid IFSC Code</p>
                                        ):''
                                        }
                                        { this.state.isIfscError || !this.state.isValidIfsc?(
                                        <button onClick={()=>this.clearMessage('ifsc')} className='error-close'>
                                        <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                        </button>
                                           ):''
                                        }
                                         { this.state.ifsc =="" ?(
                                            <a className='cursor-point' style={{ paddingTop:'20px'}} href={void(0)} >Search for IFSC</a> 
                                          ):''
                                         } 
                                    </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                    <div className='label'>
                                        <span>Account Holder Name</span>
                                        <input type="text" placeholder='' onChange={this.handleChange}onBlur={e=>this.handleFirstName(e)} value={this.state.account_holder_name?this.state.account_holder_name:''} name="account_holder_name"/>
                                        { this.state.firstNameError ?(
                                            <p className='error-msg_ m-0'>Enter Account Holder Name</p>
                                        ):''
                                        }
                                        { this.state.isNameError?(
                                            <button  onClick={()=>this.clearMessage('account_holder_name')}  className='error-close'>
                                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                            </button>
                                          ):''
                                        }
                                    </div>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                {this.state.UserAttempts < 3 && this.state.UserAttempts > 0 && <p className='text-center text-warning mb-3'>{this.state.UserAttempts} Attempts Left</p>}

                                                    <div className='col-lg-12 d-flex justify-content-center contbtnsec'>
                                                        <button onClick={this.handleSubmit} className='continue-btn' disabled={(!this.state.account_no || !this.state.ifsc || !this.state.account_holder_name || this.state.isIfscError || !this.state.isValidIfsc || this.state.isAccountError || this.state.isValidNumber || this.state.isNameError || this.state.firstNameError || this.state.account_no.length < 9) ? true : false}>Continue</button>
                                                    </div>
                                                </div>
                                                <p className='text-center'><span className='d-inline-block mr-2'><img src="../images/icons/infoicon.png" /></span>We are depositing Rs. 1 in your account for Verification</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='enach-footer p-3 pr-5 w-100'>
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
                            )}
                        </div>
                    </div>
                </section>

            </>
        )
    }
}

function mapStateToProps(state) {
    const { banks, selectedBank, higherLimit } = state.user;
    const { user, isLoading, sfid } = state.auth;
    return {
        selectedBank,
        higherLimit,
        isLoading,
        banks,
        sfid,
        user
    };
}

export default connect(mapStateToProps)(BankScreen14);