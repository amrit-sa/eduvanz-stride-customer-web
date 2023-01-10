import React, { Component } from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { catProductSearch, getCompareProducts } from "../../actions/product";
class Compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: null,
            subCategory: null,
            productData: {},
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selected !== this.props.selected) {
            this.setState({ productData: {} })
            this.initCompare()
        }

        const { category, subCategory, productData } = this.state
        if (category == null || subCategory == null) {

            if (Object.keys(productData).length > 0) {
                let firstobj = productData[Object.keys(productData)[0]]
                this.setState({ category: firstobj.product_category__c ? firstobj.product_category__c : '' })
                this.setState({ subCategory: firstobj.product_sub_category__c ? firstobj.product_sub_category__c : '' })
            }
        }
    }

    initCompare = () => {
        const { selected } = this.props
        console.log(selected, 'selected products! init')
        const row = selected && selected.length > 0 ? selected[0] : null;
        selected.forEach(item => {
            this.props.dispatch(getCompareProducts({ "sfid": item })).then((response) => {
                if (response) {
                    this.setState({ productData: { ...this.state.productData, [item]: response } });
                }
            });
        })

        this.setState({
            category: row && row.product_category__c ? row.product_category__c : null,
            subCategory: row && row.product_sub_category__c ? row.product_sub_category__c : null,
        });
    }

    componentDidMount() {

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#orignal').hide();
                $('#second').show();
            }
            else {
                $('#orignal').show();
                $('#second').hide();
            }
        });

        this.initCompare()
    }

    getKeySetForProducts = () => {
        const { productData } = this.state;
        const { selected } = this.props;
        const keyNames = new Set()

        for (let i = 0; i < selected.length; i++) {
            let s1 = productData[selected[i]].data.map(item => {
                return item.key
            })
            s1.forEach(item => keyNames.add(item))
        }
        return Array.from(keyNames);
    }
    getObjectKeyForProduct = (sfid, key) => {
        const { productData } = this.state;
        const { selected } = this.props;
        return (productData[sfid].data.filter(item => {
            return item.key === key && typeof item.value === 'string'
        }))[0]
        // return Array.from(keyNames);
    }

    render() {
        const { selected } = this.props
        const { category, subCategory, productData } = this.state
        console.log(selected, "from compare index")

        return (
            <>
                {/* banner */}



                <div className="pdesc-banner before-d-none">
                    <div className="inner-page">
                        <div className="container ">
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='breadCrumb_wrapper pt-3'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            {category && (<li><a href="#">{category}</a></li>)}
                                            {subCategory && (<li><a href="#">{subCategory}</a></li>)}
                                            <li>Compare Products</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className='inner-page'>

                    <div id="second" className='banner_fixed_top'>
                        <div className='compare-section'>
                            <table>

                                <thead className='table-white'>
                                    <tr>
                                        <th>
                                            <div className='addToCompareBox'>
                                                <p >Product Name</p>
                                            </div>
                                        </th>
                                        {Object.keys(productData).length === selected.length && (
                                            selected.map((item, index) => (
                                                <th key={`offer-${index}`} style={{ backgroundColor: "white" }}>
                                                    <div className='addToCompareBox' style={{ background: "white" }}>
                                                        <button type='button' onClick={() => {
                                                            this.props.handleRemoveCompare(item);
                                                            // this.initCompare()

                                                        }} className="close">
                                                            <img src="/images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                                        </button>
                                                        <div className='pro-img'>
                                                            <img src={productData[item].image_url__c} alt="upgard" className="img-fluid" />
                                                        </div>
                                                        <p>{productData[item].name.substring(0, 60)} ...</p>
                                                        <h6>
                                                            <small className='d-block mb-2'>EMI Starting ₹{productData[item].min_avi_emi__c}/month</small>
                                                        </h6>
                                                        <button type='button' onClick={() => this.props.handleBuy(item)} className='apply-btn small'>Buy Now</button>
                                                        {/* <p className='mt-3'>Stride Price ₹{productData[item].mrp__c} </p> */}
                                                    </div>
                                                </th>
                                            ))
                                        )}
                                        <th>
                                            <div className='addToCompareBox'>
                                                <button type='button' onClick={this.props.handleAddProduct} className='atc_btn'>
                                                    <span>+</span>
                                                    <p>Add to compare</p>
                                                </button>
                                            </div>
                                        </th>
                                        <th>
                                            <div className='addToCompareBox'>
                                                <button type='button' onClick={this.props.handleAddProduct} className='atc_btn'>
                                                    <span>+</span>
                                                    <p>Add to compare</p>
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                            </table>

                        </div>
                    </div>

                    <div className='container'>
                        <div className='row mb-4'>
                            <div className='col-12'>



                                <h4 className='mb-4'>Compare Products</h4>
                                <div className='compare-section'>
                                    <table>

                                        <thead id='orignal'>
                                            <tr>
                                                <th>
                                                    <div className='addToCompareBox'>
                                                        <p className='text-left'>Product Name</p>
                                                        <p className='text-left'>Offer Price</p>
                                                    </div>
                                                </th>
                                                {Object.keys(productData).length === selected.length && (
                                                    selected.map((item, index) => (
                                                        <th key={`offer-${index}`}>
                                                            <div className='addToCompareBox'>
                                                                <button type='button' onClick={() => {
                                                                    this.props.handleRemoveCompare(item);
                                                                    // this.initCompare()

                                                                }} className="close">
                                                                    <img src="/images/icons/icon-close2.png" alt="upgard" className="img-fluid" />
                                                                </button>
                                                                <div className='pro-img'>
                                                                    <img src={productData[item].image_url__c} alt="upgard" className="img-fluid" />
                                                                </div>
                                                                <p>{productData[item].name.substring(0, 60)} ...</p>
                                                                <h5>
                                                                    <small className='d-block mb-2'>EMI Starting</small>
                                                                    ₹{productData[item].min_avi_emi__c}/month
                                                                </h5>
                                                                <button type='button' onClick={() => this.props.handleBuy(item)} className='apply-btn'>Buy Now</button>
                                                                <p className='mt-3'>Stride Price ₹{productData[item].mrp__c} </p>
                                                            </div>
                                                        </th>
                                                    ))
                                                )}
                                                <th>
                                                    <div className='addToCompareBox'>
                                                        <button type='button' onClick={this.props.handleAddProduct} className='atc_btn'>
                                                            <span>+</span>
                                                            <p>Add to compare</p>
                                                        </button>
                                                    </div>
                                                </th>
                                                <th>
                                                    <div className='addToCompareBox'>
                                                        <button type='button' onClick={this.props.handleAddProduct} className='atc_btn'>
                                                            <span>+</span>
                                                            <p>Add to compare</p>
                                                        </button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {
                                                Object.keys(productData).length === selected.length && this.getKeySetForProducts().map((productkey, rowIndex) => (

                                                    <>
                                                        {productkey != 'COLOR' &&


                                                            <tr key={productkey}>
                                                                <td>{productkey == 'COLORS' ? 'COLOR' : productkey}</td>
                                                                {selected.map((item, index) => (
                                                                    typeof this.getObjectKeyForProduct(item, productkey).value === 'string' &&
                                                                    <td key={`${item}-${index}-${productkey}`}>{this.getObjectKeyForProduct(item, productkey).value}</td>
                                                                ))}
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        }
                                                    </>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }


}
Compare.propTypes = {
    ...propTypes,
    selected: PropTypes.any,
    handleRemoveCompare: PropTypes.func,
    handleBuy: PropTypes.func,
    handleAddProduct: PropTypes.func,
}

export default reduxForm({ form: 'Compare' })(Compare);