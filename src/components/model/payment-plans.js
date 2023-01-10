import React, { useState, useEffect, useRef } from 'react'
import $ from 'jquery';
import { connect, useDispatch } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets";
import { getPlans, selectPlan, storeDownPayment, showTimeLine } from "../../actions/payment";
import { markStage } from "../../actions/user";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import "./payment-plans.css";
// import crossicon from "../../../public/images/icons/Vectorc.png";
import moment from 'moment';
export const mapStateToProps = (state) => {
    const { user, sfid } = state.auth;
    const { loan_amount } = state.user;
    const { plans, schemeSummary, moratoriumTenure, repaymentStarts } = state.payment;
    return {
        currentUser: state.currentUser,
        user,
        sfid,
        loan_amount,
        plans,
        schemeSummary,
        moratoriumTenure,
        repaymentStarts,
    }
}

const PaymentPlans = (props) => {

    const [loan_amount, setloan_amount] = useState(0);
    const [open, setOpen] = useState(props.isOpen);
    const [plans, setPlans] = useState()
    const mounted = useRef();
    const [schemeSummary, setSchemeSummary] = useState([])
    const [moratoriumTenure, setMoratoriumTenure] = useState([])
    const [repaymentStarts, setRepaymentStarts] = useState([])
    const [selected_plan, setSelected_plan] = useState({})
    const [newdate, setNewDate] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        // const { user, loan_amount, plans, sfide } = props;


        setloan_amount(Number(props.product_sfid && props.product_sfid.mrp__c))
        if (!mounted.current) {
            mounted.current = true;
            setOpen(props.data)

            console.log(props, "the props")

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
            const { product_sfid } = props

            let data = {
                product_id: product_sfid.sfid,
            }
            dispatch(getPlans(data))

        } else {
            console.log(props, '====')
            // setPlans(props.plans.paymentPlan ? props.plans.paymentPlan : "")
            setPlans(props.plans ? props.plans : "")
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
    });


    const handleSelect = (plan_id, down_payment) => {
        const { dispatch, history } = props
        dispatch(selectPlan(plan_id));
        dispatch(storeDownPayment(down_payment));
        // history.push("/virtual_card4");
    }

    const handleExpandChange = () => {
        console.log("onshow")
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

    const handleExpandChangeopen = () => {
        $('.p-o-b').addClass("open_");
        $(".dd-open").show();
    }

    const handleExpandChangeclose = () => {
        console.log("close")
        $('.p-o-b').removeClass("open_");
        $(".dd-close").hide();
    }
    const handleClose = () => {

        setOpen(false)
        props.onClose()
    };

    const openTimeline = (plan_id) => {
        console.log(plan_id, "pppppppp")

        let selectedPlan = plans.find((obj) => {
            return obj.id === plan_id
        })

        setSelected_plan(selectedPlan)


        let newwDate = ''
        newwDate = moment(selectedPlan.first_emi_date__c, "YYYY-MM-DD").add(Number(selectedPlan.net_tenure__c), 'months').format('MMM-YY');
        setNewDate(newwDate)




        window.$('#viewTimeLine').modal('show');
        // const data = {
        //     "product_id": props.product_sfid.sfid,
        //     "plan_id": plan_id
        // }
        // dispatch(showTimeLine(data)).then((resp) => {
        //     if (resp.status === 'success') {

        //         window.$('#viewTimeLine').modal('show');
        //         setSchemeSummary(resp.schemeSummary)
        //         setMoratoriumTenure(resp.moratoriumTenure)
        //         setRepaymentStarts(resp.repaymentStarts)
        //     } else {

        //     }
        // })

    }

    const modalclose = () => {
        window.$('#viewTimeLine').modal('hide');
    }

    useEffect(() => {

    }, [])

    let id = window.location.href;
    let storeid = id.split('/');
    const product_id = storeid[storeid.length - 1];

    
    const product_d = props.product_sfid;

    return (
        <>
            <Dialog className="MuiDialog-paperWidthSm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ "height": "45rem", "maxWidth": "60rem !important" }}>
                <DialogContent>
                    <section>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <div className='w-100 shopping_content_wrapper mt-4'>
                                        <div className='maxWidth965 '>
                                            <div className="row">
                                                <div className='col-12 d-flex'>
                                                    <div className='col-10'>
                                                        <h4 className='mb-5 s_c_title'>Select a Payment Plan</h4>
                                                    </div>
                                                    <div className='col-2 text-right'>
                                                        <img src={asset + "images/icons/cross3.png"} alt="crosicon" onClick={handleClose} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="row">
                                                <div className="col col-sm-6">
                                                    <div className='loan-amound-info mb-4'>
                                                        <div>
                                                            <ul className='m-0 list-unstyled d-flex'>
                                                                {product_d &&
                                                                    <li>{product_d.name.split(' ').splice(0, 5).join('')} <span><i></i> {product_d.merchant_name__c}</span></li>
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col col-sm-6">
                                                    <div className=' loan-amound-info mb-4'>
                                                        <div>
                                                            <ul className='m-0 list-unstyled d-flex'>
                                                                <li>Loan Amount: <i className='rupee'>`</i><span>{product_d.price__c} </span></li>
                                                            </ul>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div> */}




                                            <div className='row mt-4'>
                                                <div className='col-lg-6'>
                                                    <div className='d-flex justify-content-between align-items-center product-item-box mb-lg-0 mb-3'>
                                                        <h3 className='product-name m-0'>{product_d && product_d.name ? product_d.name : ''}</h3>
                                                        {product_d && product_d.name ? '' : (
                                                            <div className='brand-name'>
                                                                <span><img src={asset + "images/icons/apple.png"} alt="apple" /></span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <div className='d-flex justify-content-between align-items-center product-item-box'>
                                                        <h3 className='product-name m-0'>Loan Amount:</h3>
                                                        {product_d && product_d.price__c ? (
                                                            <div className='a-e d-flex align-items-center'>
                                                                <span className='loan-amount'><i className='rupee'>`</i>{product_d && product_d.price__c.toLocaleString('en-IN')}</span>
                                                                {/* <button className='edit-btn ml-3'>Edit</button> */}
                                                            </div>
                                                        ) : ''
                                                        }
                                                    </div>
                                                </div>
                                            </div>


                                            <h4 className='my-4 s_c_title'>Payment Options</h4>
                                            {plans && plans.length > 0 && (
                                                <div className='row mb-lg-5 mb-3'>
                                                    <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                                                        <p className='m-0 w-a-txt mr-3'>Expand all</p>
                                                        <label className="switch">
                                                            <input type="checkbox" onChange={handleExpandChange} name="expandAll" />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='row payment-option-list'>

                                                {plans && plans.length > 0 && plans.map((item, index) => (
                                                    <div className='col-lg-4 col-md-6' key={`item-${index}`} >
                                                        <div className='p-o-b d-flex flex-column justify-content-between'>
                                                            {/* top */}
                                                            <div className='d-flex align-items-center justify-content-end p-o-b_top'>
                                                                <div>
                                                                    <button className='calender rounded-circle'
                                                                        
                                                                    >
                                                                        <img src={asset + "images/icons/calendar.png"} alt="calendar" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* top */}
                                                            {/* bottom */}


                                                            <div style={{ cursor: 'pointer' }} onClick={() => handleSelect(item.id, item.down_payment__c)} className='p-o-b_bottom'>
                                                                {/* {item.down_payment__c== 0 } */}
                                                                <h2 className='m-txt' >{item.net_tenure__c ? item.net_tenure__c : '--'} {"Months"}</h2>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className='pm-a'>{item.currencyisocode === 'INR' ? (<i className='d-inline-block r-s rupee'></i>) : <i className='rupee'>`</i>}
                                                                        <span>{item.emi_amount__c ? item.emi_amount__c.toLocaleString('en-IN') : 0}</span>/Per month</div>
                                                                </div>
                                                            </div>
                                                            {/* end bottom */}
                                                            {/* middme */}
                                                            <div className='p-o-b_middle'>
                                                                <p className='p-o-txt_ mb-2'>Due today: <i></i> <span>{item.emi_amount__c ? item.emi_amount__c.toLocaleString('en-IN') : '--'}</span></p>
                                                                <p className='p-o-txt_ mb-2'>Interest ({item.fixed_rate__c ? item.fixed_rate__c : '--'}% p.a):  <i></i> <span>{item.fixed_rate__c ? ((item.fixed_rate__c / 100) * item.emi_amount__c).toFixed(2).toLocaleString('en-IN') : '--'}</span></p>
                                                                <p className='p-o-txt_ mb-3'>Total: {item.currencyisocode === 'INR' ? (<i className='rupee'>`</i>) : '$'} <span>{(((item.fixed_rate__c / 100) * item.emi_amount__c) + item.emi_amount__c).toFixed(2).toLocaleString('en-IN')}</span></p>
                                                                <p className='p-o-txt_ mb-2'>Down Payment: <i></i> <span>{item.down_payment__c ? item.down_payment__c.toLocaleString('en-IN') : '--'}</span></p>
                                                                <div className='d-flex justify-content-between align-items-center'>
                                                                    <div className='pm-a'>
                                                                        <button className='loan-info-modal-btn'
                                                                            // data-toggle="modal" data-target="#viewTimeLine"
                                                                            onClick={() => openTimeline(item.id)}
                                                                        >View Timeline</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* end middle */}
                                                            <div className='dd-btn-set'>
                                                                <button className='dropdown-amount dd-open' onClick={handleExpandChangeopen}>
                                                                    <img src={asset + "images/icons/icon_dd.png"} alt="drop-down" />
                                                                </button>
                                                                <button className='dropdown-amount dd-close' onClick={handleExpandChangeclose}>
                                                                    <img src={asset + "images/icons/icon_dd.png"} alt="drop-down" className='rotate180' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>

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
                        <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Loan Timeline</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        onClick={() => modalclose()}
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
                                                <div className='e_start' style={{flex:"1"}}><i className='rupee'>`</i>{selected_plan.emi_amount__c} <span>per month</span></div>
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
                </DialogContent>
            </Dialog>

        </>
    )
}


export default connect(mapStateToProps)(PaymentPlans)