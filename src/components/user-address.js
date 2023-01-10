import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import $ from 'jquery'
import { getAddress, addressUpdate, removeAddress, addressEdit, getProfileById, load_city_state_list } from '../actions/user'
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import Geocode from "react-geocode";
const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;
const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
Geocode.setApiKey(GEO_API_KEY);
Geocode.enableDebug();

class UserAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sfid: "",
            address_type: "",
            houseno: "",
            area: "",
            city: "",
            state: "",
            pincode: "",
            address: {},
            search_address: '',
            isUpdating: false,
            validated: false,
            address_id: '',
            user_id: 0,
            gmapsLoaded: false,


            street: '',
            road: '',
            city_state_list: [],
            city_list:[],
            selected_city:null


        };
    }

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        })
    }

    loadAddresses() {
        this.props.dispatch(getAddress({ "user_sfid": this.state.sfid })).then((response) => {

        })
    }

    async componentDidMount() {
        this.load_city_state();
        this.props.dispatch(getAddress({ "user_sfid": this.props.sfid })).then((response) => {
        })

        if (this.state.user_id == 0) {
            this.setState({ user_id: localStorage.getItem("user_id") })
        }

        window.initMap = this.initMap
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

        // if( this.state.user_id.length <=1  || this.state.user_id == 0){
        //     let obj = {
        //         "user_sfid": this.props.sfid

        //       }
        //       this.props.dispatch(getProfileById(obj)).then((response) => {
        //           console.log(response,"responmsesssss")
        //         // if (response.message === "success") {
        //         //   this.setState({ userId: response.profile.id });
        //         // }
        //       });

        const {profile , userAddress} = this.props;

        if(!profile){
            let id = localStorage.getItem('sfid')
           
                let data = {
                    user_sfid: id,
                }
               await this.props.dispatch(getProfileById(data)).then
           
        }
        
    }




    async componentDidUpdate(prevProps, getSnapshotBeforeUpdate) {
        if (this.state.sfid.length === 0) {
            this.setState({ sfid: this.props.sfid });
        }


        let { houseno, area, city, state, pincode } = getSnapshotBeforeUpdate;
        const { userAddress } = this.props;



        if (prevProps.userAddress.length !== userAddress.length) {
            console.log(this.state.address, "state house no")
            if (this.state.sfid.length !== 0) {

                this.loadAddresses();
            }

        }



    }

    InputHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.validateInputValues()
        this.setState({ [name]: value });
    }

    validateInputValues() {
        const { houseno, area, city, state, pincode, address_type } = this.state;
        console.log('xxx')
        if (houseno.length >= 1 && area.length >= 1 && city.length >= 1 && state.length >= 1 && pincode.length >= 1 && address_type.length >= 1) {
           console.log('yessss')
            this.setState({ validated: true })
        } else {
            if (this.state.validated) {
                this.setState({ validated: false })
            }
        }
    }

    clearstate() {
        this.setState({
            houseno: "",
            area: "",
            city: "",
            state: "",
            pincode: "",
        })
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

    handleAddressAdd = async () => {
        // add new address
        const { houseno, area, city, state, pincode, sfid, address_type } = this.state;
        let data = { "address": houseno, "address1": area, "state": state, "city": city, "pincode": pincode, "type": address_type, "user_sfid": sfid }

        this.props.dispatch(addressUpdate(data)).then((response) => {

            this.loadAddresses();
        })
        // this.clearstate();
        this.closeModal();
    }

    handleUpdateAddress = (user_id, addr_id) => {

        if (this.state.city_state_list.length == 0) {
            this.load_city_state();
        }


        this.setState({ isUpdating: true })
        const { userAddress } = this.props;
        let thisaddress = userAddress.filter((address) => {
            return address.id === addr_id;
        })

        Object.keys(thisaddress[0]).forEach((key) => {
            if (thisaddress[0][key] == null) {
                thisaddress[0][key] = ''
            }
        })

        let address = thisaddress[0].address__c;
        let houseno = '';
        let area = '';
        let city = '';
        let state = '';
        let pincode = '';
        let address_type = '';

        if (address != null) {
            houseno = address.substring(0, address.indexOf(','));
            area = address.substring(address.indexOf(',') + 1);
            city = thisaddress[0].city__c;
            state = thisaddress[0].state__c;
            pincode = thisaddress[0].pincode__c;
            address_type = thisaddress[0].address_type__c;
        }
        this.setState({ user_id: user_id })
        this.setState({ address_id: addr_id })
        this.setState({ houseno: houseno })
        this.setState({ area: area });
        this.setState({ city: city })
        this.setState({ state: state })
        this.setState({ pincode: pincode })
        this.setState({ address_type: address_type })

        if(state.length > 0 ){
            this.selectState(state)
        }

        


    }

    // componentDidUpdate(){
    //     if(this.state.city_list.length >0 && !this.state.selected_city){
    //         this.setState({city : this.state.city_name} )
    //     }
    // }

    handleRemoveAddress = (id) => {
        const { sfid } = this.state;
        let data = { "user_sfid": sfid, "address_id": id }

        this.props.dispatch(removeAddress(data)).then((response) => {

            this.loadAddresses();

        })
    }

    handleAddressUpdate = () => {
        // update or edit address
        const { profile , sfid} = this.props;
        const { houseno, area, city, state, pincode, user_id, address_id, address_type } = this.state;
        let data = { "address_id": address_id, "address": houseno, "address1": area, "state": state, "city": city, "pincode": pincode, "type": address_type, "sfid": sfid }

        this.props.dispatch(addressEdit(data)).then((response) => {

            this.loadAddresses();
            console.log(response);
        })
        // this.clearstate();
        this.closeModal();


    }

    handleAddresstype = (type) => {
        this.setState({ address_type: type })
        this.validateInputValues()
    }


    closeModal = () => {
        document.getElementById('modal-close').click()
        this.setState({ isUpdating: false })
    }

    handlePlacesChange = search_address => {
        this.setState({ search_address });
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
                var reHouse = `${house}${road ? "," + road : ''}${nagar ? "," + nagar : ""}`;
                var trimmed = reHouse.split(',').slice(1);
                this.setState({
                    search_address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    houseno: trimmed,
                    street: (road) ? road : '',
                    road: (nagar) ? nagar : '',
                    pincode: (pincode) ? pincode : ''
                })
            }).catch(error => console.error('Error', error));
    };



    handlenewAddr = () => {
        this.clearstate();

        if (this.state.city_state_list.length == 0) {
            this.load_city_state();
        }
    }

    load_city_state = () => {
        this.props.dispatch(load_city_state_list()).then((resp) => {
            this.setState({ city_state_list: resp.result })

        })
    }

    selectState=(state_name)=>{
        const {city_state_list} = this.state;
         let city_list = city_state_list.find((item)=>{
            return item.Name == state_name
        })
        console.log(city_list.city,"ssssssssss")

        this.setState({state : city_list.Name, city_list:city_list.city})
    }

    render() {
        const { sfid, history, isSearching, userId, user, username, isLoading, searchDet, favorite_count, dispatch, alladdresses, userAddress, profile } = this.props
        const { city_state_list,city_list } = this.state;
        //    console.log(this.props,"prrrrrrrrroooooooooo")
        return (
            <>
                <Helmet>
                    <title>Wish List </title>
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
                <div className="mt-4">
                    <div className="container">
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper pt-3'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li><a href="#">Setting</a></li>
                                        <li><a href="#">Manage Addresses</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-lg-3 mb-3">
                            <div className="manage_bck">
                                <a href="/setting"><span>Manage Addresses</span></a>
                            </div>
                            <div className='col-xl-9 col-lg-8'>

                                <div className="row">


                                    {userAddress && userAddress.map((address, index) => (
                                        <>
                                            <div className="col-6 mb-4 addrsBlock" key={index}>

                                                <div className="setting-card w-95 p-0">
                                                    <div className=" setting-card-inner">
                                                        <div className="d-flex pb-2 align-items-center" style={{ justifyContent: "space-between" }}>
                                                            {!profile ? <span>Delivery Address</span>: 
                                                                <span> {address.id == profile.profile.current_address_id__c ? "Current Address" : "Delivery Address" } </span>
                                                            }
                                                            <span className="badge-pill badge-primary home-tag" style={{ width: "auto" }}>{address && address.address_type__c ? address.address_type__c : 'Other'}</span>
                                                        </div>
                                                        <div className="d-flex" style={{ gap: "2em" }}>
                                                            <i className="fa fa-home" style={{ fontSize: "25px" }}></i>
                                                            <p>
                                                                {address.address__c + ', ' + address.city__c + ', ' + address.state__c + ', ' + address.pincode__c}
                                                                {/* {address.houseno + " " + address.area + " " + address.city + " " + address.state + " " + address.pincode} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex card_bottom " style={{ justifyContent: "space-around" }}>
                                                        <button data-toggle="modal" data-target="#addressmodal" className="edit_btn"
                                                            userprofileid={profile && profile.profile.id}
                                                            id={address.id}
                                                            onClick={() => this.handleUpdateAddress(profile ? profile.profile.id : this.state.user_id, address.id)}>Edit</button>
                                                        <button className="greyColor" onClick={() => this.handleRemoveAddress(address.id)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    )}





                                </div>


                            </div>




                            <div className='col-xl-3 col-lg-4 ' data-toggle="modal" data-target="#addressmodal" onClick={this.handlenewAddr}>
                                <div className="setting-card w-95 text-center plus-add justify-content-center" style={{ padding: "2rem" }}>
                                    <div style={{ fontSize: '4em' }}><i className="fa fa-plus" aria-hidden="true"></i></div>
                                    <button>Add Delivery Address</button>
                                </div>
                            </div>

                            {/* {!productFound && !productNotFound && (
                                <ContentLoader viewBox="0 0 380 70">
                                    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                                    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                </ContentLoader>
                            )} */}
                        </div>
                    </div>
                </div>


                <div className="modal fade delivery_popup" id="addressmodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content ">

                            <div className="modal-header">
                                <h4>Add Delivery Address</h4>

                                <button type="button" className="close"
                                    data-dismiss="modal"
                                    id={'modal-close'}
                                    aria-label="Close"
                                    onClick={() => this.setState({ isUpdating: false })}>
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                <div className="filter_accordion_wrap">

                                    <div className="content row container mr-0 ml-0">
                                        {/* <div className='top_search_box'>
                                            <input
                                                className='header-search-input'
                                                type="text"
                                                placeholder='Search for area and street name..'
                                                name="search"
                                                autoComplete="off"   
                                                style={{ backgroundColor: "white" }}
                                            />
                                            
                                            <button type="button"
                                                style={{ backgroundColor: "white" }}
                                                className='search_btn'>
                                                <img src={`${asset}images/icons/search_icon.png`} alt=""
                                                    className='img-fluid' />
                                            </button>
                                        </div> */}

                                        <div className='label'>
                                            {this.state.gmapsLoaded && (
                                                <PlacesAutocomplete
                                                    value={this.state.search_address ? this.state.search_address : ''}
                                                    onChange={this.handlePlacesChange}
                                                    onSelect={this.handleSelect}
                                                >
                                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                        <div className="form-group position-relative adrs_icon">
                                                            <input
                                                                {...getInputProps({
                                                                    placeholder: 'Search for area or street name...',
                                                                    className: 'location-search-input  mb-0',
                                                                })}
                                                            />
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
                                                                            key={'item' + index}
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
                                        </div>

                                        <div className="col-md-12 m-b-5 mt-3 d-flex justify-content-start mb-4 p-0" style={{ fontWeight: "400" }}>
                                            <span type="button" className={`ml-2 badge badge-pill text-white fs-6 addr_type ${this.state.address_type == 'home' ? 'badge-primary' : 'badge-secondary'}`} onClick={() => this.handleAddresstype("home")} >Home</span>
                                            <span type="button" className={`ml-2 badge badge-pill text-white fs-6 addr_type ${this.state.address_type == 'office' ? 'badge-primary' : 'badge-secondary'}`} onClick={() => this.handleAddresstype("office")} >Office</span>
                                            <span type="button" className={`ml-2 badge badge-pill text-white fs-6 addr_type ${this.state.address_type == 'other' ? 'badge-primary' : 'badge-secondary'}`} onClick={() => this.handleAddresstype("other")} >Other</span>

                                        </div>

                                        <div className="col-md-12 m-b-5 how-pos4-parent">
                                            <span className="has-float-label bigger">
                                                <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>


                                                    <input
                                                        autoComplete="off"
                                                        className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15" placeholder="House / Flat / Block No." name="houseno" id="houseno" onChange={(e) => this.InputHandler(e)}
                                                        value={this.state.houseno} maxLength="6" required="" />


                                                </div>
                                            </span>
                                        </div>


                                        <div className="col-md-12 m-b-5 how-pos4-parent">
                                            <span className="has-float-label bigger">
                                                <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>

                                                    <input
                                                        autoComplete="off" className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15" type="text" name="area" id="area" placeholder="Area / Road" value={this.state.area} required="" onChange={(e) => this.InputHandler(e)} />

                                                </div>
                                            </span>
                                        </div>



                                        <div className="col-md-6 m-b-5 how-pos4-parent">
                                            <span className="has-float-label bigger">
                                                <div className="input-group bor8 show_hide_password1 " style={{ flexWrap: 'initial' }}>
                                                    <select className="form-select" id="selectstate"
                                                        value={this.state.state ? this.state.state : ''}
                                                        onChange={(e)=>{
                                                            this.selectState(e.target.value);
                                                            this.validateInputValues()
                                                        }}
                                                    >
                                                        <option value="">State</option>
                                                        {city_state_list && city_state_list.length > 0 &&
                                                            city_state_list.map((item, index) => (
                                                                <option value={item.Name}  selected={this.state.state == item.name} >{item.Name}</option>
                                                            ))
                                                        }
                                                    </select>

                                                    {/* <input autoComplete="off" className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15 " type="text" name="state" placeholder="State" required="" value={this.state.state} onChange={(e) => this.InputHandler(e)} /> */}

                                                </div>
                                            </span>
                                        </div>


                                        <div className="col-md-6 m-b-5 how-pos4-parent">
                                            <span className="has-float-label bigger">
                                                <div className="input-group bor8 show_hide_password1 " style={{ flexWrap: 'initial' }}>

                                                    {/* <input autoComplete="off" className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15" type="text" name="city" placeholder="City" required="" value={this.state.city} onChange={(e) => this.InputHandler(e)}  /> */}
                                                    {/* <i class="fa fa-chevron-down" aria-hidden="true"></i> */}
                                                    <select className="form-select" id="selectcity"
                                                    value={this.state.city ? this.state.city : ''}
                                                        onChange={(e)=> this.setState({city : e.target.value})}
                                                        >
                                                        <option value="">City</option>
                                                        {city_list && city_list.length > 0 &&
                                                            city_list.map((item, index) => (
                                                                <option value={item.name} selected={this.state.city == item.name}   >{item.Name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </span>
                                        </div>

                                        <div className="col-md-12 m-b-5 how-pos4-parent">
                                            <span className="has-float-label bigger">
                                                <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>

                                                    <input
                                                        autoComplete="off"
                                                        type="text"
                                                        className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15" name="pincode" placeholder="Pincode" maxlength="10" value={this.state.pincode} required="" onChange={(e) => this.InputHandler(e)} />

                                                </div>
                                            </span>
                                        </div>


                                    </div>



                                </div>
                                <div className='text-right mt-4 col-sm-12 pl-4 pr-4'>
                                    {!this.state.isUpdating ?
                                        <button
                                            // disabled={!this.state.validated}
                                            disabled={(this.state.houseno && this.state.pincode && this.state.state && this.state.city && this.state.area && this.state.address_type) ? false : true  }
                                            className={(this.state.houseno && this.state.pincode && this.state.state && this.state.city && this.state.area && this.state.address_type) ? "apply-btn ml-3" : "apply-btn-disabled disabled w-100  grey_btnN"}
                                            onClick={() => {
                                                this.handleAddressAdd()

                                            }
                                            }>Save</button>
                                        :
                                        <button
                                        disabled={(this.state.houseno && this.state.pincode && this.state.state && this.state.city && this.state.area && this.state.address_type) ? false : true  }                                            className={(this.state.validated) ? "apply-btn ml-3" : "apply-btn-disabled disabled ml-3"}
                                            onClick={() => {
                                                this.handleAddressUpdate()

                                            }}
                                        >Update</button>}
                                </div>
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
    const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
    const { profile, recentProd, userAddress, userId } = state.user;
    return {
        favorite_list,
        favorite_count,
        searchHistory,
        isSearching,
        isLoading,
        searchDet,
        recentProd,
        profile,
        username,
        user,
        sfid,
        userAddress,
        userId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        //   increment: () => dispatch({ type: 'INCREMENT' }),

    }
}

export default connect(mapStateToProps, null)(UserAddress);
