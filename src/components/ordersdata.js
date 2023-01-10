import React, { Component } from "react";
import PropTypes from "prop-types";
import { asset } from "../common/assets";
import { reduxForm, propTypes } from "redux-form";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllTransaction } from '../actions/user'
import WishListEmpty from "./wish-list-empty";

class OrdersData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupShow: false,
            all_transactions: [],
            showList: false
        };
    }


    componentDidMount() {
        this.props.dispatch(getAllTransaction({ "user_sfid": this.props.sfid })).then((response) => {
            if (response.status == 'success') {
                response.transactions.length > 0 ? this.setState({ showList: true }) : this.setState({ showList: false })
                this.setState({ all_transactions: response.transactions })
            }
        })
    }

    render() {
        const { all_transactions } = this.state;
        return (
            <>
                {this.state.showList ?
                    <>


                        {all_transactions &&
                            all_transactions.length > 0 &&
                            all_transactions.map((item, index) => (
                                <div className="mb-4">
                                    <div
                                        key={`favorite-card-${index}`}
                                        className="card border-0 order_top_box "
                                        style={{ background: "whitesmoke" }}
                                    >
                                        <div className="row g-0">
                                            <div
                                                className="col-md-3 cursor-point"
                                                onClick={() =>
                                                    (window.location = `/product-details/${item.product_sfid}`)
                                                }
                                            >
                                                <img
                                                    src={item.product_image_url}
                                                    className="img-fluid rounded-start"
                                                    alt="..."
                                                    style={{ width: "80px" }}
                                                />
                                            </div>

                                            <div className="col-md-7">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {item && item.product_name ? item.product_name : ""}
                                                    </h5>

                                                </div>
                                            </div>

                                        </div>



                                    </div>
                                    <div className="d-flex mx-0 py-3 align-items-center justify-content-around order_p_bar fs-17" >
                                        <span>
                                            Next EMI Due: <p>{item.next_emi_due} </p>
                                        </span>

                                        <span>
                                            Amount Due: <p><i className="fa fa-rupee">`</i>{item.next_emi_due_amt}</p>
                                        </span>

                                        <span>
                                            Payment streak: <img src={asset + "images/fire.png"} width="30px" height="30px" /><p> 0 month </p>
                                        </span>
                                    </div>

                                </div>
                            ))}
                    </>
                    :
                    <WishListEmpty
                        history={this.props.history}
                    />
                }
            </>
        );
    }
}


function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    return {
        user,
        sfid,
    };
}
export default connect(mapStateToProps, null)(OrdersData);
