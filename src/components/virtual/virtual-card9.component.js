import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import HeaderNew from "../../common/headerNew";
import { openVirtualCardModel } from "../../actions/model";
import { getStore } from "../../actions/product";
import { getVCard, generateVCard, shareVcard, cancelCard, getActiveCards } from "../../actions/payment"
import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { asset } from '../../common/assets';
import SocialShare from '../SocialShare';
class VirtualCard9 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null,
            cardData: null,
            cardUrl: null,
            havecard: true,
            cardNumber: null,
            vCardNumber: null,
            expiryDate: null,
            isShowCvv: false,
            cardDate: null,
            loanAmount: null,
            downPayment: null,
            shareCard: false,
            cvv: null,
            isTimerStart: false,
            hours: '',
            mins: '',
            sec: '', cardId: "", closedModal: "modal",
            modalClose: false,
            store: {
                data: []
            },
            activeCards: {
                data: []
            }
        }
    }

    async componentDidMount() {
        const { user } = this.props
        let user_sfid = localStorage.getItem("sfid")
        this.props.dispatch(getStore(false));
        this.getVirtualCard();
        this.props.dispatch(getActiveCards({ user_sfid })).then(res => {
            if (res.status == 'success') {
                this.setState({ activeCards: res })
            }
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        console.log('this.state.modalClosethis.state.modalClose', prevState.modalClose, this.state.modalClose)
        if (prevState.modalClose != this.state.modalClose) {
            this.setState({ closedModal: "modal" })
        }
        if (prevProps.store !== this.props.store) {

            this.setState({ store: this.props.store }, () => {
                console.log('storestorestore', JSON.stringify(this.state.store.data))
                let storeToShow = []
                this.state.store && this.state.store.data && this.state.store.data.map((ele, i) => {
                    if (i < 6) {
                        storeToShow.push(ele)
                    }
                })
                this.state.store.data = storeToShow
                this.setState({ store: this.state.store })
            })
        }
    }

    startTimer = () => {
        // const { cardDate } = this.state
        let cardDate = 1660388887 * 1000;
        var timer;
        timer = setInterval(() => {
            var cardTime = new Date(cardDate).getTime();

            var currentTime = new Date().getTime();

            var difference = Math.floor((cardTime - currentTime));

            console.log('getDategetDategetDategetDate', cardTime, currentTime, difference)


            if (difference <= 0) {

                this.setState({
                    isTimerStart: false,
                    hours: null,
                    mins: null,
                    sec: null
                });

                //document.getElementById('timerdiv').innerHTML = '00:00:00';
                // Timer done
                clearInterval(timer);
            } else {

                var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((difference % (1000 * 60)) / 1000);

                this.setState({
                    isTimerStart: true,
                    hours: hours,
                    mins: minutes,
                    sec: seconds
                });


                //document.getElementById('timerdiv').innerHTML = hours+':'+minutes+':'+seconds;
            }
        }, 1000);
    }

    generateVcard = async () => {
        const { user, loan_amount, down_payment, selectedplan } = this.props
        let obj = {
            user_id: user,
            down_payment: down_payment,
            card_limit: loan_amount,
            plan_id: selectedplan
        }
        this.setState({ havecard: true });
        await this.props.dispatch(generateVCard(obj)).then((response) => {
            if (response.status === "success") {
                this.getVirtualCard();
            } else {
                this.setState({ havecard: false });
            }
        })
    }

    getVirtualCard = async () => {
        const user = localStorage.getItem('sfid')
        let objData = {
            user_sfid: user
        }
        await this.props.dispatch(getVCard(objData)).then((response) => {
            if (response.status === "success") {
                const getData = response.data ? response.data : null;
                const cardNumber = getData && getData.vcard_number__c ? getData.vcard_number__c : null;
                // var timestamp =  Number(getData.vcard_expiry__c) 
                var timestamp = Number(1660242600000)
                var date = new Date(timestamp);
                let year = date.getFullYear().toString().slice(-2)
                let month = date.getMonth()

                const expiry = getData && getData.vcard_expiry__c ? `${month}/${year}` : null;
                const cvv = getData && getData.vcard_cvv__c ? getData.vcard_cvv__c : null;
                const downPayment = getData && getData.down_payment__c ? getData.down_payment__c : null;
                const loanAmount = getData && getData.card_limit__c ? getData.card_limit__c : null;
                const cardDate = getData && getData.vcard_expiry__c ? getData.vcard_expiry__c : null;
                const card_number = getData && getData.card_number ? getData.card_number : null;
                const no_card = getData && getData.vcard_number__c ? getData.vcard_number__c : null;
                const cardId = getData && getData.id ? getData.id : null;
                if (cardNumber) {
                    this.setState({ havecard: true, vCardNumber: card_number, cardNumber: cardNumber, expiryDate: expiry, cvv: cvv, downPayment: downPayment, loanAmount: loanAmount, cardDate: cardDate, cardId, no_card });
                    this.startTimer();
                } else {
                    this.setState({ havecard: false });
                }

            } else {
                this.setState({ havecard: false, cardNumber: null });
            }
        })
    }

    handleViewCvv = () => {
        if (this.state.isShowCvv) {
            this.setState({ isShowCvv: false })
        } else {
            this.setState({ isShowCvv: true })
        }
    }

    handleVirtualCardView = () => {
        this.props.dispatch(openVirtualCardModel());
    }

    handleShare = (value) => {
        const { sfid, dispatch } = this.props
        let obj = {
            user_sfid: sfid,
            send_via: value,
            card_number: this.state.no_card
        }
        dispatch(shareVcard(obj)).then((response) => {
            if (response.status == "success") {
                alert(response.message);
                this.setState({ shareCard: false })
            } else {
                alert(response.message);
                this.setState({ shareCard: false })
            }
        });
    }
    handleCancelCard = (e) => {
        e.preventDefault()
        let item = {}
        item.user_sfid = this.props.sfid
        item.card_id = this.state.cardId
        this.props.dispatch(cancelCard(item)).then(res => {
            if (res.status == "success") {
                this.getVirtualCard();

            }
        })
    }

    render() {
        const { user, isLoading, loan_amount, sfid, username, isSearching, searchDet, favorite_count, storeDetails } = this.props;
        const { isTimerStart, hours, mins, sec, store, activeCards } = this.state;
        console.log('storeeeeeeeeeeeeeeee', JSON.stringify(activeCards))
        if (!user) {
            window.location = "/login";
        }
        return (
            <>
                <Helmet>
                    <title>Virtual Card 9</title>
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
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages bank_screen">
                    <div className='container'>
                        <div className='row my-4'>
                            <div >
                                <div className=''>
                                    <span>
                                        <img src={`${storeDetails && storeDetails.icon}`} alt="apple_logo" className='img-fluid' /></span> <span className='font-weight-bold fs-17 ml-3'>{storeDetails && storeDetails.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-4 align-items-stretch'>
                            <div className='col-lg-6 mt-lg-5'>
                                <h2 className='txt-l  mb-lg-5 mb-4'>Your One-time Card ready to use </h2>
                                <div className='a_a_box mb-lg-5 mb-4'>
                                    <span className='a_x_txt'>Available Amount: <i className='rupee'>`</i>{this.state.loanAmount ? this.state.loanAmount : loan_amount ? loan_amount : '0'}</span>
                                </div>
                                <div className='d-flex'>
                                    <button className='btn__ white mr-3 mr-0'>Go to Apple India</button>
                                    <OverlayTrigger
                                        placement="top"
                                        trigger="click"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={(

                                            <Tooltip>
                                                copied
                                            </Tooltip>

                                        )}>
                                        <button type='button' onClick={() => { navigator.clipboard.writeText(this.state.cardNumber) }} className='btn__ black'>Copy Card Number</button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            {this.state.cardNumber && (
                                <div className='col-lg-6 vc' style={{ backgroundImage: `url(${asset}images/bg_view_card.png)`, backgroundRepeat: 'no-repeat', height: 'auto', width: '100%' }}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <div className='col-12 px-lg-5'>
                                            {isTimerStart && (
                                                <div className="text-center mb-3"> <span className='bg-time rounded-4 p-2 font-weight-bold'>Valid for : {hours}:{mins}:{sec}</span></div>
                                            )}
                                            <div className='card_bg position-relative'>
                                                {/* {this.state.cardUrl && (<iframe width={650} height={650} src={this.state.cardUrl}  title="W3Schools Free Online Web Tutorials"></iframe>)} */}
                                                <div className='card_txt'>
                                                    <button className='card_close' data-toggle="modal" data-target="#closeModal">
                                                        <img src={asset + "images/icons/icon-close.png"} alt="icon-close" className='img-fluid' />
                                                    </button>
                                                    <div className='mb-lg-5 mb-4'>
                                                        <img src={asset + "images/Eduvanz.png"} alt="Eduvanz" className='img-fluid' />

                                                    </div>
                                                    <div className='d-flex c_card_number mb-lg-4 mb-3'>
                                                        <span>{this.state.cardNumber}</span>
                                                    </div>
                                                    <div className='d-flex align-items-end mb-4'>
                                                        <div className='card_valid_time' style={{ "width": "30%" }}>
                                                            <h5>Expiry</h5>
                                                            <div className='ex_date'>{this.state.expiryDate}</div>
                                                        </div>
                                                        <div className='card_valid_time' style={{ "width": "20%" }}>
                                                            <h5>CVV</h5>
                                                            <div className='cvv_number'>{this.state.isShowCvv ? this.state.cvv : '---'}</div>
                                                        </div>
                                                        <div style={{ "width": "30%" }} >
                                                            <div onClick={this.handleViewCvv} className="cursor-point"><img src={asset + "images/view-white.png"} alt="view-white" className='img-fluid' /></div>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-end'>
                                                        <div className='mt-2'><img src={asset + "images/visa-white.png"} alt="visa-white" className='img-fluid' /></div>
                                                    </div>
                                                    {/* <button
                                                        onClick={() => this.setState({ shareCard: true})}
                                                        className='share_btn rounded-circle position-absolute d-flex align-items-center justify-content-center'>
                                                        <img src={asset+"images/icons/share_icon.png"} alt="share_icon" className='img-fluid' />
                                                    </button> */}

                                                   <SocialShare/>

                                                </div>
                                                <img src={asset + "images/card_bg.png"} alt="card_bg" className='img-fluid' />

                                            </div>
                                            {/* <img src={asset+"images/abstract_memphis.png" alt="abstract_memphis" className='img-fluid'/> */}
                                        </div>
                                    </div>
                                </div>

                            )}
                            {!this.state.havecard && (
                                <div className='col-lg-6 vc' style={{ backgroundImage: 'url(/images/bg_view_card.png)', backgroundRepeat: 'no-repeat', height: 'auto', width: '100%' }}>
                                    <div className='d-flex justify-content-center align-items-center h-100'>
                                        <div className='card border-0' style={{ cursor: 'pointer' }} onClick={this.generateVcard}>
                                            <div className='card-body'>
                                                <p className='font-weight-bold fs-19 mb-0 text-capitalize' ><i className='fa fa-information'></i> Your Card is not ready Try Again</p>
                                            </div>
                                        </div>
                                        {/* <button type="button" onClick={this.generateVcard} className='btn__ black'></button> */}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='h_i_w mt-5 mb-5'>
                            <div className='row my-5'>
                                <div className='col-sm-12'>
                                    <h2 className='my-lg-5 mb-4 text-center title'>Confused about next steps?</h2>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <div className='h_i_w_box'>
                                        <div className='icon icon1'>
                                            <img src={asset + "images/icons/icon_1.png"} alt="icon_1" className='img-fluid' />
                                        </div>
                                        <h4>Copy Card Number </h4>
                                        <p>Copy Card Number on this page</p>
                                    </div>

                                </div>
                                <div className='col-lg-4'>
                                    <div className='h_i_w_box'>
                                        <div className='icon icon2'>
                                            <img src={asset + "images/icons/icon_2.png"} alt="icon_2" className='img-fluid' />
                                        </div>
                                        <h4>Enter Cards Details </h4>
                                        <p>Go to Store & checkout with Card Detail</p>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <div className='h_i_w_box'>
                                        <div className='icon icon3'>
                                            <img src={asset + "images/icons/icon_3.png"} alt="icon_3" className='img-fluid' />
                                        </div>
                                        <h4>Buy the Product  </h4>
                                        <p>Get the Product & repay in easy EMIs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-100  shopping-websites-list'>
                            <div className='col-sm-12'>
                                <h2 className='my-lg-5 mb-4 text-center title'>Popular Stores</h2>
                            </div>
                            <div className='row mt-5'>
                                {store && store.data.length > 0 && store.data.map((item, index) => (
                                    <div key={`store-${index}`} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={item && item.icon || ''} alt="" className='img-fluid' />
                                            <p className='m-0 mt-3'>{item && item.name || ''}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* <div className='text-center'><button className='show_all_btn' onClick={() => {
                                                this.props.dispatch(getStore(true));
                                                this.setState({
                                                    Electronics: false,
                                                    All: true,
                                                    Education: false,
                                                    PG: false,
                                                    Wheeler: false
                                                })
                                            }}>Show All</button>
                                            </div> */}
                        </div>

                        
                           
                                <div className='w-100  shopping-websites-list'>
                                <div className='col-sm-12'>
                                    <h2 className='my-lg-5 mb-4 text-center title'>Previously Used Cards</h2>
                                </div>
                                            <div className='row mt-5 m-5'>
                                                {activeCards && activeCards.data.length > 0 && activeCards.data.map((item, index) => (
                                                    <div class="col-lg-3 parent">
                                                    {/* <div class="top-div">
                                                        <h4>Stride</h4>
                                                        <img src={`${item.logo}`} />
                                                    </div>
                                                    <div class="bootom-div">
                                                        <h3>{item.name}</h3>
                                                        <p>Expired on - {item.vcard_expiry__c} </p>
                                                        <i className= 'rupee'></i><h2>{item.card_limit__c}</h2>
                                                    </div>
                                                     <div class="top-div">
                                                        <h4>{item.status__c}</h4>
                                                        <h2>VISA</h2>
                                                    </div> */}
                                                    <div className="top">
                                                        <h6>Stride <span className="img-amz"><img src="{`${item.logo}`}" alt="" width="18" height="18" /></span></h6>
                                                    </div>

                                                    <div className="middleCol">
                                                        
                                                        <h5>{item.name}</h5>

                                                        <p>Expired on {item.vcard_expiry__c}</p>

                                                        <h4>{item.card_limit__c}</h4>
                                                    </div>

                                                    <div className="bottomCol">
                                                        <span className="spanRed"> <strong className="redDot"></strong> {item.status__c}</span>
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" alt="" width="60" />
                                                    </div>
                                                    </div>                                               
                                                ))}
                                            </div>
                                            

                              
                    </div>
                </div>


                </section>
                {/* <!-- Close Modal --> */}
                <div className="modal fade" id="closeModal" tabIndex="-1" role="dialog" aria-labelledby="closeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content rounde-4">
                            <div className="modal-header">
                                <h5 className="modal-title" id="closeModalLabel">Confirmation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center p-5">
                                <p className='mb-0 fs-18'>Are you sure your want to <br /> cancel this card?</p>
                            </div>
                            <div className="border-top py-4 px-4">
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <button type="button" className="btn btn-lg btn-block btn-secondary" data-dismiss={"modal"} onClick={e => {
                                            e.preventDefault()
                                            this.setState({ modalClose: !this.state.modalClose })
                                        }}>No</button>
                                    </div>
                                    <div className='col-lg-6'>
                                        <button type="button" className="btn btn-lg btn-block btn-secondary" data-dismiss={this.state.closedModal} onClick={e => this.handleCancelCard(e)}>Yes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.shareCard} className="card_modal">
                    <Modal.Header style={{ "border": 0 }}>
                        <Modal.Title>Share Virtual Card</Modal.Title>
                        <button onClick={() => this.setState({ shareCard: false })}>
                            <img src={asset + "images/icons/icon-close2.png"} />
                        </button>
                    </Modal.Header>
                    <form>
                        <Modal.Body>
                            <div className='row'>

                                <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                                    <div className='col-12'>
                                        {isTimerStart && (
                                            <div className="text-center valignimg pb-4"> Valid for : {hours}:{mins}:{sec}</div>
                                        )}
                                        <div className='card_bg position-relative'>
                                            {/* {this.state.cardUrl && (<iframe width={650} height={650} src={this.state.cardUrl}  title="W3Schools Free Online Web Tutorials"></iframe>)} */}
                                            <div className='card_txt'>
                                                <div className='mb-lg-5 mb-4'>
                                                    <img src={asset + "images/Eduvanz.png"} alt="Eduvanz" className='img-fluid' />

                                                </div>
                                                <div className='d-flex c_card_number mb-lg-4 mb-3'>
                                                    <span>{this.state.cardNumber}</span>
                                                </div>
                                                <div className='d-flex align-items-end mb-4'>
                                                    <div className='card_valid_time' style={{ "width": "30%" }}>
                                                        <h5>Expiry</h5>
                                                        <div className='ex_date'>{this.state.expiryDate}</div>
                                                    </div>
                                                    <div className='card_valid_time' style={{ "width": "20%" }}>
                                                        <h5>CVV</h5>
                                                        <div className='cvv_number'>{this.state.isShowCvv ? this.state.cvv : '---'}</div>
                                                    </div>
                                                    <div style={{ "width": "30%" }} >
                                                        <div onClick={this.handleViewCvv} className="cursor-point"><img src={asset + "images/view-white.png"} alt="view-white" className='img-fluid' /></div>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <div className='mt-2'><img src={asset + "images/visa-white.png"} alt="visa-white" className='img-fluid' /></div>
                                                </div>
                                            </div>
                                            <img src={asset + "images/card_bg.png"} alt="card_bg" className='img-fluid' />

                                        </div>
                                        {/* <img src={asset+"images/abstract_memphis.png" alt="abstract_memphis" className='img-fluid'/> */}
                                    </div>
                                </div>

                            </div>
                            <div className='row mt-5 mb-4 px-5'>
                                <div className='col-4 text-center cursor-point' onClick={() => this.handleShare("WhatsApp")}>
                                    <img src={asset + "images/icons/whatsapp.png"} alt="icon_1" className='img-fluid' />
                                    <span className='d-block'>WhatsApp</span>
                                </div>
                                <div className='col-4 text-center cursor-point' onClick={() => this.handleShare("Message")}>
                                    <img src={asset + "images/icons/msg.png"} alt="icon_1" className='img-fluid' />
                                    <span className='d-block'>Message</span>
                                </div>
                                <div className='col-4 text-center cursor-point' onClick={() => this.handleShare("Mail")}>
                                    <img src={asset + "images/icons/email.png"} alt="icon_1" className='img-fluid' />
                                    <span className='d-block'>Mail</span>
                                </div>
                            </div>
                        </Modal.Body>
                    </form>
                </Modal>
            </>
        )
    }
}

const mapSTP = state => {
    const { user, isLoading, sfid, username } = state.auth;
    const { isSearching, searchDet, favorite_count, storeDetails, store } = state.product;
    const { loan_amount, down_payment } = state.user;
    const { virtual_card_show } = state.model;
    const { selectedplan, activeCards } = state.payment;
    return {
        virtual_card_show,
        down_payment,
        selectedplan,
        loan_amount,
        isLoading,
        sfid,
        store,
        activeCards,
        user, isSearching, searchDet, favorite_count, username, storeDetails
    }
}

export default connect(mapSTP)(VirtualCard9)