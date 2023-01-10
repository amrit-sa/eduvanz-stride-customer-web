import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { storeIncome, getIncomeDetails, updateEmpType } from "../../actions/user";
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

class KycScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:'',
      successful: false,
      isDisabled: true,
    };
    this.handleNext = this.handleNext.bind(this);



  }

  componentDidMount()
  {
    let data = {
      user_sfid: this.props.sfid
    }
    this.props.dispatch(getIncomeDetails(data))
    .then((response)=>{
      if(response.status =="success")
      { 
        let getdata = response.data
        this.setState({ selected: getdata.occupation__c});
      }
      console.log("response", response);
    });
  }

  handleNext = (value) => {
    const { dispatch, user, sfid } = this.props;
    let data = { user_sfid: sfid, type: value }
    dispatch(updateEmpType(data));
    dispatch(storeIncome(value));
  }

  selectIncome = (value,url) =>{
    this.setState({ selected: value},()=>{
      const { dispatch, user, sfid } = this.props;
      let data = { user_sfid: sfid, type: value }
      dispatch(updateEmpType(data));
      dispatch(storeIncome(value));
      this.props.history.push(`/${url}`)
    });
  }

  render() {
    const { isLoading, history } = this.props;

    let breadCrumpPosts = [
      { title: 'KYC', url: ''},
       { title: 'Employement details', url: ''}
   ];
    return (
     <>
     <Helmet>
     <title> Eduvanz | Income Source </title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     {isLoading?(
            <div className="loading">Loading&#8230;</div>
        ):''}
     <section className="kyc_pages">
     <div className="container-zero">
     <div className="flex-w flex-tr">
     <div className="kyc_leftbar login-bg ">

     {/* <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
     <ul className="breadcrumps">
     <li className="b_back"><Link to="">Back</Link></li>
     <li>KYC</li>
     <li>Employment Details</li>
     </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='' historyGoBack="" breadCrumpPosts={breadCrumpPosts}  />
     
     {/* <div className="navigations">
     <ul className="breadcrumps">
      <li>KYC</li>
      <li>Basic Details</li>
     </ul>
     </div> */}

     <h1 className="titfnt">
     <span className="d-block">Employment</span> Details
     </h1>
     <ul className="left_tabs pl-0">

     <li className="bgmoney active"><Link to="/ed_salary"><h5>Your Income Source</h5><p>Please provide details of your source of income</p></Link></li>
     <li className="bghome"><Link to="/ed_resident"><h5>Residential Details</h5><p>Tell us about your home!</p></Link></li>
     </ul>
     </div>
     <div className="kyc_rightbar ">
        <div className="kyc_navfull income_form">

          <h1 className="cl2 txt-center p-b-30 form-title form-primary-card black_bg mtext-114 income_icon"> <img className="flimg" src={asset+"images/icons/incom_logo.png"} /> Income Details</h1>
          <form action="" class="income_bottom">
            <h5 className="text-center mb-0 mt-2">Select what best describes your employment status</h5>
          
            <ul className="kyc_mainoptions">
            <li className={`${this.state.selected==='Salaried'?'kyc-select':''}`} onClick={() => this.selectIncome('Salaried','ed_income_source')}>
            <img className="flimg" src={asset+"images/icons/icon_Salaried.png"} />
            <h5>Salaried</h5>
            <p>You have a job & a regular monthly income that is reflected in your bank account</p>
        <Link className="bg_1" onClick={() => this.handleNext('Salaried')} to="/ed_income_source"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
      </li>
      <li className={`${(this.state.selected=== 'Self-Employed-Professional' || this.state.selected=== 'Self-Employed-Non Professional')?'kyc-select':''}`} onClick={() => this.selectIncome('Self-Employed-Professional','ed_self')}>
        <img className="flimg" src={asset+"images/icons/icon_selfemp.png"} />
        <h5>Self employed</h5>
        <p>You have your own business or establishment & a bank account linked to it</p>
        <Link className="bg_2" onClick={() => this.handleNext('Self-Employed-Professional')} to="/ed_self"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
      </li>
      <li className={`${this.state.selected=== 'Retired'?'kyc-select':''}`} onClick={() => this.selectIncome('Retired','ed_income_source')}>
        <img className="flimg" src={asset+"images/icons/icon_Retired.png"} />
        <h5>Retired</h5>
        <p>You earn a regular pension income post-retirement</p>
        <Link className="bg_3" onClick={() => this.handleNext('Retired')} to="/ed_income_source"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
      </li>
      {/* <li className={`${this.state.selected=== 'Students'?'kyc-select':''}`} onClick={() => this.selectIncome('Students')}>
        <img className="flimg" src={asset+"images/icons/icon_Students.png"} />
        <h5>Students</h5>
        <p>You are studying & are financially dependent on an earning family member</p>
        <Link className="bg_4" onClick={() => this.handleNext('Students')} to="/ed_resident"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
      </li> */}
            </ul>
          </form>
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
  const { user, isLoading, sfid } = state.auth
  return {
    message,
    isLoading,
    sfid,
    user
  };
}

export default connect(mapStateToProps)(KycScreen1);
 