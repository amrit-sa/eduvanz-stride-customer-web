import React, { Component } from "react";
import PropTypes from "prop-types";
import { asset } from "../common/assets";
import { reduxForm, propTypes } from "redux-form";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Modal} from "react-bootstrap"

class WishListData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupShow: false,
        };
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.showPopup != this.props.showPopup){
            this.setState({showPopup: this.props.showPopup})
        }
    }

    removeFavProduct = (pid) => {
        this.props.removeProduct(pid);
    };

    handleBuy = (pid) => {
        this.props.handleProBuy(pid);
    };
    handlepop = (item) => {
        this.setState({ popupShow: !this.state.popupShow })
        console.log(item, this.props, "hdnd");
    };

    hidePopup = (id) => {
        document.getElementById(id).style.display='none';

    }

    render() {
        const { favProduct } = this.props;
        return (
            <>
                {favProduct &&
                    favProduct.length > 0 &&
                    favProduct.map((item, index) => (
                        <div
                            key={`favorite-card-${index}`}
                            className="card border-0 rounded-4 mb-4"
                        >
                            <div className="row g-0">
                                <div
                                    className="col-md-3 cursor-point"
                                    onClick={() =>
                                        (window.location = `/product-details/${item.sfid}`)
                                    }
                                >
                                    <img
                                        src={item.image_url__c}
                                        className="img-fluid rounded-start"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {item && item.name ? item.name : ""}
                                        </h5>
                                        <p className="mb-1">No Cost EMI starting </p>
                                        <p className="font-weight-bold">₹ 3,500/mo</p>
                                    </div>
                                </div>
                                <div className="col-md-2 ">
                                    <div className="mt-4 align-items-center text-right mr-2">
                                        <>
                                            {['top'].map((placement) => (
                                                <OverlayTrigger
                                                    trigger="click"
                                                    key={placement}
                                                    placement={placement}
                                                    rootClose={true}
                                                    overlay={
                                                        <Popover className="border-0 shadow" id={item.id}>
                                                            <div className="card border-0">
                                                                <div className="card-body py-2 px-4">
                                                                    <span className="font-weight-bold">
                                                                        {" "}
                                                                        Are you sure you want to remove this item?
                                                                    </span>{" "}
                                                                    <button
                                                                    
                                                                        type="button"
                                                                        className="btn btn-dark btn-sm mx-1 px-3"
                                                                        // onClick={(e) => {
                                                                        //     e.preventDefault();
                                                                        //     e.stopPropagation();
                                                                            // window.trigger('click');
                                                                            // this.hidePopup(item.id)
                                                                        // }
                                                                        onClick={() => {
                                                                            document.querySelector('.trash_btn').click();
                                                                        }}
                                                                    
                                                                    >
                                                                        No
                                                                    </button>{" "}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            this.removeFavProduct(item.fav_id)
                                                                        }
                                                                        className="btn btn-sm btn-outline-dark px-3"
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Popover>
                                                    }
                                                >
                                                    <i
                                                        className="fa fa-trash-o h5 font-weight-normal mb-0 text-dark trash_btn"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => this.handlepop(item)}
                                                    ></i>
                                                </OverlayTrigger>
                                            ))}
                                        </>
                                        {/* <OverlayTrigger
                      show={true}
                      key={item.id}
                      target={item.id}
                      placement="left"
                      trigger="click"
                      rootClose
                      // onHide={() => this.setState({show:false})}
                      overlay={
                        <Popover className="border-0 shadow" id={item.id}>
                          <div className="card border-0">
                            <div className="card-body py-2 px-4">
                              <span className="font-weight-bold">
                                {" "}
                                Remove this item?
                              </span>{" "}
                              <button
                                type="button"
                                className="btn btn-dark btn-sm mx-1 px-3"
                                onClick={() => this.handlepopno()}
                              >
                                No
                              </button>{" "}
                              <button
                                type="button"
                                onClick={() =>
                                  this.removeFavProduct(item.fav_id)
                                }
                                className="btn btn-sm btn-outline-dark px-3"
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </Popover>
                      }
                    >
                      <i
                        className="fa fa-trash-o h5 font-weight-normal mb-0 text-dark"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.handlepop(item)}
                      ></i>
                    </OverlayTrigger> */}
                                        <button
                                            type="button"
                                            onClick={() => this.handleBuy(item.sfid)}
                                            className=" btn btn-primary btn-button-signin px-lg-4"
                                            style={{
                                                position: "relative",
                                                marginTop: "100%",
                                                height: "50px",
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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

WishListData.propTypes = {
    ...propTypes,
    favProduct: PropTypes.any,
    removeProduct: PropTypes.func,
    handleProBuy: PropTypes.func,
};

export default reduxForm({ form: "Favorite-List" })(WishListData);
