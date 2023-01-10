import React from "react";
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { asset } from "../common/assets";
import $ from 'jquery';
import { favProduct } from "../actions/user";
import {getBestDeals , getBestDealsbyId} from "../actions/product";
import {
    getLargeProduct,
    getLongSmallSmallProduct,
    getMidLongProduct,
    getProductsJSX
} from "../helpers/DealLayoutGenerator";
import { history } from "../helpers/history";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
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
class TopDeal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products:[]
        };

    }


    componentDidMount() {
        const {cat_id} = this.props;
        if(cat_id != null){
            
            this.props.dispatch(getBestDealsbyId(cat_id)).then((response)=>{
                this.setState({products:response})
            });            
        }
        else{

            this.props.dispatch(getBestDeals()).then((response)=>{
                this.setState({products:response})
            });
        }
    }
    productDetail(pid) {
        if(this.props.pushPage){
            this.props.pushPage('/product-details/' + pid)
        }
        else{
            history.push('/product-details/' + pid);
        }
        //this.props.pushPage('/product-details/' + pid)
    }
    setFavourite(pid, id) {
        const { user, sfid } = this.props;
        if(sfid)
        {
            let data = {
                user_sfid: sfid,
                product_id: pid,
                device_id: ''
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
    render() {
        return (
            // <>
            //     {this.state.products && <section className="bg0 pt-3 pb-5 overflow-hidden top-deal">
            //         <div className="container pl-3">
            //             <div className="row">
            //                 <div className="col">
            //                     <h3 className="section_title mb-lg-4 mb-3">
            //                         Best Deals
            //                     </h3>
            //                     <div className="topdeal_wrapper">
            //                         <ul className="d-flex topdeal list-unstyled">
            //                             {getProductsJSX(this.state.products)}
            //                         </ul>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>


            //         <div className="container">
            //             <div className="col d-flex  justify-content-end">
            //                 <div className="cont">
            //                     {/* <p><input type="text" id="amount"/></p> */}
            //                     <div id="slider-range-max2"></div>
            //                 </div>
            //             </div>
            //         </div>
            //     </section>}
            // </>
            <>
                <section className="bg0 pt-5 pb-5 overflow-hidden bestSeller bottom-after-image-seller">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2">
                           <div className="d-flex justify-content-between align-items-center mb-2 position-rel">
                                 <h3 className="section_title mb-lg-4 mb-3"  style={{marginTop:"40px"}}>
                                     Best Deals
                                 </h3>
                              
                             </div>
                                <Carousel responsive={responsive}>

                                {this.state.products
                                    .map((item, index) =>
                                <div className="item" key={`best-seller-${index}`} >
                                    <div className="bestseller-header">
                                       
                                    <div className="top" onClick={() => this.productDetail(item.sfid)}>
                                        <p className="mb-1 fs-10">{item.name?item.name.slice(0, 15):''}</p>
                                        <h4>
                                            No Cost EMI<br/> Starting
                                                <span className=""> ₹{item.price__c} </span>
                                        </h4>
                                    </div>
                                    <div className="wishlist">
                                    {/* <button type="button" onClick={() => this.setFavourite(item.sfid, `fav-laptop-item-${item.id}`)} id={`fav-laptop-item-${item.id}`}  className={`wish ${item.isFavorite?'active':''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                    </div>
                                    
                                    </div>
                                    <div className="bestseller-footer" onClick={() => this.productDetail(item.sfid)}>
                                        <button className="brand_icon"><img src={`images/store/apple_logo.png`}/></button>

                                        <div className="img-box">

                                            {/* <img src={`${item.image_url__c && item.image_url__c.length > 0 && item.image_url__c[0].base64 ? "data:image/png;base64," + item.image_url__c[0].base64 : asset+"images/products/bs-03.png"}`} className="img-fluid" /> */}
                                            <img src={`${item.image_url__c ? item.image_url__c  : asset+"images/products/bs-03.png"}`} className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                                            )
                                    }
                                   
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default connect()(TopDeal);