import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import PersonalDetails from "./components/personal-details.component";
import OtherDetails from "./components/other-details.component";
import SignOtp from "./components/signOtp.component";
import VerifyOtp from "./components/signin-otp.component";
import CheckOtp from './components/check-otp.component';
import PanEdit from './components/pan-edit.component';
import Success from './components/success.component';
import HigherSuccess from './components/HigherSuccess.component';
import Dontgetotp from './components/donotget-numbet.component';
import SigninMpin from "./components/signin-mpin.component";
import CreateMpin from "./components/create-mpin.component";
import KycScreen1 from "./components/kyc/kyc-screen1.component";
import KycScreen2 from "./components/kyc/kyc-screen2.component";
import KycScreen3 from "./components/kyc/kyc-screen3.component";
import KycAddressScreen1 from "./components/kyc/kyc-address-screen1.component";
import KycAddressScreen2 from "./components/kyc/kyc-address-screen2.component";
import KycAddressScreen3 from "./components/kyc/kyc-address-screen3.component";
import KycAddressScreen4 from "./components/kyc/kyc-address-screen4.component";
import KycAddressScreen5 from "./components/kyc/kyc-address-screen5.component";
import KycScreen9 from "./components/kyc/kyc-screen9.component";
import KycScreen10 from "./components/kyc/kyc-screen10.component";
import KycScreen11 from "./components/kyc/kyc-screen11.component";
import KycScreen12 from "./components/kyc/kyc-screen12.component";
import KycScreen13 from "./components/kyc/kyc-screen13.component";
import KycScreen14 from "./components/kyc/kyc-screen14.component";

import KycScreen15 from "./components/kyc/kyc-screen15.component";
import KycScreen16 from "./components/kyc/kyc-screen16.component";
import KycScreen17 from "./components/kyc/kyc-screen17.component";
import KycScreen18 from "./components/kyc/kyc-screen18.component";
import KycScreen19 from "./components/kyc/kyc-screen19.component";
import KycScreen20 from "./components/kyc/kyc-screen20.component";
import KycScreen21 from "./components/kyc/kyc-screen21.component";

import BankScreen from "./components/bank/bank-screen.component";
import BankScreen1 from "./components/bank/bank-screen1.component";
import BankScreen2 from "./components/bank/bank-screen2.component";
import BankScreen3 from "./components/bank/bank-screen3.component";
import BankScreen4 from "./components/bank/bank-screen4.component";
import BankScreen5 from "./components/bank/bank-screen5.component";
import BankScreen6 from "./components/bank/bank-screen6.component";
import BankScreen7 from "./components/bank/bank-screen7.component";
import BankScreen8 from "./components/bank/bank-screen8.component";
import BankScreen9 from "./components/bank/bank-screen9.component ";
import BankScreen10 from "./components/bank/bank-screen10.component";
import BankScreen11 from "./components/bank/bank-screen11.component ";
import BankScreen12 from "./components/bank/bank-screen12.component";
import BankScreen13 from "./components/bank/bank-screen13.component";
import BankScreen14 from "./components/bank/bank-screen14.component";
import BankScreen15 from "./components/bank/bank-screen15.component";
import BankScreen16 from "./components/bank/bank-screen16.component";
import BankScreen17 from "./components/bank/bank-screen17.component";
import BankScreen18 from "./components/bank/bank-screen18.component";
import BankEnach from "./components/bank/bank-enach.component";
import ManualEnach1 from "./components/bank/manual-enach1.component";
import ManualEnach2 from "./components/bank/manual-enach2.component";
import ManualEnach3 from "./components/bank/manual-enach3.component";
import BankScreenPay from "./components/bank/bank-screen-pay.component";
import BankSuccess from "./components/bank-success.component";
import BankLinkSuccess from "./components/bank-link-success.component";
import BankLinkFaild from "./components/bank-link-faild.component";

import VirtualCard1 from "./components/virtual/screen7";
import VirtualCard2 from "./components/virtual/screen7";
import VirtualCard3 from "./components/virtual/screen1";
import LoanSummary from "./components/virtual/screen9";
import VirtualCard5 from "./components/virtual/virtual-card5.component";
import VirtualCard6 from "./components/virtual/virtual-card6.component";
import VirtualCard7 from "./components/virtual/virtual-card7.component";
import VirtualCard8 from "./components/virtual/virtual-card8.component";
import VirtualCard9 from "./components/virtual/virtual-card9.component";
import AllOrders from "./components/allorders.component"
import Enach from "./components/enach/enach.component";

