import React, { Component } from "react"
import { connect } from 'react-redux';
import { customNotification } from "../actions/user";
import { asset } from "../common/assets"; 

class NotificationData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationData:[],
    };
  }
  

   componentDidMount() {
    const { sfid } = this.props
    let data = {
        user_sfid: sfid,
        }
     // console.log(sfid + "ddddddddddddddddddddddddd");  '001C30000033NzGIAU'  
    this.props.dispatch(customNotification(data)).then((response) => {
      if (response && response.status === "succes") {
     //   console.log(response + "  pppppppppppppp")
          this.setState({ notificationData: response.data });
      } else {
          this.setState({ notificationData: [] });
      }
  });

}


  render() {
    const { notificationData } = this.state
   //  console.log(this.state.notificationData + " mmmmmmmmmmmmmmmmmmmm");
   const  new_style ={height: '47%', width: '103%'  }
    return (
      <>
        
              {   
                        this.state.notificationData.length > 0 && this.state.notificationData.map((item, index)=>
                              (
          <div className="card border-0 rounded-4 mb-4 bg-active-nofication">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0 ">
                <div className="w-lg-110">
                  <img src={item.image__c} style={new_style} />
                </div>
              </div>
                   <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-9 col-7">
                    <div className="d-flex align-items-center mb-2">
                      {/* <img src={asset+"images/notification/truck_icon.png"} alt="" /> */}
                      <p className="font-weight-bold fs-14 ml-2 mb-0">{item.title}</p>
                    </div>
                    <p className="mb-1">{item.product_name} </p>
                    {/* <p className="fs-10">16h ago</p> */}
                  </div>
                  <div className="col-lg-3 text-right col-5">
                    <a className="btn btn-primary btn-button-signin px-lg-4 product_sfid" href={ `/product-details/${item.product_sfid}` } >View More</a>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
                              )
                        )
                      } 
             


           
        {/* <div className="card border-0 rounded-4 mb-4 bg-active-nofication">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/discount.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/tag_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Discount Alert</p>
                    </div>
                    <p className="mb-1">Up to 50% discount on education and electronics </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4 bg-active-nofication">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/tick.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/card_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Successful!</p>
                    </div>
                    <p className="mb-1">Your payment for order id ST71822D completed successfully. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/tick.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/card_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Successful!</p>
                    </div>
                    <p className="mb-1">Your payment for order id ST71822D completed successfully. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/alert.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/error_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Failed!</p>
                    </div>
                    <p className="mb-1">Your payment could not processed. Please try again in sometime. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 rounded-4 mb-4">
          <div className="card-body p-lg-4">
            <div className="d-lg-flex align-items-center">
              <div className="text-center mb-3 mb-lg-0">
                <div className="w-lg-110">
                  <img src={asset+'images/notification/alert.png'}  />
                </div>
              </div>
              <div className="w-100">
                <div className="row mx-0 mt-2">
                  <div className="col-lg-10 col-7">
                    <div className="d-flex align-items-center mb-2">
                      <img src={asset+"images/notification/error_icon.png"} alt="" />
                      <p className="font-weight-bold fs-14 ml-2 mb-0">Payment Failed!</p>
                    </div>
                    <p className="mb-1">Your payment could not processed. Please try again in sometime. </p>
                    <p className="fs-10">16h ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet } = state.product
  return {
    isSearching,
    isLoading,
    searchDet,
    username,
    user,
    sfid
  };
}

export default connect(mapStateToProps)(NotificationData);
