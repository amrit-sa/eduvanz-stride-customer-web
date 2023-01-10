import React, { Component } from 'react'
import Helmet from "react-helmet";
import '../my-sass.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from "../common/header";
import { asset } from "../common/assets";
import ProfileSidebar from "../common/profile-sidebar";
import { addStoreRating, getStoreRating, getAccountProfile, getProfileById, user_query_submit } from "../actions/user";
import { Chart, registerables } from 'chart.js'

import UploadDocument from "./model/upload-document";
import SocialShare from './SocialShare';
import HeaderNew from '../common/headerNew';

Chart.register(...registerables)

var CHART_1;
var CHART_2;

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            percent_value: 0,
            percent_value_2: 0,
            rating: 0,
            profile_data: {},
            morePlansOpen: false,
            username: null,
            issue_type: null,
            user_msg: null,
            querysend_faild: false,
            querysend_success: false
        }
    }
    async componentDidMount() {

        const { user, sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getStoreRating(data));
        this.handleLimitChart1(0);
        this.handleLimitChart2(0);
        if (user) {
            let obj = {
                user_sfid: sfid
            }
            this.props.dispatch(getAccountProfile(obj)).then((response) => {
                if (response.status === "success") {

                    this.setState({ userId: response.accountDet.id });
                }
            });
        }






    }


    componentDidUpdate(prevProps, prevState) {
        if (Object.keys(this.state.profile_data).length === 0) {
            if (Object.keys(prevProps.profile).length > 0) {
                this.setState({ profile_data: prevProps.profile })
                const { limit_percentage__c } = prevProps.profile.creditdata;
                this.setState({ percent_value: limit_percentage__c });
                const credit_score = Number(prevProps.profile.profile.bureau_score__c);
                const percent_val = parseInt(((credit_score - 300) * 100) / 600);
                this.setState({ percent_value_2: percent_val })


                CHART_1.destroy()
                this.handleLimitChart1(limit_percentage__c);

                CHART_2.destroy()
                this.handleLimitChart2(percent_val);

            }
        }

    }

    handleLimitChart1 = (val) => {
        var options1 = {
            type: 'doughnut',
            data: {
                labels: ["Red"],
                datasets: [
                    {
                        data: [val, 100 - val],
                        backgroundColor: ['rgba(255, 59, 106, 1) rgba(255, 255, 255, 0)', 'rgba(216, 202, 255, 1)'],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                circumference: 180,
                rotation: -90,
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                cutout: '85%'
            }
        }

        var ctx1 = document.getElementById('chartJSContainer').getContext('2d');
        CHART_1 = new Chart(ctx1, options1);
        CHART_1.render()
    }

    handleLimitChart2 = (val) => {
        val = val == 1 ? 2 : val;
        let options2 = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: '# of Votes',
                        data: [val, (100 - val)],
                        backgroundColor: ['rgba(78, 67, 111, 1)', 'rgba(196, 196, 196, 1)'],
                        borderWidth: 5
                    }
                ]
            },
            options: {
                rotation: -145,
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                cutout: "80%"
            }
        }
        let ctx2 = document.getElementById('chartJSContainer_2').getContext('2d');
        CHART_2 = new Chart(ctx2, options2);
        CHART_2.render();
    }

    handleRating = (value) => {
        const { dispatch, sfid } = this.props
        let data = {
            user_sfid: sfid, rating: value
        }
        dispatch(addStoreRating(data))
        this.setState({ rating: value });
    }

    SubmitLimit_request = () => {
        const userQuery = {
            "user_sfid": this.props.sfid,
            "issue_type": this.state.issue_type,
            "subject": this.state.issue_type,
            "description": this.state.user_msg
        }
        this.props.dispatch(user_query_submit(userQuery)).then((resp) => {
            if (resp.status === 'success') {
                this.setState({ querysend_success: true })
                this.setState({ querysend_faild: false })
            } else {
                this.setState({ querysend_faild: true })
            }

        })
    }

    render() {
        const { user, profile, isLoading, store_rating, sfid, recentProd, history, username, isSearching, searchDet, favorite_count } = this.props;

        if (!sfid) {
            return <Redirect to="/login" />;
        }
        let userdetails = profile && profile.profile ? profile.profile : ''
        let creditData = this.props.profile.creditdata

        return (
            <>

                <Helmet>
                    <title>Profile</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                {/* <Header
                    user={user}
                /> */}
                <HeaderNew
                    username={username ? username : ''}
                    user={user ? user : ''}
                    history={this.props.history}
                    isSearching={isSearching}
                    searchDet={searchDet}
                    sfid={sfid}
                    favorite_count={favorite_count}
                />

                <div className='dashboard-body pt-5'>

                    <div className='container '>
                        {/* <div className='row'>
                            <div className='col' >
                                <h4
                                    style={{ fontSize: "36px", fontWeight: "600" }}
                                >Hello, {userdetails && userdetails.first_name__c ? userdetails.first_name__c : ''}
                                </h4>
                                <p
                                    className='text-gray'
                                    style={{ fontSize: "24px", fontWeight: "400", color: "#878787" }}
                                >Welcome Back!</p>
                            </div>
                            
                        </div> */}
                        <div className='row'>
                            <ProfileSidebar
                                history={this.props.history}
                                profile={this.props.profile}
                                recentProd={this.props.recentProd}
                                user={this.props.user}
                                id={this.state.userId}
                            />
                            <div className='col-xl-9 col-lg-8'>
                                <div className='box_bg mb-3'>
                                    <div className='row'>
                                        <div className='col-xl-5 pr-0'>
                                            <div className='px-xl-5 pt-xl-5 p-4'>
                                                <h5>Current Credit Limit</h5>
                                                <div className='dash amount_'><i className='rupee'>`</i>{userdetails && userdetails.ipa_basic_bureau__c ? userdetails.ipa_basic_bureau__c.toLocaleString('en-IN') : '0'}
                                                </div>
                                                <div className='d-flex align-items-center border-top '
                                                    style={{
                                                        padding: "1rem 0",
                                                        top: "2rem",
                                                        position: "relative"
                                                    }}
                                                >
                                                    <div className='mr-3'><img src={asset + "images/dashboard/money-icon.png"} className="img-fluid" /></div>
                                                    <div>
                                                        <p className='mb-0'>You can still get a loan for a higher amount <button className='link'><a href='https://eduvanz.s3.ap-south-1.amazonaws.com/images/credit_limit.pdf' target="_blank">Learn how</a></button> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-xl-7 pl-0 border-left'>
                                            <div className='px-xl-5 py-xl-4 px-3 py-3'>
                                                <div className='row justify-content-center align-items-center'>

                                                    <div className='col-6'>

                                                        <p
                                                            className='d-flex align-items-center'
                                                            style={{ gap: "2px", marginBottom: "4px" }}
                                                            id="available_credit"
                                                            val={creditData && creditData.available_credit_limit__c}>
                                                            <div className="dot-gray" style={{ backgroundColor: "#d8caff" }}></div>
                                                            Available:{creditData && creditData.available_credit_limit__c}
                                                        </p>

                                                        <p
                                                            className='d-flex align-items-center'
                                                            style={{ gap: "2px", marginBottom: "4px" }}
                                                            id="used_credit"
                                                            val="20000">
                                                            {/* val={creditData && creditData.used_credit_limit__c}> */}
                                                            <div className="dot-gray" style={{ backgroundColor: "#ff3b6a" }}></div>
                                                            Used Limit:{creditData && creditData.used_credit_limit__c}
                                                        </p>

                                                        <p
                                                            className='d-flex align-items-center'
                                                            style={{ gap: "2px", marginBottom: "4px" }}
                                                            id="total_credit"
                                                            val={creditData && creditData.total_credit_limit__c}>
                                                            <div className="dot-gray"></div>
                                                            Total Limit:{creditData && creditData.total_credit_limit__c}
                                                        </p>
                                                    </div>

                                                    <div className='col-lg-6 position-relative'>

                                                        <canvas id="chartJSContainer"></canvas>
                                                        <p className="percent">
                                                            {creditData && creditData.limit_percentage__c}%
                                                        </p>
                                                    </div>
                                                    <div className='col-6'></div>
                                                    <div className='col-6'>

                                                        {
                                                            // profile && profile.profile && profile.profile.account_partner__c && profile.profile.account_partner__c.account_to__c === "" &&

                                                            <p className='text-center'>
                                                                <button onClick={() => history.push('./ed_coapplicant')} className='link'>Increase your limit
                                                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#1251F1" />
                                                                    </svg></button>
                                                            </p>
                                                        }
                                                    </div>
                                                </div>
                                                {/* <img src={asset+"images/dashboard/pie3.jpg"} className="img-fluid"/> */}
                                                {/* <div className='text-center'>

                                                    <button className='link' data-toggle="modal" data-target="#limitIncModal">Increase your limit <i className='fa fa-arrow-right'></i></button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='d-flex'>
                                                <div className='pl-xl-5 pt-xl-5 mr-4 pl-3 pt-3'>
                                                    <h5>{creditData && creditData.streak} Streak</h5>
                                                    <p className='mb-0'>Here's a summary of Payment made</p>
                                                </div>
                                                <div className='pt-xl-4'>
                                                    <img src={asset + "images/dashboard/flame.png"} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center pt-xl-4 pt-3 pb-4'>
                                                <div className='pl-xl-5 pl-3'>
                                                    <img src={asset + "images/dashboard/auto-pay.png"} className="img-fluid" />
                                                </div>
                                                <div className='pr-4'>
                                                    <button type='button'
                                                        // onClick={() => this.props.history.push('/virtual-no-card')} 
                                                        onClick={() => this.props.history.push('/ed_doc_pan')}
                                                        className='forward_btn tutu'>
                                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-xl-6'>
                                        <div className='box_bg h-100'>
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className='pl-xl-4 position-relative chartJSContainer_2'>
                                                        <canvas id="chartJSContainer_2"></canvas>
                                                        {/* <img src={asset+"images/dashboard/pie2.png"} className="img-fluid" /> */}
                                                        <p className="percent mb-0">
                                                            <span className='d-block font-weight-bold'>{userdetails.bureau_score__c ? userdetails.bureau_score__c : 0}</span>
                                                            <i className='fa fa-caret-up text-success ml-2'></i>
                                                            <i className='fa fa-caret-down text-gray'></i>
                                                        </p>
                                                    </div>
                                                    <div className='pl-xl-5 pr-xl-4 pb-4'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='text-center'>
                                                                <div className='dot-gray'></div>
                                                                <p className='fs-17 font-weight-bold'>300</p>
                                                            </div>
                                                            <div className='text-center'>
                                                                <div className='dot-gray'></div>
                                                                <p className='fs-17 font-weight-bold'>900</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-6'>

                                                    <div className='pt-4 pr-4 pb-4'>
                                                        <h5>Your credit score has improved!</h5>
                                                        <p className='mb-0'>The higher the score, the better your chances to get best deals! </p>
                                                    </div>


                                                    <div className='d-flex justify-content-end pb-4 pr-4 pt-4'>
                                                        <button className='forward_btn tutu'
                                                            onClick={() => this.props.history.push('/credit-score')}>
                                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='row  pl-xl-5 pt-xl-5 mr-4 pl-3 pt-3'>
                                                <div className='col-6 pr-0'>
                                                    <h5>Upload Additional Documents</h5>
                                                    <p className='mb-0'>For assessing or improving your credit limit, additional documents may be necessary</p>
                                                </div>
                                                <div className='col-6 px-0'>
                                                    <img src={asset + "images/dashboard/img2.png"} className="img-fluid" />
                                                </div>
                                            </div>
                                             <div className='d-flex justify-content-end align-items-center pb-4'>

                                                <div className='pr-4'>
                                                    <button className='forward_btn lavvendar' onClick={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }}>
                                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='row  pl-xl-5 pt-xl-5 mr-4 pl-3 pt-3'>
                                                <div className='col-6 pr-0'>
                                                    <h5>Refer a Friend</h5>
                                                    <p className='mb-0'>You earn <i className="fa fa-rupee"></i> 1,000, your friend earns  <i className="fa fa-rupee"></i>1,000 on every transaction via referral.</p>
                                                </div>
                                                <div className='col-6 px-0'>
                                                    <img src={asset + "images/refer.png"} className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-start align-items-center pb-4'>

                                                <div className='pl-4'>
                                                    <SocialShare />

                                                </div>

                                            </div>
                                        </div>
                                    </div>







                                </div>

                                <div className="row mb-5">


                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='row  pl-xl-5  pl-3  pt-3 pb-3'>
                                                <div className='col-3 pr-0 pl-1 pt-0'>
                                                    <img src={asset + "images/exprience_rate.png"} className="img-fluid" />
                                                </div>
                                                <div className='col-8 px-0 pt-5'>
                                                    <h5>How was your experience with us?</h5>
                                                    <>
                                                        <ul className="feedback">
                                                            <li className={`angry ${store_rating === 1 ? "active" : ""}`}>
                                                                <div onClick={() => this.handleRating(1)}>
                                                                    <svg className="eye left">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="eye right">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="mouth">
                                                                        <use xlinkHref="#mouth"></use>
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                            <li className={`sad ${store_rating === 2 ? "active" : ""}`}>
                                                                <div onClick={() => this.handleRating(2)}>
                                                                    <svg className="eye left">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="eye right">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="mouth">
                                                                        <use xlinkHref="#mouth"></use>
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                            <li className={`ok ${store_rating === 3 ? "active" : ""}`}>
                                                                <div onClick={() => this.handleRating(3)} />
                                                            </li>
                                                            <li className={`good ${store_rating === 4 ? "active" : ""}`} >
                                                                <div onClick={() => this.handleRating(4)}>
                                                                    <svg className="eye left">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="eye right">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="mouth">
                                                                        <use xlinkHref="#mouth"></use>
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                            <li onClick={() => this.handleRating(5)} className={`happy ${store_rating === 5 ? "active" : ""}`}>
                                                                <div>
                                                                    <svg className="eye left">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                    <svg className="eye right">
                                                                        <use xlinkHref="#eye"></use>
                                                                    </svg>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                                            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
                                                                <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1" />
                                                            </symbol>
                                                            <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
                                                                <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5" />
                                                            </symbol>
                                                        </svg>
                                                    </>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                    <div className='col-xl-6 mb-xl-0 mb-lg-3'>
                                        <div className='box_bg d-flex flex-column justify-content-between h-100'>
                                            <div className='row  pl-xl-5  pl-3  pt-3 pb-3 align-items-center' 
                                                style={{height:"100%"}}
                                            >
                                                <div className='col-6 '>
                                                    <img src={asset + "images/contact_rate.png"} className="img-fluid" />
                                                </div>
                                                <div className='col-6 px-0 '>
                                                    <h5>Need help with anything?</h5>
                                                    <button type="button" className="btn border border-1 rounded-3 border-dark"
                                                        // onClick={this.SubmitLimit_request}
                                                        onClick={(e) => {
                                                        e.preventDefault()
                                                        window.open("/support")
                                                         }}
                                                        >Contact Us</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                               


                            </div>
                        </div>
                    </div>

                </div>
                {this.state.morePlansOpen ? <UploadDocument data={this.state.morePlansOpen} isOpen={this.state.morePlansOpen} onClose={() => { this.setState({ morePlansOpen: !this.state.morePlansOpen }) }} /> : ""}



                <div className="modal fade" id="limitIncModal" tabIndex="-1" role="dialog" aria-labelledby="writetousTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {this.state.querysend_faild ?

                                <>
                                    <div className='text-center'>
                                        <i className='fa fa-times mark-red'></i>

                                        <h4 className='mt-4 mb-4 alert alert-danger'>There was some error while sending your request</h4>

                                        <button className='link mb-4'
                                            onClick={() => this.setState({ querysend_faild: null })}
                                        >Submit another request ?</button>
                                    </div>
                                </>
                                :

                                this.state.querysend_success ?
                                    <>
                                        <div className='text-center'>
                                            <i className='fa fa-check mark'></i>

                                            <h4 className='mt-4 mb-4 alert alert-success'>Request sent successfully</h4>

                                            <button className='link mb-4'
                                                onClick={() => this.setState({ querysend_success: null })}
                                            >Submit another request ?</button>
                                        </div>


                                    </>
                                    :
                                    <>
                                        <h4 className="modal-title text-center mb-2 font-weight-bold">Write to us</h4>
                                        <p className="text-center mx-4 text-dark">Please select your query type and share the details with us. Our team will get back to you within 48 Hrs.</p>
                                        <div className="modal-body">
                                            <form >
                                                <div className="form-group">
                                                    <select className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="query" onChange={(e) => this.setState({ issue_type: e.target.value })}>
                                                        <option defaultValue>Select the type of your query</option>
                                                        <option>Increase my credit limit</option>
                                                        <option>Inquiring for Partnership</option>
                                                        <option>Inquire for Loans</option>
                                                        <option>Queries regarding repayment of EMI</option>
                                                        <option>I cannot find my Course / Institute   </option>
                                                        <option>General Query</option>
                                                    </select>
                                                </div>
                                                <div className="form-group position-relative">
                                                    <textarea onChange={(e) => this.setState({ user_msg: e.target.value })} className="form-control" id="detail" rows="5" placeholder="Please enter the details of your request. Our support staff will respond as soon as possible."></textarea>
                                                    {/* <p className="font-weight-bold position-absolute bottom-0 right-0 pr-3">
                                                    <img src={asset + 'images/support/fi-rr-clip.png'} /><span>Attach</span> </p>
                                                <p className="font-weight-bold position-absolute bottom-20 right-0 pr-3"><img src={asset + 'images/support/fi-rr-document.png'} />
                                                    <img src={asset + 'images/support/fi-cross-small.png'} /> </p> */}
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer border-0">
                                            <button type="button" className="btn btn-dark"
                                                disabled={!(this.state.issue_type && this.state.user_msg)}
                                                onClick={this.SubmitLimit_request}>Submit</button>
                                        </div>
                                    </>

                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }
}



function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
    const { profile, recentProd, store_rating, userAddress, userId } = state.user;
    return {
        favorite_list,
        favorite_count,
        searchHistory,
        isSearching,
        searchDet,
        username,
        user,
        sfid,
        store_rating,
        recentProd,
        isLoading,
        profile,
    };
}

export default connect(mapStateToProps)(Dashboard);
