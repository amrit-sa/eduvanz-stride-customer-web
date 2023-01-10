import React from "react";

class Client extends React.Component{
    render(){
        return(
           <>
            <section className="bg0 p-t-23 p-b-30">
                <div className="container">
                    <div className="row">
                    <div className="p-b-10 col-md-6">
                        <h3 className="ltext-103 cl5 p-b-30">Featured Stores</h3>
                    </div>
                    <div className="p-b-10 col-md-6 text-right">
                        <a href="#" className="text-right p-b-30">
                        All stores
                        </a>
                    </div>
                    </div>
                    <div className="row justify-content-center">
                    <div className="container">
                        <div className="row blog">
                        <div className="col-md-12">
                            <div
                            id="blogCarousel"
                            className="carousel slide"
                            data-ride="carousel"
                            >
                            <ol className="carousel-indicators">
                                <li
                                data-target="#blogCarousel"
                                data-slide-to={0}
                                className="active"
                                />
                                <li data-target="#blogCarousel" data-slide-to={1} />
                            </ol>
                            {/* Carousel items */}
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image1.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image2.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image3.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image4.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image5.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image6.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                </div>
                                {/*.row*/}
                                </div>
                                {/*.item*/}
                                <div className="carousel-item">
                                <div className="row">
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image1.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image2.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image3.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image4.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image5.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                    <div className="col-md-2">
                                    <a href="#">
                                        <img
                                        src="images/client/image6.png"
                                        alt="Image"
                                        style={{ maxWidth: "100%" }}
                                        />
                                    </a>
                                    </div>
                                </div>
                                {/*.row*/}
                                </div>
                                {/*.item*/}
                            </div>
                            {/*.carousel-inner*/}
                            </div>
                            {/*.Carousel*/}
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

export default Client;