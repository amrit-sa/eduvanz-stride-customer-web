import React from "react";
import { connect } from 'react-redux';
import { asset } from "../common/assets";

class OfferAvailable extends React.Component{

    render(){
        return(
            <>
            {/* <section className="bg-grey-color pt-5 overflow-hidden">
                <div className="container">
                <div className="row">
                    <div className="col mb-2">
                        <h3 className="section_title mb-lg-4 mb-3">Offers Available</h3>
                    </div>
                    </div>
                  <div className="row">
                     <div className="col-lg-4">
                        <div className="d-flex oa_box align-items-center">
                            <div className="oa_img"><img src={`${asset}images/img1.png`} className="img-fluid"/></div>
                            <div className="oa_txt pl-3 pr-3">
                                <p className="mb-2">#summeroffers</p>
                                <h4 className="mb-3">50% off on Apple laptops Limited Sale</h4>
                                <span className="cat_tag">Electronics</span>
                            </div>
                         </div>
                     </div>
                     <div className="col-lg-4">
                        <div className="d-flex oa_box align-items-center">
                            <div className="oa_img"><img src={`${asset}images/img2.png`} className="img-fluid"/></div>
                            <div className="oa_txt pl-3 pr-3">
                                <p className="mb-2">#summeroffers</p>
                                <h4 className="mb-3">50% off on Apple laptops Limited Sale</h4>
                                <span className="cat_tag">Electronics</span>
                            </div>
                         </div>
                     </div>
                     <div className="col-lg-4">
                        <div className="d-flex oa_box align-items-center h-100">
                            <div className="oa_img"><img src={`${asset}images/img.png`} className="img-fluid"/></div>
                            <div className="oa_txt pl-3 pr-3">
                                <p className="mb-2">#summeroffers</p>
                                <h4 className="mb-3">50% off on Apple laptops Limited Sale</h4>
                                <span className="cat_tag">Electronics</span>
                            </div>
                         </div>
                     </div>
                </div>
                </div>
            </section> */}
            </>
        )
    }
}

export default connect()(OfferAvailable);