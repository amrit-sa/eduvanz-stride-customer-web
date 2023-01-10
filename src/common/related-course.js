import React from "react";
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from "./assets";
import ContentLoader from "react-content-loader";
import {favProduct} from "../actions/user";
import $ from "jquery";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 6
      },
      desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
  };


class RelatedCourse extends React.Component{

    constructor(props) {
        super(props);
    }

    setFavourite(pid, id) {
        const { sfid } = this.props;

        let data = {
            user_sfid: sfid,
            product_id: pid,
            device_id: ''
        }
        this.props.dispatch(favProduct(data)).then((response) => {
            if(response && response.status && response.status ==="success")
            {
                this.getFavCount();
                if($(`#${id}`).hasClass('active')) {
                    $(`#${id}`).removeClass('active');
                }else{
                    $(`#${id}`).addClass('active');
                }
            }
        });
    }

    render(){
        const {similarProd} = this.props
        console.log(similarProd,"SIMILAR PRODUCTS ON INSIDE")

        return(
            <>
            <section className="bg0 pt-5 pb-5 overflow-hidden related-course">
                <div className="container">
                <div className="row">
                    <div className="col mb-2 d-flex justify-content-between align-items-start">
                        <h3 className="section_title mb-lg-4 mb-3">You might also like</h3>
                        {/* <button className="link">View All</button> */}
                    </div>
                    </div>
                  <div className="row">
                     <div className="col-lg-12">
                        <Carousel responsive={responsive}>
                            {similarProd && similarProd !== undefined && similarProd.length > 0?(
                                similarProd.map((item, index) => (
                                    <div  key={'item' + index} className="item d-flex flex-column" style={{alignItems:"flex-end"}}>
                                        <button type="button" onClick={() => this.setFavourite(item.sfid, `fav-similar-item-${item.id}`)} id={`fav-similar-item-${item.id}`} className={`wish ${item.isFavorite?'active':''}`}><i className="fa fa-heart-o px-3 pt-1 pb-1" aria-hidden="true"></i></button>
                                        <div onClick={() => this.productDetail(item.sfid)}>
                                            <div className="img-box">
                                                <img src={item.image_url__c} className="img-fluid"/>
                                            </div>
                                            <div className="top">
                                                <p>{item.name.slice(0, 15)}</p>
                                                <h4>
                                                    No Cost EMI
                                                    <span className="d-block mb-3">Starting ₹2,200 </span>
                                                </h4>
                                            </div>

                                        </div>
                                    </div>
                                ))

                            ):(
                                <ContentLoader viewBox="0 0 380 70">
                                    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                                    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                </ContentLoader>
                            )
                            }
                        </Carousel>
                     </div>
                </div>



                </div>
              </section>
            </>
        )
    }

    productDetail(pid) {
        //  localStorage.setItem('product_id', pid);
        //this.props.pushPage('/product-details/' + pid)
        window.location='/product-details/'+pid;
    }
}

export default connect()(RelatedCourse);