import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';

import { getAccountProfile, getProfileById } from "../actions/user";


class CreditScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sfid: "",
            modal: 0,
            profile: {}
        };
    }


    refresh_cibil_score() {
        const { profile } = this.props;
        let max = profile.profile.bureau_score__c;



        let element = document.getElementById("credit-range");
        let cibil = document.getElementById("cibil_score");
        let i = 300;
        let id = setInterval(() => {
            element.value = i;
            cibil.textContent = i;
            if (i == max) {
                console.log("break")
                clearInterval(id)
            }
            i++;
        }, 0.5)

    }
    componentDidMount() {







        console.log('herere')
        if (Object.keys(this.state.profile).length == 0) {
            const { sfid, userId } = this.props;
            let obj = {
                "user_sfid": sfid
            }
            this.props.dispatch(getProfileById(obj)).then((response) => {

                this.setState({ profile: response });
                console.log(response)
            });
        }


    }


    async componentDidUpdate(prevProps, getSnapshotBeforeUpdate) {

        const { profile } = this.props;
        if (profile && profile.profile.bureau_score__c) {
            this.refresh_cibil_score();
        }





    }





    closeModal = () => {
        document.getElementById('modal-close').click()
    }

    render() {
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const { sfid, history, isSearching, userId, user, username, isLoading, dispatch, profile } = this.props

        return (
            <>
                <Helmet>
                    <title>Credit Score</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}

                <div className="inner-page">
                    <div className="container">
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper pt-3'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="/dashboard">Store</a></li>
                                        <li><a href="/setting">Setting</a></li>
                                        <li><a href="javascript:void(0);">Account</a></li>
                                    </ul>
                                </div>
                            </div>




                            <div className='container'>
                                {/* <div className='row'> */}
                                <div className=' row credit-score-card p-4 ml-0 mr-0'>

                                    <div className="col-6 text-center d-flex flex-column justify-content-between" >

                                        {/* <p className="text-center d-flex flex-column justify-content-around" > */}
                                        <div>
                                            <span className='d-block font-weight-bold'><h1 id="cibil_score">{profile && profile.profile.bureau_score__c ? profile.profile.bureau_score__c : 300}</h1></span>
                                            <i className='fa fa-caret-up text-success ml-2 display-6'></i>
                                            <i className='fa fa-caret-down text-gray display-6'></i>
                                        </div>
                                        <div>
                                            <span className="d-flex  justify-content-center" >

                                                <input type='range'
                                                    value={profile && profile.profile.bureau_score__c ? profile.profile.bureau_score__c : 300} min='300' max='900'
                                                    id="credit-range" className="credit-range" style={{ width: "50%" }} />
                                            </span>
                                            <span className="d-flex pt-0 justify-content-center align-items-center " style={{ gap: "4rem" }}>
                                                <span>
                                                    300
                                                </span>
                                                <img src="images\icons\Experian_Logo.png" style={{width:"8rem"}}></img>
                                                <span>   900</span>
                                            </span>
                                        </div>
                                        <h5>Last updated on 08 Aug 2022</h5>

                                        {/* </p> */}

                                    </div>
                                    <div className="col-6 d-flex flex-column justify-content-between" >

                                        <h2>Your Score is <span className="text-success">Excellent</span></h2>
                                        <h6>Curiosity improves Credit score! Gain more insights on what works and secure your Financial Health.</h6>
                                        <button
                                            className="btn btn-light "
                                            style={{ width: "fit-content" }}
                                            onClick={() => { this.refresh_cibil_score() }}
                                        ><i class="fa fa-refresh"> Refresh for free</i>

                                        </button>
                                    </div>





                                </div>
                            </div>


                            <div className="col-12  p-4 mt-4 d-flex ">
                                <div className="col-lg-5 col-md-12 d-inline-block credit-sub-card">
                                    <div className="container">
                                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                            <span>
                                                <h4>Your Credit Activity</h4>
                                                <p>Across 11 credit lines</p>
                                            </span>
                                            <span>
                                                <a>See More</a>
                                            </span>
                                        </div>

                                        {
                                            profile && profile.creditActivity.map((item, index) => {
                                                return (

                                                    <div className="d-flex list_banks cursor-point" style={{ justifyContent: "space-between" }} data-toggle="modal" data-target="#addressmodal" onClick={() => this.setState({ modal: 1 })}>


                                                        <div>
                                                            <div className="d-flex d-flex align-items-center">

                                                                <span className="bank_icon" >


                                                                    {/* {item.bank_image__c} */}
                                                                    <img src={item.bank_image__c}
                                                                        height="25" width="25" />
                                                                </span>
                                                                <span>
                                                                    <span className="pr_t">{item.bank_name__c}</span> <br />
                                                                    <span className="sd_h">{item.loan_type__c} </span>
                                                                </span>
                                                            </div>
                                                        </div>




                                                        <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >

                                                            <span className="text-end  " >
                                                                <i className="fa fa-rupee"></i><span className="pr_t">{item.loan_amount__c}</span>
                                                                <br /><span className="text-success">{item.loan_status__c} </span>
                                                            </span>
                                                            <i className="fa fa-arrow-right"></i>
                                                        </div>



                                                    </div>

                                                )

                                            })
                                        }





                                    </div>
                                </div>

                                <div className="col-1 d-inline-block" ></div>
                                <div className="col-lg-6 col-md-12 d-inline-block credit-sub-card">
                                    <div className="container">
                                        <div className="">
                                            <span>
                                                <h4>Key Factors</h4>
                                                <p>Affecting your score</p>
                                            </span>

                                        </div>


                                        {
                                            profile && profile.keyFactors.map((item, index) => {
                                                return (

                                                    <div className="d-flex list_banks justify-content-between cursor-point" data-toggle="modal" data-target="#addressmodal" onClick={() => this.setState({ modal: 2 })}>


                                                        <div>
                                                            <div className="d-flex d-flex align-items-center">

                                                                <span className="bank_icon bank_icon2" >

                                                                    {/* <img src="https://p.kindpng.com/picc/s/284-2843275_online-donation-shri-ramakrishna-ashrama-rajkot-using-hdfc.png"
                                                                        height="25" width="25" /> */}
                                                                    {/* <i class="fa fa-credit-card" aria-hidden="true"></i> */}
                                                                    {/* <img src="images/icons/time_Icon.png" alt="" className="img-fluid" /> */}
                                                                </span>
                                                                <span>
                                                                    {/* <i className="fa fa-plus"></i> */}
                                                                    <span className="pr_t">{item.title}</span> <br />
                                                                    <span className="sd_h">Impact</span>{item.impact}
                                                                </span>
                                                            </div>
                                                        </div>


                                                        <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >

                                                            <span className="text-end  " >
                                                                <i className="fa fa-rupee"></i><span className="pr_t">{item.stats}%</span>
                                                                <br />
                                                                {item.status == 'Good' ?
                                                                    <span className="text-success">{item.status} </span> :
                                                                    <span className="text-danger">{item.status} </span>
                                                                }
                                                            </span>
                                                            <i className="fa fa-arrow-right"></i>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }




                                    </div>

                                </div>

                            </div>

                            <div className="col-12  p-3 mt-4 mb-4 rounded-3" style={{ backgroundColor: "#F7FCFE" }}>
                                <h5 ><span className="font-weight-semibold">Note: </span> It takes up to 4 months before data of your latest credit score activity is accounted by the credit bureau.</h5>
                            </div>
                        </div>
                    </div>
                </div>








                {/* //////////////////////////////////////////////////////////////////////////////////// */}






                <div className="modal right fade" id="addressmodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content " style={{ width: '33rem' }}>


                            {this.state.modal == 2 ?
                                <div className="for_key_factor">
                                    <div className="modal-header">
                                        <span>
                                            <span className="pr_t fs-4" style={{ fontWeight: "500" }}>On time Payments</span> <br />
                                            <span className="sd_h">High Impact</span>
                                        </span>

                                        <button type="button" className="close"
                                            data-dismiss="modal"
                                            id={'modal-close'}
                                            aria-label="Close">
                                            <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                        </button>


                                    </div>

                                    <div className="modal-body" >

                                        <div className="content row container mr-0 ml-0 p-3 mb-4">
                                            <div className="d-flex gap-2">

                                                <div class="rounded-3 border border-1 p-3">
                                                    <h5 class="text-secondary">On-time payments</h5>
                                                    <h4>85</h4>
                                                </div>

                                                <div class="rounded-3 border border-1 p-3">
                                                    <h5 class="text-secondary">On-time payments</h5>
                                                    <h4>85</h4>
                                                </div>
                                            </div>

                                            {profile && profile.creditActivity.map((item, index) =>

                                                <div className="d-flex list_banks justify-content-between mt-4" >

                                                    <div>
                                                        <div className="d-flex d-flex align-items-center">

                                                            <span className="bank_icon" >

                                                                <img src={item.bank_image__c}
                                                                    height="25" width="25" />
                                                                {/* {item.bank_image__c} */}
                                                            </span>
                                                            <span>
                                                                <span className="pr_t">{item.bank_name__c}</span> <br />
                                                                <span className="sd_h">{item.loan_type__c}</span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                        <span className="text-end  " >
                                                            <i className="fa fa-rupee"></i><span className="pr_t">{item.loan_amount__c}</span>
                                                            <br /><span className="text-success">{item.loan_status__c} </span>
                                                        </span>
                                                        <i className="fa fa-arrow-right"></i>
                                                    </div>

                                                </div>

                                            )}


                                        </div>


                                        <div className="col-12  p-3 mt-4 mb-4 rounded-3" style={{ backgroundColor: "#E8F7FF" }}>
                                            <div className="col-8">

                                                <h3 className="font-weight-semibold">What is payment history?</h3>
                                                <h6>It takes up to 4 months before data of your latest credit score activity is accounted by the credit bureau.</h6>
                                            </div>
                                            <div className="col-4 crep_img">

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                :


                                <div className="for_credit_activity">
                                    <div className="modal-header">
                                        <h4>Credit Activity</h4>

                                        <button type="button" className="close"
                                            data-dismiss="modal"
                                            id={'modal-close'}
                                            aria-label="Close">
                                            <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                        </button>

                                    </div>

                                    <div className="modal-body" >

                                        <div className="content row container mr-0 ml-0">


                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <div>
                                                    <div className="d-flex d-flex align-items-center">

                                                        <span className="bank_icon" >

                                                            <img src="https://p.kindpng.com/picc/s/284-2843275_online-donation-shri-ramakrishna-ashrama-rajkot-using-hdfc.png"
                                                                height="25" width="25" />
                                                            {/* {item.bank_image__c} */}
                                                        </span>
                                                        <span>
                                                            <span className="pr_t">HDFC Bank</span> <br />
                                                            <span className="sd_h">Auto Loan </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >

                                                    <span className="text-end  " >
                                                        <span className=" pr_t text-success">Active </span>
                                                    </span>
                                                </div>



                                            </div>

                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <span>

                                                    <span className="pr_t fw-normal">Amount to be paid</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t"> 2,00,000</span>
                                                </span>

                                                <span className="text-end">

                                                    <span className="pr_t fw-normal">Sanctioned Amount</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t text-end"> 2,00,000</span>
                                                </span>


                                            </div>



                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <span>

                                                    <span className="pr_t fw-normal">Issued on</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t"> 2,00,000</span>
                                                </span>

                                                <span className="text-end">

                                                    <span className="pr_t fw-normal">Loan Tenure</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t text-end">NA</span>
                                                </span>


                                            </div>


                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <span>

                                                    <span className="pr_t ">Payment History</span> <br />
                                                    <span className="pr_t fw-normal">Last 3 Years</span>
                                                </span>

                                                <span className="text-end d-flex align-items-center">


                                                    <span className="badge badge-pill badge-success p-2 fs-6 fw-lighter">100% Online</span>

                                                </span>


                                            </div>


                                            <div className="list_banks justify-content-between" >
                                                <div>
                                                    <table style={{ width: "100%" }}>
                                                        <thead>

                                                            <tr>
                                                                <td></td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td>{m}</td>
                                                                    })
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>2020</td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td><div className="blank_data"></div></td>
                                                                    })
                                                                }
                                                            </tr>

                                                            <tr>
                                                                <td>2021</td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td><div className="blank_data"></div></td>
                                                                    })
                                                                }
                                                            </tr>

                                                            <tr>
                                                                <td>2022</td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td><div className="blank_data"></div></td>
                                                                    })
                                                                }
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="d-flex gap-4 mt-2">
                                                    <span className="d-flex align-items-center gap-1"><div className="blank_data bg-success"></div><span>Online Payment</span></span>

                                                    <span className="d-flex align-items-center gap-1"><div className="blank_data bg-warning"></div><span>Delayed</span></span>

                                                    <span className="d-flex align-items-center gap-1"><div className="blank_data bg-danger"></div><span>Overdue</span></span>
                                                </div>
                                            </div>







                                        </div>

                                        <div style={{ position: "relative", bottom: "0px" }}>
                                            <p>
                                                Amount to be paid, sanctioned amount, issued on, loan tenure are unavailable as the credit bureau was unable to retrieve the details from your bank.
                                            </p>
                                            <a href="#">Report an issue</a>
                                        </div>

                                    </div>
                                </div>

                            }







                        </div>
                    </div>
                </div>
            </>
        );
    }

}
function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, searchHistory } = state.product
    const { profile, userAddress, userId } = state.user;
    const { on_time_payments } = state.payment;

    return {
        searchHistory,
        isSearching,
        isLoading,
        searchDet,

        profile,
        username,
        user,
        sfid,
        userId,
        on_time_payments

    };
}

export default connect(mapStateToProps)(CreditScore);