import UploadManually from "./components/model/upload-instruction";
import Digilocker from "./components/model/digilocker-model";
import DocPreview from "./components/model/doc-preview-model";
import PdfView from "./components/model/pdf-model";
import AadharVerififcation from "./components/identity/aadhar-verification.component";
import { logout, updateAppUrl } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import TermsCondition from './components/TermsCondition';
import PrivacyPolicy from './components/PrivacyPolicy';
import Legal from './components/Legal';

import AllPayments from './components/AllPayments';


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Reject from "./components/reject";
import Awaiting from "./components/awaiting";
import ProductDetails from "./components/product-details";
import SearchListing from "./components/search-listing";
import ProductDescription from "./components/product-description"
import ProductDescriptionBike from "./components/product-description-bike"
import ProductList from "./components/products-list"
import CompareProduct from "./components/compare-product"
import Dashboard from "./components/dashboard"
import Setting from "./components/setting"
import MyAccount from "./components/myaccount"
import UserAddress from "./components/user-address"
import CreditScore from "./components/credit-score";
import OrderConfirm from "./components/order-confirm.component";
import OrderProcess from "./components/order-process.component";
import OrderReject from "./components/order-reject.component";
import Support from "./components/support.component";

import Notification from "./components/notification.component";
import WishList from "./components/wish-list.component";

