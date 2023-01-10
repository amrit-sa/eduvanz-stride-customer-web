import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class BankScreen4 extends Component {

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
                <title>Bank Screen 4</title>
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
                        <h4 className="bg-2 text-center imgaligned">Consent Request </h4>
                        <ul className="horizontal_list type_2 small">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                        <form  className="otpform otpform-others fullwidth" >
                        <div className="col-md-12">
                            <div className="form_spacing pt-3 pb-60 d-flex flex-col-m mn_height_3">
                            <div className=" boxstyle_2 d-block text-center">
                                <h5 className="d-block pb-3"><b>Consent Request</b></h5>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="banx_box type_1 bor_1">
                                            <div className="mh-1 d-flex justify-content-center align-items-center">
                                            <img src={asset+'images/bank2.png'} alt="" />
                                            </div>
                                            <h3>.....46587</h3>
                                            <p>Savings Account</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                        <ul className="list-group bor_1 cstyle_1">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <strong><img src={asset+'images/Purpose.svg'} alt="" /> Purpose </strong>                      
                                                <span>Aggregator Statement <a href="#" data-toggle="tooltip" data-placement="top" title="How long is the lender allowed to store data?

"><img src={asset+'images/i_icon.svg'} alt="" /></a></span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <strong><img src={asset+'images/Datarange.svg'} alt="" /> Data Requested </strong> 
                                                <span>Transaction, Balance, Profile <a href="#" data-toggle="tooltip" data-placement="top" title="How long consumer is allowed to store data
"><img src={asset+'images/i_icon.svg'} alt="" /></a></span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <strong><img src={asset+'images/Datarequested.svg'} alt="" /> Consent Validity</strong> 
                                                <span>23/12/2021 - 29/12/2022 <a href="#" data-toggle="tooltip" data-placement="top" title="How long consumer is allowed to store data
"><img src={asset+'images/i_icon.svg'} alt="" /></a></span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                <strong><img src={asset+'images/ConsentValidity.svg'} alt="" /> Data Range </strong>                      
                                               <span> 23/12/2021 - 29/12/2022 <a href="#" data-toggle="tooltip" data-placement="top" title="How long consumer is allowed to store data
"><img src={asset+'images/i_icon.svg'} alt="" /></a></span>
                                            </li>
                                            </ul>
                                        </div>
                                       
                                     </div>
                                     <div className='row justify-content-center'> 
                                        <button onClick={this.nextPage} type="button" disabled="" className="bg_dark cl0 size-121 bor1 p-lr-15 mt-2 btn-mw-300">Continue</button>
                                     </div>
                                     <p className="pos_bottom"><span className="d-block img_valign1"><strong>Eduvanz |</strong> Powered by <img src={asset+'images/onemoney.png'} alt="" /></span></p>
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

export default connect(mapSTP)(BankScreen4)