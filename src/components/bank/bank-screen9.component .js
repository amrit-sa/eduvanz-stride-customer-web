import React, { Component } from 'react'
import $ from 'jquery';

import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import HeaderNew from '../../common/headerNew';
import { asset } from "../../common/assets"
import { selectPlan, getPlans, getUserProduct, showTimeLine } from "../../actions/payment";
import { getProductById, updateTransApp, markStage } from "../../actions/user";
import { updatePreviousPath } from "../../actions/auth";
import moment from 'moment';
class BankScreen9 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            product_id: '',
            plans_list: [],
            selected_plan: {},
            show_plan: [],
            show_type: ''
        }
    }
    async componentDidMount() {
        const { user, dispatch, id, sfid } = this.props
        if (!sfid) {
            const path = window.location.pathname;
            dispatch(updatePreviousPath(path));
            this.props.history.push('/login');
        }

        let qr = new URLSearchParams(window.location.search);
        let product_id = qr.get("product");
        this.setState({ product_id: product_id })
        console.log(product_id)
        let data = {
            user_sfid: sfid,
        }

        window.scrollTo(0, 0)
        // await dispatch(getPlans(data));
        await dispatch(getUserProduct(data))



        let obj = {
            sfid: product_id
        }
        let product = await dispatch(getProductById(obj));

        let getplan_data = {
            product_id: product_id
        }

        let getPlan_payload = {
            merchant_productid: product.data.merchant_productid
        }
        let payment_plans_list = []
        await dispatch(getPlans(getPlan_payload)).then((resp) => {
            this.setState({ plans_list: resp.paymentPlan, show_plan: resp.paymentPlan })

            resp.paymentPlan.forEach((obj) => {
                payment_plans_list.push(obj.id)
            })

            localStorage.setItem("plans_list", payment_plans_list.join(','))
        })
        // expand single
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
        // expand all
        // $("input[name='expandAll']").change(function () {
        //     console.log('dffddf');
        //     if ($(this).is(":checked")) {
        //         $('.p-o-b').addClass("open_");
        //         $(".dd-close").show();
        //         $(".dd-open").hide();
        //     } else {
        //         $('.p-o-b').removeClass("open_");
        //         $(".dd-close").hide();
        //         $(".dd-open").show();
        //     }
        // });

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

    handleExpandChangeNew = () => {
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

    handlePlan = (plan) => {
        const { dispatch, history, id } = this.props
        // console.log(plan.scheme_masters__c, "Plan Id");


        // localStorage.setItem("planjugugug", 'hyufufufyu');
        dispatch(selectPlan(plan));
        // let obj = {
        //     stage: 'Select Plan',
        //     plan: sfid,
        //     sfid: this.props.opp_id
        // }
        // dispatch(updateTransApp(obj));
        localStorage.setItem("planId", plan.id);



        if (plan.down_payment__c == 0) {
            history.push(`/order-process/${this.state.product_id}/${plan.id}`)
        }
        else {
            history.push(`/edplan_details_pay/${this.state.product_id}/${plan.id}`)
        }

        // history.push(`/edplan_details_pay/${id}/${plan_id}`);
    }

    handleBack = () => {
        const { history, id } = this.props
        history.push(`/product-details/${id}`);
    }

    openTimeline = (plan_id) => {


        let selectedPlan = this.state.plans_list.find((obj) => {
            return obj.id === plan_id
        })

        this.setState({ selected_plan: selectedPlan })

        let newwDate = ''
        newwDate = moment(selectedPlan.first_emi_date__c, "YYYY-MM-DD").add(Number(selectedPlan.net_tenure__c), 'months').format('MMM-YY');
        this.setState({ newdate: newwDate })


        window.$('#viewTimeLine').modal('show');

        // const data = {
        //     "product_id": this.state.product_id,
        //     "plan_id": plan_id

        //     // testing payload
        //     // "product_id": "01tC40000005IxBIAU",
        //     // "plan_id": "a0aC40000001biHIAQ"
        // }
        // this.props.dispatch(showTimeLine(data)).then((resp) => {
        //     if (resp.status === 'success') {
        //         console.log('hhhhhhhhhhh')
        //         window.$('#viewTimeLine').modal('show');
        //         // setSchemeSummary(resp.schemeSummary)
        //         // setMoratoriumTenure(resp.moratoriumTenure)
        //         // setRepaymentStarts(resp.repaymentStarts)
        //     } else {

        //     }
        // })

    }

    modalclose = () => {
        window.$('#viewTimeLine').modal('hide');
    }

    changeplanView = (type) => {
        const { plans_list, show_plan, show_type } = this.state;
        if (type == show_type) {
            this.setState({ show_type: '' })
            this.setState({ show_plan: plans_list })
        } else {
            this.setState({ show_type: type })
            let temp = [];
            if (type == 'no_cost') {
                temp = plans_list.filter((plan) => {
                    return plan.is_no_cost_emi == true
                })
            } else {
                temp = plans_list.filter((plan) => {
                    return plan.is_no_cost_emi == false
                })
            }
            this.setState({ show_plan: temp })
        }


        // let newlist = plans_list.filter((obj)=>{
        //     return obj.fixed_rate__c == 0;
        // })
    }

    render() {
        const { product, user, isLoading, plans, schemeSummary, moratoriumTenure, repaymentStarts } = this.props
        const { plans_list, show_plan, selected_plan, newdate } = this.state
        console.log(plans, "Products Details");

        return (
            <>
                <Helmet>
                    <title>Eduvanz | Plans</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <HeaderNew
                    user={user}
                    showSubHeader={false}
                    history={this.props.history}
                />
                <section className="kyc_pages bank_screen">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='d-flex align-items-center'>
                                    <button type='button' onClick={() => this.props.history.goBack()} className='back-btn rounded-circle mr-3 mr-lg-4'>
                                        back
                                    </button>
                                    <h2 className="back-btn-text m-0">Back</h2>
                                    {/* <h2 className="back-btn-text m-0">Select Payment plans</h2> */}
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-lg-6'>
                                <div className='d-flex justify-content-between align-items-center product-item-box mb-lg-0 mb-3'>
                                    <h3 className='product-name m-0'>{product && product.name ? product.name : ''}</h3>
                                    {product && product.name ? '' : (
                                        <div className='brand-name'>
                                            <span><img src={asset + "images/icons/apple.png"} alt="apple" /></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='d-flex justify-content-between align-items-center product-item-box'>
                                    <h3 className='product-name m-0'>Loan Amount:</h3>
                                    {product && product.price__c ? (
                                        <div className='a-e d-flex align-items-center'>
                                            <span className='loan-amount'><i className='rupee'>`</i>{product && product.price__c.toLocaleString('en-IN')}</span>
                                            {/* <button className='edit-btn ml-3'>Edit</button> */}
                                        </div>
                                    ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row my-4'>
                            <div className='col-sm-12'>
                                <div className='d-md-flex justify-content-md-between align-items-center'>
                                    <div>
                                        <h3 className='m-lg-0 mb-3 p-o-t'>Payment options</h3>
                                    </div>
                                    <div className='d-flex align-items-center'>

                                        <div
                                            className={`no-cost cursor-point ${(this.state.show_type == 'no_cost') && 'nocost_color'}`}
                                            onClick={() => this.changeplanView('no_cost')} > No Cost
                                            <span className='ml-2'>
                                                {(this.state.show_type == 'no_cost') ? <i className='fa fa-close'></i> : <img src={asset + "images/icons/icon-ind2.png"} alt="icon-ind2" />}
                                            </span>
                                        </div>

                                        <div className={` ${(this.state.show_type == 'moratorium') && 'mort_color'} moratorium ml-2 cursor-point`}
                                            onClick={() => this.changeplanView('moratorium')}>Moratorium
                                            <span className='ml-2'>
                                                {(this.state.show_type == 'moratorium') ? <i className='fa fa-close'></i> : <img src={asset + "images/icons/icon-ind2.png"} alt="icon-ind2" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section>
                    <div className='container'>
                        <div className='row payment-option-list'>
                            {show_plan && show_plan.length > 0 && show_plan.map((item, index) => (
                                // {plans && plans.length > 0 && plans.map((item, index) => (
                                <div className='col-lg-4 col-md-6' key={`item-${index}`}>
                                    <div className='p-o-b d-flex flex-column justify-content-between'>
                                        {/* top */}
                                        <div className='d-flex align-items-center justify-content-between p-o-b_top'>
                                            <div className='d-flex flex-column justify-content-start'>
                                                {item.is_no_cost_emi ?
                                                    <div>
                                                        <span className='n-c d-inline-block'> No Cost</span>
                                                    </div>
                                                    :
                                                    <div className='mb-2'>
                                                        <span className='mtm d-inline-block'>Moratorium</span>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                <button className='calender rounded-circle' onClick={() => this.handlePlan(item)}>
                                                    <img src={asset + "images/icons/calendar.png"} alt="calendar" />
                                                </button>
                                            </div>
                                        </div>
                                        {/* top */}
                                        {/* bottom */}
                                        <div style={{ cursor: 'pointer' }} onClick={() => this.handlePlan(item)} className='p-o-b_bottom'>
                                            <h2 className='m-txt'>{item.net_tenure__c} {"Months"}</h2>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='pm-a'>{item.currencyisocode === 'INR' ? (<i className='d-inline-block r-s rupee'></i>) : <i className='rupee'>`</i>}<span>{item.emi_amount__c ? item.emi_amount__c.toLocaleString('en-IN') : 0}</span>/Per month</div>
                                            </div>
                                        </div>
                                        {/* end bottom */}
                                        {/* middme */}
                                        <div className='p-o-b_middle'>
                                            <p className='p-o-txt_ mb-2'>Due today: <i></i> <span>{item.emi_amount__c ? item.emi_amount__c.toLocaleString('en-IN') : 0}</span></p>
                                            <p className='p-o-txt_ mb-2'>Interest ({item.fixed_rate__c}% p.a): <i></i> <span>{((item.fixed_rate__c / 100) * item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                            <p className='p-o-txt_ mb-3'>Total: {item.currencyisocode === 'INR' ? (<i className='rupee'>`</i>) : '$'} <span>{(((item.fixed_rate__c / 100) * item.emi_amount__c) + item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                            <p className='p-o-txt_ mb-2'>Down Payment: <i></i> <span>{item.down_payment__c ? item.down_payment__c.toLocaleString('en-IN') : 0}</span></p>

                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='pm-a'>
                                                    <button className='loan-info-modal-btn'
                                                        // data-toggle="modal" data-target={`#viewMoratorium${index}`}
                                                        onClick={() => this.openTimeline(item.id)}
                                                    >View Timeline</button>
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
                                        <input type="checkbox" onChange={this.handleExpandChangeNew} name="expandAll" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                <div className="modal fade" id="viewTimeLine" tabIndex="-1" role="dialog" aria-labelledby="viewMoratoriumTitle" aria-hidden="true">
                    <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Loan Timeline</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => this.modalclose()}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>



                            <div className="modal-body px-lg-5 px-4 pb-lg-5 pb-4">
                                {selected_plan && Object.keys(selected_plan).length > 0 && <>
                                    <div className='row'>
                                        <div className='col-lg-4 m_s_e_s_txt'>
                                            <h5>Moratorium Starts</h5>
                                            <p>NA</p>
                                        </div>
                                        <div className='col-lg-8 m_s_e_s_txt'>
                                            <h5>EMI Starts</h5>

                                            <p>{moment(selected_plan.first_emi_date__c).format('MMM-YY')}
                                                To
                                                {newdate}</p>
                                        </div>

                                    </div>
                                    <div className='m_s_b mt-3 '>

                                        <div className='d-flex flex-wrap'>
                                            {/* <div className='m_start'><i className='rupee'>`</i>500 <span>per month</span></div> */}
                                            <div className='e_start' style={{ flex: "1" }}><i className='rupee'>`</i>{selected_plan.emi_amount__c} <span>per month</span></div>
                                        </div>

                                        <div className="range-slider">
                                            {/* <div className='handel left' style={{ 'left': "0%" }}>
                                                <span>June 22</span>
                                            </div>
                                            <div className='handel' style={{ 'left': "30%" }}>
                                                <span>Sep 22</span>
                                            </div>
                                            <div className='range range-dotted'></div> */}

                                            <div className='handel' style={{ 'left': "0%" }}>
                                                <span>{moment(selected_plan.first_emi_date__c).format('MMM-YY')}</span>
                                            </div>

                                            <div className='range range-solid' style={{ "width": "100%" }}></div>
                                            <div className='handel right' style={{ 'left': "100%" }}>
                                                <span>{newdate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { salesForceToken, user, isLoading, sfid } = state.auth;
    const { plans, schemeSummary, moratoriumTenure, repaymentStarts } = state.payment;
    const { productId, product } = state.user;
    return {
        salesForceToken,
        productId,
        sfid,
        user,
        plans,
        schemeSummary,
        moratoriumTenure,
        repaymentStarts,
        product,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen9)

