import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import Helmet from "react-helmet";
import HeaderNew from '../common/headerNew';
import AboutUs from "../common/about"
import RecentView from '../common/recent-view'
import SimilarProduct from "../common/similar-product";
import ContentLoader from 'react-content-loader';
import { searchGlobalProduct, productSearch, getFavoriteProductCount } from "../actions/product";
import { getProductByCategory, favProduct, getSimilarProduct, getViewedProduct } from "../actions/user";

class CompareSelected extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            searchData: null,
            productFound: true,
            category: null,
            search: null,
            userData: null,
            page: 1,
            isCompareClicked: false,
            selected: [],
            selectedItem: [],
            foundProduct: false,
            total: 0,
            currentTotal: 0,
            sub_search: null,
            catSearch: null,
            isCompareEnable: false
        }
        this.handleSubSearch = this.handleSubSearch.bind(this);
    }

    async componentDidMount() {
       const { sfid } = this.props
            let data = {
                category: 'Laptop',
                user_sfid: sfid
            }
            await this.props.dispatch(getProductByCategory(data)).then((response) => {
                if (response && response.status === "success") {
                    var obj = response.data;
                    this.setState({ productFound: true, searchData: response.data, total: response.count, currentTotal: obj.length });
                    if (response.count > 12) {
                        this.setState({ foundProduct: true });
                    } else {
                        this.setState({ foundProduct: false });
                    }
                } else {
                    this.setState({ productFound: false, searchData: [], total: 0, foundProduct: false });
                }
            });
            this.props.dispatch(getSimilarProduct(data));
            let obj = {
                user_id: this.props.user
            }
            this.props.dispatch(getViewedProduct(obj));
        $('.filter_accordion').eq(0).children('.content').show()
        $('.filter_accordion .tab').click(function () {
            $(this).parent().siblings().children('.tab').removeClass('show');
            $(this).addClass('show')
            $(this).parent().siblings().children('.content').slideUp();
            $(this).next().slideToggle();
        })

    }

    handleSubSearch = (event) => {
        this.setState({ sub_search: event.target.value });
        let search = event.target.value;
        if (search.length > 3) {
            this.searchData(search);
        } else {
            this.setState({ catSearch: [] });
        }
    }

    searchData = (search) => {
        this.setState({ catSearch: [] });
        this.props.dispatch(productSearch(search, this.state.search)).then((response) => {
            if (response && response.length > 0) {
                this.setState({ catSearch: response });
            }
        });
    }


    handleSeenMore = () => {
        let page = this.state.page + 1;
        this.props.dispatch(searchGlobalProduct(this.state.search, page)).then((response) => {
            if (response && response.status === "success") {
                var count = page * 12;
                var getObj = response.data;
                var getCount = getObj.length;
                var currentTotal = this.state.currentTotal;
                this.setState({ searchData: [...this.state.searchData, ...getObj] })
                this.setState({ total: response.count, page: page, currentTotal: currentTotal + getCount });
                if (response.count > count) {
                    this.setState({ foundProduct: true });
                } else {
                    this.setState({ foundProduct: false });
                }
            } else {
                this.setState({ searchData: [], total: 0, foundProduct: false });
            }
        });
    }

    inputfocus = (elmnt) => {
        if (elmnt.key === "Enter") {
            let search = this.state.sub_search;
            if (search.length > 3) {
                this.searchData(search);
            }
        }
    }

    handleCompare = () =>{
        this.setState({isCompareClicked: true});
    }

    handleClearCompare = () =>{
        this.setState({selected: [], selectedItem: []});
    }

    handleRemoveCompare = (row) => {
        let modifiedRow;
        let modifiedItem;
      //  console.log("inside else " + this.state.selected)
        modifiedRow = this.state.selected.filter(s => s !== row);
        modifiedItem = this.state.selectedItem.filter(s => s !== row.id);
       // console.log("modifiedRow -- "+ JSON.stringify(modifiedRow))
        this.setState({ selected: modifiedRow, selectedItem:  modifiedItem});
    }

    onSelectClick = (e, row) => {
        let modifiedRow;
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
        //  console.log("inside if " + this.state.selected)
          modifiedRow = [...this.state.selected, row];
          modifiedItem = [...this.state.selectedItem, row.id];
        } else {
         // console.log("inside else " + this.state.selected)
          modifiedRow = this.state.selected.filter(s => s !== row);
          modifiedItem = this.state.selectedItem.filter(s => s !== row.id);
        }
       // console.log("modifiedRow -- "+ JSON.stringify(modifiedRow))
        this.setState({ selected: modifiedRow, selectedItem:  modifiedItem});
    };

    handleAddProduct = () =>{
        this.setState({ isCompareClicked: false});
    }

    handleCompareEnable = () =>{
        let isEnable = this.state.isCompareEnable;
        if(isEnable)
        {
            this.setState({ isCompareEnable: false});
            this.handleClearCompare();
        }else{
            this.setState({ isCompareEnable: true});
        }
        
    }

    setFavourite(pid, id) {
        const { user, sfid } = this.props;

        let data = {
            user_sfid: sfid,
            product_id: pid,
            device_id: ''
        }
        this.props.dispatch(favProduct(data)).then((response) => {
            if(response && response.status && response.status ==="success")
            {
                this.getFavCount();
                if($(`#${id}`).hasClass('active')) {
                    $(`#${id}`).removeClass('active');
                }else{
                    $(`#${id}`).addClass('active');
                }
            }
        });
    }

    getFavCount = () =>{
        const { sfid } = this.props;
        let data = {
            user_sfid :sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    handleBuy = (pid) =>{
        this.props.handleProBuy(pid);
    }

    productDetail(pid) {
         window.location='/product-details/'+pid;
    }


    render() {
        const { sfid, user, pushPage, similarProd, recentProd, username, isSearching, searchDet, isLoading } = this.props
        const { productFound, isCompareEnable, foundProduct, total, currentTotal, catSearch, selected, isCompareClicked } = this.state
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Laptop </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>

                <HeaderNew
                    username={username ? username : ''}
                    user={user ? user : ''}
                    history={this.props.history}
                    isSearching={isSearching}
                    searchDet={searchDet}
                />
               
                {!isCompareClicked?(
                <>
                <div className="pdesc-banner before-d-none">
                    <div className="inner-page">
                        <div className="container banner-content">
                            <div className='row mx-0'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            <li><a href="#">Electronics</a></li>
                                            <li>Laptop</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-around mt-lg-4">
                                <div className="col-lg-4">
                                    <h2 className="mt-4">Laptop</h2>
                                    <p className="mt-3">One stop shop for all your <br /> laptop needs </p>
                                    <div className="search___ mt-lg-5">
                                        <input
                                            name='sub_search'
                                            value={this.state.sub_search ? this.state.sub_search : ''}
                                            onChange={this.handleSubSearch}
                                            onKeyUp={e => this.inputfocus(e)}
                                            placeholder='Search for the laptop that suits you' />
                                        <button className='bg-transparent'>
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                        {catSearch && catSearch.length > 0 && (
                                            <ul className='search_p_list autocomplete-items'>
                                                {catSearch.map((item, index) => (
                                                    <li key={`search-product-${index}`} id={item.sfid} className='d-flex align-items-start py-2 px-2 cursor-point search-product'>
                                                        <div className='pd_txt'>
                                                            <p className='m-0'>{item.name}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-5">&nbsp;</div>
                            </div>
                        </div>
                        <img src="images/unrecognizable.jpg" alt="upgard" className="img-fluid" />
                    </div>

                </div>
                {/* banner */}
                <div className='inner-page'>
                    <div className='container'>
                        <div className='row mb-4'>
                            <div className='col-12'>
                                <img src="images/add-asus.jpg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add01.jpg" alt="" className="img-fluid" />
                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add02.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add03.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='add-box mb-4'>
                                    <img src="images/add04.jpg" alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-4 mb-5'>
                            <div className='col d-flex flex-wrap'>
                                <ul className='search_filter_options m-0'>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                EMI
                                            </button>
                                            <div className="dropdown-menu price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                                <div className='d-flex'>
                                                    <p className='at'>Amount</p>
                                                    <div className='price-box'><input type="text" id="amount" readOnly /></div>
                                                </div>
                                                <div id="slider-range"></div>
                                                <ul className='r_l d-flex justify-content-between mt-2'>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                                <ul className='r_l_t d-flex justify-content-between mt-2'>
                                                    <li>1000 <span>Min</span></li>
                                                    <li>15000</li>
                                                    <li className='text-right'>30000<span>Max</span></li>
                                                </ul>
                                                <div className='text-right mt-3'>
                                                    <button className='apply-btn ml-3'>Apply</button>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Level
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Price
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Brand
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button data-toggle="modal" data-target="#myModal2">All Filters <i className="fa fa-sliders" aria-hidden="true"></i></button>
                                    </li>
                                    <li>
                                        <button type='button' className={`${isCompareEnable?"active-btn":""}`} onClick={this.handleCompareEnable}>Compare</button>
                                    </li>
                                </ul>
                                <div className='ml-auto d-flex justify-content-end align-items-center'>
                                    <label className="switch mb-0">
                                        <input type="checkbox" name="expandAll" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p className='mb-1 ml-2'>No Cost EMI</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='row mb-5'>
                            <div className='col d-flex justify-content-between selected-items-row py-3'>
                                <div className='d-flex align-items-center'>
                                    <p className='m-0 si_b mr-3'>items selected</p>
                                    <ul className='m-0 selected-prod d-flex flex-wrap'>
                                        <li><img src="images/mac-book.png" alt="upgard" className="img-fluid"/></li>
                                    </ul>
                                </div>

                                <div>
                                    <button type='button' onClick={this.handleCompare} className='apply-btn'>Compare Products</button>
                                   <button type='button' onClick={this.handleClearCompare} className='ml-3'><img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid"/></button>
                                </div>
                            
                            </div>
                        </div>
                       
                        <div className='row mb-4'>
                            <div className='col'>
                                <h5 className='show_number_of_item'>Showing {currentTotal} of {total}</h5>
                            </div>
                        </div>

                        <div className='row mb-4'>
                            {this.state.searchData && this.state.searchData.length > 0 ? (
                                this.state.searchData.map((item, index) => (
                                    <div key={`product-item-${index}`} className='col-lg-3 col-md-4 cursor-point'>
                                        <div className='search-result-box mb-4'>
                                            <div className='position-relative pt-5'>
                                            <div className='position-absolute t15 seller_tag blue'>
                                                Bestseller
                                            </div>
                                            <div className='compare-check compare-checkbox'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id={item.id} onChange={ e =>this.onSelectClick(e, item)} value={item.id} defaultChecked={this.state.selectedItem.includes(item.id)} />
                                                    <label className="custom-control-label" htmlFor={item.id}> Compare </label>
                                                </div>
                                            </div>
                                            </div>
                                       
                                        <div className='img-box mb-4 noverlay text-center' onClick={() => this.productDetail(item.sfid)}>
                                            <img src={`${item.image_url__c && item.image_url__c.length > 0 && item.image_url__c[0].base64 ? "data:image/jpg;base64," + item.image_url__c[0].base64 : "images/products/lap-01.png"}`} alt="" className='object-contain' />
                                        </div>

                                            <div className='px-3 pb-3'>
                                                <div onClick={() => this.productDetail(item.sfid)}>
                                                    <p>{item.name.slice(0, 15)}</p>
                                                    <h5 className='emi_txt'>EMI Starting ₹2,200/mo</h5>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex' onClick={() => this.productDetail(item.sfid)}>
                                                        <div className='price-width-discount'>
                                                            <p className='mb-0 p2'>Stride Price</p>
                                                            <span className='current-price'>₹{item.mrp__c}</span> <span className='previous-price'>₹89,990</span>
                                                        </div>
                                                        <div className='discount ml-2 border-left pl-2'>
                                                            <span className='d-block'>{item.discountRate}%</span>OFF
                                                        </div>
                                                    </div>
                                                    <div className='wishlist'>
                                                        <button type='button' onClick={() => this.setFavourite(item.sfid, `fav-laptop-item-${item.id}`)} id={`fav-laptop-item-${item.id}`} className={`${item.isFavorite?'active':''}`} ><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : productFound ? (
                                <div className='col-lg-3 col-md-4 cursor-point'>
                                    <ContentLoader viewBox="0 0 380 70">
                                    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                                    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                </ContentLoader>
                                </div>
                                
                            ) : (
                                <div className="col-md-12 text-center">
                                    <p className="m-0 ml-5">Record not found</p>
                                </div>
                            )}

                        </div>
                        <div className='row mb-4'>
                            <div className='col-12 text-center'>
                                <h5>Show More</h5>
                                <button className='show-more'>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </button>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                </div>
                <SimilarProduct
                    sfid={sfid}
                    user = {user}
                    pushPage= {pushPage}
                    similarProd={similarProd}
                />
                <RecentView
                    recentProd= {recentProd} 
                    sfid={sfid}
                    user = {user}
                    pushPage= {pushPage}
                />
                <AboutUs/>
                </>
                ):(
                <>
                    {/* banner */}
                    <div className="pdesc-banner before-d-none">
                        <div className="inner-page">
                            <div className="container banner-content">
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='breadCrumb_wrapper pt-3'>
                                            <ul className="breadcrumb_menu d-flex flex-wrap">
                                                <li><a href="#">Store</a></li>
                                                <li><a href="#">Electronics</a></li>
                                                <li><a href="#">Laptop</a></li>
                                                <li>Compare Products</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* banner */}
                    <div className='inner-page'>
                    <div className='container'>
                        <div className='row mb-4'>
                            <div className='col-12'>
                                    <h4 className='mb-4'>Compare Products</h4>
                                    <div className='compare-section'>
                                    <table>
                                    <thead>
                                            <tr>
                                            <th>
                                                <div className='addToCompareBox'>
                                                    <p className='text-left'>Product Name</p>
                                                    <p className='text-left'>Offer Price</p>
                                                </div>
                                            </th>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                    <th key={`offer-${index}`}>
                                                        <div className='addToCompareBox'>
                                                            <button type='button' onClick={() => this.handleRemoveCompare(item)} className="close">
                                                                <img src="/images/icons/icon-close2.png" alt="upgard" className="img-fluid"/>
                                                            </button>
                                                            <div className='pro-img'>
                                                                <img src={`${item.image_url__c && item.image_url__c.length > 0 && item.image_url__c[0].base64 ? "data:image/jpg;base64," + item.image_url__c[0].base64 : "/images/products/lap-01.png"}`} alt="upgard" className="img-fluid"/>
                                                            </div>
                                                            <p>{item.name.slice(0, 15)}</p>
                                                            <h5>
                                                                <small className='d-block mb-2'>EMI Starting</small>
                                                                ₹3,000/month
                                                            </h5>
                                                            <button type='button' onClick={() => this.handleBuy(item.sfid)} className='apply-btn'>Buy Now</button>
                                                            <p className='mt-3'>Stride Price ₹{item.mrp__c} </p>
                                                        </div>
                                                    </th>
                                                ))
                                            )}
                                            <th>
                                                <div className='addToCompareBox'>
                                                        <button type='button' onClick={this.handleAddProduct} className='atc_btn'>
                                                            <span>+</span>
                                                            <p>Add to compare</p>
                                                        </button>
                                                </div>
                                            </th>
                                            <th>
                                                <div className='addToCompareBox'>
                                                    <button type='button' onClick={this.handleAddProduct} className='atc_btn'>
                                                        <span>+</span>
                                                        <p>Add to compare</p>
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Brand</td>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                <td key={`brand-${index}`}>{item.brand__c?item.brand__c:'NA'}</td>
                                            )))}
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Dimensions(WxHxD)</td>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                <td key={`dimensions-${index}`}>{'304.1 x 212.4 x 10.9 mm'}</td>
                                            )))}
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Colors</td>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                <td key={`dimensions-${index}`}>{'Black'}</td>
                                            )))}
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Operating System</td>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                <td key={`system-${index}`}>{'Windows 10 Home Basic'}</td>
                                            )))}
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Operating System Type</td>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                <td key={`system-type-${index}`}>{'64-bit'}</td>
                                            )))}
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Model</td>
                                            {selected && selected.length > 0 && (
                                                selected.map((item, index) => (
                                                <td key={`model-${index}`}>{'17Z90P-G.AJ55A2'}</td>
                                            )))}
                                            <td></td>
                                            <td></td>
                                        </tr>
                                     </tbody>
                                    </table>
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </>
                 )}
                <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog filter_all" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4>Filters</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                <div className="filter_accordion_wrap">
                                    <div className="filter_accordion">
                                        <div className="tab">EMI</div>
                                        <div className="content">
                                            <div className="price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                                <div className='d-flex'>
                                                    <p className='at'>Amount</p>
                                                    <div className='price-box'>
                                                        <input type="text" id="priceAmount" readOnly /></div>
                                                </div>
                                                <div id="price-range"></div>
                                                <ul className='r_l d-flex justify-content-between mt-2'>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                                <ul className='r_l_t d-flex justify-content-between mt-2'>
                                                    <li>1000 <span>Min</span></li>
                                                    <li>15000</li>
                                                    <li className='text-right'>30000<span>Max</span></li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Price</div>
                                        <div className="content">Dimension and Weight</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Brands</div>
                                        <div className="content">Transmission</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Processor</div>
                                        <div className="content">Chassis and Suspension</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Color</div>
                                        <div className="content">Braking</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">Display Size</div>
                                        <div className="content">Wheel and Tyres</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">ROM</div>
                                        <div className="content">Wheel and Tyres</div>
                                    </div>
                                    <div className="filter_accordion">
                                        <div className="tab">RAM</div>
                                        <div className="content">Wheel and Tyres</div>
                                    </div>
                                </div>
                                <div className='text-right mt-3'>
                                    <button className='link'>Clear All</button>
                                    <button className='apply-btn ml-3'>Apply</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

CompareSelected.propTypes = {
    ...propTypes,
    history: PropTypes.any,
    user: PropTypes.any,
    sfid: PropTypes.any,
    similarProd: PropTypes.any,
    recentProd: PropTypes.any,
    isSearching: PropTypes.bool,
    searchDet: PropTypes.bool,
    pushPage: PropTypes.func,
    handleProBuy: PropTypes.func,
}

export default reduxForm({form: 'PLP-Electronics'})(CompareSelected);
