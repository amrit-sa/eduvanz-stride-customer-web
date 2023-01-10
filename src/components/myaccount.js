import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import $ from 'jquery'
import { login, clearAuthMessage, updateMobile, checkOtp } from "../actions/auth";


import { getAccountProfile, getProfileById, Update_mobile, Update_email, sendOtp, sendEmailOtp } from "../actions/user";


class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sfid: "",
            modal: 0,
            profile: {},
            smobile: "",
            validated: false,

            mobile: "",
            loading: false,
            passwordType: 'password',
            passwordHide: true,
            isValid: false,

            mpinsend: false,
            otpsend: false,

            loading: false,
            timerOn: true,
            isSubmit: '',
            timer: '00:18',
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            viewResend: false,

            mobile_log: '',
            email_log: '',
            isReady: false,
            emailotpSend: false,
            successmsg: false,
            errorMsg: false,

            inputEmail: '',
            isEmailValid: "pending",
            emailvalidMsg: "",

            isMobileUpdating: false,
            isEmailUpdating: false,
            showResend:false
        };
    }


    clearState =() =>{
        this.setState({
            sfid: "",
            modal: 0,
            profile: {},
            smobile: "",
            validated: false,

            mobile: "",
            loading: false,
            passwordType: 'password',
            passwordHide: true,
            isValid: false,

            mpinsend: false,
            otpsend: false,

            loading: false,
            timerOn: true,
            isSubmit: '',
            timer: '00:18',
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            viewResend: false,

            mobile_log: '',
            email_log: '',
            isReady: false,
            emailotpSend: false,
            successmsg: false,
            errorMsg: false,

            inputEmail: '',
            isEmailValid: "pending",
            emailvalidMsg: "",

            isMobileUpdating: false,
            isEmailUpdating: false
        })
    }

    componentDidMount() {

        if (Object.keys(this.state.profile).length == 0) {
            const { sfid, userId } = this.props;
            let obj = {
                "user_sfid": sfid
            }
            this.props.dispatch(getProfileById(obj)).then((response) => {

                this.setState({ profile: response });
                console.log(response)
            });
        }


    }

    modalClose=()=>{
        window.$('#emailOtp').modal('hide');
        this.clearState();
    }

    handleMobile = (e) => {
        const reg = /^[0]?[6789]\d{9}$/;
        var pattern = new RegExp(/^[0-9\b]+$/);
        this.props.dispatch(clearAuthMessage());
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                this.setState({ isValid: false, errorMsg: "Please enter only number.", mobile: "" });
                document.getElementById('mobile').value = "";
            } else if (e.target.value.length === 10) {
                if (reg.test(e.target.value)) {
                    this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
                } else {
                    this.setState({ isValid: false, errorMsg: "Please enter valid mobile number.", mobile: e.target.value });
                }
            } else {
                this.setState({ isValid: true, errorMsg: "", mobile: e.target.value });
            }
        } else {
            this.setState({ isValid: false, errorMsg: "", mobile: e.target.value });
        }
    }

    handleSubmit = (event) => {
        const { dispatch, history } = this.props;
        this.setState({ isValid: false });
        this.setState({ errorMsg: "" });
        this.setState({ successmsg: "" });
        event.preventDefault();
        // this.props.dispatch(clearAuthMessage());
        if (this.state.mobile !== '') {


            
            let data = {
                mobile_no: this.state.mobile, user_sfid: this.props.sfid
            }
            
            this.props.dispatch(sendOtp(data)).then((response) => {
                console.log(response, 'mobile otp send resposnse')
                this.setState({ email_log: response.email_log })
                this.setState({ mobile_log: response.mobile_log })
                this.setState({ isMobileUpdating: true })
                this.setState({ isEmailUpdating: false })
                this.setState({ otpsend: true })
            })

            //   localStorage.setItem('sec_mobile', this.state.mobile);
            // dispatch(updateMobile(this.state.mobile));   // for updating current mobile number
            // dispatch(login(data))
            //     .then((reponse) => {
            //         if (this.props.verificationType === 'otp') {
            //             this.setState({ otpsend: true })

            //             // history.push("/edotp");
            //         } else if (this.props.verificationType === 'mPin') {
            //             this.setState({ mpinsend: true })

            //             // history.push("/edmpin");
            //         }
            //     })
            //     .catch(() => {
            //         this.setState({
            //             loading: false
            //         });
            //     });
        } else {
            this.setState({ isValid: false });
            this.setState({ errorMsg: "Please enter valid mobile number." });
        }
    }


    handleClear = () => {
        this.setState({ isValid: false, mobile: '', errorMsg: "", successmsg: '' });
        document.getElementById("mobile").value = "";
        this.props.dispatch(clearAuthMessage());
    }

    InputHandler(e) {
        // let name = e.target.name;
        let value = e.target.value;
        this.setState({ smobile: value });
        if (this.state.smobile.length >= 9) {
            this.setState({ validated: true });
        } else {
            this.setState({ validated: false });
        }
    }




    handleChange(value1, event) {
        this.setState({ [value1]: event.target.value });
        // const { otp1 ,otp2,otp3,otp4} = this.state;
        // if( otp1.length === 1 && otp2.length ===1 &&  otp3.length ===1 &&  otp4.length === 1  ){
        //     this.setState({isValid:true})
        // } else{
        //     this.setState({isValid:false})
        // }
        if (value1 === 'otp4'  && event.target.value !='') {
            this.setState({isReady:true})
            // this.handleOtpSubmit(event.target.value);

        }else{
            this.setState({isReady:false})
        }
    }

    handleOtpSubmit = (e) => {
        e.preventDefault()
        // console.log('asfdsfsdfsfsfsfs')
        const mobile_otp = Number(this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4)
        // console.log(this.state.otp1)

        this.setState({ mobile_otp_submit: mobile_otp })

        this.setState({ otp1: "" })
        this.setState({ otp2: "" })
        this.setState({ otp3: "" })
        this.setState({ otp4: "" })
        this.setState({ emailotpSend: true })
        this.closeModal();
        this.setState({ isReady: false })
        window.$('#updatemodal').modal('hide')
        window.$('#emailOtp').modal('show')
    }



    handleFinalSubmit = (e) => {
        
        e.preventDefault();
        this.setState({ otpsend: false,showResend:false })

        const email_otp_submit = Number(this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4);

        if (this.state.isMobileUpdating) {

            let data = {
                "mobile_otp": this.state.mobile_otp_submit,
                "email_otp": email_otp_submit,
                "mobile_id": this.state.mobile_log,
                "email_id": this.state.email_log,
                "mobile_nmber": this.state.mobile,
                "user_sfid": this.props.sfid,


            }

            this.props.dispatch(Update_mobile(data)).then((response) => {
                // console.log(response, "responseeeeee");
                if (response.status == 'success') {
                    this.setState({ successmsg: true })
                } else {
                    this.setState({ errorMsg: true,isReady:false,showResend:true })
                }

            })

        } else if (this.state.isEmailUpdating) {
            let data = {
                "mobile_otp": this.state.mobile_otp_submit,
                "email_otp": email_otp_submit,
                "mobile_id": this.state.mobile_log,
                "email_id": this.state.email_log,
                "email": this.state.inputEmail,
                "user_sfid": this.props.sfid,
            }

            this.props.dispatch(Update_email(data)).then((response) => {
                // console.log(response, "responseeeeee");
                if (response.status == 'success') {
                    this.setState({ successmsg: true })
                } else {
                    this.setState({ errorMsg: true})
                }

            })

        }



    }

    inputfocus = (elmnt, getvalue) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {
                elmnt.target.form.elements[next].focus()
            }
        }
        else {
            const pattern = /^[0-9]$/;
            if (pattern.test(elmnt.target.value)) {
                const next = elmnt.target.tabIndex;
                if (next < 4) {
                    elmnt.target.form.elements[next].focus()
                    this.setState({ isValid: false })
                } else {
                    this.setState({ isReady: true })
                    this.setState({ isValid: true })
                    // console.log('alll 44')
                    // this.handleOtpSubmit();
                }
            } else {

                this.setState({ [getvalue]: '' });
                document.getElementById(getvalue).value = '';
            }

        }

    }

    ValidateEmail = (email) => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.match(mailformat)) {
            return (true)
        }
        // alert("You have entered an invalid email address!")
        return (false)
    }

    handleEmail = (e) => {
        this.setState({ inputEmail: e.target.value })
    }

    handleEmailSubmit = (e) => {
        e.preventDefault();
        if (this.ValidateEmail(this.state.inputEmail)) {
            this.setState({ isEmailValid: "true" })

            let data = {
                email: this.state.inputEmail, user_sfid: this.props.sfid
            }

            this.props.dispatch(sendEmailOtp(data)).then((response) => {
                console.log(response, 'email otp send resposnse')
                this.setState({ email_log: response.email_log })
                this.setState({ mobile_log: response.mobile_log })
                this.setState({ isMobileUpdating: false })
                this.setState({ isEmailUpdating: true })
                this.setState({ otpsend: true })
                // document.getElementById('updatemodal_btn').click();
                // document.getElementById('updatemodal').click()
                window.$('#updatemodal').modal('show')
            })


            document.getElementById('modal-close3').click();
        } else {
            this.setState({ isEmailValid: "false" })
        }
    }


    closeModal = () => {
        document.getElementById('modal-close').click()
    }

    render() {
        const styles = { background: '#1F1F2D', borderRadius: '10px', color: '#ffffff' };
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const { sfid, message, history, isSearching, userId, user, username, isLoading, dispatch, profile } = this.props
        // console.log(profile, "prrrrrrrrrrrr");
        let userdetails = profile && profile.profile ? profile.profile : ''
        console.log('isReady',this.state.isReady)
        console.log('shoe resend',this.state.showResend)


        return (
            <>
                <Helmet>
                    <title>Credit Score</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}

                <div className="inner-page">
                    <div className="container">
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper pt-3'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li><a href="#">Setting</a></li>
                                        <li><a href="#">Account</a></li>
                                    </ul>
                                </div>
                            </div>







                            <div className="col-12  p-4 mt-4 ">


                                <div className="col-lg-6 col-md-12 d-inline-block  p-2">
                                    <div className="credit-sub-card p-0">
                                        <span><h4 className="acc-details-h pinkbg">Profile</h4></span>
                                        <div className="container">




                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Name:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{username && username}</span>
                                                    </span>
                                                    {/* <i className="fa fa-plus-circle fs-4"></i> */}
                                                </div>
                                            </div>


                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Primary Mobile:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{userdetails && userdetails.phone}</span>
                                                        <br />
                                                        <span className="acc_sec_font">{userdetails && userdetails.secondary_mobile__c}</span>
                                                    </span>
                                                    {userdetails && !userdetails.secondary_mobile__c &&
                                                        <i className="fa fa-plus-circle fs-4" data-toggle="modal" data-target="#updatemodal"></i>
                                                    } 

                                                    {/* {userdetails && userdetails.secondary_mobile__c &&
                                                        <i className="fa fa-plus-circle fs-4" data-toggle="modal" data-target="#updatemodal"></i>
                                                    }  */}
                                                    

                                                </div>
                                            </div>



                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex  align-items-center">
                                                        <span>
                                                            <span className="acc_font">Email:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{userdetails && userdetails.email__c}</span>
                                                        <br />
                                                        <span className="acc_sec_font">{userdetails && userdetails.secondary_email__c}</span>
                                                    </span>
                                                    {userdetails && !userdetails.secondary_email__c && <i className="fa fa-plus-circle fs-4" data-toggle="modal" data-target="#emailmodal"></i>}

                                                    {/* <i className="fa" style={{ display: "hidden" }} data-toggle="modal" data-target="#updatemodal" id="updatemodal_btn"></i> */}

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>




                                <div className="col-lg-6 col-md-12 d-inline-block  p-2 " style={{ verticalAlign: "top" }}>
                                    <div className="credit-sub-card p-0" style={{ height: "12em" }}>
                                        <span ><h4 className="acc-details-h pinkbg">KYC Document <span className="form-check form-switch ">
                                            <img src={asset + "images/dashboard/auto-pay.png"} className="abs_img img-fluid" />
                                            {profile && profile.bank &&

                                                <input
                                                    style={{
                                                        position: "absolute"
                                                        , top: "-2.7em"
                                                        , right: "1em"
                                                    }}
                                                    className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck" />

                                            }
                                        </span></h4>
                                        </span>
                                        <div className="container">


                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Adjhar Card:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end linksec" >
                                                        <span className="acc_font">*****12345</span>
                                                        <a href="#">View</a>
                                                    </span>
                                                </div>


                                            </div>


                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }}>
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Pan Card:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end linksec">
                                                        <span className="acc_font">{userdetails && '*****' + userdetails.pan_number__c.substring(5)}</span>
                                                        <a href="#">View</a>
                                                    </span>
                                                </div>
                                            </div>







                                        </div>
                                    </div>
                                </div>




                                <div className="col-lg-6 col-md-12 d-inline-block p-2">
                                    <div className="credit-sub-card p-0">
                                        <span><h4 className="acc-details-h2 greybg">Basic Details</h4></span>
                                        <div className="container">



                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Profession Type:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{userdetails && userdetails.occupation__c}</span>
                                                    </span>
                                                </div>
                                            </div>


                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Monthly Income:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <i className="fa fa-rupee"></i><span className="acc_font"> {userdetails && userdetails.monthly_income__c}</span>

                                                    </span>
                                                </div>
                                            </div>



                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Company name:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{userdetails && userdetails.employer_name__c}</span>
                                                    </span>
                                                </div>
                                            </div>



                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Resident Type:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{userdetails && userdetails.resident_type__c}</span>
                                                    </span>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-12 d-inline-block p-2">
                                    <div className="credit-sub-card p-0">
                                        <span><h4 className="acc-details-h2 greybg">Bank Details</h4></span>
                                        <div className="container">

                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Bank Name:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >

                                                        {/* {profile &&
                                                            <span className="bank_icon" >
                                                                <img src={profile.creditActivity[0].bank_image__c}
                                                                    height="25" width="25" />
                                                            </span>

                                                        } */}

                                                        <span className="acc_font">{profile && profile.bank && profile.bank.bank_name__c}</span>


                                                    </span>
                                                </div>
                                            </div>


                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Account Number:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{profile && profile.bank && profile.bank.account_number__c}</span>
                                                    </span>
                                                </div>
                                            </div>



                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Account Holder Name:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{profile && profile.bank && profile.bank.bank_account_holder_name__c}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                <div>
                                                    <div className="d-flex d-flex align-items-center">
                                                        <span>
                                                            <span className="acc_font">Branch:</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                    <span className="text-end  " >
                                                        <span className="acc_font">{profile && profile.bank && profile.bank.branch_name__c ? profile.bank.branch_name__c : " "}</span>
                                                    </span>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>







                                <div className="col-lg-12 col-md-12 d-inline-block p-2">
                                    <div className="credit-sub-card p-0">
                                        <span><h4 className="acc-details-h2 greenbg">Permission</h4></span>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-12 brgrt">
                                                    <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                        <div>
                                                            <div className="d-flex d-flex align-items-center">
                                                                <span>
                                                                    <i className="fa fa-bell"></i>
                                                                    <span className="acc_font">Notification:</span>
                                                                    <br />
                                                                    <span className="sd_h">The action of notifying something.</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                            <span className="text-end  " >
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />

                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                        <div>
                                                            <div className="d-flex d-flex align-items-center">
                                                                <span>
                                                                    <i className="fa-solid fa-fingerprint"></i>
                                                                    <span className="acc_font">Biometric Login:</span>
                                                                    <br />
                                                                    <span className="sd_h">Authorizing access to private content</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                            <span className="text-end  " >
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />

                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="col-lg-6 col-sm-12 brgrt">
                                                    <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                        <div>
                                                            <div className="d-flex d-flex align-items-center">
                                                                <span>
                                                                    <i className="fa fa-lock"></i>
                                                                    <span className="acc_font">mPin:</span>
                                                                    <br />
                                                                    <span className="sd_h">The action of notifying something.</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                            <span className="text-end  " >
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />

                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex list_banks p-2 cursor-point" style={{ justifyContent: "space-between" }} >
                                                        <div>
                                                            <div className="d-flex d-flex align-items-center">
                                                                <span>
                                                                    <i className="fa-solid fa-fingerprint"></i>
                                                                    <span className="acc_font">Biometric Login:</span>
                                                                    <br />
                                                                    <span className="sd_h">Authorizing access to private content</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-baseline" style={{ gap: '5px' }}    >
                                                            <span className="text-end  " >
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" />

                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>






                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>








                {/* //////////////////////////////////////////////////////////////////////////////////// */}

                <button data-toggle="modal" data-target="#emailOtp" id="emailotpmodal_btn"></button>

                <div className="modal fade" id="emailOtp" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content ">

                            <div className="modal-header">


                                <button type="button" className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={this.modalClose}
                                >
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                {this.state.successmsg ?

                                    this.state.isMobileUpdating ? <h4 className="text-success">Mobile number added successfully</h4> :
                                        this.state.isEmailUpdating ?
                                            <h4 className="text-success">Email added successfully</h4> : ''

                                    :
                                    <>
                                        {this.state.errorMsg &&

                                            <h4 className="text-danger">Error ! Mobile otp or Email otp is incorrect </h4>


                                        }

                                        <div>
                                            <h3 className="text-center">Confirm OTP </h3>

                                            <form className="otpform" onSubmit={this.handleFinalSubmit}>
                                                <div className="enter_otp">
                                                    <div className="row">
                                                        <div className='col-sm-12 margin_5 d-flex justify-content-center' >
                                                            <input
                                                                className="otp col-2 fs-3"
                                                                name="otp1"
                                                                id="otp1"
                                                                type="text"
                                                                autoComplete="off"
                                                                value={this.state.otp1}
                                                                onKeyPress={this.keyPressed}
                                                                onChange={e => this.handleChange("otp1", e)}
                                                                tabIndex="1"
                                                                maxLength="1"
                                                                placeholder={0}
                                                                onKeyUp={e => this.inputfocus(e, "otp1")}
                                                            />
                                                            <input
                                                                className="otp col-2 fs-3"
                                                                name="otp2"
                                                                id="otp2"
                                                                type="text"
                                                                autoComplete="off"
                                                                value={this.state.otp2}
                                                                onKeyPress={this.keyPressed}
                                                                onChange={e => this.handleChange("otp2", e)}
                                                                tabIndex="2"
                                                                maxLength="1"
                                                                placeholder={0}
                                                                onKeyUp={e => this.inputfocus(e, "otp2")}
                                                            />
                                                            <input
                                                                className="otp col-2 fs-3"
                                                                name="otp3"
                                                                id="otp3"
                                                                type="text"
                                                                autoComplete="off"
                                                                value={this.state.otp3}
                                                                onKeyPress={this.keyPressed}
                                                                onChange={e => this.handleChange("otp3", e)}
                                                                tabIndex="3"
                                                                maxLength="1"
                                                                placeholder={0}
                                                                onKeyUp={e => this.inputfocus(e, "otp3")}
                                                            />
                                                            <input
                                                                className="otp col-2 fs-3"
                                                                name="otp4"
                                                                id="otp4"
                                                                type="text"
                                                                autoComplete="off"
                                                                value={this.state.otp4}
                                                                onKeyPress={this.keyPressed}
                                                                onChange={e => this.handleChange("otp4", e)}
                                                                tabIndex="4"
                                                                maxLength="1"
                                                                placeholder={0}
                                                                onKeyUp={e => this.inputfocus(e, "otp4")}
                                                            />
                                                            {/* {this.state.isValid || this.state.isValid === 0 ? (
                                                    <img style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={this.handleClear} className="img-error" src={asset + "images/error.png"} />
                                                ) : ''} */}
                                                        </div>


                                                        {this.state.errorMsg !== '' && this.state.isValid === 0 ? (
                                                            <div className="col-md-12 text-center">
                                                                <div className="d-inline-block mt-2 alert alert-danger" role="alert">
                                                                    Invalid verification code. Please try again!
                                                                </div>
                                                            </div>
                                                        ) : ''
                                                        }

                                                        <div className="">

                                                            {this.state.showResend == false?
                                                                
                                                                <button type="submit" disabled={this.state.isReady === true ? false : true} className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize" style={this.state.isReady === true ? styles : {}}>
                                                                Continue
                                                            </button>
                                                            :
                                                            <button type="submit" className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize" style={this.state.isReady === false ? styles : {}}>
                                                                    Resend
                                                        </button>
                                                            }

                                                        </div>

                                                        <div className="col-sm-9 margin_5 d-flex justify-content-center m-auto mx-auto">
                                                    {/* {this.state.isReady ?
                                                        <button type="submit" disabled={this.state.isReady === true ? false : true} className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize" style={this.state.isReady === true ? styles : {}}>
                                                                Continue
                                                        </button>
                                                        :
                                                        <button type="submit" className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize" style={this.state.isReady === false ? styles : {}}>
                                                        Resend
                                                </button>
                                                    } */}
                                                </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>



                <div className="modal fade otp_Popup" id="updatemodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content ">

                            <div className="modal-header">


                                <button type="button" className="close"
                                    data-dismiss="modal"
                                    id='modal-close'
                                    aria-label="Close"
                                // onClick={() => this.setState({ isUpdating: false })}
                                >
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                {/*  enter mobile otp  */}
                                {this.state.otpsend ?

                                    <form className="otpform" onSubmit={this.handleOtpSubmit}>
                                        <h3 className="text-center">Confirm OTP</h3>
                                        <p class="otp_text">Enter OTP sent to <span>+91*** *** 1363</span></p>
                                        <div className="enter_otp">
                                            <div className="row">
                                                <div className='col-sm-12 margin_5 d-flex justify-content-center' >
                                                    <input
                                                        className="otp col-2 fs-3"
                                                        name="otp1"
                                                        id="otp1"
                                                        type="text"
                                                        autoComplete="off"
                                                        value={this.state.otp1}
                                                        onKeyPress={this.keyPressed}
                                                        onChange={e => this.handleChange("otp1", e)}
                                                        tabIndex="1"
                                                        maxLength="1"
                                                        placeholder={0}
                                                        onKeyUp={e => this.inputfocus(e, "otp1")}
                                                    />
                                                    <input
                                                        className="otp col-2 fs-3"
                                                        name="otp2"
                                                        id="otp2"
                                                        type="text"
                                                        autoComplete="off"
                                                        value={this.state.otp2}
                                                        onKeyPress={this.keyPressed}
                                                        onChange={e => this.handleChange("otp2", e)}
                                                        tabIndex="2"
                                                        maxLength="1"
                                                        placeholder={0}
                                                        onKeyUp={e => this.inputfocus(e, "otp2")}
                                                    />
                                                    <input
                                                        className="otp col-2 fs-3"
                                                        name="otp3"
                                                        id="otp3"
                                                        type="text"
                                                        autoComplete="off"
                                                        value={this.state.otp3}
                                                        onKeyPress={this.keyPressed}
                                                        onChange={e => this.handleChange("otp3", e)}
                                                        tabIndex="3"
                                                        maxLength="1"
                                                        placeholder={0}
                                                        onKeyUp={e => this.inputfocus(e, "otp3")}
                                                    />
                                                    <input
                                                        className="otp col-2 fs-3"
                                                        name="otp4"
                                                        id="otp4"
                                                        type="text"
                                                        autoComplete="off"
                                                        value={this.state.otp4}
                                                        onKeyPress={this.keyPressed}
                                                        onChange={e => this.handleChange("otp4", e)}
                                                        tabIndex="4"
                                                        maxLength="1"
                                                        placeholder={0}
                                                        onKeyUp={e => this.inputfocus(e, "otp4")}
                                                    />

                                                </div>


                                                {this.state.errorMsg ? (
                                                    <div className="col-md-12 text-center">
                                                        <div className="d-inline-block mt-2 alert alert-danger" role="alert">
                                                            Invalid verification code. Please try again!
                                                        </div>
                                                    </div>
                                                ) : ''
                                                }

                                                <div className="col-sm-9 margin_5 d-flex justify-content-center m-auto mx-auto">
                                                    {this.state.isReady ?
                                                        <button type="submit"  className="flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer resendBtn" style={this.state.isReady === true ? styles : {}}>
                                                            Submit
                                                        </button>
                                                        :
                                                        <button type="submit" disabled className="flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer resendBtn" style={this.state.isReady === true ? styles : {}}>
                                                            Resend in  <span> 00:59 min</span>
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </form>





                                    :


                                    <div className="enter_mobile_number">


                                        <h4 className="text-center acc_font">Add Mobile Number</h4>
                                        <h6 className="text-center"><span className="text-center sd_h">Add your secondary mobile number</span></h6>

                                        <form onSubmit={this.handleSubmit} className="mt-4">
                                            <div className="row">
                                                <div className="col-md-12 m-b-5 how-pos4-parent">
                                                    <span className="has-float-label bigger">
                                                        <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>
                                                            {/* <input
                                                                name="text"
                                                                placeholder=" "
                                                                className="fs-3 pl-2 "
                                                                style={{ width: '10%', background: '#fff', color: '#AAAAAA' }}
                                                                defaultValue={'+91'}
                                                                disabled={true}
                                                            /> */}
                                                            <input
                                                                className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15 fs-3"
                                                                type="text"
                                                                name="mobile"
                                                                id="mobile"
                                                                placeholder="Enter Mobile Number "
                                                                style={{ width: '90%', letterSpacing: "7px" }}
                                                                onChange={this.handleMobile}
                                                                maxLength="10"
                                                                required
                                                            />

                                                            <div className="input-group-addon input-group-addon-sty">
                                                                {this.state.mobile.length === 10 && this.state.isValid ? (
                                                                    <img src={asset + "images/Vector.png"} />
                                                                ) : ''
                                                                }
                                                                {
                                                                    this.state.mobile.length === 10 && this.state.isValid === false ? (
                                                                        <img style={{ cursor: 'pointer' }} onClick={this.handleClear} src={asset + "images/error.png"} />
                                                                    ) : ''
                                                                }

                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                this.state.mobile.length === 10 && this.state.isValid === false ? (
                                                    <div className="form-group">
                                                        <div className="alert alert-danger" role="alert">
                                                            {this.state.errorMsg}
                                                        </div>
                                                    </div>
                                                ) : ''}
                                            {message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        {message}
                                                    </div>
                                                </div>
                                            )
                                            }


                                            <button type="submit" disabled={this.state.mobile.length === 10 && this.state.isValid === true ? false : true} className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize" style={this.state.mobile.length === 10 && this.state.isValid === true ? styles : {}}>
                                                Continue
                                            </button>
                                        </form>

                                        {/* 
                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <span>

                                                    <span className="pr_t fw-normal">Amount to be paid</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t"> 2,00,000</span>
                                                </span>

                                                <span className="text-end">

                                                    <span className="pr_t fw-normal">Sanctioned Amount</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t text-end"> 2,00,000</span>
                                                </span>


                                            </div>



                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <span>

                                                    <span className="pr_t fw-normal">Issued on</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t"> 2,00,000</span>
                                                </span>

                                                <span className="text-end">  

                                                    <span className="pr_t fw-normal">Loan Tenure</span> <br />
                                                    <i className="fa fa-rupee"></i><span className="pr_t text-end">NA</span>
                                                </span>


                                            </div>


                                            <div className="d-flex list_banks justify-content-between mb-2" >

                                                <span>

                                                    <span className="pr_t ">Payment History</span> <br />
                                                    <span className="pr_t fw-normal">Last 3 Years</span>
                                                </span>

                                                <span className="text-end d-flex align-items-center">


                                                    <span className="badge badge-pill badge-success p-2 fs-6 fw-lighter">100% Online</span>

                                                </span>


                                            </div>


                                            <div className="list_banks justify-content-between" >
                                                <div>
                                                    <table style={{ width: "100%" }}>
                                                        <thead>

                                                            <tr>
                                                                <td></td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td>{m}</td>
                                                                    })
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>2020</td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td><div className="blank_data"></div></td>
                                                                    })
                                                                }
                                                            </tr>

                                                            <tr>
                                                                <td>2021</td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td><div className="blank_data"></div></td>
                                                                    })
                                                                }
                                                            </tr>

                                                            <tr>
                                                                <td>2022</td>
                                                                {
                                                                    month.map((m) => {
                                                                        return <td><div className="blank_data"></div></td>
                                                                    })
                                                                }
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div className="d-flex gap-4 mt-2">
                                                    <span className="d-flex align-items-center gap-1"><div className="blank_data bg-success"></div><span>Online Payment</span></span>

                                                    <span className="d-flex align-items-center gap-1"><div className="blank_data bg-warning"></div><span>Delayed</span></span>

                                                    <span className="d-flex align-items-center gap-1"><div className="blank_data bg-danger"></div><span>Overdue</span></span>
                                                </div>
                                            </div>








                                        <div style={{ position: "relative", bottom: "0px" }}>
                                            <p>
                                                Amount to be paid, sanctioned amount, issued on, loan tenure are unavailable as the credit bureau was unable to retrieve the details from your bank.
                                            </p>
                                            <a href="#">Report an issue</a>
                                        </div> */}


                                    </div>




                                }


                            </div>

                        </div>
                    </div>
                </div>




                <div className="modal fade" id="emailmodal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog " role="document">
                        <div className="modal-content ">

                            <div className="modal-header">


                                <button type="button" className="close"
                                    data-dismiss="modal"
                                    id={'modal-close3'}
                                    aria-label="Close"
                                // onClick={() => this.setState({ isUpdating: false })}
                                >
                                    <img src="images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                </button>

                            </div>

                            <div className="modal-body">
                                {this.state.successmsg ?
                                    <h3 className="text-success">Email added successfully</h3>

                                    :

                                    <div className="enter_mobile_number">


                                        <h6 className="text-center"><span className="text-center sd_h">Add your secondary Email</span></h6>

                                        <form onSubmit={this.handleEmailSubmit} className="mt-4">
                                            <div className="row">
                                                <div className="col-md-12 m-b-5 how-pos4-parent">
                                                    <span className="has-float-label bigger">
                                                        <div className="input-group bor8 show_hide_password1" style={{ flexWrap: 'initial' }}>
                                                            <input
                                                                name="email"
                                                                placeholder=" "
                                                                style={{ width: '10%', paddingLeft: '6px', background: '#fff', color: '#AAAAAA' }}
                                                                defaultValue={''}
                                                                disabled={true}
                                                            />
                                                            <input
                                                                className="stext-111 cl2 plh3 size-116 p-l-15 p-r-15"
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                placeholder=" "
                                                                style={{ width: '78%' }}
                                                                onChange={this.handleEmail}
                                                                required
                                                            />

                                                            <div className="input-group-addon input-group-addon-sty">
                                                                {this.state.isEmailValid === "true" &&
                                                                    <img src={asset + "images/Vector.png"} />
                                                                }
                                                                {
                                                                    this.state.isEmailValid === "false" &&
                                                                    <img style={{ cursor: 'pointer' }} onClick={this.handleClear} src={asset + "images/error.png"} />

                                                                }

                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                this.state.isEmailValid === "false" &&
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
                                                        Invalid email entered! Please try with correct one.
                                                    </div>
                                                </div>
                                            }



                                            <button type="submit"
                                                // disabled={this.state.mobile.length === 10 && this.state.isValid === true ? false : true} 
                                                className="flex-c-m stext-101 cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty text-capitalize btn-dark"
                                            // style={this.state.mobile.length === 10 && this.state.isValid === true ? styles : {}}
                                            >
                                                Continue
                                            </button>
                                        </form>


                                    </div>



                                }

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
    const { isSearching, searchDet, searchHistory } = state.product
    const { profile, userAddress, userId } = state.user;
    return {
        searchHistory,
        isSearching,
        isLoading,
        searchDet,

        profile,
        username,
        user,
        sfid,
        userId

    };
}

export default connect(mapStateToProps)(MyAccount);
