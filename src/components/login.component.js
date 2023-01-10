import React, { Component } from "react"
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { login, clearAuthMessage, updateMobile } from "../actions/auth";
import { asset } from "../common/assets";


import {  WhatsappIcon,
  WhatsappShareButton
} from "react-share";

import LogoSideBar from "../common/logo-side-bar";
import GetOurApp from "../common/get-our-app";

const MERCHANT_URL = process.env.REACT_APP_MERCHAT_URI;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: localStorage.getItem('mobile') ? localStorage.getItem('mobile') : "",
      loading: false,
      passwordType: 'password',
      passwordHide: true,
      errorMsg: '',
      isValid: true
    };
  }

  handleMobile = (e) => {
    const reg = /^[0]?[6789]\d{9}$/;
    var pattern = new RegExp(/^[0-9\b]+$/);
    this.props.dispatch(clearAuthMessage());
    if (e.target.value !== '') {
      if (!pattern.test(e.target.value)) {
        this.setState({ isValid: false, errorMsg: "Please enter only number.", mobile: "" });
        document.getElementById('mobile').value = "";
      } else if (e.target.value.length === 10) {
        if (reg.test(e.target.value)) {
          this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
        } else {
          this.setState({ isValid: false, errorMsg: "Please enter valid mobile number.", mobile: e.target.value });
        }
      } else {
        this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
      }
    } else {
      this.setState({ isValid: false, errorMsg: "", mobile: e.target.value });
    }
  }

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    this.setState({ isValid: true });
    this.setState({ errorMsg: "" });
    event.preventDefault();
    this.props.dispatch(clearAuthMessage());
    if (this.state.mobile !== '') {
      let data = {
        mobile_no: this.state.mobile
      }
      localStorage.setItem('mobile', this.state.mobile);
      dispatch(updateMobile(this.state.mobile));
      dispatch(login(data))
        .then((reponse) => {
          if (this.props.verificationType === 'otp') {
            history.push("/edotp");
          } else if (this.props.verificationType === 'mPin') {
            history.push("/edmpin");
          }
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({ isValid: false });
      this.setState({ errorMsg: "Please enter valid mobile number." });
    }
  }

  handleClear = () => {
    this.setState({ isValid: true, mobile: '', errorMsg: "" });
    document.getElementById("mobile").value = "";
    this.props.dispatch(clearAuthMessage());
  }



  render() {
    const { message, isLoading, history } = this.props;
    const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    return (
      <>
        <Helmet>
          <title>Login</title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {/*CSS Spinner*/}
        {/* {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''} */}
        <section className="bg0 login">
          <div className="container-zero">
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md login-bg" >
                <div className="d-flex flex-column">

                  <LogoSideBar sideTitle="Say 'Hello!' to limitless learning!" backLink='' />
                  
                  <div className="login-img">
                    <img src={asset+"images/login-left2.png"} />
                  </div>
                </div>
              </div>
              <div className="size-210 bor10 flex-w p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform">
                  <div className="cl2 txt-center p-b-30 form-title form-primary-card black_bg" >
                    <h4 className="mtext-114">
                      <img src={asset+"images/icons/login-title.png"} /> Sign in
                    </h4>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Please enter your mobile number</h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 m-b-5 how-pos4-parent">
                        <span className="has-float-label bigger">
                          <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>
                            <input
                              name="text"
                              placeholder=" "
                              style={{ width: '10%', paddingLeft: '6px', background: '#fff', color: '#AAAAAA' }}
                              defaultValue={'+91'}
                              disabled={true}
                            />
                            <input
                              className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15"
                              type="text"
                              name="mobile"
                              id="mobile"
                              placeholder=" "
                              style={{ width: '78%' }}
                              onChange={this.handleMobile}
                              value={this.state.mobile}
                              maxLength="10"
                              required
                            />
                            <label htmlFor="mobile">Mobile Number</label>

                            <div className="input-group-addon input-group-addon-sty">
                              {this.state.mobile.length === 10 && this.state.isValid ? (
                                <img src={asset+"images/Vector.png"} />
                              ) : ''
                              }
                              {
                                this.state.mobile.length === 10 && this.state.isValid === false ? (
                                  <img style={{ cursor: 'pointer' }} onClick={this.handleClear} src={asset+"images/error.png"} />
                                ) : ''
                              }

                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                    {
                      this.state.mobile.length === 10 && this.state.isValid === false ? (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                          </div>
                        </div>
                      ) : ''}
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )
                    }
                    {/* <div className="row">
                          <div className="col-md-12">
                            <p className="form-p-sty mb-0 ls_05">
                              New number?<Link to=""> Update your account.</Link>
                            </p>
                          </div>
                        </div> */}

                      <div className="d-flex justify-content-center mt-3 ">
                      <div className="custom-control custom-checkbox">

                        <input type="checkbox" style={{display: "inline-block"}} />
                        </div>
                        <span className="mr-2">Get OTP on WhatsApp</span> 
                        <WhatsappIcon size={22} className="ml-2" />

                </div>
                    <button type="submit" disabled={this.state.mobile.length === 10 && this.state.isValid === true ? false : true} className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize" style={this.state.mobile.length === 10 && this.state.isValid === true ? styles : {}}>
                      Continue
                    </button>
                    <div className="text-center valignimg">
                      <img src={asset+"images/icons/icon-ind.png"} /> We’ll send you a verification code via SMS.
                    </div>
                    <div className="col-md-12 text-center mr-btn-sty">
                      <p className="form-p-sty">
                        By clicking,I agree with the Terms &<br /> Conditions &
                         Privacy Policy 
                      </p>
                    </div>
                    <div className="row loginCustomied text-center">
                      <div className="col-md-6">
                        <p className="form-p-sty">
                          Merchant sign-in?<a href={MERCHANT_URL + '/login'}> Click Here</a>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="form-p-sty">
                          New User?<Link to="/register"> Register Here</Link>
                        </p>
                      </div>
                    </div>
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
  const { isLoggedIn, isLoading, verificationType } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    verificationType,
    message,
    isLoading
  };
}

export default connect(mapStateToProps)(Login);
