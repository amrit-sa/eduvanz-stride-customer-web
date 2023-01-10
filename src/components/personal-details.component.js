import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Helmet from "react-helmet";
import { GoogleLogin } from 'react-google-login';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { updateProfile } from "../actions/auth";
import { getAccountProfile, updateBre1 } from "../actions/user";
import { asset } from "../common/assets";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";
import { gapi } from "gapi-script"
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const clientId = "92190458612-uht597c114p30duj59nt8iogas5vhalp.apps.googleusercontent.com"
const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The field must be between 2 and 25 characters.
      </div>
    );
  }
  let regExp = /[^a-zA-Z\s:]/g;
  let found = regExp.test(value)
  if (found) {
    return (
      <div className="alert alert-danger" role="alert">
        Symbols,numbers or special characters not allowed.
      </div>
    );
  }
};

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      id: "0",
      googleData: {},
      successful: false,
      isDisabled: true,
      readonly: false,
      isEmailvalid:false,
      isEmail:false,
    };
  }

  componentDidMount() {
    //const { dispatch, user } = this.props;
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userData != this.props.userData) {
      let user = this.props.userData
      this.setState({
        fname: user.first_name,
        lname: user.last_name,
        email: user.email
      });
    }
    if (prevState.fname != this.state.fname) {
      if (this.state.fname && this.state.fname.length < 2 || this.state.fname && this.state.fname.length > 20) {
        this.setState({ fnameError: true })
      } else {
        this.setState({ fnameError: false })
      }
      let regExp = /[^a-zA-Z\s:]/g;
      let found = regExp.test(this.state.fname)
      if (found) {
        this.setState({ fnameSpecial: true })
      } else {
        this.setState({ fnameSpecial: false })
      }
    }
    if (prevState.lname != this.state.lname) {
      if (this.state.lname && this.state.lname.length < 2 || this.state.lname && this.state.lname.length > 20) {
        this.setState({ lnameError: true })
      } else {
        this.setState({ lnameError: false })
      }
      let regExp = /[^a-zA-Z\s:]/g;
      let found = regExp.test(this.state.lname)
      if (found) {
        this.setState({ lnameSpecial: true })
      } else {
        this.setState({ lnameSpecial: false })
      }
    }
  }

  handleChange = (e) => {

    if (e.target.name == 'fname' || e.target.name == 'lname') {
      this.setState(
        { [e.target.name]: e.target.value }
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
      let str = e.target.value
      if (str && str.length > 2) {
        this.setState({ isEmail: true })
        this.ValidateEmail(str)
      } else {
        this.setState({ isEmail: false })
      }
    }
  }



  ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
      this.setState({ isEmailvalid: true })
      return true;
    }
    else {
      this.setState({ isEmailvalid: false })
      return false;
    }
  }

  async handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    const { history, user, token, sfid } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      let mobileNo = localStorage.getItem('mobile');

      let data = {
        first_name: this.state.fname,
        last_name: this.state.lname,
        user_sfid: sfid,
        google_id: this.state.id,
        token: token,
        email: this.state.email,
        mobile: mobileNo
      }
      this.props.dispatch(
        updateProfile(data)
      )
        .then(async (response) => {
          if (response.status === "success") {
            let getdata = response.data;
            const isUpdated = response && response.isUpdated !== undefined ? response.isUpdated : false;
            const isBre1Called = response && response.isBre1Called !== undefined ? response.isBre1Called : false;
            const isPanStatusCalled = response && response.isPanStatusCalled !== undefined ? response.isPanStatusCalled : false;
            const isPanProfileCalled = response && response.isPanProfileCalled !== undefined ? response.isPanProfileCalled : false;
            const limit = getdata && getdata.IPA_Basic_Bureau__c !== undefined && getdata.IPA_Basic_Bureau__c ? getdata.IPA_Basic_Bureau__c : null;
            const qd1 = getdata && getdata.Is_QDE_1_form_done__c !== undefined && getdata.Is_QDE_1_form_done__c ? getdata.Is_QDE_1_form_done__c : null;
            const pan = getdata && getdata.PAN_Verified__c !== undefined && getdata.PAN_Verified__c ? getdata.PAN_Verified__c : null;
            let data = { user_sfid: sfid }
            getdata.user_sfid = sfid;
            getdata.isBre1Called = isBre1Called;
            getdata.isPanStatusCalled = isPanStatusCalled;
            getdata.isPanProfileCalled = isPanProfileCalled;
            if (!isUpdated) {
              await this.props.dispatch(updateBre1(getdata));
            }
            this.props.dispatch(getAccountProfile(data));
            history.push("/ed_pan_update");
            // if(!pan){
            // }else if(!qd1){
            //   history.push("/ed_qdform");
            // }else if(!limit){
            //   history.push("/edonebanklist");
            // }else
            // {
            //   history.push("/ed_limit");
            // }
          }
        });
    }
  }

  responseGoogle = (response) => {
    console.log(JSON.stringify(response), 'bdjgwudgiedie');
    if (typeof response.profileObj !== 'undefined') {
      let givenData = response.profileObj;
      this.setState({
        googleData: givenData,
        id: givenData.googleId,
        fname: givenData.givenName,
        lname: givenData.familyName,
        email: givenData.email,
        readonly: true,
        isEmail : true,
        isEmailvalid : true
      });
    }
  }

  render() {
    const specialCharacter = /[^a-zA-Z\d\s:]/g;
    const { message, isLoading, errorMsg, isValid, user, history, sfid } = this.props;
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }
    if (!sfid) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Helmet>
          <title> Personal Details </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        <section className="bg0 login page_registration">
          <div className="container-zero">
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md  primary-card">
                <div className="d-flex flex-column">

                  <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />

                  <div className="login-img">
                    <img src={asset + "images/login-left2.png"} />
                  </div>
                </div>
              </div>
              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img formht">
                <div className="loginform personal_details">
                  <div className="cl2 txt-center p-b-30 form-title black_bg">
                    <h4 className="mtext-114 bg-black1">
                      <img src={asset + "images/icons/icon_Comment.svg"} /> Personal Details
                    </h4>
                  </div>
                  <Form ref={(c) => {
                    this.form = c;
                  }}
                    onSubmit={this.handleRegister}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <h3><span className="d-block">Please add your personal details</span> and stride away</h3>
                      </div>
                    </div>
                    {!this.state.successful && (
                      <>
                        <div className="how-pos4-parent">
                          <Input
                            className="stext-111 cl2 plh3 size-116 bor8 m-b-5"
                            type="text"
                            name="fname"
                            placeholder="First Name"
                            validations={[required, vusername]}
                            onChange={this.handleChange}
                            minLength="2"
                            maxLength="20"
                            value={this.state.fname ? this.state.fname : ''}
                          />
                        </div>
                        <div className="how-pos4-parent">
                          <Input
                            className="stext-111 cl2 plh3 size-116 bor8 m-b-5"
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                            validations={[required, vusername]}
                            onChange={this.handleChange}
                            minLength="2"
                            maxLength="20"
                            value={this.state.lname ? this.state.lname : ''}
                          />
                        </div>
                        <div className="how-pos4-parent">
                          <Input
                            className="stext-111 cl2 plh3 size-116 bor8 m-b-5"
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            validations={[required, email]}
                            onChange={this.handleChange}
                            value={this.state.email ? this.state.email : ''}
                            readOnly={this.state.readonly}
                          />
                        </div>

                        <button type="submit" 
                          disabled={this.state.fname !== '' && this.state.lname !== '' && this.state.isEmail && this.state.isEmailvalid && this.state.fname.length >= 2 && this.state.fname.length <= 20 && this.state.lname.length >= 2 && this.state.lname.length <= 20 && !this.state.fnameError && !this.state.fnameSpecial && !this.state.lnameError && !this.state.lnameSpecial ? false : true} 
                             style={this.state.fname !== '' && this.state.lname !== '' && this.state.isEmail && this.state.isEmailvalid && this.state.fname.length >= 2 && this.state.fname.length <= 25 && this.state.lname.length >= 2 && this.state.lname.length <= 25 && !this.state.fnameError && !this.state.fnameSpecial && !this.state.lnameError && !this.state.lnameSpecial ? btnStyle : {}}
                          className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty"} >
                          Continue
                        </button>
                        {message || (errorMsg !== '' && isValid === 0) ? (
                          <div className="row">
                            <div className="col-md-12">
                              <div className="alert alert-danger" role="alert">
                                {message ? message : errorMsg ? errorMsg : ''}
                              </div>
                            </div>
                          </div>
                        ) : ''
                        }
                        <div className="row" style={{ justifyContent: 'center' }}>
                          <p className="text-center mb-0">OR</p>
                        </div>
                        <GoogleLogin
                          clientId={clientId}
                          buttonText="Connect with"
                          render={renderProps => (
                            <button className="flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal imgvalign" onClick={renderProps.onClick} disabled={renderProps.disabled}>Connect with <img src={asset + "images/google-logo.ico"} width="26" height="26" /></button>
                          )}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={'single_host_origin'}
                          style={{ width: '100% !important', textAlign: 'center !important', justifyContent: 'center !important' }}
                        />
                      </>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />

                  </Form>
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
  const { onBording, isLoading, successMsg, errorMsg, isValid, user, token, userData, sfid } = state.auth;
  return {
    userData,
    message,
    isLoading,
    onBording,
    successMsg,
    errorMsg,
    isValid,
    sfid,
    user,
    token
  };
}

export default connect(mapStateToProps)(PersonalDetails);
