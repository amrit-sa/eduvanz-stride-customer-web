import React from "react";
import ContentLoader from 'react-content-loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import $ from 'jquery';
// import { favProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import ProductBox from "../common/ProductBox";
// import { asset } from "../common/assets";

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

class CommonProducts extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lap_products: [],
        }
    }


    componentDidMount() {
        const {productList} = this.props;
        this.setState({ lap_products: productList.products })
    }

  

    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }


    render() {
        const {productList} = this.props;
        return (
            <>
                <section className="pt-lg-5 pb-lg-3 overflow-hidden laptop-catgory-block">
                    <div className="container">
                        <div className="row">
                            <div className="col mb-2 laptops">
                                <div className="d-flex justify-content-between align-items-center mb-2 shopby-after-bg-image position-rel"><h3 className="section_title mb-lg-4 mb-3">{productList && productList.title}</h3>
                                    <a href={`products-list?category=${productList.category_name}`} className="text-decoration-none fs-14 font-weight-bold d-block">View All <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a>
                                </div>
                                <Carousel responsive={responsive}>

                                    {this.state.lap_products && this.state.lap_products !== undefined && this.state.lap_products.length > 0 ? (
                                        this.state.lap_products.map((item, index) => (
                                            <ProductBox
                                            index = {index}
                                            item = {item}
                                            pushPage = {this.props.pushPage}
                                            dispatch = {this.props.dispatch}
                                            user = {this.props.user}
                                            sfid={this.props.sfid}
                                            page={'clp'}
                                            ></ProductBox>
                                   
                                        ))) : (
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

export default CommonProducts;