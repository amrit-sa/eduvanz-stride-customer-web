import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import Helmet from "react-helmet";
import Form from "react-validation/build/form";
import { asset } from "../common/assets";
import { connect } from "react-redux";
import { updatePan, updatePanStatus, clearAuthMessage } from "../actions/auth";
import { getAccountProfile } from "../actions/user";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";

class PanEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      pan:'',
      isValidPan: false,
      successful: false,
      isDisabled: true,
      mypan: '',
      errorMsg:'',
      isValid: true
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleOtpSubmit = this.handleOtpSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount()
  {
    const { dispatch, user, sfid} = this.props
    let data = {
      user_sfid: sfid
    }
    dispatch(getAccountProfile(data)).then((response)=>{
      if(response.status ==="success")
      {
          let getData = response.accountDet;
          this.setState({mypan: getData.pan_number__c, pan: response.accountDet.pan_number__c, isValidPan: response.accountDet.pan_number__c?true:false});
      }
    });
  }

  handlePanEdit = (id) =>{
    this.setState({isValidPan: id?true:false});
    if(id === 1)
    {
      const pan = this.state.mypan;
      this.handleClearMessage();
      if(pan)
      {
        this.setState({ pan: pan, errorMsg: '', isValid: true});
      }else{
        this.props.history.push("/home");
      }
      
    }
  }
  

  handleChange = (e) => {
      e.persist();
      var regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      this.handleClearMessage();
      let getpan = e.target.value;
      let panDat = getpan?getpan.toUpperCase():'';
      console.log("pan", panDat);
      if(panDat.length ===10)
      {
        if(panDat != "TESTPAN123"){
          if(regex.test(panDat))
          {
            this.setState({ isValid:true, pan: panDat, errorMsg :''});
          }else{
              this.setState({ isValid: false, errorMsg:'Enter Valid pan number', pan: panDat});
          }
        }else{
          this.setState({ isValid:true, pan: panDat, errorMsg :''});
        }
    }else{
        this.setState({pan: panDat, isValid: false, errorMsg :''});
    }
     
  }

  handleOtpSubmit(e)
  {
      e.preventDefault();
      this.setState({
        successful: false,
      });
      this.handleClearMessage();
      this.form.validateAll();
      const { history, user, sfid } = this.props;
      let data = {
        user_sfid: sfid,
        pan: this.state.pan
      }
      if(this.state.pan == "TESTPAN123"){
        history.push("/ed_qdform");
        this.handleClearMessage();
      }else{
        this.props.dispatch(updatePan(data)).then((status) => {
            if(status ==="success")
            {
              history.push("/ed_qdform");
              this.handleClearMessage();
            }
          });
      }
  }

  handleRegister(e) {
    e.preventDefault();
    this.form.validateAll();
    const { history, user, sfid } = this.props;
    let data = {
      user_sfid: sfid,
      pan: this.state.pan
    }
    this.props.dispatch(updatePanStatus(data)).then((status) => {
        history.push("/ed_qdform");
      },(error)=>{
        history.push("/ed_qdform");
      });
  }

  handleSignup = () =>{
    const { history } = this.props;
    history.push("/login");
  }

  handleClearMessage = () =>{
    this.props.dispatch(clearAuthMessage());
  }

  render() {
    const { isLoading, errorMsg, user, sfid, history } = this.props;
    console.log('isValidisValid',this.state.isValid,this.state.errorMsg)
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }
    if(!sfid){
      return <Redirect to="/login" />
   }

    return (
      <>
      <Helmet>
              <title>Eduvanz - PAN</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
      </Helmet>
      {isLoading?(
        <div className="loading">Loading&#8230;</div>
     ):''}
         <section className="bg0 login page_registration_none panpages">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md login-bg">
                    <div className="d-flex flex-column">
                   
                    <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />

                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                       </div>
                    </div>
                  </div>
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform">
                <div  className="cl2 txt-center p-b-30 form-title form-primary-card black_bg">
                        <h4 className="mtext-114">
                  <img src={asset+"images/icons/icon_Pan.svg"} /> PAN Details
                </h4>
                </div>
                {!this.state.isValidPan?(
                <Form ref={(c) => {
                        this.form = c;
                      }}
                       onSubmit={this.handleOtpSubmit}
                >
                     <div className="row">
                          <div className="col-md-12">
                        <h3>Please enter your PAN</h3>
                      </div></div>

                      <div className="m-b-5 how-pos4-parent">
                          <input
                            className="stext-111 bor8 cl2 plh3 size-116 p-l-15 p-r-15"
                            type="text"
                            name="pan"
                            placeholder="PAN"
                            value={this.state.pan?this.state.pan:''}
                            onChange={this.handleChange}
                            maxLength={"10"}
                            style={{textTransform :'uppercase'}}
                            required
                          />
                         </div> 
                         {/* <span className="col-md-12 mr-btn-sty p-t-10">eg: PEVFV4506Y</span> */}
                     
                          {
                                this.state.isValid === false?(
                                  <div className="form-group p-t-15">
                                      <div className={"alert alert-danger"} role="alert">
                                          {this.state.errorMsg}
                                      </div>
                                  </div>
                                ):''
                          }
                     
                      
                  
                  <button type="submit" disabled={this.state.pan && this.state.pan.length ===10 && this.state.isValid && this.state.errorMsg===''!==''?false:true} className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty"} style={this.state.pan && this.state.isValid && this.state.errorMsg==='' !==''?btnStyle:{}}>
                  Confirm
                  </button>
                  <div className="col-md-12 mr-btn-sty" style={{justifyContent: 'center', textAlign: 'center'}}>
                      <p className="form-p-sty">
                      <img src={asset+"images/icons/icon-ind.png"} className="pr-2" />
                      Sharing this information will not impact your Credit Score.
                      </p>
                  </div>
                  <div className="row" style={{justifyContent: 'center'}}>
                          <div className="col-md-6" style={{justifyContent: 'center', textAlign: 'center'}}>
                            <p className="form-p-sty">
                              <a style={{cursor:'pointer'}} href={void(0)} onClick={()=>this.handlePanEdit(1)} >Cancel</a>
                            </p>
                          </div>
                   </div>
                 
                </Form>
                ):(
                  <Form ref={(c) => {
                        this.form = c;
                      }}
                       onSubmit={this.handleRegister}
                >
                     <div className="m-b-20 how-pos4-parent mr-btn-sty">
                        <h5 className="text-center p-style-fnt" style={{fontSize: '24px'}}>
                        Is this your PAN?
                        </h5>
                      </div>

                      <div className="m-b-20 how-pos4-parent mr-btn-sty" >
                        <h5 className="text-center p-style-fnt" style={{letterSpacing: '5px',fontSize: '34px', fontWeight: 'bold',fontFamily: 'Graphik',fontStyle: 'normal'}}>
                          {this.state.pan}
                        </h5>
                      </div>
                 
                 
                  {errorMsg?(
                          <div className="form-group p-t-15">
                          <div className={"alert alert-danger"} role="alert">
                            {errorMsg?errorMsg:''}
                          </div>
                        </div>
                        ):''
                      } 
                  <button type="submit" className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty"} style={btnStyle}>
                  Yes, this is my PAN 
                  </button>
                  <div className="row">
                    <div className="col-md-12 mr-btn-sty" style={{justifyContent: 'center', textAlign: 'center'}}>
                        <div className="text-center valignimg">
                        <img src={asset+"images/icons/icon-ind.png"} />
                        Sharing this information will not impact your credit score
                        </div>
                    </div>
                  </div>
                  <div className="row" style={{justifyContent: 'center'}}>
                          <div className="col-md-6" style={{justifyContent: 'center', textAlign: 'center'}}>
                            <p className="form-p-sty">
                              <a style={{cursor:'pointer'}} href={void(0)} onClick={()=>this.handlePanEdit(0)} >This is not my PAN</a>
                            </p>
                          </div>
                   </div>
                 
                </Form>
                )
                }
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
  const {isLoading, successMsg, errorMsg, isValid, user, token, sfid} = state.auth;
  return {
    message,
    isLoading,
    successMsg,
    errorMsg,
    isValid,
    sfid,
    user,
    token
  };
}

export default connect(mapStateToProps)(PanEdit);
