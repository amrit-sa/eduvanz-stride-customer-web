import React from "react";
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import ContentLoader from 'react-content-loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import $ from 'jquery';
import { favProduct, getBrandlanding } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import { asset } from "../common/assets";


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
        breakpoint: { max: 1024, min: 464 },
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



class SmartPhone20000 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mob_products: [],
            data: []
        }
    }
    componentDidMount() {
        let qr = new URLSearchParams(window.location.search);
        let br_name = qr.get("name");
        let branddata = { "brand": br_name }
        // this.props.dispatch(getBrandlanding(branddata))
        // .then((response)=>{
        // this.setState({ electronicbrand: response },()=>console.log(this.state.electronicbrand,"sub_category"));
        // }))

        this.props.dispatch(getBrandlanding(branddata)).then(
            (response) => {
                if (response) {
                    console.log(response, 'resp')
                }

                this.setState({ mba_date: response.data }
                    , () => {

                        for (let i = 0; i < this.state.mba_date.brandsubproduct?.length; i++) {

                            if (this.state.mba_date.brandsubproduct[i].title == "Mobile") {

                                this.setState({ mob_products: this.state.mba_date.brandsubproduct[i].data }, () => console.log(this.state.upskills_data, "upski"))

                            }
                        }
                    }

                );
            })
    }

    setFavourite(pid, id) {
        const { user, sfid } = this.props;
        if (sfid) {
            let data = {
                user_sfid: sfid,
                product_id: pid,
                device_id: this.state.ip
            }
            this.props.dispatch(favProduct(data)).then((response) => {
                if (response && response.status && response.status === "success") {
                    this.getFavCount();
                    if ($(`#${id}`).hasClass('active')) {
                        $(`#${id}`).removeClass('active');
                    } else {
                        $(`#${id}`).addClass('active');
                    }
                }
            });
        } else {
            this.props.pushPage('/login');
        }
    }

    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    productDetail(pid) {
        this.props.pushPage('/product-details/' + pid);
    }

    render() {
        return (
            <>
                {this.state.mob_products && this.state.mob_products !== undefined && this.state.mob_products.length > 0 &&
                    <section className="bg0 pt-lg-3 pb-lg-3 overflow-hidden mobile-category-block">
                        <div className="container">
                            <div className="row">
                                <div className="col mb-2 mobiles">
                                    <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel"><h3 className="section_title mb-lg-4 mb-3">Smartphone</h3><a href="#" className="text-decoration-none fs-14 font-weight-bold d-block">View All <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a></div>

                                    <Carousel responsive={responsive}>
                                        {this.state.mob_products.length > 0 ? (
                                            this.state.mob_products.map((item, index) => (
                                                <div key={'item' + index} className="cursor-point p-3 item d-flex flex-column bg-pro rounded-4 electric">
                                                    <div className="d-flex align-items-baseline justify-content-end">

                                                        <button type="button" onClick={() => this.setFavourite(item.sfid, `fav-mob-item-${item.id}`)} id={`fav-mob-item-${item.id}`} className={`wish text-right mt-2 ${item.isFavorite ? 'active' : ''}`}><i className="fa fa-heart-o" aria-hidden="true"></i></button>
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
                                                </div>
                                            ))
                                        ) : (
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
                }
            </>
        )
    }
}

export default SmartPhone20000;
