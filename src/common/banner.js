import React from "react";

class Banner extends React.Component{
    render(){
        return(
            <>
            <div className="sec-banner margin-main-top">
                <div className="container">
                  <div className="row">
                    <div className="col-md-2 col-xl-2 p-b-30">
                      <div className="img-icon-div text-center">
                        <img src="images/icons/icon4.png" alt="icon4" />
                        <h6 className="text-center">Store</h6>
                      </div>
                    </div>
                    <div className="col-md-2 col-xl-2 p-b-30">
                      <div className="img-icon-div text-center">
                        <img src="images/icons/icon2.png" alt="icon2" />
                        <h6 className="text-center">Payments</h6>
                      </div>
                    </div>
                    <div className="col-md-2 col-xl-2 p-b-30">
                      <div className="img-icon-div text-center">
                        <img src="images/icons/icon3.png" alt="icon3" />
                        <h6 className="text-center">Card</h6>
                      </div>
                    </div>
                    <div className="col-md-2 col-xl-2 p-b-30">
                      <div className="img-icon-div text-center">
                        <img src="images/icons/icon1.png" alt="icon1" />
                        <h6 className="text-center">Rewards</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
        )
    }
}

export default Banner;