import React, { Component } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import Header from "../common/header";
import { asset } from "../common/assets";
import { getAccountProfile } from "../actions/user";
import LogoSideBar from "../common/logo-side-bar";

class BankLinkFaild extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: false,
        accountDet: null
    };
  }

    componentDidMount()
    {
      const { user, sfid } = this.props;
      let data = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(data))
      .then((response) => {  
        if(response.status ==='success')
        {
          const resdata = response.accountDet;
          this.setState({accountDet: resdata});
        }
      });
    }

    handleContinue = () =>{
      const accountData = this.state.accountDet;
      if(accountData && accountData.ipa_basic_bureau__c)
      {
        this.props.history.push("/ed_after_upload");
      }else{
        this.props.history.push("/ed_upload");
      }
    }

  render() {
      const { user} = this.props
   
    return (
        <>
          <Helmet>
              <title>Bank Link Faild</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        <Header
          user = {user}
        />
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
                    <div className="loginform">
                      <div className="cl2 p-b-30 ">
                        <div className="txt-center">
                        <img src={asset+"images/reject.png"} className="img-fluid"/>
                        <h4 className="mtext-114">
                            Link Faild
                        </h4>
                        <p className="mb-lg-5 mb-3">Your bank account linking faild please click below link to upload bank statement manually</p>
                        </div>
                        
                        <div className="co-borrower-box">
                          <p className="border-top text-center py-3 m-0">
                             <a href={void(0)} onClick={this.handleContinue} style={{color: "#0072ff", cursor: 'pointer'}}>Upload Manually</a>
                          </p>
                        </div>

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
  const { user, sfid } = state.auth;
  return {
    sfid,
    user
  };
}

export default connect(mapStateToProps)(BankLinkFaild);
