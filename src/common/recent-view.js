import React from "react";
import $ from 'jquery';
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ContentLoader from 'react-content-loader'
import { favProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import ProductBox from "../common/ProductBox";

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
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


class RecentView extends React.Component{



    getFavCount = () =>{
        const { sfid } = this.props;
        let data = {
            user_sfid :sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }
    
    productDetail(pid) {
          window.location='/product-details/'+pid;
    }

    renderProductImg = (data) =>{
        let row = [];
        if(data.image_url__c && data.image_url__c.length > 0 && data.image_url__c[0].base64)
        {
            row.push(<img key={`recent-pro-img-${data.id}`} src={`data:image/png;base64,${data.image_url__c[0].base64}`} className="img-fluid"/>);
        }else{
            if(data.category && data.category ==="Laptop")
            {
                row.push(<img key={`recent-pro-img-${data.id}`} src={asset+"images/products/lap-03.png"} className="img-fluid"/>);
            }else if(data.category && data.category ==="Mobile")
            {
                row.push(<img key={`recent-pro-img-${data.id}`} src={asset+"images/products/mob-03.png"} className="img-fluid"/>);
            }else if(data.category && data.category ==="Tablet")
            {
                row.push(<img key={`recent-pro-img-${data.id}`} src={asset+"images/products/tab-01.png"} className="img-fluid"/>);
            }else if(data.category && data.category ==="Television")
            {
                row.push(<img key={`recent-pro-img-${data.id}`} src={asset+"images/products/tele01.png"} className="img-fluid"/>);
            }else if(data.category && (data.category ==="EV" || data.category ==="Two Wheelers"))
            {
                row.push(<img key={`recent-pro-img-${data.id}`} src={asset+"images/products/bike01.png"} className="img-fluid"/>);
            }else{
                row.push(<img key={`recent-pro-img-${data.id}`} src={asset+"images/products/bike01.png"} className="img-fluid"/>);
            }
        }
        return row;
    }

    render(){
        const { recentProd } = this.props;
        return(
            <>
            <section className="bg0 pt-5 pb-5 overflow-hidden electric similar-product">
                <div className="container">
                <div className="row">
                    <div className="col mb-2 d-flex mb-lg-4 mb-3 justify-content-between align-items-center">
                        <h3 className="section_title mb-0">Recently Viewed</h3>
                        {/* <button className="link">View all <i className="fa fa-angle-right ml-2"></i></button> */}
                    </div>
                    </div>
                  <div className="row">
                     <div className="col-lg-12">
                        <Carousel responsive={responsive}>

                        {recentProd && recentProd !== undefined && recentProd.length > 0?(
                                        recentProd.map((item, index) => (
                                            <>
                                            {
                                                item &&<><ProductBox
                                                index = {index}
                                                item = {item}
                                                pushPage = {this.props.pushPage}
                                                dispatch = {this.props.dispatch}
                                                user = {this.props.user}
                                                sfid={this.props.sfid}
                                                page={'clp'}
                                                ></ProductBox>{/*<div key={'item' + index} className="item d-flex flex-column">
                                                <button onClick={() => this.setFavourite(item.sfid, `fav-recent-item-${item.id}`)} id={`fav-recent-item-${item.id}`} className={`wish ${item.isFavorite?'active':''}`} ><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <div onClick={() => this.productDetail(item.sfid)}>
                                                    <div className="img-box">
                                                        <img src={item.image_url__c} className="img-fluid"/>
                                                    </div>
                                                    <div className="top">
                                                        <p>{item.name}</p>
                                                        <h4>
                                                            No Cost EMI
                                                            <span className="d-block mb-3">Starting ₹{item.min_avi_emi__c} </span>
                                                        </h4>
                                                    </div>

                                                </div>
                                            </div>*/}</>
                                            }
                                            </>


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
}

RecentView.propTypes = {
    ...propTypes,
    pushPage: PropTypes.func,
    recentProd: PropTypes.any,
    user: PropTypes.any,
    sfid: PropTypes.any
}

export default reduxForm({ form: 'Recent-Products' })(RecentView);