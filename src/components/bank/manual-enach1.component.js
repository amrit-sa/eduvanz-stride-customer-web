import React, { Component } from "react"
import $ from "jquery"
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import HeaderNew from "../../common/headerNew";
import ALlPayment_sidebar from "../ALlPayment_sidebar";
import { connect } from 'react-redux';
// import { mapStateToProps } from "../model/payment-plans";

class ManualEnach1 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    $(".loanDetailTable").hide()
    $('.ldt_toggle').on('click', function () {
      $(this).toggleClass('show')
      $(".loanDetailTable").slideToggle()
    })

    $(".loanTimeTable_wrap").hide()
    $('.ltt_toggle').on('click', function () {
      $(".loanTimeTable_wrap").slideToggle()
      $('.arrow_down').toggle();
      $('.arrow_up').toggle();
    })

    $(".transaction-block-wrap").hide()
    $('.at-dropdown').on('click', function () {
      $(".transaction-block-wrap").slideToggle()
    })
  }

  render() {
    const { sfid, history, isSearching, userId, user, username, isLoading, searchDet, favorite_count, dispatch, profile } = this.props
    return (
      <>
        <Helmet>
          <title>Product Summery </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {isLoading ? (
          <div className="loading">Loading&#8230;</div>
        ) : ''}
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
          sfid={sfid}
          favorite_count={favorite_count}
        />

        <div className='inner-page'>

          <div className='container'>
            <div className='row mb-4'>
              <div className='col'>
                <div className="d-flex align-items-center">
                  <button onClick={() => history.push('./all_payments')} className="back-btn rounded-circle mr-3"><i className="fa fa-arrow-left" aria-hidden="true" ></i></button><h4 className="mb-0">Product Summary</h4></div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xl-4 col-lg-4 paymentLeft'>
                <div className=''>
                  <p className="font-weight-medium">Summery</p>

                  <div className="bg-white transaction-block p-4 mb-4">
                    <div className="row">
                      <div className="col-8">
                        <h5>Current Due</h5>
                        <h3><i className="rupee">`</i> 30.000</h3>
                        <p>Due on June 21, 2021</p>
                      </div>
                      <div className="col-4">
                        <img src={asset + "images/dashboard/auto-pay.png"} className="img-fluid" />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center at-dropdown">
                    <h5 className="mb-3 d-flex align-items-center mb-0">All Payments
                      <i className="fa fa-angle-down h4  mb-0 ml-2" aria-hidden="true"></i></h5>
                  </div>




                  <ALlPayment_sidebar />



                </div>
              </div>


              {/*  */}
              <div className='col-xl-8 col-lg-8'>
                <div className="d-flex justify-content-between">
                  <p className="font-weight-medium">Loan Details</p>
                  <p className="font-weight-medium">Loan ID: AUTIYNB987</p>
                </div>

                <div className="bg-white loanDetailWrap p-4 mb-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="row align-items-start">
                        <div className="col-lg-5">
                          <div className="pro-img_">
                            <img src={asset + "images/laptop.png"} alt="user" className="img-fluid" />
                          </div>
                        </div>
                        <div className="col-lg-7 border-right">
                          <img src={asset + "images/icons/apple.png"} alt="user" className="img-fluid" style={{ "width": "" }} />
                          <h4>MacBook PR0</h4>
                          <p>Due on 22 Jan</p>
                          <h5 className="mb-4"><i className="rupee">`</i> 30.000</h5>

                          <span className="status-confirmed">Order Status: Confirmed</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 pl-lg-5">
                      <img src={asset + "images/dashboard/auto-pay.png"} alt="user" className="img-fluid" style={{ "width": "" }} />
                      <p className="mb-0">We will auto-debit Rs 30000 on </p>
                      <p className="font-weight-medium">Summery</p>
                      <p className="mb-4 ">5th February, 2022</p>

                      <p className="mb-0">Want to make instant payment?</p>
                      <button className="link">Pay Now Instead</button>
                    </div>
                  </div>

                  <hr></hr>

                  <div className="d-flex justify-content-between">
                    <p>Total Loan Amount: <span className="font-weight-medium"><i className="rupee">`</i>1,20,000</span></p>
                    <p className="font-weight-medium">2/12</p>
                  </div>

                  <div className="due mb-4">
                    <div className="d-flex fullbar">
                      <div className="pinkbar" style={{ "width": "30%" }}></div>
                      <div className="orangebar" style={{ "width": "40px" }}></div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <div>
                      <p className="mb-0">Amount Paid</p>
                      <p className="font-weight-medium"><i className="rupee">`</i>1,20,000</p>
                    </div>

                    <div>
                      <p className="mb-0">Overdue Amount:</p>
                      <p className="font-weight-medium"><i className="rupee">`</i>20,000</p>
                    </div>

                    <div className="text-right">
                      <p className="mb-0"><img src={asset + "images/icons/icon-ind2.png"} className="mr-2" />Outstanding Balance</p>
                      <p className="font-weight-medium"><i className="rupee">`</i>1,20,000</p>
                    </div>

                  </div>

                  <div className="d-flex justify-content-between">
                    <button className="dropdown-toggle ldt_toggle link">
                      Show Loan details
                    </button>

                    <div className="text-right">
                      <p className="mb-0">Powered by  <img src={asset + "images/fullerton_india.png"} alt="user" className="img-fluid" style={{ "width": "" }} /> </p>
                    </div>

                  </div>

                  <div className="loanDetailTable mt-4">
                    <div className="row align-items-end">
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-4 mb-lg-0 mb-3">
                            <span className="d-block">Due Today  <img src={asset + "images/icons/icon-ind2.png"} /></span>
                            <span className="font-weight-medium"><i className="rupee">`</i>30,000</span>
                          </div>
                          <div className="col-lg-4 mb-lg-0 mb-3">
                            <span className="d-block">Order date </span>
                            <span className="font-weight-medium">Dec 21, 2020</span>
                          </div>
                          <div className="col-lg-4 mb-lg-0 mb-3">
                            <span className="d-block">Interest (APR)</span>
                            <span className="font-weight-medium">9.7%</span>
                          </div>
                        </div>

                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-lg-4 mb-lg-0 mb-3">
                            <p>Loan Agreement</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <button className="font-weight-medium link">View</button>
                              <button><a href={asset + "images/Brochure-EduVanz.pdf"} target="_blank"><i className="fa fa-arrow-circle-o-down fs-5" aria-hidden="true"></i></a></button>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-lg-0 mb-3">
                            <p>Interest Certificate</p>

                            <div className="d-flex justify-content-between align-items-center">
                              <button className="font-weight-medium link">View</button>
                              <button><i className="fa fa-arrow-circle-o-down fs-5" aria-hidden="true"></i></button>
                            </div>
                          </div>
                          <div className="col-lg-4 mb-lg-0 mb-3">
                            <p>Statement of Account</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <button className="font-weight-medium link">View</button>
                              <button><i className="fa fa-arrow-circle-o-down fs-5" aria-hidden="true"></i></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>

                <p className="font-weight-medium">Loan Timeline</p>

                <div className="bg-white mb-4 p-4 loanTimeWrap">
                  <div className="row">
                    <div className="col-lg-4 text-center mb-lg-0 mb-3">
                      <div className="mb-4 d-inline-flex align-items-center">
                        <div className="mr-3">
                          <img src={asset + "images/3.png"} alt="user" className="img-fluid" style={{ "width": "" }} />
                        </div>
                        <h5 className="font-weight-medium mb-0">
                          <em>
                            Great<br />Month
                          </em>
                        </h5>
                      </div>
                      <h5>3 Months Streak</h5>
                      <p className="mb-0">In publishing and graphic design In publishing and graphic design </p>
                    </div>
                    <div className="col-lg-8">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="years d-flex align-items-center">
                          <button className="prev"><i className="fa fa-angle-left" aria-hidden="true"></i></button>
                          <span>2021</span>
                          <button className="next"><i className="fa fa-angle-right" aria-hidden="true"></i></button>
                        </div>
                        <div>
                          <ul className="list-unstyled m-0 d-flex align-items-center month-status-color">
                            <li>Paid</li>
                            <li>Upcoming</li>
                            <li>Overdue</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <ul className="d-flex flex-wrap months-wrap">
                          <li>
                            <div className="month-box paid">
                              <h2>Jan</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>Feb</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box upcoming">
                              <h2>Mar</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>Apr</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>May</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>Jun</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>Jul</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>Aug</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box paid">
                              <h2>Sep</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box disabled">
                              <h2>Oct</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box disabled">
                              <h2>Nov</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                          <li>
                            <div className="month-box disabled">
                              <h2>Dec</h2>
                              <span className="d-block position-absolute amount___"><i>`</i>20,000</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col">
                      <div className="scroll-table loanTimeTable_wrap">

                        <table className="loanTimeTable">
                          <thead>
                            <tr>
                              <th>Due Date</th>
                              <th>Description</th>
                              <th>UTR</th>
                              <th>Amount</th>
                              <th className="text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span className="font-weight-medium">25Dec</span>
                                <span className="year_ d-block">2022</span>
                              </td>
                              <td>Bank Account****9097 <img src={asset + "images/icons/rupee.png"} style={{ "width": "12px" }} /></td>
                              <td>AUM89744098</td>
                              <td><i className="rupee">`</i> <span className="font-weight-medium">30,000</span></td>
                              <td className="text-right">
                                <span className="late_pay">Late Payment</span>
                                <span className="paid_">Paid</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span className="font-weight-medium">25Dec</span>
                                <span className="year_ d-block">2022</span>
                              </td>
                              <td>Bank Account****9097 </td>
                              <td>AUM89744098</td>
                              <td><i className="rupee">`</i> <span className="font-weight-medium">30,000</span></td>
                              <td className="text-right">

                                <span className="unpaid">Unpaid</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span className="font-weight-medium">25Dec</span>
                                <span className="year_ d-block">2022</span>
                              </td>
                              <td>Bank Account****9097 </td>
                              <td>AUM89744098</td>
                              <td><i className="rupee">`</i> <span className="font-weight-medium">30,000</span></td>
                              <td className="text-right">

                                <span className="paid_">On-Time</span>
                                <span className="paid_">Paid</span>
                              </td>
                            </tr>
                          </tbody>

                        </table>
                      </div>
                      <div className="text-center">
                        <button className="ltt_toggle">
                          <i className="fa fa-angle-down h4 arrow_down" aria-hidden="true"></i>
                          <i className="fa fa-angle-up h4 arrow_up" style={{ display: "none" }} aria-hidden="true" />
                        </button>
                      </div>


                    </div>
                  </div>
                </div>

                <div className="note_ p-4 mb-4">
                  <div className="row align-items-center">
                    <div className="col-lg-9">
                      <div className="d-flex align-items-center">
                        <div className="mr-3">
                          <img src={asset + "images/bulb.png"} alt="user" className="img-fluid" style={{ "width": "" }} />
                        </div>
                        <div className="col">
                          <p className="mb-0">
                            People with low financial literacy standards are often unable to take their ideas and create assets out of them
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3">
                      <button className="link font-weight-bold">Read More</button>
                    </div>
                  </div>
                </div>







              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
  const { profile, recentProd, userAddress, userId } = state.user;
  return {
    favorite_list,
    favorite_count,
    searchHistory,
    isSearching,
    isLoading,
    searchDet,
    recentProd,
    profile,
    username,
    user,
    sfid,
    userAddress,
    userId
  };
}

export default connect(mapStateToProps)(ManualEnach1);
