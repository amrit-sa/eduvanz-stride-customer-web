import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";
import { Modal,Button } from "react-bootstrap"
import { getStore, updateMerchant, setStore, storeSearch } from "../../actions/product";
import HeaderNew from '../../common/headerNew';

class VirtualCard1 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            All: true,
            photoUrl: null,
            openTab: false,
            store:{
                data:[]
            },
            openUrl: "",
            showAll : false
        }
    }

    componentDidMount() {
        this.props.dispatch(getStore(false));
    }

    handleSelect = (item) => {
        // localStorage.setItem('storeSelected',item)
        this.setState({ isStoreSelected: true })
        this.props.dispatch(setStore(item))
        this.props.dispatch(updateMerchant(item.sfid));
        this.props.history.push("/amountLimit");
    }
    handleSearchSelect = (item) => {
        // localStorage.setItem('storeSelected',item)
        let data = {
            search_name: this.state.search,
            searchFromWeb : true
        }
        this.props.dispatch(storeSearch(data)).then(res => {
            let serachURL = this.state.search
            let searchInNewTab = false
            if (serachURL.indexOf("http") == 0) {
                console.log("yeah!");
                searchInNewTab = true
            }
            if (res.status === "success") {
                if (res.data.length < 1) {
                    if (searchInNewTab) {
                        // window.open(serachURL)
                        this.setState({ openTab: true, openUrl: serachURL })

                    } else {
                        let splitSearch = serachURL.split('.')
                        if (splitSearch.length > 1) {
                            // window.open(`https://${splitSearch[1]}.com`)
                            this.setState({ openTab: true, openUrl: `https://${splitSearch[0]}.com` })

                        } else {
                            // window.open(`https://${splitSearch[0]}.com`)
                            this.setState({ openTab: true, openUrl: `https://${splitSearch[0]}.com` })

                        }
                    }
                } else {
                    this.setState({ store: res })
                }
            } else {
                if (searchInNewTab) {
                    // window.open(serachURL)
                    this.setState({ openTab: true, openUrl: serachURL })
                } else {
                    let splitSearch = serachURL.split('.')
                    if (splitSearch.length > 1) {
                        // window.open(`https://${splitSearch[1]}.com`)
                        this.setState({ openTab: true, openUrl: `https://${splitSearch[0]}.com` })

                    } else {
                        // window.open(`https://${splitSearch[0]}.com`)
                        this.setState({ openTab: true, openUrl: `https://${splitSearch[0]}.com` })

                    }
                }
            }
        })
        // this.props.dispatch(updateMerchant(item.sfid));
        // this.props.history.push("/amountLimit") ;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.store !== this.props.store) {
            this.setState({ store: this.props.store })
        }
    }
    handleCategory(category,id) {
        this.props.dispatch(getStore(false,id)).then((response) => {
            if (response.status == 'success') {
                let store = this.state.store
                if (category != "All") {
                    let filteredArray = response && response.data && response.data.filter(ele => ele.name == category)
                    store.data = filteredArray
                    console.log('filteredArrayfilteredArray', filteredArray)
                } else {
                    store = response
                }
                this.setState({ store }, () => {
                    console.log('storestore', store)
                })
            }
        })
    }
    render() {
        const { user, sfid, username, isSearching, searchDet, favorite_count } = this.props;
        const { store } = this.state
        console.log('store============0', JSON.stringify(store))
        if (!sfid) {
            window.location = "/login";
        }
        return (
            <>
                <Helmet>
                    <title>Virtual Card 1</title>
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
                                            <li className='active' onClick={() => this.props.history.push("/virtualCard")} >
                                                <span><img src={asset + "images/icons/store_icon.png"} alt="store_icon" className='img-fluid' /></span>
                                                Select Store
                                            </li>
                                            <li onClick={() => this.state.isStoreSelected ? this.props.history.push('/amountLimit') : ""} disabled={true}>
                                                <span><img src={asset + "images/icons/amount_icon.png"} alt="amount_icon" className='img-fluid' /></span>
                                                Enter Amount
                                            </li>
                                            <li onClick={() => this.state.isStoreSelected ? this.props.history.push('/paymentPlan') : ""}>
                                                <span><img src={asset + "images/icons/payplan_icon.png"} alt="payplan_icon" className='img-fluid' /></span>
                                                Payment plan
                                            </li>
                                            <li onClick={() => this.state.isStoreSelected ? this.props.history.push("/loanSummary") : ""}>
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
                                    <div className='maxWidth690'>
                                        <h4 className='text-center mb-5 s_c_title'>Where are you shopping?</h4>
                                        <div className='search_shopping position-relative'>
                                            <input type="text" placeholder='Search for stores or paste URL' value={this.state.search} onChange={(e) => {
                                                e.preventDefault()
                                                this.setState({ search: e.target.value })
                                            }} onKeyDown={(e)=>{
                                                if(e.key == 'Enter'){
                                                    this.handleSearchSelect()
                                                }
                                            }}/>
                                            <button onClick={this.handleSearchSelect} className='search-icon'>
                                                <img src={asset + "images/icons/search_icon.png"} alt="search_icon" className='img-fluid' />
                                            </button>
                                            {/* <button className='search-icon'>
                                            <img src={asset+"images/icons/arrow_right.png"} alt="arrow_right" className='img-fluid'/>
                                        </button> */}
                                        </div>

                                        {/* filter */}
                                        <div className='d-flex flex-wrap justify-content-between flex-lg-row-reverse align-items-center mt-5'>
                                            <div className='d-flex align-items-center mb-3 mb-lg-0'>
                                                <button className={`mr-2 filter_btn ${this.state.All ? "active" : ""}`} onClick={() => {
                                                    this.setState({
                                                        Electronics: false,
                                                        All: true,
                                                        Education: false,
                                                        PG: false,
                                                        Wheeler: false,
                                                    })
                                                    this.handleCategory('All','0')
                                                }}>All</button>
                                                <button className={`filter_btn ${this.state.Electronics ? 'active' : ""}`} onClick={() => {
                                                    this.setState({
                                                        Electronics: true,
                                                        All: false,
                                                        Education: false,
                                                        PG: false,
                                                        Wheeler: false,
                                                    })
                                                    this.handleCategory('Electronics','1')
                                                }}>Electronics</button>
                                                <button className={`mr-2 filter_btn ${this.state.Education ? 'active' : ""}`} onClick={() => {
                                                    this.setState({
                                                        Electronics: false,
                                                        All: false,
                                                        Education: true,
                                                        PG: false,
                                                        Wheeler: false,
                                                    })
                                                    this.handleCategory('Education','2')
                                                }}>Education</button>
                                                <button className={`filter_btn ${this.state.PG ? 'active' : ""}`} onClick={() => {
                                                    this.setState({
                                                        Electronics: false,
                                                        All: false,
                                                        Education: false,
                                                        PG: true,
                                                        Wheeler: false,
                                                    })
                                                    this.handleCategory('PGs & Hostels','3')
                                                }}>PGs & Hostels</button>
                                                <button className={`filter_btn ${this.state.Wheeler ? 'active' : ""}`} onClick={() => {
                                                    this.setState({
                                                        Electronics: false,
                                                        All: false,
                                                        Education: false,
                                                        PG: false,
                                                        Wheeler: true
                                                    })
                                                    this.handleCategory('2-Wheelers','4')
                                                }}>2-Wheelers</button>
                                            </div>
                                            <div>
                                                <h4 className='s_c_title mb-0'>
                                                    Popular Store
                                                </h4>
                                            </div>
                                        </div>
                                        <div className='w-100  shopping-websites-list'>
                                            <div className='row mt-5'>
                                                {store && store.data.length > 0 && store.data.map((item, index) => (
                                                    <div key={`store-${index}`} onClick={() => this.handleSelect(item)} className='col-lg-2 col-md-3 col-4 text-center'>
                                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                                            <img src={item.icon || item.merchant_logo_url__c || ''} alt="" className='img-fluid' />
                                                            <p className='m-0 mt-3'>{ item.name ||item.first_name__c ||''}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {!this.state.showAll ? <div className='text-center'><button className='show_all_btn' onClick={() => {
                                                this.props.dispatch(getStore(true));
                                                this.setState({
                                                    Electronics: false,
                                                    All: true,
                                                    Education: false,
                                                    PG: false,
                                                    Wheeler: false,
                                                    showAll : true
                                                })
                                            }}>Show All</button>
                                            </div> : <div className='text-center'><button className='show_all_btn' onClick={() => {
                                                this.props.dispatch(getStore(false));
                                                this.setState({
                                                    Electronics: false,
                                                    All: true,
                                                    Education: false,
                                                    PG: false,
                                                    Wheeler: false,
                                                    showAll : false
                                                })
                                            }}>Show Less</button>
                                            </div>}
                                        </div>

                                        {/* <div className='w-100  shopping-websites-list'>
                                        
                                            <h4 className='s_c_title  mb-0'>
                                            Education
                                            </h4>
                                        
                                    <div className='row mt-5'>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/upgrad.png"} alt="upgrad" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Upgrad</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4' data-toggle="modal" data-target="#udemy">
                                        <img src={asset+"images/icons/udemy.png"} alt="Udemy" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Udemy</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/byjus.png"} alt="byjus" className='img-fluid'/>
                                            <p className='m-0 mt-3'>byjus</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/toppr.png"} alt="toppr" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Toppr</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/unacademy.png"} alt="unacademy" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Uncademy</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/gradeup.png"} alt="gradeup" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Gradeup</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/upgrad.png"} alt="upgrad" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Upgrad</p>
                                        </div>
                                           
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/udemy.png"} alt="Udemy" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Udemy</p>
                                        </div>
                                           
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/byjus.png"} alt="byjus" className='img-fluid'/>
                                            <p className='m-0 mt-3'>byjus</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/toppr.png"} alt="toppr" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Toppr</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/unacademy.png"} alt="unacademy" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Uncademy</p>
                                        </div>
                                            
                                        </div>
                                        <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                        <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                        <img src={asset+"images/icons/gradeup.png"} alt="gradeup" className='img-fluid'/>
                                            <p className='m-0 mt-3'>Gradeup</p>
                                        </div>
                                            
                                        </div>
                                    </div> 
                                    <div className='text-center'><button className='show_all_btn'>Show All</button></div>
                                    </div> */}


                                        {/* <div className='w-100  shopping-websites-list'>
                                    
                                            <h4 className='s_c_title  mb-0'>
                                            Electronics
                                            </h4>
                                        
                                            <div className='row mt-5'>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                                <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                                <img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Apple</p>
                                                </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/myntra.png"} alt="myntra" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Myntra</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/amazon.png"} alt="amazon" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Amazon</p>
                                            </div>
                                            
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/flipkart.png"} alt="flipkart" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Flipkart</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Apple</p>
                                            </div>
                                            
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/myntra.png"} alt="myntra" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Myntra</p>
                                            </div>
                                            
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Apple</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/myntra.png"} alt="myntra" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Myntra</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/amazon.png"} alt="amazon" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Amazon</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/flipkart.png"} alt="flipkart" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Flipkart</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/apple_logo.png"} alt="apple_logo" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Apple</p>
                                            </div>
                                                
                                            </div>
                                            <div onClick={this.handleSelect} className='col-lg-2 col-md-3 col-4 text-center'>
                                            <div className='s_w_box d-flex flex-column align-items-center justify-content-center py-3 px-4'>
                                            <img src={asset+"images/icons/myntra.png"} alt="myntra" className='img-fluid'/>
                                                <p className='m-0 mt-3'>Myntra</p>
                                            </div>
                                                
                                            </div>
                                        </div>
                                    <div className='text-center'><button className='show_all_btn'>Show All</button></div>
                                    </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-sm-12 t-c'>
                                {/* <h4>Terms &amp; Conditions</h4> */}
                                <p>Price may also include trade-in credit. Pricing with a trade-in is after trade-in of a specific device. Trade-in values vary based on the condition, year, and configuration of your trade-in device. You must be at least 18 years old. Additional terms from Apple or Apple’s trade-in partner may apply.
                                </p>
                                <p>Representative example: Based on purchase of ₹17430. Total amount payable ₹18462 paid over 9 months as 9 monthly payments of ₹2051 at an interest rate of 14% paper annum. Total interest paid to bank: ₹1032.</p>
                                <p>
                                    §No-Cost EMI available for purchases made using qualifying credit cards on 12-month tenure only. Offer available on qualifying purchases made after 1:30 PM IST on 6 December 2021 and before 11:59 PM IST on 19 January 2022. Minimum order spend applies as per your credit card’s issuing bank threshold. Offer cannot be combined with Apple Store for Education or Corporate Employee Purchase Plan pricing. Credit card eligibility is subject to terms and conditions between you and your credit card issuing bank. Offer may be revised or withdrawn at any time without any prior notice. Offer valid for limited period. Terms &amp; Conditions apply.</p>
                            </div>
                        </div>
                    </div>

                </section>

                <div className="modal fade" id="udemy" tabIndex="-1" role="dialog" aria-labelledby="udemyTitle" aria-hidden="true">
                    <div className="modal-dialog partnerModal modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    <img src={asset + "images/upgrad.png"} alt="upgrad" className='img-fluid' /> is an Eduvanz Partner
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body px-lg-5 px-4 pb-lg-5 pb-4">
                                <div className='m-auto' style={{ "width": "248px" }}>
                                    <button className='d-block w-100 text-left px-3 py-3 no-cost-emi mb-3'>
                                        <img src={asset + "images/icons/no-cost-emi.png"} alt="no-cost-emi" className='img-fluid mr-3' />
                                        No Cost EMI
                                    </button>
                                    <button className='d-block w-100 text-left px-3 py-3 easy-checkout mb-3'>
                                        <img src={asset + "images/icons/easy-checkout.png"} alt="easy-checkout" className='img-fluid  mr-3' />
                                        Easy checkout
                                    </button>
                                    <button className='d-block w-100 text-left px-3 py-3 product-selection mb-3'>
                                        <img src={asset + "images/icons/product-selection.png"} alt="product-selection" className='img-fluid  mr-3' />
                                        Product Selection
                                    </button>
                                    <div className='text-center pt-4'>
                                        <button className='show_all_btn'>Continue with card</button>
                                    </div>
                                </div>
                                <div className='text-center m-auto pt-4' style={{ "width": "300px" }}>
                                    <button className='d-inline-block continue-btn w-100'>Explore Upgrad</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <Modal
    //   {...props}
    show = {this.state.openTab}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={false}>
        <Modal.Title id="contained-modal-title-vcenter">
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <iframe src={this.state.openUrl} style={{ height: '300px', width: "100%" }} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{
            this.setState({openTab : false})
        }}>Close</Button>
      </Modal.Footer>
    </Modal>
            </>
        )
    }
}

const mapSTP = state => {
    const { user, sfid, username } = state.auth;
    const { isSearching, searchDet, favorite_count } = state.product
    const { store } = state.product
    return {
        currentUser: state.currentUser,
        store,
        sfid,
        user, isSearching, searchDet, favorite_count, username
    }
}

export default connect(mapSTP)(VirtualCard1)