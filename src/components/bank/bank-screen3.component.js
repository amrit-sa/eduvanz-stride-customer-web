import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import GetOurApp from '../../common/get-our-app';

class BankScreen3 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }


    render() {
      
        return (
            <>
            <Helmet>
                <title>Bank Screen 3</title>
            </Helmet>
     
            <section className="kyc_pages bank_page">
                <div className="container-zero">
                <div className="flex-w flex-tr">
                    <div className="kyc_leftbar bg-3 login-bg">
                    {/* <div className=" size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md login-bg"> */}

                        <h4 className="mtext-105">eduvanz</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div>
                        <h4 className="mtext-105 cl6">Bank Statement</h4>
                        
                    </div>
                    <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
                    <div className="form_width_1 ext10">
                    <ul className="horizontal_list border-0 type_2">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                    <div className="form_details">
                        <h4 className="bg-2 text-center imgaligned"> Please select your bank </h4>
                        <ul className="horizontal_list type_2 small">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                        <form  className="otpform" >
                        <div className="col-md-12">
                            <div className="form_spacing pt-3 pb-3 d-flex flex-col-m mn_height_3">
                            <div className="d-block text-center mt-4 pos_pb">
                                <h3><span className="d-block f20_black mb-5">Enter OTP sent to XXXXXX1363</span></h3>
                                     
                            <div className="mr-btn-sty">
                                <div className="row justify-content-center">
                                    <div className={`col-md-6 margin_5`}>
                                        <input
                                        className="otp"
                                        name="otp1"
                                        id="otp1"
                                        type="text"
                                        autoComplete="off"
                                        tabIndex="1" 
                                        maxLength="1" 
                                        placeholder={0}
                                        />
                                        <input
                                        className="otp"
                                        name="otp2"
                                        id="otp2"
                                        type="text"
                                        autoComplete="off"
                                        tabIndex="2" 
                                        maxLength="1" 
                                        placeholder={0}
                                        />
                                        <input
                                        className="otp"
                                        name="otp3"
                                        id="otp3"
                                        type="text"
                                        autoComplete="off"
                                        tabIndex="3" 
                                        maxLength="1"
                                        placeholder={0} 
                                        />
                                        <input
                                        className="otp"
                                        name="otp4"
                                        id="otp4"
                                        type="text"
                                        autoComplete="off"
                                        tabIndex="4" 
                                        maxLength="1"
                                        placeholder={0} 
                                        />
                                    </div>
                                  </div>
                                  </div>
                                  <p><span className="d-block">Verification code valid for next 09:59 min</span></p>
                                  <p><span className="d-block"><a href={"#"}>Resend the OTP</a></span></p>
                            
                                     <p className="pos_bottom"><span className="d-block img_valign1"><strong>Eduvanz  | </strong>  Powered by <img src={asset+'images/onemoney.png'} style={{width:"100px"}} alt="" /></span></p>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
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
        )
    }
}

const mapSTP = state => {
    return {currentUser: state.currentUser}
}

export default connect(mapSTP)(BankScreen3)