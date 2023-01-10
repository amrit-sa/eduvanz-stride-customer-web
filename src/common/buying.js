import React from "react";

class Buying extends React.Component{
    render(){
        return(
           <>
            <section className="bg0 p-t-23 p-b-30">
                <div className="container">
                    <div
                    id="carouselExampleCaptions"
                    className="carousel slide"
                    data-ride="carousel"
                    >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src="images/slider1.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-md-block">
                            <div className="row">
                            <div className="col-md-6">
                                <h5>Buying with Eduvanz is as easy as abc</h5>
                                <h6>Fill your cart</h6>
                                <p className="p-b-30">
                                Shop your favorite stores and then select Eduvanz at checkout.
                                Enter a few pieces of information for a real-time decision.
                                </p>
                                <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                Get Started
                                </button>
                            </div>
                            <div className="col-md-6">
                                <img
                                src="images/slidersmall1.png"
                                className="right-slider-img"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="carousel-item">
                        <img src="images/slider1.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-md-block">
                            <div className="row">
                            <div className="col-md-6">
                                <h5>Buying with Eduvanz is as easy as abc</h5>
                                <h6>Fill your cart</h6>
                                <p className="p-b-30">
                                Shop your favorite stores and then select Eduvanz at checkout.
                                Enter a few pieces of information for a real-time decision.
                                </p>
                                <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                Get Started
                                </button>
                            </div>
                            <div className="col-md-6">
                                <img
                                src="images/slidersmall1.png"
                                className="right-slider-img"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="carousel-item">
                        <img src="images/slider1.jpg" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-md-block">
                            <div className="row">
                            <div className="col-md-6">
                                <h5>Buying with Eduvanz is as easy as abc</h5>
                                <h6>Fill your cart</h6>
                                <p className="p-b-30">
                                Shop your favorite stores and then select Eduvanz at checkout.
                                Enter a few pieces of information for a real-time decision.
                                </p>
                                <button className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                                Get Started
                                </button>
                            </div>
                            <div className="col-md-6">
                                <img
                                src="images/slidersmall1.png"
                                className="right-slider-img"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleCaptions"
                        role="button"
                        data-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleCaptions"
                        role="button"
                        data-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                </div>
                </section>

           </>
        )
    }
}

export default Buying;