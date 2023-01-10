import React, { Component } from "react";
import Helmet from "react-helmet";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { addressUpdate, getAddressById, updateAddressById ,getAccountProfile} from "../../actions/user";
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";

const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;

const states = [
  { value: "Tamil Nadu", label: 'Tamil Nadu' },
  { value: "Delhi", label: 'Delhi' },
  { value: "Asam", label: 'Asam' }
]

const cities = [
  { value: 'Chennai', label: 'Chennai' }
]

class KycAddressScreen5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        address: '',
        house:'',
        street:'',
        road:'',
        city: '',
        area: '',
        state: '',
        pincode: '',
        successful: false,
        isDisabled: true,
        mincome:'',
        errorMsg:'',
        isValid: true,
        gmapsLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initMap = () => {
    this.setState({
      gmapsLoaded: true,
    })
  }

  componentDidMount () {
    const { dispatch, selectedAddress } = this.props
    if(selectedAddress > 0)
    {
        let data = {
          address_id: selectedAddress
        }
        dispatch(getAddressById(data)).then((response)=>{
            if(response.status =="success")
            {
              let resData = response.data;
              this.setState({
                    address: resData.address__c,
                    city: { value: resData.city__c, label: resData.city__c },
                    state:{ value: resData.state__c, label: resData.state__c },
                    pincode: resData.pincode__c
              });
            }
        });
    }
    window.initMap = this.initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places&callback=initMap`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    let dataObj = {
      user_sfid: localStorage.getItem('sfid')
    }
    this.props.dispatch(getAccountProfile(dataObj)).then((response) => {  
      if(response.status ==='success'){
        this.setState({haveLimit : response && response.accountDet && response.accountDet.ipa_basic_bureau__c,limitActivate :response && response.accountDet && response.accountDet.is_limit_confirm__c })
      }
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handlePlacesChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => results[0])
      .then((getData) => { 
        const address = getData.formatted_address,
        addressArray = getData.address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray),
        house = this.streetNumber(addressArray),
        road = this.getRoad(addressArray),
        nagar = this.getNagar(addressArray),
        pincode = this.getPincode(addressArray);
        var reHouse = `${house}${road?","+road:''}${nagar?","+nagar:""}`;
        var trimmed =  reHouse.split(',').slice(1);
        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? { value: city, label: city } : '',
          state: (state) ? { value: state, label: state } : '',
          house: trimmed,
          street: (road) ? road : '',
          road: (nagar) ? nagar : '',
          pincode: (pincode)?pincode:''
      })
    }).catch(error => console.error('Error', error));
  };

  getCity = (addressArray) => {
      let city = '';
      for (let i = 0; i < addressArray.length; i++) {
          if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
              city = addressArray[i].long_name;
              return city;
          }
      }
  };

  streetNumber = (addressArray) => {
    let streenNumber = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'street_number' === addressArray[i].types[0]) {
          streenNumber = addressArray[i].long_name;
            return streenNumber;
        }
    }
  };

  getRoad = (addressArray) => {
    let road = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'route' === addressArray[i].types[0]) {
          road = addressArray[i].long_name;
            return road;
        }
    }
  };

  getNagar = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0]) {
            for (let j = 0; j < addressArray[i].types.length; j++) {
                if ('sublocality_level_2' === addressArray[i].types[j] || 'political' === addressArray[i].types[j] || 'sublocality' === addressArray[i].types[j]) {
                    area = addressArray[i].long_name;
                    return area;
                }
            }
        }
    }
  };

  getArea = (addressArray) => {
      let area = '';
      for (let i = 0; i < addressArray.length; i++) {
          if (addressArray[i].types[0]) {
              for (let j = 0; j < addressArray[i].types.length; j++) {
                  if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                      area = addressArray[i].long_name;
                      return area;
                  }
              }
          }
      }
  };

  getState = (addressArray) => {
      let state = '';
      for (let i = 0; i < addressArray.length; i++) {
          for (let i = 0; i < addressArray.length; i++) {
              if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                  state = addressArray[i].long_name;
                  return state;
              }
          }
      }
  };

  getPincode = (addressArray) => {
    let pincode = '';
    for (let i = 0; i < addressArray.length; i++) {
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'postal_code' === addressArray[i].types[0]) {
              pincode = addressArray[i].long_name;
                return pincode;
            }
        }
    }
  };

  cityChange = (e) => {
    console.log("city", e);
    this.setState(
      { city: e }
    );
  }

  stateChange = (e) => {
    this.setState(
      { state: e }
    );
  }

  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, dispatch, user, selectedAddress, sfid } = this.props; 
    let data = {
        address_id: selectedAddress,
        type: "Manual",
        address: `${this.state.house?this.state.house:'0'}${this.state.street?","+this.state.street:''}${this.state.road?","+this.state.road:''}`, 
        address1: `${this.state.area?this.state.area:''}`, 
        state: this.state.state.value, 
        city: this.state.city.value, 
        pincode: this.state.pincode, 
        sfid: sfid,
       id: sfid,
    }
    if(selectedAddress > 0)
    {

      let data = {
        address_id: selectedAddress,
        type: "Manual",
        address: `${this.state.house?this.state.house:'0'}${this.state.street?","+this.state.street:''}${this.state.road?","+this.state.road:''}`, 
        address1: `${this.state.area?this.state.area:''}`, 
        state: this.state.state.value, 
        city: this.state.city.value, 
        pincode: this.state.pincode, 
        sfid: sfid,
    }

      dispatch(updateAddressById(data)).then((response)=>{
        if(response.status ==="success")
        {
          if(this.state.haveLimit > 0 && this.state.limitActivate){
            history.push("/ed_doc");

          }else{
            history.push("/bank_screen5");
          }
        }
      });
    }else{

      let n_data = {
        type: "Manual",
        address: `${this.state.house?this.state.house:'0'}${this.state.street?","+this.state.street:''}${this.state.road?","+this.state.road:''}`, 
        address1: `${this.state.area?this.state.area:''}`, 
        state: this.state.state.value, 
        city: this.state.city.value, 
        pincode: this.state.pincode, 
        user_sfid: sfid,
    }

      dispatch(addressUpdate(n_data)).then((response) => {
          if(response.status ==="success")
          {
            if(this.state.haveLimit > 0){
              history.push("/ed_doc");
  
            }else{
              history.push("/bank_screen5");
            }
          }
      });
    }
    
  }

  render() {
    const { message, isLoading, history } = this.props;
    const btnStyle = {
      background: '#1F1F2D',
      borderRadius: '10px',
      color: '#ffffff'
    }
    let breadCrumpPosts = [
      { title: 'KYC', url: ''},
      { title: 'Basic Details', url: ''}
  ];
    return (
     <>
     <Helmet>
     <title> Eduvanz | Address Details </title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     {isLoading?(
            <div className="loading">Loading&#8230;</div>
            ):''}
     <section className="kyc_pages">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-1 login-bg">

     {/* <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_address">Back</Link></li>
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='/ed_address' historyGoBack="" breadCrumpPosts={breadCrumpPosts} />
     {/* <div className="navigations">
      <ul className="breadcrumps">
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div> */}

     <h1 className="titfnt">
     <span className="d-block">Basic</span> Details
     </h1>
     <ul className="left_tabs">
     <li className="bgmoney"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></li>
     <li className="bghome active"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></li>
     </ul>
     </div>
            <div className="kyc_rightbar flex-col-m justify-content-center">
              <div className="form_width_1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span className="cl1"></span>
              </div>
              <div className="form_details">
                <h4 className="text-center" style={{width:'600px'}}><img src="./images/icons/VectorGps12.png" className="pr-2" />Enter details of your current home</h4>
                <form  onSubmit={this.handleSubmit} className="otpform otpform-others fullwidth currentadd">
                <div className="form_spacing mn_height_1 mt-4">
                {this.state.gmapsLoaded && (
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handlePlacesChange}
                    onSelect={this.handleSelect}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div className="form-group position-relative">
                        <input
                          {...getInputProps({
                            placeholder: 'Search for area or street name ...',
                            className: 'location-search-input',
                          })}
                          
                        />
                        <img src="./images/icons/VectorSearch12.png" style={{ position:'absolute',top:'35px',right:'10px'}} />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#eaeaea', cursor: 'pointer' }
                              : { backgroundColor: '#f5f5f5', cursor: 'pointer' };
                            return (
                              <div
                                key={'item'+index}
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span key={index}>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </PlacesAutocomplete>
                 )}
                <div className="form-group">
                <span className="has-float-label">
                  <input onChange={this.handleChange} value={this.state.house} id="house" name="house" type="text" placeholder=" "/>
                  <label htmlFor="house">House / Flat / Block No.</label>
                </span>
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">
                <span className="has-float-label">
                <Select 
                    options={cities}
                    name="city"
                    id="city"
                    value={this.state.city}
                    onChange={this.cityChange}
                    />
                  <label htmlFor="city">City</label>
                </span>
                </div>
                  </div>
                  <div className="col-md-6">
                      <div className="form-group">
                <span className="has-float-label">
                <Select 
                    options={states}
                    value={this.state.state}
                    name="state"
                    id="state"
                    onChange={this.stateChange}
                  />
                  <label htmlFor="state">State</label>
                </span>
                </div>
                  </div>
                </div>
                <div className="form-group">
                <span className="has-float-label">
                  <input onChange={this.handleChange} value={this.state.pincode} maxLength={"6"}  id="pincode" name="pincode" type="text" placeholder=" "/>
                  <label htmlFor="pincode">Pincode</label>
                </span>
                </div>
                </div>
                <div className="form_spacing">
                    <button 
                    type="submit"
                    disabled={this.state.address && this.state.house && this.state.city && this.state.state && this.state.pincode?false:true}
                    className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15  mb-3"
                    style={this.state.address && this.state.house && this.state.city && this.state.state && this.state.pincode?btnStyle:{}}
                    >
                    Continue
                    </button>
                </div>
                </form>
                </div>
              </div>
              <div className="pos_abs">
                        <GetOurApp 
                  dispatch={this.props.dispatch}
                />                    
                    </div>
            </div>
          </div>
        </div>
      </section>
     </>
     );
   }
 }

 function mapStateToProps(state) {
  const { message } = state.message;
  const { isLoading, user, sfid } = state.auth;
  const { selectedAddress } = state.user;
  return {
    selectedAddress,
    message,
    isLoading,
    sfid,
    user
  };
}

export default connect(mapStateToProps)(KycAddressScreen5);
