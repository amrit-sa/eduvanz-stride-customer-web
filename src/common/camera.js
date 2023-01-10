import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


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


class ProductCamera extends React.Component{

    render(){
        return(
            <>
            <section className="bg0 pt-5 pb-5 overflow-hidden electric">
                <div className="container">
                <div className="row">
                    <div className="col mb-2">
                        <h3 className="section_title mb-lg-4 mb-3">Cameras</h3>
                    </div>
                    </div>
                  <div className="row">
                     <div className="col-lg-12">
                        <Carousel responsive={responsive}>
                            <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                              
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-01.png" className="img-fluid"/>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-02.png" className="img-fluid"/>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                              
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-03.png" className="img-fluid"/>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                            
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-01.png" className="img-fluid"/>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                            
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-01.png" className="img-fluid"/>
                                </div>
                             </div>
                           
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                              
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-01.png" className="img-fluid"/>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                            
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/cam-01.png" className="img-fluid"/>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                            
                                <div className="top">
                                    <p>Fujifilm X-T200</p>
                                    <h4>
                                    No Cost EMI Starting
                                    <span className="d-block mb-4">₹2,200 </span>
                                    </h4>
                                </div>
                                <div className="img-box">
                                    <img src="images/products/lap-03.png" className="img-fluid"/>
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

export default connect()(ProductCamera);