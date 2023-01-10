import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavorieBrand, storeSearch, brandSearch, setStore } from "../actions/product";
import { asset } from "../common/assets";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


class FavouriteBrand extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      brands: null,
      showError: false,
      errorMsg: "",
      searchParam:''
    };
  }

  componentDidMount() {
    this.load_all_brands()
  }

  load_all_brands = () => {
    this.props.dispatch(getFavorieBrand()).then((response) => {
      if (response) {
        if (response.responseCode !== undefined && response.responseCode === 200) {
          this.setState({ brands: null });
        } else {
          this.setState({ brands: response });
        }
      }
    });
  }

  renderBrand = (data) => {
    let row = [];
    if (data && data.length > 0) {
      let total = data.length;
      let rowData = [];
      data.map((item, index) => {

        let obj = (<Link to={item.parent_id == 1 ? "/products-list?category=Brands&name=" + item.name : "/products-list?category=EducationBrand&name=" + item.name}><div key={`brand-row-${index}`} className="item" onClick={() => this.openBrand(item)}>


          <img src={item.icon__c || item.icon} /><p>{item.name}</p></div></Link>);
        rowData.push(obj);
        if (((index + 1) == total) || (((index + 1) % 5) === 1 && index !== 0)) {
          let objData = (
            <div className="itemrow" key={`item-row-${(index + 1)}`}>
              {rowData}
            </div>
          );
          row.push(objData);
          rowData = [];
        }
      });
    }
    return row
  }
  openBrand = (item) => {
    this.props.dispatch(setStore(item))
  }

  inputfocus = (elmnt) => {
    if (elmnt.key === "Enter") {
      this.searchBrandItem();
    }
  }

  handleSearchClick = () => {
    const searchData = this.state.searchParam;
    if(searchData.length ==0){
      return;
    }else if (searchData.length > 1) {
      this.searchBrandItem();
    }
    else {
      this.setState({
        showError: true,
        errorMsg: "No store found"
      })
    }
  }

  searchBrandItem = () => {
    if (this.state.searchParam.length == 0) {
      
      this.load_all_brands()
      // return;
    } else {


      let store_search_obj = {
        searchFromWeb: true,
        search_name: this.state.searchParam
      }
      let brand_search_payload = {
        search_name: this.state.searchParam
      }
      // this.props.history.push("/search-listing?search=" + this.state.search);
      // window.location.reload()
      // this.props.dispatch(storeSearch(store_search_obj)).then((response) => {
      this.props.dispatch(brandSearch(brand_search_payload)).then((response) => {
        if (response && response.status === "success") {
          if (response.data && response.data.length > 0) {
            this.setState({ brands: response.data, isSearched: true });
          } else {
            this.setState({ showError: true })
            this.setState({ errorMsg: "No store found" })
          }
        } else {
          this.props.dispatch(getFavorieBrand()).then((response) => {
            if (response) {
              if (response.responseCode !== undefined && response.responseCode === 200) {
                this.setState({ brands: null, showError: false, errorMsg: "" });
              } else {
                this.setState({ brands: response, showError: false, errorMsg: "" }, () => {
                  // this.renderBrand(this.state.brands)

                });
              }
            }
          });
        }
      });
    }
  }

  render() {
   
    const { searchParam, brands, showError } = this.state
    const { textName } = this.props;
    return (
      <>
        <section className="pt-5 pb-5 overflow-hidden favourite-brand fav-brand-after-image">
          {/* <div className="container">
               </div> */}
          <div className="container fav-bottom-image">
            <div className="row mx-0">
              <div className="d-none d-lg-block" style={{ zIndex: 99, background: 'transparent', border: 0, width: '50px' }}></div>
              <div className="col-lg-11 col-12 pl-lg-0">

                <div className="row mx-0 mt-4">
                  <div className="col-sm-4 col-md-4 pl-lg-0">
                    <h3>Shop from your</h3>
                    <h3>favourite brands</h3>
                    <div className="min300">
                      <h4 className="section_title mb-3">{textName != '' ? textName : 'Shop from your favourite  brands'}</h4>
                      <div className="search-bar-card">
                        <input
                          className="header-search-input"
                          type="text"
                          placeholder="Find your favourite brand here"
                          name="search"
                          autoComplete="off"
                          onKeyUp={e => this.inputfocus(e)}
                          onChange={e => {
                            e.preventDefault()
                            this.setState({ searchParam: e.target.value })
                          }} />
                        <button type="button"
                          className="search_btn"
                          onClick={() => this.handleSearchClick()}
                        >
                          <img src={asset + "images/icons/search_icon.png"} alt=""
                            className="img-fluid"
                          /></button>

                      </div>
                      {/* <button className="fyb_btn">Find your brand <i className="fa fa-angle-right" aria-hidden="true"></i></button> */}
                      {this.state.showError ? (
                        <div className='d-inline-block invalid_otp'>{this.state.errorMsg}</div>
                      ) : ''}
                    </div>

                  </div>
                  <div className="col-sm-8 col-md-8  ps-r">
                    <div className="swipe-wrapper">
                      <div className="swipe-container">
                        {this.renderBrand(brands)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="col d-flex  justify-content-end brand">
              <div className="cont ">
                <div id="slider-range-max"></div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default connect()(FavouriteBrand);