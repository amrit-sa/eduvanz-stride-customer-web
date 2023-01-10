import React, { Component } from "react"
import { Link } from 'react-router-dom';
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { asset } from "../common/assets";
import LogoSideBar from "../common/logo-side-bar";

class Reject extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  render() {
    const { history } = this.props
   
    return (
          <>
          <Helmet>
              <title>Reject</title>
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
                        <img src={asset+"images/reject.png"} className="img-fluid"/>
                        <h4 className="mtext-114">
                        You are on the wait list
                        </h4>
                        <p className="mb-lg-5 mb-3">We couldn’t approve your application right now.
You may reapply after 1 month</p>
<p>While you are on wait list you can add a co-borrower  </p>
                        </div>
                        
                        <div className="co-borrower-box">
                          <h6 className="my-4 px-4">The Co-borrower will:</h6>
                          <ul className="m-4">
                            <li>
                              <img src={asset+"images/icons/v1.png"} className="img-fluid"/> <p>Downloads the app</p></li>
                            <li><img src={asset+"images/icons/v2.png"} className="img-fluid"/> <p>Get the limit</p></li>
                            <li><img src={asset+"images/icons/v3.png"} className="img-fluid"/> <p>You and co-borrower start spending</p> </li>
                          </ul>

                          <p className="border-top text-center py-3 m-0">
                             <Link to="/ed_coapplicant">Let’s get started</Link>
                          </p>
                          <p className="border-top text-center py-3 m-0">
                             <Link to="/home">Go to shop</Link>
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
  const { isLoggedIn, isLoading, verificationType } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    verificationType,
    message,
    isLoading
  };
}

export default connect(mapStateToProps)(Reject);
