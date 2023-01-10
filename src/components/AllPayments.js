import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import { getAllTransaction, getMonthlyStride, getAccountProfile, makePayment, product_emi_summary } from '../actions/user'
import ALlPayment_sidebar from "./ALlPayment_sidebar";
import $ from "jquery"
import Payment_loan from "./bank/Payment_loan";




class AllPayments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_transactions: [],
            selected_item: "",
            strides: [],
            upcoming: {
                amount: 0,
                month: ""
            },
            year: new Date().getFullYear(),
            streak: 0,
            user_credit_limit: '',
            is_Autopay: false,
            collection: [],
            pay_collection: [],
            payment_proceed: false,
            all_checked: true,
            paying_amount: 0,
            mobile: null,
            email: null,
            username: null,
            payble_amount: null,
            full_collection: [],
            selected_item_summery: null
        };
    }


    componentDidMount() {
        const { user, sfid } = this.props;
        if (!sfid) {
            this.props.history.push('/login');
        }

        this.props.dispatch(getAllTransaction({ "user_sfid": this.props.sfid })).then((response) => {
            if (response.status === "success") {
                this.setState({ all_transactions: response.transactions })
                // this.setState({ is_Autopay: response.enach_status })

                const collection = [];
                const result = response.transactions;
                const full_collection = [];
                result.forEach((obj) => {
                    let newobj = {};
                    newobj['p_name'] = obj.product_name;
                    newobj['p_duedate'] = obj.next_emi_due;
                    newobj['p_amount'] = obj.emi_amt_due;
                    newobj['opp_id'] = obj.opp_id
                    collection.push(newobj);

                    // let obj = {
                    //     product_details : newobj,

                    // }
                    obj.emi_data.forEach((item) => {
                        item.name = obj.product_name
                    })
                    full_collection.push(...obj.emi_data)
                })
                this.setState({ full_collection: full_collection })
                // console.log(collection,'collection')
                this.setState({ collection: collection })
                this.setState({ pay_collection: collection })
                document.querySelectorAll('.pay-check').forEach(ele => ele.checked = true)

                if (response.transactions.length > 0) {

                    this.selectItem(response.transactions[0])
                }
            }
        })

        let obj = {
            user_sfid: this.props.sfid
        }
        this.props.dispatch(getAccountProfile(obj)).then((response) => {
            if (response.status === "success") {

                this.setState({
                    user_credit_limit: response.accountDet.ipa_basic_bureau__c,
                    username: response && response.accountDet ? response.accountDet.first_name__c : '',
                    mobile: response && response.accountDet ? response.accountDet.phone : '',
                    email: response && response.accountDet ? response.accountDet.email__c : '',
                    is_Autopay: response && response.accountDet && response.accountDet.is_nach_approved__c ? response.accountDet.is_nach_approved__c : false
                });
            }
        });




        this.callMonthlyStrideApi(this.state.year);

    }

    callMonthlyStrideApi = (year) => {
        let data = {
            "user_sfid": this.props.sfid,
            "year": year
        }
        this.props.dispatch(getMonthlyStride(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ strides: response.transactions });
                this.setState({ streak: response.streak });
                response.transactions.forEach(monData => {
                    if (monData.status === "Upcoming") {
                        this.setState({ upcoming: monData })
                    }
                });

            }
        })
    }

    ltt_toggle2 = () => {
        $(".loanTimeTable_wrap2").slideToggle()
        $('.arrow_down2').toggle();
        $('.arrow_up2').toggle();
    }

    ldt_toggle2 = () => {
        $(".loanTimeTable_wrap2").slideToggle()
        $(this).toggleClass('show')
        $(".loanDetailTable2").slideToggle()
    }


    at_dropdown = () => {
        $(".transaction-block-wrap").slideToggle()
    }

    ltt_toggle = () => {
        $(".loanTimeTable_wrap").slideToggle()
        $('.arrow_down').toggle();
        $('.arrow_up').toggle();
    }
    ldt_toggle = () => {
        $(".loanTimeTable_wrap").slideToggle()
        $(this).toggleClass('show')
        $(".loanDetailTable").slideToggle()
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.pay_collection != this.state.pay_collection) {
            this.calculate_paying_amount();
        }

    }



    selectItem = (item) => {
        // select one product/transaction from the sidebar and this function will be called to load the one product component 
        this.setState({ selected_item: item })
        let data = { opp_sfid: item.opp_id }
        // calling this API just to get the monthly stride of selected project
        this.props.dispatch(product_emi_summary(data)).then((resp) => {
            if (resp.status === 'success') {

                this.setState({ selected_item_summery: resp.data })
            }
        })
    }


    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    async openPayModal() {
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        var options = {

            key: 'rzp_test_FCJbc6ap4R4xtE',
            amount: this.state.payble_amount * 100, //100000,
            name: 'Eduvanz',
            description: 'Test Transaction',
            image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
            "handler": async (response) => {
                console.log("response", response);

                if (typeof response.razorpay_payment_id == 'undefined' || response.razorpay_payment_id < 1) {
                    // payment failed
                } else {
                    // payment success
                    let opp_sfid = [];
                    this.state.pay_collection.forEach((obj) => opp_sfid.push(obj.opp_id))

                    let data =

                    {
                        "user_sfid": this.props.sfid,
                        "opp_sfid": opp_sfid,
                        "type": "Debit"
                    }

                    this.props.dispatch(makePayment(data)).then(resp => {
                        console.log(resp)
                        if (resp.status == 'success') {
                            this.props.history.push("/payment_success");
                        } else {

                            alert(resp.message)
                        }

                    }).catch(err => console.log(err))



                }

            },
            "modal": {
                "ondismiss": function () {
                    console.log('Checkout form closed');
                }
            },

            prefill: {
                name: this.state.username ? this.state.username : '',
                email: this.state.email ? this.state.email : '',
                contact: this.state.mobile ? this.state.mobile : '',
            },
            "theme": {
                "color": "#F37254"
            }


        };
        var rzp1 = new window.Razorpay(options);



        /*  document.getElementById('rzp-button1').onclick = function (e) {
            rzp1.open();
            e.preventDefault();
          } */
        /*   const rzp1  = new window.Razorpay(options); */
        const planId = this.state.planfailid
        rzp1.on("payment.failed", function (response) {
            console.log(response, "pay fail")
            window.location = "/order-reject/" + planId
            // window.location= "/order-reject";
            // console.log(this.state.planfailid,this.state.match.params.plan_id,"params")
            // window.location =`/order-reject/${this.state.planfailid}`
            // this.props.history.push("/order-reject");
        });
        rzp1.open();
    }

    payNow = (amount) => {
        this.setState({ payble_amount: amount })
        this.openPayModal();
    }

    CancelPay = () => {
        // come back from payment_loan component to all_payments component
        this.setState({ payment_proceed: false })
    }

    handleCheck = (e) => {
        if ((e.target).checked) {
            // Add to the collections
            let selected_obj = this.state.collection.find(obj => obj.opp_id === e.target.id);
            this.setState({ pay_collection: [...this.state.pay_collection, selected_obj] });
        } else {
            // remove from the collections
            let opp_id = e.target.id;
            let new_arr = this.state.pay_collection.filter(data => data.opp_id != opp_id)
            this.setState({ pay_collection: new_arr });
        }
    }

    calculate_paying_amount = () => {
        let sum = 0;
        this.state.pay_collection.forEach(obj => sum += Number(obj.p_amount))
        this.setState({ paying_amount: sum })
    }
    handleAutopay = () => {
        this.props.history.push('/ed_select_bank');
    }
    render() {
        const { sfid, history, isSearching, userId, user, username, isLoading, searchDet, favorite_count, dispatch, profile, userData } = this.props;
        const { selected_item, all_transactions, strides, full_collection, selected_item_summery } = this.state;
        return (
            <>
                <Helmet>
                    <title>All Transactions </title>
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
                <div className="inner-page greyBg">
                    <div className="container">


                        {/* {
                            Object.keys(this.state.selected_item).length != 0 ?
                                <div className='row mb-4'>
                                    <div className='col'>
                                        <div className="d-flex align-items-center">
                                            <button onClick={() => this.setState({ selected_item: {} })} className="back-btn rounded-circle mr-3"><i className="fa fa-arrow-left" aria-hidden="true" ></i></button><h4 className="mb-0">Product Summary</h4></div>
                                    </div>
                                </div>

                                :

                                <div className='row mb-4'>
                                    <div className='col'>
                                        <div className="d-flex align-items-center">
                                            <button onClick={() => this.props.history.push('/')} className="back-btn rounded-circle mr-3"><i className="fa fa-arrow-left" aria-hidden="true" ></i></button><h4 className="mb-0">Payments</h4></div>
                                    </div>
                                </div>

                        } */}


                        <div className='row mb-4'>
                            <div className='col'>
                                <div className="d-flex align-items-center">
                                    <h4 className="mb-0">Payments</h4>
                                </div>
                            </div>
                        </div>


                        <div className="row">

                            {/* <div class="col-sm-12 manage_bck pt-4"><a href="/"><span>Payments</span></a></div> */}



                            {
                                Object.keys(this.state.selected_item).length === 0 ?
                                    <>
                                        {/* <div className="col-sm-4 paymentLeft">
                                            <h5 className="mb-3 d-flex align-items-center mb-0">All Payments</h5>

                                            <ALlPayment_sidebar
                                                history={this.props.history}
                                                all_transactions={this.state.all_transactions}
                                                selectItem={this.selectItem}
                                                user_credit_limit={this.state.user_credit_limit}
                                            />



                                        </div> */}
                                        <div className="d-flex justify-content-around align-items-center">
                                            <div style={{ height: "80%" }}>
                                                <img src={asset + 'images/wishlist/empty.png'} className='w-full-sm' style={{ height: "80%" }} />
                                            </div>
                                            <div>
                                                <h3>We didn't find any transactions details.</h3>
                                            </div>
                                        </div>

                                        {/* <div className="col-sm-9 paymentRyt">

                                            <h5>Summary</h5>

                                            <div className="SummryRow mb-3">
                                                <div className="col1 col-sm-4 p-0 ">
                                                    <img className="w-100" src="https://cdn.dribbble.com/users/77598/screenshots/16399264/media/d86ceb1ad552398787fb76f343080aa6.gif" alt="" width="290" />
                                                </div>

                                                <div className="col2 col-sm-3 p-0">

                                                    <h6>Due on {this.state.upcoming.month}</h6>

                                                    <h2> {this.state.upcoming.amount}</h2>


                                                    <div className="d-flex justify-content-between">
                                                        <button className="dropdown-toggle ldt_toggle link" onClick={this.ldt_toggle}>
                                                            View Break-Up
                                                        </button>

                                                    </div>
                                                </div>

                                                <div className="col3 col-sm-5 autoBox">
                                                    {this.state.is_Autopay ?
                                                        <>
                                                            <img src={asset + "images/dashboard/auto-pay.png"} alt="auto-img" width="150" />
                                                            <p>{this.state.upcoming.amount} will be auto debited on {this.state.upcoming.month}, {new Date().getFullYear()}</p>

                                                             <p style={{ margin: "0" }}>Want to make an instant payment?</p>
                                                            <button
                                                                className="link payNow" onClick={() => this.payNow(this.state.upcoming.amount)}
                                                            >Pay Now</button> 



                                                        </>
                                                        :
                                                        <>
                                                            <img src={asset + "images/autopay.png"} alt="auto-img" width="150" />

                                                            <p><span className="text-danger">
                                                                Your Auto-Pay setup failed! </span> Try again to auto-debit your payments on due date.
                                                            </p>
                                                            <button className="link payNow" onClick={this.handleAutopay}>Set-up Auto-pay again</button>
                                                            <br />

                                                             <button className=" btn-dark2"
                                                                onClick={() => this.payNow(this.state.upcoming.amount)}
                                                            >Pay Now</button> 
                                                        </>

                                                    }



                                                </div>

                                                <div className="col-12 pl-4 pr-4 loanDetailTable mt-4" style={{ display: "none" }}>
                                                    <div className="row align-items-end">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"> All</th>
                                                                    <th scope="col"><input type="checkbox" className="form-check parent_check" checked={this.state.all_checked} onClick={() => this.setState({ all_checked: !this.state.all_checked })} /> All</th>
                                                                    <th scope="col">Store Name</th>
                                                                    <th scope="col">Product Name</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.collection.map((obj, index) =>

                                                                    <tr key={index}>
                                                                        <td>
                                                                            <input type="checkbox" className="form-check pay-check" id={obj.opp_id} onClick={(e) =>
                                                                                this.handleCheck(e)
                                                                            }

                                                                            />
                                                                        </td>
                                                                        <td>{obj.p_name}</td>
                                                                        <td>{obj.p_name}</td>
                                                                        <td>{obj.p_duedate}</td>
                                                                        <td>{obj.p_amount}</td>

                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>





                                                        <div className="p-3" style={{ background: "#EFF0FC" }}>
                                                            <div className="row align-items-center">
                                                                <div className="col-lg-9">
                                                                    <div className="d-flex align-items-center">

                                                                        <div className="col">
                                                                            <p className="mb-0"> Total Amount
                                                                                <i className="rupee"> ` </i> {this.state.paying_amount}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-3">
                                                                    <button style={{ width: "8rem" }}

                                                                        className="btn btn-dark"
                                                                        onClick={() => this.payNow(this.state.paying_amount)}
                                                                        disabled={this.state.paying_amount == 0}
                                                                    >Pay Now</button>                                                                        </div>
                                                            </div>
                                                        </div>






                                                    </div>
                                                </div>
                                            </div>


                                            <div className="bg-white mb-4 p-4 loanTimeWrap">
                                                <div className="row">
                                                    <div className="col-lg-4 text-center mb-lg-0 mb-3">
                                                        <div className="mb-4 d-inline-flex align-items-center">
                                                            <div className="mr-3">
                                                                <img
                                                                    src={`${process.env.REACT_APP_ASSETS}images/3.png`}
                                                                    alt="user"
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <h5 className="font-weight-medium mb-0">
                                                                <em>
                                                                    Great
                                                                    <br />
                                                                    Month
                                                                </em>
                                                            </h5>
                                                        </div>
                                                        <h5>{this.state.streak} Months Streak</h5>
                                                        <p className="mb-0">
                                                            In publishing and graphic design In publishing and graphic design{" "}
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                            <div className="years d-flex align-items-center">
                                                                <button className="prev" onClick={() => {
                                                                    this.setState(this.setState({ year: this.state.year - 1 }))
                                                                    this.callMonthlyStrideApi(this.state.year - 1)
                                                                }
                                                                }>

                                                                    <i className="fa fa-angle-left" aria-hidden="true" />
                                                                </button>
                                                                <span>{this.state.year}</span>
                                                                <button className="next" onClick={() => {
                                                                    this.setState(this.setState({ year: this.state.year + 1 }))
                                                                    this.callMonthlyStrideApi(this.state.year + 1)
                                                                }
                                                                }>
                                                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                                                </button>
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

                                                                {
                                                                    strides && strides.map((key, index) =>

                                                                        <li key={index}>
                                                                            <div className={key.status + " month-box"}>
                                                                                <h2>{key.month}</h2>
                                                                                <span className="d-block position-absolute amount___">
                                                                                    <i className="rupee">`</i>{key.amount}
                                                                                </span>
                                                                            </div>
                                                                        </li>


                                                                    )

                                                                }


                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                <div className="row">
                                                    <div className="col">

                                                        <div
                                                            className="scroll-table loanTimeTable_wrap"
                                                            style={{ display: "none" }}
                                                        >
                                                            <table className="loanTimeTable">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Date</th>
                                                                        <th>Description</th>
                                                                        <th>Amount</th>
                                                                        <th className="text-right">Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {full_collection.length > 0 && full_collection.map((obj, index) =>
                                                                        <tr>
                                                                            <td>
                                                                                <span className="font-weight-medium">{obj.emi_paid_date__c && obj.emi_paid_date__c}</span>
                                                                                <span className="year_ d-block">2022</span>
                                                                            </td>
                                                                            <td>{obj.name && obj.name}</td>

                                                                            <td>
                                                                                <i className="rupee">`</i>{" "}
                                                                                <span className="font-weight-medium">{obj.payment_received && obj.payment_received}</span>
                                                                            </td>
                                                                            <td className="text-right">
                                                                                {obj.emi_status__c && obj.emi_status__c == 'Upcoming' ? <span className="unpaid">Unpaid</span>
                                                                                    : obj.emi_status__c == 'Overdue' ? <span className="late_pay">Unpaid</span>
                                                                                        : <span className="paid_">Paid</span>

                                                                                }

                                                                            </td>
                                                                        </tr>
                                                                    )}
                 
                                                                </tbody>
                                                            </table>
                                                        </div>

                                                        <div className="text-center">
                                                            <button className="ltt_toggle" onClick={this.ltt_toggle}>
                                                                <i className="fa fa-angle-down h4 arrow_down" aria-hidden="true" />
                                                                <i className="fa fa-angle-up h4 arrow_up" style={{ display: "none" }} aria-hidden="true" />

                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>




                                            <div className="note_ p-4 mrb200">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-9">
                                                        <div className="d-flex align-items-center">
                                                            <div className="mr-3">
                                                                <img
                                                                    src={`${process.env.REACT_APP_ASSETS}images/bulb.png`}
                                                                    alt="user"
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <p className="mb-0">
                                                                    When you use Stride, you save your expenses today that can be reinvested for better returns tomorrow!
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <button className="link font-weight-bold">Read More</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}

                                    </>
                                    :

                                    <>

                                        <div className='col-xl-4 col-lg-4 paymentLeft'>
                                            <div className=''>
                                                {/* <p className="font-weight-medium">Summery</p> */}

                                                {/* <div className="bg-white transaction-block p-4 mb-4">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <h5>Current Due</h5>
                                                            <h3><i className="rupee">`</i>{selected_item.emi_amt_paid && selected_item.emi_amt_paid}</h3>
                                                            <p>Due on {selected_item.next_emi_due && selected_item.next_emi_due}</p>
                                                        </div>
                                                        <div className="col-4">
                                                            {this.state.is_Autopay ?
                                                                <img src={asset + "images/dashboard/auto-pay.png"} alt="auto-img" className="img-fluid" />
                                                                :
                                                                <img src={asset + "images/autopay.png"} alt="auto-img" className="img-fluid" />
                                                            }
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div className="d-flex align-items-center at-dropdown" onClick={this.at_dropdown}>
                                                    <h5 className="mb-3 d-flex align-items-center mb-0">All Payments
                                                        <i className="fa fa-angle-down h4  mb-0 ml-2" aria-hidden="true"></i></h5>
                                                </div>


                                                <div className="transaction-block-wrap"
                                                // style={{ display: "none" }}
                                                >


                                                    <ALlPayment_sidebar
                                                        all_transactions={this.state.all_transactions}
                                                        selected_item={selected_item}
                                                        selectItem={this.selectItem}
                                                        user_credit_limit={this.state.user_credit_limit}

                                                    />
                                                </div>


                                            </div>
                                        </div>


                                        <div className='col-xl-8 col-lg-8'>
                                            <div className="d-flex justify-content-between">
                                                <p className="font-weight-medium">Loan Details</p>
                                                <p className="font-weight-medium">Loan ID: {selected_item.opp_id && selected_item.opp_id}</p>
                                            </div>

                                            <div className="bg-white loanDetailWrap p-4 mb-4">
                                                <div className="row">
                                                    <div className="col-lg-7">
                                                        <div className="row align-items-start">
                                                            <div className="col-lg-5">
                                                                <div className="pro-img_">
                                                                    <img src={selected_item.product_image_url && selected_item.product_image_url} alt="user" className="img-fluid" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-7 border-right">
                                                                <img src={selected_item.merchant_logo_url__c && selected_item.merchant_logo_url__c} alt="user" className="img-fluid" style={{ "width": "" }} />
                                                                <h4>{selected_item.product_name && selected_item.product_name}</h4>
                                                                <p>Due on {selected_item.next_emi_due && selected_item.next_emi_due}</p>
                                                                <h5 className="mb-4"><i className="rupee">`</i>{selected_item.emi_amt_paid && selected_item.emi_amt_paid}</h5>

                                                                <span className="status-confirmed">Order Status: {selected_item.status && selected_item.status}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-5 pl-lg-5">
                                                        {this.state.is_Autopay ?
                                                            <>
                                                                <img src={asset + "images/dashboard/auto-pay.png"} alt="auto-img" width="150" />
                                                                <p>{this.state.upcoming.amount} will be auto debited on {this.state.upcoming.month}, {new Date().getFullYear()}</p>

                                                                <p style={{ margin: "0" }}>Want to make an instant payment?</p>
                                                                <button className="link payNow" onClick={() => this.payNow(selected_item.emi_amt_paid && selected_item.emi_amt_paid)}>Pay Now</button>

                                                            </>
                                                            :
                                                            <>
                                                                <img src={asset + "images/autopay.png"} alt="auto-img" width="150" />
                                                                <p className="text-danger">
                                                                    Your Auto-Pay setup failed! </p>
                                                                <p style={{ margin: "0" }}> Try again to auto-debit your payments on due date.
                                                                </p>
                                                                <button className="link payNow" onClick={this.handleAutopay}>Set-up Auto-pay again</button>
                                                                <br />
                                                                <button style={{ width: "8rem" }} className="btn btn-dark" onClick={() => this.payNow(selected_item.emi_amt_paid && selected_item.emi_amt_paid)}>Pay Now</button>
                                                            </>

                                                        }
                                                    </div>
                                                </div>

                                                <hr></hr>

                                                <div className="d-flex justify-content-between">
                                                    <p>Total Loan Amount: <span className="font-weight-medium"><i className="rupee">`</i>{selected_item.emi_total_amt && selected_item.emi_total_amt}</span></p>
                                                    <p className="font-weight-medium">{selected_item.emis_paid && selected_item.emis_paid}/{selected_item.total_emis && selected_item.total_emis}</p>
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
                                                        <p className="font-weight-medium"><i className="rupee">`</i>{selected_item.emi_amt_paid && selected_item.emi_amt_paid}</p>
                                                    </div>

                                                    <div>
                                                        <p className="mb-0">Overdue Amount:</p>
                                                        <p className="font-weight-medium"><i className="rupee">`</i>{selected_item.emi_amt_due && selected_item.emi_amt_due}</p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="mb-0"><img src={asset + "images/icons/icon-ind2.png"} className="mr-2" />Outstanding Balance</p>
                                                        <p className="font-weight-medium"><i className="rupee">`</i>{selected_item.emi_amt_outstanding && selected_item.emi_amt_outstanding}</p>
                                                    </div>

                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <button className="dropdown-toggle ldt_toggle2 link" onClick={this.ldt_toggle2}>
                                                        Show Loan details
                                                    </button>

                                                    <div className="text-right">
                                                        <p className="mb-0">Powered by {selected_item_summery && selected_item_summery.lender_logo ? <img src={asset + "images/fullerton_india.png"} alt="user" className="img-fluid" style={{ "width": "" }} /> : selected_item_summery && selected_item_summery.lender_name && <span className="fw-bold fs-20">{selected_item_summery.lender_name} </span>} </p>
                                                    </div>

                                                </div>

                                                <div className="loanDetailTable2 mt-4" style={{ display: "none" }}>
                                                    <div className="row align-items-end">
                                                        <div className="col-lg-6">
                                                            <div className="row">
                                                                <div className="col-lg-4 mb-lg-0 mb-3">
                                                                    <span className="d-block">Due Today  <img src={asset + "images/icons/icon-ind2.png"} /></span>
                                                                    <span className="font-weight-medium"><i className="rupee">`</i>{selected_item.emi_amt_due && selected_item.emi_amt_due}</span>
                                                                </div>
                                                                <div className="col-lg-4 mb-lg-0 mb-3">
                                                                    <span className="d-block">Order date </span>
                                                                    <span className="font-weight-medium">{selected_item.created_at && selected_item.created_at}</span>
                                                                </div>

                                                                <div className="col-lg-4 mb-lg-0 mb-3">
                                                                    <span className="d-block">Interest (APR)</span>
                                                                    <span className="font-weight-medium">{selected_item_summery && selected_item_summery.interestrate ? selected_item_summery.interestrate : 0} %</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="row">
                                                                <div className="col-lg-4 mb-lg-0 mb-3">
                                                                    <p>Loan Agreement</p>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <button className="font-weight-medium link">View</button>
                                                                        <button><a href={`${process.env.REACT_APP_ASSETS}images/ABFL_Subvention_Agreement.pdf`} target="_blank"><i className="fa fa-arrow-circle-o-down fs-5" aria-hidden="true"></i></a></button>
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

                                            <div className="bg-white mb-4 p-4 loanTimeWrap2" >
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
                                                        <h5>{this.state.streak} Months Streak</h5>
                                                        <p className="mb-0">In publishing and graphic design In publishing and graphic design </p>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                                            <div className="years d-flex align-items-center">
                                                                <button className="prev" onClick={() => {
                                                                    this.setState(this.setState({ year: this.state.year - 1 }))
                                                                    this.callMonthlyStrideApi(this.state.year - 1)
                                                                }
                                                                }>

                                                                    <i className="fa fa-angle-left" aria-hidden="true" />
                                                                </button>
                                                                <span>{this.state.year}</span>
                                                                <button className="next" onClick={() => {
                                                                    this.setState(this.setState({ year: this.state.year + 1 }))
                                                                    this.callMonthlyStrideApi(this.state.year + 1)
                                                                }
                                                                }>
                                                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                                                </button>
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
                                                                {
                                                                    selected_item_summery && selected_item_summery.monthly_strides.length > 0 && selected_item_summery.monthly_strides.map((key, index) =>

                                                                        <li key={index}>
                                                                            <div className={key.status + " month-box"}>
                                                                                <h2>{key.month}</h2>
                                                                                <span className="d-block position-absolute amount___">
                                                                                    <i className="rupee">`</i>{key.amount}
                                                                                </span>
                                                                            </div>
                                                                        </li>


                                                                    )

                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="scroll-table loanTimeTable_wrap2"
                                                            style={{ display: "none" }}
                                                        >

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
                                                                    {selected_item && selected_item.emi_data && selected_item.emi_data.length > 0 ?

                                                                        selected_item.emi_data.map((ele, index) =>


                                                                            <tr key={index}>
                                                                                <td>
                                                                                    <span className="font-weight-medium">
                                                                                        {ele.due_date__c.substring(0, 10)}
                                                                                    </span>
                                                                                    {/* <span className="year_ d-bl{ele.due_date022</span> */}
                                                                                </td>
                                                                                <td>Bank Account****{userData && userData.bank_account_number__c && userData.bank_account_number__c.substring(userData.bank_account_number__c.length - 4)} <img src={asset + "images/icons/rupee.png"} style={{ "width": "12px" }} /></td>
                                                                                <td>{ele.utr_num}</td>
                                                                                <td><i className="rupee">`</i> <span className="font-weight-medium">{ele.payment_received}</span></td>
                                                                                <td className="text-right">

                                                                                    {ele.emi_status__c && ele.emi_status__c == 'Upcoming' ? <span className="unpaid">Unpaid</span>
                                                                                        : ele.emi_status__c == 'Overdue' ? <span className="late_pay">Unpaid</span>
                                                                                            : <span className="paid_">Paid</span>

                                                                                    }

                                                                                </td>
                                                                            </tr>

                                                                        )

                                                                        :
                                                                        <tr>
                                                                            <td colSpan='5' className="text-center">No details available</td>
                                                                        </tr>
                                                                    }


                                                                </tbody>

                                                            </table>
                                                        </div>
                                                        <div className="text-center">
                                                            <button className="ltt_toggle2" onClick={this.ltt_toggle2}>
                                                                <i className="fa fa-angle-down h4 arrow_down2" aria-hidden="true"></i>
                                                                <i className="fa fa-angle-up h4 arrow_up2" style={{ display: "none" }} aria-hidden="true" />
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
                                    </>


                            }



                        </div>





                    </div>
                </div>









                {/* ///////////////////////////////////////////////////////////////////////////// */}




                <div className="modal fade" id="payInitial" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content ">

                            <div className="modal-header">
                                <h4>Pay Now</h4>

                                <button type="button" className="close"
                                    data-dismiss="modal"
                                    id={'modal-close'}
                                    aria-label="Close"
                                >
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                <div className="filter_accordion_wrap">

                                    <div className="content row container mr-0 ml-0">








                                    </div>



                                </div>
                                <div className='text-right mt-3'>
                                    {/* {!this.state.isUpdating ?
                                        <button
                                            disabled={!this.state.validated}
                                            className={(this.state.validated) ? "apply-btn ml-3" : "apply-btn-disabled disabled ml-3"}
                                            onClick={() => {
                                                this.handleAddressAdd()

                                            }
                                            }>Save</button>
                                        :
                                        <button
                                            disabled={!this.state.validated}
                                            className={(this.state.validated) ? "apply-btn ml-3" : "apply-btn-disabled disabled ml-3"}
                                            onClick={() => {
                                                this.handleAddressUpdate()

                                            }}
                                        >Update</button>} */}
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
    const { profile, recentProd, userAddress, userId, userData } = state.user;
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
        userId,
        userData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        //   increment: () => dispatch({ type: 'INCREMENT' }),

    }
}

export default connect(mapStateToProps, null)(AllPayments);