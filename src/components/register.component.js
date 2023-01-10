import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import { register, clearAuthMessage } from "../actions/auth";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";
import {  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
const Merchat_Url = process.env.REACT_APP_MERCHAT_URI;

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      mobile: '',
      username: "",
      password: "",
      loading: false,
      errorMsg: '',
      isValid: true,
      existing_user: false,
      existing_user_msg:'',
    };
  }

  componentDidMount() {
    this.handleClearMessage();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.mobile.length > this.state.mobile.length){
      this.setState({isValid: false, errorMsg: "Please enter correct 10 digit number."})
    }
  } 

  handleClearMessage = () => {
    this.props.dispatch(clearAuthMessage());
  }

  handleMobile = (e) => {
    const reg = /^[0]?[6789]\d{9}$/;
    this.handleClearMessage();
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (e.target.value !== '') {
      if (!pattern.test(e.target.value)) {
        this.setState({ isValid: false, errorMsg: "Please enter only number.", mobile: "" });
        document.getElementById('mobile').value = "";
      } else if (e.target.value.length === 10) {
        if (reg.test(e.target.value)) {
          this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
        } else {
          this.setState({ isValid: false, errorMsg: "Please enter correct 10 digit number.", mobile: e.target.value });
        }
      } else {
        this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
      }
    } else {
      this.setState({ isValid: false, errorMsg: "", mobile: e.target.value });
    }

  }

  handleLogin(e) {
    this.setState({ loading: true });
    this.handleClearMessage();
    e.preventDefault();
    const { dispatch, history } = this.props;
    let data = {
      mobile_no: this.state.mobile
    }
    localStorage.setItem('mobile', this.state.mobile);
    dispatch(register(data))
      .then((response) => {
        this.setState({ loading: false });
        if(response.isNewUser === true ){
          if (this.props.verificationType === 'otp') {
            history.push("/edotp");
          } else if (this.props.verificationType === 'mPin') {
            history.push("/edmpin");
          }
        }else{
          this.setState({existing_user : true, existing_user_msg : "Account already exist with this number. Please Sign in !"})
        }
      }).catch(() => {
        this.setState({ loading: false });
      });
  }

  handleClear = () => {
    this.setState({ isValid: true, mobile: '', errorMsg: "" });
    document.getElementById("mobile").value = "";
    this.handleClearMessage();
  }

  render() {
    const { message, history } = this.props;
    const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    return (
      <>
        <Helmet>
          <title>Sign Up</title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {/*CSS Spinner*/}
        {this.state.loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        <section className="bg0 login page_registration_none">
          <div className="container-zero">
            <div className="flex-w flex-tr">
              <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md login-bg">
                <div className="d-flex flex-column">

                 <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />
                 
                  <div className="login-img">
                    <img src={asset + "images/login-left2.png"} />
                  </div>
                </div>
              </div>
              <div className="size-210 bor10 flex-w p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform">
                  <div className="cl2 txt-center p-b-30 form-title form-primary-card black_bg">
                    <h4 className="mtext-114">
                      <img src={asset + "images/icons/login-title.png"} /> Create Your Stride Account
                    </h4>
                  </div>
                  <form onSubmit={this.handleLogin}>
                    <div className="row">
                      <div className="col-md-12">
                        <h3><span className="d-block">Please enter your mobile number</span></h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 m-b-5 how-pos4-parent">
                          <div className={ this.state.errorMsg.length>0 ? 'text-danger' : '' }>
                            Mobile Number
                          </div>
                        <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>
                          <input
                            name="text"
                            placeholder=""
                            style={{ width: '10%', marginLeft: '6px', background: '#fff' }}
                            defaultValue={'+91'}
                            disabled={true}
                          />
                          <input
                            className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15"
                            type="text"
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile Number"
                            style={{ width: '86%' }}
                            onChange={this.handleMobile}
                            maxLength="10"
                            required
                          />
                          <div className="input-group-addon input-group-addon-sty">
                            {this.state.mobile.length === 10 && this.state.isValid ? (
                              <img src={asset + "images/Vector.png"} />
                            ) : ''
                            }
                            {
                              this.state.mobile.length === 10 && this.state.isValid === false ? (
                                <img style={{ cursor: 'pointer' }} onClick={this.handleClear} src={asset + "images/error.png"} />
                              ) : ''
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      this.state.isValid === false ? (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                          </div>
                        </div>
                      ) : ''
                    }
                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )
                    }
                    {this.state.existing_user && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.existing_user_msg}
                        </div>
                      </div>
                    )
                    }

                    {/* <div className="row">
                          <div className="col-md-12">
                          <p className="form-p-sty mb-0">
                          New number? <Link to="#" >Update your account.</Link>
                          </p>
                        </div>
                        </div> */}

                        {/* <div class="checkBox col-sm-12">
                          <div class="form-group">
                            <input type="checkbox" id="check"></input>
                            <label for="check">Get OTP on WhatsApp <img src={asset+"images/whatsapp-icon.png"} /></label>
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
                      <img src={asset + "images/icons/icon-ind.png"} /> We’ll send you a verification code via SMS.
                    </div>
                    <div className="col-md-12 text-center mr-btn-sty">
                      <p className="form-p-sty">
                        By proceeding, you agree to our Terms & Conditions & Privacy Policy
                      </p>
                    </div>
                    <div className="row loginCustomied text-center pb-2">
                      <div className="col-md-6" >

                        <p className="form-p-sty">
                          Merchant sign-up?<a href={Merchat_Url + '/register'}> Click Here</a>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="form-p-sty">
                          Existing User?<Link to="/login"> Sign in</Link>
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
    message,
    isLoading,
    verificationType
  };
}

export default connect(mapStateToProps)(Register);
