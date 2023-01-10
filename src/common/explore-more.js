import React from "react";
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios'
import { asset } from "../common/assets";
import $ from 'jquery';
import { favProduct } from "../actions/user";
import ContentLoader from 'react-content-loader'
import {getShopByCategory,getFavoriteProductCount} from "../actions/product";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 5
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


class ExploreMore extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            ip : ""
        }
    }


    componentDidMount() {
        
        let data = {
            "category": this.props.category
        }
        this.props.dispatch(getShopByCategory(data)).then((response) => {
            this.setState({data: response.data})
        });
    }

   
    productDetail(category) {
         window.location = "/products-list?category="+category
        // window.location = '/product-details/' + pid
        // this.props.pushPage('/product-details/' + pid)
    }
    render() {
        const {cateTextName} = this.props;
        return (
            <>
                <section className="pb-5 overflow-hidden bg-exploreMore exploreMore exploremore-after-images s">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2 television" >
                                <div className="d-flex justify-content-between align-items-center mb-2 position-rel">
                                    <h3 className="section_title mb-lg-4 mb-3">Shop by Category</h3>
                                    {/* <a href="#" className="text-decoration-none fs-14 font-weight-bold d-block">View All
                                        <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold"
                                           aria-hidden="true"></i></a> */}

                                </div>

                                <Carousel responsive={responsive}>
                                    {this.state.data.map(item=>(
                                        <div key={item.id} className="item d-flex flex-column">
                                            
                                            <div tab="0" onClick={() => this.props.history.push("/products-list?category="+item.category_name)}>
                                            <div className="img-box">
                                            
                                                <img src={item.category_image} className="img-fluid"/>
                                            </div>
                                            </div>
                                            <div className="bottom">
                                            
                                                <h6>{item.category_name}</h6>
                                                {/* <h4>No Cost EMI Starting
                                                    <span className="d-block mb-4">₹2,200 </span>
                                                </h4> */}
                                                </div>
                                            </div>
                                        
                                    ))}

                                </Carousel>
                            </div>
                        </div>
                    </div>

                </section>
            </>
        )
    }
}

export default connect()(ExploreMore);