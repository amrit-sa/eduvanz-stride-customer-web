import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import HeaderNew from '../common/headerNew';
import RecentView from '../common/recent-view'
import Footer from "../common/footer";
import AboutUs from "../common/about";
import Compare from "../common/compare";
import { asset } from '../common/assets';
import ContentLoader from 'react-content-loader'
import { searchGlobalProduct, productSearch, addSearchHistory, getFavoriteProductCount, getGlobalSearch } from "../actions/product";
import { createTransApp, buyProduct, getAccountProfile, favProduct ,getViewedProduct} from "../actions/user";
import ProductBox from '../common/ProductBox';
import Filter from './Filter';

class SearchListing extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            searchData: null,
            category: null,
            search: null,
            page: 1,
            foundProduct: false,
            total: 0,
            currentTotal: 0,
            sub_search: null,
            catSearch: null,
            isCompareEnable: false,
            selected: [],
            selectedItem: [],
            selectedCat: [],
            userData: null,
            partnerData: null,
            showOnlyNoCost: false,
            selectedFilters: [],
        }
        this.handleSubSearch = this.handleSubSearch.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {

        const queryParams = new URLSearchParams(window.location.search)
        const qrysearch = queryParams.get("search")
        // console.log(qrysearch,"query search param")
        if (qrysearch != this.state.search) {
            this.setState({search:qrysearch})
            this.searchProduct(qrysearch)


            // const { sfid } = this.props
            // this.setState({ search: qrysearch })
            // this.props.dispatch(searchGlobalProduct(qrysearch, 1, sfid)).then((response) => {
            //     if (response && response.status === "success") {
            //         var obj = response.data;
            //         this.setState({ searchData: response.data, total: response.count, currentTotal: obj.length });
            //         if (response.count > 12) {
            //             this.setState({ foundProduct: true });
            //         } else {
            //             this.setState({ foundProduct: false });
            //         }
            //     } else {
            //         this.setState({ searchData: [], total: 0, foundProduct: false });
            //     }
            // });
        }

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
                var obj = response.data;
                this.setState({ searchData: response.data, total: response.count, currentTotal: obj.length });
                // this.props.history.push("/products-list");
            } else {
                this.setState({ searchData: [] });
            }
        });
    }

    componentDidMount() {
        const { sfid } = this.props
        const queryParams = new URLSearchParams(window.location.search)
        const search = queryParams.get("search")
        if (search) {
            this.setState({ search: search });
            this.searchProduct(search)


            // this.props.dispatch(searchGlobalProduct(search, 1, sfid)).then((response) => {
            //     if(response && response.status === "success")
            //     {
            //         var obj = response.data;
            //         this.setState({ searchData: response.data, total: response.count, currentTotal: obj.length });
            //         if(response.count > 12)
            //         {
            //             this.setState({foundProduct: true });
            //         }else{
            //             this.setState({foundProduct: false });
            //         }
            //     }else{
            //         this.setState({ searchData: [], total: 0, foundProduct: false });
            //     }
            // });
        }
        this.props.dispatch(getViewedProduct({ user_id: this.props.sfid }));


        if (this.props.user) {
            let obj = {
                user_sfid: this.props.sfid
            }
            this.props.dispatch(getAccountProfile(obj)).then((response) => {
                if (response.status === "success") {
                    const getObj = response.accountDet;
                    const partnerData = getObj && getObj.account_partner__c ? getObj.account_partner__c : null;
                    this.setState({ userData: getObj, partnerData: partnerData });
                }
            });
        }
        if (sfid && search) {
            let obj = {
                user_sfid: sfid,
                search: search
            }
            this.props.dispatch(addSearchHistory(obj));
        }
        window.scrollTo(0, 0)
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
            alert(this.state.search);
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

    onSelectClick = async (e, row) => {
        let modifiedRow;
        let modifiedItem;
        let modifiedCategory;
        const checked = e.target.checked;
        const getCatrgory = row.product_sub_category__c;
        let ref = 'ref_' + row.id;
        // console.log("row", row);
        // console.log("getCatrgory", getCatrgory);
        // console.log("selectedCat", this.state.selectedCat);
        if (checked) {
            const selectedCat = this.state.selectedCat;
            if (selectedCat && selectedCat.length > 0) {
                //  console.log("exist");
                let category = selectedCat[0];
                if (category === getCatrgory) {
                    //  console.log("match");
                    modifiedRow = [...this.state.selected, row];
                    modifiedItem = [...this.state.selectedItem, row.id];
                    modifiedCategory = [...this.state.selectedCat, getCatrgory];
                } else {
                    //  console.log("not match");
                    this.refs[ref].checked = !this.refs[ref].checked;
                    modifiedRow = this.state.selected;
                    modifiedItem = this.state.selectedItem;
                    modifiedCategory = this.state.selectedCat;
                }
            } else {
                // console.log("New");
                modifiedRow = [...this.state.selected, row];
                modifiedItem = [...this.state.selectedItem, row.id];
                modifiedCategory = [...this.state.selectedCat, getCatrgory];
            }

        } else {
            // console.log("remove");
            modifiedRow = this.state.selected.filter(s => s !== row);
            modifiedItem = this.state.selectedItem.filter(s => s !== row.id);
            modifiedCategory = await this.filterCat(modifiedRow);
        }
        this.setState({ selected: modifiedRow, selectedItem: modifiedItem, selectedCat: modifiedCategory });
    };

    filterCat = async (getData) => {
        return new Promise(async (resolve) => {
            let category = [];
            await Promise.all(getData.map(element => {
                category.push(element.product_sub_category__c);
            }));
            resolve(category);
        });
    }

    handleRemoveCompare = async (row) => {
        let modifiedRow;
        let modifiedItem;
        let modifiedCategory;
        modifiedRow = this.state.selected.filter(s => s !== row);
        modifiedItem = this.state.selectedItem.filter(s => s !== row.id);
        modifiedCategory = await this.filterCat(modifiedRow);
        this.setState({ selected: modifiedRow, selectedItem: modifiedItem, selectedCat: modifiedCategory });
    }

    handleCompareEnable = () => {
        let isEnable = this.state.isCompareEnable;
        if (isEnable) {
            this.setState({ isCompareEnable: false });
            this.handleClearCompare();
        } else {
            this.setState({ isCompareEnable: true });
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
            if (response && response.status && response.status === "success") {
                this.getFavCount();
                if ($(`#${id}`).hasClass('active')) {
                    $(`#${id}`).removeClass('active');
                } else {
                    $(`#${id}`).addClass('active');
                }
            }
        });
    }

    handleCompare = () => {
        this.setState({ isCompareClicked: true });
    }

    handleClearCompare = async () => {
        const getData = this.state.selected;
        await Promise.all(getData.map(element => {
            let ref = 'ref_' + element.id;
            this.refs[ref].checked = !this.refs[ref].checked;
        }));

        this.setState({ selected: [], selectedItem: [], selectedCat: [] });
    }


    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    pushPage = (url) => {
        this.props.history.push(url);
    }

    productDetail(pid) {
        this.props.history.push(`/product-details/${pid}`);
    }

    handleAddProduct = () => {
        this.setState({ isCompareClicked: false });
    }

    handleProBuy = (id) => {
        const { history, user, sfid } = this.props
        this.props.dispatch(buyProduct(id));
        if (!sfid) {
            history.push("/login");
        } else {
            const getObj = this.state.userData;
            const partnerDet = this.state.partnerData;
            const address = getObj && getObj.current_address_id__c ? getObj.current_address_id__c : null;
            if (getObj.account_status__c === "Full User") {
                let data = {
                    product: id,
                    user: user
                }
                this.props.dispatch(createTransApp(data));
                history.push(`/edplans?product=${id}`);
            } else if (!getObj.email__c) {
                history.push("/ed_custdetails");
            } else if (getObj.pan_number__c && !getObj.pan_verified__c) {
                history.push("/ed_pan_update");
            }
            else if (!getObj.pan_number__c) {
                history.push("/ed_pan_update");
            } else if (!getObj.is_qde_1_form_done__c) {
                history.push("/ed_qdform");
            } else if (partnerDet) {
                history.push("/ed_coapplicant_details");
            } else if (!getObj.ipa_basic_bureau__c && !getObj.pan_verified__c) {
                history.push("/edreject");
            } else if (!getObj.ipa_basic_bureau__c && getObj.pan_verified__c) {
                history.push("/edonebanklist");
            } else if (getObj.ipa_basic_bureau__c && !getObj.pan_verified__c) {
                history.push("/edawaiting");
            } else if (getObj.ipa_basic_bureau__c && getObj.pan_verified__c && !getObj.is_limit_confirm__c) {
                history.push("/ed_limit");
            } else if (!getObj.is_qde_2_form_done__c) {
                history.push("/ed_salary");
            } else if (!address) {
                history.push("/ed_address");
            } else if (!getObj.is_kyc_document_verified__c) {
                history.push("/ed_doc_profile");
            } else if (!getObj.is_bank_detail_verified__c) {
                history.push("/edonebanklist");
            } else {
                let data = {
                    product: id,
                    user: user
                }
                this.props.dispatch(createTransApp(data));
                history.push(`/edplans?product=${id}`);
            }
        }
    }

    getNoCostCount = (searchData) => {
        return searchData.filter(item => item.no_cost_emi__c).length
    }

    
    isVisibleShowMore = () => {
        const ele = document.getElementById("show_more")
        if (!ele) {
            return
        }
        const { top, bottom } = ele.getBoundingClientRect();
        const vHeight = (window.innerHeight || document.documentElement.clientHeight);
        if ((top > 0 || bottom > 0) &&
            top < vHeight && !this.state.loadingSeenMore) {
            this.setState({ loadingSeenMore: true }, () => {
                this.handleSeenMore()
            })
        }
    }

    

    onFilterSelect = (e, title, dataIndex, index, type, ftype) => {

        const { category_filters } = this.props

        let current_filters = [...this.state.selectedFilters]
        let current_index = current_filters.findIndex(item => {
            return item.title === title
        })
        if (type === "list") {
            const checked = e.target.checked;

            // item is not present in current filters
            if (current_index === -1) {
                if (checked) {
                    current_filters.push({
                        "title": title,
                        "data": [
                            category_filters[ftype][dataIndex].data[index]
                        ],
                        "schema": category_filters[ftype][dataIndex].schema,
                        "type": category_filters[ftype][dataIndex].type,
                        "key": category_filters[ftype][dataIndex].key
                    })
                }
            } else {
                //item is already in filters so we only edit the data array
                if (checked) {
                    //item is not present in the data sub array
                    current_filters[current_index].data.push(category_filters[ftype][dataIndex].data[index])
                }
                else {
                    //item is present in the data sub array need to remove
                    let newarr = current_filters[current_index].data.filter(item => {
                        return item !== category_filters[ftype][dataIndex].data[index]
                    })
                    current_filters[current_index].data = newarr
                    if (newarr.length === 0) {
                        current_filters.splice(current_index, 1)
                    }
                }
            }
        }
        else if (type === 'minmax') {
            // item is not present in current filters
            if (current_index === -1) {
                current_filters.push({
                    "title": title,
                    "data": {
                        min: e[0],
                        max: e[1]
                    },
                    "schema": category_filters[ftype][dataIndex].schema,
                    "type": category_filters[ftype][dataIndex].type,
                    "key": category_filters[ftype][dataIndex].key
                })
            } else {
                //item is already in filters so we only edit the data array

                current_filters[current_index].data = {
                    min: e[0],
                    max: e[1]
                }

            }
        }


        this.setState({
            selectedFilters: current_filters
        }, () => {
            // this.handleFilter();
        });
    }

    render() {
        const { favorite_count, user, sfid, username, isSearching, searchDet, isLoading, recentProd , category_filters } = this.props
        const { isCompareClicked, selected, search, foundProduct, total, currentTotal, isCompareEnable } = this.state
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Search </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <HeaderNew
                    username={username ? username : ''}
                    user={user ? user : ''}
                    history={this.props.history}
                    isSearching={isSearching}
                    searchDet={searchDet}
                    sfid={sfid}
                    favorite_count={favorite_count}
                />
                {!isCompareClicked ? (
                    <>
                        <div className="pdesc-banner before-d-none">
                            <div className="inner-page">
                                <div className="container-fluid px-lg-5 banner-content">
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='breadCrumb_wrapper pt-3'>
                                                <ul className="breadcrumb_menu d-flex flex-wrap">
                                                    {search && (
                                                        <>
                                                            <li><a href="#">Store</a></li>
                                                            <li><a href="#">{search}</a></li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pdesc-banner before-d-none">
                            <div className="inner-page">
                                <div className="container-fluid px-lg-5 banner-content">
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='breadCrumb_wrapper pt-3'>
                                                <h3>Results found for "{search}"</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='inner-page'>
                            <div className='container-fluid px-lg-5'>

                                <div className='row mt-4 mb-5'>
                                    <div className='col d-flex flex-wrap'>
                            
                                        {/* <Filter
                                            handleFilter={this.handleFilter}
                                            onFilterSelect={this.onFilterSelect}
                                            handleFiltersort={this.handleFiltersort}
                                            category_filters={category_filters}
                                            isCompareEnable={isCompareEnable}
                                            handleCompareEnable={this.handleCompareEnable}
                                        />

                                        <div className='ml-auto d-flex justify-content-end align-items-center'>
                                            <label className="switch mb-0">
                                                <input type="checkbox" name="expandAll" onChange={() => {
                                                    this.setState({ showOnlyNoCost: !this.state.showOnlyNoCost }, () => {
                                                        this.isVisibleShowMore()
                                                    })
                                                }} />
                                                <span className="slider round"></span>
                                            </label>
                                            <p className='mb-1 ml-2' style={{ fontFamily: 'Graphik', fontStyle: 'normal' }}>No Cost EMI</p>
                                        </div> */}

{/* 
                                        <div className='ml-auto d-flex justify-content-end align-items-center'>
                                            <label className="switch mb-0">
                                                <input type="checkbox" name="expandAll" />
                                                <span className="slider round"></span>
                                            </label>
                                            <p className='mb-1 ml-2'>No Cost EMI</p>
                                        </div> */}
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
                                                                <img src={item.image_url__c} alt="upgard" className="img-fluid" />
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </div>

                                            <div>
                                                {selected && selected.length > 1 && (
                                                    <button type='button' onClick={this.handleCompare} className='apply-btn'>Compare Products</button>
                                                )}
                                                <button type='button' onClick={this.handleCompareEnable} className='ml-3'><img src={asset + "images/icons/icon-close2.png"} alt="upgard" className="img-fluid" /></button>
                                            </div>

                                        </div>
                                    </div>
                                )}
                                {/* <div className='row mb-4'>
                                    <div className='col'>
                                        <h5 className='show_number_of_item'>Showing {currentTotal} of {total}</h5>
                                    </div>
                                </div> */}
                                <div className='row mb-4'>
                                    <div className='col'>
                                        <h5 className='show_number_of_item'>Showing {this.state.showOnlyNoCost ? this.getNoCostCount(this.state.searchData) : currentTotal} of {this.state.showOnlyNoCost ? this.getNoCostCount(this.state.searchData) : total}</h5>
                                    </div>
                                </div>


                                <div className='row mb-4'>
                                    {this.state.searchData && this.state.searchData.length > 0 ? (
                                        this.state.searchData.map((item, index) => (
                                            <>
                                                {
                                                    this.state.showOnlyNoCost && item.no_cost_emi__c === true &&
                                                    <ProductBox
                                                        index={index}
                                                        item={item}
                                                        pushPage={this.pushPage}
                                                        dispatch={this.props.dispatch}
                                                        user={user}
                                                        sfid={sfid}
                                                        page={'plp'}
                                                        isCompareEnable={isCompareEnable}
                                                        selectedItem={this.state.selectedItem}
                                                        onSelectClick={this.onSelectClick}
                                                    ></ProductBox>
                                                }

                                                {!this.state.showOnlyNoCost &&
                                                    <ProductBox
                                                        index={index}
                                                        item={item}
                                                        pushPage={this.pushPage}
                                                        dispatch={this.props.dispatch}
                                                        user={user}
                                                        sfid={sfid}
                                                        page={'plp'}
                                                        isCompareEnable={isCompareEnable}
                                                        selectedItem={this.state.selectedItem}
                                                        onSelectClick={this.onSelectClick}
                                                    ></ProductBox>
                                                }
                                            </>

                                        ))
                                    ) : isSearching ? (
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
                                            <h5>Show More</h5>
                                            <button className='show-more'>
                                                <i className="fa fa-angle-down" aria-hidden="true"></i>
                                            </button>
                                            <hr></hr>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <RecentView
                            recentProd={recentProd}
                            sfid={sfid}
                            user={user}
                            pushPage={this.pushPage}
                        />
                    </>
                ) : (
                    <Compare
                        selected={selected}
                        handleRemoveCompare={this.handleRemoveCompare}
                        handleBuy={this.handleProBuy}
                        handleAddProduct={this.handleAddProduct}
                    />
                )}
                <AboutUs />
                <Footer />
                <div className="modal right fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog filter_all" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4>Filters</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <img src={asset + "images/icons/icon-close2.png"} alt="upgard" className="img-fluid" />
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

function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, favorite_count } = state.product
    const { similarProd, recentProd } = state.user
    return {
        favorite_count,
        isSearching,
        similarProd,
        recentProd,
        isLoading,
        searchDet,
        username,
        user,
        sfid
    };
}

export default connect(mapStateToProps)(SearchListing)