import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import NotificationEmptyComponent from "./notification-empty.component";
import NotificationDataComponent from "./notification-data.component";
import ProfileSidebar from "../common/profile-sidebar";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification_data: true
    };
  }



  render() {
    const { user, username, isSearching, searchDet, isLoading } = this.props
    console.log(user);
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
        />
        <div className="inner-page">
          <div className="container">
            <div className='row'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper pt-3'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Notifications</a></li> 
                  </ul>
                </div>
              </div>
            </div>

           

            <div className="row mx-0 mt-lg-3 mb-3">
            
           
            <ProfileSidebar
                  history={this.props.history}
                  profile= {this.props.profile}
                  recentProd={this.props.recentProd}
                  user = {this.props.user}
              />
              <div className="col-lg-9 pr-lg-0">
                <h3 className="mb-3 noti">Notifications {this.state.notification_data ? (3) : ''} </h3>
                {!this.state.notification_data ? (<NotificationEmptyComponent />) : (
                  <NotificationDataComponent />
                )}
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
  const { isSearching, searchDet } = state.product;
  const { profile, recentProd } = state.user;
  return {
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

export default connect(mapStateToProps)(Notification);
