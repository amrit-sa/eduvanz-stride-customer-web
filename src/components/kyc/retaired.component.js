import React, { Component } from "react";
import PropTypes from 'prop-types';
import { asset } from "../../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import { Link } from 'react-router-dom';
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

class Retaired extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      successful: false,
      isDisabled: true,
      mincome: '',
    };
  }

  componentDidMount() {
    const { monthlyIncome } = this.props
    this.setState({ mincome: monthlyIncome });
  }

  handleChange = (e) => {
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
    // this.setState(
    //   {[e.target.name]: e.target.value}
    // );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { incomeUpdate, incomeSource, user, sfid } = this.props;
    let data = {
      user_sfid: sfid,
      amount: parseFloat(this.state.mincome),
      source: incomeSource
    }
    incomeUpdate(data);
  }

  redirPage = (url) => {
    this.props.redirectPage(url);
  }

  render() {
    let breadCrumpPosts = [
      { title: 'KYC', url: '' },
      { title: 'Basic Details', url: '' }
    ];
    const { message, userMessage, isSuccess } = this.props;
    const { mincome } = this.state
    const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
    return (
      <>
        <section className="kyc_pages">
          <div className="container-zero">
            <div className="flex-w flex-tr">

              <div className="kyc_leftbar login-bg">

                {/* <h4 onClick={() => this.redirPage('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
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
                    <h4 className="text-center" style={{ width: "500px" }}>
                      <img className="flimg pr-2" src={asset + "images/icons/incom_logo.png"} height="30px" /> Enter Your Income Details
                    </h4>
                    <h6>Retired <img className="float-right" src={asset + "images/icons/icon_Retired.png"} /></h6>
                    <form onSubmit={this.handleSubmit} className="otpform otpform-others fullwidth" >
                      <div className="form_spacing mn_height_1 mt-4">
                        <div className="form-group">
                          <span className="has-float-label">
                            <input
                              onChange={this.handleChange}
                              className="rupeeprefix"
                              id="mincome"
                              name="mincome"
                              // type="number" 
                              value={mincome ? mincome : ''}
                              placeholder=" "
                            />
                            <label htmlFor="mincome">Monthly Pension</label>
                          </span>
                        </div>
                      </div>
                      <div className="form_spacing">
                        <button
                          type="submit"
                          disabled={this.state.mincome ? false : true}
                          className={"flex-c-m stext-101 cl0 size-121 bor1 p-lr-15  mb-3"}
                          style={this.state.mincome ? styles : {}}
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

Retaired.propTypes = {
  ...propTypes,
  incomeUpdate: PropTypes.func.isRequired,
  redirectPage: PropTypes.func.isRequired,
  incomeSource: PropTypes.string.isRequired,
  user: PropTypes.number.isRequired,
  sfid: PropTypes.string.isRequired,
  monthlyIncome: PropTypes.any,
  userMessage: PropTypes.string,
  isSuccess: PropTypes.number
}

export default reduxForm({ form: 'retaired' })(Retaired);
