import React, { Component } from 'react'
import Helmet from "react-helmet";
import '../my-sass.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from "../common/header";
import { asset } from "../common/assets";

import { addStoreRating, getStoreRating, getAccountProfile, getProfileById } from "../actions/user";
import { Chart, registerables } from 'chart.js'


Chart.register(...registerables)

class Undergrad extends Component {

    constructor(props) {
        super(props)
        this.state = {
            percent_value: 0,
            percent_value_2: 0,
            rating: 0,
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

            }
        }
    }

    render() {
        const { user, profile, isLoading,  sfid } = this.props;

        if (!sfid) {
            return <Redirect to="/login" />;
        }
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
                <Header
                    user={user}
                />

                <div className='dashboard-body'>
                <div className='container mt-5'>
                    
                    <h4 style={{ fontSize: "36px", fontWeight: "600" }}
                                >Undergrad Page</h4>
                    </div>
                    <section className="mbr-section article content1 cid-qvbjomyZfb" id="content1-7y" data-rv-view="8341">
                      <div className="container">
                         <div className="media-container-row">
                             <div className="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
                             Empowering learners globally by enabling discovery and access to a universe of infinite opportunities. We are committed to providing high quality and reliable solutions to all our stakeholders through innovative technology products.
                                  </div>
                        </div>
                     </div>
                    </section>
                      

                </div>
              </>
        )
    }
}

function mapStateToProps(state) {
    const { user, sfid, isLoading } = state.auth;
    const { profile, recentProd, store_rating } = state.user;
    return {
        user,
        sfid,
        store_rating,
        recentProd,
        isLoading,
        profile,
    };
}

export default connect(mapStateToProps)(Undergrad);