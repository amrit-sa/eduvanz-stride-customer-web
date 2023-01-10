import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets"
import { getPreferred, addCard, getCards, payCards, payUpiId, payQrcode, payNetBanking, payWallets } from "../../actions/payment";
import { getAccountProfile, getBanks } from "../../actions/user";
import { getPlanById } from "../../actions/payment";
import { updatePreviousPath } from "../../actions/auth";

const btnStyle = {
    background: 'transparent',
    border: '2px solid #000000',
    color: '#000000'
}

class BankScreen12 extends Component {

    constructor() {
        super()
        this.state = {
            mobile: null,
            isvalid: true,
            qrCode: null,
            cardError: '',
            cards: [],
            photoFile: null,
            photoUrl: null,
            card_name: '',
            card_number: '',
            card_cvv: '',
            card_expiry: '',
            isSave: false,
            selectedBank: null,
            bank_code: null,
            isValidUpi: true,
            upiError: '',
            preferredType: '',
            preferredData: '',
            downpayment: '',
            REDIRECT_URL: null,
        }
        this.handleCardNumber = this.handleCardNumber.bind(this)
        this.onlyNumbers = this.onlyNumbers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleBankChange = this.handleBankChange.bind(this)
        this.handleUpi = this.handleUpi.bind(this)
        this.handleUpiChange = this.handleUpiChange.bind(this)
    }

