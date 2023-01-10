import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { addressUpdate } from "../../actions/user";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import GetOurApp from "../../common/get-our-app";
import LogoSideBar from "../../common/logo-side-bar";
const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;
const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
Geocode.setApiKey(GEO_API_KEY);
Geocode.enableDebug();

class KycAddressScreen4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected:'',
      successful: false,
      isDisabled: true,
      address: '',
      house:'',
      street:'',
      road:'',
      city: '',
      area: '',
      state: '',
      pincode: '',
      zoom: 15,
      height: 400,
      mapPosition: {
          lat: 13.0827,
          lng: 80.2707,
      },
      markerPosition: {
          lat: 13.0827,
          lng: 80.2707,
      }
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                mapPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                markerPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            },
                () => {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                        response => {
                            console.log(response)
                            console.log("aDDRESS", response.results[0].address_components);
                            const address = response.results[0].formatted_address,
                                addressArray = response.results[0].address_components,
                                city = this.getCity(addressArray),
                                area = this.getArea(addressArray),
                                state = this.getState(addressArray),
                                house = this.streetNumber(addressArray),
                                road = this.getRoad(addressArray),
                                nagar = this.getNagar(addressArray),
                                pincode = this.getPincode(addressArray);
                            console.log('city', city, area, state);
                            this.setState({
                                address: (address) ? address : '',
                                area: (area) ? area : '',
                                city: (city) ? city : '',
                                state: (state) ? state : '',
                                house: (house) ? house : '',
                                street: (road) ? road : '',
                                road: (nagar) ? nagar : '',
                                pincode: (pincode) ? pincode : '',
                            })
                        },
                        error => {
                            console.error(error);
                        }
                    );

                })
        });
    } else {
        console.error("Geolocation is not supported by this browser!");
    }
  };

  handeleSubmit = () => {
    const { history, dispatch, user, sfid } = this.props;
    let data = {
      address: `${this.state.house?this.state.house:'0'}${this.state.street?","+this.state.street:''}${this.state.road?","+this.state.road:''}`, 
      address1: `${this.state.area?this.state.area:''}`, 
      state: this.state.state, 
      city: this.state.city, 
      pincode: this.state.pincode,
      type: "Map",
      user_sfid: sfid
     }
    dispatch(addressUpdate(data)).then((response) => {
      if(response.status =="success")
      {
        history.push("/ed_address");
      }
    });
  }

  
  onMarkerDragEnd = (event) =>{
      let newLat = event.latLng.lat();
      let newLng = event.latLng.lng();
      console.log("newLat", newLat);
      console.log("newLng", newLng);
      Geocode.fromLatLng(newLat, newLng).then(
          response => {
              const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray),
                  house = this.streetNumber(addressArray),
                  road = this.getRoad(addressArray),
                  nagar = this.getNagar(addressArray),
                  pincode = this.getPincode(addressArray);

              this.setState({
                  address: (address) ? address : '',
                  area: (area) ? area : '',
                  city: (city) ? city : '',
                  state: (state) ? state : '',
                  house: (house) ? house : '',
                  street: (road) ? road : '',
                  road: (nagar) ? nagar : '',
                  pincode: (pincode) ? pincode : '',
                  markerPosition: {
                      lat: newLat,
                      lng: newLng
                  },
                  mapPosition: {
                      lat: newLat,
                      lng: newLng
                  },
              })
          },
          error => {
              console.error(error);
          }
      );
  }

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


  render() {
    let breadCrumpPosts = [
      { title: 'KYC', url: ''},
      { title: 'Basic Details', url: ''}
  ];
    const { message, isLoading, history } = this.props;

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
      defaultOptions={{mapTypeControl: false}}
        defaultZoom={8}
        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      >
        <Marker
          draggable={true}
          onDragEnd={this.onMarkerDragEnd}
          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
        >
            <InfoWindow>
                  <div>{this.state.address}</div>

            </InfoWindow>
        </Marker>
      </GoogleMap>
    ));

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

     {/* <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_address">Back</Link></li>
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div> */}

     <LogoSideBar sideTitle="Back" backLink='/ed_address' historyGoBack=""  breadCrumpPosts={breadCrumpPosts} />

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
              <div className="form_width_1 ext10 mt-1 mb-1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span className="cl1"></span>
              </div>
              <div className="form_details">
                <h4 className="text-center"><img src="./images/icons/VectorGps12.png" className="pr-2" />Please select your home address</h4>
                <div className="maparea">
                <div className="locationmap">
                <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `380px` }} />}
                mapElement={<div style={{ height: `80%` }} />}
                />
                </div></div>
                <div className="locatioarea" style={{marginTop: '7%'}}>
                    <p className="selectlocation">Select your location <Link to="/ed_address" className="float-right">Change</Link></p>
                    <div className="row align-items-center">
                    {this.state.address?(
                      <div className="col-md-5">
                        <div className="locationicon">
                        <h5>{this.state.city}</h5>
                        <p className="mb-0">{this.state.address}</p>
                        </div>
                      </div>
                      ):''
                    }
                      <div className="col-md-7 text-right">
                          <button 
                            disabled={this.state.address?false:true}
                            type="button" 
                            className="btn-continue"
                            onClick={this.handeleSubmit}
                            >Confirm</button>
                      </div>
                    </div> 
                  </div>
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
  const { user, isLoading, sfid } = state.auth;
  return {
    message,
    user,
    sfid,
    isLoading
  };
}

export default  connect(mapStateToProps)(KycAddressScreen4);
