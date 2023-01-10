import React, { Component } from "react";
import validator from 'validator' 
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { asset } from "../common/assets";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";

class SignOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      loading: false,
      passwordType: 'password',
      passwordHide:true,
      errorMsg: '',
      isValid: true
    };
  }

  handleMobile = (e) => {
    const reg = /^[0]?[6789]\d{9}$/;
    var pattern = new RegExp(/^[0-9\b]+$/);
    console.log('Mobile', e.target.value);
    console.log(validator.isMobilePhone(e.target.value));
    if(e.target.value !='')
    {
      if (!pattern.test(e.target.value)) {
        this.setState({isValid : false});
        this.setState({errorMsg : "Please enter only number."});
      }else if(e.target.value.length === 10)
      {
        if(reg.test(e.target.value))
        {
         this.setState({isValid  : true, errorMsg : "", mobile : e.target.value});
        }else{
          this.setState({isValid : false, errorMsg : "Please enter valid mobile number.", mobile : e.target.value});
        }
      }else{
        this.setState({isValid  : true, errorMsg : "", mobile : e.target.value});
      }
    }else{
      this.setState({isValid  : false});
      this.setState({errorMsg : ""});
      this.setState({mobile : e.target.value});
    }
  }

  handleLogin(e) { 
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleSubmit = (event) => {
      this.setState({isValid  : true});
      this.setState({errorMsg : ""});
      event.preventDefault();
      const { history } = this.props;
      if(this.state.mobile !='')
      {
        localStorage.setItem('mobile', this.state.mobile);
        history.push("/edotp");
        window.location.reload();
      }else{
        this.setState({isValid  : false});
        this.setState({errorMsg : "Please enter valid phone number."});
      }
  
    }

  

  render() {
     const { message, isLoading, history } = this.props;
    const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
    return (
          <>
          <Helmet>
              <title>Signin with otp</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
            ):''}
          <section className="bg0 login">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card" >
                    <div className="d-flex flex-column">
                    
                    <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />

                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                      </div>
                    </div>
                  </div>
                  <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                    <div className="loginform" style={{width: '75%'}}>
                      <div  className="cl2 txt-center p-b-30 form-title form-primary-card">
                        <h4 className="mtext-114">
                        <img src={asset+"images/icons/login-title.png"} /> Sign in
                        </h4>
                      </div>
                      <form onSubmit={this.handleSubmit}>
                      <div className="row">
                          <div className="col-md-12">
                            <h3>Sign in to your account with your mobile number.</h3>
                          </div>
                          
                        </div>
                      
                        <div className="row">
                        <div className="col-md-12 m-b-5 how-pos4-parent">
                      <div className="input-group bor8 show_hide_password1" style={{flexWrap: 'initial'}}>
                        <input
                            name="text"
                            placeholder=""
                            style={{width: '10%', marginLeft: '6px', background: '#fff'}}
                            defaultValue={'+91'}
                            disabled={true}
                          />
                          <input
                            className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15"
                            type="text"
                            name="mobile"
                            placeholder="Enter Mobile Number"
                            style={{width: '86%'}}
                            onChange={this.handleMobile}
                          />
                          <div className="input-group-addon input-group-addon-sty">
                          {this.state.mobile.length ===10 && this.state.isValid?(
                            <img src={asset+"images/Vector.png"} />
                          ):''
                          }
                           {
                            this.state.isValid === false?(
                              <img src={asset+"images/error.png"} />
                            ):''
                          }
                          
                        </div>
                        </div>
                        </div>
                          {
                            this.state.isValid === false?(
                              <span className="warningmsg">{this.state.errorMsg}</span>
                            ):''
                          }
                        </div>
                       
                        <button type="submit" disabled={this.state.mobile.length ===10 && this.state.isValid === true?false:true} className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty" style={this.state.mobile.length ===10 && this.state.isValid === true?styles:{}}>
                        Get OTP
                        </button>
                       
                        <div className="row">
                          <div className="col-md-12 text-center pb-3">
                            <p className="form-p-sty">
                              <Link to="/login" >Sign in with email</Link>
                            </p>
                          </div>
                        </div>
                      </form>
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
  const { isLoggedIn, isLoading } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
    isLoading
  };
}

export default connect(mapStateToProps)(SignOtp);
