import React from "react";
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import ContentLoader from 'react-content-loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, favProduct } from "../actions/user";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
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

class TopProduct extends React.Component {


    render() {
        return (
            <>
                <section className="bg0 pt-lg-3 pb-lg-4 overflow-hidden top-products">
                        <div className="container">
                            <div className="row">
                                <div className="col mb-2">
                                    <h3 className="section_title mb-lg-4 mb-3">Popular &amp; Top-Rated Products</h3>
                                    <Carousel responsive={responsive}>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                        <div  className="item d-flex flex-column">
                                            <div className="img-box">
                                            <button  className="wish mt-2"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                <img src="images/products/revolt.jpg" className="img-fluid" />
                                            </div>
                                            <div className="bottom">
                                                <p>Lenovo Thinkpad</p>
                                                <h4>No Cost EMI <br/>Starting at ₹2,200 </h4>
                                            </div>
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                </section>
            </>
        )
    }
}


export default TopProduct;