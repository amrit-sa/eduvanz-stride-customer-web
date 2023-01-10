import React, { Component } from 'react'
import Helmet from "react-helmet";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from "../common/header";
import { getProfileById } from "../actions/user";
import ProfileSidebar from "../common/profile-sidebar";
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


class MyWishlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            percent_value: 80,
            percent_value_2: 80,
        }
    }

    async componentDidMount() {
        const { user } = this.props;
        let data = {
            id: user,
        }
       // await this.props.dispatch(getProfileById(data));
        this.handleLimitChart1();
        this.handleLimitChart2();
    }


    handleLimitChart2 = () => {
        var options2 = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        label: '# of Votes',
                        data: [this.state.percent_value_2, (100 - this.state.percent_value_2)],
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

        var ctx2 = document.getElementById('chartJSContainer_2').getContext('2d');
        new Chart(ctx2, options2);
    }



    render() {
        const { user, profile, isLoading, recentProd, sfid } = this.props;
        if (!sfid) {
            return <Redirect to="/login" />;
        }
        let userdetails = profile && profile.profile ? profile.profile : ''
        return (
            <>

                <Helmet>
                    <title>Profile</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <Header
                    user={user}
                />

                <div className='dashboard-body'>

                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col'>
                                <h4>Hello, {userdetails && userdetails.first_name__c ? userdetails.first_name__c : ''}</h4>
                                <p className='text-gray'>Welcome Back!</p>
                            </div>
                        </div>
                        <div className='row'>
                            <ProfileSidebar
                                history={this.props.history}
                                profile= {this.props.profile}
                                recentProd={this.props.recentProd}
                                user = {this.props.user}
                            />
                            <div className='col-xl-9 col-lg-8'>
                                <div className=''>

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
    const { user, sfid, isLoading } = state.auth;
    const { profile, recentProd } = state.user;
    return {
        user,
        sfid,
        recentProd,
        isLoading,
        profile,
    };
}

export default connect(mapStateToProps)(MyWishlist);