import React from "react";
import Carousel from 'react-multi-carousel';
import ContentLoader from 'react-content-loader'
import 'react-multi-carousel/lib/styles.css';
import { asset } from "../common/assets";
import $ from 'jquery';
import { getProductByCategory, favProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import ProductBox from "../common/ProductBox";

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


class Upskilling extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            upskills_data: [],
            ip: ""
        }
    }

    componentDidMount() {
        const { sfid } = this.props
        let data = {
            sub_category_id: 9,
            user_sfid: sfid
        }
        this.props.dispatch(getProductByCategory(data)).then((response) => {
            if (response && response.data.length > 0) {
                this.setState({ upskills_data: response.data });
            }
        });
    }

    setFavourite(pid, id) {
        const { user, sfid } = this.props;
        if(sfid)
        {
            let data = {
                user_sfid: sfid,
                product_id: pid,
                device_id: this.state.ip
            }
            this.props.dispatch(favProduct(data)).then((response) => {
                if(response && response.status && response.status ==="success")
                {
                    this.getFavCount();
                    if($(`#${id}`).hasClass('active')) {
                        $(`#${id}`).removeClass('active');
                    }else{
                        $(`#${id}`).addClass('active');
                    }
                }
            });
        }else{
            this.props.pushPage('/login');
        }
    }

    getFavCount = () =>{
        const { sfid } = this.props;
        let data = {
            user_sfid :sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    productDetail(pid) {
        this.props.pushPage('/product-description/' + pid);
    }

    render() {
       
        return (
            <>
                <section className="bg0 pt-lg-3 pb-lg-3 overflow-hidden upskill-block">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2 upskilling">
                            <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel">
                            <h3 className="section_title mb-lg-4 mb-3">Upskilling Courses</h3>
                               <a href="products-list?category=Upskilling" className="text-decoration-none fs-14 font-weight-bold d-block">View All 
                               <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a>
                              
                             </div>
                                <Carousel responsive={responsive}>

                                     {this.state.upskills_data && this.state.upskills_data !== undefined && this.state.upskills_data.length > 0?(
                                        this.state.upskills_data.map((item, index) => (

                                            <ProductBox
                                            index = {index}
                                            item = {item}
                                            pushPage = {this.props.pushPage}
                                            dispatch = {this.props.dispatch}
                                            user = {this.props.user}
                                            sfid={this.props.sfid}
                                            page={'clp'}
                                            ></ProductBox>

                                     /*<div key={'item' + index} className="cursor-point p-3 item d-flex flex-column bg-pro rounded-4 electric">
                                                <div className="d-flex align-items-baseline justify-content-end">
                                                    
                                                    <button type="button" onClick={() => this.setFavourite(item.sfid, `fav-upskill-item-${item.id}`)} id={`fav-upskill-item-${item.id}`} className={`wish text-right mt-2 ${item.isFavorite?'active':''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                </div>
                                                <div onClick={() => this.productDetail(item.sfid)}>
                                               
                                                <div className="img-box">
                                                    <img src={item.image_url__c} className="img-fluid" />
                                                </div>
                                                <div className="top">
                                                <p className="mb-2">{item.name.slice(0, 15)}</p>
                                                    {item.no_cost_emi__c && <h4>
                                                        No Cost EMI
                                                        <span className="d-block">Starting at₹{item.min_avi_emi__c} </span>
                                                    </h4>}
                                                </div>
                                                </div>
                                     </div>*/
                                     ))
                                     ):(
                                        <ContentLoader viewBox="0 0 380 70">
                                            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                                            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                        </ContentLoader>
                                     )
                                    }

                                    {/* {this.state.upskills_data && this.state.upskills_data !== undefined && this.state.upskills_data.length > 0?(
                                        this.state.upskills_data.map((item, index) => (
                                            <div key={'item' + index} className="cursor-point p-3 item d-flex flex-column bg-pro rounded-4 electric">
                                            <div className="d-flex align-items-baseline justify-content-between">
                                                <p className="mb-2">{item.name.slice(0, 15)} </p>
                                                <button onClick={() => this.setFavourite(item.sfid, `fav-upskill-item-${item.id}`)} id={`fav-upskill-item-${item.id}`} className={`wish text-right mt-2 ${item.isFavorite?'active':''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                            </div>
                                            <div onClick={() => this.productDetail(item.sfid)}>
                                                <div className="top">
                                                    <h4>
                                                        No Cost EMI Starting
                                                        <span className="d-block mb-4">₹2,200 </span>
                                                    </h4>
                                                </div>
                                                 <div className="img-box">
                                                    <img src={`${item.image_url__c && item.image_url__c.length > 0 && item.image_url__c[0].base64 ? "data:image/jpg;base64," + item.image_url__c[0].base64 : asset+"images/products/up01.png"}`} className="img-fluid" />
                                                </div> 
                                            </div>
                                            </div>
                                        ))
                                     ):(
                                        <ContentLoader viewBox="0 0 380 70">
                                            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                                            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                        </ContentLoader>
                                     )
                                    } */}

                                    
                                </Carousel>
                            </div>
                        </div>
                    </div>
                      
                </section>
            </>
        )
    }
}

export default Upskilling;