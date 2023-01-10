import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import ContentLoader from 'react-content-loader';
import { asset } from "../common/assets";
import { Link } from "react-router-dom";
import { getGlobalSearch, searchGlobalProduct, trendingSearchRemove } from "../actions/product";
import { Scrollbar } from "react-scrollbars-custom";
import OutsideClickHandler from 'react-outside-click-handler';
import { getCategory, getSubCategory } from "../actions/user";
import { getFavoriteProductCount, trendingSearch, getSearchHistory, getTopProducts } from "../actions/product";
import { MobileView, isMobile } from 'react-device-detect';
import Carousel from 'react-multi-carousel';
import { getProductsJSX } from "../helpers/DealLayoutGenerator";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 991 },
        items: 3
    },
    mediumtab: {
        breakpoint: { max: 991, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
class HeaderNew extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchDropdown: false,
            autoSearchWrapper: false,
            search: '',
            searchData: [],
            subCategory: [],
            selectedTab: 'trending',
            selectedCat: 0,
            category: null,
            toggleModal: false,
            searchMenu: true,
            trendingSearchData: [],
            asset: null,
            topProducts: null,
        }
        this.myRef = React.createRef();
        this.searchRef = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.pushPage = this.pushPage.bind(this)
    }



    handleSearchMenu = () => {
        this.setState({ searchMenu: false });
    }

    handleChange = (e) => {
        this.setState({ searchDropdown: true });
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
        let searchText = e.target.value;
        if (searchText.length > 3) {
            $('.searchDDWrapper').show();
            $('.searchDDWrapper').slideDown();
            this.searchProduct(searchText);
            $('.top_search_box').addClass('bgcolor')
        } else {
            this.setState({ searchData: [] });
            $('.searchDDWrapper').hide();
        }
    }

    handleSearch = () => {
        $('.searchDDWrapper').slideDown();
        $('.top_search_box').addClass('bgcolor')
    }

    removeTrendingSearchItem = (id) => {
        let data = { content_id: id }
        this.props.dispatch(trendingSearchRemove(data)).then((response) => {
            if (response) {
                // console.log(response,"RESPPPIUI")
                if (response && response.status === "success") {
                    let new_data = [...this.state.trendingSearchData]
                    let nd = new_data.filter(item => item.id !== id)
                    this.setState({ trendingSearchData: nd });
                } else {
                    // this.setState({ trendingSearchData: null });
                }
            }
        });
    }

    componentDidMount() {
        var headerDesktop = $('.header-sticky');
        var wrapMenu = $('.site-header-wrap');
        this.props.dispatch(getCategory()).then((response) => {
            if (response) {
                if (response.responseCode !== undefined && response.responseCode === 200) {
                    this.setState({ category: null });
                } else {
                    this.setState({ category: response });
                }
            }
        });
        let data = {
            user_sfid: this.props.sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
        this.props.dispatch(trendingSearch()).then((response) => {
            if (response) {
                if (response && response.status === "success") {
                    this.setState({ trendingSearchData: response.data });
                } else {
                    this.setState({ trendingSearchData: null });
                }
            }
        });
        this.props.dispatch(getTopProducts()).then((response) => {
            if (response) {
                if (response && response.responseCode !== 400) {
                    this.setState({topProducts: response});
                } else {
                    this.setState({topProducts: null});
                }
            }
        });
        let obj = {
            user_sfid: this.props.sfid
        }

        try{
            this.props.dispatch(getSearchHistory(obj));
        }catch{
            
        }
        if ($('.top-bar').length > 0) {
            var posWrapHeader = $('.top-bar').height();
        } else {
            var posWrapHeader = 0;
        }
        if ($(window).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('sticky-header');
            $(wrapMenu).css('top', 0);
        } else {
            $(headerDesktop).removeClass('sticky-header');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > posWrapHeader) {
                $(headerDesktop).addClass('sticky-header');
                $(wrapMenu).css('top', 0);
            } else {
                $(headerDesktop).removeClass('sticky-header');
                $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
            }
        });

        $(".toggle-btn").on('click', function () {
            $('.toggle-btn').toggleClass('active-close-btn');
            $('.header-menu').toggleClass('active-menu-bar');
            $('.searchDDWrapper').hide();
        })

        $('.toggle-search').on('click', function () {
            $('.top_search_box_wrapper').toggleClass('slide');
        })

        $('.category-toggle').on('mouseover', function (e) {
            $('.category-dropdown').show();
            $('.searchDDWrapper').hide();
            $(this).addClass("up");
            e.stopPropagation();
        });

        $(".category-dropdown").on('mouseover', function (e) {
            e.stopPropagation();
        });

        $(document).on('mouseover', function () {
            $(".category-dropdown").hide();
            $('.category-toggle').removeClass("up");
        });
    }

    componentDidUpdate() {
        const { history } = this.props
        $(".search-product").on('click', function () {
            const proId = $(this).attr('id');
            history.push(`/product-details/${proId}`);
            window.location.reload()
        })
    }

    searchProduct = (search) => {
        const payload = {
            "search": search,
            "category_id": "",
            "parent_id": "",
            "user_sfid": this.props.sfid
        }
        this.props.dispatch(getGlobalSearch(payload)).then((response) => {
            // console.log(response,"xxxxxxxxxxxxxxxxxxxx")
            if (response && response.status === "success") {
                this.setState({ searchData: response.data });
                // this.props.history.push("/products-list");
            } else {
                this.setState({ searchData: [] });
            }
        });
    }

    handleLogout = () => {
        localStorage.clear();
        window.location = "/login"
        this.setState({ isLogedOut: true });
    }

    pushPage(e) {
        e.stopPropagation();
    }

    handleClear = () => {
        console.log(this.searchRef);
        this.setState({ search: "", searchData: [] });
    }

    handleSearchBtn = () => {
        if (this.state.search && this.state.search.length > 0) {
            this.props.history.push("/search-listing?search=" + this.state.search);
        }
    }

    inputfocus = (elmnt) => {
        if (elmnt.key === "Enter") {
            this.props.history.push("/search-listing?search=" + this.state.search);
            // window.location.reload()
            this.props.dispatch(getGlobalSearch(this.state.search)).then((response) => {
                if (response && response.status === "success") {
                    this.setState({ searchData: response.data });
                    // console.log(response,"xxxxxxxxxxxxxxxxxxxx")
                    // this.props.history.push("/products-list");
                } else {
                    this.setState({ searchData: [] });
                }
            });
        }
    }

    handleTopSearch = (search) => {
        this.props.history.push(`/search-listing?search=${search}`);
    }

    getSubCategory = (parent_id) => {
        let data = {
            parent_id: parent_id
        }
        this.setState({ selectedCat: parent_id });
        this.props.dispatch(getSubCategory(data)).then((response) => {
            if (response.responseCode !== undefined && response.responseCode === 200) {
                this.setState({ subCategory: [] });
            } else {
                this.setState({ subCategory: response });
            }
        });
    }

    handleChangeTab = (search_item) => {
        this.props.history.push("/search-listing?search=" + search_item);
    }

    /* handleSearch = () =>{
        if(this.state.search && this.state.search.length > 3)
        {
            $('.searchDDWrapper').slideDown();
        }
    } */

    render() {
        const { user, username, isSearching, searchDet, favorite_count, sfid, history } = this.props
        const {
            selectedTab,
            searchData,
            search,
            category,
            subCategory,
            selectedCat,
            searchMenu,
            trendingSearchData,
            topProducts
        } = this.state
        
        let showSubHeader = true;

        if(this.props.showSubHeader === false ){
            showSubHeader = false;
        }
      //  console.log("showSubHeader",showSubHeader,this.props.showSubHeader);
        return (
            <>

                <header className="header-sticky">
                    {/* Header desktop */}
                    <div className="site-header  position-static-header" ref={this.myRef}>
                        <div className="site-header-wrap">
                            <nav className="limiter-menu-desktop container">
                                {/* Logo desktop */}
                                <a href="" onClick={(e) => { e.preventDefault(); this.props.history.push("/") }} className="logo">
                                    <img src={`${asset}images/brandlogo.png`} />

                                </a>
                                {/* Menu desktop */}
                                <div className="menu-desktop">
                                    <div className='header-menu'>
                                        <ul className="main-menu pl-0">
                                            <li className="active-menu">
                                                <a href="" onClick={(e) => { e.preventDefault(); history.push('/') }}>
                                                    <span><img className="storeicon"
                                                        src={`${asset}images/storemenu-icon.png`} /> Store </span>

                                                    <span className='small-arrow d-block d-lg-none'><img
                                                        src={`${asset}images/icons/arrow-mobile.png`} /></span></a>
                                            </li>
                                            {showSubHeader === false && <li className="">
                                                <a href="" onClick={(e) => { e.preventDefault(); history.push('./') }}>
                                                    <span>
                                                         <img src='./images/icons/virtualCard.png' alt="" />Virtual Card </span>
                                                    </a>
                                                    {/* <span className='small-arrow d-block d-lg-none'><img
                                                        src={`${asset}images/icons/arrow-mobile.png`} /></span></a> */}
                                            </li>}
                                            <li className="mobile-menu-list d-block d-lg-none">
                                                <ul className="sub-main-menu">
                                                    {
                                                        category && category.map(item => (
                                                            <li key={item.category_id} className="active-menu">
                                                                <a href="" onClick={(e) => { e.preventDefault(); this.props.history.push("/products-list?category=" + encodeURIComponent(item.category_name)) }}>
                                                                    <span><img className="storeicon"
                                                                        src={item.category_image} /> {item.category_name} </span>
                                                                    <span className='small-arrow d-block d-lg-none'><img
                                                                        src={`${asset}images/icons/arrow-mobile.png`} /></span></a>
                                                            </li>
                                                        ))
                                                    }

                                                    {/*<li className="menu-link">*/}
                                                    {/*<a href="/products-list?category=Electronic">*/}
                                                    {/*<span><img src={`${asset}images/laptop-icon1.png`} /> Electronics</span> */}
                                                    {/* <span className='small-arrow d-block d-lg-none'><img src={`${asset}images/icons/arrow-mobile.png`}/></span></a>*/}
                                                    {/*</li>*/}


                                                </ul>
                                            </li>
                                            {/* <li className="menu-link">
                                                <a href="/virtual-no-card">
                                                    <span><img src={`${asset}images/credit-menuicon.png`} /> Virtual Card </span><span
                                                        className='small-arrow d-block d-lg-none'><img
                                                            src={`${asset}images/icons/arrow-mobile.png`} /></span></a>
                                            </li> */}
                                            <li className="menu-link">
                                                <button className='payment-btn d-block d-lg-none'>
                                                    <span><img
                                                        src={`${asset}images/cash-flowicon.png`} />  Payments </span><span
                                                            className='small-arrow d-block d-lg-none'><img
                                                            src={`${asset}images/icons/arrow-mobile.png`} /></span></button>
                                            </li>
                                            <li className="menu-link">
                                                <button onClick={() => this.props.history.push('/wish-list')}
                                                    className="wish-list  d-block d-md-none">
                                                    {favorite_count && (
                                                        <span className='badge_tag'>{favorite_count}</span>)}
                                                    <span> <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                        <span className='wishlits-text'>Wishlist</span></span>
                                                    <span className='small-arrow d-block d-lg-none'><img
                                                        src={`${asset}images/icons/arrow-mobile.png`} /></span>
                                                </button>
                                            </li>
                                            <li className="menu-link">
                                                {
                                                    user || sfid ? (
                                                        <>
                                                            <button className="user-link d-block d-lg-none"
                                                                data-toggle="dropdown" aria-haspopup="true"
                                                                aria-expanded="false">
                                                                <span><img
                                                                    src={`${asset}images/icons/user-adminicons.png`}
                                                                    alt="user" /></span>
                                                                <span>{username}</span>
                                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-right ">
                                                                <a href="/dashboard">
                                                                    <button
                                                                        className="w-100 px-3"
                                                                        type="button"
                                                                    >
                                                                        Profiles
                                                                    </button>
                                                                </a>
                                                                <button onClick={this.handleLogout}
                                                                    className="w-100 px-3" type="button">Logout
                                                                </button>
                                                            </div>

                                                        </>
                                                    ) : (
                                                        <Link to="/login" style={{ paddingLeft: '20px' }}>
                                                            <div
                                                                className="btn btn-primary btn-button-signin px-4 d-lg-none"
                                                                role="button"
                                                            >
                                                                Login
                                                            </div>
                                                        </Link>
                                                    )
                                                }
                                            </li>

                                            <li className="menu-link loggednuser d-block d-lg-none">
                                                <a href="#">
                                                    <span><img className="storeicon" src={`${asset}images/coins1.png`} /> Credit Limit: <b
                                                        className="ml-2">₹2,80,000 </b>
                                                    </span></a>
                                            </li>
                                            {/* <li className="menu-link notloggednuser d-block d-lg-none">
                                                <a href="#"><span><img className="storeicon"
                                                    src={`${asset}images/coins1.png`} /> Get a Pre-approved Limit </span>
                                                    <span className='small-arrow d-block d-lg-none'><img
                                                        src={`${asset}images/icons/arrow-mobile.png`} /></span> </a>
                                            </li> */}

                                        </ul>
                                        <div className="header-bottom-menu d-block d-lg-none">
                                            <a href="#" className="get-app-btn">Get the App</a>
                                            <a href="#" className="get-login-btn nonlogeding">Login</a>
                                        </div>
                                    </div>
                                    <div className='middle-bar'>
                                        <OutsideClickHandler
                                            onOutsideClick={() => {
                                                $('.searchDDWrapper').hide();
                                                $('.top_search_box').removeClass('bgcolor');
                                                this.setState({ search: "", searchData: [] });
                                                $('.top_search_box_wrapper').removeClass('slide');

                                            }}
                                        >
                                            <div className='top_search_box_wrapper shadow_'>

                                                <div className='top_search_box'>
                                                    <input
                                                        className='header-search-input'
                                                        type="text"
                                                        placeholder='What are you looking for?'
                                                        name="search"
                                                        value={this.state.search ? this.state.search : ''}
                                                        autoComplete="off"
                                                        onChange={this.handleSearchChange}
                                                        onKeyUp={e => this.inputfocus(e)}
                                                        onClick={this.handleSearch}
                                                    />
                                                    {search && (
                                                        <button className='search-clear' type=""
                                                            onClick={this.handleClear}>
                                                            <img src={`${asset}images/icons/cross3.png`} alt=""
                                                                className='img-fluid' />
                                                        </button>
                                                    )}

                                                    <button type="button" onClick={this.handleSearchBtn}
                                                        className='search_btn'>
                                                        <img src={`${asset}images/icons/search_icon.png`} alt=""
                                                            className='img-fluid' />
                                                    </button>
                                                </div>

                                                <>

                                                    <div className='searchDDWrapper'>
                                                        {/* <div className='top_search_box2 mr-0'>
                                                <input 
                                                    type="text" 
                                                    name="search"
                                                    value={this.state.search?this.state.search:''}
                                                    onChange={this.handleSearchChange}
                                                    className='w-100 header-search-input d-block' 
                                                    placeholder='What are you looking for?'
                                                />
                                                {search && (
                                                <button className='search-clear' type="" onClick={this.pushPage}>
                                                    <img src={`${asset}images/icons/cross3.png` alt="" className='img-fluid'/>
                                                </button>
                                                )}
                                                <button className='search-submit' type=''  onClick={this.handleClear}>
                                                    <img src={`${asset}images/icons/search_icon.png`} alt="" className='img-fluid'/>
                                                </button>
                                            </div> */}
                                                        {!this.state.search && (
                                                            <div className='pl-3 pr-3 pt-0 whiteSmokeBg'>
                                                                {searchMenu && (
                                                                    <div className='row mb-3'>
                                                                        <div className='col t_s_bar py-2 bg-head-serch'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <div
                                                                                    className='flex-1 d-flex align-items-start t_s_r_w justify-content-between'>
                                                                                    <ul className='list-unstyled some_p_r d-flex  m-0'>
                                                                                        <li className='t_s cursor-point'
                                                                                            onClick={() => this.handleChangeTab('trending')}>
                                                                                            <img
                                                                                                src={`${asset}images/icons/fire-icon.png`}
                                                                                                alt=""
                                                                                                className='img-fluid' />
                                                                                            Trending Search
                                                                                            <i className="fa fa-angle-right"
                                                                                                aria-hidden="true"></i>
                                                                                        </li>

                                                                                        {
                                                                                            this.state.trendingSearchData.map((item, index) => {
                                                                                                // console.log(this.state.trendingSearchData , "zzzzzzzzzzzzz");
                                                                                                return (
                                                                                                    <li key={index} className='cursor-point'
                                                                                                        onClick={() => this.handleChangeTab(item.search__c)}>{item.search__c}
                                                                                                    </li>
                                                                                                )
                                                                                            })
                                                                                        }




                                                                                        {/* <li className='cursor-point'
                                                                                            onClick={() => this.handleChangeTab('macbookair')}>Macbook
                                                                                            Air
                                                                                        </li>
                                                                                        <li className='cursor-point'
                                                                                            onClick={() => this.handleChangeTab('macbookpro')}>Macbook
                                                                                            Pro
                                                                                        </li>
                                                                                        <li className='cursor-point'
                                                                                            onClick={() => this.handleChangeTab('trending')}>UI
                                                                                            Specialization
                                                                                        </li>
                                                                                        <li className='cursor-point'
                                                                                            onClick={() => this.handleChangeTab('trending')}>Full-Stack
                                                                                            Development
                                                                                        </li>
                                                                                        <li className='cursor-point'
                                                                                            onClick={() => this.handleChangeTab('trending')}>UI
                                                                                            Specialization
                                                                                        </li> */}
                                                                                    </ul>
                                                                                    <button type='button'
                                                                                        className='cursor-point'
                                                                                        onClick={this.handleSearchMenu}>
                                                                                        <img
                                                                                            src={`${asset}images/icons/cross3.png`}
                                                                                            alt=""
                                                                                            className='img-fluid' />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {selectedTab === 'trending' && (
                                                                    <div className='row'>
                                                                        {/* {trendingSearchData && trendingSearchData.length > 0 && (
                                                                            <div className='col-sm-4'>
                                                                                <div className='auto_s_r'>
                                                                                    <ul className='list_ '>
                                                                                        {trendingSearchData.map((item, index) => (
                                                                                            <li key={`search-item-${index}`}
                                                                                                className='d-flex align-items-center'>
                                                                                                <div
                                                                                                    className='txt d-flex align-items-center cursor-point'
                                                                                                    onClick={() => this.handleTopSearch(item.search__c)}>
                                                                                                    <img
                                                                                                        src={`${asset}images/icons/clock-icon.png`}
                                                                                                        className="img-fluid" />
                                                                                                    <p className='m-0'>{item.search__c}</p>
                                                                                                </div>
                                                                                                <button onClick={() => {
                                                                                                    this.removeTrendingSearchItem(item.id)
                                                                                                }} type='button'><img
                                                                                                        src={`${asset}images/icons/cross3.png`}
                                                                                                        className="img-fluid" />
                                                                                                </button>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        )} */}
                                                                        {topProducts && topProducts.length > 0 && (
                                                                            <div className='col-sm-12'>
                                                                                <div className="d-flex justify-content-between align-items-center mb-2 position-rel"><h3 className="section_title mb-lg-4 mb-3" style={{ marginTop: "40px" }}>Top Products</h3></div>
                                                                                <div className="previous_search_result_wrapper">
                                                                                    {topProducts && <section className="overflow-hidden">
                                                                                        <div className="container pl-3">
                                                                                            <div className="row">
                                                                                                <div className="col">
                                                                                                    <div className="top_search_wrapper">
                                                                                                        <ul className="top-deal-search d-flex electric list-unstyled m-0 position-relative" style={{ background: "none", boxShadow: "none" }}>
                                                                                                            {topProducts.map((item, index) =>
                                                                                                                <li key={`top-pro-${index}`}>
                                                                                                                    <div className="item d-flex flex-column">
                                                                                                                        <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>

                                                                                                                        <div className="top">
                                                                                                                            <p>{item.name}</p>
                                                                                                                            <h4>
                                                                                                                                No Cost EMI
                                                                                                                                <span className="d-block mb-3">Starting ₹2,200 </span>
                                                                                                                            </h4>
                                                                                                                        </div>
                                                                                                                        <div className="img-box px-3">
                                                                                                                            <img src={item.image_url__c} className="img-fluid" />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </li>
                                                                                                            )}
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>


                                                                                        <div className="container">
                                                                                            <div className="col d-flex  justify-content-end">
                                                                                                <div className="cont">
                                                                                                    {/* <p><input type="text" id="amount"/></p> */}
                                                                                                    <div id="slider-range-max2-search"></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </section>}
                                                                                    {/*<Carousel responsive={responsive}>*/}


                                                                                    {/*</Carousel>*/}
                                                                                </div>
                                                                                <div className="col d-flex  justify-content-end">
                                                                                    <div className="cont">
                                                                                        {/* <p><input type="text" id="amount" readOnly/></p>  */}
                                                                                        {/* <div id="slider-range-max3"></div> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        
                                                    </div>
                                                </>
                                            </div>
                                        </OutsideClickHandler>
                                    </div>


                                </div>
                                {/* header-right */}
                                <div className="d-flex align-items-center payment-right-bar d-none-sm-md">
                                    <button className='payment-btn d-none'><img
                                        src={`images/cash-flowicon.png`} /> Payments
                                    </button>
                                    <button className='toggle-search d-none d-lg-none'>
                                        <img src={`${asset}images/icons/search_icon.png`} alt="" className='img-fluid' />
                                    </button>
                                    {user || sfid ?
                                        <>
                                            <button onClick={() => this.props.history.push('/all_payments')} className="wish-list">
                                                <img style={{ width: '32px', height: '31px', top: '9px', left: "12px", marginRight: "10px" }}
                                                    src={`${asset}images/cash-flowicon.png`} />
                                                <span className='txt'>Payments</span>
                                            </button>
                                            <button onClick={() => this.props.history.push('/wish-list')} className="wish-list">
                                                {favorite_count && (<span className='badge_tag'>{favorite_count}</span>)}
                                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                                                <span className='txt'>Wishlist</span>
                                            </button>
                                        </> : ""
                                    }
                                    {
                                        user || sfid ? (
                                            <>
                                                <button className="user-link"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <span><img src={asset + `images/icons/user-adminicons.png`}
                                                        alt="user" /></span>
                                                    <span>{username}</span>
                                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                                </button>

                                                <div className="dropdown-menu dropdown-menu-right">
                                                    {/* <div className='row'>
                                                    <div className='col-6'>
                                                    <button className='list-login' onClick={() => history.push('/login')}>Login</button>
                                                    </div>
                                                    
                                                    <div className='col-6'>
                                                    <span>New Customer?</span><br/>
                                                    <a href='/register'>Register here</a>
                                                    </div>
                                                </div>
                                                <br/> */}
                                                    <a href="/dashboard">


                                                        <button
                                                            className="w-70 px-3 profile-list "
                                                            type="button"

                                                        >
                                                            <img src={asset + `images/dashboard/user-icon.png`} alt="user" width={15} height={15} className='profile-icon' />
                                                            Profile
                                                        </button>
                                                    </a>
                                                    <br />
                                                    <button onClick={() => history.push('/wish-list')} className="w-70 px-3 profile-list"
                                                        type="button"> <img src={asset + `images/dashboard/wish-list.png`} alt="user" width={15} height={15} className='profile-icon' />
                                                        Favourites
                                                    </button>
                                                    <br />
                                                    <button onClick={() => history.push('/notification')} className="w-70 px-3 profile-list"
                                                        type="button"> <img src={asset + `images/dashboard/bell.png`} alt="user" width={15} height={15} className='profile-icon' />
                                                        Notifications
                                                    </button>
                                                    <br />
                                                    <button onClick={() => history.push('/support')} className="w-70 px-3 profile-list"
                                                        type="button"> <img src={asset + `images/dashboard/ep.png`} alt="user" width={15} height={15} className='profile-icon' />
                                                        Support
                                                    </button>
                                                    <br />
                                                    <button onClick={() => history.push('/setting')} className="w-70 px-3 profile-list"
                                                        type="button"> <img src={asset + `images/dashboard/settings.png`} alt="user" width={15} height={15} className='profile-icon' />
                                                        Settings
                                                    </button>
                                                    <br />
                                                    <button onClick={this.handleLogout} className="w-70 px-3 profile-list"
                                                        type="button"> <img src={asset + `images/dashboard/sign-out-alt.png`} alt="user" width={15} height={15} className='profile-icon' />
                                                        Logout
                                                    </button>
                                                </div>

                                            </>
                                        ) : (
                                            <Link to="/login" style={{ paddingLeft: '20px' }}>
                                                <div
                                                    className="btn btn-primary btn-button-signin px-4"
                                                    role="button"
                                                >
                                                    Sign in
                                                </div>
                                            </Link>
                                        )
                                    }
                                </div>
                                <button className='toggle-btn d-block d-lg-none'>
                                    <span className="menu-open"><img src={`${asset}images/icons/menu1.png`} /></span>
                                    <span className="menu-close"><img
                                        src={`${asset}images/icons/menuclose.png`} /></span>
                                </button>
                            </nav>
                        </div>
                    </div>
                   {showSubHeader &&  <div className="sub-header d-none d-lg-block">
                        <div className="site-header-wrap container">
                            <div className="sub-left-menu ">
                                <ul className="sub-main-menu">
                                    {
                                        category && category.map(item => (
                                            <li key={item.category_id} className="active-menu">

                                                <a href="" onClick={(e) => { e.preventDefault(); this.props.history.push("/products-list?category=" + encodeURIComponent(item.category_name)) }}><img
                                                    src={item.category_image} />{item.category_name}</a>
                                            </li>
                                        ))
                                    }

                                    {/*<li className="menu-link">*/}
                                    {/*    <a href="#"><img src={`${asset}images/accomodation1.png`}/> PGs & Hostels</a>*/}
                                    {/*</li>*/}


                                </ul>
                            </div>
                            {/* <div className="sub-right-menu">
                                <ul className="sub-main-menu">
                                    <li className="active-menu">
                                        <a href="" onClick={() => history.push('./virtual-no-card')}><img className="storeicon" src={`${asset}images/coins1.png`} /> Get a
                                            Pre-approved Limit <img className="storeicon"
                                                src={`${asset}images/arrow-right1.png`} /></a>
                                    </li>


                                </ul>
                            </div> */}

                            <div className="float-right ml-auto " >
                                <img src={`../images/icons/VectorMoney.png`} className="pr-2" />
                                <button className='text-white'>Get a Pre-approved Limit</button>
                                <img src={`../images/icons/VectorArrow.png`} className="pl-2" />
                            </div>

                        </div>

                    </div>
}                
</header>

            </>
        )
    }
}

HeaderNew.propTypes = {
    ...propTypes,
    username: PropTypes.string,
    history: PropTypes.any,
    user: PropTypes.any,
    sfid: PropTypes.any,
    isSearching: PropTypes.bool,
    searchDet: PropTypes.bool,
    favorite_count: PropTypes.any,
    asset: PropTypes.any
}

export default reduxForm({ form: 'header' })(HeaderNew);