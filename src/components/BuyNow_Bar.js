import React from "react";
import { asset } from '../common/assets';
import { favProduct, getSimilarProduct, getSelectedProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import $ from "jquery"
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Modal} from "react-bootstrap"



export default class BuyNow_Bar extends React.Component {

    constructor(props) {
        super(props)

    }

     setFavourite(pid, id) {
        const { sfid } = this.props;

        let data = {
            user_sfid: sfid,
            product_id: pid,
            device_id: ''
        }
        this.props.dispatch(favProduct(data)).then((response) => {
            if (response && response.status && response.status === "success") {
                this.getFavCount();
                if ($(`#${id}`).hasClass('active')) {
                    $(`#${id}`).removeClass('active')
                    $(`#${id}`).removeClass('fa-heart')
                    $(`#${id}`).addClass('fa-heart-o')
                  } else {
                    $(`#${id}`).addClass('active')
                    $(`#${id}`).addClass('fa-heart')
                    $(`#${id}`).removeClass('fa-heart-o')
        
                  }
            }
        });
    }

    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }



    render() {
        const { product } = this.props;

        return (
            <>
                {/* USE ABOVE DIV AND COMMENT BOTTOM DIV TO FIX THIS BOX AT BOTTOM OF THE PAGE */}
                {/* <div className="overall_ p-lg-4 common-bottom-fixed-bar"> */}
                <div className="p-lg-4 bg-white">
                    <div className="container">
                        <div className="row justify-content-between">

                            <div className="col-sm-7 mb-lg-0 mb-3 border-right">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1"><strong>Delivery:</strong> 1–2 weeks Free Shipping <button className="link">Get delivery dates</button></p>
                                    <p className="mb-0 pr_t">Stride Price</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0"><strong>Sold by:</strong> {product.seller_information__c} <button onClick={() =>  this.props.handleseller() } className="link">More Sellers</button></p>
                                    <p className="mb-0"><span className="mr-2">₹{product.price__c}</span> <del>{product.mrp__c}</del></p>
                                </div>
                            </div>
                            <div className="col-sm-5 d-flex justify-content-center">
                                <div className="mr-lg-2 mr-3 text-lg-right mb-lg-0 mb-3 d-none d-mb-block d-lg-block">
                                    <p className="n_emi_c mb-1 pr_t">No Cost EMI Starting <strong>₹ {product.min_avi_emi__c}/mo</strong></p>
                                    <button className="link" onClick={() => this.props.viewMorePlans()}>View Plans</button>
                                </div>
                                <div className="d-flex justify-content-end mb-lg-0 mb-3 ">
                                    <button className="wish ml-4 mr-4" type="button">
                                        <i aria-hidden="true"
                                            onClick={() => this.setFavourite(product && product.sfid ? product.sfid : '', `fav-mobile-item-${product && product.id ? product.id : 0}`)}
                                            id={`fav-mobile-item-${product && product.id ? product.id : 0}`}
                                            className={`fa ${product && product.isFavorite ? "fa-heart active" : "fa-heart-o"}`}>
                                        </i>
                                    </button>
                                    <button type="button" onClick={() => this.props.handleBuy(product && product.sfid ? product.sfid : '')} className="pay-btn buy-now">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.props.showPopup} onHide={this.props.handleClose} animation={false}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Access Stride Marketplace while our team evaluates your application</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </>
        );
    }
}
