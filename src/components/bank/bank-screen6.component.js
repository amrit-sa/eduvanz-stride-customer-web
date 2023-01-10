import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen6 extends Component {

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
                <title>Bank Screen 6</title>
            </Helmet>
     
            <section className="kyc_pages bank_page">
                <div className="container-zero">
                <div className="flex-w flex-tr">
                    <div className="kyc_leftbar bg-3">
                        {/* <h4 className="mtext-105 cl6">eduvanz.</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div> */}

                        <LogoSideBar sideTitle="Back" backLink='' />    

                        <h4 className="mtext-105 cl6">Bank Statement</h4>
                        
                    </div>
                    <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
                    <div className="form_width_1 ext10">
                    <div className="form_details">
                        <h4 className="bg-2 text-center imgaligned"><img src={asset+"images/icons/icon_camera.svg"} /> Upload Statement Manually </h4>
                        <ul className="horizontal_list type_2 small">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                        <form  className="otpform otpform-others fullwidth" >
                        <div className="col-md-12">
                            <div className="form_spacing d-flex flex-col-m mn_height_3 " style={{paddingBottom:"150px"}}>
                            <div className="upload_box boxstyle_2 d-block text-center mt-4">
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <img src={asset+'images/bank4.png'} alt="" />
                                        </div>
                                     </div>
                                     <h5 className="d-block pb-3 pt-4"><b>Redirecting to your bank...</b></h5>
                                     <div className="row">
                                        <div className="col-sm-12 d-flex justify-content-center">
                                            <div className="col-sm-12">
                                                <ul className="list_styled1">
                                                    <li>
                                                        <img src={asset+'images/bank.svg'} alt="" /><span>Enter NetBanking Credentials</span>
                                                    </li>
                                                    <li>
                                                        <img src={asset+'images/receiptdoc.svg'} alt="" /><span>Select Bank Statement Date </span> 
                                                    </li>
                                                    <li>
                                                    
                                                        <img src={asset+'images/img_right.svg'} alt="" /><span>Get your approved limit</span>  

                                                        {/* <img src={asset+'images/img_right.svg'} alt="" /><span>Voila! We show your approved limit! </span>                       */}

                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                     </div>
                                     
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

export default connect(mapSTP)(BankScreen6)