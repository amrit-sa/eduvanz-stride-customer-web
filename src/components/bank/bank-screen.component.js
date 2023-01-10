import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import { openUploadModel } from "../../actions/model" 

class BankScreen extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }

    openModel = () =>{
        this.props.dispatch(openUploadModel());
    }


    render() {
      
        return (
            <>
            <Helmet>
                <title>Bank Screen 1</title>
            </Helmet>
     
            <section className="kyc_pages bank_page">
                <div className="container-zero">
                <div className="flex-w flex-tr">
                     <div className="kyc_leftbar bg-3">
                    {/* <div className='size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md login-bg'> */}

                        <h4 className="mtext-105">eduvanz</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div>
                        <h4 className="mtext-105 cl6">Bank Statement</h4>
                        
                    </div>
                    <div className="kyc_rightbar flex-w justify-content-center">
                    <div className="form_width_1 ext10">
                    <ul className="horizontal_list border-0 type_2">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                    <div className="form_details">
                        <h4 className="bg-2 text-center imgaligned">Link Bank account </h4>
                        <form  className="otpform otpform-others fullwidth" >
                        <div className="col-md-12">
                            <div className="form_spacing d-flex flex-col-m pt-2 pb-2 mn_height_5 pos_pb">
                            <div className="d-block text-center">
                                <p><span className="d-block ctext_1">We found these accounts linked to your number</span></p>
                                    <div className="row justify-content-center">
                                        <div className="col-sm-4">
                                            <div className="banx_box">
                                            <div className="mh-1 d-flex justify-content-center align-items-center">
                                            <img src={asset+'images/bank1.png'} alt="" />
                                            </div>
                                            <h3>.....46587</h3>
                                            <p>Savings Account</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="banx_box">
                                            <div className="mh-1 d-flex justify-content-center align-items-center">
                                            <img src={asset+'images/bank2.png'} alt="" />
                                            </div>
                                            <h3>.....46587</h3>
                                            <p>Savings Account</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                        <div className="banx_box">
                                        <div className="mh-1 d-flex justify-content-center align-items-center">
                                            <img src={asset+'images/bank3.png'}  alt="" />
                                            </div>
                                            <h3>.....46587</h3>
                                            <p>Savings Account</p>
                                            </div>
                                        </div>

                                     </div>
                                     <p><span className="d-block mt-4 mb-3">Can’t find your bank account? <a className="boldblue" style={{cursor:'pointer'}} href={void(0)} onClick={this.openModel} >Upload manually</a></span></p>
                                     <p className="pos_bottom"><span className="d-block img_valign1"><strong>eduvanz |</strong> Powered by <img src={asset+'images/onemoney.png'} alt="" /></span></p>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="pos_abs">
                                <ul className="text_icons">
                                <li><Link to="" className="getappsty">
                                    Get our App <img src={asset+"images/icons/app-icon.png"} />
                                </Link>
                                </li>
                                <li>
                                <Link to="" className="getappsty">
                                    Help <img src={asset+"images/icons/qustionmark.png"} />
                                </Link>
                            </li>
                            </ul>                      
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

export default connect(mapSTP)(BankScreen)