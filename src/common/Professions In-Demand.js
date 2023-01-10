import React from "react";
import Carousel from 'react-multi-carousel';
import ContentLoader from 'react-content-loader'
import 'react-multi-carousel/lib/styles.css';
import { asset } from "../common/assets";
import $ from 'jquery';
import { getProductByCategory, favProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 991 },
        items: 3
    },
    mediumtab: {
        breakpoint: { max: 991, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


class ProfessionsinDemand extends React.Component {

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
                <section className="bg0 pt-lg-3 pb-lg-3 overflow-hidden upskill-block">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2 upskilling">
                            <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel">
                            <h3 className="section_title mb-lg-4 mb-3">Professions-In-Demand</h3>
                                 </div>
                              
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">

                        {/* <Carousel responsive={responsive}> */}
                                   <div className="row ">
                                    <div className="col-12 d-flex flex-row">
                                        <div className="col-3">
                                     <div className="profession-box">
                                        <span className="profession-text">Become a Product Manager</span>
                                     </div>
                                     </div>
                                     <div className="col-3">
                                     <div className="profession-box">
                                        <span className="profession-text">UX designer</span>
                                     </div>
                                     </div>
                                     <div className="col-3">
                                     <div className="profession-box">
                                        <span className="profession-text">Data Scientist</span>
                                     </div>
                                     </div>
                                     <div className="col-3">
                                     <div className="profession-box">
                                        <span className="profession-text">Marketing execution</span>
                                     </div>
                                     </div>
                                     
                                     </div>
                                     </div>
                                {/* </Carousel> */}
                            </div>
                        </div>
                    </div>
                      
                </section>
            </>
        )
    }
}

export default ProfessionsinDemand;