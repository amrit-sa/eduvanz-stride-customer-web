import React, { Component } from "react"
import { connect } from 'react-redux';
import { asset } from "../common/assets"; 

class WishListEmpty extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleExplore = () =>{
        this.props.history.push('/')
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <img src={asset+'images/wishlist/empty.png'} className='w-full-sm' />
                    <h3 className="mb-3 font-weight-bold">Hey, it feels so light </h3>
                    <p className="mb-1 h5 text-muted">There is nothing in your wishlist.</p>
                    <p className="mb-1 h5 text-muted">You can explore our store and add items in your wishlist.</p>
                    <button className="btn btn-primary btn-button-signin px-lg-4 mt-4"onClick={this.handleExplore}>Explore Now</button>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { user, sfid } = state.auth;
    return {
        user,
        sfid
    };
}

export default connect(mapStateToProps)(WishListEmpty);
