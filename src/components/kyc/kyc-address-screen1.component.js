import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { storeResident, updateResidentType, getAccountProfile } from "../../actions/user";
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

class KycAddressScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected:'',
      successful: false,
      isDisabled: true,
    };
  }

  componentDidMount()
  {
    const { sfid } = this.props;
      let data = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(data)).then((response) => {  
        if(response.status ==='success')
        {
          let resdata = response.accountDet;
          this.setState({selected: resdata.resident_type__c});
        }
      });
  }

  handleNext = () => {
    const { history, dispatch, user, sfid } = this.props;
    let data = {
      isRented: 1,
      rent_amount: 0
    }
    dispatch(storeResident(data));
    let obj = {
      user_sfid: sfid,
      type: 'Owned'
    }
    dispatch(updateResidentType(obj));
    history.push("/ed_address");
  }

  updateRent = () => {
    const { history, dispatch, sfid } = this.props
    let obj = {
      user_sfid: sfid,
      type: 'Rented'
    }
    dispatch(updateResidentType(obj));
    history.push("/ed_resident_details");
  }

  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  render() {
    const { message, history } = this.props;
    let breadCrumpPosts = [
      { title: 'KYC', url: ''},
      { title: 'Basic Details', url: ''}
  ];
  

    return (
      
     <>
     <Helmet>
     <title> Eduvanz | Resident Details </title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     <section className="kyc_pages">
     <div className="container-zero">
     <div className="flex-w flex-tr">
     <div className="kyc_leftbar bg-1 login-bg">

     {/* <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
     <ul className="breadcrumps">
     <li className="b_back"><Link to="/ed_salary">Back</Link></li>
     <li>KYC</li>
     <li>Basic Details</li>
     </ul>
     </div> */}
     <LogoSideBar sideTitle="Back" backLink='/ed_salary' historyGoBack="" breadCrumpPosts={breadCrumpPosts}  />
     {/* <div className="navigations">
     <ul className="breadcrumps">
     <li>KYC</li>
     <li>Basic Details</li>
     </ul>
     </div> */}

     <h1 className="titfnt">
     <span className="d-block">Residence</span> Details
     </h1>
     <ul className="left_tabs p-0">
     <li className="bgmoney"><Link to="/ed_salary"><h5>Your Income Source</h5><p>Please provide details of your source of income</p></Link></li>
     <li className="bghome active"><Link to="/ed_address"><h5>Residence Details</h5><p>Tell us about your home!</p></Link></li>
     </ul>
     </div>
     <div className="kyc_rightbar flex-col-m ">
     <div className="form_width_1 ext1 form_width">
        <div className="kyc_navfull p-0">
          <h1 className="text-center mb-3 cl2 txt-center p-b-30 form-title form-primary-card black_bg mtext-114"> <img src={asset+"images/icons/icon_Owned.png"} className="pr-3"/>Your current residence is</h1>
          <div className="home_form">
          {/* <h5 className="text-center mb-3">Your current residence is:</h5> */}
            <ul className="kyc_mainoptions fullwidth self_width">
              <li className={`bgsalaried ${this.state.selected ==='1'?'kyc-select':''}`} onClick={() => this.selectIncome('1')}>
                <img className="flimg" src={asset+"images/icons/icon_Owned.png"} />
                <h5>Self-Owned</h5>
                <p><span className="d-block">You or a family member owns the place you live in</span> </p>
                <a className="bg_1 cursor-point" href={void(0)} onClick={this.handleNext}><img src={asset+"images/icons/icon_RightArrow.svg"} /></a>
              </li>
              <li className={`bgsalaried ${this.state.selected ==='2'?'kyc-select':''}`} onClick={() => this.selectIncome('2')}>
                <img className="flimg" src={asset+"images/icons/icon_Rented.png"} />
                <h5>Rented</h5>
                <p>You pay a monthly rent for the place you live in</p>
                <a className="bg_2 cursor-point" href={void(0)} onClick={this.updateRent}><img src={asset+"images/icons/icon_RightArrow.svg"} /></a>
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
     </div>
     </section>
     </>
     );
   }
 }

 function mapStateToProps(state) {
  const { message } = state.message;
  const {isLoading, isValid, user, token, sfid} = state.auth;
  return {
    message,
    sfid,
    isLoading,
    isValid,
    token,
    user,
  };
}

export default connect(mapStateToProps)(KycAddressScreen1);
 