    async componentDidMount() {
        const { dispatch, user, plan_id, history, sfid } = this.props
        if (!sfid) {
            const path = window.location.pathname;
            dispatch(updatePreviousPath(path));
            history.push("/login");
        }
        $('.p_m-tabs_content').eq(0).addClass('current');

        $('.p_m-tabs li').on('click', function () {
            var tab_id = $(this).attr('tabid');
            $('.p_m-tabs_content').fadeOut();
            console.log(tab_id);
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
            $("#" + tab_id).fadeIn();
        })
        $('.generateQR').click(function () {
            $('.generate_QR_code').removeClass('d-none');
            $('.UPI_form').addClass('d-none');
        });

        $('.back_btn').click(function () {
            $('.generate_QR_code').addClass('d-none');
            $('.UPI_form').removeClass('d-none');
        })

        $('.label input').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })

        $('.add_new_btn').click(function () {
            $(this).hide();
            $('.card_detail_form').fadeIn();
        });

        $('.bank_link_btn').click(function () {
            $(this).parent().parent().siblings('.bank_link_form').slideToggle();
        });
        this.handleCardFetch();
        let data = {
            user_sfid: sfid
        }
        let objData = {
            user_sfid: sfid
        }
        dispatch(getBanks());
        dispatch(getAccountProfile(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ mobile: response.accountDet.phone });
            }
        });
        dispatch(getPreferred(objData)).then((response) => {
            if (response.status === "success") {
                let getObj = response.data;
                this.setState({ preferredType: getObj.type, preferredData: getObj.data });
            }
        });

        let obj = {
            plan_id: plan_id
        }
        await dispatch(getPlanById(obj)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                console.log("downpayment", getData.down_payment__c);
                this.setState({ downpayment: getData.down_payment__c ? getData.down_payment__c : 0 })
            }
        });

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            const redirectUrl = process.env.REACT_APP_USER_DEV_PAYMENT_URL;
            this.setState({ REDIRECT_URL: redirectUrl });
        } else {
            const redirectUrl = process.env.REACT_APP_USER_LIVE_PAYMENT_URL;
            this.setState({ REDIRECT_URL: redirectUrl });
        }

    }

    handleAddCard = () => {
        this.setState({
            cardError: null,
            isvalid: true,
            card_cvv: '',
            card_expiry: '',
            card_name: '',
            card_number: ''
        })
    }

    handleCardNumber = (e) => {
        var cardNo = e.target.value;
        var masterCardRegex = /^(?:5[1-5][0-9]{14})$/;
        var visaCardRegex = /^(?:4[0-9]{12})(?:[0-9]{3})$/;
        var americanExpCardRegex = /^(?:3[47][0-9]{13})$/;
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (cardNo) {
            if (pattern.test(e.target.value)) {
                var cardName = "";
                if (masterCardRegex.test(cardNo)) {
                    cardName = "Master Card";
                } else if (visaCardRegex.test(cardNo)) {
                    cardName = "Visa Card";
                } else if (americanExpCardRegex.test(cardNo)) {
                    cardName = "American Express Card";
                }
                if (!cardName) {
                    this.setState({ isvalid: false, cardError: 'Enter valid card number' });
                } else {
                    this.setState({ isvalid: true, cardError: '' });
                }
                this.setState({ card_number: cardNo });
            } else {
                this.setState({ isvalid: false, cardError: 'Enter valid card number', card_number: '' });
            }
        } else {
            this.setState({ isvalid: true, cardError: '', card_number: cardNo });
        }
    }

    handleCardSubmit = () => {
        const { dispatch, sfid } = this.props
        const { card_cvv, card_expiry, card_name, card_number } = this.state
        let data = {
            card_number: card_number,
            card_name: card_name,
            card_expiry: card_expiry,
            card_cvv: card_cvv,
            isSaved: false,
            user_sfid: sfid
        }
        dispatch(addCard(data)).then((response) => {
            if (response.status === "success") {
                $('.card_detail_form').hide();
                $('.add_new_btn').fadeIn();
                this.handleCardFetch();
            }
        });
    }

    handleCardFetch = () => {
        const { dispatch, sfid } = this.props
        let data = {
            user_sfid: sfid
        }
        dispatch(getCards(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ cards: response.data });
            }
        });
    }

    onlyNumbers = (e) => {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (pattern.test(e.target.value)) {
            if (pattern.test(e.target.value)) {
                this.setState({ [e.target.name]: e.target.value })
            }
        } else {
            this.setState({ [e.target.name]: '' })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, })
    }

    handleCheckbox = () => {
        let save = true;
        if(this.state.isSave)
        {
            save = false;
        }
        this.setState({isSave: save});
    }

    handleBankChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, bank_code: e.target.code })
    }

    handleClearCard = () => {
        this.setState({ isvalid: true, cardError: '', card_number: '' })
    }

    renderCards = (cards) => {
        var masterCardRegex = /^(?:5[1-5][0-9]{14})$/;
        var visaCardRegex = /^(?:4[0-9]{12})(?:[0-9]{3})$/;
        var americanExpCardRegex = /^(?:3[47][0-9]{13})$/;
        let row = [];
        cards.map((items, index) => {
            let type = 0;
            let cNo = parseInt(items.card_number__c);
            if (masterCardRegex.test(cNo)) {
                type = 1; // "Master Card";
            } else if (visaCardRegex.test(cNo)) {
                type = 2; //"Visa Card";
            } else if (americanExpCardRegex.test(cNo)) {
                type = 3; //"American Express Card";
            }
            let cardNo = this.replaceMiddle(cNo);
            let inpuName = `cvv_${index}`;
            row.push(
                <div className='pp-info border py-3 py-lg-4 px-lg-5 px-3 mt-3 mb-4 rounded-lg' key={`dcard-${index}`}>
                    <div className='pp_info_row d-flex flex-wrap mb-4' >
                        <div className='left'>
                            <span><img src={`${asset}images/${type === 1 ? "mastercard2x.png" : type === 2 ? "visa.png" : type === 3 ? "ae.png" : "rupay.png"}`} alt="mc" /></span>
                        </div>
                        <div className='right'>
                            <p className='m-0 cn'>{cardNo}</p>
                            <p className='m-0 ed'>CREDIT CARD | VALID TILL {items.card_expiry__c}</p>
                        </div>
                    </div>
                    <div className='pp_info_row d-flex flex-wrap'>
                        <div className='left'>
                            <input type="text" maxLength={3} name={inpuName} className='cvv-input' value={this.state[inpuName] ? this.state[inpuName] : ''} placeholder='CVV' onChange={this.onlyNumbers} />
                        </div>
                        <div className='right'>
                            <div style={{ cursor: 'pointer' }} onClick={() => this.handleCardPay(inpuName, items, 10)} disabled={this.state[inpuName] && this.state[inpuName].length === 3 ? false : true} className={`${this.state[inpuName] && this.state[inpuName].length === 3 ? "emi-amount" : ""} d-flex align-items-center justify-content-center`}>Pay <i className='rupee'>`</i>{this.state.downpayment ? this.state.downpayment.toLocaleString('en-IN') : ''}</div>
                        </div>
                    </div>
                </div>
            );
        });
        return row;
    }

    renderPrefferedCards = (items) => {
        var masterCardRegex = /^(?:5[1-5][0-9]{14})$/;
        var visaCardRegex = /^(?:4[0-9]{12})(?:[0-9]{3})$/;
        var americanExpCardRegex = /^(?:3[47][0-9]{13})$/;
        let row = [];
        let type = 0;
        let cNo = parseInt(items.card_number__c);
        if (masterCardRegex.test(cNo)) {
            type = 1; // "Master Card";
        } else if (visaCardRegex.test(cNo)) {
            type = 2; //"Visa Card";
        } else if (americanExpCardRegex.test(cNo)) {
            type = 3; //"American Express Card";
        }
        let cardNo = this.replaceMiddle(cNo);
        let inpuName = `cvv_p1`;
        row.push(
            <div className='pp-info border py-3 py-lg-4 px-lg-5 px-3 mt-3 mb-4 rounded-lg' key={`dcard-p1`}>
                <div className='pp_info_row d-flex flex-wrap mb-4' >
                    <div className='left'>
                        <span><img src={`${asset}images/${type === 1 ? "mastercard2x.png" : type === 2 ? "visa.png" : type === 3 ? "ae.png" : "rupay.png"}`} alt="mc" /></span>
                    </div>
                    <div className='right'>
                        <p className='m-0 cn'>{cardNo}</p>
                        <p className='m-0 ed'>CREDIT CARD | VALID TILL {items.card_expiry__c}</p>
                    </div>
                </div>
                <div className='pp_info_row d-flex flex-wrap'>
                    <div className='left'>
                        <input type="text" maxLength={3} name={inpuName} className='cvv-input' value={this.state[inpuName] ? this.state[inpuName] : ''} placeholder='CVV' onChange={this.onlyNumbers} />
                    </div>
                    <div className='right'>
                        <div style={{ cursor: 'pointer' }} onClick={() => this.handleCardPay(inpuName, items, 10)} disabled={this.state[inpuName] && this.state[inpuName].length === 3 ? false : true} className={`${this.state[inpuName] && this.state[inpuName].length === 3 ? "emi-amount" : ""} d-flex align-items-center justify-content-center`}>Pay <i className='rupee'>`</i>{this.state.downpayment ? this.state.downpayment.toLocaleString('en-IN') : ''}</div>
                    </div>
                </div>
            </div>
        );
        return row;
    }

    handleEnterCvv = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleUpiChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, isValidUpi: true, upiError: '' });
    }

    handleUpi = (upi) => {
        /* const match = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;
        let isValid = false;
        if(upi)
        {
            if(match.test(upi))
            { 
                isValid = true;
                this.setState({isValidUpi : true, upiError:'' });
            }else{
                isValid = false;
                this.setState({isValidUpi : false, upiError:'Enter valid upi id' });
            }
        }else{
            isValid = false;
            this.setState({isValidUpi : false, upiError:'Enter valid upi id' });
        } */
        return true;
    }

    handleBankSelect = (item) => {
        this.setState({ selectedBank: item.bank_id, bank_code: item.bank_code });
    }

    handleCardPay = (name, getData, amount) => {
        const { dispatch, sfid } = this.props
        let data = {
            user_sfid: sfid,
            card_id: getData.id,
            cvv: this.state[name],
            amount: this.state.downpayment,
            return_url: this.state.REDIRECT_URL
        }
        dispatch(payCards(data)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                window.location.replace(getData.data.url);
            } else {
                alert(response.message);
            }
        });
    }

    handleUpiPay = async () => {
        const { dispatch, sfid } = this.props
        let isValidUpi = await this.handleUpi();
        if (isValidUpi) {
            let data = {
                user_sfid: sfid,
                upi_id: this.state.upiId,
                amount: this.state.downpayment,
                return_url: this.state.REDIRECT_URL
            }
            dispatch(payUpiId(data)).then((response) => {
                console.log("response", response);
                if (response.status === "success") {
                    let getData = response.data;
                    //   window.location.replace(getData.data.url);
                } else {
                    alert(response.message);
                }
            });
        }

    }

    handleUpiQrcode = async () => {
        const { dispatch, sfid } = this.props
        let data = {
            user_sfid: sfid,
            amount: this.state.downpayment,
            return_url: this.state.REDIRECT_URL
        }
        dispatch(payQrcode(data)).then((response) => {
            console.log("response", response);
            if (response.status === "success") {
                const getData = response.data;
                const qrData = getData && getData.data ? getData.data : null;
                const qrPayload = qrData && qrData.payload ? qrData.payload : null;
                if (qrPayload && qrPayload.qrcode) {
                    this.setState({ qrCode: qrPayload.qrcode });
                    $('.generate_QR_code').removeClass('d-none');
                    $('.UPI_form').addClass('d-none');
                }
            } else {
                alert(response.message);
            }
        });
    }

    handleWallet = (provider) => {
        const { dispatch, user } = this.props
        let data = {
            id: user,
            amount: this.state.downpayment,
            provider: provider,
            mobile: this.state.mobile,
            return_url: this.state.REDIRECT_URL
        }
        dispatch(payWallets(data)).then((response) => {
            console.log("response", response);
            if (response.status === "success") {

            } else {
                alert(response.message);
            }
        });
    }

    handleNetBank = () => {
        const { dispatch, sfid } = this.props
        let data = {
            user_sfid: sfid,
            amount: this.state.downpayment,
            bank_code: "3009",
            return_url: this.state.REDIRECT_URL
        }
        dispatch(payNetBanking(data)).then((response) => {
            console.log("response", response);
            if (response.status === "success") {
                let getData = response.data;
                window.location.replace(getData.data.url);
            } else {
                alert(response.message);
            }
        });
    }

    renderBanks = (banks, selectedBank) => {
        let row = [];
        banks.map((items, index) => {
            row.push(
                <li onClick={() => this.handleBankSelect(items)} key={`bank-${index}`} className={`bank d-flex align-items-center justify-content-center flex-column cursor-point ${items.bank_id === selectedBank ? "active" : ""}`}>
                    <div className='bank_logo'>
                        <img src={items.bank_icon} alt="icon-ind2" className='img-fluid' />
                    </div>
                    <p className='bank_name text-uppercase m-0 mt-3'>{items.bank_name}</p>
                </li>
            );
        });
        return row;
    }

    replaceMiddle(string) {
        return string.toString().replace(/^(\+?[\d]{4})\d+(\d{4})$/g, "$1-XXXXXX-$2");
    }

    handleBack = () => {
        const { plan_id, product_id } = this.props
        window.location = `edplan_details/${product_id}/${plan_id}`;
    }

    render() {
        const { isLoading, banks, user } = this.props
        const { cards, selectedBank, preferredType, preferredData } = this.state
        const renderCards = this.renderCards(cards);
        const renderBanks = this.renderBanks(banks, selectedBank);
        return (
            <>
                <Helmet>
                    <title>Eduvanz Payment</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <Header
                    user={user}
                />
                <section className="kyc_pages bank_screen">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='d-flex align-items-center'>
                                    <button onClick={() => this.props.history.goBack()} type='button' className='back-btn rounded-circle mr-3 mr-lg-4'>
                                        back
                                    </button>
                                    <h2 className="back-btn-text m-0">Choose payment method</h2>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-sm-12'>
                                <div className='w-100 l-a-r'>
                                    <div className='row align-items-center'>
                                        <div className='col-lg-3'>
                                            <h4 className='total-loan-amount m-0'>Amount: <i className='rupee'>`</i>{this.state.downpayment ? this.state.downpayment.toLocaleString('en-IN') : '20,000'}</h4>
                                        </div>
                                        <div className='col-lg-1'><div className='s-l'></div></div>
                                        <div className='col-lg-8'>
                                            <div className='row'>
                                                <div className='col-md-5 col-lg-6'>
                                                    <p className='m-0 loan-id mb-3 mb-md-0'>Transaction ID: 24982498249</p>
                                                </div>
                                                <div className='col-md-7 col-lg-6'>
                                                    <p className='m-0 loan-id text-right'>Merchant: Eduvanz Financing Pvt Ltd.</p>
                                                </div>
                                            </div>
                                        </div>
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
                                <div className='w-100 mb-5 c_p_m_b'>
                                    <div className='row mt-4'>
                                        <div className='col-lg-5 pr-lg-0'>
                                            <div className='payment-method-tabs'>
                                                <ul className='list-unstyled p_m-tabs m-0'>
                                                    <li className='active' tabid="1"><span className='pp'></span> Preferred Payment</li>
                                                    <li tabid="2"><span className='upi'></span> UPI</li>
                                                    <li tabid="3"><span className='dc'></span> Debit card</li>
                                                    <li tabid="4"><span className='nb'></span> Netbanking</li>
                                                    <li tabid="5"><span className='wlt'></span> Wallets</li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div className='col-lg-7 pl-lg-0'>
                                            <div className='position-relative p_m-tabs_content_wrapper'>
                                                <div className='p_m-tabs_content' id="1">
                                                    <div className='d-flex align-items-center flex-wrap'>
                                                        <p className='m-0 wa-txt mr-4'>We Accept</p>
                                                        <div className='d-flex align-items-center flex-wrap'>
                                                            <span className='d-inline-block mr-3'><img src={asset + "images/visa.png"} alt="visa" /></span>
                                                            <span><img src={asset + "images/master_card.png"} alt="master_card" /></span>
                                                            <span><img src={asset + "images/ae.png"} alt="ae" /></span>
                                                            <span><img src={asset + "images/rupay.png"} alt="rupay" /></span>
                                                        </div>
                                                    </div>
                                                    {preferredType && preferredType === "Card" ? (
                                                       this.renderPrefferedCards(preferredData)
                                                    ) : preferredType === "UPI" ? (
                                                        <div className='vpa'>
                                                            <div className='vpa-info'>
                                                                <h4>Pay via saved VPA</h4>
                                                                <p>Choose your registered VPA to pay</p>
                                                            </div>
                                                            <div className='d-flex flex-wrap'>
                                                                <div className='vpa-form mr-lg-4'>
                                                                    <label>Enter UPI ID</label>
                                                                    <input type="text" value={this.state.upiId ? this.state.upiId : ''} name="upiId" maxLength={18} onChange={this.handleUpiChange} placeholder='9004581373@ybl' />
                                                                    {this.state.upiId && this.state.isValidUpi === false && this.state.upiError !== '' && (
                                                                        <span style={{ color: 'red' }}>Enter valid Upi id</span>
                                                                    )}
                                                                </div>
                                                                <div className='pay-btn-wrapper mt-3 mt-lg-0'>
                                                                    <button type='button' disabled={this.state.upiId ? false : true} onClick={this.handleUpiPay} className='pay-btn'>Pay</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : preferredType === "Net banking" ? (
                                                        <>
                                                            <ul className='list-unstyled m-0 bank_list d-flex flex-wrap mt-4'>
                                                                {renderBanks}
                                                            </ul>
                                                            <div className='other-bank position-relative mb-4'>
                                                                <select name='selectedBank' value={selectedBank ? selectedBank : ''} onChange={this.handleBankChange}>
                                                                    <option value="">Other bank</option>
                                                                    {banks && banks.length > 0 && banks.map((items, index) => (
                                                                        <option value={items.bank_id} code={items.bank_code} key={`bank-options-${index}`}>{items.bank_name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <button type='button' onClick={this.handleNetBank} disabled={selectedBank ? false : true} className={`${selectedBank ? "pay-btn" : ""} w263`} >Select &amp; Pay</button>
                                                            </div>
                                                        </>
                                                    ) : ('')}

                                                </div>
                                                <div className='p_m-tabs_content' id="2">
                                                    <div className='UPI_form mt-4'>
                                                        <div className='d-flex flex-wrap flex-lg-nowrap align-items-start'>
                                                            <span className='d-inline-block mr-3  mb-3 mb-lg-0'><img src={asset + "images/upi.png"} alt="upi" /></span>
                                                            <div className='mr-3'>
                                                                <p>Transfer money from your bank account using UPI with your registered VPA</p>
                                                            </div>
                                                            <button className='h-i-w-btn' data-toggle="modal"
                                                                data-target="#howItWork">How it works</button>
                                                        </div>
                                                        <div className='d-flex align-items-center flex-wrap'>
                                                            <p className='m-0 wa-txt mr-4'>We Accept</p>
                                                            <div className='d-flex align-items-center flex-wrap'>
                                                                <span className='d-inline-block mr-3'><img src={asset + "images/gpay.png"} alt="gpay" /></span>
                                                                <span className='d-inline-block mr-3'><img src={asset + "images/bhim.png"} alt="bhim" /></span>
                                                                <span className='d-inline-block mr-3'><img src={asset + "images/phonepay.png"} alt="phonepay" /></span>
                                                                <span><img src={asset + "images/paytm.png"} alt="paytm" /></span>
                                                            </div>
                                                        </div>

                                                        <div className='border-line2 my-4'></div>

                                                        <div className='vpa'>
                                                            <div className='vpa-info'>
                                                                <h4>Pay via saved VPA</h4>
                                                                <p>Choose your registered VPA to pay</p>
                                                            </div>
                                                            <div className='d-flex flex-wrap'>
                                                                <div className='vpa-form mr-lg-4'>
                                                                    <label>Enter UPI ID</label>
                                                                    <input type="text" value={this.state.upiId ? this.state.upiId : ''} name="upiId" maxLength={18} onChange={this.handleUpiChange} placeholder='9004581373@ybl' />
                                                                    {this.state.upiId && this.state.isValidUpi === false && this.state.upiError !== '' && (
                                                                        <span style={{ color: 'red' }}>Enter valid Upi id</span>
                                                                    )}
                                                                </div>
                                                                <div className='pay-btn-wrapper mt-3 mt-lg-0'>
                                                                    <button type='button' disabled={this.state.upiId ? false : true} onClick={this.handleUpiPay} className='pay-btn'>Pay</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='border-line2 my-4'></div>

                                                        <div>
                                                            <div className='row'>
                                                                <div className='col-md-6'>
                                                                    <h4>Scan QR</h4>
                                                                    <p>Scan the QR using any UPI app on your mobile phone like PhonePe, Paytm, GooglePay, BHIM, etc</p>
                                                                </div>
                                                                <div className='col-md-6 d-flex justify-content-lg-end'>
                                                                    <span><img src={asset + "images/qr-code.png"} alt="qr-code" /></span>
                                                                </div>
                                                            </div>
                                                            <div className='d-flex justify-content-lg-end justify-content-start mt-3 mt-lg-0'>
                                                                <button type='button' onClick={this.handleUpiQrcode} className='pay-btn'>Generate QR Code</button>
                                                            </div>
                                                        </div>

                                                        <div className='border-line2 my-4'></div>

                                                        <div className='vpa'>
                                                            <div className='vpa-info'>
                                                                <h4>Pay via new VPA</h4>
                                                                <p>You must have a Virtual Payment Address</p>
                                                            </div>
                                                            <div className='d-flex flex-wrap'>
                                                                <div className='vpa-form mr-lg-4'>
                                                                    <input type="text" className='mt-4' placeholder='Enter your UPI ID' />
                                                                </div>
                                                                <div className='pay-btn-wrapper mt-3 mt-lg-0'>
                                                                    <button type='button' className='pay-btn'>Verify and pay</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='vpa-save-check mt-4'>
                                                            <div className="custom-control custom-checkbox mr-sm-2">
                                                                <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                                                <label className="custom-control-label" htmlFor="customControlAutosizing"> Securely save this VPA for a faster checkout next time.</label>
                                                            </div>


                                                            <div>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className='generate_QR_code d-none'>
                                                        <div>
                                                            <button className='d-flex align-items-center back_btn'><img src={asset + "images/icons/back-btn.png"} alt="back-btn" className='img-fluid mr-2' /> Back
                                                            </button>
                                                        </div>
                                                        {this.state.qrCode && (
                                                            <div className='text-center'>
                                                                <span className='d-inline-block'>
                                                                    <img src={this.state.qrCode} alt="QR_code" className='img-fluid' />
                                                                </span>
                                                            </div>
                                                        )}
                                                        <h4 className='text-center'>Scan QR and Pay</h4>
                                                        <div className='mt-4'>
                                                            <div className='d-flex align-items-center flex-wrap justify-content-center'>
                                                                <span className='d-inline-block mr-3'><img src={asset + "images/gpay.png"} alt="gpay" /></span>
                                                                <span className='d-inline-block mr-3'><img src={asset + "images/bhim.png"} alt="bhim" /></span>
                                                                <span className='d-inline-block mr-3'><img src={asset + "images/phonepay.png"} alt="phonepay" /></span>
                                                                <span><img src={asset + "images/paytm.png"} alt="paytm" /></span>
                                                            </div>
                                                        </div>
                                                        <div className='mt-4'>
                                                            <p className='text-center'>Scan the QR using any UPI app on your mobile phone like PhonePe, Paytm, GooglePay, BHIM, etc</p>
                                                        </div>

                                                        <div className='mt-3'>
                                                            <div className='position-relative progress_bar_wrapper m-auto'>
                                                                <div className='time_progress_bar' style={{ "width": "60%" }}>
                                                                </div>
                                                                <div className='progress_bar'></div>
                                                            </div>
                                                            <p className='text-center mt-3'>Time Remaining 06:15</p>
                                                        </div>
                                                    </div>
                                                </div>





                                                <div className='p_m-tabs_content' id="3">
                                                    <div className='d-flex align-items-center flex-wrap'>
                                                        <p className='m-0 wa-txt mr-4'>We Accept</p>
                                                        <div className='d-flex align-items-center flex-wrap'>
                                                            <span className='d-inline-block mr-3'><img src={asset + "images/visa.png"} alt="visa" /></span>
                                                            <span><img src={asset + "images/master_card.png"} alt="master_card" /></span>
                                                            <span><img src={asset + "images/ae.png"} alt="ae" /></span>
                                                            <span><img src={asset + "images/rupay.png"} alt="rupay" /></span>
                                                        </div>
                                                    </div>
                                                    {renderCards}
                                                    <div className='d-flex align-items-start'>
                                                        <div className='plus mr-3'>
                                                            <img src={asset + "images/icons/plus.png"} alt="plus" className='img-fluid' />
                                                        </div>
                                                        <div>
                                                            <h5 className='mb-1 header-cart-total'>Add New Card</h5>
                                                            <p className='s_pc_txt'>Save and pay via cards</p>
                                                            <button type="button" onClick={this.handleAddCard} className='btn_ add_new_btn'>Add new</button>
                                                        </div>
                                                    </div>

                                                    <div className='mt-lg-5 mt-4 card_detail_form'>
                                                        <h5 className='mb-4'>Enter card details</h5>
                                                        <div className='card_detail_form'>
                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <div className='label'>
                                                                        <input
                                                                            type="text"
                                                                            maxLength={16}
                                                                            name='card_number'
                                                                            value={this.state.card_number}
                                                                            onChange={this.handleCardNumber}
                                                                            placeholder='' />
                                                                        <span>Card Number</span>
                                                                        {this.state.isvalid === false && this.state.cardError !== '' && (
                                                                            <>
                                                                                <p className='error-msg_ m-0'>Enter valid number</p>
                                                                                <button onClick={this.handleClearCard} className='error-close'>
                                                                                    <img src={asset + "images/icons/red-close.png"} alt="close" className='img-fluid' />
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <div className='label'>
                                                                        <input
                                                                            type="text"
                                                                            name='card_name'
                                                                            value={this.state.card_name}
                                                                            onChange={this.handleChange}
                                                                            placeholder='' />
                                                                        <span>Name of the card</span>
                                                                        {/*   <p className='error-msg_ m-0'>Enter valid name</p>
                                                                <button className='error-close'>
                                                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                                                </button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-lg-6'>
                                                                    <div className='label'>
                                                                        <input
                                                                            type="type"
                                                                            datatype="DD MM"
                                                                            name='card_expiry'
                                                                            value={this.state.card_expiry}
                                                                            onChange={this.onlyNumbers}
                                                                            maxLength={4}
                                                                            placeholder=''
                                                                        />
                                                                        <span>Expiry Date (MM/YY)</span>
                                                                        {/*   <p className='error-msg_ m-0'>Enter valid number</p>
                                                                <button className='error-close'>
                                                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                                                </button> */}
                                                                    </div>
                                                                </div>
                                                                <div className='col-lg-6'>
                                                                    <div className='label'>
                                                                        <input
                                                                            type="password"
                                                                            name='card_cvv'
                                                                            value={this.state.card_cvv}
                                                                            onChange={this.onlyNumbers}
                                                                            maxLength={3}
                                                                            placeholder='' />
                                                                        <span>CVV</span>
                                                                        {/*  <p className='error-msg_ m-0'>Enter valid number</p>
                                                                <button className='error-close'>
                                                                <img src={asset+"images/icons/red-close.png"} alt="close" className='img-fluid'/>
                                                                </button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='vpa-save-check mb-4'>
                                                                <div className="custom-control custom-checkbox mr-sm-2">
                                                                    <input type="checkbox" className="custom-control-input" id="customControlAutosizing2" onChange={this.handleCheckbox} />
                                                                    <label className="custom-control-label" name={"isSave"} defaultChecked={this.state.isSave} htmlFor="customControlAutosizing2"> Securely save this card for a faster checkout next time.</label>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    className="pay-btn w263"
                                                                    onClick={this.handleCardSubmit}
                                                                    style={this.state.isSave && this.state.card_cvv.length ===3 && this.state.card_expiry && this.state.card_name && this.state.card_number && this.state.isvalid ? {} : btnStyle}
                                                                    disabled={this.state.isSave && this.state.card_cvv.length ===3 && this.state.card_expiry && this.state.card_name && this.state.card_number && this.state.isvalid ? false : true}
                                                                >Proceed &amp; Pay</button></div>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className='p_m-tabs_content' id="4">
                                                    <ul className='list-unstyled m-0 bank_list d-flex flex-wrap mt-4'>
                                                        {renderBanks}
                                                    </ul>
                                                    <div className='other-bank position-relative mb-4'>
                                                        <select name='selectedBank' value={selectedBank ? selectedBank : ''} onChange={this.handleBankChange}>
                                                            <option value="">Other bank</option>
                                                            {banks && banks.length > 0 && banks.map((items, index) => (
                                                                <option value={items.bank_id} code={items.bank_code} key={`bank-options-${index}`}>{items.bank_name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <button type='button' onClick={this.handleNetBank} disabled={selectedBank ? false : true} className={`${selectedBank ? "pay-btn" : ""} w263`} >Select &amp; Pay</button>
                                                    </div>
                                                </div>
                                                <div className='p_m-tabs_content' id="5">
                                                    <div className='row walet_box align-items-center mb-4'>
                                                        <div className='col-sm-6'>
                                                            <div className='p-3'>
                                                                <img src={asset + "images/walet-icon/amazon-pay.png"} alt="amazon-pay2" className='img-fluid' />
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-6 d-flex justify-content-end'>
                                                            <div className='p-3'>
                                                                <div style={{ cursor: 'pointer' }} onClick={() => this.handleWallet("amazon")} className="emi-amount d-flex align-items-center justify-content-center">Pay <i className="rupee">`</i> 20,000</div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {/*  */}
                                                    <div className='row walet_box align-items-center mb-4'>
                                                        <div className='col-6'>
                                                            <div className='px-2 py-3'>
                                                                <img src={asset + "images/walet-icon/phonepe.png"} alt="phonepe" className='img-fluid' />
                                                            </div>
                                                        </div>
                                                        <div className='col-6 d-flex justify-content-end'>
                                                            <div className='p-3'>
                                                                <button className='h-i-w-btn bank_link_btn'>Link account</button>
                                                            </div>
                                                        </div>
                                                        <div className='bank_link_form w-100'>
                                                            <h4 className='px-4 mtext-108'>PhonePe (Wallet/UPI/Cards</h4>
                                                            <div className='hr-line my-4'></div>
                                                            <p className='px-4 mtext-101'>Proceed to link PhonePe wallet with your number:</p>
                                                            <h4 className='px-4 mb-3 mtext-108'>{this.state.mobile}</h4>
                                                            <div className='d-flex px-4 mb-3'>
                                                                <button type='button' className='btn_ mr-2'>Cancel</button>
                                                                <button type='button' onClick={() => this.handleWallet("phonepe")} className='btn_ black'>Continue</button>
                                                            </div>
                                                            <p className='px-4 stext-102'>*If you don’t have a PhonePe account, we’ll help you create one.</p>
                                                        </div>
                                                    </div>
                                                    {/*  */}
                                                    <div className='row walet_box align-items-center mb-4'>
                                                        <div className='col-6'>
                                                            <div className='px-2 py-3'>
                                                                <img src={asset + "images/walet-icon/paytm.png"} alt="paytm2" className='img-fluid' />
                                                            </div>
                                                        </div>
                                                        <div className='col-6 d-flex justify-content-end'>
                                                            <div className='p-3'>
                                                                <button className='h-i-w-btn bank_link_btn'>Link account</button>
                                                            </div>
                                                        </div>
                                                        <div className='bank_link_form'>
                                                            <p className='px-4'>Form goes here</p>
                                                        </div>
                                                    </div>
                                                    {/*  */}
                                                    <div className='row walet_box align-items-center mb-4'>
                                                        <div className='col-6'>
                                                            <div className='px-2 py-3'>
                                                                <img src={asset + "images/walet-icon/free-charge.png"} alt="free-charge" className='img-fluid' />
                                                            </div>
                                                        </div>
                                                        <div className='col-6 d-flex justify-content-end'>
                                                            <div className='p-3'>
                                                                <button className='h-i-w-btn bank_link_btn'>Link account</button>
                                                            </div>
                                                        </div>
                                                        <div className='bank_link_form'>
                                                            <p className='px-4'>Form goes here</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='row'>
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

                {/* how it work modal */}
                <div className="modal fade" id="howItWork" tabIndex="-1" role="dialog" aria-labelledby="howItWorkTitle" aria-hidden="true">
                    <div className="modal-dialog howItWorkModal modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">How UPI Works?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body p-4">
                                <div className='row mb-4'>
                                    <div className='col-lg-2 col-sm-3'>
                                        <div className='bullet_icon_circle'>
                                            <img src={asset + "images/icons/smartphone.png"} className='img-fluid' alt="smartphone" /></div>
                                    </div>
                                    <div className='col-lg-10 col-sm-9 pl-0'>
                                        <p className='m-0 arg-txt'>
                                            Open UPI linked app on your phone or tap on the notification received for the same in sms
                                        </p>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-lg-2 col-sm-3'>
                                        <div className='bullet_icon_circle'>
                                            <img src={asset + "images/icons/app_icon.png"} className='img-fluid' alt="app_icon" /></div>
                                    </div>
                                    <div className='col-lg-10 col-sm-9 pl-0'>
                                        <p className='m-0 arg-txt'>
                                            Check the collect request from eduvanz in pending transaction in linked UPI app
                                        </p>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-lg-2 col-sm-3'>
                                        <div className='bullet_icon_circle'>
                                            <img src={asset + "images/icons/gree_tick.png"} className='img-fluid' alt="gree_tick" /></div>
                                    </div>
                                    <div className='col-lg-10 col-sm-9 pl-0'>
                                        <p className='m-0 arg-txt'>
                                            Complete the payment by accepting the request and entering UPI pin
                                        </p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <button className='continue-btn w-100' data-dismiss="modal" aria-label="Close">Okay, Got it</button>
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

function mapStateToProps(state) {
    const { banks } = state.user;
    const { salesForceToken, user, isLoading, sfid } = state.auth;
    return {
        salesForceToken,
        banks,
        sfid,
        user,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen12)