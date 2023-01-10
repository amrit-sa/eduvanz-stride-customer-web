import React from "react";
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import ContentLoader from 'react-content-loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, favProduct } from "../actions/user";
import Axios from 'axios';



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1680 },
        items: 5
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

class OurPresence extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
    }


    componentDidMount() {
      
    }



    render() {
        return (
            <>
                <section className="bg0 pt-5 pb-5 overflow-hidden our-presence">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2">
                                <h3 className="section_title mb-lg-4 mb-3">Our Presence</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 px-0">
                                <Carousel responsive={responsive}>
                                <div className="item d-flex flex-column">
                                        {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                        <div className="bottom">
                                            <h4>Lonavala</h4>
                                            <p><span className="d-block">No Cost EMI Starting ₹2,200 </span></p>
                                        </div>
                                        <div className="img-box">
                                            <img src="images/products/op01.jpg" className="img-fluid"/>
                                        </div>
                                    </div>
                                    <div className="item d-flex flex-column">
                                        {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                        <div className="bottom">
                                            <h4>Lonavala</h4>
                                            <p><span className="d-block">No Cost EMI Starting ₹2,200 </span></p>
                                        </div>
                                        <div className="img-box">
                                            <img src="images/products/op02.jpg" className="img-fluid"/>
                                        </div>
                                    </div>
                                    <div className="item d-flex flex-column">
                                        {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                        <div className="bottom">
                                            <h4>Lonavala</h4>
                                            <p><span className="d-block">No Cost EMI Starting ₹2,200 </span></p>
                                        </div>
                                        <div className="img-box">
                                            <img src="images/products/op03.jpg" className="img-fluid"/>
                                        </div>
                                    </div>
                                    <div className="item d-flex flex-column">
                                        {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                        <div className="bottom">
                                            <h4>Lonavala</h4>
                                            <p><span className="d-block">No Cost EMI Starting ₹2,200 </span></p>
                                        </div>
                                        <div className="img-box">
                                            <img src="images/products/op04.jpg" className="img-fluid"/>
                                        </div>
                                    </div>
                                    <div className="item d-flex flex-column">
                                        {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                        <div className="bottom">
                                            <h4>Lonavala</h4>
                                            <p><span className="d-block">No Cost EMI Starting ₹2,200 </span></p>
                                        </div>
                                        <div className="img-box">
                                            <img src="images/products/op05.jpg" className="img-fluid"/>
                                        </div>
                                    </div>
                                    <div className="item d-flex flex-column">
                                        {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                        <div className="bottom">
                                            <h4>Lonavala</h4>
                                            <p><span className="d-block">No Cost EMI Starting ₹2,200 </span></p>
                                        </div>
                                        <div className="img-box">
                                            <img src="images/products/op03.jpg" className="img-fluid"/>
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

OurPresence.propTypes = {
    ...propTypes,
    pushPage: PropTypes.func,
    user: PropTypes.any
}

export default reduxForm({ form: 'header' })(OurPresence);