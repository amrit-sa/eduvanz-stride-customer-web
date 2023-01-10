import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { asset } from "../../common/assets";
import { getDigilocker, downloadDigilocker,getAccountProfile } from "../../actions/user"
import { Modal, Button, Form } from "react-bootstrap"
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class KycScreen11 extends Component {

    constructor() {
        super()
        this.state = {
            digilocker_link: '',
            validLink: true,
        }
    }

    componentDidMount()
    {
      const {dispatch, user, salesForceToken, location} = this.props
      const query = new URLSearchParams(location.search);
      const requestId = query.get('requestId');
      if(!requestId)
      {
        let data = {
          id: user,
          token: salesForceToken
        }
        dispatch(getDigilocker(data));
      }else{
        const requestId = query.get('requestId');
        let data = {
          id: user,
          token: salesForceToken,
          requestId: requestId,
          parent_id: "00171000005MEj0AAG",
        }
        this.props.dispatch(downloadDigilocker(data)).then((response)=>{
            // if(response.status ==="success")
            // {
            //   this.props.history.push("/ed_doc_aadhar");
            // }
            if(response.status == "success")
            {
            //   this.props.history.push("/ed_doc_pan");
            // }else{
              this.props.history.push("/ed_doc_aadhar");              
            }
        });
      }
      let obj = {
        user_sfid: localStorage.getItem('sfid'),
      }
      this.props.dispatch(getAccountProfile(obj)).then((response) => {
        if (response.status === "success") {
          const getData = response.accountDet ? response.accountDet : null;
          this.setState({ accountDet: getData, isPanVerified: getData && getData.is_pan_document_verified__c ? getData.is_pan_document_verified__c : false });
        }
      });
    }

    openDigimodel = () =>{
      const { digilocker_link } = this.props;
      console.log("digilocker_link", digilocker_link);
      if(digilocker_link && digilocker_link !==undefined && digilocker_link !=null && digilocker_link !='')
      {
        window.location.href = digilocker_link;
      }else{
        this.setState({validLink: false});
      }
     // this.props.dispatch(openDigilockerModel());
    }

    openRedirectModal = () =>{
      this.setState({showModal : true},()=>{
        setTimeout(() => {
          this.setState({showModal : false},()=>{
            this.openDigimodel()
          })
        }, 5000);
        
      })
    }
    render() {
          const { isLoading, history } = this.props
      
        return (
            <>
             <Helmet>
                <title>Kyc Screen 11</title>
             </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
                ):''}
            <section className="kyc_pages">
            <div className="container-zero">
            <div className="flex-w flex-tr">
            <div className="kyc_leftbar login-bg">
       
            {/* <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_doc_profile">Back</Link></li>
      </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='/ed_doc_profile' historyGoBack=""  />
     
     <ul className="kyc_timeline p-0 mt-1">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing"> Verifcation <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline pl-1">
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_doc_profile')} className={this.state.accountDet && this.state.accountDet.is_photo_verified__c ?"complete" : "active"}>Photograph</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_digilocker')} className={this.state.accountDet && this.state.accountDet.aadhaar_verified__c ?"complete" : "active"}>Identity Card</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_doc_pan')}className={this.state.accountDet && this.state.accountDet.is_pan_document_uploaded__c ?"complete" : "active"} >PAN Card</li>
        </ul>
     </li>
     <li>AutoPay <span className="sheading">Set up AutoPay & your account is automatically debited on due date</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
            </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
            <div className="form_width_1 ext8 mb-1 mt-1">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src={asset+"images/icons/icon_briefcase.svg"} /> Identity Card </h4>
                <ul className="horizontal_list">
                <li>Your information will not be shared with anyone</li>
                </ul>
                <form  className="otpform otpform-others fullwidth" >
                <div className="d-flex flex-col-m mn_height_4">
                  <div className="row justify-content-center">
                    <div className="max-width-400">
                    <div className="row">
                    <div className="col-md-12">
                    <div className="boxed_content design_1">
                    {/* <h3>Aadhar card is linked to my mobile number</h3> */}
                    <h3>My Aadhar is linked to my mobile number</h3>

                    <p>Verify with Aadhaar linked mobile number</p>
                    <ul>
                        <li><img src={asset+"images/icons/icon_list1.svg"} /> File should be PDF,JPEG,PNG</li>
                        <li><img src={asset+"images/icons/icon_list2.svg"} /> Max file size is 5MB</li>
                    </ul>
                    {!this.state.validLink?(
                    <div className='row error-msg'>
                        {"Digilocker currently not available"}
                    </div>
                    ):""}
                    <div className="form_spacing text-center">
                    {/* onClick={this.openDigimodel} */}
                        <button type="button" onClick= {(e)=>{
                          e.preventDefault()
                          this.openRedirectModal()
                        }} className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                    </div> 
                       </div>     
                       </div>       
                </div>
                 </div>
                 </div>
                 <Modal show={this.state.showModal} >
                    
                    <form>
                    <Modal.Body>
                    
                    <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content">
                                
                            <div className="col-md-12">
                    <div className="boxed_content design_1">
                    <h3>Redirecting to Digilocker...</h3>
                    <p>Verify with Aadhaar-linked mobile number</p>
                    <ul>
                        <li><img src={asset+"images/icons/icon_list1.svg"} /> Enter Aadhaar Number</li>
                        <li><img src={asset+"images/icons/icon_list2.svg"} /> Enter OTP received</li>
                        <li><img src={asset+"images/icons/icon_list2.svg"} /> Submit consent form</li>
                    </ul>
                    {!this.state.validLink?(
                    <div className='row error-msg'>
                        {"Digilocker currently not available"}
                    </div>
                    ):""}
                       </div>     
                       </div> 

                            </div>
                        </div>
                    </Modal.Body>
                    </form>
                </Modal>  
                  <p className="text-center mb-3">
                   <Link className="blue_link" to="/ed_doc_aadhar">Aadhar Not linked with mobile</Link>
                  </p>
                  <p className="text-center mb-4">
                   <Link className="blue_link" to="/ed_doc_others">Don’t have Aadhaar?</Link>
                  </p>
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
  const { salesForceToken, user, isLoading } = state.auth;
  const { message } = state.message;
  const { digilocker_link } = state.user;
  return {
      salesForceToken,
      digilocker_link,
      user,
      isLoading,
      message
  };
}

export default connect(mapStateToProps)(KycScreen11)