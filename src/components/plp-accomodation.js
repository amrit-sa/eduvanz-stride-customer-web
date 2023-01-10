import React, { Component } from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { reduxForm, propTypes } from 'redux-form'
import Helmet from 'react-helmet'
import RecentView from '../common/recent-view'
import SimilarProduct from '../common/similar-product'
import Compare from '../common/compare'
import { asset } from '../common/assets'
import ContentLoader from 'react-content-loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  catProductSearch,
  getCategoryFilters,
  getCompareProducts,
  getFavoriteProductCount,
  getBlogs,
  getGlobalSearch
} from '../actions/product'
import {
  getProductByCategory,
  favProduct,
  getSimilarProduct,
  getViewedProduct,
  getProductById,
} from '../actions/user'
import Slider from './slider'
import Filter from "./Filter";
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import NewsArticle from '../common/news-article';
import GoogleMapReact from 'google-map-react';
import { setLatLon } from "../actions/product"

// import isEmpty from 'lodash.isempty';

// components:
import Marker from '../components/Marker';

// examples:
import GoogleMap from '../components/GoogleMap';
import LocationSearchInput from './Searchplaces'
import ProductBox from '../common/ProductBox'

// consts
// import LOS_ANGELES_CENTER from '../const/la_center';



const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapStyles = {
  width: '100%',
  height: '100%'
};

