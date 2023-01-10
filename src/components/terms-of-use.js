import React, { Component } from 'react'
import Helmet from "react-helmet";
import '../my-sass.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from "../common/header";
import { asset } from "../common/assets";

import { addStoreRating, getStoreRating, getAccountProfile, getProfileById } from "../actions/user";
import { Chart, registerables } from 'chart.js'
import HeaderNew from '../common/headerNew';
import Footer from '../common/footer';


Chart.register(...registerables)

var CHART_1;
var CHART_2;

class TermsOfUse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            percent_value: 0,
            percent_value_2: 0,
            rating: 0,
            username: null,
            profile_data: {},
            morePlansOpen: false,
        }
    }
    async componentDidMount() {

        const { user, sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getStoreRating(data));
        this.handleLimitChart1(0);
        this.handleLimitChart2(0);
        if (user) {
            let obj = {
                user_sfid: sfid
            }
            this.props.dispatch(getAccountProfile(obj)).then((response) => {
                if (response.status === "success") {

                    this.setState({ userId: response.accountDet.id });
                }
            });
        }

    }


    componentDidUpdate(prevProps, prevState) {
        if (Object.keys(this.state.profile_data).length === 0) {
            if (Object.keys(prevProps.profile).length > 0) {
                this.setState({ profile_data: prevProps.profile })
                const { limit_percentage__c } = prevProps.profile.creditdata;
                this.setState({ percent_value: limit_percentage__c });
                const credit_score = Number(prevProps.profile.profile.bureau_score__c);
                const percent_val = parseInt(((credit_score - 300) * 100) / 600);
                this.setState({ percent_value_2: percent_val })


                CHART_1.destroy()
                this.handleLimitChart1(limit_percentage__c);

                CHART_2.destroy()
                this.handleLimitChart2(percent_val);

            }
        }

    }

   
    render() {
        const { user, profile, isLoading,  sfid, history, username, isSearching, searchDet, favorite_count } = this.props;

        // if (!sfid) {
        //     return <Redirect to="/login" />;
        // }
        let userdetails = profile && profile.profile ? profile.profile : ''
        let creditData = this.props.profile.creditdata

        return (
            <>

                <Helmet>
                    <title>About Us</title>
                </Helmet>
                {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
                {/* <Header
                    user={user}
                /> */}
                <HeaderNew
                    username={username ? username : ''}
                    user={user ? user : ''}
                    history={this.props.history}
                    isSearching={isSearching}
                    searchDet={searchDet}
                    sfid={sfid}
                    favorite_count={favorite_count}
                />

              
 <div class="aboutBox">
                            <div class="container">
                                <div class="row" style={{ paddingTop: '100px', paddingBottom: "100px" }}>
                                    <div class="col-lg-12">
                                    
                                        <h2 className='mb-5'>APPLICATION USE TERMS & CONDITIONS</h2>
                                        
                                        <p>This Terms and Conditions along with the disclaimer, Privacy Policy and all other terms and conditions as maybe amended and supplemented, from time to time ("Terms and Conditions"), constitutes a legally binding financial services end-user license agreement between Eduvanz Financing Private Limited ("Eduvanz") and you i.e. the visitor ("Visitor"/"I”/“me”/“us”) for using financial or other services of Eduvanz and sharing certain data through the website or the mobile application software or through any medium of communication including but not limited to e-mails, social media, messenger ("Application") or dashboard of associated institutes/manufacturers/lenders/third parties and its employees or representatives ("Institute") or dashboard of representatives of Eduvanz ("representative"). In addition to terms and conditions/policies/agreements of Eduvanz, the Visitor has also carefully read and fully understood and accepted the terms & conditions (as amended from time to time) imposed by the bank/financial institution (as determined in Edvanz’s sole discretion) who may provide the financial products or services to Visitor (“Lending Partner”).</p>
                                        <p>Terms defined herein shall have the same meaning though the Application.</p>
                                        <p>By checking the 'Submit' button below and by entering the one-time password (“OTP”) sent by Eduvanz, I hereby agree and acknowledge that I have read and understood the terms and conditions contained below:-</p>
                                        <h6>1.DECLARATION</h6>
                                        <p>1.1 If the Visitor does not agree with any of the Terms and Conditions, the Visitor must not access the Application. This Terms and Conditions constitutes a binding contract between the Visitor and Eduvanz with regard to the access and use of the Application.</p>
                                        <p>1.2 Eduvanz reserves the right to make any changes to the Terms and Conditions and the services offered to the Visitor ("Services"). Any changes to these Terms and Conditions will only be effective when posted on the Application, and the Visitor agrees to review this Terms and Conditions regularly to understand any changes.</p>
                                        <p>1.3 The Visitor agrees that this Terms and Conditions forms a valid contract between the Visitor and Eduvanz, and that Eduvanz may, at its sole discretion, amend any of the Services being provided by it vide the Application and/or this Terms and Conditions either wholly or partially, at any time and without the requirement of any prior notice or consent.</p>
                                        <p>1.4 The Visitor's use of certain Services, features, functionality or programs (including, without limitation, contests, sweepstakes, promotions, wireless marketing opportunities, RSS feeds, etc.) offered on or through the Application may be subject to additional terms and conditions, and before the Visitor uses any such Services, features, functionality or other programs he would be deemed to have accepted such additional rules upon the use of such Services or the Application in any manner.</p>
                                        <p>1.5 The Visitor expressly agrees that he will be deemed to have consented to the disclosure to, and use by, a subsequent owner or operator of the Application, of any information about the Visitor contained in the applicable Eduvanz database, to the extent Eduvanz assigns its rights and obligations regarding such information in connection with a merger, acquisition, or sale of all or substantially all of Eduvanz's assets, or in connection with a merger, acquisition or sale of all or substantially all of the assets related to this particular Application to a subsequent owner or operator. In the event of such a merger, acquisition, or sale, the Visitor's continuous use of the Application signifies the Visitor's agreement to be bound by the Policies or otherwise any new policy incorporated by the Application's subsequent owner or operator.</p>                        
                                        <p>1.6 Eduvanz reserves the right, in its sole discretion, to terminate the access to the Application and/or any of the Services or any portion thereof at any time, without any prior notice.</p>
                                        <p>1.7 The headings and subheadings herein are included for convenience and identification only and are not intended to describe, interpret, define or limit the scope, extent or intent of these Terms and Conditions or the right to use the Application by the Visitor as contained herein or any other section or pages of the Application in any manner whatsoever.</p>
                                        <p>1.8 The Terms and Conditions herein shall apply equally to both the singular and plural form of the terms defined. Whenever the context may require, any pronoun shall include the corresponding masculine and feminine. The words "include", "includes" and "including" shall be deemed to be followed by the phrase "without limitation". Unless the context otherwise requires, the terms "herein", "hereof", "hereto", "hereunder" and words of similar import refer to these Terms and Conditions as a whole.</p>
                                        <p>1.9 I have completed 18 years of age and a resident of India. I am competent to give present declaration & undertaking, submit the documents/details in digital mode for the purpose of availing the loan, and for all the purposes mentioned / required to be done for this.</p>
                                        <p>1.10 I declare that all the particulars, supporting documents and information provided by me at any time to Eduvanz are true, correct, complete and up-to-date in all respects and that I have not withheld/concealed any information whatsoever. Further, if any discrepancy is found or observed in the information or documents given by me/us, Eduvanz and Lending Partner shall have the sole discretion to cancel the sanction at any stage and recall the loan if already disbursed. I/We hereby undertake to indemnify Eduvanz for any loss of data in any electronic format any losses or damages that may arise on account on any material misstatement, misrepresentation, or gross negligence in providing the particulars, supporting documents and information therein.</p>
                                        <p>1.11 I agree that my action of entering the OTP sent by Eduvanz and clicking the “Submit” button constitutes a valid acceptance by me of the Terms contained herein and creates a binding and enforceable agreement between me and Eduvanz.</p>
                                        <p>1.12 I confirm that I have/had no insolvency proceedings against me nor have I ever been adjudicated insolvent by any court or other authority. Further, there has never been an award or an adverse judgement or decree in a court case involving breach of contract, tax malfeasance or other serious misconduct which shall adversely affect my/our ability to repay the loan; neither any criminal proceedings have been initiated and/or pending against me/us in any courts of India. I have never been a defaulter with Eduvanz and/or Lending Partner or any other financial institution.</p>
                                        <p>1.13 I authorize Eduvanz to exchange, share all information and details as provided by me and in relation to my existing loans and/or repayment history to any third party including but not limited to its group companies, service providers, banks, financial institutions, credit bureaus, telecommunication companies, statutory bodies, business partners etc. for customer verification, personalization of products or services, credit rating, data enrichment, marketing or promotion of Eduvanz services or related products or that of its associates/business partners and affiliates or for enforcement of your obligations and I shall not hold Eduvanz (or any of its group companies or its/their agents/representatives/ business partners) liable for the use/sharing of the information as stated above. Further, I/We authorize Eduvanz/Lending Partner or its agent to obtain my/our credit report from credit bureau agencies as recommended by NHB / Regulatory Authorities, Government of India, third party entities; to share information at periodical basis to credit bureaus, to make references, enquiries and obtaining information of this application which Eduvanz and/or Lending Partner considers necessary. I/We agree to indemnify Eduvanz and/or Lending Partner against any loss or damage (which Lending Partner may suffer) as a result of any action/claim raised by such institutions or any third party for making reference, conducting investigations and/or making disclosures in terms of this clause. I/we confirm that Do not Disturb (DND), if any, registered with telecom service providers, for the unsolicited communication referred in the “National Do Not Call Registry” (The “NDNC Registry”) laid down by TELECOM REGULATORY AUTHORITY OF INDIA LTD will not apply to any communication received for such purposes. I/We waive the privilege of Privacy & Privity of contract and such disclosure shall not amount to breach of any law, rule, regulation etc. in force. Eduvanz reserves the right to retain the photographs and documents submitted by me/us and will not return the same.</p>
                                        <p>1.14 I hereby expressly consent and authorise Eduvanz and Lending Partner and their representatives/agents/ business partners/ group companies/affiliates to send me/us updates or any communication regarding products/services offered by them using various communication channels, such as, telephone, calls/SMS/bitly/bots/emails/post etc.</p>
                                        <p>1.15 I understand and acknowledge that Eduvanz or the Lending Partner shall have absolute discretion, without assigning any reason to reject my application and Eduvanz and the Lending Partner shall not be responsible/liable in any manner whatsoever for such rejection. I/We confirm that I shall use the loan facility (or any part thereof) only for the purpose as mentioned in the loan Terms & Conditions and not for any improper/ illegal, speculative or anti-social or unlawful purpose /activities.</p>
                                        <p>1.16 I undertake to keep Eduvanz informed about any change/update in the information provided by me/us and undertake to inform Eduvanz and Lending Partner regarding any change in respect to my/our information submitted including change in address, income and telephone numbers etc. I/We agree that Eduvanz and/or Lending Partner shall be entitled to presume that any communication received by them through email ID / mobile number provided by me/us has been actually given by me/us and is genuine, valid & binding on me/us. Eduvanz and/or Lending Partner shall at no point of time be held liable & responsible to ensure or ascertain the validity of the said communication received through the said email ID / mobile Number. Eduvanz and/or Lending Partner may use external agencies to conduct credit & risk due diligence as well as document and field investigations and can share my personal data for the same.</p>
                                        <p>1.17 I further understand and agree that pursuant to the present form that, I will be required to submit documents to the satisfaction of Eduvanz and Lending Partner and accept the loan terms and conditions for availing the loan granted to me by Eduvanz and/or Lending Partner from time to time.</p>
                                        <p>1.18 Eduvanz and/or Lending Partner shall be under no obligation to refund the registration / upfront / processing / any other fee along with applicable taxes in any event. Further, no payment has or will be made either through cheque/cash or otherwise to any executive/DSA or person in his/her personal name for grant/processing of the loan.</p>
                                        <p>1.19 I/We hereby authorise Eduvanz and/or Lending Partner to receive my/our personal information from various sources including government repositories like Central KYC Registry, Digilocker etc, and also consent to receiving information from Central KYC Registry through SMS / e-mail on my/ our mobile number / email address as provided by me/us. I/we hereby consent and submit voluntarily at my/our own discretion and without coercion, the physical copies of my/our identification documents including Aadhaar card /e-Aadhaar / offline Aadhaar xml as issued by UIDAI (Aadhaar), with Eduvanz, Lending Partner and/or any Third Party to i) establish my identity / address proof, ii) enabling me/us to eSign the loan agreement and eSign the Mandate and authenticate my identity through the Aadhaar Authentication system (Aadhaar based e-KYC services of UIDAI) in accordance with the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 and the allied rules and regulations notified thereunder (Purpose). I/Our hereby explicitly authorise lender partner and any other third party appointed by lender partner (Third Party) to fetch and verify my information regarding Aadhaar Number, Aadhaar XML, Virtual ID, e-Aadhaar, Masked Aadhaar, Aadhaar details, demographic information, identity information, Aadhaar registered mobile number, face authentication details and/or biometric information (“Aadhaar Information”) from UIDAI for the Purpose as mentioned above. I/We agree to take all the necessary actions required for the purpose of authenticating and verifying my/our Aadhaar Information. I/We understand and agree that the consent and purpose of collecting Aadhaar has been explained to me/us in local language. Eduvanz and Lending Partner has informed me/us that my Aadhaar submitted herewith shall not be used for any purpose other than mentioned above, or as per requirements of law and would be stored by Eduvanz and Lending Partner. I/We give a valid, binding, irrevocable and explicit authorisation and consent as maybe required under applicable laws, rules, regulations and guidelines for availing the Aadhaar API services of Eduvanz and Lending Partner including, but not limited to the transmission and storage of my Aadhaar Information by Eduvanz and Lending Partner.</p>
                                        <p>1.20 I also agree that if I avail any loans through Eduvanz, I will not (i) use the proceeds thereof for any purpose other than as declared to Eduvanz or our lending partners, (ii) accept or attempt to receive the credit facility in the form of cash or any other means, (iii) use the Services in violation of applicable law or (iv) circumvent or attempt to circumvent the provisions of any terms that apply to me or act in a manner that is fraudulent, malicious or otherwise prejudicial Eduvanz’s reputation direct or indirect interests in relation to the Services.</p>
                                        <p>1.21 Eduvanz also has the right to report my details to CICs in the event that I have delayed repaying my loan instalment.</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                <Footer />
              </>
        )
    }
}


function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
    const { profile, recentProd, store_rating, userAddress, userId } = state.user;
    return {
        favorite_list,
        favorite_count,
        searchHistory,
        isSearching,
        searchDet,
        username,
        user,
        sfid,
        store_rating,
        recentProd,
        isLoading,
        profile,
    };
}

export default connect(mapStateToProps)(TermsOfUse);