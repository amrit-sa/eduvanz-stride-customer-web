import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import { updateMpin } from "../actions/auth";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";

class CreateMpin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: localStorage.getItem('mobile'),
      loading: false,
      timerOn: true,
      timer: '01:59',
      isValid: false,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      forget: localStorage.getItem('next')
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
    if( value1 === 'otp4')
    {
      this.handleSubmit(event.target.value);
    }
  }

  handleSubmit(value) {
    const { dispatch, history, user } = this.props;
    var pattern = new RegExp(/^[0-9\b]+$/);
    if(pattern.test(this.state.otp1) && pattern.test(this.state.otp3) && pattern.test(value) && pattern.test(this.state.otp2))
    {
      const givenOtp = parseInt(this.state.otp1+this.state.otp2+this.state.otp3+value);
      this.setState({ isSubmit : 1});
      let data = { 
          mpin: givenOtp,
          id: user,
          forget: this.state.forget?this.state.forget:0
        }
      dispatch(updateMpin(data))
      .then((response) => {
        console.log('next', response.next);
        if(response.code ===200)
        {
          if(response.next === '1')
          {
            history.push("/success");
          }else{
            history.push("/personal_details");
          }
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
        console.log('next', next);
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
    if(s === 59){m=m-1}
    if(m<0){
      return
    }
    this.setState({timer:  m + ":" + s});
    setTimeout(this.startTimer, 1000);
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec};
    if (sec < 0) {sec = "59"};
    return sec;
  }

  handleClear = () =>{
    this.setState({otp1:'', opt2:'', otp3:'', opt4:''});
  }

  

  render() {
     const { mpinMsg,isLoading, errorMsg, isValid, history} = this.props; 
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
              <title>Update Mpin</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
          <section className="bg0 login">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card">
                  <div className="d-flex flex-column">
                    
                    <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />

                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                      </div>
                    </div>
                  </div>
                  <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                    <div className="loginform" style={{width: '65%'}}>
                        {isLoading === false ?(
                    <>
                      <div  className="cl2 txt-center p-b-30 form-title" style={{background:'#BCF1FA'}}>
                        <h4 className="mtext-114">
                        <img src={asset+"images/icons/icon_Mpin.png"} /> Update mPIN
                        </h4>
                      </div>
                      <form className="otpform" onSubmit={this.handleSubmit}>
                      <div className="row">
                          <div className="col-md-12">
                            <h3>Please enter the mPIN to create for +91-{this.state.mobile}.</h3>
                          </div>
                          
                        </div>
                        {mpinMsg !=='' && isValid ===1?(
                      <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-success" role="alert">
                              {mpinMsg}
                            </div>
                          </div>
                      </div>
                      ):''
                      }
                      
                      <div className="text-center mr-btn-sty">
                        <div className="row">
                          <div className="col-sm-12">
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
                                <img style={{marginLeft:'10px', cursor:'pointer'}} onClick={this.handleClear} src={asset+"images/error.png"} />
                            ):''}
                          </div>
                        </div>
                      </div>
                      {errorMsg !=='' && isValid ===0?(
                      <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">
                              {errorMsg}
                            </div>
                          </div>
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
  const { isLoggedIn, isLoading, verifivation_id, successMsg, errorMsg, mpinMsg, user,isValid  } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
    isLoading,
    verifivation_id,
    successMsg,
    errorMsg,
    mpinMsg,
    isValid ,
    user
  };
}

export default connect(mapStateToProps)(CreateMpin);
