import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Select from 'react-select'
import { Link } from 'react-router-dom';
import { asset } from "../../common/assets";
import { getOneMoneyBanks, updateBank } from "../../actions/user";
import GetOurApp from '../../common/get-our-app';

class BankScreen2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bank: null,
            fipId: null,
            fipName: null,
        }
        this.bankChange = this.bankChange.bind(this);
    }

    componentDidMount()
    {
        const { dispatch } = this.props
        dispatch(getOneMoneyBanks());
    }

    bankChange = (e) => {
        this.setState({ 
            bank: e.label,
            fipId: e.fipId,
            fipName: e.fipname,
        });
    }

    handlebank = (item) =>{
        this.setState({ 
            bank: item.bank_name,
            fipId: item.fip__id,
            fipName: item.fip__name,
        });
    }

    handleSubmit = async () =>{
        const { dispatch, history } = this.props
        let data = {
            id: this.state.fipId,
            name: this.state.fipName
        }
       await dispatch(updateBank(data));
       history.push('/edonemoney');
       window.location.reload();

    }

    render() {
        const { banks, isLoading, history} = this.props
        let bankData;
        let bankOptions = [];
        const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
        if(banks)
        {
          bankData = banks.slice(0,6);
          for(var i = 0; i < banks.length; i++){
            bankOptions.push({ value: banks[i].bank_id, label: banks[i].bank_name, fipname: banks[i].fip__name, fipId: banks[i].fip__id});
          }
        }
      
        return (
            <>
            <Helmet>
                <title>Eduvanz | Onemoney Banks</title>
            </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
                ):''}
            <section className="kyc_pages bank_page">
                <div className="container-zero">
                <div className="flex-w flex-tr">
                    <div className="kyc_leftbar bg-3">
                        <h4 onClick={ () => history.push('/home')} className="mtext-105 cursor-point">eduvanz</h4>
                        <div className="navigations">
                        <ul className="breadcrumps">
                            <li className="b_back"><Link to="">Back</Link></li>
                        </ul>
                        </div>
                        <h4 className="mtext-105 cl6">Bank Statement</h4>
                        
                    </div>
                    <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
                    <div className="form_width_1 ext10">
                    <div className="form_details">
                        <h4 className="bg-2 text-center imgaligned">Please select your bank </h4>
                        <ul className="horizontal_list type_2 small">
                            <li><img src={asset+'images/icon_secure.svg'} alt="" />100% Secure </li>
                            <li><img src={asset+'images/icon_trust.svg'} alt="" />Trusted by millons </li>
                        </ul>
                        <form  className="otpform otpform-others fullwidth" >
                        <div className="col-md-12">
                            <div className="form_spacing d-flex flex-col-m mn_height_5">
                            <div className="d-block text-center">
                                <div className="form-group mb-5">
                                    <span className="has-float-label">
                                    <Select 
                                        options={bankOptions}
                                        placeholder="Select Bank"
                                        name="bank"
                                        onChange={this.bankChange}
                                    />
                                    </span>
                                </div>
                                    <div className="row type_2">
                                    {bankData && bankData.length >0 &&(
                                        bankData.map((item, index)=>(
                                            <div key={"bank-"+index} className="col-sm-3">
                                                <div className={`banx_box ${this.state.bank === item.bank_name?'bank-active':''}`} 
                                                    onClick={()=>this.handlebank(item)}
                                                    style={{cursor:'pointer'}}
                                                >
                                                    <img src={item.bank_icon} alt=""  />
                                                    <h3>{item.bank_name}</h3>
                                                </div>
                                            </div>
                                         ))
                                    )
                                    }
                                     </div>
                                     <p><span className="d-block img_valign2 mt-4"><img src={asset+'images/icons/icon_iinfo.svg'} alt=""  /> Incase you have multiple account, please select your salary account</span></p>
                                     <div className="form_spacing text-center">
                                        <button 
                                            type="button" 
                                            onClick={this.handleSubmit} 
                                            className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300"
                                            style={this.state.bank?styles:{}}
                                            >Continue</button>
                                     </div>
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="pos_abs">
                               <GetOurApp 
                  dispatch={this.props.dispatch}
                />                    
                            </div>
                    </div>
                </div>
            </div>
            </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { banks } = state.user;
    const { isLoading } = state.auth;
    return {
        banks,
        isLoading
    };
}

export default connect(mapStateToProps)(BankScreen2)