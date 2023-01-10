import React from "react";
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from "../common/assets";


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


class Institutesnearyou extends React.Component {

    render() {
        const {univstNear} = this.props; 
        return (
            <>
                <section className="bg0 pt-5 overflow-hidden shopbystore">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h3 className="section_title mb-lg-4 mb-3">{univstNear!=''?univstNear:'Institutes near you'}</h3>
                                    <a href="#" className="text-decoration-none fs-14 font-weight-bold d-block">Find Your Store <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a>
                                </div>
                                <Carousel responsive={responsive}>
                                    <div className="item">
                                        <img src={asset+"images/instu_1.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/amity.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_2.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/kaizen.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_3.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/hampton.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_1.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/amity.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_2.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/kaizen.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_3.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/hampton.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_1.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/amity.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_2.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/kaizen.png"} className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <img src={asset+"images/instu_3.png"} className="img-fluid" />
                                        <div className="store-name">
                                            <img src={asset+"images/hampton.png"} className="img-fluid" />
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

export default connect()(Institutesnearyou);