import React, { Component } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import Header from "../common/header";
import { asset } from "../common/assets";
import LogoSideBar from "../common/logo-side-bar";

class BankSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: false
    };
  }

  render() {
      const { user } = this.props
    return (
        <>
        <Helmet>
              <title>Bank Success</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        <Header
          user = {user}
        />
       <section className="bg0 login">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                  <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                    <div className="d-flex flex-column">
                   {/*  <div className="textpart">
                    <h4 className="mtext-105 cl2 txt-center p-b-30">eduvanz.</h4>
                    </div> */}

                    <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />
                    
                      <div className="login-img no_effect">
                        <img src={asset+"images/gift.png"} />
                       </div>
                    </div>
                  </div>
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform sucess-card">
                <form ref={(c) => {
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
                        Your bank account has been linked Successfully
                        </p>
                     </div>
                     <button type="button" onClick={()=> window.location = "/home"} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty valid-btn btn-normal"} >
                     Continue Shopping
                  </button>
                </form>
                </div>
            </div>
          </div>
        </div>
      </section>
        </>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(BankSuccess);
