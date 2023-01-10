import React, { Component } from "react"
import { connect } from 'react-redux';

class WishListSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        const { user, username, isSearching, searchDet, isLoading } = this.props
        return (
            <>
                <div className="col-lg-3 pl-lg-0 mb-3 mb-lg-0">
                    <div className="card rounded-4 border border-white bg-wish-card">
                        <div className="card-body p-lg-5">
                            <div className="text-center">
                                <img src='/images/wishlist/profile.png' className='rounded-circle border-white border-5 p-1 shadow' />
                                <h5 className="mt-3 font-weight-bold">Pankaj Mestry</h5>
                            </div>
                            <div className="my-5">
                                <div className="d-flex align-items-center mb-4">
                                    <img src='/images/wishlist/phone_icon.png' className='mr-3' />
                                    <h5 className="mb-0">9004591363</h5>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <img src='/images/wishlist/mail_icon.png' className='mr-3' />
                                    <h5 className="mb-0 ">pankaj.mestry@gmail.com</h5>
                                </div>
                            </div>
                            <hr />
                            <div className="my-5">
                                <h5 className="mb-3">Recent History</h5>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">Laptop</p>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">MacBook PRO</p>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">JS</p>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">Upgrad Course</p>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">User Research</p>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">Prototyping</p>
                                <p className="rounded-pill bg-rec py-2 px-3 text-dark fs-13 font-weight-bold mr-2 d-line-block mb-3">Decision Making</p>
                            </div>
                            <hr />
                            <div className="my-5">
                                <ul className="list-group list-group-flush wish-list bg-transparent">
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="fa fa-user-o h5 font-weight-bold mb-0 mr-3"></i>
                                                Profile
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="red-dot"></div>
                                            <div>
                                                <i className="fa fa-object-group h5 font-weight-bold mb-0 mr-3"></i>
                                                Order
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative active">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="fa fa-heart-o h5 font-weight-bold mb-0 mr-3"></i>
                                                Wishlist
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative">
                                        <div className="red-dot"></div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="fa fa-bell-o h5 font-weight-bold mb-0 mr-3"></i>
                                                Notifications
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="fa fa-headphones h5 font-weight-bold mb-0 mr-3"></i>
                                                Support
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="fa fa-cog h5 font-weight-bold mb-0 mr-3"></i>
                                                Settings
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item border-0 px-3 rounded-3 mb-2 position-relative">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="fa fa-sign-out h5 font-weight-bold mb-0 mr-3"></i>
                                                Logout
                                            </div>
                                            <div className="">
                                                <i className="fa fa-angle-right h5 font-weight-bold mb-0"></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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
    const { isSearching, searchDet } = state.product
    return {
        isSearching,
        isLoading,
        searchDet,
        username,
        user,
        sfid
    };
}

export default connect(mapStateToProps)(WishListSidebar);
