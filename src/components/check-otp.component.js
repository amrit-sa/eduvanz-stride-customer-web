import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import { checkOtp, sendOtp, clearAuthMessage } from "../actions/auth";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";

class CheckOtp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: localStorage.getItem('mobile'),
      loading: false,
      timerOn: true,
      timer: '00:19',
      isValid: false,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      viewResend: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount()
  {
    this.startTimer();
  }

  handleChange(value1, event) {
    this.setState({ [value1]: event.target.value });
    if(value1 ==='otp4')
    {
      this.handleSubmit(event.target.value);
    }
  }

  handleSubmit(value) {
    const { dispatch, history, verifivation_id } = this.props;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(pattern.test(this.state.otp1) && pattern.test(this.state.otp3) && pattern.test(value) && pattern.test(this.state.otp2))
    {
      const givenOtp = parseInt(this.state.otp1+this.state.otp2+this.state.otp3+value);
      console.log('verifivation_id', verifivation_id);
      let data = { 
          otp: givenOtp,
          logId: verifivation_id
        }
      dispatch(checkOtp(data))
      .then((response) => {
        if(response.status ==='success')
        {
           history.push(response.page);
        }
      });
    }
  }

  inputfocus = (elmnt, getvalue) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      console.log("next");     
      const pattern = /^[0-9]$/;
      if(pattern.test(elmnt.target.value))
      {
        const next = elmnt.target.tabIndex;
      //  console.log('next', next);
        if (next < 4) {
          elmnt.target.form.elements[next].focus()
        }
      }else{
        this.setState({[getvalue]: ''});
        document.getElementById(getvalue).value = '';
      }
    }

  }

  startTimer() {
    var presentTime = this.state.timer;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = this.checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    if(m<0){
      return
    }
    if(m === '00' && s === '00')
    {
      this.setState({viewResend: true});
    }
    this.setState({timer:  m + ":" + s});
    setTimeout(this.startTimer, 1000);
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec};
    if (sec < 0) {sec = "59"};
    return sec;
  }

  sendOtp = () =>{
    const { dispatch } = this.props;
    const mobile = localStorage.getItem('mobile');
    let data = {
      mobile_no: mobile
    }
    dispatch(sendOtp(data))
    .then(() => {
        window.location.reload();
    });
  }

  handleClear = () =>{
    this.setState({otp1:'', otp2:'', otp3:'', otp4:''});
    this.props.dispatch(clearAuthMessage());
  }

  

  render() {
     const { isLoading, successMsg, errorMsg, isValid, history } = this.props;
    const vector = {
                 position: 'absolute',
                 width: '45.28px',
                 height: '45.28px',
                 background: '#04B983',
                 borderRadius: '31px',
                 right: '47%',
                }
    return (
          <>
          <Helmet>
              <title>Verify Otp</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                  <div className="loading">Loading&#8230;</div>
              ):''}
          <section className="bg0 login page_registration">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md  primary-card">
                    <div className="d-flex flex-column">

                   <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />
                   
                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                       </div>
                    </div>
                  </div>
                  <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                    <div className="loginform">
                        {this.state.loading === false?(
                    <>
                      <div  className="cl2 txt-center p-b-30 form-title form-primary-card">
                        <h4 className="mtext-114">
                        <img src={asset+"images/icons/icon_Otp.svg"} /> We just texted you
                        </h4>
                      </div>
                      <form className="otpform" onSubmit={this.handleSubmit}>
                      <div className="row">
                          <div className="col-md-12">
                            <h3>Please enter the verification code we sent to +91-{this.state.mobile}.</h3>
                          </div>
                      </div>
                      {successMsg !=='' && isValid ===1?(
                      <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-success" role="alert">
                              {/* {successMsg} */}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                       
                      <div className="text-center mr-btn-sty">
                        <div className="row">
                          <div className={`col-sm-12 ${errorMsg !=='' && isValid ===0 ? 'error' : ''}`}>
                            <input
                              className="otp"
                              name="otp1"
                              id="otp1"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp1}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp1", e)}
                              tabIndex="1" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp1")}
                            />
                            <input
                              className="otp"
                              name="otp2"
                              id="otp2"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp2}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp2", e)}
                              tabIndex="2" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp2")}
                            />
                            <input
                              className="otp"
                              name="otp3"
                              id="otp3"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp3}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp3", e)}
                              tabIndex="3" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp3")}
                            />
                            <input
                              className="otp"
                              name="otp4"
                              id="otp4"
                              type="text"
                              autoComplete="off"
                              value={this.state.otp4}
                              onKeyPress={this.keyPressed}
                              onChange={e => this.handleChange("otp4", e)}
                              tabIndex="4" 
                              maxLength="1" 
                              placeholder={0}
                              onKeyUp={e => this.inputfocus(e,"otp4")}
                            />
                            {this.state.isValid || isValid ===0?(
                                <img style={{marginLeft: '10px', cursor:'pointer'}} onClick={this.handleClear} src={asset+"images/error.png"} />
                            ):''}
                          </div>
                        </div>
                      </div>
                      {errorMsg !=='' && isValid ===0?(
                      <div className="row">
                          <div className="col-md-12 text-center">
                            <div className="alert alert-danger" role="alert">
                              {errorMsg}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                      <div className="text-center valignimg">
                        <img src={asset+"images/icons/icon-ind.png"} /> Verification code valid for next
                        {' '+this.state.timer} min
                      </div>
                      {this.state.viewResend?(
                        <div className="col-md-12 text-center mr-btn-sty">
                           <span style={{cursor:'pointer', color:'#007bff', fontWeight: 600}} onClick={this.sendOtp}> Resend Otp</span>
                        </div>   
                        ):''
                      }
                      </form>
                      <div className="pos_abs">
                         <GetOurApp 
                  dispatch={this.props.dispatch}
                />                     
                    </div>
                      </>
                      ):(
                          <>
                          <div className="col-md-12 mr-t padd-0 text-center">
                                <span style={vector}><img src={asset+"images/success.png"} style={{marginTop: '11px',marginLeft:'7px'}} /></span>
                          </div>
                          <div className="col-md-12 mr-t padd-0 text-center" style={{marginTop: '58px'}}>
                            <p className="mr-t padd-0 balockfnt fntsizesub">
                                 Processing...
                            </p>
                          </div>
                          <div className="col-md-12 mr-t padd-0 text-center">
                            <p className="mr-t padd-0 balockfnt fntsizesub">
                              Please wait while we redirect you to the Personal Details page.
                            </p>
                          </div>
                        </>
                      )}
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
  const { isLoggedIn, isLoading, verifivation_id, successMsg, errorMsg, isValid, user } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
    isLoading, 
    verifivation_id, 
    successMsg, 
    errorMsg, 
    isValid, 
    user
  };
}

export default connect(mapStateToProps)(CheckOtp);
