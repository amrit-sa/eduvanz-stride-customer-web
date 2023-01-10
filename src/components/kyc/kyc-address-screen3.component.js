import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { getAddress, updateUserRent, updateUserAddress,noLimit,getAccountProfile} from "../../actions/user";
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

class KycAddressScreen3 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      successful: false,
      isDisabled: true,
      selected:'',
      mincome:'',
      cname:''
    };
  }

  componentDidMount(){
    const { user, sfid } = this.props; 
    let data = {
      user_sfid: sfid
    }
    this.props.dispatch(getAddress(data));
    this.props.dispatch(getAccountProfile(data)).then((response) => {  
      if(response.status ==='success'){
        this.setState({haveLimit : response && response.accountDet && response.accountDet.ipa_basic_bureau__c,limitActivate :response && response.accountDet && response.accountDet.is_limit_confirm__c })
      }
    })
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.currentAddress != this.props.currentAddress){
      this.setState({selected:this.props.currentAddress && this.props.currentAddress.id})
    }
  }
  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  handleChange = (e) => {
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, dispatch, user, currentAddress, sfid } = this.props; 
    let data = {
      address_id: this.state.selected?this.state.selected:currentAddress.id,
      user_sfid: sfid
    }
    dispatch(updateUserRent(data)).then((response)=>{
        if(response ==="success")
        {
          dispatch(noLimit())
          if(this.state.haveLimit > 0 && this.state.limitActivate){
            history.push("/ed_doc");
          }else{
            history.push("/bank_screen5");
          }
        }
    });
  }

  handleAddressEdit = async (value) =>{
    await this.props.dispatch(updateUserAddress(value));
    this.props. history.push("/ed_manual_address");
  }

  render() {
    let breadCrumpPosts = [
      { title: 'KYC', url: ''},
      { title: 'Basic Details', url: ''}
  ];
    const { message, userAddress, currentAddress, isLoading, history} = this.props;
    const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
    console.log('currentAddresscurrentAddress',JSON.stringify(currentAddress))
    return (
     <>
        <Helmet>
            <title> Eduvanz | Address Details </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        {isLoading?(
                  <div className="loading">Loading&#8230;</div>
      ):''}
      <section className="kyc_pages">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-1 login-bg">

     {/* <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_resident">Back</Link></li>
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='/ed_resident' historyGoBack="" breadCrumpPosts={breadCrumpPosts} />

     {/* <div className="navigations">
      <ul className="breadcrumps">
         
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div> */}

     <h1 className="titfnt">
     <span className="d-block">Basic</span> Details
     </h1>
     <ul className="left_tabs p-0">
     <li className="bgmoney"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></li>
     <li className="bghome active"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></li>
     </ul>
     </div>
            <div className="kyc_rightbar justify-content-center">
              <div className="form_width_1 ext10 pt-5 pb-5 mt-1 mb-1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span className="cl1"></span>
              </div>
              <div className="form_details">
                <h4 className="text-center"><img src="./images/icons/VectorGps12.png" className="pr-2" />Please select your home address</h4>
                <p className="text-center mt-3 mb-0"><b>Multiple addresses found,<br/>Please select your current residential address</b></p>
                  <ul className="kyc_mainoptions ul_address mt-0 mb-0">
                    {userAddress && userAddress !== undefined && userAddress.length > 0 &&
                      userAddress.map((item, index)=>(
                        !item.pincode__c && !item.landmark__c && !item.address__c && !item.city__c ? "": 
                       <li key={'item'+index} className={`${(this.state.selected==item.id)?'kyc-select':''} cursor-point`} onClick={() => this.selectIncome(item.id)}>
                       {/* <li key={'item'+index} className={'kyc-select cursor-point'} onClick={() => this.selectIncome(item.id)}> */}
                       <img className="flimg" src={asset+"images/icons/icon_Home.svg"} />
                       {/* <p>{`${item.address__c ? item.address__c : ""}${item.city__c?", "+item.city__c:""}${item.state__c?", "+item.state__c:""}${item.pincode__c?", "+item.pincode__c:""}`}</p> */}
                       <p>{`${item.address__c ? item.address__c : ""}, ${item.city__c ?item.city__c : ""}, ${item.city__c ? item.city__c:""}, ${item.state__c? item.state__c:""}, ${item.state__c?item.state__c:""}, ${item.pincode__c ? item.pincode__c : ""}`}</p>
                       {/* <span className="found_line"><img src={asset+"images/icons/icon_Search.svg"} />{item.name}</span> */}
                       <a style={{cursor:'pointer'}} href={void(0)} onClick={() => this.handleAddressEdit(item.id)} ><img src={asset+"images/icons/icon_Edit.png"} /></a>
                     </li>
                      ))
                    }
                  </ul>
     {/* <div className="lookbelow text-center d-block"><img src={asset+"images/icons/icon_Arrowdown.svg" /></div> */}
     <div className="form_spacing text-center">
     <button type="submit" 
      disabled={this.state.selected || currentAddress?false:true} 
      className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-400"
      style={this.state.selected || currentAddress?styles:{}}
      onClick={this.handleSubmit}
      >Continue</button>
     </div>
     <ul className="listsplitter" style={{marginLeft:'5px'}}>
      <li style={{paddingRight:'10px'}}>
      <Link to="/ed_geo_address">Locate via GPS</Link>
      </li>
      <li style={{paddingLeft:'10px'}}>
      Not your address? <Link to="/ed_manual_address">Enter Manually</Link>
      </li>
      </ul>
                </div>
              </div>
              <div className="pos_abs">
                         <GetOurApp 
                  dispatch={this.props.dispatch}
                />                    
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
  const { message } = state.message;
  const { userAddress, currentAddress } = state.user;
  const { user, isLoading, sfid } = state.auth;
  return {
    sfid,
    message,
    userAddress,
    currentAddress,
    isLoading,
    user
  };
}

export default connect(mapStateToProps)(KycAddressScreen3);
