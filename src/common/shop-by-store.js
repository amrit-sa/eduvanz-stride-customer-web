import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from "../common/assets";
import { getStore } from "../actions/product";



const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 1680, min: 1099 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1099, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
      }
  };

  

class ShopByStore extends React.Component{

constructor(props){
 super(props);
 this.state= {
    allData:[],
 }
}

componentDidMount(){
    this.props.dispatch(getStore(3)).then((response) => {
        if (response.status == 'success') {
          //  let store = this.state.store
            this.setState({ allData: response.data })
            
        }
        console.log('storestore', this.state.allData)
    })
}

    render(){
      //  console.log(this.state.allData);
        return(
            <>
            <section className="bg0 pt-5 overflow-hidden shopbystore ">
                <div className="container">
                <div className="row">
                            <div className="col mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel">
                        <h3 className="section_title mb-lg-4 mb-3">Top Brands</h3>
                        {/* <a href="#" className="text-decoration-none fs-14 font-weight-bold d-block">Find Your Store <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a> */}
                    </div>
                        <Carousel responsive={responsive}>

                        {this.state.allData && this.state.allData.map((item, index)=>(
                            <div className="item">
                                <img src={item.icon} className="img-fluid"/>
                                <div className="store-name"> 
                                {/* {item.icon} */}
                                    <img src={item.icon} className="img-fluid"/>
                                </div>
                            </div>
                        ))}
                           

                            {/* <div className="item">
                                <img src={`${asset}images/products/sbs-02.png`} className="img-fluid"/>  
                                <div className="store-name">
                                    <img src={`${asset}images/products/jio-mart-logo.png`} className="img-fluid"/>
                                </div>
                                </div>
                            <div className="item">
                                <img src={`${asset}images/products/sbs-03.png`} className="img-fluid"/>  
                                <div className="store-name">
                                    <img src={`${asset}images/products/xbox-Logo.png`} className="img-fluid"/>
                                </div>
                                </div>
                            <div className="item">
                                <img src={`${asset}images/products/sbs-04.png`} className="img-fluid"/>  
                                <div className="store-name">
                                    <img src={`${asset}images/products/amazon-logo.png`} className="img-fluid"/>
                                </div>
                                </div>
                            <div className="item">
                                <img src={`${asset}images/products/sbs-01.png`} className="img-fluid"/>  
                                <div className="store-name">
                                    <img src={`${asset}images/products/amazon-logo.png`} className="img-fluid"/>
                                </div>
                                </div>
                            <div className="item">
                                <img src={`${asset}images/products/sbs-02.png`} className="img-fluid"/>  
                                <div className="store-name">
                                    <img src={`${asset}images/products/amazon-logo.png`} className="img-fluid"/>
                                </div>
                                </div>
                            <div className="item">
                                <img src={`${asset}images/products/sbs-03.png`} className="img-fluid"/>  
                                <div className="store-name">
                                    <img src={`${asset}images/products/amazon-logo.png`} className="img-fluid"/>
                                </div>
                                </div>
                            <div className="item">
                                <img src={`${asset}images/products/sbs-04.png`} className="img-fluid"/> 
                                <div className="store-name">
                                    <img src={`${asset}images/products/amazon-logo.png`} className="img-fluid"/>
                                </div>
                                 </div> */}
                        </Carousel>
                        </div>
                        </div>

                </div>
                 
              </section>
            </>
        )
    }
}

export default connect()(ShopByStore);