import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import HeaderNew from "../../common/headerNew";
import { asset } from "../../common/assets";
import { getPlans, selectPlan, storeDownPayment, sendViewTimelineData } from "../../actions/payment";
import { getDate } from 'date-fns';

class VirtualCard3 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            loan_amount: 0,
        }
    }

    async componentDidMount() {
        // expand single
        $('.dd-open').on('click', function () {
            $(this).hide();
            $(this).parent().parent('.p-o-b').addClass('open_');
            $(this).siblings().show();
        })
        // close single
        $('.dd-close').on('click', function () {
            $(this).hide();
            $(this).parent().parent('.p-o-b').removeClass('open_');
            $(this).siblings().show();
        })
        // expand all
        $("#expandall").change(function () {
            console.log('bbbbbbbb')

            if ($(this).is(":checked")) {
                alert()
                console.log('dasdasdsad')
                $('.p-o-b').addClass("open_");
                $(".dd-close").show();
                $(".dd-open").hide();
            } else {
                console.log('aaaaaaaa')

                $('.p-o-b').removeClass("open_");
                $(".dd-close").hide();
                $(".dd-open").show();
            }
        });
        const { user, dispatch } = this.props

        // let data = {
        //     id: user,
        // }
        let getPlan_payload = {
            merchant_productid: this.props.product.merchant_productid
        }
        await dispatch(getPlans(getPlan_payload));
    }

    componentDidUpdate() {
        $('.dd-open').on('click', function () {
            console.log("Clik Open");
            $(this).hide();
            $(this).parent().parent('.p-o-b').addClass('open_');
            $(this).siblings().show();
        })
        // close single
        $('.dd-close').on('click', function () {
            $(this).hide();
            $(this).parent().parent('.p-o-b').removeClass('open_');
            $(this).siblings().show();
        })
    }

    handleSelect = (plan_id, down_payment) => {
        const { dispatch, history } = this.props
        dispatch(selectPlan(plan_id));
        dispatch(storeDownPayment(down_payment));
        this.setState({ isPlanSelected: true })
        history.push("/loanSummary");
    }

    handleExpandChange = () => {
        if ($("input[name='expandAll']").is(":checked")) {
            $('.p-o-b').addClass("open_");
            $(".dd-close").show();
            $(".dd-open").hide();
        } else {
            $('.p-o-b').removeClass("open_");
            $(".dd-close").hide();
            $(".dd-open").show();
        }
    }
    getMoratoriumDate = (duration) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        let date = new Date()
        let newDate = new Date()
        newDate.setMonth(newDate.getMonth() + Number(duration));

        let moratoriumDate = `${monthNames[date.getMonth()]} ${date.getFullYear()} to ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`
        return moratoriumDate
    }
    moratoriumDateStarts = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        let date = new Date()
        let moratoriumDate = `${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`
        return moratoriumDate
    }
    moratoriumDateEnds = (duration) => {
        const monthNames = ["Jan", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        let newDate = new Date()
        newDate.setMonth(newDate.getMonth() + Number(duration));

        let moratoriumDate = `${monthNames[newDate.getMonth()]} ${newDate.getFullYear().toString().slice(-2)}`
        return moratoriumDate
    }
    getEMIDate = (duration, emiTenure) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        let date = new Date()
        let newDate = new Date()
        newDate.setMonth(newDate.getMonth() + Number(duration) + 1);
        date.setMonth(newDate.getMonth() + Number(emiTenure));


        let moratoriumDate = `${monthNames[newDate.getMonth()]} ${newDate.getFullYear()} to ${monthNames[date.getMonth()]} ${date.getFullYear()}`
        return moratoriumDate
    }
    emiMonth = (duration, emiTenure, range) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        let date = new Date()
        let newDate = new Date()
        newDate.setMonth(newDate.getMonth() + Number(duration) + 1);
        date.setMonth(newDate.getMonth() + Number(emiTenure));
        let moratoriumDate = ''
        if (range == "Starts") {
            moratoriumDate = `${monthNames[newDate.getMonth()]} ${newDate.getFullYear().toString().slice(-2)}`
        } else {
            moratoriumDate = `${monthNames[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`
        }
        return moratoriumDate
    }
    render() {
        const { user, loan_amount, plans, sfid, storeDetails, username, isSearching, searchDet, favorite_count , product } = this.props;
        if (!sfid) {
            window.location = "/login";
        }
        this.state.loan_amount = Number(loan_amount);
        return (
            <>
                <Helmet>
                    <title>Virtual Card 3</title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                <HeaderNew
                    username={username ? username : ''}
                    user={user ? user : ''}
                    history={this.props.history}
                    isSearching={isSearching}
                    searchDet={searchDet}
                    sfid={sfid}
                    favorite_count={favorite_count}
                />

                <section className="kyc_pages bank_screen">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='d-flex align-items-center'>
                                    <button type='button' onClick={() => this.props.history.goBack()} className='back-btn rounded-circle mr-3 mr-lg-4'>
                                        back
                                    </button>
                                    <h2 className="back-btn-text m-0">Virtual Card</h2>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-12'>
                                <div className='w-100 virtual_card_process'>
                                    <div>
                                        <ul className='d-flex list-unstyled m-0 '>
                                            <li className='active'>
                                                <span><img src={storeDetails.icon} alt="apple_logo" className='img-fluid' /></span>
                                                {storeDetails.name}
                                                <button type='button' onClick={() => this.props.history.push("/virtualCard")} className='edit-btn ml-3'>Edit</button>
                                            </li>
                                            <li className='active' onClick={() => this.props.history.push('/amountLimit')}>
                                                <span><img src={asset + "images/icons/amount_icon.png"} alt="amount_icon" className='img-fluid' /></span>
                                                Enter Amount
                                            </li>
                                            <li className='active' onClick={() => this.props.history.push('/paymentPlan')}>
                                                <span><img src={asset + "images/icons/payplan_icon.png"} alt="payplan_icon" className='img-fluid' /></span>
                                                Payment plan
                                            </li>
                                            <li onClick={() => this.state.isPlanSelected ? this.props.history.push("/loanSummary") : ""}>
                                                <span><img src={asset + "images/icons/summary_icon.png"} alt="summary_icon" className='img-fluid' /></span>
                                                Summary
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='w-100 shopping_content_wrapper mt-4'>
                                    <div className='maxWidth965'>
                                        <h4 className='text-center mb-5 s_c_title'>Select Payment Plan</h4>

                                        <div className='w-100 loan-amound-info mb-4'>
                                            <div>
                                                <ul className='m-0 list-unstyled d-flex'>
                                                    <li>Loan Amount: <span><i></i>{this.state.loan_amount} </span></li>
                                                    <li>Upfront Amount:: <span><i></i>50,000 </span>
                                                        <button
                                                            className='alert-btn'
                                                            data-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <img src={asset + "images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid' />
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <h5>Your Loan Amount is greater than your Limit!</h5>
                                                            <p className='m-0'>
                                                                No worries, you can pay us the balance 50000 upfront, and check-out at Apple with the Eduvanz card for 2,00,000
                                                            </p>

                                                        </div>
                                                    </li>
                                                    <li>Total Amount:: <span><i></i>2,50,000 </span></li>
                                                </ul>

                                            </div>

                                        </div>






                                        <div className='row payment-option-list'>
                                            {plans && plans.paymentPlan && plans.paymentPlan.length > 0 && plans.paymentPlan.map((item, index) => (
                                                <div className='col-lg-4 col-md-6' key={`item-${index}`} >
                                                    <div className='p-o-b d-flex flex-column justify-content-between'>
                                                        {/* top */}
                                                        <div className='d-flex align-items-center justify-content-end p-o-b_top' onClick={() => this.handleSelect(item.id, item.down_payment__c)}>
                                                            <div>
                                                                <button className='calender rounded-circle'>
                                                                    <img src={asset + "images/icons/calendar.png"} alt="calendar" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* top */}
                                                        {/* bottom */}
                                                        <div style={{ cursor: 'pointer' }} className='p-o-b_bottom' onClick={() => this.handleSelect(item.id, item.down_payment__c)}>
                                                            <h2 className='m-txt'>{item.net_tenure__c ? item.net_tenure__c : '--'} {"Months"}</h2>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div className='pm-a'>{item.currencyisocode === 'INR' ? (<i className='d-inline-block r-s rupee'></i>) : '$'}<span>{item.disbursal_amount__c ? item.disbursal_amount__c.toLocaleString('en-IN') : '--'}</span>/Per month</div>
                                                            </div>
                                                        </div>
                                                        {/* end bottom */}
                                                        {/* middme */}
                                                        <div className='p-o-b_middle'>
                                                            <p className='p-o-txt_ mb-2' onClick={() => this.handleSelect(item.id, item.down_payment__c)}>Due today: <i></i> <span>{item.emi_amount__c ? item.emi_amount__c.toLocaleString('en-IN') : '--'}</span></p>
                                                            <p className='p-o-txt_ mb-2' onClick={() => this.handleSelect(item.id, item.down_payment__c)}>Interest ({item.fixed_rate__c ? item.fixed_rate__c : '--'}% p.a):  <i></i> <span>{item.fixed_rate__c ? ((item.fixed_rate__c / 100) * item.emi_amount__c).toFixed(2).toLocaleString('en-IN') : '--'}</span></p>
                                                            <p className='p-o-txt_ mb-3' onClick={() => this.handleSelect(item.id, item.down_payment__c)}>Total: {item.currencyisocode === 'INR' ? (<i className='rupee'>`</i>) : '$'} <span>{(((item.fixed_rate__c / 100) * item.emi_amount__c) + item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                                            <p className='p-o-txt_ mb-2' onClick={() => this.handleSelect(item.id, item.down_payment__c)}>Down Payment: <i></i> <span>{item.down_payment__c ? item.down_payment__c.toLocaleString('en-IN') : '--'}</span></p>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div className='pm-a'>
                                                                    <button className='loan-info-modal-btn' data-toggle="modal" data-target="#viewTimeLine" onClick={e => {
                                                                        e.preventDefault()
                                                                        this.props.dispatch(sendViewTimelineData(item))
                                                                    }}>View Timeline</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* end middle */}
                                                        <div className='dd-btn-set'>
                                                            <button className='dropdown-amount dd-open'>
                                                                <img src={asset + "images/icons/icon_dd.png"} alt="drop-down" />
                                                            </button>
                                                            <button className='dropdown-amount dd-close'>
                                                                <img src={asset + "images/icons/icon_dd.png"} alt="drop-down" className='rotate180' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                        {plans && plans.length > 0 && (
                                            <div className='row mb-lg-5 mb-3'>
                                                <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                                                    <p className='m-0 w-a-txt mr-3'>Expand all</p>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={this.handleExpandChange} name="expandAll" />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className='row mt-5'>
                            <div className='col-sm-12 t-c'>
                                <h4>Terms &amp; Conditions</h4>
                                <p>Price may also include trade-in credit. Pricing with a trade-in is after trade-in of a specific device. Trade-in values vary based on the condition, year, and configuration of your trade-in device. You must be at least 18 years old. Additional terms from Apple or Apple’s trade-in partner may apply.
                                </p>
                                <p>Representative example: Based on purchase of ₹17430. Total amount payable ₹18462 paid over 9 months as 9 monthly payments of ₹2051 at an interest rate of 14% paper annum. Total interest paid to bank: ₹1032.</p>
                                <p>
                                    §No-Cost EMI available for purchases made using qualifying credit cards on 12-month tenure only. Offer available on qualifying purchases made after 1:30 PM IST on 6 December 2021 and before 11:59 PM IST on 19 January 2022. Minimum order spend applies as per your credit card’s issuing bank threshold. Offer cannot be combined with Apple Store for Education or Corporate Employee Purchase Plan pricing. Credit card eligibility is subject to terms and conditions between you and your credit card issuing bank. Offer may be revised or withdrawn at any time without any prior notice. Offer valid for limited period. Terms &amp; Conditions apply.</p>
                            </div>
                        </div>
                    </div>

                </section>
                <div className="modal fade" id="viewTimeLine" tabIndex="-1" role="dialog" aria-labelledby="viewMoratoriumTitle" aria-hidden="true">
                    <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{this.props.timelineData && this.props.timelineData.moratorium_duration__c} Months with Moratorium</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body px-lg-5 px-4 pb-lg-5 pb-4">
                                <div className='row'>
                                    <div className='col-lg-4 m_s_e_s_txt'>
                                        <h5>Moratorium Starts</h5>
                                        <p>{this.getMoratoriumDate(this.props.timelineData && this.props.timelineData.moratorium_duration__c)}</p>
                                    </div>
                                    <div className='col-lg-8 m_s_e_s_txt'>
                                        <h5>EMI Starts</h5>
                                        <p>{this.getEMIDate(this.props.timelineData && this.props.timelineData.moratorium_duration__c, this.props.timelineData && this.props.timelineData.net_tenure__c)}</p>
                                    </div>
                                </div>
                                <div class="width100">
                                    <div class="width30 new-wid">

                                        <strong> <i className='rupee'>`</i>{this.props.timelineData && this.props.timelineData.moratorium_amount__c || 1000} per month</strong>
                                        <div class="bottom-main">
                                            <div class="block left">
                                                <span></span>

                                                <p>{this.moratoriumDateEnds(this.props.timelineData && this.props.timelineData.moratorium_duration__c)}</p>
                                            </div>

                                            <div class="middle">
                                                <b>Moratorium</b>
                                            </div>

                                            <div class="block right">
                                                <span></span>

                                                <p>{this.emiMonth(this.props.timelineData && this.props.timelineData.moratorium_duration__c, this.props.timelineData && this.props.timelineData.net_tenure__c, "Starts")}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="width30 width60">

                                        <strong> <i className='rupee'>`</i>{this.props.timelineData && this.props.timelineData.emi_amount__c} per month</strong>
                                        <div class="bottom-main">
                                            <div class="block left">
                                                <span></span>

                                                <p>{this.emiMonth(this.props.timelineData && this.props.timelineData.moratorium_duration__c, this.props.timelineData && this.props.timelineData.net_tenure__c, "Starts")}</p>
                                            </div>

                                            <div class="middle">
                                                <b>EMI Amount</b>
                                            </div>

                                            <div class="block right">
                                                <span></span>

                                                <p>{this.emiMonth(this.props.timelineData && this.props.timelineData.moratorium_duration__c, this.props.timelineData && this.props.timelineData.net_tenure__c)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapSTP = state => {
    const { user, sfid, username } = state.auth;
    const { loan_amount, timelineData } = state.user;
    const { storeDetails, isSearching, searchDet, favorite_count } = state.product;
    const { plans } = state.payment;
    const { productId, product } = state.user;
    return {
        currentUser: state.currentUser,
        user,
        sfid,
        loan_amount,
        plans, storeDetails, isSearching, searchDet, favorite_count, username, timelineData, product
    }
}

export default connect(mapSTP)(VirtualCard3)