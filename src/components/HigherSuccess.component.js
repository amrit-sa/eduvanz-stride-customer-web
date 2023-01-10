import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import Form from "react-validation/build/form";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import { getAccountProfile, activateLimit, getHigherLimit, clearLocalStorage } from "../actions/user";
import GetOurApp from "../common/get-our-app";
import LogoSideBar from "../common/logo-side-bar";

class HigherSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
      limitConfirm: false,
      coApplicant: false,
      higherAmt: false,

    };
  }

  componentDidMount()
  {
    const { user, history, sfid } = this.props;
    console.log("user", user)
    this.props.dispatch(clearLocalStorage());
    if(!sfid)
    {
      history.push("/login");
    }else{
      let data = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(data)).then((response) => {  
        if(response.status ==='success')
        {
          let resdata = response.accountDet;
          const parnderDet = resdata.account_partner__c?resdata.account_partner__c:null;
          if(resdata.ipa_basic_bureau__c && resdata.pan_verified__c)
          {
            if(!resdata.is_bank_detail_verified__c)
            {
              this.setState({higherAmt: true, coApplicant: false});
            }else{
              this.setState({higherAmt: false, coApplicant: false});
            }
          }else if(!resdata.ipa_basic_bureau__c && !resdata.pan_verified__c){
            if(!parnderDet)
            {
              this.setState({higherAmt: false, coApplicant: true});
            }else{
              this.setState({higherAmt: false, coApplicant: false});
            }
            
          }else if(!resdata.ipa_basic_bureau__c && resdata.pan_verified__c){
            if(!parnderDet)
            {
              this.setState({higherAmt: true, coApplicant: true});
            }else{
              this.setState({higherAmt: true, coApplicant: false});
            }
            
          }
          this.setState({limit: resdata.ipa_basic_bureau__c?resdata.ipa_basic_bureau__c:0, limitConfirm: resdata.is_limit_confirm__c?true:false});
        }
      });
    }
  }

  handleSignup = () =>{
    const { history } = this.props;
    history.push("/login");
  }

  activetLink = () =>{
    const { history, dispatch, sfid } = this.props;
    let data = {
      user_sfid: sfid
    }
    dispatch(activateLimit(data)).then((response)=>{
        if(response.status ==="success")
        {
          history.push("/ed_doc");
        }
    });
  }

  handleGetHigher = () =>{
      this.props.dispatch(getHigherLimit());
      this.props.history.push("/bank_screen5");
  }

  goHome = () =>{
    const { history } = this.props;
    history.push("/home");
  }

  render() {
    const { isLoading, history } = this.props;
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }

    return (
      <>
      <Helmet>
              <title>Eduvanz - Limit</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
      </Helmet>
      {isLoading?(
       <div className="loading">Loading&#8230;</div>
      ):''}
       <section className="bg0 login">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                    <div className="d-flex flex-column">
                    
                    <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' color="black" />

                      <div className="login-img no_effect">
                        <img src={asset+"images/gift.png"} />
                       </div>
                    </div>
                  </div>
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform sucess-card">
                <Form ref={(c) => {
                        this.form = c;
                      }}
                      
                >
                     <div className="m-b-20 how-pos4-parent mr-btn-sty">
                        <h5 className="text-center success-text">
                        Congratulations!
                        </h5>
                     </div>
                     <div className="m-b-20 how-pos4-parent mr-btn-sty">
                        <p className="text-center success-p-text">
                             You successfully got loan of
                        </p>
                     </div>
                     <div className="m-b-20 how-pos4-parent mr-btn-sty">
                        <p className="text-center success-loan">
                             <span className="text-center success-loan-rupee">₹</span>{this.state.limit.toLocaleString('en-IN')}
                        </p>
                     </div>
                     <div className="row">
                        <div className="col-md-12 mr-btn-sty text-center">
                            <p className="form-p-sty">
                            You can apply for higher loan amount by providing your income documents.
                            </p>
                        </div>
                     </div>
                     {/* {this.state.higherAmt &&(
                     <div className="row">
                        <div className="col-md-12 mb-5 text-center">
                           <a onClick={this.handleGetHigher} style={{color: "#007bff"}} className="cursor-point" href={void(0)}>Get higher limit</a>
                        </div>
                     </div>
                     )} */}
                      {this.state.coApplicant &&(
                     <div className="row">
                        <div className="col-md-12 mb-5 text-center">
                           <Link to="/ed_coapplicant"> Co-Aplicant</Link>
                        </div>
                     </div>
                     )}
                  <button type="button" onClick={this.activetLink} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty valid-btn btn-normal"} style={this.state.pan !==''?btnStyle:{}}>
                     Activate limit
                  </button>
                  <button type="button" onClick={this.goHome} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty btn-normal"} style={this.state.pan !==''?btnStyle:{}}>
                  Checkout deals
                  </button>
                </Form>
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
  const { isLoading, user, sfid } = state.auth;
  return {
    isLoading,
    message,
    sfid,
    user,
  };
}

export default connect(mapStateToProps)(HigherSuccess);
