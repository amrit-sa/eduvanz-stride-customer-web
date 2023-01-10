import React from "react";
import PropTypes from 'prop-types';
import $ from 'jquery';
import { reduxForm, propTypes } from 'redux-form';
import Carousel from 'react-multi-carousel';
import ContentLoader from 'react-content-loader'
import 'react-multi-carousel/lib/styles.css';
import { favProduct } from "../actions/user";
import { asset } from "../common/assets";
import { getFavoriteProductCount } from "../actions/product";
import ProductBox from "./ProductBox";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


class SimilarProduct extends React.Component {

 

    getFavCount = () =>{
        const { sfid } = this.props;
        let data = {
            user_sfid :sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    productDetail(pid) {
        //  localStorage.setItem('product_id', pid);
        //this.props.pushPage('/product-details/' + pid)
        window.location = '/product-details/' + pid;
    }

    renderProductImg = (data) => {
        let row = [];
        if (data.image_url__c && data.image_url__c.length > 0 && data.image_url__c[0].base64) {
            row.push(<img key={`pro-img-${data.id}`} src={`data:image/png;base64,${data.image_url__c[0].base64}`} className="img-fluid" />);
        } else {
            if (data.product_sub_category__c && data.product_sub_category__c === "Laptop") {
                row.push(<img key={`pro-img-${data.id}`} src={asset + "images/products/lap-03.png"} className="img-fluid" />);
            } else if (data.product_sub_category__c && data.product_sub_category__c === "Mobile") {
                row.push(<img key={`pro-img-${data.id}`} src={asset + "images/products/mob-03.png"} className="img-fluid" />);
            } else if (data.product_sub_category__c && data.product_sub_category__c === "Tablet") {
                row.push(<img key={`pro-img-${data.id}`} src={asset + "images/products/tab-01.png"} className="img-fluid" />);
            } else if (data.product_sub_category__c && data.product_sub_category__c === "Television") {
                row.push(<img key={`pro-img-${data.id}`} src={asset + "images/products/tele01.png"} className="img-fluid" />);
            } else if (data.product_sub_category__c && (data.product_sub_category__c === "EV" || data.product_sub_category__c === "Two Wheelers")) {
                row.push(<img key={`pro-img-${data.id}`} src={asset + "images/products/bike01.png"} className="img-fluid" />);
            } else {
                row.push(<img key={`pro-img-${data.id}`} src={asset + "images/products/bike01.png"} className="img-fluid" />);
            }
        }
        return row;
    }

    render() {
        const { similarProd } = this.props;
        return (
            <>

                <section className="bg0 pt-5 pb-5 overflow-hidden electric similar-product">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2 d-flex mb-lg-4 mb-3 justify-content-between align-items-center">
                                <h3 className="section_title mb-0">You might also like</h3>
                                {/* <button className="link">View all <i className="fa fa-angle-right ml-2"></i></button> */}

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <Carousel responsive={responsive}>
                                    {similarProd && similarProd !== undefined && similarProd.length > 0 ? (
                                        similarProd.map((item, index) => (

                                            <ProductBox
                                                index={index}
                                                item={item}
                                                pushPage={this.props.pushPage}
                                                dispatch={this.props.dispatch}
                                                user={this.props.user}
                                                sfid={this.props.sfid}
                                                page={'clp'}
                                            ></ProductBox>


                                            /*<div  key={'item' + index} className="item d-flex flex-column">
                                                <button type="button" onClick={() => this.setFavourite(item.sfid, `fav-similar-item-${item.id}`)} id={`fav-similar-item-${item.id}`} className={`wish ${item.isFavorite?'active':''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <div onClick={() => this.productDetail(item.sfid)}>      
                                                <div className="img-box">
                                                <img src={item.image_url__c} className="img-fluid"/>
                                                    </div>    
                                                    <div className="top">
                                                        <p>{item.name.slice(0, 15)}</p>
                                                        <h4>
                                                        No Cost EMI 
                                                        <span className="d-block mb-3">Starting ₹{item.min_avi_emi__c} </span>
                                                        </h4>
                                                    </div>
                                                    
                                                </div>
                                            </div>*/
                                        ))

                                    ) : (
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

SimilarProduct.propTypes = {
    ...propTypes,
    pushPage: PropTypes.func,
    similarProd: PropTypes.any,
    user: PropTypes.any,
    sfid: PropTypes.any
}

export default reduxForm({ form: 'Similar-Products' })(SimilarProduct);