import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios'
import $ from 'jquery';
import { favProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import { asset } from "../common/assets";


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


class BestSeller extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URI}best_seller`).then(res => {
            const data = res.data;
            this.setState({ data });
        }).catch(err => console.log(err))
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

    getFavCount = () =>{
        const { sfid } = this.props;
        let data = {
            user_sfid :sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

   
    productDetail(pid) {
        this.props.pushPage('/product-details/' + pid)
    }
    render() {
        console.log('this.state.datathis.state.data',this.state.data)
        return (
            <>
                <section className="bg0 pt-5 pb-5 overflow-hidden bestSeller bottom-after-image-seller">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2">
                           <div className="d-flex justify-content-between align-items-center mb-2 position-rel">
                               <h3 className="section_title mb-lg-4 mb-3" style={{marginTop:"40px"}}>Top Selling Products</h3>
                               {/* <a href="#" className="text-decoration-none fs-14 font-weight-bold d-block">View All 
                               <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a> */}
                              
                             </div>
                                <Carousel responsive={responsive}>

                                {this.state.data
                                    .map((item, index) =>
                                <div className="item" key={`best-seller-${index}`} >
                                    <div className="bestseller-header">
                                       
                                    <div className="top" onClick={() => this.productDetail(item.sfid)}>
                                        <p className="mb-1 fs-10">{item.name?item.name.slice(0, 15):''}</p>
                                        <h4>
                                            No Cost EMI<br/> Starting
                                                <span className=""> ₹2,200 </span>
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

export default BestSeller;