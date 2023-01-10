import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader'
import { asset } from "../common/assets";
import ProfileSidebar from "../common/profile-sidebar";


class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
  }

  handleURL = () => {
    const { history} = this.props;
    const profileData  = this.props.profile.profile;
    
    if(profileData.first_name__c == 'Last'){
      history.push("/ed_custdetails");
    }else{
      history.push("/myaccount");
    }
  }



  render() {
    const { user, username, isSearching, searchDet, isLoading, favorite_list, sfid, favorite_count } = this.props
    const { productFound, productNotFound } = this.state
    // console.log(productFound,'ssssssssssssss')
    // console.log(productNotFound,'yeyeye')
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
        <div className="inner-page">
          <div className="container">
            <div className='row'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper pt-3'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Setting</a></li> 
                  </ul>
                </div>
              </div>
            </div>
            <div className="row mx-0 mt-lg-3 mb-3">
              <ProfileSidebar
                history={this.props.history}
                profile={this.props.profile}
                recentProd={this.props.searchHistory}
                user={this.props.user}
              />
              <div className='col-xl-9 col-lg-8'>

                <div className="row">


                  <div className="col-6">
                    <div className="setting-card w-95 account_box">
                      <h5 style={{ display: "flex", top: "10px" }}>
                        Accounts
                      </h5>
                      <p>Basic Details, KYC, Bank Details, Permissions</p>
                      <img src={asset + "images/account-setting-1.png"} alt="" className="setting-img" />
                      {/* <button type='button' onClick={() => this.props.history.push('/myaccount')} className='forward_btn tutu'> */}
                      <button type='button' onClick={this.handleURL} className='forward_btn tutu'>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                        </svg>
                      </button>
                    </div>
                  </div>



                  <div className="col-6">

                    <div className="setting-card w-95 account_box">
                      <h5>
                        Addresses
                      </h5>
                      <p>Save addresses for hassle free checkout</p>
                      <img src={asset + "images/account-setting-2.png"} alt="" className="setting-img" />

                      <button type='button' onClick={() => this.props.history.push('/user-address')} className='forward_btn tutu'>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="row mt-3">

                    <div className="col-6">

                      <div className="setting-card w-95 account_box">
                        <h5>
                          Fine Prints
                        </h5>
                        <p>Terms & Conditions, Data Privacy, Legal</p>
                        <img src={asset + "images/account-setting-3.png"} alt="" className="setting-img" />

                        <button type='button' onClick={() => this.props.history.push('/fine-print')} className='forward_btn tutu'>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.992617 7.15457L10.9277 7.15457L7.65905 10.5218C7.56593 10.6169 7.49202 10.7301 7.44158 10.8548C7.39114 10.9795 7.36517 11.1133 7.36517 11.2484C7.36517 11.3835 7.39114 11.5173 7.44158 11.642C7.49202 11.7667 7.56593 11.8799 7.65905 11.9751C7.84519 12.1657 8.097 12.2727 8.35947 12.2727C8.62194 12.2727 8.87375 12.1657 9.05989 11.9751L13.322 7.57419C13.6952 7.19208 13.906 6.67311 13.9082 6.13111C13.9034 5.59266 13.6928 5.07786 13.322 4.69826L9.05989 0.297358C8.96726 0.202604 8.85741 0.127573 8.73663 0.07655C8.61585 0.0255265 8.4865 -0.000490668 8.35596 -1.57271e-05C8.22541 0.000460168 8.09624 0.0274186 7.97581 0.0793205C7.85538 0.131221 7.74606 0.207051 7.65408 0.302476C7.5621 0.397903 7.48926 0.511059 7.43973 0.635482C7.3902 0.759905 7.36495 0.89316 7.36541 1.02764C7.36587 1.16212 7.39204 1.29518 7.44242 1.41924C7.4928 1.5433 7.56641 1.65592 7.65905 1.75068L10.9277 5.10764L0.992617 5.10764C0.729123 5.10764 0.47642 5.21547 0.290101 5.40741C0.103783 5.59935 -0.000889385 5.85967 -0.000889361 6.13111C-0.000889338 6.40255 0.103783 6.66287 0.290102 6.85481C0.47642 7.04674 0.729124 7.15457 0.992617 7.15457Z" fill="#000000" />
                        </svg>
                      </button>
                      </div>
                    </div>
                    <div className="col-6 w-95">

                    </div>
                  </div>
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

      </>
    );
  }

}
function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
  const { profile, recentProd } = state.user;
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
    sfid
  };
}

export default connect(mapStateToProps)(Setting);
