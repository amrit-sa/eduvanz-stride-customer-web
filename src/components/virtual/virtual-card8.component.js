import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { createRazorpay } from "../../actions/payment";

class VirtualCard8 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }

    async componentDidMount()
    {
        const { user, dispatch } = this.props
        let data = {
            id: '104',//user, 
            type:'card' }
            this.openPayModal("50000")
       /*  await dispatch(createRazorpay(data)).then((response)=>{
            if(response && response.status == 'success')
            {
                console.log("response", response)
            }
        }); */
    }

    
    loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async openPayModal(amount){
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        var options = {
            key: 'rzp_live_jQMKDq05vD45bc',
            amount: 100000, //  = INR 1
            name: 'Eduvanz',
            description: 'Test Transaction',
            image: 'https://eduvanz-web.herokuapp.com/images/icons/favicon.png',
            "handler": function (response) {
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature);
            },
            "theme": {
              "color": "#F37254"
            }
          };
          var rzp1 = new window.Razorpay(options);
         /*  document.getElementById('rzp-button1').onclick = function (e) {
            rzp1.open();
            e.preventDefault();
          } */
      /*   const rzp1  = new window.Razorpay(options); */
        rzp1.open();
    }


    render() {
        const { isLoading, user } = this.props
      
        return (
            <>
            <Helmet>
                <title>Virtual Card 8</title>
                <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
            ):''}
            <Header
                user = {user}
            />
            <section className="kyc_pages bank_screen">
                <div className='container'>
                    
                </div>
            </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { banks } = state.user;
    const { salesForceToken, user, isLoading } = state.auth;
    const { selectedplan } = state.payment;
    return {
        salesForceToken,
        selectedplan,
        banks,
        user,
        isLoading
    };
}

export default connect(mapStateToProps)(VirtualCard8)