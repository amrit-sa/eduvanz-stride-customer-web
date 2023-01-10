import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import Helmet from "react-helmet";
import RecentView from '../common/recent-view'
import SimilarProduct from "../common/similar-product";
import ContentLoader from 'react-content-loader'
import Compare from "../common/compare";
import { asset } from '../common/assets';
import {catProductSearch, getCategoryFilters, getCompareProducts, getFavoriteProductCount} from "../actions/product";
import { getProductByCategory, favProduct, getSimilarProduct, getViewedProduct } from "../actions/user";
import Slider from "./slider";

class Mobile extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            searchData: null,
            productFound: true,
            category: null,
            search: 'Mobile',
            userData: null,
            page: 1,
            isCompareClicked: false,
            selected: [],
            selectedItem: [],
            selectedFilters:{},
            foundProduct: false,
            total: 0,
            currentTotal: 0,
            sub_search: null,
            catSearch: null,
            isCompareEnable: false,
            loadingSeenMore : false,
            value:[1000, 300000],
            allFilters : [
                {name:"Brand",key:"brand",label:"name",value:"sfid",filter_key:"brands"},
                {name:"Color",key:"color",label:"color__c",value:"color__c",filter_key:"color"},
                {name:"RAM",key:"ram",label:"ram__c",value:"ram__c",filter_key:"ram"},
                {name:"Processor",key:"processor",label:"processor__c",value:"processor__c",filter_key:"processor"},
                {name:"Display size",key:"size",label:"screen_size__c",value:"screen_size__c",filter_key:"size"}
            ]
        }
        this.handleSubSearch = this.handleSubSearch.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.selectedItem!==this.state.selectedItem){
            //find the delta
            // const filteredArray = prevState.selectedItem.filter(value => this.state.selectedItem.includes(value));
            // console.log(filteredArray)
            this.setState({selected:[]})
            for (let i = 0; i < this.state.selectedItem.length; i++) {
                if(!this.state.selected.includes(this.state.selectedItem[i])){
                    this.updateSelectedDetails(this.state.selectedItem[i])
                }
            }
        }
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.isVisibleShowMore);
        if(this.props.compare.sfid && this.props.compare.sfid!==''){
            console.log(this.props.compare.sfid)
            this.handleCompareEnable()
            this.onSelectClick({target:{checked:true}}, {sfid:this.props.compare.sfid})
        }
        const { sfid,subcat_id } = this.props
            let data = {
                user_sfid: sfid,
                "sub_category_id":subcat_id.category_id

            }
        this.props.dispatch(getCategoryFilters(data));

        await this.props.dispatch(getProductByCategory(data)).then((response) => {
                if (response && response.status === "success") {
                    var obj = response.data;
                    this.setState({ productFound: true, searchData: response.data, total: response.count, currentTotal: obj.length +this.state.currentTotal});
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
                user_id: sfid
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

    onFilterSelect = (e, value,filter_key) => {
        let modifiedItem;
        const checked = e.target.checked;
        let current_filters = {...this.state.selectedFilters}
        if(current_filters.hasOwnProperty(filter_key)){
            if (checked) {
                current_filters[filter_key].push(value)
            } else {
                current_filters[filter_key] = current_filters[filter_key].filter(s => s !== value);
            }
        }else {
            current_filters[filter_key] = [value]
        }
        this.setState({
            selectedFilters: current_filters
        }, () => {
            // this.handleFilter();
        });
    }

    handleFilter = () =>{
        const { sfid } = this.props
        const { page, selectedBrand, selectedSort,value } = this.state
        let data = {
            category: 'Mobile',
            user_sfid: sfid,
            ...this.state.selectedFilters,
            min_price: value[0],
            max_price: value[1],
            page: page
        }
        if(selectedBrand && selectedBrand.length > 0)
        {
            data.brands = selectedBrand;
        }
        if(selectedSort)
        {
            data.sort_order = selectedSort;
        }
        this.props.dispatch(getProductByCategory(data)).then((response) => {
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
    }



    isVisibleShowMore =()=> {
        const ele = document.getElementById("show_more")
        if(!ele){
            return
        }
        const { top, bottom } = ele.getBoundingClientRect();
        const vHeight = (window.innerHeight || document.documentElement.clientHeight);
        if((top > 0 || bottom > 0) &&
            top < vHeight && !this.state.loadingSeenMore){
            this.setState({loadingSeenMore:true},()=>{
                this.handleSeenMore()
            })
        }
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
        this.props.dispatch(catProductSearch(search, this.state.search)).then((response) => {
            if (response && response.length > 0) {
                this.setState({ catSearch: response });
            }
        });
    }


    handleSeenMore = () => {
        const { sfid,subcat_id } = this.props
        let page = this.state.page + 1;
        let data = {
            category: 'Mobile',
            user_sfid: sfid,
            page: page,
            "sub_category_id":subcat_id.category_id

        }
        this.props.dispatch(getProductByCategory(data)).then((response) => {
            if (response && response.status === "success") {
                var obj = response.data;
                this.setState({ productFound: true, searchData: [...this.state.searchData, ...obj ], total: response.count, currentTotal: obj.length+this.state.currentTotal,loadingSeenMore:false });
                if (response.count > (page*12)) {
                    this.setState({ foundProduct: true });
                } else {
                    this.setState({ foundProduct: false });
                }
            } else {
                this.setState({ productFound: false, searchData: [], total: 0, foundProduct: false,loadingSeenMore:false });
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
        window.scrollTo(0, 0)
    }

    handleClearCompare = async () =>{
        this.setState({selected: [], selectedItem: []});
    }

    updateSelectedDetails = (sfid)=>{
        this.props.dispatch(getCompareProducts({"sfid":sfid})).then((response)=>{
            if(response)
            {
                this.setState({selected:this.state.selected.concat(response)});
            }
        });
    }

    handleRemoveCompare = (modsfid) => {
        // let modifiedRow;
        // let modifiedItem;
        //  console.log("inside else " + this.state.selected)
        //   modifiedRow = this.state.selected.filter(s => s !== row);
        console.log(modsfid,this.state.selectedItem,"remove compare")
        console.log(modsfid.sfid,"remove compare")
        let modifiedItem = this.state.selectedItem.filter(s => s !== modsfid);
        console.log(modifiedItem,"remove compare")

        // console.log("modifiedRow -- "+ JSON.stringify(modifiedRow))
        this.setState({ selectedItem:  modifiedItem});
    }

    onSelectClick = (e, row) => {
        let modifiedRow;
        let modifiedItem;
        const checked = e.target.checked;
        if (checked) {
            //  console.log("inside if " + this.state.selected)
            modifiedRow = [...this.state.selected, row];
            modifiedItem = [...this.state.selectedItem, row.sfid];
        } else {
            // console.log("inside else " + this.state.selected)
            modifiedRow = this.state.selected.filter(s => s !== row);
            modifiedItem = this.state.selectedItem.filter(s => s !== row.sfid);
        }
        // console.log("modifiedRow -- "+ JSON.stringify(modifiedRow))
        this.setState({ selectedItem:  modifiedItem});
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

    handleSortChange = (value) =>{
        this.setState({selectedSort: value}, () =>{
            this.handleFilter();
        });
    }

    setFavourite(pid, id) {
        const { user, sfid } = this.props;
        if(user && sfid)
        {
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
        }else{
            this.props.pushPage('/login')
        }
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
        console.log(this.state.selectedItem,"selected item")

        const { sfid, user, pushPage, similarProd, recentProd,category_filters } = this.props
        const { productFound, isCompareEnable, foundProduct, total, currentTotal, catSearch, selected, isCompareClicked,selectedSort } = this.state
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Mobile </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {!isCompareClicked?(
                <>
                {/* banner */}
                <div className="pdesc-banner before-d-none">
                    <div className="inner-page">
                        <div className="container banner-content">
                            <div className='row'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            <li><a href="#">Electronics</a></li>
                                            <li>Mobile</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-around mt-lg-4">
                                <div className="col-lg-4">
                                    <h2 className="mt-4">Mobile</h2>
                                    <p className="mt-3">No Cost EMI top selling <br /> fab mobiles  </p>
                                    <div className="search___ mt-lg-5">
                                        <input
                                            name='sub_search'
                                            value={this.state.sub_search ? this.state.sub_search : ''}
                                            onChange={this.handleSubSearch}
                                            onKeyUp={e => this.inputfocus(e)}
                                            placeholder='Search for mobile that suits you' />
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
                        <img src={asset+"images/plp-mobile.png"} alt="upgard" className="img-fluid" />
                    </div>

                </div>
                {/* banner */}
                <div className='inner-page'>
                    <div className='container'>
                        <div className='row mb-4'>
                            <div className='col-12 p-lg-0'>
                                <img src={asset+"images/asus-brand.png"} alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 p-lg-0'>
                                <div className='add-box mb-4'>
                                    <img src={asset+"images/mobile-acc.png"} alt="" className="img-fluid" />
                                </div>

                            </div>
                            <div className='col-lg-6 p-lg-0'>
                                <div className='add-box mb-4'>
                                    <img src={asset+"images/stort.png"} alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='col-lg-6 p-lg-0'>
                                <div className='add-box mb-4'>
                                    <img src={asset+"images/mi-a1.png"} alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div className='col-lg-6 p-lg-0'>
                                <div className='add-box mb-4'>
                                    <img src={asset+"images/mi-note.png"} alt="" className="img-fluid" />
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
                                                <a className={`dropdown-item cursor-point ${selectedSort == "Relevance"?"sort-active ":""}`} onClick={()=>this.handleSortChange('Relevance')} href={void(0)}>Relevance</a>
                                                <a className={`dropdown-item cursor-point ${selectedSort == "Popularity"?"sort-active ":""}`} onClick={()=>this.handleSortChange('Popularity')} href={void(0)}>Popularity</a>
                                                <a className={`dropdown-item cursor-point ${selectedSort == "Descending"?"sort-active ":""}`} onClick={()=>this.handleSortChange('Descending')} href={void(0)}>Price - High to Low</a>
                                                <a className={`dropdown-item cursor-point ${selectedSort == "Ascending"?"sort-active ":""}`} onClick={()=>this.handleSortChange('Ascending')} href={void(0)}>Price - Low to High</a>
                                                <a className={`dropdown-item cursor-point ${selectedSort == "Newest"?"sort-active ":""}`} onClick={()=>this.handleSortChange('Newest')} href={void(0)}>Newest First</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                EMI
                                            </button>
                                            <div className="dropdown-menu price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                                {/*  <div className='d-flex'>
                                                    <p className='at'>Amount</p>
                                                    <div className='price-box'><input type="text" id="amount" readOnly /></div>
                                                </div> */}
                                                {/* <div id="slider-range"></div>
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
                                                </ul> */}
                                                <Slider
                                                    pearling
                                                    minDistance={1000}
                                                    min={1000}
                                                    max={300000}
                                                    onChange={(value) => this.setState({value:value})}
                                                />
                                                <div className='text-right mt-3'>
                                                    <button onClick={()=>{
                                                        this.handleFilter()
                                                    }} className='apply-btn ml-3'>Apply</button>
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
                                        <button type='button' className={`${isCompareEnable?"active-btn":""}`} onClick={this.handleCompareEnable} >Compare</button>
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
                        {selected && selected.length > 0 && (
                        <div className='row mb-5'>
                            <div className='col d-flex justify-content-between selected-items-row py-3'>
                                <div className='d-flex align-items-center'>
                                    <p className='m-0 si_b mr-3'>{selected.length} items selected</p>
                                    <ul className='m-0 selected-prod d-flex flex-wrap'>
                                        {selected && selected.length > 0 && (
                                            selected.map((item, index) => (
                                            <li key={`item-${index}`}>
                                                <img src={`${item.image_url__c}`} alt="upgard" className="img-fluid"/>
                                            </li>
                                            ))
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    {selected && selected.length > 1 && (
                                        <button type='button' onClick={this.handleCompare} className='apply-btn'>Compare Products</button>
                                    )}
                                        <button type='button' onClick={this.handleCompareEnable} className='ml-3'><img src={asset+"images/icons/icon-close2.png"} alt="upgard" className="img-fluid"/></button>
                                </div>
                            
                            </div>
                        </div>
                        )}
                        <div className='row mb-4 mx-0'>
                            <div className='col'>
                                <h5 className='show_number_of_item'>Showing {currentTotal} of {total}</h5>
                            </div>
                        </div>

                        <div className='row mb-4'>
                            {this.state.searchData && this.state.searchData.length > 0 ? (
                                this.state.searchData.map((item, index) => (
                                    <div key={`product-item-${index}`} className='col-lg-3 col-md-4 cursor-point'>
                                        <div className='search-result-box mb-4'>
                                            {isCompareEnable && (
                                            <div className='compare-check compare-checkbox'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" ref={`ref_${item.id}`} id={item.id} onChange={ e =>this.onSelectClick(e, item)} value={item.sfid} defaultChecked={this.state.selectedItem.includes(item.sfid)} />
                                                    <label className="custom-control-label" htmlFor={item.id}> Compare </label>
                                                </div>
                                            </div>
                                            )}
                                            <div className='img-box mb-4 noverlay' onClick={() => this.productDetail(item.sfid)}>
                                                <img src={item.image_url__c } alt="" className='img-fluid' />
                                            </div>

                                            <div className='px-3 pb-3'>
                                                <div onClick={() => this.productDetail(item.sfid)}>
                                                    <p>{item.name}</p>
                                                    <h5 className='emi_txt'>EMI Starting ₹{item.min_avi_emi__c}/mo</h5>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='d-flex' onClick={() => this.productDetail(item.sfid)}>
                                                        <div className='price-width-discount'>
                                                            <p className='mb-0 p2'>Stride Price</p>
                                                            <span className='current-price'>₹{item.price__c}</span>
                                                            <span className='previous-price ml-2'>₹{item.mrp__c}</span>
                                                        </div>
                                                        <div className='discount ml-2 border-left pl-2'>
                                                            <span className='d-block'>{item.discountRate}%</span>OFF
                                                        </div>
                                                    </div>
                                                    <div className='wishlist'>
                                                        <button type='button' onClick={() => this.setFavourite(item.sfid, `fav-mobile-item-${item.id}`)} id={`fav-mobile-item-${item.id}`} className={`${item.isFavorite?'active':''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : productFound ? (
                                <ContentLoader viewBox="0 0 380 70">
                                    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                                    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                </ContentLoader>
                            ) : (
                                <div className="col-md-12 text-center">
                                    <p className="m-0 ml-5">Record not found</p>
                                </div>
                            )}

                        </div>

                        {foundProduct && (
                            <div className='row mb-4'>
                                <div className='col-12 text-center'>
                                    <h5 id={"show_more"}>Show More</h5>
                                    <button className='show-more' type='button' onClick={this.handleSeenMore}>
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </button>
                                    <hr></hr>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <SimilarProduct
                     sfid={sfid}
                     user = {user}
                     pushPage= {pushPage}
                     similarProd={similarProd}
                />
                    {sfid && <RecentView
                     // recentProd= {recentProd}
                     recentProd= {recentProd}
                     sfid={sfid}
                     user = {user}
                     pushPage= {pushPage}
                />}
                </>
                ):(
                    <Compare 
                        selected={this.state.selectedItem}
                        comingFrom="Mobile"
                        handleRemoveCompare={this.handleRemoveCompare}
                        handleBuy={this.props.handleProBuy}
                        handleAddProduct={this.handleAddProduct}
                    />
                 )}
                <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog filter_all" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4>Filters</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <img src={asset+"images/icons/icon-close2.png"} alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                <div className="filter_accordion_wrap">
                                    <div className="filter_accordion">
                                        <div className="tab">EMI</div>
                                        <div className="dropdown-menu price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                            {/*  <div className='d-flex'>
                                                    <p className='at'>Amount</p>
                                                    <div className='price-box'><input type="text" id="amount" readOnly /></div>
                                                </div> */}
                                            {/* <div id="slider-range"></div>
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
                                                </ul> */}
                                            <Slider
                                                pearling
                                                minDistance={1000}
                                                min={1000}
                                                max={300000}
                                                onChange={(value) => this.setState({value:value})}
                                            />
                                            <div className='text-right mt-3'>
                                                <button onClick={()=>{
                                                    this.handleFilter()
                                                }} className='apply-btn ml-3'>Apply</button>
                                            </div>

                                        </div>
                                    </div>
                                    {this.state.allFilters.map(filters=>(
                                        <div className="filter_accordion">
                                            <div className="tab">{filters.name}</div>
                                            {/*{category_filters && <div className="content">*/}
                                            {/*    {*/}
                                            {/*        category_filters[filters.key].map((item,index)=>(*/}
                                            {/*            <a key={`${filters.label}-item-${index}`} className="dropdown-item cursor-point" href={void(0)}>*/}
                                            {/*                <div className="custom-control custom-checkbox">*/}
                                            {/*                    <input type="checkbox" className="custom-control-input" id={`${filters.label}-drop-${index}`}*/}
                                            {/*                           onChange={ e =>this.onFilterSelect(e, item[filters.value],filters.filter_key)}*/}
                                            {/*                           value={item[filters.label]}*/}
                                            {/*                        // defaultChecked={this.state.selectedFilters[filters.filter_key].includes(item[filters.value])}*/}
                                            {/*                           checked={this.state.selectedFilters[filters.filter_key] && this.state.selectedFilters[filters.filter_key].includes(item[filters.value])} />*/}
                                            {/*                    <label className="custom-control-label" htmlFor={`${filters.label}-drop-${index}`}>*/}
                                            {/*                        {filters.name==='Color'?(<div style={{width:23,height:23,backgroundColor:item[filters.label]}}></div>):<>{item[filters.label]}</>}*/}

                                            {/*                    </label>*/}
                                            {/*                </div>*/}
                                            {/*            </a>*/}
                                            {/*        ))*/}
                                            {/*    }*/}
                                            {/*</div>}*/}
                                        </div>
                                    ))}
                                </div>
                                <div className='text-right mt-3'>
                                    <button onClick={()=>{
                                        this.setState({selectedFilters:{}})
                                    }} className='link'>Clear All</button>
                                    <button onClick={()=>{
                                        this.handleFilter()
                                    }} className='apply-btn ml-3'>Apply</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

Mobile.propTypes = {
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
    category_filters: PropTypes.any,
}

export default reduxForm({form: 'PLP-Mobile'})(Mobile);