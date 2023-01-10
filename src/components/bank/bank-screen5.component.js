import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen5 extends Component {

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
                <title>Bank Screen 5</title>
            </Helmet>
     
            <section className="kyc_pages bank_page">
                <div className="container-zero">
                <div className="flex-w flex-tr">
                    <div className="kyc_leftbar login-bg">
                        {/* <h4 className="mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div> */}

                        <LogoSideBar sideTitle="Back" backLink='' />    

                        <h4 className="mtext-105 cl6 whiteText">Bank Statement</h4>
                        
                    </div>
                    <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
                    <div className="form_width_1 ext10">
                    <div className="form_details">
                        <h4 className="bg-2 text-center imgaligned"> Upload Statement Manually </h4>
                        <ul className="horizontal_list type_2 small">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                        <div className="form_details">
                            {/* <ul className="kyc_mainoptions style_1 fullwidth mb-2">
                                <li>
                                    <img className="flimg" src={asset+"images/internetbanking.svg"} />
                                     <h5>Link via Internet Banking</h5>
                                        <p>Enter your netbanking credentials to share banking data. </p>
                                        <Link className="bg_1" to="/kyc_screen2"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
                                </li>
                            </ul> */}
                                <div className="d-block text-center boxstyle_2"><span className="or_type1 ew_1">OR</span></div>
                                <ul className="kyc_mainoptions style_1 fullwidth mt-2">
                                <li>
                                    <img className="flimg" src={asset+"images/receipt.svg"} />
                                    <h5>Upload Bank Statement</h5> 
                                    <p>Upload your bank statements manually.</p>
                                    <Link className="bg_2" to="/ed_upload"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
                                </li>
                            </ul>
                        </div>
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

export default connect(mapSTP)(BankScreen5)