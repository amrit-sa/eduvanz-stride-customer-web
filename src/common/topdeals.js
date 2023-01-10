import React from "react";

class TopDeals extends React.Component{
    render(){
        return(
            <>
             <section className="bg0 p-t-23 p-b-30">
                <div className="container">
                    <div className="row">
                    <div className="p-b-10 col-md-6">
                        <h3 className="ltext-103 cl5 p-b-30">Top Deals for You</h3>
                    </div>
                    <div className="p-b-10 col-md-6 text-right">
                        <a href="#" className="text-right p-b-30">
                        All deals &amp; coupans
                        </a>
                    </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    <div className="col mb-1">
                        <div className="card h-100">
                        {/* Product image*/}
                        <img className="card-img-top" src="images/product1.png" alt="..." />
                        {/* Product details*/}
                        <div className="card-body p-4">
                            <div className="text-center">
                            {/* Product name*/}
                            <h3 className="fw-bolder text-left bold-block">Upto 50% Off</h3>
                            {/* Product price*/}
                            <p className="text-left bold-block">
                                Get your favorite gadgets at affordable price
                            </p>
                            </div>
                        </div>
                        {/* Product actions*/}
                        <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-right">
                            <a
                            href="#"
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                            <i className="lnr lnr-arrow-right-circle right-circle" />
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="col mb-1">
                        <div className="card h-100">
                        {/* Product image*/}
                        <img className="card-img-top" src="images/product2.png" alt="..." />
                        {/* Product details*/}
                        <div className="card-body p-4">
                            <div className="text-center">
                            {/* Product name*/}
                            <h3 className="fw-bolder text-left bold-block">Upto 50% Off</h3>
                            {/* Product price*/}
                            <p className="text-left bold-block">
                                Get your favorite gadgets at affordable price
                            </p>
                            </div>
                        </div>
                        {/* Product actions*/}
                        <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-right">
                            <a
                            href="#"
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                            <i className="lnr lnr-arrow-right-circle right-circle" />
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="col mb-1">
                        <div className="card h-100">
                        {/* Product image*/}
                        <img className="card-img-top" src="images/product2.png" alt="..." />
                        {/* Product details*/}
                        <div className="card-body p-4">
                            <div className="text-center">
                            {/* Product name*/}
                            <h3 className="fw-bolder text-left bold-block">Upto 50% Off</h3>
                            {/* Product price*/}
                            <p className="text-left bold-block">
                                Get your favorite gadgets at affordable price
                            </p>
                            </div>
                        </div>
                        {/* Product actions*/}
                        <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-right">
                            <a
                            href="#"
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                            <i className="lnr lnr-arrow-right-circle right-circle" />
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="col mb-1">
                        <div className="card h-100">
                        {/* Product image*/}
                        <img className="card-img-top" src="images/product2.png" alt="..." />
                        {/* Product details*/}
                        <div className="card-body p-4">
                            <div className="text-center">
                            {/* Product name*/}
                            <h3 className="fw-bolder text-left bold-block">Upto 50% Off</h3>
                            {/* Product price*/}
                            <p className="text-left bold-block">
                                Get your favorite gadgets at affordable price
                            </p>
                            </div>
                        </div>
                        {/* Product actions*/}
                        <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-right">
                            <a
                            href="#"
                            className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                            <i className="lnr lnr-arrow-right-circle right-circle" />
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </>
        )
    }
}

export default TopDeals;