import React, { Component } from 'react'
import Helmet from "react-helmet";
import '../my-sass.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from "../common/header";
import { asset } from "../common/assets";

import { addStoreRating, getStoreRating, getAccountProfile, getProfileById } from "../actions/user";
import { Chart, registerables } from 'chart.js'
import HeaderNew from '../common/headerNew';
import Footer from '../common/footer';


Chart.register(...registerables)

var CHART_1;
var CHART_2;

class Privacy extends Component {

    constructor(props) {
        super(props)
        this.state = {
            percent_value: 0,
            percent_value_2: 0,
            rating: 0,
            username: null,
            profile_data: {},
            morePlansOpen: false,
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


    render() {
        const { user, profile, isLoading, sfid, history, username, isSearching, searchDet, favorite_count } = this.props;

        // if (!sfid) {
        //     return <Redirect to="/login" />;
        // }
        let userdetails = profile && profile.profile ? profile.profile : ''
        let creditData = this.props.profile.creditdata

        return (
            <>

                <Helmet>
                    <title>About Us</title>
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

                <div class="aboutBox">
                    <div class="container">
                        <div class="row" style={{ paddingTop: '100px', paddingBottom: "100px" }}>
                            <div class="col-lg-12">

                                <h2>PRIVACY POLICY</h2>

                                <p>Eduvanz Financing Private Limited, registered as Non-Banking Financial Company (NBFC) with Reserve Bank of India (RBI), having its registered office at B/202, Times Square Building, Opp. Mittal Industrial Estate, Andheri Kurla Road, Andheri East, Mumbai - 400 059 owns, manages and operates this platform under brand name “Eduvanz” (hereinafter referred as “Company”, ‘We’, “Us”, “Our”, “Eduvanz”).</p>

                                <p>When you use our application (“App”), you’re trusting us with your information. We respect your privacy and are committed to protecting it through our compliance with this privacy policy.</p>

                                <p>This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can delete your information.</p>
                                <p>For the purpose of this Privacy Policy, the users of the Services may be customer/consumers, or any other persons using Services or accessing our App (“user” or “you” or “your”).</p>
                                <p>If you do not agree to this Policy or any part thereof, please do not use or access our App or any part thereof.</p>
                                <h6 className='mt-2 mb-2'>1.
                                    INFORMATION THE APP COLLECTS</h6>
                                <p>When you use our App, we collect and store your information (personal information) which is provided by you from time to time by explicitly seeking permissions from you to get the required information. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience and services. This allows us to provide services and features that meets your needs, and to customize our App to make your experience safer and easier and to improve the services provided by us. More importantly, we collect personal information from you that we consider necessary for achieving the aforementioned purpose.</p>
                                <p>In general, you can browse the Website or App without telling us who you are or revealing any personal information about yourself. However, to create an account on the Website or App, you must provide us with certain basic information required to provide customized services. The information we collect from you, inter alia, including:</p>
                                <p>a. Information you create or provide to us</p>
                                <p>When you install our app, for first time login you provide us with your personal information which includes phone number for mobile number verification.</p>
                                <p>b. Information we collect as you use our application</p>
                                <p>1. Your Device</p>
                                <p>We collect information about the device you use which helps us provide features like automatic updates.</p>
                                <p>The information we collect includes your device’s unique ID i.e. IMEI number, operating system version, SDK version and mobile network information including carrier name, SIM Serial and SIM Slot.</p>
                                <p>We collect this information when you download and install the App and give the permission to read the device information.</p>
                                <p>While using the App, it periodically sends information to our servers. This information includes things like your SMS.</p>
                                <p>2. Your SMSs</p>
                                <p>We don’t collect or store your personal SMS from your inbox.

                                    We only collect financial SMS sent by 6-digit alphanumeric senders from your inbox which helps us in identifying the various accounts that you are holding and the cash flow patterns that you have as a user to help us perform a credit risk assessment which enables us to determine your risk profile and to provide you with the appropriate credit analysis to enable you to take financial facilities from the regulated financial entities and other service providers available on the App. While using the app, it periodically sends the financial SMS information to our affiliate server and to us.

                                    Where possible, we indicate the mandatory and the optional fields. You always have the option to not provide your personal information by choosing not to use a particular service or feature on the App. We also collect other identifiable information (your payment card details and transaction histories on the App) from you when you set up a free account with us as further detailed below. While you can browse some sections of our App without being a registered member as mentioned above, certain activities (such as availing of loans from the third party lenders on the App) requires registration and for you to provide the above details. The App shall clearly display the personal information it is collecting from you, and you have the option to not provide such personal information. However, this will limit the services provided to you on the App.</p>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
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

export default connect(mapStateToProps)(Privacy);