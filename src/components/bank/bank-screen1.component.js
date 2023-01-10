import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { getAccountProfile, updateOneMoney, oneMoneyRequest } from "../../actions/user";

const UPLOAD_URL = process.env.REACT_APP_ONEMONEY_UPLOAD_URL;
const HIGHER_UPLOAD_URL = "/ed_after_upload";

class BankScreen1 extends Component {

    constructor() {
        super()
        this.state = {
            mobile: null,
            name: null,
            fipId:null,
            bankName: null,
            consentHandle: null,
            limit: null
        }
    }

    async componentDidMount()
    {
        const { user, selectedBank, sfid } = this.props;
        const baseElament = document.createElement("BASE");
        baseElament.setAttribute("href", "./edonemoney");
        document.head.appendChild(baseElament);
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `/js/onemoney-sdk.js`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
        let data = {
            user_sfid: sfid
        }
        await this.props.dispatch(getAccountProfile(data))
        .then((response) => {  
            if(response.status ==='success')
            {
                const accountDet = response.accountDet;
                this.setState({
                    mobile: accountDet.phone,
                    name: accountDet.first_name__c,
                    fipId: selectedBank.id,
                    bankName: selectedBank.name,
                    limit: accountDet.ipa_basic_bureau__c,
                });
            }
        });

        let objData = {
            mobile_no: this.state.mobile
        }
        const getData = await this.props.dispatch(oneMoneyRequest(objData));
        if(getData && getData.status == "success")
        {
            const data = getData && getData.data?getData.data:null
            const consent_handle = data && data.consent_handle?data.consent_handle:null
            this.setState({consentHandle: consent_handle});
            console.log("consent_handle", consent_handle);
        }
        await this.loadOneMoney();
    }

    loadOneMoney = () => {
            let onemoney = {};
            let isloaded = false;
            let consentHandle = this.state.consentHandle;
            console.log('Page is fully loaded');
            console.log(window.angularComponent, " window.angularComponent");
            console.log("mobile", this.state.mobile);
            console.log("name", this.state.name);
            console.log("fipId", this.state.fipId);
            console.log("bankName", this.state.bankName);
            /* onemoney.userMobileNumber = this.state.mobile;
            onemoney.consentHandle = "";
            onemoney.userName = this.state.name;
            onemoney.fipId = this.state.fipId;
            onemoney.bankName = this.state.bankName; */
            console.log("UPLOAD_URL", this.state.limit?HIGHER_UPLOAD_URL:UPLOAD_URL);
            onemoney.userMobileNumber = this.state.mobile;
            onemoney.consentHandle = "";
            onemoney.userName = this.state.name;
            onemoney.fipId = "ACME-FIP";
            onemoney.bankName = "Finshare Bank";
            onemoney.uploadURL = this.state.limit?HIGHER_UPLOAD_URL:UPLOAD_URL;
            onemoney.onemoneyKeys = {
              "organisationId": "RAM0336",
              "client_id": "fp_test_8ef21da1503744bc604868acb54cd3672ad8bf03",
              "client_secret": "e89381627de6c2f673b806e8e6eb311e75b7ff727e4b93de9d19980067ec337fc4a7433d",
              "appIdentifier": "com.lot0043.app",
              "identifierType": "MOBILE",
              "identifierValue": "",
              "baseURL": "https://app-uat.onemoney.in/",
              "companyColor": "#1251F1",
              "headerColor": "#D7F9FF"
            }
            window.angularComponent.onemoneySDKInit(onemoney);
           /*  window.addEventListener('load', (event) => {
               
          }); */
          window.addEventListener("onemoneySDK", async function (evt) {
              console.log('cycuyfufiiguiginnjhuyuh',JSON.stringify(evt.detail));
            if(evt.detail.message=='Pass consent handle'){
               /*  console.log("Old consentHandle", "b3ef4011-5ec4-4949-8b7c-57545a31351d");
                console.log("New consentHandle", consentHandle); */
              onemoney.consentHandle = consentHandle; //"b3ef4011-5ec4-4949-8b7c-57545a31351d";
               window.angularComponent.onemoneySDKRedirection();
             // window.angularComponent.onemoneySDKInit(onemoney);
              setTimeout( function() { 
                console.log("Reloaded SDK...")
                window.angularComponent.onemoneySDKInit(onemoney);
                isloaded = true;
              }, 5000);
            }
            if(evt.detail.message =="Consent Approved Successfully")
            {
                window.location = "/onemoney_success";
            }

            if(evt.detail.status =="Error Message")
            {
                window.location  = "/onemoney_faild";
            }
          }, false)
    }

  


    render() {
        const { selectedBank, user, isLoading } = this.props
        /* if(!selectedBank)
        {
           return <Redirect to={"/edonebanklist"}/>
        } */
        return (
            <>
            <Helmet>
                <title>Eduvanz | One Money </title>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
             ):''}
            </>
        )
    }
}

function mapStateToProps(state) {
    const { selectedBank } = state.user;
    const { user, isLoading, sfid } = state.auth;
    return {
        selectedBank,
        isLoading,
        sfid,
        user,
    };
}

export default connect(mapStateToProps)(BankScreen1)