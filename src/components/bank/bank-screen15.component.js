import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Select from 'react-select';
import { asset } from "../../common/assets";
import { getBanks, updateBank,searchBank } from "../../actions/user";
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen15 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            selectedBank: null,
            searchParam : "",
            myBank: null
        }
    }

    componentDidMount() {
        const { user, dispatch } = this.props
        dispatch(getBanks());
    }
    componentDidUpdate = (prevProps,prevState) =>{
        if(prevProps.banks != this.props.banks){
            this.setState({
                banks : this.props.banks
            })
        }
    }

    brandChange = (e) => {
        this.setState({ searchParam: e.target.value});
        if(e.target.value==""){
            
            this.props.dispatch(getBanks());
        }
        else{
            if(e.target.value.length>2){
                this.searchBank();

            }
        }
    }

    handlebank = (name,icon,supportNach) => {
        console.log('name bank',name)
        this.setState({ selectedBank: name, myBank: { name: name, icon: icon,supportNach:supportNach } });
    }

    handleContinue = () => {
        const { dispatch, history } = this.props
        dispatch(updateBank(this.state.myBank));
        history.push("/ed_bank_details");
    }
    inputfocus = (elmnt) => {
        if (elmnt.key === "Enter") {
            if(this.state.searchParam){
                this.searchBank();
            }else{
        this.props.dispatch(getBanks());
            }
        }
      }
      handleBlur = ()=>{
        if(!this.state.searchParam ){
        this.props.dispatch(getBanks());
        }else{
            this.searchBank()
        }
      }
      handleSearchClick = () =>{
        const searchData  = this.state.searchParam;
        if(searchData){
          this.searchBank();
        }
        else{
          this.setState({
            showError: true,
            errorMsg : "No Bank found"
          })
        }
      }
      searchBank = () =>{
        let obj = {
            search_name : this.state.searchParam
        }
        this.props.dispatch(searchBank(obj)).then(res=>{
            if(res.status == "success"){
                // if(res && res.data && res.data.length>0){
                //     this.setState({banks : res.data})
                // }else{
                //     this.setState({banks : [],            showError: true,
                //         errorMsg : "No Bank found"})
                // }
            }
        })
      }

      shouldComponentUpdate(nextProps) {
        //   console.log("active state",this.props.activeSettlement );
        if (this.props.banks != nextProps.banks) {
          
          return true
        } else {
          return true
        }
    }
    render() {
        const { isLoading } = this.props
        const { selectedBank,banks } = this.state
        let bankOptions = [];
        let bankData = banks;
        console.log('banks',banks)
        // if (banks) {
        //     bankData = banks.slice(0, 6);
        //     for (var i = 0; i < banks.length; i++) {
        //         bankOptions.push({ value: banks[i].bank_name, label: banks[i].bank_name, img: banks[i].bank_icon });
        //     }
        // GET_BANK_SUCCESS}

        return (
            <>
                <Helmet>
                    <title> Bank screen 15 </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                {/* <Header/> */}
                <section className='bank_details_wrapper bg0 login page_registration_none pt-0'>
                    <div className='container-zero'>
                        <div className='flex-w flex-tr'>
                            <div className=' size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md login-bg'>
                                {/* <h4 onClick={ () => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                            <ul className="breadcrumps">
                                <li className="b_back cursor-point"><a href={void(0)} onClick={() => this.props.history.goBack()} >Back</a></li>
                            </ul>
                        </div> */}

                                <LogoSideBar sideTitle="Back" backLink='' historyGoBack="goBack" history={this.props.history} />


                                <ul className="kyc_timeline pl-0 mt-0">
                                    <li className="complete">Link Bank Account</li>
                                    {/* <li className="complete">Limit Approval</li>
                                    <li className="complete">Identity Verifcation</li>
                                    <li className="has_child ongoing">AutoPay
                                        <span className="sheading">Set up AutoPay & your account is automatically debited on due date </span>
                                        <ul className="sub_timeline">
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/ed_select_bank')} className="active">Bank Account</li>
                                            <li style={{ cursor: 'pointer' }} onClick={() => this.props.history.push('/ed_enach')} >NACH</li>
                                        </ul>
                                    </li>
                                    <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li> */}
                                </ul>

                            </div>
                            <div className='size-210 bor10 flex-w p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img'>
                                <div className='loginform mb-5 c_p_m_b pb-4'>
                                    <div className='form_header px-3 py-4'>
                                        <h4 className='text-center m-0 form_header_h4'>Please Select Your Bank</h4>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center pt-3'>
                                        <div className='d-flex align-items-center mx-3 stext-111'>
                                            <span style={{ "width": "10px" }} className="d-inline-block mr-1"><img src={asset + "images/icons/lock_icon.png"} alt="mc" className='img-fluid' /></span>
                                            100% Secure
                                        </div>
                                        <div className='d-flex align-items-center mx-3 stext-111'>
                                            <span style={{ "width": "10px" }} className="d-inline-block mr-1"><img src={asset + "images/icons/security_icon.png"} alt="mc" className='img-fluid' /></span>
                                            Trusted by millions
                                        </div>
                                    </div>

                                    <div className='back_search_wrapper'>
                                        <div className='mt-lg-2 mt-2'>
                                            {/* <div className='label'>
                                                <Select
                                                    options={bankOptions}
                                                    placeholder="Search your bank"
                                                    name="brand"
                                                    onChange={this.brandChange}
                                                />
                                            </div> */}
                                            <div className="search-bar-card">
                                                <input
                                                className="header-search-input"
                                                type="text"
                                                placeholder="Search your bank"
                                                name="search"
                                                autoComplete="off"
                                                onBlur = {this.handleBlur}
                                                onKeyUp={e => this.inputfocus(e)}
                                                onChange={this.brandChange} />
                                                <button type="button" 
                                                className="search_btn"
                                                onClick={()=>this.handleSearchClick()}
                                                >
                                                    <img src={asset + "images/icons/search_icon.png"} alt="" 
                                                    className="img-fluid"
                                                    /></button>
                                                
                                            </div>
                                                {this.state.showError ? (
                                                    <div className='d-inline-block invalid_otp'>{this.state.errorMsg}</div>
                                                    ) : ''}
                                        </div>
                                        <ul className='list-unstyled m-0 bank_list_new d-flex flex-wrap mt-4'>
                                            {/* {bankData && bankData.length > 0 && (
                                                bankData.map((item, index) => (
                                                    item.bank_icon ?
                                                    <li key={"bank-" + index}>
                                                        {item && item.support_enach__c ?
                                                            <span className="badge badge-pill badge-pink " >Supports eNACH</span> :
                                                            <span className="badge badge-pill badge-pink " >Doesn't Supports eNACH</span>
                                                        }
                                                        <div
                                                            onClick={() => this.handlebank(item.bank_name || item.name, item.bank_icon,item.support_enach__c)}
                                                            className={`bank_wrapper cursor-point bank d-flex align-items-center justify-content-center flex-column ${selectedBank === item.bank_name ? 'active' : ''}`}>
                                                            <div className='bank_logo'>
                                                                <img src={item.bank_icon} alt="icon-ind2" className='img-fluid' />
                                                            </div>
                                                            <p className='bank_name text-uppercase m-0 mt-3'>{item.bank_code__c}</p>
                                                        </div>
                                                    </li> :""
                                                ))
                                          )
                                            } */}

                                            {bankData && bankData.length > 0 && (
                                                bankData.map((item, index) => (
                                                    item.bank_logo_url__c || item.bank_icon?
                                                    
                                                    <li key={"bank-" + index}>
                                                        {item && item.support_enach__c ?
                                                            <span className="badge badge-pill badge-pink " >Supports eNACH</span> :
                                                            <span className="badge badge-pill badge-pink " >Doesn't Supports eNACH</span>
                                                        }
                                                        <div
                                                            onClick={() => this.handlebank(item.bank_name || item.name, item.bank_icon || item.bank_logo_url__c,item.support_enach__c)}
                                                            className={`bank_wrapper cursor-point bank d-flex align-items-center justify-content-center flex-column ${selectedBank === item.name? 'active' : ''}`}>
                                                            <div className='bank_logo'>
                                                                <img src={item.bank_logo_url__c?item.bank_logo_url__c:item.bank_icon} alt="icon-ind2" className='img-fluid' />
                                                            </div>
                                                            <p className='bank_name text-uppercase m-0 mt-3'>{item.bank_code__c}</p>
                                                        </div>
                                                    </li> :""
                                                ))
                                          )
                                            }


                                        </ul>
                                        {selectedBank && (
                                            <div className='row'>
                                                <div className='col-sm-12 text-center mb-2'>
                                                    <button
                                                        type='submit'
                                                        className='d-inline-block continue-btn bankdatasubmit'
                                                        onClick={this.handleContinue}
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    <div className='text-center'>
                                        <h6 className='' style={{ marginBottom: "3rem" }}>Got multiple accounts? Please select your salary/business account</h6>
                                        {/* <h6>By Selecting the bank, I authorize OneMoney to access my </h6>
                                        <h6>Bank statements for verification and I agree to the <button className='link' onClick={() => this.props.history.push('terms_condition')} >Terms & Conditions.</button> 
                                        </h6> */}
                                        <h6>By selecting the bank, I authorize OneMoney to access my  </h6>
                                        <h6>bank statements for verification and agree to the  <button className='link' onClick={() => this.props.history.push('terms_condition')} >Terms & Conditions.</button></h6>
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
    const { banks } = state.user;
    const { salesForceToken, user, isLoading } = state.auth;
    return {
        salesForceToken,
        banks,
        user,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen15)