import React, { Component } from "react"

import { connect } from 'react-redux';
import { getAllTransaction } from '../actions/user'
import { asset } from "../common/assets";


class ALlPayment_sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_transactions: [],
        };
    }


    componentDidMount() {

        this.props.dispatch(getAllTransaction({ "user_sfid": this.props.sfid })).then((response) => {
            if (response.status == 200) {
                this.setState({ all_transactions: response.data })
            }
        })

      

    }


    async componentDidUpdate(prevProps, prevState) {
    }

    handleItemSelect = (item) => {
        // const {history} = this.props;
        this.props.selectItem(item);
        // history.push('./bank_enach1')

        // console.log(this.props)
    }

    render() {
        const { sfid, all_transactions, selectItem, history, selected_item, isSearching, userId, user, username, isLoading, searchDet, favorite_count, dispatch, profile } = this.props
        return (
            <>


                <div>

                    <div style={{ maxHeight: "500px", overflow: "auto" }}>
                        {
                            all_transactions && all_transactions.map((item, index) =>

                                <div key={index} className="bg-white p-4 transaction-block mb-2 "
                                    onClick={() => {
                                        this.handleItemSelect(item)
                                        // return item.repaymentdata && this.handleItemSelect(item)
                                    }
                                    } >
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <h5>{item.product_name}</h5>
                                            {item.repaymentdata && <p>Due on {item.next_emi_due}</p> }
                                            <h5><i className="rupee">`</i> {item.emi_amt_paid}</h5>
                                        </div>
                                        <div className="d-flex flex-column justify-content-between">
                                            <span><img src={item.product_image_url} alt="Logo" className="img-fluid" style={{ "width": "45px" }} /></span>
                                            <p className="mb-0">{item.emis_paid}/{item.total_emis}</p>
                                        </div>
                                    </div>
                                    {item.repaymentdata ?
                                        <div className="pro-bar-wrap">
                                            <div className="pro-bar" style={{ "width": "50%" }}></div>
                                            <div className="pro-barbg"></div>
                                        </div>
                                        :
                                        <p>Under Process...</p>
                                    }
                                </div>


                            )
                        }
                    </div>


                    <div className="exploCol">
                        <div className="top">
                            <img src={asset + "images/score.png"} alt="meter-img" width="42" />


                            <div className="leftDiv">

                                <p>Available Limit</p>

                                <h3>{this.props.user_credit_limit}</h3>
                            </div>
                        </div>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            history.push('./')
                        }}>Explore Marketplace</a>
                    </div>

                </div>







            </>
        );
    }

}
function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
    const { profile, recentProd, userAddress, userId } = state.user;
    return {
        favorite_list,
        favorite_count,
        searchHistory,
        isSearching,
        isLoading,
        searchDet,
        recentProd,
        profile,
        username,
        user,
        sfid,
        userAddress,
        userId
    };
}



export default connect(mapStateToProps, null)(ALlPayment_sidebar);
