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

class About extends Component {

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
                            <div class="col-lg-6 col-md-6" align="center">

                                <img className='img-responsive story-img' src="https://d1idiaqkpcnv43.cloudfront.net/assets/webimages/map.png" height="450" width="500" />
                            </div>
                            <div class="col-lg-6 col-md-6" style={{ paddingTop: '40px' }}>
                                <div className='text-center mt-5'>
                                    <p className='text-center mb-5' style={{ fontWight: "300", fontSize: "30px" }}>THE EDUVANZ STORY</p>
                                    <h6 className='mt-2 mb-4'>Supporting the Success of Learners & Leaders</h6>
                                    <p>Eduvanz is a digital Fintech NBFC helping Learners discover and finance their Learning & Career Goals with fast, convenient, and affordable No Cost Financing Solutions.</p>

                                    <p>Eduvanz was founded to offer convenient and flexible financial assistance to Students and Leaders who want Quick Results, Attractive Benefits and Transparent Conversations.</p>

                                </div>
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

export default connect(mapStateToProps)(About);