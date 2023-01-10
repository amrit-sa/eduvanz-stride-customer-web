import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { asset } from "../../common/assets";
import { getBanks, updateBank } from "../../actions/user";
import GetOurApp from '../../common/get-our-app';
import LogoSideBar from '../../common/logo-side-bar';

class ManualEnach3 extends Component {
  constructor() {
    super()
    this.state = {
        photoFile: null,
        photoUrl: null,
        selectedBank: null,
        myBank: null
    }
}

componentDidMount()
{
    const { dispatch } = this.props
    dispatch(getBanks());

    $('.label input').change(function(){
      var $this = $(this);
      if($this.val())
          $this.addClass('filled')
      else
          $this.removeClass('filled')
      })

      $('.b_c_a_tabs_conteiner .b_c_a_tabs_content').hide();
      $(".b_c_a_tabs_conteiner .b_c_a_tabs_content").eq(0).show()

        $('.b_c_a_tabs button').on('click', function(){
            var tab_id2 = $(this).attr('data-target');

            $('.b_c_a_tabs_content').hide();

            console.log($("#"+ tab_id2));
            $(this).addClass('active');
            $(this).parent().siblings().find('button').removeClass('active');
            $("#" + tab_id2).show();
        })
}

brandChange = (e) =>{
    this.setState({selectedBank: e.value, myBank: {name: e.value, icon:e.img }});
}

handlebank = (name, icon) =>{
    this.setState({selectedBank: name, myBank:{name: name, icon: icon }});
}

handleContinue = () =>{
    const { dispatch, history } = this.props
    dispatch(updateBank(this.state.myBank));
    history.push("/bank_screen14");
}

render() {

  const { banks } = this.props
  let bankOptions = [];
  let bankData;
  if(banks)
  {
      bankData = banks.slice(0,6);
      for(var i = 0; i < banks.length; i++){
          bankOptions.push({ value: banks[i].bank_name, label: banks[i].bank_name, img: banks[i].bank_icon });
      }
  }
   
    return (
          <>
          <Helmet>
              <title>Enach </title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        <section className='bg-light'>
                    <div className='container-fluid'>
                        <div className='row justify-content-center'>
                        <div className='col-sm-3 bg-enach px-lg-5'>
                            {/* <h4 onClick={ () => this.props.history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
                            <div className="navigations">
                                <ul className="breadcrumps">
                                    <li className="b_back"><Link to="/ed_doc_others">Back</Link></li>
                                </ul>
                            </div> */}

                              <LogoSideBar sideTitle="Back" backLink='/ed_doc_others' historyGoBack="" history={this.props.history} /> 

                            <ul className="kyc_timeline">
                                <li className="complete">Registration</li>
                                <li className="complete">Limit Approval</li>
                                <li className="complete">Identity Verifcation</li>
                                <li className="has_child ongoing">AutoPay
                                <span className="sheading">Set up AutoPay & your account is automatically debited on due date </span>
                                <ul className="sub_timeline">
                                    <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_doc_profile')} className="active">Bank Account</li>
                                    <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('/ed_digilocker')} >NACH</li>
                                </ul>
                                </li>
                                <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
                            </ul>
                        </div>
                            <div className='col-sm-9 mt-5 px-lg-6 py-lg-3 pb-lg-5'>
                                <div className='w-100 mb-5 c_p_m_b pb-4'>
                                  <div className='form_header px-3 py-4'>
                                      <h4 className='text-center m-0 form_header_h4'>AutoPay</h4>
                                  </div>
                                  <hr/>
                                  <div className='row justify-content-center py-4'>
                                    <div className='col-sm-10'>
                                    <div className='bank_d_wrap  mb-5'>
                                        <div className='row align-items-center'>
                                          <div className='col-lg-4 border-right text-center'>
                                            <span className='bank_d font-weight-medium d-flex align-items-center justify-content-center'>
                                              <img src={asset+"images/bank-icon/bank-5.png"} className='mr-2' style={{"width":"30px"}}/>
                                              SBI
                                            </span>
                                          </div>
                                          <div className='col-lg-4 border-right text-center'>
                                            <span className='bank_d'>
                                            Account Number: *******9098
                                            </span>
                                            </div>
                                          <div className='col-lg-4 text-center'>
                                            <span className='bank_d'>
                                            IFSC code: SBIN000003
                                            </span>
                                            </div>
                                        </div>
                                      </div>


                                      <div className='text-center'>
                                        <h4 className='font-weight-medium mb-5'>Hour glass</h4>
                                        <h4 className='font-weight-medium'>Wait for 24 hours to retry</h4>
                                        <p className='mb-5'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                                        <p className='text-center'>Sure about your bank details? <Link to="" className='link'>Try Manually</Link></p>
                                      </div>

                                      <div className='text-center'>
                                            <img src={asset+"images/icons/cup.png"} className='mb-4'/>
                                            <h4 className='font-weight-medium mb-4'>Try again</h4>
                                            <p className='mb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                                            <button type="button" className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Retry Now</button>
                                      </div>

                                      <div className='text-center'>
                                            <img src={asset+"images/icons/filter__.png"} className='mb-4'/>
                                            <h4 className='font-weight-medium mb-4'>Try again</h4>
                                            <p className='mb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                                            <button type="button" className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Retry Now</button>
                                      </div>


                                     

                                      <div className='top_btn_wrap  mb-5'>
                                        <p className='text-center'>After clicking on continue:</p>
                                        <div className='row mb-5'>
                                          <div className='col-lg-4'>
                                            <button className='top_btn clr1'><span>01</span>Download the physical NACH form <img src={asset+"images/icons/cv01.png"} className='mr-3'/></button></div>
                                          <div className='col-lg-4'><button className='top_btn clr2'><span>02</span> Fill and sign the printed copy of the form <img src={asset+"images/icons/cv02.png"} className='mr-3'/></button></div>
                                          <div className='col-lg-4'><button className='top_btn clr3'><span>03</span> Scan the signed copy and upload the file here <img src={asset+"images/icons/cv03.png"} className='mr-3'/></button></div>
                                        </div>

                                        

                                        <div className='row justify-content-center'>
                                          <div className='col-3'>
                                            <button className='download_'><span></span>Download again</button></div>
                                          <div className='col-3'>
                                          <div className='file_uploda'>
                                            <input type="file"/>
                                            <span></span>Upload Form
                                          </div>
                                          </div>
                                        </div>

                                        
                                      </div>


                                      <div className='uploading_row mb-3 d-flex'>
                                           <div className="left">
                                                <div className='upload_progress_wrapper'>
                                                    <div className='upload_progress' style={{"width":"%"}}>
                                                        <h5 className='m-0 mb-2'>Uploading</h5>
                                                        <p className='m-0 mb-2'>% 5 Second left</p>
                                                        <div className='u_p_b'></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right position-absolute">
                                                <div className='d-flex justify-content-around py-4 btn_set_last'>
                                                    <div>
                                                        <button type='button' className='pause_btn'>
                                                            <img src={asset+"images/image74.png"} alt="image74"  className='img-fluid'/>
                                                        </button>
                                                        <button className='d-none'></button>
                                                    </div>
                                                    <button type="button" className='cancel_btn'>
                                                        <img src={asset+"images/cross.png"} alt="cross"  className='img-fluid'/>
                                                    </button>
                                                </div>
                                            </div>
                                      </div>

                                        <div className='text-center mt-4'>
                                            <button type="button" disabled="disabled" className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                                        </div>
                                      </div>
                                  </div>
                                </div>

                                <div className='enach-footer p-3 pr-5 shadow'>
                              <div className='d-flex justify-content-lg-end justify-content-center'>
                                {/* <div className='d-flex align-items-center'>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Get our App <span className='ml-2'><img src={asset+"images/icons/app-icon.png"} alt="app" /></span></div>
                                    <div className="s-l" style={{"height":"27px"}}></div>
                                    <div className='mx-3 d-flex align-items-center text-nowrap'>Help <span className='help-icon ml-2'>?</span></div>
                                </div> */}
                                  <GetOurApp 
                  dispatch={this.props.dispatch}
                />
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
  const { banks } = state.user;
  const { salesForceToken, user, isLoading } = state.auth;
  return {
      salesForceToken,
      banks,
      user,
      isLoading
  };
}


export default connect(mapStateToProps) (ManualEnach3);
