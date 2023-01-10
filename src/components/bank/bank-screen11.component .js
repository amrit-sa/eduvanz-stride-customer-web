import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets"
import { getUserProduct, getPlanById } from "../../actions/payment";
import { getProductById, sendUserOtp, getAddress, addressUpdate, updateUserRent, updateAddressById, getAccountProfile } from "../../actions/user";
import { verifyUserOtp, updatePreviousPath } from "../../actions/auth";
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

class BankScreen11 extends Component {

    constructor() {
        super()
        this.state = {
            logId: null,
            selectedAddress: null,
            editId: null,
            mobile: null,
            address: '',
            house: '',
            street: '',
            road: '',
            city: '',
            area: '',
            state: '',
            pincode: '',
            viewResend: false,
            statesData: ["Tamil Nadu", "Delhi", "Asam"],
            citiesData: ['Chennai'],
            onBording: 0,
            zoom: 15,
            height: 400,
            timer: '00:18',
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            errorMsg: null,
            downpayment: null,
            gmapsLoaded: false,
            bank: null,
            mapPosition: {
                lat: 13.0827,
                lng: 80.2707,
            },
            markerPosition: {
                lat: 13.0827,
                lng: 80.2707,
            },
            isMapEnable: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleOtpChange = this.handleOtpChange.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.textInput1 = React.createRef();
        this.textInput2 = React.createRef();
        this.textInput3 = React.createRef();
        this.textInput4 = React.createRef();
    }

    initMap = () => {
        this.setState({
            gmapsLoaded: true,
        })
    }

    async componentDidMount() {
        const { history, user, sfid, dispatch, selectedplan, selectedAddress, productId, plan_id, product_id } = this.props
        if(!sfid)
        {
            const path = window.location.pathname;
            dispatch(updatePreviousPath(path));
            history.push("/login");
        }
        let data = {
            user_sfid: sfid,
        }
        let accData = {
            user_sfid: sfid,
        }
        window.scrollTo(0, 0);
        await dispatch(getUserProduct(data));
        await dispatch(getAddress(accData));
        let obj = {
            plan_id: plan_id,
            user_sfid: sfid
        }
        await dispatch(getPlanById(obj)).then((response) => {
            if (response.status === "success") {
                let getData = response.data;
                const bank = response && response.bank?response.bank:null;
                this.setState({ bank: bank, downpayment: getData.down_payment__c ? getData.down_payment__c : 0 })
            }
        });
        let userDet = {
            user_sfid: sfid
        }
        await dispatch(getAccountProfile(userDet)).then((response) => {
            if (response.status === "success") {
                this.setState({ mobile: response.accountDet.phone });
            }
        });
        let proObj = {
            sfid: product_id,
        }
        this.props.dispatch(getProductById(proObj));
        window.initMap = this.initMap
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

        $('.resend-btn').on('click', function () {
            $(this).parent('.send-otp-fillup-section').hide();
            $('.send-otp-section').fadeIn();
        })

        $('.detectLocation').on('click', function () {
            $('#allAddress, #addressForm').hide();
            $('#locationMap').show();
        })

        $('.enterManually').on('click', function () {
            $('#allAddress, #locationMap').hide();
            $('#addressForm').show();

        })

        $('.addressForm input').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
        $('.select-style select').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
    }

    inputfocus = (elmnt, getvalue) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {
                console.log("next", next);
                this.reverseFocueInputS(next);
            }
        }
        else {
            const pattern = /^[0-9]$/;
            if (pattern.test(elmnt.target.value)) {
                const next = elmnt.target.tabIndex;
                if (next < 4) {
                    console.log("else next", next);
                    this.focueInputS(next);
                }
            } else {
                this.setState({ [getvalue]: '' });
                document.getElementById(getvalue).value = '';
            }
        }

    }

    reverseFocueInputS = (next) => {
        if (next === 2) {
            this.textInput3.current.focus();
        } else if (next === 1) {
            this.textInput2.current.focus();
        } else if (next === 0) {
            this.textInput1.current.focus();
        }
    }

    focueInputS = (next) => {
        console.log("next----------------->", next);
        if (next === 1) {
            this.textInput2.current.focus();
        } else if (next === 2) {
            this.textInput3.current.focus();
        } else if (next === 3) {
            this.textInput4.current.focus();
        }
    }

    startTimer() {
        var presentTime = this.state.timer;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = this.checkSecond((timeArray[1] - 1));
        if (s == 59) { m = m - 1 }
        if (m === '00' && s === '00') {
            this.setState({ viewResend: true });
        }
        if (m < 0) {
            return
        }
        this.setState({ timer: m + ":" + s });
        setTimeout(this.startTimer, 1000);
    }

    checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec };
        if (sec < 0) { sec = "59" };
        return sec;
    }

    refereshAddress = async () => {
        console.log("Referesh Called");
        const { user, dispatch } = this.props
        let data = {
            id: user,
        }
        await dispatch(getAddress(data));
    }

    handleUpdateAddressId = () => {
        const { dispatch, user } = this.props;
        let data = {
            address_id: this.state.selectedAddress,
            id: user
        }
        dispatch(updateUserRent(data)).then((response) => {
            if (response === "success") {
                this.refereshAddress();
                $("#close-addess").trigger("click");
            }
        });
    }

    handlePlacesChange = address => {
        this.setState({ address });
    };


    handleEditAddress = (getData) => {
        let cityData = this.state.citiesData;
        let stateData = this.state.statesData;
        if (!cityData.includes(getData.city__c)) {
            cityData.push(getData.city__c);
            this.setState({ citiesData: cityData });
        }
        if (!stateData.includes(getData.state__c)) {
            stateData.push(getData.state__c);
            this.setState({ statesData: stateData });
        }
        this.setState({
            editId: getData.id,
            address: getData.address__c,
            city: getData.city__c,
            state: getData.state__c,
            pincode: getData.pincode__c
        });
    }

    handleAddresSelect = async () => {
        const { dispatch, user } = this.props;
        let data = {
            address: `${this.state.house ? this.state.house : '0'}${this.state.street ? "," + this.state.street : ''}${this.state.road ? "," + this.state.road : ''}`,
            address1: `${this.state.area ? this.state.area : ''}`,
            state: this.state.state,
            city: this.state.city,
            user_sfid : localStorage.getItem('sfid'),
            pincode: this.state.pincode,
            id: user
        }
        dispatch(addressUpdate(data)).then(async (response) => {
            if (response === "success") {
                await this.refereshAddress();
                $("#close-addess").trigger("click");
            }
        });
    }

    handleOtpChange(value1, event) {
        this.setState({ [value1]: event.target.value, errorMsg: '' });
        if (value1 === "otp4" && event.target.value) {
            this.handleSubmitotp(event.target.value);
        }

    }

    handleSubmitotp = (otp4) => {
        const { otp1, otp2, otp3 } = this.state
        const { history, dispatch, plan_id, product_id } = this.props;
        if (otp1 && otp2 && otp3) {
            const givenOtp = parseInt(this.state.otp1 + this.state.otp2 + this.state.otp3 + otp4);
            let data = {
                otp: givenOtp,
                logId: this.state.logId
            }
            dispatch(verifyUserOtp(data))
                .then((response) => {
                    if (response.status === 'success') {
                        this.setState({
                            otp1: '',
                            otp2: '',
                            otp3: '',
                            otp4: ''
                        });
                        console.log("downpayment", this.state.downpayment);
                        if (this.state.downpayment) {
                            history.push(`/ed_payment/${product_id}/${plan_id}`);
                        } else {
                            history.push(`/payment_success`);
                        }

                    } else {
                        this.setState({ errorMsg: true });
                    }
                });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

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
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    house: trimmed,
                    street: (road) ? road : '',
                    road: (nagar) ? nagar : '',
                    pincode: (pincode) ? pincode : ''
                })
            }).catch(error => console.error('Error', error));
    };

    detectMyAddress = () => {
        this.setState({ isMapEnable: true });
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
    }

    hendleManualAddress = async () => {
        const { history, dispatch, user, selectedAddress } = this.props;
        const { editId } = this.state
        let data = {
            address_id: editId,
            user_sfid : localStorage.getItem('sfid'),
            type: "Manual",
            address: `${this.state.house ? this.state.house : '0'}${this.state.street ? "," + this.state.street : ''}${this.state.road ? "," + this.state.road : ''}`,
            address1: `${this.state.area ? this.state.area : ''}`,
            state: this.state.state,
            city: this.state.city,
            pincode: this.state.pincode,
            id: user
        }
        if (editId > 0) {
            dispatch(updateAddressById(data)).then(async (response) => {
                if (response === "success") {
                    await this.refereshAddress();
                    $("#close-addess").trigger("click");
                }
            });
        } else {
            dispatch(addressUpdate(data)).then(async (response) => {
                if (response === "success") {
                    await this.refereshAddress();
                    $("#close-addess").trigger("click");
                }
            });
        }
    }

    onMarkerDragEnd = (event) => {
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

    handleBack = () => {
        const { history, product_id } = this.props
        history.push('/edplans?product=' + product_id);
    }

    handleAddressSelect = (id) => {
        this.setState({ selectedAddress: id });
    }

    handleAddress = () => {
        this.setState({
            editId: null,
            address: null,
            city: null,
            state: null,
            pincode: null
        });
        $('#locationMap, #addressForm').hide();
        $('#allAddress').show();
    }

    replaceMiddle(string, n) {
        let str;
        if (n > 0) {
            str = string.replace(/^(\+?[\d]{2})\d+(\d{4})$/g, "$1****$2");
        } else {
            str = string.replace(/^(\+?[\d]{0})\d+(\d{4})$/g, "$1XXXXXX$2");
        }
        return str
    }

    replaceCardMiddle(string) {
        return string.toString().replace(/^(\+?[\d]{0})\d+(\d{4})$/g,"*******$2");
    }

    handleSendOtp = () => {
        const { user, dispatch } = this.props
        let data = {
            id: parseInt(user)
        }
        $('.send-otp-section').hide();
        $('.send-otp-fillup-section').fadeIn();
        this.startTimer()
        dispatch(sendUserOtp(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ logId: response.logId });
                $('.send-otp-section').hide();
                $('.send-otp-fillup-section').fadeIn();
            }
        });

    }

    handleResendSendOtp = () => {
        const { user, dispatch } = this.props
        let data = {
            id: parseInt(user)
        }
        this.startTimer()
        dispatch(sendUserOtp(data)).then((response) => {
            if (response.status === "success") {
                this.setState({ logId: response.logId });
                $('.send-otp-section').hide();
                $('.send-otp-fillup-section').fadeIn();
            }
        });

    }


    render() {
        console.log('this.state.mobile',this.state.mobile)
        const { user, product, planData, userAddress, currentAddress, isLoading } = this.props
        const { bank, statesData, citiesData } = this.state
        const proImages = product && product.image_url__c;
        let strMobile = '';
        let hMobile = '';
        if (this.state.mobile) {
            strMobile = this.replaceMiddle(this.state.mobile, 2);
            hMobile = this.replaceMiddle(this.state.mobile, 0);
        }
        let accNo = '';
        if(bank && bank.account_number__c)
        {
            accNo = this.replaceCardMiddle(bank.account_number__c);
        }
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
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
                    <title>Plan Details</title>
                </Helmet>
                <Header
                    user={user}
                />
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages bank_screen">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='d-flex align-items-center'>
                                    <button type='button' onClick={() => this.props.history.goBack()} className='back-btn rounded-circle mr-3 mr-lg-4'>
                                        back
                                    </button>
                                    <h2 className="back-btn-text m-0">Final steps before checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='mt-4'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='p-l'>
                                    {/* <div className='d-flex justify-content-center'>
                                    <span className='d-inline-block pb-2'><img src={asset+"images/icons/apple.png"} alt="apple" className='img-fluid'/></span>
                                </div> */}
                                    <div className='min-height'>
                                        <div className='row align-items-center mt-3'>
                                            <div className='col-md-6'>
                                                <div className='product-thumb d-flex justify-content-center'><img src={proImages} className='img-fluid' alt="mac-book" /></div>
                                            </div>
                                            <div className='col-md-6 product-details'>
                                                <h3>{product.name ? product.name : '13‑inch MacBook Pro - Silver'}</h3>
                                                <p className='mb-2'>Order value: <i className='rupee'>`</i>{product.mrp__c ? product.mrp__c.toLocaleString('en-IN') : ''}</p>
                                                <p className='mb-2'>Quantity: 01</p>
                                                <p className='mb-2'>Product ID: {product.sfid ? product.sfid : '345678'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border-line'></div>
                                    <div className='d-flex p-i-b'>
                                        <div className='p-i-b-l d-flex align-items-start'>
                                            <span className='l_i d-block mr-4'>
                                                <img src={asset+"images/icons/icon_location.png"} className='img-fluid' alt="icon-location" />
                                            </span>
                                            <div>
                                                <h4>Delivered to</h4>
                                                <p className='m-0'>{currentAddress ? `${currentAddress.address__c}${currentAddress.city__c ? ", " + currentAddress.city__c : ""}${currentAddress.state__c ? ", " + currentAddress.state__c : ""}${currentAddress.pincode__c ? ", " + currentAddress.pincode__c : ""}` : 'Add Address'}</p>
                                            </div>

                                        </div>
                                        <div className='p-i-b-r'>
                                            <button
                                                type='button'
                                                onClick={this.handleAddress}
                                                className='edit-btn ml-3'
                                                data-toggle="modal"
                                                data-target="#editAddress"
                                            >Edit</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='p-r'>
                                    <div className='p-o_head d-flex justify-content-between'>
                                        <div className='p-o_head_l'>
                                            <h3 className='mb-1'>{planData.net_tenure__c} {planData.frequency_of_payments__c}</h3>
                                            <p className='m-0'>Tenure</p>
                                        </div>
                                        <div className='p-o_head_r'>
                                            <h3 className='mb-1'> {planData.currencyisocode === 'INR' ? (<i className='rupee'></i>) : '$'}{planData.disbursal_amount__c ? planData.disbursal_amount__c.toLocaleString('en-IN') : ''}</h3>
                                            <p className='m-0'>Monthly</p>
                                        </div>
                                    </div>
                                    <div className='min-height'>


                                        <div className='d-flex row_emi'>
                                            <div className='emi_l'>
                                                <p className='mb-1'>Due Today <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" className='img-fluid' /></span></p>
                                                <h3><i className='rupee'></i>{planData.emi_amount__c ? planData.emi_amount__c.toLocaleString('en-IN') : ''}</h3>
                                            </div>
                                            <div className='emi_r'>
                                                <p className='mb-1'>Tenure</p>
                                                <h3>{planData.net_tenure__c} {planData.frequency_of_payments__c}</h3>
                                            </div>
                                        </div>

                                        <div className='d-flex row_emi'>
                                            <div className='emi_l'>
                                                <p className='mb-1'>Interest (APR)</p>
                                                <h3>{planData.fixed_rate__c}% p.a</h3>
                                            </div>
                                            <div className='emi_r'>
                                                <p className='mb-1'>EMI account</p>
                                                {accNo && (
                                                <h3 className='d-flex align-items-center justify-content-end'>{accNo}
                                                     {bank && bank.bank_icon && (
                                                    <img
                                                        src={bank.bank_icon}
                                                        className='img-fluid'
                                                        alt="apple"
                                                        style={{ "width": '18px' }}
                                                    />
                                                     )}
                                                </h3>
                                                )}
                                            </div>
                                        </div>

                                        <div className='d-flex row_emi'>
                                            <div className='emi_l'>
                                                <p className='mb-1'>First EMI due date</p>
                                                <h3>{planData && planData.first_emi_date__c?planData.first_emi_date__c:''}</h3>
                                            </div>
                                            <div className='emi_r'>
                                                <p className='mb-1'>Last EMI due date</p>
                                                <h3>{planData && planData.last_emi_date__c?planData.last_emi_date__c:''}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border-line-dotted'></div>

                                    <div className='d-flex justify-content-center align-items-center pt-3'>
                                        <p className='poweredBy m-0 mr-2'>Powered by</p>
                                        <img src={asset+"images/fullerton_india.png"} className='img-fluid' alt="fullerton_india" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 text-center'>
                                <div className='send-otp-section'>
                                    <p className='otp-txt mt-4 mb-4 font-weight-bold'><img src={asset+"images/icons/icon-ind.png"} alt="icon-ind2" className='img-fluid' /> You will receive OTP on +91 {strMobile}</p>
                                    <button
                                        type='submit'
                                        className='d-inline-block continue-btn'
                                        onClick={this.handleSendOtp}
                                    >
                                        Continue
                                    </button>
                                </div>

                                <div className='send-otp-fillup-section text-center mt-5'>
                                    <h4 className='e_otp_txt'>Enter OTP sent to {hMobile}</h4>
                                    <div className='otp-fill-boxes d-flex justify-content-center'>

                                        <input
                                            ref={this.textInput1}
                                            name="otp1"
                                            id="otp1"
                                            type="text"
                                            autoComplete="off"
                                            value={this.state.otp1}
                                            maxLength={1}
                                            onChange={e => this.handleOtpChange("otp1", e)}
                                            tabIndex="1"
                                            placeholder={0}
                                            onKeyUp={e => this.inputfocus(e, "otp1")}
                                            className={`${this.state.errorMsg && this.state.otp1 ? "error" : ""}`}
                                        />
                                        <input
                                            ref={this.textInput2}
                                            type="text"
                                            maxLength={1}
                                            name="otp2"
                                            id="otp2"
                                            autoComplete="off"
                                            value={this.state.otp2}
                                            onChange={e => this.handleOtpChange("otp2", e)}
                                            tabIndex="2"
                                            placeholder={0}
                                            onKeyUp={e => this.inputfocus(e, "otp2")}
                                            className={`${this.state.errorMsg && this.state.otp2 ? "error" : ""}`}
                                        />
                                        <input
                                            ref={this.textInput3}
                                            type="text"
                                            maxLength={1}
                                            name="otp3"
                                            id="otp3"
                                            autoComplete="off"
                                            value={this.state.otp3}
                                            onChange={e => this.handleOtpChange("otp3", e)}
                                            tabIndex="3"
                                            placeholder={0}
                                            onKeyUp={e => this.inputfocus(e, "otp3")}
                                            className={`${this.state.errorMsg && this.state.otp3 ? "error" : ""}`}
                                        />
                                        <input
                                            ref={this.textInput4}
                                            type="text"
                                            maxLength={1}
                                            name="otp4"
                                            id="otp4"
                                            autoComplete="off"
                                            value={this.state.otp4}
                                            onChange={e => this.handleOtpChange("otp4", e)}
                                            tabIndex="4"
                                            placeholder={0}
                                            onKeyUp={e => this.inputfocus(e, "otp4")}
                                            className={`${this.state.errorMsg && this.state.otp4 ? "error" : ""}`}
                                        />
                                    </div>
                                    {(this.state.otp1 || this.state.otp2 || this.state.otp3 || this.state.otp4) && this.state.errorMsg ? (
                                        <span className='d-inline-block invalid_otp'>Please enter valid OTP</span>
                                    ) : ''}
                                    {!this.state.viewResend && (
                                        <p className='mb-4'><img src={asset+"images/icons/icon-ind.png"} alt="icon-ind2" className='img-fluid' /> Verification code valid for next {' ' + this.state.timer} min</p>
                                    )}
                                    {this.state.viewResend && (
                                        <button type='button' onClick={this.handleResendSendOtp} className='d-inline-block resend-btn'>
                                            Resend OTP
                                        </button>
                                    )}
                                </div>

                                <p className='arg-txt mt-4'>I have reviewed and agree to the <span>Truth in Lending Disclosure</span> and <span>Loan Agreement</span> provided by Eduvanz and have received the Credit <span>Score Disclosure</span>.</p>
                            </div>
                        </div>
                        <div className='border-line mt-4 mb-4'></div>
                        <div className='row'>
                            <div className='col-sm-12 t-c'>
                                <h4>Terms &amp; Conditions</h4>
                                <p>Price may also include trade-in credit. Pricing with a trade-in is after trade-in of a specific device. Trade-in values vary based on the condition, year, and configuration of your trade-in device. You must be at least 18 years old. Additional terms from Apple or Apple’s trade-in partner may apply.
                                </p>
                                <p>Representative example: Based on purchase of ₹17430. Total amount payable ₹18462 paid over 9 months as 9 monthly payments of ₹2051 at an interest rate of 14% paper annum. Total interest paid to bank: ₹1032.</p>
                                <p>
                                    §No-Cost EMI available for purchases made using qualifying credit cards on 12-month tenure only. Offer available on qualifying purchases made after 1:30 PM IST on 6 December 2021 and before 11:59 PM IST on 19 January 2022. Minimum order spend applies as per your credit card’s issuing bank threshold. Offer cannot be combined with Apple Store for Education or Corporate Employee Purchase Plan pricing. Credit card eligibility is subject to terms and conditions between you and your credit card issuing bank. Offer may be revised or withdrawn at any time without any prior notice. Offer valid for limited period. Terms &amp; Conditions apply.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="modal fade" id="editAddress" tabIndex="-1" role="dialog" aria-labelledby="editAddressTitle" aria-hidden="true">
                            <div className="modal-dialog editAddressModal modal-dialog-centered modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Select Delivery Address</h5>
                                        <button id="close-addess" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>

                                    <div className="modal-body px-0 pt-0 pb-4">
                                        <div id="allAddress" className='px-lg-5 px-4 pt-4'>
                                            <h4 className='d_add_title text-center mb-4'>We detected the following addresses, please select your current residential status.</h4>
                                            <div className='addressScrollWrapper'>
                                                <div className='addressScroll'>
                                                    <div className='row'>
                                                        {userAddress && userAddress !== undefined && userAddress.length > 0 &&
                                                            userAddress.map((item, index) => (
                                                                <div className='col-lg-6' key={`address-${index}`}>
                                                                    <div style={{ cursor: 'pointer' }} onClick={() => this.handleAddressSelect(item.id)} className={`d-flex p-i-b mb-4 shadow-light rounded-lg p-3 ${this.state.selectedAddress === item.id ? "selected_box" : ""}`}>
                                                                        <div className='p-i-b-l d-flex align-items-start'>
                                                                            <span className='l_i d-block mr-2' style={{ "flex": "0 0 16px" }}>
                                                                                <img src={asset+"images/icons/icon_location.png"} className='img-fluid' alt="icon-location" />
                                                                            </span>
                                                                            <div>
                                                                                <p className='m-0 fz12'>{`${item.address__c}${item.city__c ? ", " + item.city__c : ""}${item.state__c ? ", " + item.state__c : ""}${item.pincode__c ? ", " + item.pincode__c : ""}`}</p>
                                                                                <span className='report_txt'><img src={asset+"images/icons/icon_Search.svg"} className='img-fluid' alt="icon_Search" /> Found on your Credit Report</span>
                                                                            </div>

                                                                        </div>
                                                                        <div className='p-i-b-r'>
                                                                            <button type='button' onClick={() => this.handleEditAddress(item)} className='ml-3 enterManually'><img src={asset+"images/icons/icon_Edit.png"} className='img-fluid' alt="icon_Search" /></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <span className='scroll-down d-flex rounded-circle justify-content-center align-items-center'>
                                                    <img src={asset+"images/icons/icon_da.png"} alt="icon-ind2" className='img-fluid' />
                                                </span>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-12 d-flex justify-content-center'>
                                                    <button
                                                        onClick={this.handleUpdateAddressId}
                                                        type='button'
                                                        disabled={this.state.selectedAddress ? false : true}
                                                        className={`d-inline-block ${this.state.selectedAddress ? "continue-btn" : "btn-button-get"}`} data-dismiss="modal">
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-12 d-flex justify-content-center'>
                                                    <div className='d-flex justify-content-between last-row mt-3'>
                                                        <button type='button' onClick={this.detectMyAddress} className='link detectLocation'>Detect my location</button>
                                                        <div className='line'></div>
                                                        <button className='link enterManually'>Enter Manually</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="locationMap" >
                                            <div className='detected-map' style={{ paddingTop: '0px' }}>
                                                {this.state.isMapEnable ? (
                                                    <MapWithAMarker
                                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                                        loadingElement={<div style={{ height: `100%` }} />}
                                                        containerElement={<div style={{ height: `400px` }} />}
                                                        mapElement={<div style={{ height: `80%` }} />}
                                                    />
                                                ) : ''
                                                }
                                            </div>
                                            <div className='px-lg-4 px-4 mt-4'>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <h5 className='fz16'>Select your location</h5>
                                                        {this.state.address ? (
                                                            <div className='d-flex align-items-start '>
                                                                <div className='mr-2'><img src={asset+"images/icons/icon_Maps.png"} alt="icon_Maps" className='img-fluid' /></div>
                                                                <div>
                                                                    <h4 className='total-loan-amount'> {this.state.city} </h4>
                                                                    <p className='m-0 poweredBy' style={{ 'color': '#000' }}>{this.state.address}</p>
                                                                </div>
                                                            </div>
                                                        ) : ''
                                                        }
                                                    </div>
                                                    <div className='col-lg-6 d-flex justify-content-lg-end justify-content-center mt-lg-0 mt-3'>
                                                        <div className='d-flex flex-column align-items-lg-end align-items-center'>
                                                            <button type='button' className='link mb-3'>Change</button>
                                                            <button type='button' onClick={this.handleAddresSelect} disabled={this.state.address ? false : true} className={`${this.state.address ? "continue-btn" : "btn-button-get"} md`}>Confirm</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="addressForm" >
                                            <div className='addressForm mt-4'>
                                                <div className='label'>
                                                    {this.state.gmapsLoaded && (
                                                        <PlacesAutocomplete
                                                            value={this.state.address ? this.state.address : ''}
                                                            onChange={this.handlePlacesChange}
                                                            onSelect={this.handleSelect}
                                                        >
                                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                <div className="form-group position-relative">
                                                                    <input
                                                                        {...getInputProps({
                                                                            placeholder: 'Search Area/Road ...',
                                                                            className: 'location-search-input',
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
                                                <div className='label'>
                                                    <span>House / Flat / Block No.</span>
                                                    <input type="text" value={this.state.house ? this.state.house : ''} placeholder='' id="house" name="house" onChange={this.handleChange} />
                                                </div>
                                                <div className='select-style'>
                                                    <span>City</span>
                                                    <select name="city" value={this.state.city ? this.state.city : ''} onChange={this.handleChange}>
                                                        <option value="">&nbsp;</option>
                                                        {
                                                            citiesData && citiesData.length > 0 && citiesData.map((item, index) => (
                                                                <option key={`city-${index}`} value={item} >{item}</option>
                                                            ))
                                                        }

                                                    </select> 
                                                </div>
                                                <div className='select-style'>
                                                    <span>State</span>
                                                    <select name="state" value={this.state.state ? this.state.state : ''} onChange={this.handleChange}>
                                                        <option value="">&nbsp;</option>
                                                        {
                                                            statesData && statesData.length > 0 && statesData.map((item, index) => (
                                                                <option key={`state-${index}`} value={item} >{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className='label'>
                                                    <span>Pincode</span>
                                                    <input type="text" onChange={this.handleChange} value={this.state.pincode ? this.state.pincode : ''} maxLength={"6"} id="pincode" name="pincode" placeholder='' /> 
                                                </div>
                                                <div className='text-center'>
                                                    <button
                                                        type='button'
                                                        onClick={this.hendleManualAddress}
                                                        disabled={this.state.address && this.state.house && this.state.city && this.state.state && this.state.pincode ? false : true}
                                                        className='continue-btn'
                                                    >Continue</button>
                                                </div>
                                            </div>
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
    const { userAddress, currentAddress, product, productId } = state.user;
    const { salesForceToken, user, isLoading, sfid } = state.auth;
    const { selectedplan, planData } = state.payment;
    return {
        salesForceToken,
        currentAddress,
        selectedplan,
        userAddress,
        user,
        sfid,
        productId,
        product,
        planData,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen11)