class PlpAccomodation extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.state = {
      searchData: null,
      category: null,
      search: null,
      userData: null,
      page: 1,
      isCompareClicked: false,
      selected: [],
      selectedItem: [],
      foundProduct: false,
      total: 0,
      limit: 12,
      currentTotal: 0,
      selectedFilters: [],
      showOnlyNoCost: false,
      relatedBlogData: [],
      sub_search: null,
      catSearch: null,
      showCatsuggest: false,
      isCompareEnable: false,
      showtreeView: true,
      gridView: true,
      mapView: false,
      coordinates: {
        lat: null,
        lng: null
      },
      locationName: "",
      startDate: null,
      // center: {
      //   lat: 28.94645,
      //   lng:  77.35475
      // },
      zoom: 11,
    }

    this.handleSubSearch = this.handleSubSearch.bind(this)
  }

  updateSelectedDetails = (sfid) => {
    this.props.dispatch(getCompareProducts({ sfid: sfid })).then((response) => {
      if (response) {
        this.setState({ selected: this.state.selected.concat(response) })
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (prevState.selectedItem !== this.state.selectedItem) {
      //find the delta
      // const filteredArray = prevState.selectedItem.filter(value => this.state.selectedItem.includes(value));
      // console.log(filteredArray)
      this.setState({ selected: [] })
      for (let i = 0; i < this.state.selectedItem.length; i++) {
        if (!this.state.selected.includes(this.state.selectedItem[i])) {
          this.updateSelectedDetails(this.state.selectedItem[i])
        }
      }
    }
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.isVisibleShowMore)
    const { subcat_id, sfid } = this.props
    const queryParams = new URLSearchParams(window.location.search)

    const area = queryParams.get('area');
    if (area) {
      this.setState({ locationName: area })
    }
    const category = queryParams.get('category')
    this.props.dispatch(getBlogs(sfid)).then((response) => {
      if (response) {
        this.setState({ relatedBlogData: response })
      }
    })


    if (this.props.compare.sfid && this.props.compare.sfid !== '') {
      this.handleCompareEnable()
      this.onSelectClick(
        { target: { checked: true } },
        { sfid: this.props.compare.sfid },
      )
    }
    if (category) {
      this.setState({ category: category })
      let data = {
        sub_category_id: subcat_id.category_id,
        user_sfid: sfid,
        limit: this.state.limit,
        page: this.state.page,
      }
      this.props.dispatch(getProductByCategory(data)).then((response) => {

        if (response && response.status === 'success') {
          var obj = response.data
          this.setState({
            searchData: obj,
            total: response.count,
            currentTotal: obj.length,
          })
          if (response.data.length >= this.state.limit) {
            this.setState({ foundProduct: true })
          } else {
            this.setState({ foundProduct: false })
          }
        } else {
          this.setState({ searchData: [], total: 0, foundProduct: false })

        }
      })

    }
    $('.filter_accordion').eq(0).children('.content').show()
    $('.filter_accordion .tab').click(function () {
      $(this).parent().siblings().children('.tab').removeClass('show')
      $(this).addClass('show')
      $(this).parent().siblings().children('.content').slideUp()
      $(this).next().slideToggle()
    })

    let obj = {
      user_id: this.props.sfid,
    }
    this.props.dispatch(getViewedProduct(obj))

    let filterData = {
      sub_category: subcat_id.category_id,
    }
    this.props.dispatch(getCategoryFilters(filterData))

    let similarData = {
      sub_category_id: subcat_id.category_id,
    }
    await this.props.dispatch(getSimilarProduct(similarData))
    const { user } = this.props
    let data = {
      user_id: user,
      sfid: this.props.sfid,
    }
    await this.props.dispatch(getProductById(data)).then((response) => {
      console.log(response, 'resp')
    })


    $(document).on("click", () => {
      this.setState({ showCatsuggest: false })
    })
  }

  handleSubSearch = (event) => {
    this.setState({ sub_search: event.target.value })
    let search = event.target.value
    if (search.length > 1) {
      this.searchData(search)
    } else {
      this.setState({ catSearch: [] })
    }
  }

  searchData = (search) => {
    this.setState({ catSearch: [] });

    const payload = {
      "search": search,
      "category_id": this.props.subcat_id.category_id,
      "parent_id": "",
      "user_sfid": this.props.sfid
    }

    this.props.dispatch(getGlobalSearch(payload)).then((response) => {
      if (response && response.status === "success") {
        this.setState({ catSearch: response.data });
        this.setState({ showCatsuggest: true })

        response.data.length === 0 && this.setState({ showCatsuggest: false })

      } else {
        this.setState({ catSearch: [] });
      }
    });
  }

  isVisibleShowMore = () => {
    const ele = document.getElementById('show_more')
    if (!ele) {
      return
    }
    const { top, bottom } = ele.getBoundingClientRect()
    const vHeight = window.innerHeight || document.documentElement.clientHeight
    if (
      (top > 0 || bottom > 0) &&
      top < vHeight &&
      !this.state.loadingSeenMore
    ) {
      this.setState({ loadingSeenMore: true }, () => {
        // this.handleSeenMore()
      })
    }
  }

  handleSeenMore = () => {
    const { subcat_id, sfid } = this.props

    let page = this.state.page + 1
    let data = {
      sub_category_id: subcat_id.category_id,
      page: page,
      limit: this.state.limit,
      user_sfid: sfid,
    }
    this.props.dispatch(getProductByCategory(data, page)).then((response) => {
      if (response && response.status === 'success') {
        var count = page * this.state.limit
        var getObj = response.data
        var getCount = getObj.length
        var currentTotal = this.state.currentTotal
        this.setState({ searchData: [...this.state.searchData, ...getObj] })
        this.setState({
          total: response.count,
          page: page,
          currentTotal: currentTotal + getCount,
        })
        if (response.data.length >= this.state.limit) {
          this.setState({ foundProduct: true, loadingSeenMore: false })
        } else {
          this.setState({ foundProduct: false, loadingSeenMore: false })
        }
      } else {
        this.setState({
          searchData: [],
          total: 0,
          foundProduct: false,
          loadingSeenMore: false,
        })
      }
    })
  }

  inputfocus = (elmnt) => {
    if (elmnt.key === 'Enter') {
      let search = this.state.sub_search
      if (search.length > 1) {
        this.searchData(search)
      }
    }
  }

  handleCompare = () => {
    this.setState({ isCompareClicked: true })
    window.scrollTo(0, 0)
  }

  handleClearCompare = async () => {
    // console.log("clear console called")
    // const getData = this.state.selected;
    // await Promise.all(getData.map(element => {
    //     let ref = 'ref_' + element.id;
    //     this.refs[ref].checked = !this.refs[ref].checked;
    // }));
    this.setState({ selected: [], selectedItem: [] })
  }

  handleRemoveCompare = (modsfid) => {
    // let modifiedRow;
    // let modifiedItem;
    //  console.log("inside else " + this.state.selected)
    //   modifiedRow = this.state.selected.filter(s => s !== row);
    // console.log(modsfid, this.state.selectedItem, "remove compare")
    // console.log(modsfid.sfid, "remove compare")
    let modifiedItem = this.state.selectedItem.filter((s) => s !== modsfid)
    // console.log(modifiedItem, "remove compare")

    // console.log("modifiedRow -- "+ JSON.stringify(modifiedRow))
    this.setState({ selectedItem: modifiedItem })
  }

  onSelectClick = (e, row) => {
    let modifiedRow
    let modifiedItem
    const checked = e.target.checked
    if (checked) {
      //  console.log("inside if " + this.state.selected)
      modifiedRow = [...this.state.selected, row]
      modifiedItem = [...this.state.selectedItem, row.sfid]
    } else {
      // console.log("inside else " + this.state.selected)
      modifiedRow = this.state.selected.filter((s) => s !== row)
      modifiedItem = this.state.selectedItem.filter((s) => s !== row.sfid)
    }
    // console.log("modifiedRow -- "+ JSON.stringify(modifiedRow))
    this.setState({ selectedItem: modifiedItem })
  }

  handleAddProduct = () => {
    this.setState({ isCompareClicked: false })
  }

  isFilterSelected(title, data_name) {
    const selectedFilters = this.state.selectedFilters
    let current_index = selectedFilters.findIndex((item) => {
      return item.title === title
    })
    if (current_index === -1) return false
    return selectedFilters[current_index].data.includes(data_name)
  }

  handleCompareEnable = () => {
    let isEnable = this.state.isCompareEnable
    if (isEnable) {
      this.setState({ isCompareEnable: false })
      this.handleClearCompare()
    } else {
      this.setState({ isCompareEnable: true })
    }
  }

  setFavourite(pid, id) {
    const { user, sfid } = this.props
    if (sfid) {
      let data = {
        user_sfid: sfid,
        product_id: pid,
        device_id: '',
      }
      this.props.dispatch(favProduct(data)).then((response) => {
        if (response && response.status && response.status === 'success') {
          this.getFavCount()
          if ($(`#${id}`).hasClass('active')) {
            $(`#${id}`).removeClass('active')
            $(`#${id}`).removeClass('fa-heart')
            $(`#${id}`).addClass('fa-heart-o')
          } else {
            $(`#${id}`).addClass('active')
            $(`#${id}`).addClass('fa-heart')
            $(`#${id}`).removeClass('fa-heart-o')

          }
        }
      })
    } else {
      this.props.pushPage('/login')
    }
  }

  getFavCount = () => {
    const { sfid } = this.props
    let data = {
      user_sfid: sfid,
    }
    this.props.dispatch(getFavoriteProductCount(data))
  }
  handleFiltersort = (pageOverride) => {
    console.log(pageOverride, "eeeeeeeeeeeeeeeeee")
    const { sfid, subcat_id } = this.props

    const { page, selectedBrand, selectedSort, value, emi_amount } = this.state
    // console.log(emi_amount,"EMI AMM")
    let data = {
      sub_category_id: subcat_id.category_id,
      user_sfid: sfid,
      limit: this.state.limit,
      filters: this.state.selectedFilters,
      page: 1 ? 1 : page,
      sort_order: pageOverride
    }
    console.log(data, 'DATA BEFORE PUSH!')
    if (selectedBrand && selectedBrand.length > 0) {
      data.brands = selectedBrand
    }
    if (selectedSort) {
      data.sort_order = selectedSort
    }
    this.props.dispatch(getProductByCategory(data)).then((response) => {
      if (response && response.status === 'success') {
        var obj = response.data
        this.setState({
          productFound: true,
          searchData: response.data,
          total: response.count,
          currentTotal: obj.length,
          page: pageOverride,
        })
        if (response.count > 12) {
          this.setState({ foundProduct: true })
        } else {
          this.setState({ foundProduct: false })
        }
      } else {
        this.setState({
          productFound: false,
          searchData: [],
          total: 0,
          foundProduct: false,
        })
      }
    })
  }


  handleFilter = (pageOverride) => {
    const { sfid, subcat_id } = this.props

    const { page, selectedBrand, selectedSort, value, emi_amount } = this.state
    // console.log(emi_amount,"EMI AMM")
    let data = {
      sub_category_id: subcat_id.category_id,
      user_sfid: sfid,
      limit: this.state.limit,
      filters: this.state.selectedFilters,
      page: pageOverride ? pageOverride : page,

    }
    console.log(data, 'DATA BEFORE PUSH!')
    if (selectedBrand && selectedBrand.length > 0) {
      data.brands = selectedBrand
    }
    if (selectedSort) {
      data.sort_order = selectedSort
    }
    this.props.dispatch(getProductByCategory(data)).then((response) => {
      if (response && response.status === 'success') {
        var obj = response.data
        this.setState({
          productFound: true,
          searchData: response.data,
          total: response.count,
          currentTotal: obj.length,
          page: pageOverride,
        })
        if (response.count > 12) {
          this.setState({ foundProduct: true })
        } else {
          this.setState({ foundProduct: false })
        }
      } else {
        this.setState({
          productFound: false,
          searchData: [],
          total: 0,
          foundProduct: false,
        })
      }
    })
  }

  handleBuy = (pid) => {
    this.props.handleProBuy(pid)
  }

  productDetail(pid) {
    window.location = '/product-details/' + pid
  }

  closeModal = () => {
    document.getElementById('modal-close').click()
  }

  onFilterSelect = (e, title, dataIndex, index, type, ftype) => {
    const { category_filters } = this.props

    let current_filters = [...this.state.selectedFilters]
    let current_index = current_filters.findIndex((item) => {
      return item.title === title
    })
    if (type === 'list') {
      const checked = e.target.checked

      // item is not present in current filters
      if (current_index === -1) {
        if (checked) {
          current_filters.push({
            title: title,
            data: [category_filters[ftype][dataIndex].data[index]],
            schema: category_filters[ftype][dataIndex].schema,
            type: category_filters[ftype][dataIndex].type,
            key: category_filters[ftype][dataIndex].key,
          })
        }
      } else {
        //item is already in filters so we only edit the data array
        if (checked) {
          //item is not present in the data sub array
          current_filters[current_index].data.push(
            category_filters[ftype][dataIndex].data[index],
          )
        } else {
          //item is present in the data sub array need to remove
          let newarr = current_filters[current_index].data.filter((item) => {
            return item !== category_filters[ftype][dataIndex].data[index]
          })
          current_filters[current_index].data = newarr
          if (newarr.length === 0) {
            current_filters.splice(current_index, 1)
          }
        }
      }
    } else if (type === 'minmax') {
      // item is not present in current filters
      if (current_index === -1) {
        current_filters.push({
          title: title,
          data: {
            min: e[0],
            max: e[1],
          },
          schema: category_filters[ftype][dataIndex].schema,
          type: category_filters[ftype][dataIndex].type,
          key: category_filters[ftype][dataIndex].key,
        })
      } else {
        //item is already in filters so we only edit the data array

        current_filters[current_index].data = {
          min: e[0],
          max: e[1],
        }
      }
    }

    // console.log('set filters', current_filters)

    this.setState(
      {
        selectedFilters: current_filters,
      },
      () => {
        // this.handleFilter();
      },
    )
  }
  getNoCostCount = (searchData) => {
    return searchData.filter((item) => item.no_cost_emi__c).length
  }

  treeView = (treeV) => {
    if (treeV == 'grid') {
      this.setState({ showtreeView: true, gridView: true, mapView: false })
    } else if (treeV == 'map') {
      this.setState({ showtreeView: false, gridView: false, mapView: true })
    }
  }

  SearchSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }


  setCoordinates = (ll) => {
    this.setState({ coordinates: ll })
    // API CALL FOR LOCATION
    // let data = {
    //   sub_category_id: "",
    //   user_sfid: ""
    // }
    // this.props.dispatch(getProductByCategory(data)).then((response) => console.log(response,"rrrrrrrrrrrrrr"))
    this.props.dispatch(setLatLon(ll))
  }

  setLocationName = (name) => {
    this.setState({ locationName: name })
  }

  handleSearch = () => {
    // API CALL

  }

  apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    // const bounds = getMapBounds(map, maps, places);
    // // Fit map to bounds
    // map.fitBounds(bounds);
    // // Bind the resize listener
    // bindResizeListener(map, maps, bounds);
  };
  render() {
    const {
      sfid,
      user,
      pushPage,
      similarProd,
      recentProd,
      category_filters,
    } = this.props
    const {
      isCompareEnable,
      productFound,
      category,
      catSearch,
      total,
      foundProduct,
      page,
      currentTotal,
      isCompareClicked,
      selected,
    } = this.state
    const searchBoxModified = {
      borderRadius: "30px 30px 0px 0px"
    }

    return (
      <>
        <Helmet>
          <title>Eduvanz | Products</title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {!isCompareClicked ? (
          <>



            <div className='accomodation-banner mb-5'>
              <div className='accomodation-banner-caption'>
                <div className='row align-items-center justify-content-center'>
                  <div className='col-lg-10'>
                    <h1 className='text-white text-center mb-4'>Discover Your Life. Travel Where You Want</h1>
                    <p className='text-white text-center'>Plan &amp; book your perfect trip with travel tips, destination and inspiration from us </p>

                    <div className='accomodation-search-box px-4 py-3 mt-4'>
                      <div className='row align-items-start'>
                        <div className='col-lg-4 px-lg-4 bdr brb2'>
                          <img src="images/icons/icon_Maps.png" alt="" className='img-fluid' />
                          <label className=' mb-0 gryText'>Location</label>
                          <LocationSearchInput setCoordinates={this.setCoordinates} setLocationName={this.setLocationName} placeholder='Location' page="plp" />

                          {/* <input type="text" placeholder='location' className='' /> */}
                        </div>
                        <div className='col-lg-3 px-lg-3 bdr brb2'>
                          <img src="images/icons/cal3.png" alt="" className='img-fluid' />
                          <label className='mb-0 gryText'>Move in</label>
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={(date) => this.setState({ startDate: date })}
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                          />
                        </div>
                        <div className='col-lg-5 bdr brb2 pr-0'>
                          <div className='row align-items-center'>
                            <div className='col-lg-6'>
                              <img src="images/icons/clock2.png" alt="" className='img-fluid' />
                              <label className='mb-0 gryText'>Duration</label>
                              <select>
                                <option>3 Month</option>
                                <option>6 Month</option>
                                <option>9 Month</option>
                              </select>
                            </div>
                            <div className='col-lg-6'>
                              <button type='button' className='pay-btn w-100'
                                disabled={!(this.state.coordinates.lat !== null && this.state.coordinates.lng !== null)}
                                onClick={() => this.handleSearch()}
                              >Search</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img src="../images/accomodation3.jpg" className='img-fluid' />
            </div>


            <div className="inner-page" style={{ backgroundColor: "white" }}>
              <div className="container">
                <div className="row mt-4 mb-5">
                  <div className="col-12 d-flex">
                    <div className="col-8">
                      <h2 className='section_title mb-lg-4 mb-3'>Your Second home in {this.state.locationName.length > 0 ? this.state.locationName : 'Pune'} </h2>
                    </div>
                    <div className="col-4 text-right">
                      <div className="row">
                        <div className="col-12 d-flex">
                          <div className="col-8 text-right">
                            <a className={this.state.gridView ? 'activeView' : "greyText"}
                              onClick={(e) => {
                                e.preventDefault();
                                this.treeView('grid')
                              }}
                              href="#grid"
                            >


                              {this.state.gridView ?

                                <img
                                  src={asset + 'images/icons/app_icon.png'}

                                  alt=""
                                /> : <img
                                  src={asset + 'images/icons/grid.png'}
                                  alt="" width={20} height={20}
                                />}
                              <span className={this.state.gridView ? 'activeView ml-1' : "greyText ml-1"}>Grid View</span>
                            </a>
                          </div>
                          <div className="col-4">
                            <a className={this.state.mapView ? 'activeView' : "greyText"}
                              onClick={(e) => {
                                e.preventDefault();
                                this.treeView('map')
                              }}
                              href="#map"
                            >
                              {this.state.gridView ?

                                <img
                                  src={asset + 'images/icons/greymap.png'}
                                  alt=""
                                /> : <img
                                  src={asset + 'images/icons/blackmap.png'}
                                  alt=""
                                />}

                              <span className={this.state.mapView ? 'activeView' : "greyText"}>Map View</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4 mb-5">
                  <div className="col d-flex flex-wrap">

                    <Filter
                      handleFilter={this.handleFilter}
                      onFilterSelect={this.onFilterSelect}
                      handleFiltersort={this.handleFiltersort}
                      category_filters={category_filters}
                      isCompareEnable={isCompareEnable}
                      handleCompareEnable={this.handleCompareEnable}
                    />



                    <div className="ml-auto d-flex justify-content-end align-items-center">
                      <label className="switch mb-0">
                        <input
                          type="checkbox"
                          name="expandAll"
                          onChange={() => {
                            this.setState(
                              { showOnlyNoCost: !this.state.showOnlyNoCost },
                              () => {
                                this.isVisibleShowMore()
                              },
                            )
                          }}
                        />
                        <span className="slider round"></span>
                      </label>
                      <p className="mb-1 ml-2">No Cost EMI</p>
                    </div>
                  </div>
                </div>
                {selected && selected.length > 0 && (
                  <div className="row mb-5">
                    <div className="col d-flex justify-content-between selected-items-row py-3">
                      <div className="d-flex align-items-center">
                        <p className="m-0 si_b mr-3">
                          {selected.length} items selected
                        </p>
                        <ul className="m-0 selected-prod d-flex flex-wrap">
                          {selected &&
                            selected.length > 0 &&
                            selected.map((item, index) => (
                              <li key={`item-${index}`}>
                                <img
                                  src={item.image_url__c}
                                  alt="upgard"
                                  className="img-fluid"
                                />
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        {selected && selected.length > 1 && (
                          <button
                            type="button"
                            onClick={this.handleCompare}
                            className="apply-btn"
                          >
                            Compare Products
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={this.handleCompareEnable}
                          className="ml-3"
                        >
                          <img
                            src={asset + 'images/icons/icon-close2.png'}
                            alt="upgard"
                            className="img-fluid"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="row mb-4">
                  <div className="col">
                    <h5 className="show_number_of_item">
                      Showing{' '}
                      {this.state.showOnlyNoCost
                        ? this.getNoCostCount(this.state.searchData)
                        : currentTotal}{' '}
                      of{' '}
                      {this.state.showOnlyNoCost
                        ? this.getNoCostCount(this.state.searchData)
                        : total}
                    </h5>
                  </div>
                </div>
                {this.state.showtreeView ? (
                  <div className="row mb-4">
                    {this.state.searchData &&
                      this.state.searchData.length > 0 ? (
                      this.state.searchData.map((item, index) => (
                        <>
                          {this.state.showOnlyNoCost && item.no_cost_emi__c === true && (

                            // <div key={`product-item-${index}`}
                            //   className="col-lg-3 col-md-2"
                            // >
                            //   <div className="search-result-box mb-4">
                            //     {isCompareEnable && (
                            //       <div className="compare-check compare-checkbox">
                            //         <div className="custom-control custom-checkbox">
                            //           <input
                            //             type="checkbox"
                            //             className="custom-control-input"
                            //             ref={`ref_${item.id}`}
                            //             id={item.id}
                            //             onChange={(e) =>
                            //               this.onSelectClick(e, item)
                            //             }
                            //             value={item.id}
                            //             defaultChecked={this.state.selectedItem.includes(
                            //               item.sfid,
                            //             )}
                            //           />
                            //           <label
                            //             className="custom-control-label"
                            //             htmlFor={item.id}
                            //           >
                            //             {' '}
                            //             Compare{' '}
                            //           </label>
                            //         </div>
                            //       </div>
                            //     )}
                            //     <div
                            //       className="img-box mb-4 noverlay"
                            //       onClick={() =>
                            //         this.productDetail(item.sfid)
                            //       }
                            //     >
                            //       <img
                            //         src={item.image_url__c}
                            //         alt=""
                            //         className="img-fluid mt-0 "
                            //       />
                            //     </div>

                            //     <div className="px-3 pb-3">
                            //       <div
                            //         onClick={() =>
                            //           this.productDetail(item.sfid)
                            //         }
                            //       >
                            //         <p>{item.name}</p>
                            //         <h5 className="emi_txt">
                            //           EMI Starting ₹{item.min_avi_emi__c}/mo
                            //         </h5>
                            //       </div>
                            //       <div className="d-flex justify-content-between">
                            //         <div
                            //           className="d-flex"
                            //           onClick={() =>
                            //             this.productDetail(item.sfid)
                            //           }
                            //         >
                            //           <div className="price-width-discount">
                            //             <p className="mb-0 p2">
                            //               Stride Price
                            //             </p>

                            //             <span className="current-price">
                            //               ₹{item.price__c}
                            //             </span>
                            //             <span className="previous-price ml-2">
                            //               ₹{item.mrp__c}
                            //             </span>
                            //           </div>
                            //           <div className="discount ml-2 border-left pl-2">
                            //             <span className="d-block">{item.discountRate}%</span>
                            //             OFF
                            //           </div>
                            //         </div>
                            //         <div className="wishlist">

                            //           <button type='button'>
                            //             <i
                            //               className="fa fa-heart"
                            //               aria-hidden="true"
                            //             ></i>
                            //           </button>


                            //         </div>
                            //       </div>
                            //     </div>
                            //   </div>

                            // </div>


                            <ProductBox
                              index={index}
                              item={item}
                              pushPage={pushPage}
                              dispatch={this.props.dispatch}
                              user={user}
                              sfid={sfid}
                              page={'plp'}
                              isCompareEnable={isCompareEnable}
                              selectedItem={this.state.selectedItem}
                              onSelectClick={this.onSelectClick}
                            ></ProductBox>

                          )}
                          {!this.state.showOnlyNoCost && (
                            // <div
                            //   key={`product-item-${index}`}
                            //   className="col-lg-3 col-md-4"
                            // >
                            //   <div className="search-result-box mb-4">
                            //     {isCompareEnable && (
                            //       <div className="compare-check compare-checkbox">
                            //         <div className="custom-control custom-checkbox">
                            //           <input
                            //             type="checkbox"
                            //             className="custom-control-input"
                            //             ref={`ref_${item.id}`}
                            //             id={item.id}
                            //             onChange={(e) =>
                            //               this.onSelectClick(e, item)
                            //             }
                            //             value={item.id}
                            //             defaultChecked={this.state.selectedItem.includes(
                            //               item.sfid,
                            //             )}
                            //           />
                            //           <label
                            //             className="custom-control-label"
                            //             htmlFor={item.id}
                            //           >
                            //             {' '}
                            //             Compare{' '}
                            //           </label>
                            //         </div>
                            //       </div>
                            //     )}
                            //     <div
                            //       className="img-box mb-4 noverlay"
                            //       onClick={() => this.productDetail(item.sfid)}
                            //     >
                            //       <img
                            //         src={item.image_url__c}
                            //         alt=""
                            //         className="img-fluid mt-0 "
                            //       />
                            //     </div>

                            //     <div className="px-3 pb-3">
                            //       <div
                            //         onClick={() =>
                            //           this.productDetail(item.sfid)
                            //         }
                            //       >
                            //         <p>{item.name}</p>
                            //         <h5 className="emi_txt">
                            //           EMI Starting ₹{item.min_avi_emi__c}/mo
                            //         </h5>
                            //       </div>
                            //       <div className="d-flex justify-content-between">
                            //         <div
                            //           className="d-flex"
                            //           onClick={() =>
                            //             this.productDetail(item.sfid)
                            //           }
                            //         >
                            //           <div className="price-width-discount">
                            //             <p className="mb-0 p2">Stride Price</p>
                            //             <span className="current-price">
                            //               ₹{item.mrp__c}
                            //             </span>{' '}
                            //             <span className="previous-price">
                            //               ₹89,990
                            //             </span>
                            //           </div>
                            //           <div className="discount ml-2 border-left pl-2">
                            //             <span className="d-block">{item.discountRate}%</span>OFF
                            //           </div>
                            //         </div>
                            //         <div className="wishlist">
                            //           <button type='button'>
                            //             <i
                            //               aria-hidden="true"
                            //               onClick={() =>
                            //                 this.setFavourite(
                            //                   item.sfid,
                            //                   `fav-mobile-item-${item.id}`,
                            //                 )
                            //               }
                            //               id={`fav-mobile-item-${item.id}`}

                            //               className={`d-flex justify-content-center align-items-center ${item.isFavorite ? "active fa fa-heart" : "fa fa-heart-o"}`}></i>
                            //           </button>


                            //         </div>
                            //       </div>
                            //     </div>
                            //   </div>
                            // </div>


                            <ProductBox
                              index={index}
                              item={item}
                              pushPage={pushPage}
                              dispatch={this.props.dispatch}
                              user={user}
                              sfid={sfid}
                              page={'plp'}
                              isCompareEnable={isCompareEnable}
                              selectedItem={this.state.selectedItem}
                              onSelectClick={this.onSelectClick}
                            ></ProductBox>
                          )}
                        </>
                      ))
                    ) : productFound ? (
                      <ContentLoader viewBox="0 0 380 70">
                        <rect
                          x="0"
                          y="0"
                          rx="5"
                          ry="5"
                          width="70"
                          height="70"
                        />
                        <rect
                          x="80"
                          y="17"
                          rx="4"
                          ry="4"
                          width="300"
                          height="13"
                        />
                        <rect
                          x="80"
                          y="40"
                          rx="3"
                          ry="3"
                          width="250"
                          height="10"
                        />
                      </ContentLoader>
                    ) : (
                      <div className="col-md-12 text-center">
                        <p className="m-0 ml-5">Record not found</p>
                      </div>
                    )}
                    {foundProduct && (
                      <div className='row mb-4'>
                        <div className='col-12 text-center'>
                          <h5>Show More</h5>
                          <button type={'button'} id={"show_more"} onClick={this.handleSeenMore} className='show-more'>
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                          </button>
                          <hr></hr>
                        </div>
                      </div>
                    )}
                  </div>

                ) : (
                  <div className='row mb-4' >
                    <div className='col-6' style={{ maxHeight: "500px", overflow: "overlay" }} >
                      <div >
                        <div className="row mb-4">
                          {this.state.searchData &&
                            this.state.searchData.length > 0 ? (
                            this.state.searchData.map((item, index) => (
                              <>
                                {this.state.showOnlyNoCost &&
                                  item.no_cost_emi__c === true && (
                                    // <div className="col-lg-6 col-md-6"
                                    //   key={`product-item-${index}`}
                                    // >
                                    //   <div className="search-result-box mb-4">
                                    //     {isCompareEnable && (
                                    //       <div className="compare-check compare-checkbox">
                                    //         <div className="custom-control custom-checkbox">
                                    //           <input
                                    //             type="checkbox"
                                    //             className="custom-control-input"
                                    //             ref={`ref_${item.id}`}
                                    //             id={item.id}
                                    //             onChange={(e) =>
                                    //               this.onSelectClick(e, item)
                                    //             }
                                    //             value={item.id}
                                    //             defaultChecked={this.state.selectedItem.includes(
                                    //               item.sfid,
                                    //             )}
                                    //           />
                                    //           <label
                                    //             className="custom-control-label"
                                    //             htmlFor={item.id}
                                    //           >
                                    //             {' '}
                                    //             Compare{' '}
                                    //           </label>
                                    //         </div>
                                    //       </div>
                                    //     )}
                                    //     <div
                                    //       className="img-box mb-4 noverlay"
                                    //       onClick={() =>
                                    //         this.productDetail(item.sfid)
                                    //       }
                                    //     >
                                    //       <img
                                    //         src={item.image_url__c}
                                    //         alt=""
                                    //         className="img-fluid mt-0 "
                                    //       />
                                    //     </div>

                                    //     <div className="px-3 pb-3">
                                    //       <div
                                    //         onClick={() =>
                                    //           this.productDetail(item.sfid)
                                    //         }
                                    //       >
                                    //         <p>{item.name}</p>
                                    //         <h5 className="emi_txt">
                                    //           EMI Starting ₹{item.min_avi_emi__c}/mo
                                    //         </h5>
                                    //       </div>
                                    //       <div className="d-flex justify-content-between">
                                    //         <div
                                    //           className="d-flex"
                                    //           onClick={() =>
                                    //             this.productDetail(item.sfid)
                                    //           }
                                    //         >
                                    //           <div className="price-width-discount">
                                    //             <p className="mb-0 p2">
                                    //               Stride Price
                                    //             </p>

                                    //             <span className="current-price">
                                    //               ₹{item.price__c}
                                    //             </span>
                                    //             <span className="previous-price ml-2">
                                    //               ₹{item.mrp__c}
                                    //             </span>
                                    //           </div>
                                    //           <div className="discount ml-2 border-left pl-2">
                                    //             <span className="d-block">{item.discountRate}%</span>
                                    //             OFF
                                    //           </div>
                                    //         </div>
                                    //         <div className="wishlist">

                                    //           <button type='button'>
                                    //             <i
                                    //               onClick={() =>
                                    //                 this.setFavourite(
                                    //                   item.sfid,
                                    //                   `fav-mobile-item-${item.id}`,
                                    //                 )
                                    //               }
                                    //               id={`fav-mobile-item-${item.id}`}

                                    //               className={`d-flex justify-content-center align-items-center 
                                    //         ${item.isFavorite ? "active fa fa-heart" : "fa fa-heart-o"}`}
                                    //             ></i>
                                    //           </button>

                                    //         </div>
                                    //       </div>
                                    //     </div>
                                    //   </div>
                                    // </div>
                                    <ProductBox
                                      index={index}
                                      item={item}
                                      pushPage={pushPage}
                                      dispatch={this.props.dispatch}
                                      user={user}
                                      sfid={sfid}
                                      page={'map_view'}
                                      isCompareEnable={isCompareEnable}
                                      selectedItem={this.state.selectedItem}
                                      onSelectClick={this.onSelectClick}
                                    ></ProductBox>
                                  )}
                                {!this.state.showOnlyNoCost && (

                                  <ProductBox
                                    index={index}
                                    item={item}
                                    pushPage={pushPage}
                                    dispatch={this.props.dispatch}
                                    user={user}
                                    sfid={sfid}
                                    page={'map_view'}
                                    isCompareEnable={isCompareEnable}
                                    selectedItem={this.state.selectedItem}
                                    onSelectClick={this.onSelectClick}
                                  ></ProductBox>

                                  // <div
                                  //   key={`product-item-${index}`}
                                  //   className="col-lg-6 col-md-6"
                                  // >
                                  //   <div className="search-result-box mb-4">
                                  //     {isCompareEnable && (
                                  //       <div className="compare-check compare-checkbox">
                                  //         <div className="custom-control custom-checkbox">
                                  //           <input
                                  //             type="checkbox"
                                  //             className="custom-control-input"
                                  //             ref={`ref_${item.id}`}
                                  //             id={item.id}
                                  //             onChange={(e) =>
                                  //               this.onSelectClick(e, item)
                                  //             }
                                  //             value={item.id}
                                  //             defaultChecked={this.state.selectedItem.includes(
                                  //               item.sfid,
                                  //             )}
                                  //           />
                                  //           <label
                                  //             className="custom-control-label"
                                  //             htmlFor={item.id}
                                  //           >
                                  //             {' '}
                                  //             Compare{' '}
                                  //           </label>
                                  //         </div>
                                  //       </div>
                                  //     )}
                                  //     <div
                                  //       className="img-box mb-4 noverlay"
                                  //       onClick={() => this.productDetail(item.sfid)}
                                  //     >
                                  //       <img
                                  //         src={item.image_url__c}
                                  //         alt=""
                                  //         className="img-fluid mt-0 "
                                  //       />
                                  //     </div>

                                  //     <div className="px-3 pb-3">
                                  //       <div
                                  //         onClick={() =>
                                  //           this.productDetail(item.sfid)
                                  //         }
                                  //       >
                                  //         <p>{item.name}</p>
                                  //         <h5 className="emi_txt">
                                  //           EMI Starting ₹{item.min_avi_emi__c}/mo
                                  //         </h5>
                                  //       </div>
                                  //       <div className="d-flex justify-content-between">
                                  //         <div
                                  //           className="d-flex"
                                  //           onClick={() =>
                                  //             this.productDetail(item.sfid)
                                  //           }
                                  //         >
                                  //           <div className="price-width-discount">
                                  //             <p className="mb-0 p2">Stride Price</p>
                                  //             <span className="current-price">
                                  //               ₹{item.mrp__c}
                                  //             </span>{' '}
                                  //             <span className="previous-price">
                                  //               ₹89,990
                                  //             </span>
                                  //           </div>
                                  //           <div className="discount ml-2 border-left pl-2">
                                  //             <span className="d-block">{item.discountRate}%</span>OFF
                                  //           </div>
                                  //         </div>
                                  //         <div className="wishlist">
                                  //           <button type='button'>
                                  //             <i
                                  //               aria-hidden="true"

                                  //               onClick={() =>
                                  //                 this.setFavourite(
                                  //                   item.sfid,
                                  //                   `fav-mobile-item-${item.id}`,
                                  //                 )
                                  //               }
                                  //               id={`fav-mobile-item-${item.id}`}

                                  //               className={`d-flex justify-content-center align-items-center ${item && item.isFavorite ? "active fa fa-heart" : "fa fa-heart-o"}`} >

                                  //             </i>
                                  //           </button>

                                  //         </div>
                                  //       </div>
                                  //     </div>
                                  //   </div>
                                  // </div>
                                )}
                              </>
                            ))
                          ) : productFound ? (
                            <ContentLoader viewBox="0 0 380 70">
                              <rect
                                x="0"
                                y="0"
                                rx="5"
                                ry="5"
                                width="70"
                                height="70"
                              />
                              <rect
                                x="80"
                                y="17"
                                rx="4"
                                ry="4"
                                width="300"
                                height="13"
                              />
                              <rect
                                x="80"
                                y="40"
                                rx="3"
                                ry="3"
                                width="250"
                                height="10"
                              />
                            </ContentLoader>
                          ) : (
                            <div className="col-md-12 text-center">
                              <p className="m-0 ml-5">Record not found</p>
                            </div>
                          )}
                        </div>

                      </div>

                      {foundProduct && (
                        <div className="row mb-4">
                          <div className="col-12 text-center">
                            <h5>Show More</h5>
                            <button
                              type={'button'}
                              id={'show_more'}
                              onClick={this.handleSeenMore}
                              className="show-more"
                            >
                              <i className="fa fa-angle-down" aria-hidden="true"></i>
                            </button>
                            <hr></hr>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='col-6'>
                      <iframe id="iframeId" src={`https://maps.google.com/maps?q=${this.state.lat},${this.state.lon}&hl=es;&output=embed`} height="500px" width="100%"></iframe>

                      <div style={{ height: '100vh', width: '100%' }}>

                        {/* <GoogleMapReact
                        
                          bootstrapURLKeys={{ key: "AIzaSyAzKciuMDI5r9f6r16O8MqqsGQdsF0bHBc" }}
                          defaultCenter={{lat:this.state.searchData[0].latitude, lng: this.state.searchData[0].longitude}}
                          defaultZoom={this.state.zoom}
                          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                        >
                          <AnyReactComponent
                            lat={this.state.searchData[0].latitude}
                            lng={this.state.searchData[0].longitude}
                            text="Loading..."
                          />
                        </GoogleMapReact> */}

                      </div>


                      <GoogleMap
                        defaultZoom={10}
                        defaultCenter={{ lat: this.state.searchData[0].latitude, lng: this.state.searchData[0].longitude }}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, this.state.searchData)}
                      >
                        {this.state.searchData.map((place) => {
                          return (
                            <Marker
                              key={place.id}
                              text={place.name}
                              lat={place.latitude}
                              lng={place.longitude}
                              price={place.mrp__c}
                            />
                          );
                        }
                        )}
                      </GoogleMap>
                    </div>

                  </div>

                )}

              </div>
            </div>








            <SimilarProduct
              sfid={sfid}
              user={user}
              pushPage={pushPage}
              similarProd={similarProd}
            />
            <RecentView
              recentProd={recentProd}
              sfid={sfid}
              user={user}
              pushPage={pushPage}
            />
            {this.state.relatedBlogData && (
              <NewsArticle blogList={this.state.relatedBlogData} />
            )}
          </>
        ) : (
          <Compare
            selected={this.state.selectedItem}
            handleRemoveCompare={this.handleRemoveCompare}
            handleBuy={this.handleBuy}
            handleAddProduct={this.handleAddProduct}
          />
        )}
        <div
          className="modal right fade"
          id="myModal2"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
        >
          <div className="modal-dialog filter_all" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4>Filters</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  id={'modal-close'}
                >
                  <img
                    src={asset + 'images/icons/icon-close2.png'}
                    alt="upgard"
                    className="img-fluid"
                  />
                </button>
              </div>

              <div className="modal-body mt-lg-5">
                {category_filters &&
                  category_filters.all.map((filters, dataIndex) => (
                    <Accordion
                      className={'mui-acc-override'}
                      key={dataIndex}
                      style={{
                        boxShadow: 'none',
                        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      <AccordionSummary
                        className={''}
                        expandIcon={
                          <img
                            src={`${asset}images/icons/select_dd_arrow2.svg`}
                          />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          <h5 className="tab">
                            <strong>{filters.title}</strong>
                          </h5>
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Typography style={{ overflowX: 'auto' }}>
                          {filters.type === 'list' ? (
                            filters.data.map((item, index) => (
                              // <a key={`${filters.title}-item-${index}`} className="dropdown-item cursor-point" href={void (0)}>
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={`${filters.title}-drop-${index}`}
                                  onChange={(e) =>
                                    this.onFilterSelect(
                                      e,
                                      filters.title,
                                      dataIndex,
                                      index,
                                      filters.type,
                                      'all',
                                    )
                                  }
                                  // value={item[filters.label]}
                                  // defaultChecked={this.state.selectedFilters[filters.filter_key].includes(item[filters.value])}
                                  checked={this.isFilterSelected(
                                    filters.title,
                                    item,
                                  )}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`${filters.title}-drop-${index}`}
                                >
                                  {/*{filters.name==='Color'?(<div style={{width:23,height:23,backgroundColor:item[filters.label]}}></div>):<>{item[filters.label]}</>}*/}
                                  {item}
                                </label>
                              </div>
                              // </a>
                            ))
                          ) : filters.type === 'minmax' ? (
                            <a
                              key={`${filters.title}-item-minmax`}
                              className="dropdown-item cursor-point"
                              href={void 0}
                            >
                              {/*<div className="custom-control custom-checkbox">*/}
                              <Slider
                                pearling
                                minDistance={1}
                                min={filters.data.min}
                                max={filters.data.max}
                                onChange={(value) =>
                                  this.onFilterSelect(
                                    value,
                                    filters.title,
                                    dataIndex,
                                    0,
                                    filters.type,
                                    'all',
                                  )
                                }
                              />
                              {/*</div>*/}
                            </a>
                          ) : (
                            ''
                          )}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                <div className="text-right mt-3">
                  <button
                    onClick={() => {
                      this.setState({ selectedFilters: [] })
                    }}
                    className="link"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => {
                      this.handleFilter(1)
                      this.closeModal()
                    }}
                    className="apply-btn ml-3"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

PlpAccomodation.propTypes = {
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

export default reduxForm({ form: 'PLP-Acco' })(PlpAccomodation)

