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

class Disclaimer extends Component {

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
        const { user, profile, isLoading, sfid, history, username, isSearching, searchDet, favorite_count } = this.props;

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

                                <h2 className='mb-5'>EDUVANZ DISCLAIMER</h2>

                                <p>The contents of this Disclaimer along with the terms of the Terms and Conditions available at www.eduvanz.com are applicable to all hyperlinks under www.eduvanz.com. You hereby acknowledge of having read and accepted the same by use or access of this Website</p>
                                <h6>1.ABOUT EDUVANZ</h6>
                                <p>Eduvanz Financing Private Limited (EDUVANZ) is a non-banking financial corporation, engaged into the business of to carry on business of financing by lending and advancing money or giving credits on any terms or mode and with or without security to any person for educational or such associated or related purposes and to enter into guarantees, contracts of indemnity and surety ship of all kinds, to receive money on deposits or loan upon any terms, and to secure or guarantee in any manner and upon any terms the payment of any sum of money or the performance of any obligation by any person and to receive money on deposits, current account or otherwise with or without interest and to receive title deeds and other securities and to lend money and negotiate loans of every description in order to transact business as capitalist, promoters and financial and monetary agents along with giving any guarantee for the payment of money for the performance of any obligation or undertaking.</p>
                                <h6>2.USING THIS WEBSITE</h6>
                                <p>Any use of this Website would expressly mean that you irrevocably accept all the terms of this Disclaimer and Terms and Conditions specified at www.eduvanz.com. You understand that you are free to not accept the terms and conditions contained herein and the terms and conditions and in such event you are advised to not use or access this Website in any manner. Your use or access of this Website in any manner shall constitute an irrevocable acceptance of this Disclaimer.</p>
                                <p>Any person who is accessing or has accessed any information or data from this Website acknowledges and agrees that all proprietary rights, statutory or otherwise, in the information received by such person shall remain the exclusive property of EDUVANZ. Any reproduction, redistribution or transmission, for consideration or otherwise, of any such information contained in this Website is strictly prohibited and would constitute a breach of the laws of India.</p>
                                <p>This Website is not to be and should not be construed as purporting to offer or an invitation to offer. Further, this website is not to be and should not be construed as purporting to offer or inviting to offer any information or services to citizens of countries other than who are subject to the jurisdiction of and the laws of India. The User agrees that given the nature of the Internet, even though the Website is targeted to Indian residents only, it may be accessed in other parts of the world. If the User is not an Indian resident and yet uses the Website, he acknowledges, understands and agrees that he is doing so on his own initiative and at his own risk and that it is his responsibility (and not EDUVANZ's responsibility) to make sure that his use of the Website complies with all applicable local laws. If the User is not an Indian resident, by using this Website and/or submitting his personally identifiable information or any other information on the Website, he expressly consents to the transfer of such data to India, and to the processing of such data on EDUVANZ's Indian servers, where his data will be governed by Indian laws that may provide a level of data protection different from his country.</p>
                                <p>EDUVANZ does not provide any advice in this regard and shall not be liable to any person who enters into any business relationship with the entity whose name appears on this Website and/ or any other party based on any information accessed from this Website or uses such information or is accessing any information for any investment, company affairs, legal, tax or accounting advice or advice regarding the suitability or profitability of a security or investment. Any information on this Website must not be construed as legal/business/ investment advice, and the user should exercise due caution and/or seek independent advice before the user enters into any business relationship with any entity or enters into any investment or financial obligation based on any information provided on this Website.</p>

                                <h6>3.
                                    THIRD PARTY LINKS</h6>
                                <p>This website may contain links to other Websites or videos that may be belonged to and/or hosted and/or operated by parties other than EDUVANZ, for e.g. videos hosted by our third party service provider's server or any other similar activity. EDUVANZ is not responsible for the contents of any nature (including any related advertisements or videos) or information offered by any such linked Website or any link contained in a linked Website, or any changes or updates to such Websites, irrespective of whether these Websites are operated by affiliates of EDUVANZ or other third parties. Inclusion of such a link on this Website does not imply any degree of endorsement of any nature by EDUVANZ, regarding the quality of information provided or the nature of content by such a linked Website.</p>
                                <p>This Website may contain information sourced from third parties. EDUVANZ is not responsible for the contents of or information offered by such third parties on this Website. Inclusion of such information on this Website does not imply any degree of endorsement by EDUVANZ, regarding the quality of information provided or the nature of content provided by the third party.</p>

                                <h6>4.CONTENT</h6>
                                <p>EDUVANZ does not offer any services to any person through this Website. Access to any information on or through this Website is provided only on an 'as-is-where-is-basis'. EDUVANZ has endeavored to ensure that the content on this Website is accurate and up-to- date, however, the same should not be construed as a 'statement of law' or used for any legal purposes. In any event, you are advised to verify/check independently or with the respective source and obtain appropriate professional advice before acting on the information provided herein. Notwithstanding anything contained elsewhere, EDUVANZ accepts no responsibility in relation to the title of the projects listed or accuracy, completeness, usefulness or otherwise, of the contents provided on this Website.</p>
                                <p>The contents provided on this Website are only for information purposes and are not intended to be and must not be taken as the basis for any decision either by itself or in conjunction with any other information. You should make your own investigation of the contents provided, including the merits and risks involved and the legal consequences, independently and without reliance on us, any of our affiliates or group companies or our third party service providers or any third party associated with us in relation to the provision of any information through our Website or their respective directors, employees, agents. Nothing on this Website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal or financial matter you should consult an appropriate professional at your cost.</p>
                                <p>EDUVANZ may, either through itself or its partners, affiliates or group companies combine your internet protocol address or other information provided by you along with other personally identifiable information for marketing and for market research purposes, including internal demographic studies, so we can optimize our products and services and customize this Website for you. When you register with this Website, you agree that EDUVANZ or any of it's our partners, affiliate, or group companies may contact you from time to time to provide the offers/information of such products/services that they believe may benefit you, however it shall in no manner be construed as sanction of such product. Also, you agree that such information so collected from you may be provided to government authorities or any court of law as per the applicable laws of India or as per EDUVANZ agreement with its partners, third party service providers or any third party as the case may be.</p>
                                <p>EDUVANZ does not, expressly or impliedly, warrant, guarantee or make any representations concerning the use, results of use or inability to use or access the information or contents of this Website, in terms of accuracy, reliability, completeness, correctness, functionality, performance, continuity, timeliness or otherwise, fitness for a particular purpose. Any information or data available on this Website may contain inaccuracies and/or errors. EDUVANZ does not warrant that this Website or functions thereof will be uninterrupted or free of any error or defect or that information on this Website will satisfy your purpose or requirement. EDUVANZ does not warrant that the servers that make this Website available will be error, virus or bug free and you accept that it is your responsibility to make adequate provision for protection against such threats.</p>
                                <p>You assume the entire risk with respect to the use, results of such use, in terms of accuracy, reliability, performance, completeness, comprehensiveness, correctness, functionality, performance, continuity, timeliness of the information, data or any content available on this Website.</p>
                                <p>EDUVANZ disclaims any and all liability, current or future, for any error made or omission committed with respect to the transmission of data, information or material available on this Website.</p>
                                <h6>5.LIMITATIONS OF LIABILITY</h6>
                                <p>EDUVANZ will not be liable in relation to the contents of, or use of, or otherwise in connection with, this Website</p>
                                <p>a.   For any direct loss;

                                    b.   For any indirect, special or consequential loss or;

                                    c. For any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data;

                                    You hereby waive your right to any claim based on the detrimental effects or results of any reliance placed by you on any information or data available on this Website.

                                    EDUVANZ shall not be liable for any claims or losses of any nature, arising directly or indirectly, from the use or application of the data, information or material accessed from this Website. Any change or amendment to this disclaimer, altering any of the provisions set out herein, may be made at the sole discretion of EDUVANZ, without notice.

                                    The development of this Website with respect to the nature of the information or data available on this Website, is a continuous and ongoing process. EDUVANZ disclaims any and all liability and/or responsibility for loss of any information or data, or any consequence, intended or unintended, due to the operation of this Website. EDUVANZ does not assume or purport to assume any responsibility or liability or your failure or inability to use or access this Website for any purpose. Published information or data available on this Website may not be current or up to date for any purpose.</p>
                                <h6>6.TRADEMARK AND COPYRIGHT NOTICE</h6>
                                <p>Any and all trademarks and/or service marks of EDUVANZ (whether registered or in the process of registration) and all rights accruing from the same, statutory or otherwise, wholly vest with EDUVANZ. Any violation of the above would constitute an offence under the laws of India and international treaties governing the same.

                                    EDUVANZ, or any of its affiliates, does not represent or endorse the accuracy or reliability of any of the advertisements (collectively) i.e. links, downloads, distributions or other information accessed directly or indirectly from host advertisements contained on this Website nor the quality of any products, information or other materials displayed, purchased or obtained by any consumer, as a result of an advertisement or any other information or offer in connection with the service or products. EDUVANZ shall not be responsible for any errors or omissions contained within any third party advertisement contained within this Website. EDUVANZ expressly clarifies that it is not providing any "co- branding" and is not associated in any way with any of parties that may choose to advertise or otherwise in this Website.

                                    EDUVANZ expressly disclaims any and all warranties, expressed or implied, including without limitation, warranties of merchantability and fitness for a particular purpose, and non-infringement, with respect to the service or any materials and products.

                                    This Website may contain links to other web sites operated by third parties ("Allied sites"). EDUVANZ neither endorses nor is affiliated with the linked site and is not responsible for any content of any Allied site or any link contained in an Allied site, or any changes or updates to such sites.

                                    In no event shall EDUVANZ be liable for any damages, whatsoever, and in particular, shall not be liable for direct, indirect, consequential, incidental, or punitive damages, or damages of lost profits, loss of revenue, or loss of use, arising out of related to any advertisements on this Website, whether such damages arise in contract, negligence, tort, under statute, in equity, at law or otherwise. In particular EDUVANZ shall not be responsible for any threatening, defamatory, obscene, offensive or illegal content appearing in the advertisements and further shall not be responsible for any infringement of another's rights, including intellectual property rights.

                                    Except as otherwise noted on this Website, the contents of this Website are copyright of EDUVANZ. All rights of EDUVANZ are reserved. No part of the information on this Website, including text, graphics and HTML code, may be reproduced or transmitted in any form by any means, without the express written consent of EDUVANZ.</p>
                             <h6>7.LAW AND JURISDICTION</h6>
                            <p>These terms and conditions shall be governed in accordance with laws of India and any disputes arising out of or in connection with these terms and conditions shall be subject to exclusive jurisdiction of courts in Mumbai.</p>
                            <h6>8.THIRD-PARTY TRADEMARKS</h6>
                            <p>All third-party trademarks (including logos and icons) depicted or referenced on the website remain the property of their respective owners. Unless specifically identified as such, the use of third-party trademarks by Eduvanz does not indicate any relationship, sponsorship, or endorsement between Eduvanz and the owners of the trademarks. Any references by Eduvanz to third-party trademarks are to identify the corresponding goods and/or services and are considered as nominative fair use.</p>
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

export default connect(mapStateToProps)(Disclaimer);