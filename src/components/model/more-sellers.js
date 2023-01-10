import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets";
import { getPlans, selectPlan, storeDownPayment } from "../../actions/payment";
import { getMoreSeller } from '../../actions/user'
class MoreSellers extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            loan_amount: 0,
            sellers_data: []
        }
    }

    async componentDidMount() {

        this.props.dispatch(getMoreSeller({ "product_sfid": this.props.sfid })).then((response) => {
            if (response.status === 'success') {
                this.setState({ sellers_data: response.data })
            }

        })




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
       
        // await dispatch(getPlans(data));
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
        history.push("/virtual_card4");
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


    render() {
        const { user, loan_amount, plans, sfid } = this.props;
        if (!sfid) {
            window.location = "/login";
        }
        this.state.loan_amount = Number(loan_amount);
        return (
            <>

                <section>
                    <div className='w-100'>
                        <div className='maxWidth965'>
                            <div className='container'>

                                <h4 className='mb-2 mt-3 s_c_title'>All Sellers</h4>
                                <p>You can select your desired seller from below</p>
                            </div>
                            <table className="table">
                                <thead className={"thead-dark bg-dark text-white"}>
                                    <tr className="">
                                        <th style={{ width: "10%" }}>
                                        </th><th>
                                            <p className='text-left mb-1 mt-1'>Seller</p>
                                        </th>
                                        <th>
                                            <p className='text-left mb-1 mt-1'>Price</p>
                                        </th><th>
                                            <p className='text-left mb-1 mt-1'>Delivery</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={""}>
                                    {this.state.sellers_data.length > 0 &&
                                        this.state.sellers_data.map((item) =>

                                            <tr>
                                                <td><input type="radio" name="seller_name" /></td>
                                                <td>{item.name}</td>
                                                <td>
                                                    {item.no_cost_emi__c && `EMI starting from ${item.currencyisocode} ${item.min_avi_emi__c} 
                                                        MRP ${item.price__c}  (${item.discount_rate__c}%Off)`
                                                    }

                                                </td>
                                                <td>FREE Delivery by 21 Feb, Monday
                                                    Installation & Demo by 22 Feb, Tuesday (Service available at extra cost)</td>
                                            </tr>

                                        )
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
                <div className="modal fade" id="viewTimeLine" tabIndex="-1" role="dialog" aria-labelledby="viewMoratoriumTitle" aria-hidden="true">
                    <div className="modal-dialog viewMoratoriumModal modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Loan Timeline</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body px-lg-5 px-4 pb-lg-5 pb-4">
                                <div className='row'>
                                    <div className='col-lg-4 m_s_e_s_txt'>
                                        <h5>EMI Starts</h5>
                                        <p>May 2021</p>
                                    </div>
                                    <div className='col-lg-8 m_s_e_s_txt'>
                                        <h5>EMI End</h5>
                                        <p>November 2021</p>
                                    </div>
                                </div>
                                <div className='m_s_b mt-3'>
                                    <div className='d-flex flex-wrap'>

                                        <div className='e_start w-100 text-center' style={{ "flex": "0 0 100%" }}><i className='rupee'>`</i> 17,000 <span>per month</span></div>
                                    </div>
                                    <div className="range-slider">
                                        <div className='handel left' style={{ 'left': "0%" }}>
                                            <span>May21</span>
                                        </div>
                                        {/* <div className='handel' style={{'left':"30%"}}>
                                <span>Jan21</span>
                            </div> */}
                                        <div className='range range-dotted'></div>
                                        <div className='range range-solid' style={{ "width": "100%" }}></div>
                                        <div className='handel right' style={{ 'left': "100%" }}>
                                            <span>Nov21</span>
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
    const { user, sfid } = state.auth;
    const { loan_amount  } = state.user;
    const { plans } = state.payment;
    return {
        currentUser: state.currentUser,
        user,
        sfid,
        loan_amount,
        plans
    }
}

export default connect(mapSTP)(MoreSellers)