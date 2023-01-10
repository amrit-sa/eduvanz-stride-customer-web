import React, { Component } from "react"
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import LogoSideBar from "../common/logo-side-bar";

class Awiting extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  handleEplore = () =>{
     window.location = "/home";
  }


  render() {
    const { history } = this.props
   
    return (
          <>
          <Helmet>
              <title>Awaiting</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
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
                        <img src={asset+"images/awaiting.png"} className="img-fluid"/>
                        <h4 className="mtext-114">
                        Thank you for your application
                        </h4>
                        <p className="mb-lg-5 mb-3">While our team is evaluating your application, you can explore the store.</p>
                        <button type="button" onClick={this.handleEplore} className="pay-btn w-100">Explore marketplace</button>
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
  const { isLoggedIn, isLoading } = state.auth;
  return {
    isLoggedIn,
    isLoading
  };
}

export default connect(mapStateToProps)(Awiting);
