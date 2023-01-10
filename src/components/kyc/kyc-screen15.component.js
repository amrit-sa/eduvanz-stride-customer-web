import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import 'react-image-crop/dist/ReactCrop.css'
import { isEmail } from "validator";
import { asset } from "../../common/assets";
import { submitCoApplicant } from "../../actions/user";
import LogoSideBar from '../../common/logo-side-bar';
import GetOurApp from '../../common/get-our-app';

class KycScreen15 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isValidPan: true,
            isValidemail: true,
            isValidMobile: true,
            fname: '',
            lname: '',
            mobile: '',
            email: '',
            pan: '',
            relation: '',
            isValid: '',
            errorMsg: '',
            isSubmit: true,
            submitMsg: '',
            firstNameError: false,
            Onboarding: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleMobile = this.handleMobile.bind(this)
    }

    componentDidMount() {
        const { user, history, sfid } = this.props;
        if (!sfid) {
            history.push("/login");
        }

        $('.select-style select').change(function () {

            var $this = $(this);
            console.log($this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })

        $('.label input').change(function () {
            var $this = $(this);
            if ($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

        if (e.target.name === this.state.email) {
            this.setState({ isValid: true, errorMsg: "", email: e.target.value });
        } else {
            this.setState({ isValidemail: true });
        }
    }

    handlePan = (e) => {
        let inputpan = e.target.value;
        this.setState({ pan: inputpan.toUpperCase() })

        if (e.target.name === this.state.pan) {
            this.setState({ isValid: true, errorMsg: "", pan: e.target.value });
        } else {
            this.setState({ isValidPan: true });
        }
    }


    validateEmail = (email) => {
        let response = true;
        if (!isEmail(email)) {
            this.setState({ isValidemail: false });
            response = false;
        } else {
            this.setState({ isValidemail: true });
            response = true;
        }
        return response;
    }

    validatePan = (pan) => {
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        let response = true;
        if (!regex.test(pan)) {
            this.setState({ isValidPan: false });
            response = false;
        } else {
            this.setState({ isValidPan: true });
            response = true;
        }
        return response;
    }

    handleMobile = (e) => {
        const reg = /^[0]?[6789]\d{9}$/;
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (e.target.value !== '') {
            if (!pattern.test(e.target.value)) {
                this.setState({ isValid: false, errorMsg: "Please enter only number.", mobile: "" });
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

    handleClearEmail = () => {
        this.setState({ email: '', isValidemail: true });
    }

    handleClearPan = () => {
        this.setState({ pan: '', isValidPan: true });
    }

    handleClearMobile = () => {
        this.setState({ mobile: '', isValidMobile: true, isValid: true });
    }

    handleSubmit = () => {
        const { history, dispatch, sfid } = this.props
        const { fname, lname, mobile, email, pan, relation, isValid } = this.state
        let isValidEmail = true;
        let isValidPan = true;

        if (email.length > 0) {
            isValidEmail = this.validateEmail(email);
        }

        if (pan.length > 0) {
            isValidPan = this.validatePan(pan);
        }

        if (isValidEmail && isValidPan) {
            let data = {
                mobileNumber: mobile,
                first_name: fname,
                last_name: lname,
                email: email,
                pan: pan,
                sfid: sfid,
                relation: relation
            }

            dispatch(submitCoApplicant(data)).then((response) => {
                if (response.status === "success") {
                    this.setState({ isSubmit: true, submitMsg: 'Submitted SuccessFully', Onboarding: 1 });
                    // setTimeout(() => {
                    //     history.push("/home")
                    //   }, 2000);
                } else {
                    // history.push("/home")
                    this.setState({ isSubmit: false, submitMsg: response.message, Onboarding: 0 })
                }
            });
        }
    }
    handleFirstName = (e) => {
        e.preventDefault()
        let firstName = this.state.fname
        let regExp = /[^a-zA-Z\d\s:]/g;
        let found = regExp.test(firstName)
        let checkNo = this.containsNumber(firstName)
        if (found || checkNo) {
            this.setState({ firstNameError: true })
        } else {
            this.setState({ firstNameError: false })
        }
    }
    handleLastName = (e) => {
        e.preventDefault()
        let firstName = this.state.lname
        let regExp = /[^a-zA-Z\d\s:]/g;
        let found = regExp.test(firstName)
        let checkNo = this.containsNumber(firstName)
        if (found || checkNo) {
            this.setState({ lastNameError: true })
        } else {
            this.setState({ lastNameError: false })
        }
    }
    containsNumber = (str) => {
        return /\d/.test(str);
    }



    render() {

        const { isLoading } = this.props;
        const { isValidemail, isValidPan, fname, lname, mobile, email, pan, relation, isValid, errorMsg } = this.state
        return (
            <>
                <Helmet>
                    <title> Co Applicant Form </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                <section className="kyc_pages">


                    <div className="flex-w flex-tr">
                        <div className="kyc_leftbar login-bg">
                            {/* <h4 onClick={() => this.props.history.push("/home")} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
                            <div className="navigations">
                                <ul className="breadcrumps">
                                    <li className="b_back"><Link to="/ed_limit">Back</Link></li>
                                </ul>
                            </div> */}

                            <LogoSideBar sideTitle="Back" backLink='/ed_limit' historyGoBack="" />

                            <ul className="kyc_timeline pl-0">
                                <li className="complete">Registration</li>
                                <li className="complete">Limit Approval</li>
                                <li className="complete">Identity Verifcation</li>
                                <li className="complete">
                                    <div className='white_box stepsbox'>
                                        <h5>Add co-borrower</h5>
                                        <p>Co-borrower downloads the Stride app and starts transacting on your behalf</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {this.state.Onboarding === 0 && <div className="size-210 bor10 flex-w p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img white-bg">

                            <div className='col-sm-6 mb-5'>
                                <div className='form_details mb-5'>
                                    <h4 className='bg-3 text-center imgaligned'>Co-borrowers details</h4>
                                    <div className='px-lg-5 px-3 pt-5 c_b_d_f pb-4'>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className='label'>
                                                    <input type="text" placeholder='' onChange={this.handleChange} onBlur={e => this.handleFirstName(e)} name="fname" value={fname ? fname : ''} />
                                                    <span>First Name</span>
                                                    {/*  <p className='error-msg_ m-0'>Error msg</p>
                                                <button className='error-close'>
                                                <img src={asset+"images/icons/red-close.png" alt="close" className='img-fluid'/>
                                                </button> */}
                                                    {this.state.firstNameError ? <p className='error-msg_ m-0'>Please enter valid first name</p> : ""}
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='label'>
                                                    <input type="text" placeholder='' name="lname" onChange={this.handleChange} onBlur={e => this.handleLastName(e)} value={lname ? lname : ''} />
                                                    <span>Last Name</span>
                                                    {/*  <p className='error-msg_ m-0'>Error msg</p>
                                                <button className='error-close'>
                                                <img src={asset+"images/icons/red-close.png" alt="close" className='img-fluid'/>
                                                </button> */}
                                                    {this.state.lastNameError ? <p className='error-msg_ m-0'>Please enter valid last name</p> : ""}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='select-style'>
                                                    <select onChange={this.handleChange} name="relation" value={relation ? relation : ''}>
                                                        <option value={""}>&nbsp;</option>
                                                        <option value={"Father"}>Father</option>
                                                        <option value={"Mother"}>Mother</option>
                                                        <option value={"Husband"}>Husband</option>
                                                        <option value={"Wife"}>Wife</option>
                                                        <option value={"Brother"}>Brother</option>
                                                        <option value={"Sister"}>Sister</option>
                                                        <option value={"Friend"}>Friend</option>
                                                    </select>
                                                    <span>Relationship with co-borrower</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='label'>
                                                    <input type="text" placeholder='' maxLength={10} name="mobile" onChange={this.handleMobile} value={mobile ? mobile : ''} />
                                                    <span>Mobile Number</span>
                                                    {isValid === false && errorMsg !== '' && (
                                                        <>
                                                            <p className='error-msg_ m-0'>Please enter valid mobile number</p>
                                                            <button onClick={this.handleClearMobile} className='error-close'>
                                                                <img src={asset + "images/icons/red-close.png"} alt="close" className='img-fluid' />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='label'>
                                                    {/* <span class="optionalTag">optional</span> */}
                                                    <input type="text" placeholder='' onChange={this.handleChange} name="email" value={email ? email : ''} />
                                                    <span>Email ID</span>
                                                    {isValidemail === false && (
                                                        <>
                                                            <p className='error-msg_ m-0'>Please enter valid email ID</p>
                                                            <button onClick={this.handleClearEmail} className='error-close'>
                                                                <img src={asset + "images/icons/red-close.png"} alt="close" className='img-fluid' />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='label'>
                                                    {/* <span class="optionalTag">optional</span> */}
                                                    <input type="text" placeholder='' maxLength={10} onChange={this.handlePan} name="pan" value={pan ? pan : ''} />
                                                    <span>PAN Number</span>
                                                    {isValidPan === false && (
                                                        <>
                                                            <p className='error-msg_ m-0'>Please enter valid PAN number</p>
                                                            <button onClick={this.handleClearPan} className='error-close'>
                                                                <img src={asset + "images/icons/red-close.png"} alt="close" className='img-fluid' />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.isSubmit && this.state.submitMsg ? (
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="alert alert-success" role="alert">
                                                        {this.state.submitMsg}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ''
                                        }

                                        {!this.state.isSubmit && this.state.submitMsg ? (
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="alert alert-danger" role="alert">
                                                        {this.state.submitMsg}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ''
                                        }

                                        <button
                                            type='button'
                                            onClick={this.handleSubmit}
                                            disabled={isValid && lname && fname && relation && mobile.length === 10 && !this.state.firstNameError && !this.state.lastNameError && pan &&email? false : true}
                                            className='d-inline-block continue-btn w-100'
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>



                            </div>
                            <div className="pos_abs">
                                <GetOurApp
                                    dispatch={this.props.dispatch}
                                />
                            </div>

                        </div>
                        }
                        {this.state.Onboarding === 1 && <div className="size-210 bor10 flex-w p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img white-bg ">
                            <div className='col-sm-9 mb-5 shadow-sm p-3 mb-5 bg-white rounded'>
                                <div className="row mb-3" >
                                    <div className="col-11 text-center"><h3>What happens next?</h3></div>
                                </div>
                                <div className="row my-3" style={{ height: '129px' }}>
                                    <div className="col-11 mx-auto rounded " style={{ backgroundColor: '#EAFFF6' }}>
                                        <div className="row">
                                            <div className="col-6 pt-3">
                                                <div className="d-flex flex-column pl-3 ">
                                                    <div className='whatnext' >Co-borrower </div>
                                                    <div className='whatnext'>downloads Stride</div>
                                                    <p>They can also register on www.stride.com</p>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className='d-flex justify-content-center align-items-center h-100'><img style={{ height: '105px' }} src="./images/banner/first1111.png" alt="" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-3" style={{ height: '129px' }}>
                                    <div className="col-11 mx-auto rounded " style={{ backgroundColor: '#E4ECFF' }}>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className='d-flex justify-content-center align-items-center h-100'><img style={{ height: '105px' }} src="./images/banner/second222.png" alt="" /></div>
                                            </div>

                                            <div className="col-6 pt-3">
                                                <div className="d-flex flex-column pl-3 ">
                                                    <div className='whatnext' >Co-borrower </div>
                                                    <div className='whatnext'>downloads Stride</div>
                                                    <p>They can also register on www.stride.com</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-2" style={{ height: '129px' }}>
                                    <div className="col-11 mx-auto rounded " style={{ backgroundColor: '#FFEBEB' }}>
                                        <div className="row">
                                            <div className="col-6 pt-3">
                                                <div className="d-flex flex-column pl-3 ">
                                                    <div className='whatnext' >Co-borrower </div>
                                                    <div className='whatnext'>downloads Stride</div>
                                                    <p>They can also register on www.stride.com</p>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className='d-flex justify-content-center align-items-center h-100'><img style={{ height: '105px' }} src="./images/banner/first111.png" alt="" /></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-11 mx-auto d-flex justify-content-center align-items-center mb-3">
                                        {/* <button className='bg'></button> */}
                                        <button type="button w-100" onClick={() => { this.props.history.push("/"); }} style={{ padding: '10px 70px' }} class="btn btn-secondary bg-dark text-white btn-lg">Explore Marketplace</button>
                                    </div>
                                    {/* <div className="col-7 mx-auto d-flex justify-content-center align-items-center">
                                        <a  href="">Add another co-borrower</a>
                                </div> */}
                                </div>




                            </div>

                        </div>
                        }
                    </div>

                </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { salesForceToken, user, sfid, isLoading } = state.auth;
    const { message } = state.message;
    const { profile, userMessage } = state.user;
    return {
        salesForceToken,
        user,
        sfid,
        isLoading,
        message,
        userMessage,
        profile
    };
}

export default connect(mapStateToProps)(KycScreen15)