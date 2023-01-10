import React, { Component } from "react";
import PropTypes from 'prop-types';
import { asset } from "../../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router-dom';
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

class SelfEmployed extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      successful: false,
      isDisabled: true,
      mincome: '',
      cname: '',
      waddress: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
    // this.setState(
    //   {[e.target.name]: e.target.value}
    // );
  }
  handleCompany = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // this.setState(
    //   {[e.target.name]: e.target.value}
    // );
  }

  handleMontlyIncome = (e) => {
    var pattern = new RegExp(/^(?!(0))\d+$/);
    if (e.target.value !== '') {
      if (!pattern.test(e.target.value)) {
        // this.setState({ [e.target.name]: "" });
      } else {
        this.setState({ [e.target.name]: e.target.value });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  componentDidMount() {
    if (this.props.companyName) {
      this.setState({ cname: this.props.companyName })
    }
    if (this.props.monthlyIncome) {
      this.setState({ mincome: this.props.monthlyIncome })
    }
    if (this.props.workAddress) {
      this.setState({ waddress: this.props.workAddress })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { incomeUpdate, incomeSource, sub_source, user, sfid } = this.props;
    let data = {
      user_sfid: sfid,
      amount: parseFloat(this.state.mincome),
      compant_name: this.state.cname,
      work_address: this.state.waddress,
      isProfessional: parseInt(sub_source),
      source: incomeSource
    }
    incomeUpdate(data);
  }

  redirPage = (url) => {
    this.props.redirectPage(url);
  }

  render() {
    const { sub_source, userMessage, isSuccess } = this.props;
    // console.log('chckkkkkk',this.props.incomeUpdate,this.props.incomeSource,this.props.sub_source,this.props.companyName,this.props.monthlyIncome,this.props.workAddress,this.props.redirectPage)
    const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    let breadCrumpPosts = [
      { title: 'KYC', url: '' },
      { title: 'Basic Details', url: '' }
    ];
    return (
      <>
        <section className="kyc_pages">
          <div className="container-zero">
            <div className="flex-w flex-tr">
              <div className="kyc_leftbar bg-1 login-bg">

                {/* <h4 onClick={() => this.redirPage('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_salary">Back</Link></li>
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div> */}

                <LogoSideBar sideTitle="Back" backLink='/ed_salary' historyGoBack="" breadCrumpPosts={breadCrumpPosts} />
                {/* <div className="navigations">
      <ul className="breadcrumps">
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div>  */}

                <h1 className="titfnt">
                  <span className="d-block">Basic</span> Details
                </h1>
                <ul className="left_tabs">
                  <li className="bgmoney active"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></li>
                  <li className="bghome"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></li>
                </ul>
              </div>
              <div className="kyc_rightbar flex-col-m justify-content-center">
                <div className="form_width_1">
                  <div className="tab_highlighter">
                    <span className="cl1"></span>
                    <span></span>
                  </div>
                  <div className="form_details">
                    <h4 className="text-center" style={{ width: '500px' }}>
                      <img className="flimg pr-2" src={asset + "images/icons/incom_logo.png"} height="30px" /> Enter Your Income Details
                    </h4>
                    <h6>Self employed <img className="float-right" src={asset + "images/icons/btn_Salaried.png"} /><span>{sub_source == "Self-Employed-Professional" ? "Professional" : "Non-professional"}</span></h6>

                    <form onSubmit={this.handleSubmit} className="otpform otpform-others fullwidth" >
                      <div className="form_spacing mn_height_1 mt-4">
                        <div className="form-group">
                          <span className="has-float-label">
                            <input onChange={this.handleMontlyIncome} className="rupeeprefix" id="mincome" name="mincome" type="text" placeholder=" " value={this.state.mincome} />
                            <label htmlFor="mincome">Monthly Income</label>
                          </span>
                        </div>
                        <div className="form-group">
                          <span className="has-float-label">
                            <input onChange={this.handleCompany} id="cname" name="cname" type="text" placeholder=" " value={this.state.cname} />
                            <label htmlFor="cname">Organization/ Company Name </label>
                          </span>
                        </div>
                        <div className="form-group">
                          <span className="has-float-label">
                            <input onChange={this.handleCompany} id="waddress" name="waddress" type="text" placeholder=" " value={this.state.waddress} />
                            <label htmlFor="waddress">Address<span style={{ position: "absolute", left: '230px', opacity: "0.6" }}>Optional</span></label>
                          </span>
                        </div>
                      </div>
                      <div className="form_spacing">
                        <button
                          type="submit"
                          disabled={this.state.cname !== '' && this.state.mincome !== '' && this.state.waddress !== '' ? false : true}
                          className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15  mb-3"}
                          style={this.state.cname !== '' && this.state.mincome !== '' && this.state.waddress !== '' ? styles : {}}
                        >
                          Continue
                        </button>
                        {
                          userMessage != '' && isSuccess == 0 ? (
                            <div className="form-group">
                              <div className="alert alert-danger" role="alert">
                                {userMessage}
                              </div>
                            </div>
                          ) : ''
                        }
                        {
                          userMessage != '' && isSuccess == 1 ? (
                            <div className="form-group">
                              <div className="alert alert-success" role="alert">
                                {userMessage}
                              </div>
                            </div>
                          ) : ''
                        }
                        <p className="text-center">
                          <Link to="/ed_salary" className="blue_link">Not Salaried?</Link>
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
    );
  }
}

SelfEmployed.propTypes = {
  ...propTypes,
  incomeUpdate: PropTypes.func.isRequired,
  incomeSource: PropTypes.string.isRequired,
  sub_source: PropTypes.any.isRequired,
  redirectPage: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  sfid: PropTypes.string.isRequired,
  userMessage: PropTypes.string,
  isSuccess: PropTypes.number
}

export default reduxForm({ form: 'self' })(SelfEmployed);
