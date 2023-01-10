import React from "react";
import $ from 'jquery';
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import { Link, Redirect } from "react-router-dom";

const initial = {
    isLogedOut: false,
}



class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = initial
        this.myRef = React.createRef()   // Create a ref object 
        this.state = {

        }
    }

    componentDidMount() {
        var headerDesktop = $('.container-menu-desktop');
        var wrapMenu = $('.wrap-menu-desktop');

        if ($('.top-bar').length > 0) {
            var posWrapHeader = $('.top-bar').height();
        }
        else {
            var posWrapHeader = 0;
        }
        if ($(window).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        }
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > posWrapHeader) {
                $(headerDesktop).addClass('fix-menu-desktop');
                $(wrapMenu).css('top', 0);
            }
            else {
                $(headerDesktop).removeClass('fix-menu-desktop');
                $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
            }
        });

        $(".hamburger-box").on('click', function () {
            $('.menu-mobile').slideToggle();
        })
    }

    handleLogout = () => {
        localStorage.clear();
        this.setState({ isLogedOut: true });
        window.location = "/login"
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <header>
                    {/* Header desktop */}
                    <div className="container-menu-desktop" ref={this.myRef}>
                        <div className="wrap-menu-desktop">
                            <nav className="limiter-menu-desktop container">
                                {/* Logo desktop */}
                                <a href="/home" className="logo">
                                    eduvanz.
                                </a>
                                {/* Menu desktop */}
                                <div className="menu-desktop">
                                    <ul className="main-menu">
                                        <li className="active-menu">
                                            <a href="/how-it-work">How it works</a>
                                        </li>
                                        <li>
                                            <a href="/about">About Us</a>
                                        </li>
                                        <li>
                                            <a href="/for-merchant">For Merchant</a>
                                        </li>
                                        <li>
                                            <a href="/undergrad">Undergrad</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* Icon header */}
                                <div className="wrap-icon-header flex-w flex-r-m">
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search"></div>
                                    <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 d-flex align-items-center">
                                        <a
                                            href="#"
                                            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                                        >
                                            <span className="header-icon-wrapper"><img src={asset + "images/icons/fi-rr-following.png"} alt="fi-rr-following" /></span>

                                        </a>
                                        <a
                                            className="btn btn-outline-secondary btn-button-get px-4"
                                            href="/home"
                                            role="button"
                                        >
                                            Get Started
                                        </a>
                                    </div>
                                    {user ? (
                                        <>
                                            <a>
                                                <div
                                                    onClick={()=>this.handleLogout()}
                                                    className="btn btn-primary btn-button-signin px-4"
                                                    role="button"
                                                >
                                                    Logout
                                                </div>
                                            </a>
                                        </>
                                    ) : (
                                        <Link to="/login">
                                            <div
                                                className="btn btn-primary btn-button-signin px-4"
                                                role="button"
                                            >
                                                Sign in
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                    {/* Header Mobile */}
                    <div className="wrap-header-mobile">
                        {/* Logo moblie */}
                        <div className="logo-mobile">
                            <a href="index.html">
                                <img src={asset + "images/icons/logo-01.png"} alt="IMG-LOGO" />
                            </a>
                        </div>
                        {/* Icon header */}
                        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
                                <i className="zmdi zmdi-search" />
                            </div>
                            <div
                                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                                data-notify={2}
                            >
                                <i className="zmdi zmdi-shopping-cart" />
                            </div>
                            <a
                                href="#"
                                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
                                data-notify={0}
                            >
                                <i className="zmdi zmdi-favorite-outline" />
                            </a>
                        </div>
                        {/* Button show menu */}
                        <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
                            <span className="hamburger-box">
                                <span className="hamburger-inner" />
                            </span>
                        </div>
                    </div>
                    {/* Menu Mobile */}
                    <div className="menu-mobile">
                        <ul className="topbar-mobile">
                            <li>
                                <div className="right-top-bar flex-w h-full">
                                    <a href="#" className="flex-c-m p-lr-10 trans-04">
                                        Help &amp; FAQs
                                    </a>
                                    <a href="#" className="flex-c-m p-lr-10 trans-04">
                                        My Account
                                    </a>
                                    <a href="#" className="flex-c-m p-lr-10 trans-04">
                                        EN
                                    </a>
                                    <a href="#" className="flex-c-m p-lr-10 trans-04">
                                        USD
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <ul className="main-menu-m">
                            <li>
                                <a href="#">How it works</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">For Merchant</a>
                            </li>
                            <li>
                                <a href="#">Undergrad</a>
                            </li>
                        </ul>
                    </div>
                    {/* Modal Search */}
                    <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
                        <div className="container-search-header">
                            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                                <img src={asset + "images/icons/icon-close2.png"} alt="CLOSE" />
                            </button>
                            <form className="wrap-search-header flex-w p-l-15">
                                <button className="flex-c-m trans-04">
                                    <i className="zmdi zmdi-search" />
                                </button>
                                <input
                                    className="plh3"
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                />
                            </form>
                        </div>
                    </div>
                </header>

            </>
        )
    }
}

Header.propTypes = {
    ...propTypes,
    user: PropTypes.any,
}

export default reduxForm({ form: 'header' })(Header);