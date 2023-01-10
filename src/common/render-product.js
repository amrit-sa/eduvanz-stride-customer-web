import React from "react";
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import ContentLoader from 'react-content-loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { favProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import { asset } from "./assets";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1680 },
        items: 5
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

class RenderProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lap_products: [],
            ip: ""
        }
    }

    componentDidMount() {
        const { category } = this.props
        this.props.getProductByCategoryData(category).then((response) => {
            if (response && response.status === "success") {
                this.setState({ lap_products: response.data });
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
        const { card_name } = this.props
        return (
            <>
                <section className="bg0 pt-lg-5 pb-lg-3 overflow-hidden tablets render-product-block">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2">
                            <h3 className="section_title mb-lg-4 mb-3">{card_name?card_name:''}</h3>
                                <Carousel responsive={responsive}>
                                    {this.state.lap_products && this.state.lap_products !== undefined && this.state.lap_products.length > 0?(
                                        this.state.lap_products.map((item, index) => (
                                            <div key={'item' + index} className="cursor-point p-3 item d-flex flex-column bg-pro rounded-4 electric">
                                                 
                                                <div className="d-flex align-items-baseline justify-content-end">
                                                    <button onClick={() => this.setFavourite(item.sfid, `fav-laptop-item-${item.id}`)} id={`fav-laptop-item-${item.id}`} className={`wish text-right mt-2 ${item.isFavorite?'active':''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                                </div>
                                                <div className="img-box">
                                                    <img src={item.image_url__c} className="img-fluid" onClick={() => this.productDetail(item.sfid)}/>
                                                </div>
                                                <div onClick={() => this.productDetail(item.sfid)}>
                                                <div className="top">
                                                <p className="mb-2">{item.name.slice(0, 15)} </p>
                                                    {item.no_cost_emi__c && <h4>
                                                        No Cost EMI
                                                        <span className="d-block">Starting at₹{item.min_avi_emi__c} </span>
                                                    </h4>}
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

RenderProduct.propTypes = {
    ...propTypes,
    pushPage: PropTypes.func,
    getProductByCategoryData: PropTypes.func,
    user: PropTypes.any,
    sfid: PropTypes.any,
    card_name: PropTypes.any,
    category: PropTypes.any
}

export default reduxForm({ form: 'render-product' })(RenderProduct);