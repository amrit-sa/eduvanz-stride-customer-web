import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import { updatePreviousPath } from "../../actions/auth";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class KycScreen9 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }

    nextPage = () =>{
        this.props.history.push("/ed_doc_profile")
    }

    componentDidMount()
    {
        const { user, dispatch, sfid } = this.props
        if(!sfid)
        {
            const path = window.location.pathname;
            dispatch(updatePreviousPath(path));
            this.props.history.push('/login');
        }
    }


    render() {
        const { history } = this.props
      
        return (
            <>
            <Helmet>
     <title>Kyc Screen 9</title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     
     <section className="kyc_pages">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="kyc_leftbar login-bg">

     {/* <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/home">Back</Link></li>
      </ul>
     </div> */}
     <LogoSideBar sideTitle="Back" backLink='' historyGoBack=""  />
     
     <ul className="kyc_timeline p-0 mt-1">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing"> Verification <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline pl-0">
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_profile')} className="active">Photograph</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_digilocker')} >Identity Card</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_pan')} >PAN Card</li>
        </ul>
     </li>
     <li>AutoPay <span className="sheading">Set up AutoPay & your account is automatically debited on due date</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
     </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
              <div className="form_width_1 ext10">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src={asset+"images/icons/icon_camera.svg"} /> Click a Selfie!</h4>
                <ul className="horizontal_list">
                    <li>100% safe </li>
                    {/* <li>Not shared with anyone</li> */}
                    <li>Your information is not shared with anyone</li>
                    {/* <li>Picture is not blurred</li> */}
                </ul>
                <form  className="otpform otpform-others fullwidth" >
                <div className="form_spacing d-flex flex-col-m mn_height_4">
                    <p className="type_1 text-center mb-4">For a selfie to get approved,Please make sure</p>
                    <div className="row justify-content-center mb-2">
                        <div className="col-md-4">
                            <div className="img_boxed">
                                <div className="img_validate">
                                    <img src={asset+"images/img_blurred.png"} />
                                </div>
                                <p>Picture is not blurred</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                        <div className="img_boxed">
                                <div className="img_validate">
                            <img src={asset+"images/img_masked.png"} />
                            </div>
                                <p>Remove mask, glasses, cap, etc</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                        <div className="img_boxed">
                                <div className="img_validate itsvalid">
                            <img src={asset+"images/img_original.png"} />
                            </div>
                                <p>Clear with good background light</p>
                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-center'> 
                        <button onClick={this.nextPage} type="button" style={{marginTop: '5px'}} disabled="" className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
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

function mapStateToProps(state) {
    const { user, sfid } = state.auth;
    return {
        sfid,
        user
    };
}

export default connect(mapStateToProps)(KycScreen9)