import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { asset } from "../../common/assets";

class BankScreen16 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }


    render() {
      
        return (
            <>
            <Helmet>
                <title> Bank screen 16 </title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            <div className='d-flex h-100 justify-content-center align-items-center'>
                <div>
                    <div className='wait'>
                        <div className='coin'>
                        <img src={asset+"images/wait-icon/coin.png"} alt="" className='img-fluid'/>
                        </div>
                        <div className='phone'>
                        <img src={asset+"images/wait-icon/phone.png"} alt="" className='img-fluid'/>
                        </div>
                        <div className='speech1'>
                        <img src={asset+"images/wait-icon/speech1.png"} alt="" className='img-fluid'/>
                        </div>
                        <div className='speech2'>
                        <img src={asset+"images/wait-icon/speech2.png"} alt="" className='img-fluid'/>
                        </div>
                    </div>
                    <div className='text-center mt-4' >
                        <h3>Please wait..</h3>
                        <p>We are depositing Rs. 1 in your account for Verification</p>
                    </div>
                </div>
            </div>
               
            </>
        )
    }
}

const mapSTP = state => {
    return {currentUser: state.currentUser}
}

export default connect(mapSTP)(BankScreen16)