//Accomodation
import Accomodation1 from "./components/accomodation/accomodation1"
import Accomodation2 from "./components/accomodation/accomodation2"
import Accomodation3 from "./components/accomodation/accomodation3"
import Accomodation4 from "./components/accomodation/accomodation4"
import Accomodation5 from "./components/accomodation/accomodation5"
import VirtualNoCard from "./components/accomodation/virtual-no-card"
import BrandLanding from "./components/brand-landing"
import MyWishlist from "./components/my-wishlist"
import QuickFilter from './components/plp-quickfilter'
import CompareSelected from "./components/plp-compare-selected"
import PLPFilter from "./components/plp-filter"
import CompareEnabled from "./components/plp-compare-enabled"
import ClpElectronics from "./components/clp-electronics"
import ClpEducation from "./components/clp-education"
import virtualCard from "./components/virtual/screen5"
import PaymentPlan from "./components/virtual/screen1"
import ChoosePayment from "./components/virtual/virtual-card6.component"
import StrideCard from "./components/virtual/virtual-card9.component"
import testComponent from "../src/common/slider-360-view"
import howItWorks from "./components/how-it-works";
import undergrad from "./components/undergrad";
import forMerchant from "./components/for-merchant";
import about from "./components/about";
import careers from "./components/careers";
import sitemap from "./components/sitemap";
import privacy from "./components/privacy";
import disclaimer from "./components/disclaimer";
import termsOfUse from "./components/terms-of-use";
import finePrintComponen from "./components/finePrint.componen";
import Videomodal from "./components/model/videomodal";
import SpecificOrderDetailsComponent from "./components/SpecificOrderDetails.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      appUrl : null
    };

    history.listen((location) => {
      window.scrollTo(0, 0);
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    EventBus.on("logout", () => {
      this.logOut();
    });
    if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log("Development");
      const appUrl = process.env.REACT_APP_PUBLIC_DEV_URL;
      this.props.dispatch(updateAppUrl(appUrl));
    } else {
      console.log("Production");
      const appUrl = process.env.REACT_APP_PUBLIC_LIVE_URL;
      this.props.dispatch(updateAppUrl(appUrl));
    }
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    return (
      <>
        <Router history={history} appUrl={this.state.appUrl}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={"/edotp"} component={VerifyOtp} />
            <Route exact path={"/edmpin"} component={SigninMpin} />
            <Route exact path={"/ed_qdform"} component={OtherDetails} />
            <Route exact path={"/ed_limit"} component={Success} />
            <Route exact path={"/ed_higher_limit"} component={HigherSuccess} />
            <Route exact path={"/ed_pan_update"} component={PanEdit} />
            <Route exact path={"/ed_coapplicant"} component={KycScreen15} />
            <Route exact path={"/ed_coapplicant_details"} component={KycScreen16} />
            <Route exact path="/update_mpin" component={CreateMpin} />
            <Route exact path="/login_otp" component={SignOtp} />
            <Route exact path="/check_otp" component={CheckOtp} />
            <Route exact path={"/ed_custdetails"} component={PersonalDetails} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path={'/donot_get'} component={Dontgetotp} />
            <Route exact path="/ed_income_source" component={KycScreen2} />
            <Route exact path={"/ed_salary"} component={KycScreen1} />
            <Route exact path="/ed_self" component={KycScreen3} />
            <Route exact path="/ed_resident" component={KycAddressScreen1} />
            <Route exact path="/ed_resident_details" component={KycAddressScreen2} />
            <Route exact path={"/ed_address"} component={KycAddressScreen3} />
            <Route exact path="/ed_geo_address" component={KycAddressScreen4} />
            <Route exact path="/ed_manual_address" component={KycAddressScreen5} />
            <Route exact path={"/ed_doc"} component={KycScreen9} />
            <Route exact path={"/ed_doc_profile"} component={KycScreen10} />
            <Route exact path={"/ed_digilocker"} component={KycScreen11} />
            <Route exact path={"/ed_doc_aadhar"} component={KycScreen12} />
            <Route exact path={"/ed_doc_others"} component={KycScreen13} />
            <Route exact path={"/ed_doc_pan"} component={KycScreen14} />

            <Route exact path="/kyc_screen17" component={KycScreen17} />
            <Route exact path="/kyc_screen18" component={KycScreen18} />
            <Route exact path="/kyc_screen19" component={KycScreen19} />
            <Route exact path="/kyc_screen20" component={KycScreen20} />
            <Route exact path="/kyc_screen21" component={KycScreen21} />

            <Route exact path="/bank_screen" component={BankScreen} /> //landing page upload
            <Route exact path="/edonemoney" component={BankScreen1} />
            <Route exact path="/edonebanklist" component={BankScreen2} />
            <Route exact path="/bank_screen3" component={BankScreen3} />
            <Route exact path="/bank_screen4" component={BankScreen4} />
            <Route exact path="/bank_screen5" component={BankScreen5} /> //upload
            <Route exact path="/bank_screen6" component={BankScreen6} />
            <Route  path="/ed_upload" component={BankScreen7} /> //upload box
            <Route exact path="/ed_after_upload" component={BankScreen8} />
            <Route exact path={"/edplans"} render={(props) => { return (<BankScreen9 id={props.match.params.id} history={history} />) }} />
            <Route exact path="/bank_screen10" component={BankScreen10} />
            <Route exact path={"/edplan_details/:product_id/:plan_id"} render={(props) => { return (<BankScreen11 product_id={props.match.params.product_id} plan_id={props.match.params.plan_id} history={history} />) }} />
            <Route exact path={"/ed_payment/:product_id/:plan_id"} render={(props) => { return (<BankScreen12 product_id={props.match.params.product_id} plan_id={props.match.params.plan_id} history={history} />) }} />
            <Route exact path={"/edplan_details_pay/:product_id/:plan_id"} render={(props) => { return (<BankScreenPay product_id={props.match.params.product_id} plan_id={props.match.params.plan_id} history={history} />) }} />  
            <Route exact path={"/order-reject/:id"} render={(props) => { return (<OrderReject  id={props.match.params.id} product_id={props.match.params.product_id} history={history} />) }} />
            <Route exact path={"/order-process/:product_id/:plan_id"} render={(props) => { return (<OrderProcess product_id={props.match.params.product_id} plan_id={props.match.params.plan_id} history={history} />) }} />
            <Route exact path="/bank_screen13" component={BankScreen13} />
            <Route exact path="/ed_bank_details" component={BankScreen14} />
            <Route exact path="/ed_select_bank" component={BankScreen15} />
            <Route exact path="/bank_screen16" component={BankScreen16} />
            <Route exact path="/ed_bank_upload" component={BankScreen17} />
            <Route exact path="/bank_screen18" component={BankScreen18} />
            <Route exact path="/bank_enach" component={BankEnach} /> //download manual enach
            <Route exact path="/bank_enach1" component={ManualEnach1} />
            <Route  path="/ed_enach" component={ManualEnach2} />
            <Route exact path="/bank_enach3" component={ManualEnach3} />

            <Route exact path="/enach" component={Enach} />

            <Route exact path="/virtual_card1" component={VirtualCard1} />
            <Route exact path="/virtual_card2" component={VirtualCard2} />
            <Route exact path="/virtual_card3" component={VirtualCard3} />
            {/* <Route exact path="/virtual_card4" component={VirtualCard4} /> */}
            <Route exact path="/virtual_card5" component={VirtualCard5} />
            <Route exact path="/virtual_card6" component={VirtualCard6} />
            <Route exact path="/virtual_card7" component={VirtualCard7} />
            <Route exact path="/virtual_card8" component={VirtualCard8} />
            <Route exact path="/view_card" component={VirtualCard9} />

            <Route exact path="/edreject" component={Reject} />
            <Route exact path="/edawaiting" component={Awaiting} />
            <Route  path="/payment_success" component={OrderConfirm} />
            <Route exact path="/all_payments" component={AllPayments} />
            <Route exact path="/all_orders" component={AllOrders} />



            <Route exact path="/bank_success" component={BankSuccess} />
            <Route exact path="/onemoney_success" component={BankLinkSuccess} />
            <Route exact path="/onemoney_faild" component={BankLinkFaild} />
            <Route exact path="/product-details/:id" render={(props) => { return (<ProductDetails id={props.match.params.id} history={history} />) }} />
            <Route exact path="/search-listing" component={SearchListing} />
            <Route exact path="/product-description/:id" render={(props) => { return (<ProductDescription id={props.match.params.id} history={history} />) }} />
            <Route exact path="/product-description-bike" component={ProductDescriptionBike} />
            <Route exact path="/products-list" component={ProductList} />
            <Route exact path="/compare-product" component={CompareProduct} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/user-address" component={UserAddress} />
            <Route exact path="/credit-score" component={CreditScore} />
            <Route exact path="/order-confirm" component={OrderConfirm} />
            {/* <Route exact path="/order-process" component={OrderProcess} /> */}
            {/* <Route exact path="/order-reject" component={OrderReject} /> */}
            <Route exact path="/support" component={Support} />
            <Route exact path="/fine-print" component={finePrintComponen} />
            <Route exact path="/terms_condition" component={TermsCondition} />
            <Route exact path="/privacy_policy" component={PrivacyPolicy} />
            <Route exact path="/legal" component={Legal} />

            <Route exact path="/notification" component={Notification} />
            <Route exact path="/wish-list" component={WishList} />

            <Route exact path="/aadhar_verification" component={AadharVerififcation} />

            <Route exact path="/accomodation1" component={Accomodation1} />
            <Route exact path="/accomodation2" component={Accomodation2} />
            <Route exact path="/accomodation3" component={Accomodation3} />
            <Route exact path="/accomodation4" component={Accomodation4} />
            <Route exact path="/accomodation5" component={Accomodation5} />
            {/* <Route exact path="/virtual-no-card" component={VirtualNoCard} /> */}
            <Route exact path="/brand-landing" component={BrandLanding} />
            <Route exact path="/my-wishlist" component={MyWishlist} />
            <Route exact path="/quick-filter" component={QuickFilter} />
            <Route exact path="/compare-selected" component={CompareSelected} />
            <Route exact path="/plp-filter" component={PLPFilter} />
            <Route exact path="/plp-compare-enabled" component={CompareEnabled} />
            <Route exact path="/clp-electronics" component={ClpElectronics} />
            <Route exact path="/clp-education" component={ClpEducation} />
            <Route exact path="/virtualCard" component={virtualCard} />
            {/* <Route exact path="/paymentPlan" component={PaymentPlan} />
            <Route exact path="/amountLimit" component={VirtualCard1} />
            <Route exact path="/loanSummary" component={LoanSummary} /> */}
            <Route exact path="/choosePaymentType" component={ChoosePayment} />
            <Route exact path="/strideCard" component={StrideCard} />
            <Route exact path="/test" component={testComponent} />
            <Route exact path="/about" component={about} />
            <Route exact path="/how-it-works" component={howItWorks} />
            <Route exact path="/undergrad" component={undergrad} />
            <Route exact path="/for-merchant" component={forMerchant} />
            <Route exact path="/careers" component={careers} />
            <Route exact path="/sitemap" component={sitemap} />
            <Route exact path="/privacy" component={privacy} />
            <Route exact path="/disclaimer" component={disclaimer} />
            <Route exact path="/terms-of-use" component={termsOfUse} />
            <Route exact path="/specific-order-detail" component={SpecificOrderDetailsComponent} />
            
            <UploadManually />
            <Digilocker />
            <DocPreview />
            <PdfView />
          </Switch>
        </Router>


        <Videomodal/>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
