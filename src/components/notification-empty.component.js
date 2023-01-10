import React, { Component } from "react"
import { connect } from 'react-redux';
import { asset } from "../common/assets"; 

class NotificationEmpty extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <div className="text-center">
                    <img src={asset+'/images/notification/empty_notification.png'} className='w-full-sm' />
                    <h3 className="mb-3 font-weight-bold mt-4">No Notifications</h3>
                    <p className="mb-1 h5 text-muted">We will notify you once we  </p>
                    <p className="mb-1 h5 text-muted"> have something for you  </p>
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

export default connect(mapStateToProps)(NotificationEmpty);
