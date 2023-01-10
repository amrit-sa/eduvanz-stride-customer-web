import React, { Component } from "react";
import Helmet from "react-helmet";
import $ from 'jquery';
import { connect } from 'react-redux'
import HeaderNew from '../common/headerNew';
import Footer from "../common/footer";
import AboutUs from "../common/about";
import PdpLaptop from "../components/pdp-laptop";
import PdpElectronicsMobile from "../components/pdp-electronicsmobile";
import ProductDescriptionBike from "../components/product-description-bike";
import PdpEducation from "../components/pdp-education";
import PdpElectronicsTv from "../components/pdp-electronicstv";
import PdpElectronicsWatch from "../components/pdp-electronicswatch";
import PdpElectronicsXbox from "../components/pdp-electronicsxbox";
import PdpOthers from "../components/pdp-others";
import {  buyProduct, createTransApp, getProductById, getAccountProfile, updateViewedProduct, getViewedProduct } from "../actions/user";
import {storeIncome,sendIncomeData,sendSelfEmployementType} from "../actions/user"
import { updatePreviousPath } from "../actions/auth";
import PdpSchool from "./pdp-school";
import {getMasterCategory} from "../actions/product";
import PdpUniversity from "../components/pdp-university";
import PdpAccomodation from "../components/pdp-accomodation";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      allCategoryData: undefined,

      userData: null,
      proData: null,
      partnerData: null
    };
  }

  async componentDidMount() {
    const { product_id, user, sfid } = this.props;
    this.props.dispatch(getMasterCategory({"parent_id":"0"})).then((response) => {
      this.setState({allCategoryData: response})
      
    });
    let data = {
      user_sfid: sfid,
      sfid: this.props.id,
    }
    await this.props.dispatch(getProductById(data));
    window.scrollTo(0, 0)
    if(sfid)
    {
      let obj = {
        user_sfid: sfid
      }
      await this.props.dispatch(getAccountProfile(obj)).then((response)=>{
        if(response.status ==="success")
        {
            const getObj = response.accountDet;
            const partnerData = getObj && getObj.account_partner__c?getObj.account_partner__c:null;
            this.setState({userData: getObj, partnerData: partnerData});
        }
      });
    }
    let viewData = {
      user_id: this.props.sfid
    }
    // await this.props.dispatch(updateViewedProduct(viewData));
    await this.props.dispatch(getViewedProduct(viewData));

    $(window).scroll(function(){
      var hh = $('.wrap-menu-desktop').outerHeight();
      var st = $(window).scrollTop();
      var nav = $('.overall_');
      var sp;
      if (nav.length) {
        sp = nav.offset().top;
      }
      /* var sp = $('').offset().top; */

      if ((sp-st) < st){
        $('.overall_').addClass("sticky")
      }
      else{
        $('.overall_').removeClass("sticky")
      }
    })
    
  }
  handleClose = () => {
    this.setState({showPopup:false})
}
  handleProBuy = async () =>{
    const { history, id, user, dispatch, sfid } = this.props
    this.props.dispatch(buyProduct(id));
    console.log("userData", this.state.userData);
    console.log("sfid----------->", sfid);
    if(!sfid)
    {
      const path = window.location.pathname;
      dispatch(updatePreviousPath(path));
      history.push("/login");
    }else{
      const getObj = this.state.userData;
      const partnerDet = this.state.partnerData;
      const address = getObj && getObj.current_address_id__c?getObj.current_address_id__c:null;
      // if(getObj.account_status__c === "Full User"&& getObj.is_pan_confirm__c && getObj.is_photo_uploaded__c && getObj.is_address_document_uploaded__c)
      // getObj.ipa_basic_bureau__c = 270000000
      if(getObj.account_status__c === "Full User"&& getObj.ipa_basic_bureau__c)
        {
          let data = {
            product_sfid: id,
            user_sfid: sfid
          }
          // await this.props.dispatch(createTransApp(data));
          window.location = `/edplans?product=${id}`;
        }else{
        // else if(!getObj.email__c)
        // {
        //   history.push("/ed_custdetails");
        // }else if(getObj.pan_number__c && !getObj.pan_verified__c)
        // {
        //   history.push("/ed_pan_update");
        // }
        // else if(!getObj.pan_number__c)
        // {
        //   history.push("/ed_pan_update");
        // }else if(!getObj.is_qde_1_form_done__c)
        // {
        //   history.push("/ed_qdform");
        // }else if(partnerDet)
        // {
        //   history.push("/ed_coapplicant_details");
        // }else if(!getObj.ipa_basic_bureau__c && !getObj.pan_verified__c)
        // {
        //   history.push("/edreject");
        // }else if(!getObj.ipa_basic_bureau__c && getObj.pan_verified__c)
        // {
        //   history.push("/edonebanklist");
        // }else if(getObj.ipa_basic_bureau__c && !getObj.pan_verified__c)
        // {
        //   history.push("/edawaiting");
        // }else if(getObj.ipa_basic_bureau__c && getObj.pan_verified__c && !getObj.is_limit_confirm__c)
        // {
        //   history.push("/ed_limit");
        // }else if(!getObj.is_qde_2_form_done__c)
        // {
        //   history.push("/ed_salary");
        // }else if(!address)
        // {
        //   history.push("/ed_address");
        // }else if(!getObj.is_kyc_document_verified__c)
        // {
        //   history.push("/ed_doc_profile");
        // }else if(!getObj.is_bank_detail_verified__c)
        // {
        //   history.push("/edonebanklist");
        // }
        var dateString = getObj.date_of_birth_applicant__c
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            // alert(address)
            // debugger
            // getObj.ipa_basic_bureau__c =100000
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
         if(!getObj.email__c)
            {
              history.push("/ed_custdetails");
            }
            else if(!getObj.pan_number__c)
            {
              history.push("/ed_pan_update");
            }else if(!getObj.is_qde_1_form_done__c  || !getObj.date_of_birth_applicant__c || !getObj.approved_pin_code__c || !getObj.gender__c)
            {
              history.push("/ed_qdform");
            }
            
        
            else if( (!getObj.is_bank_detail_verified__c && !getObj.ipa_basic_bureau__c) || (age >= 21 && getObj.ipa_basic_bureau__c && !getObj.is_limit_confirm__c && !getObj.is_bank_detail_verified__c)){
              history.push("/ed_limit");
            }
            else if(age < 21 && !getObj.account_partner__c){
              history.push("/ed_coapplicant");
            }
            else if(age < 21 && getObj.account_partner__c){
              let data = {
                product_sfid: id,
                user_sfid: sfid
              }
              // await this.props.dispatch(createTransApp(data));
              window.location = `/edplans?product=${id}`;
            }
            else if(age >= 21  && !getObj.occupation__c)
            {
              history.push("/ed_salary");
            }else if(((getObj.occupation__c == "Salaried")&&(!getObj.employer_name__c || !getObj.monthly_income__c) && (age >= 21)))
            {
              this.props.dispatch(storeIncome(getObj.occupation__c || "Salaried"))
              this.props.dispatch(sendIncomeData(getObj))
              history.push("/ed_income_source");
            }else if((getObj.occupation__c =="Self-Employed-Professional" || getObj.occupation__c =="Self-Employed-Non Professional")&& (!getObj.employer_name__c  ||!getObj.industry || !getObj.monthly_income__c)&& (age >= 21)){
              this.props.dispatch(storeIncome(getObj.occupation__c))
              this.props.dispatch(sendSelfEmployementType(getObj.occupation__c))
              this.props.dispatch(sendIncomeData(getObj))
              history.push("/ed_income_source");
            }else if((getObj.occupation__c =="Retired")&& (!getObj.monthly_income__c)&& (age >= 21)){
              this.props.dispatch(storeIncome(getObj.occupation__c))
              this.props.dispatch(sendSelfEmployementType(getObj.occupation__c))
              this.props.dispatch(sendIncomeData(getObj))
              history.push("/ed_income_source");
            }
            else if(!getObj.resident_type__c && (age >= 21)){
              history.push("/ed_resident");
            }else if(getObj.resident_type__c == "Rented" && !getObj.rent_amount__c   && (age >= 21)){
              history.push("/ed_resident_details");
            }else if(!address && (age >= 21))
            {
              history.push("/ed_address"); //slide 19
            }
            //ed-doc
            else if(!getObj.is_photo_verified__c && (age >= 21 && getObj.ipa_basic_bureau__c && !getObj.is_limit_confirm__c && !getObj.is_bank_detail_verified__c)){
              history.push("/bank_screen5");
            }
            else if(!getObj.is_photo_verified__c && (age >= 21 && !getObj.ipa_basic_bureau__c && !getObj.is_bank_detail_verified__c)){
              history.push("/bank_screen5");
            }
            else if(!getObj.is_photo_verified__c && (age >= 21 && !getObj.ipa_basic_bureau__c && getObj.is_bank_detail_verified__c)){
              history.push("/ed_doc_profile");
            }
            else if(!getObj.is_photo_verified__c && (age >= 21 && getObj.ipa_basic_bureau__c && getObj.is_limit_confirm__c)){
              history.push("/ed_doc_profile");
            }
            else if(!getObj.is_photo_verified__c && (age >= 21 && getObj.ipa_basic_bureau__c && getObj.is_bank_detail_verified__c)){
              history.push("/ed_doc_profile");
            }
            // else if(!getObj.is_address_document_uploaded__c){
            //   history.push("/ed_digilocker");
            // }
            else if(getObj.is_photo_verified__c && !getObj.aadhaar_verified__c  && (age >= 21 && !getObj.ipa_basic_bureau__c && getObj.is_bank_detail_verified__c)){
              history.push("/ed_digilocker");
            }
            else if(getObj.is_photo_verified__c && !getObj.aadhaar_verified__c  && (age >= 21 && getObj.ipa_basic_bureau__c && getObj.is_limit_confirm__c)){
              history.push("/ed_digilocker");
            }
            else if(getObj.is_photo_verified__c && !getObj.aadhaar_verified__c  && (age >= 21 && getObj.ipa_basic_bureau__c && getObj.is_bank_detail_verified__c)){
              history.push("/ed_digilocker");
            }
            else if(getObj.is_photo_verified__c && getObj.aadhaar_verified__c && !getObj.is_pan_document_uploaded__c && (age >= 21 && !getObj.ipa_basic_bureau__c && getObj.is_bank_detail_verified__c)){
              history.push("/ed_doc_pan");
            }
            else if(getObj.is_photo_verified__c && getObj.aadhaar_verified__c && !getObj.is_pan_document_uploaded__c && (age >= 21 && getObj.ipa_basic_bureau__c && getObj.is_limit_confirm__c)){
              history.push("/ed_doc_pan");
            }
            else if(getObj.is_photo_verified__c && getObj.aadhaar_verified__c && !getObj.is_pan_document_uploaded__c && (age >= 21 && getObj.ipa_basic_bureau__c && getObj.is_bank_detail_verified__c)){
              history.push("/ed_doc_pan");
            }
            // else if(!getObj.is_nach_approved__c && getObj.ipa_basic_bureau__c && getObj.is_pan_document_verified__c && getObj.is_photo_verified__c && getObj.is_kyc_document_verified__c){
            //   history.push("/ed_select_bank");
            // }
            else if(!getObj.ipa_basic_bureau__c){
              this.setState({showPopup : true})
            }
            
            else if(!getObj.is_pan_document_verified__c || !getObj.is_photo_verified__c || !getObj.is_address_document_verified__c){
              this.setState({showPopup : true})
            }
        else 
        {
          let data = {
            product: id,
            user: user
          }
          // this.props.dispatch(createTransApp(data));
          window.location = `/edplans?product=${id}`;
        }
    }
  }
  }

  pushPage = (url) =>{
    this.props.history.push(url);
  }
  getCategoryAnywhere = (name , id) => {
    let arrComplete = this.state.allCategoryData.map(item=>item.sub_cat).flat()
    let data = arrComplete.filter(item=>item.category_id===id)[0]
    
    // let items = this.state.allCategoryData.filter(item=>{return item.category_name===parent})
    return data
  }
  render() {
    console.log("this.state.userDatathis.state.userData0",this.state.userData)
    const { user, faqs, learn, instructor, feedback } = this.props;
    const { product_search, favorite_count, sfid, username, product, isLoading, searchDet, isSearching, recentProd, similarProd } = this.props;
   
    return (
          <>
            <Helmet>
              <title>Product Details</title>
            </Helmet>
            {isLoading?(
            <div className="loading">Loading&#8230;</div>
            ):''}
            <HeaderNew
                username = {username?username:''}
                user = {user?user:''}
                history = {this.props.history}
                isSearching = {isSearching}
                searchDet = {searchDet}
                sfid={sfid}
                favorite_count={favorite_count}
            />
            {product && this.state.allCategoryData && (
              <>
              {product.category_id ===5?(
                  <PdpLaptop
                    user = {user?user:''}
                    pushPage = {this.pushPage}
                    sfid={sfid}
                    subcat_id={this.getCategoryAnywhere("Laptop" , 5)}
                    history = {this.props.history}
                    similarProd={similarProd}
                    recentProd={recentProd}
                    handleProBuy={this.handleProBuy}
                    handleClose = {this.handleClose}
                    showPopup= {this.state.showPopup}
                    product_search={product_search}
                    product={product}
                  />
              ):product.category_id ===6?(
                <PdpElectronicsMobile
                  user = {user?user:''}
                  subcat_id={this.getCategoryAnywhere("Mobile" , 6)}
                  history = {this.props.history}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  similarProd={similarProd}
                  handleClose = {this.handleClose}
                  showPopup= {this.state.showPopup}
                  recentProd={recentProd}
                  handleProBuy={this.handleProBuy}
                  product_search={product_search}
                  product={product}
                />
            ):(product.category_id ===16 || product.category_id ===4 || product.category_id ===15)?(
              <ProductDescriptionBike
                user = {user?user:''}
                subcat_id={this.getCategoryAnywhere("EV" , 16)}
                history = {this.props.history}
                pushPage = {this.pushPage}
                sfid={sfid}
                similarProd={similarProd}
                recentProd={recentProd}
                handleProBuy={this.handleProBuy}
                product_search={product_search}
                handleClose = {this.handleClose}
                showPopup= {this.state.showPopup}
                product={product}
              />
          ):product.category_id ===7?(
            <PdpElectronicsTv
              user = {user?user:''}
              pushPage = {this.pushPage}
              subcat_id={this.getCategoryAnywhere("Television",7)}
              history = {this.props.history}
              sfid={sfid}
              similarProd={similarProd}
              recentProd={recentProd}
              handleProBuy={this.handleProBuy}
              product_search={product_search}
              product={product}
              handleClose = {this.handleClose}
              showPopup= {this.state.showPopup}
            />
        ):product.category_id ===8?(
          <PdpElectronicsWatch
            user = {user?user:''}
            pushPage = {this.pushPage}
            subcat_id={this.getCategoryAnywhere("Smartwear",8)}
            history = {this.props.history}
            sfid={sfid}
            similarProd={similarProd}
            recentProd={recentProd}
            handleProBuy={this.handleProBuy}
            product_search={product_search}
            product={product}
            handleClose = {this.handleClose}
            showPopup= {this.state.showPopup}
          />
      ):product.category_id ==="XBox"?(
        <PdpElectronicsXbox
          user = {user?user:''}
          pushPage = {this.pushPage}
          sfid={sfid}
          similarProd={similarProd}
          subcat_id={this.getCategoryAnywhere("XBox")}
          history = {this.props.history}
          recentProd={recentProd}
          handleProBuy={this.handleProBuy}
          product_search={product_search}
          product={product}
          handleClose = {this.handleClose}
          showPopup= {this.state.showPopup}
        />
    ):product.category_id ===9?(
            <PdpEducation
              user = {user?user:''}
              pushPage = {this.pushPage}
              sfid={sfid}
              similarProd={similarProd}
              recentProd={recentProd}
              subcat_id={this.getCategoryAnywhere("Upskilling",9)}
              history = {this.props.history}
              handleProBuy={this.handleProBuy}
              product={product}
              faqs= {faqs}
              learn = {learn}
              instructor = {instructor}
              feedback = {feedback}
            />
    ):product.category_id ===12?(
                  <PdpEducation
                      user = {user?user:''}
                      pushPage = {this.pushPage}
                      sfid={sfid}
                      similarProd={similarProd}
                      recentProd={recentProd}
                      subcat_id={this.getCategoryAnywhere("Test Preparation",12)}
                      history = {this.props.history}
                      handleProBuy={this.handleProBuy}
                      product={product}
                      faqs= {faqs}
                      learn = {learn}
                      instructor = {instructor}
                      feedback = {feedback}
                  />
                  
              ):product.category_id ===10?(
                  <PdpSchool
                      user = {user?user:''}
                      pushPage = {this.pushPage}
                      sfid={sfid}
                      similarProd={similarProd}
                      subcat_id={this.getCategoryAnywhere("K-12",10)}
                      history = {this.props.history}
                      recentProd={recentProd}
                      handleProBuy={this.handleProBuy}
                
                product={product}
                      faqs= {faqs}
                      learn = {learn}
                      instructor = {instructor}
                      feedback = {feedback}
                  />
              ):product.category_id ===11?(
                <PdpUniversity
                    user = {user?user:''}
                    pushPage = {this.pushPage}
                    sfid={sfid}
                    similarProd={similarProd}
                    subcat_id={this.getCategoryAnywhere("University",11)}
                    history = {this.props.history}
                    recentProd={recentProd}
                    handleProBuy={this.handleProBuy}
                    product={product}
                    faqs= {faqs}
                    learn = {learn}
                    instructor = {instructor}
                    feedback = {feedback}
                />
                ):product.category_id ===14?(
                  <PdpAccomodation
                      user = {user?user:''}
                      pushPage = {this.pushPage}
                      sfid={sfid}
                      similarProd={similarProd}
                      subcat_id={this.getCategoryAnywhere("PG",14)}
                      history = {this.props.history}
                      recentProd={recentProd}
                      handleProBuy={this.handleProBuy}
                      product={product}
                      faqs= {faqs}
                      learn = {learn}
                      instructor = {instructor}
                      feedback = {feedback}
                  />
                  ):product.category_id ===13?(
                    <PdpAccomodation
                        user = {user?user:''}
                        pushPage = {this.pushPage}
                        sfid={sfid}
                        similarProd={similarProd}
                        subcat_id={this.getCategoryAnywhere("Hostel",13)}
                        history = {this.props.history}
                        recentProd={recentProd}
                        handleProBuy={this.handleProBuy}
                        product={product}
                        faqs= {faqs}
                        handleClose = {this.handleClose}
                        showPopup= {this.state.showPopup}
                        learn = {learn}
                        instructor = {instructor}
                        feedback = {feedback}
                    />
  
                
            ):(
              <PdpOthers
                  user = {user?user:''}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  subcat_id={this.getCategoryAnywhere(product.product_sub_category__c)}
                  history = {this.props.history}
                  similarProd={similarProd}
                  handleClose = {this.handleClose}
                  showPopup= {this.state.showPopup}
                  recentProd={recentProd}
                  handleProBuy={this.handleProBuy}
                  product={product}
                />
            )}
            
              <AboutUs/>
              <Footer />
              </>
            )}
          </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { product, product_search, userMessage, product_id, recentProd, similarProd, faqs, learn, instructor, feedback } = state.user;
  const { isSearching, searchDet, favorite_count } = state.product
  return {
      user,
      sfid,
      faqs,
      learn,
      product,
      username,
      feedback,
      instructor,
      isLoading,
      searchDet,
      product_id,
      userMessage,
      isSearching,
      recentProd,
      similarProd,
      favorite_count,
      product_search,
  };
}

export default connect(mapStateToProps)(ProductDetails);
