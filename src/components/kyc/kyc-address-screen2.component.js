import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import { updateRent, getAccountProfile } from "../../actions/user";
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

class KycAddressScreen2 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      successful: false,
      isDisabled: true,
      mincome: '',
      errorMsg: '',
      isValid: true
    };
  }

  componentDidMount()
  {
    const { user, sfid } = this.props;
      let data = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(data)).then((response) => {  
        if(response.status ==='success')
        {
          let resdata = response.accountDet;
          this.setState({mincome: resdata.rent_amount__c},()=>{
            if(this.state.mincome){
              this.setState({iRentFilled : true})
            }
          });
        }
      });
  }

  handleChange = (e) => {
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(pattern.test(e.target.value))
    {
        this.setState({[e.target.name]: e.target.value, isValid  : true, errorMsg : ""});
    }else{
        this.setState({[e.target.name]: '',isValid : false, errorMsg : "Please enter only numbers.", mobile : e.target.value});
        document.getElementById("mincome").value = "";
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, dispatch, user, sfid } = this.props;
    let data = {
      rent: parseInt(this.state.mincome),
      user_sfid: sfid
    }
    dispatch(updateRent(data)).then((response) => {
      if (response === "success") {
        history.push("/ed_address");
      }
    });
  }

  render() {
    let breadCrumpPosts = [
      { title: 'KYC', url: '' },
      { title: 'Basic Details', url: '' }
    ];

    const { message, isLoading, isSuccess, userMessage, history } = this.props;
    const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    return (
      <>
        <Helmet>
          <title> Eduvanz | Resident Details </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
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
            <div className="kyc_rightbar flex-col-m justify-content-center">
              <div className="form_width_1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span className="cl1"></span>
              </div>
              <div className="form_details">
                <h4 className="text-center">Your home is</h4>
                <h6>Rented <img className="float-right" src={asset+"images/icons/icon_Rented.png"} /></h6>
                <form  onSubmit={this.handleSubmit} className="otpform otpform-others fullwidth" >
                <div className="form_spacing mn_height_1 mt-4">
                <div className="form-group">
                <span className="has-float-label">
                  <input onChange={this.handleChange} value={this.state.mincome?this.state.mincome:''} disabled={this.state.iRentFilled ? true : false} className="rupeeprefix" id="mincome" name="mincome" type="number" placeholder="Monthly Rent "/>
                  {/* <label htmlFor="mincome">Monthly Rent</label> */}
                </span>
                {
                    this.state.isValid === false?(
                    <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMsg}
                    </div>
                    </div>
                    ):''
                }
                </div>
                </div>
                
                      <div className="form_spacing">
                        <button
                          type="submit"
                          disabled={this.state.mincome !== '' ? false : true}
                          className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15  mb-3"}
                          style={this.state.mincome  ?  styles : {} }
                        >
                          Continue
                        </button>
                        {
                          isSuccess === 0 && userMessage != '' ? (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {userMessage}
                              </div>
                            </div>
                          ) : ''
                        }
                        <p className="text-center">
                          <Link to="/ed_resident" className="blue_link">Not Rented?</Link>
                        </p>
                      </div>
                    </form>
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
  const { incomeSource, sub_source, userMessage, isSuccess } = state.user;
  const { isLoading, successMsg, errorMsg, isValid, user, sfid, token } = state.auth;
  return {
    message,
    incomeSource,
    sub_source,
    isLoading,
    userMessage,
    isSuccess,
    isValid,
    user,
    sfid,
    token
  };
}

export default connect(mapStateToProps)(KycAddressScreen2);
