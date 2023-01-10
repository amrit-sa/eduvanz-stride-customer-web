import React, { Component } from 'react'
import Helmet from "react-helmet";
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux'
import HeaderNew from "../common/headerNew";
import Header from "../common/header";
import ContentLoader from 'react-content-loader';
import { Link } from "react-router-dom";
import { getGlobalSearch } from "../actions/product";
import { getProfileById } from "../actions/user";
import { favProduct, getViewedProduct } from "../actions/user";


class ProfilSidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recentPro: null,
        }

    }

    async componentDidMount() {
        const { user } = this.props;
        let data = {
            id: user,
        }
        await this.props.dispatch(getProfileById(data));
        let viewData = {
            user_id: user,
        }
        await this.props.dispatch(getViewedProduct(viewData));
    }

    render() {
        const { user, username, isSearching, profile, searchDet, isLoading, recentProd, sfid } = this.props
        
        if (!sfid) {
            return <Redirect to="/login" />;
        }
        let userdetails = profile && profile.profile ? profile.profile : ''
        let proPic = profile && profile.photo && profile.photo.base64 ? profile.photo.base64 : ''
        return (
                <div className='col-xl-3 col-lg-4'>
                    <div className='dashboard-sidebar pt-4'>
                        <div className='user-avator rounded-circle m-auto overflow-hidden'>
                            {profile && profile !== undefined && profile.length > 0 ?
                                (<img src={`data:image/jpg;base64,${proPic.base64}`} className="object-cover" />) :
                                (
                                    <img src="/images/default_profile.png" className="object-cover" />
                                )
                            }


                        </div>
                        <h5 className='text-center mt-3'>{userdetails && userdetails.first_name__c ? userdetails.first_name__c : ''}</h5>

                        <div className='mt-4'>
                            <div className='d-flex align-items-center mb-3'>
                                <img src="images/dashboard/call.png" className="img-fluid" /> <span className='d-inline-block ml-3'>{userdetails && userdetails.phone ? userdetails.phone : ''}</span>
                            </div>
                            <div className='d-flex align-items-center'>
                                <img src="images/dashboard/msg.png" className="img-fluid" /> <span className='d-inline-block ml-3 text-truncate'>{userdetails && userdetails.email__c ? userdetails.email__c : ''}</span>
                            </div>
                        </div>

                        <hr className='my-4' />

                        <div>
                            <h5 className='mb-4'>Recent History</h5>
                            <ul className='rh_list'>
                                {recentProd && recentProd !== undefined && recentProd.length > 0 ? (
                                    recentProd.map((item, index) => (<li>{item.name.slice(0, 15)}</li>))) : (<></>)}
                                {/* <li>Laptop</li>
                                <li>MacBook PRO</li>
                                <li>JS</li>
                                <li>Upgrad Course</li>
                                <li>User Research</li>
                                <li>Prototyping</li>
                                <li>Decision Making</li> */}
                            </ul>
                        </div>
                        <hr className='my-4' />

                        <div className=''>
                            {/* <h5 className='mb-4'>Settings</h5> */}
                            <ul className='sidebar_menu'>
                                <Link to='' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-user-o font-weight-normal mb-0 mr-3"></i>
                                                Profile
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                <Link to='' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="red-dot"></div>
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-object-group font-weight-normal mb-0 mr-3"></i>
                                                Order
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                <Link to='/wish-list' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-heart-o font-weight-normal mb-0 mr-3"></i>
                                                Wishlist
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                <Link to='/notification' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="red-dot"></div>
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-bell-o font-weight-normal mb-0 mr-3"></i>
                                                Notifications
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                <Link to='/support' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-headphones font-weight-normal mb-0 mr-3"></i>
                                                Support
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                <Link to='' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-cog font-weight-normal mb-0 mr-3"></i>
                                                Settings
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                <Link to='/login' className='text-dark'>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 py-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center fs-17">
                                            <div>
                                                <i className="fa fa-sign-out font-weight-normal mb-0 mr-3"></i>
                                                Logout
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                {/* <li><img src="images/dashboard/user-icon.png" className="img-fluid mr-2" /> Profile <i className="fa fa-angle-right" aria-hidden="true"></i></li>
                                            <li><img src="images/dashboard/history.png" className="img-fluid mr-2" /> Orders <i className="fa fa-angle-right" aria-hidden="true"></i></li>
                                            <li><img src="images/dashboard/ep.png" className="img-fluid mr-2" /> Support <i className="fa fa-angle-right" aria-hidden="true"></i></li>
                                            <li><img src="images/dashboard/address.png" className="img-fluid mr-2" /> Manage Addresses <i className="fa fa-angle-right" aria-hidden="true"></i></li>
                                            <li><img src="images/dashboard/about.png" className="img-fluid mr-2" /> About <i className="fa fa-angle-right" aria-hidden="true"></i></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}


function mapStateToProps(state) {
    const { user, sfid, isLoading } = state.auth;
    const { profile, recentProd } = state.user;
    console.log("state.user", state.user)
    return {
        user,
        sfid,
        isLoading,
        profile,
        recentProd,
    };
}

export default connect(mapStateToProps)(ProfilSidebar);

//export default reduxForm({form: 'header'})(Dashboard);