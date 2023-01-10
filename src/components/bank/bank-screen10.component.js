import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import Header from "../../common/header";
import { asset } from "../../common/assets";

class BankScreen10 extends Component {

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
                <title>Bank Screen 10</title>
            </Helmet>
            <Header />
     
            <section className="kyc_pages bank_screen">
            <div className='container'>
                   <div className='row'>
                       <div className='col-sm-12'>
                           <div className='d-flex align-items-center'>
                               <button className='back-btn rounded-circle mr-3 mr-lg-4'>
                                   back
                               </button>
                               <h2 className="back-btn-text m-0">Select Payment plans</h2>
                               </div>
                        </div>
                   </div>
                   <div className='row mt-4'>
                       <div className='col-lg-6'>
                        <div className='d-flex justify-content-between align-items-center product-item-box mb-lg-0 mb-3'>
                            <h3 className='product-name m-0'>Macbook Pro 256 GB</h3>
                            <div className='brand-name'>
                                <span><img src={asset+"images/icons/apple.png"} alt="apple" /></span>
                            </div>
                            </div>
                       </div>
                       <div className='col-lg-6'>
                       <div className='d-flex justify-content-between align-items-center product-item-box'>
                            <h3 className='product-name m-0'>Loan Amount:</h3>
                            <div className='a-e d-flex align-items-center'>
                                <span className='loan-amount'><i className='rupee'>`</i>2,00,000</span>
                                <button className='edit-btn ml-3'>Edit</button>
                            </div>
                        </div>
                       </div>
                   </div>
                   <div className='row my-4'>
                       <div className='col-sm-12'>
                           <div className='d-md-flex justify-content-md-between align-items-center'>
                                <div>
                                    <h3 className='m-lg-0 mb-3 p-o-t'>Payment options</h3>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className='no-cost'>No Cost <span><img src={asset+"images/icons/icon-ind2.png"} alt="icon-ind2" /></span></div>
                                    <div className='moratorium ml-2' style={{"backgroundColor":"#E0E5FF"}}>Moratorium <span><img src={asset+"images/cross.png"} alt="icon-ind2" /></span></div>
                                </div>
                           </div>
                       </div>
                   </div>
               </div>
            </section>
            <section>
                <div className='container'>
                    <div className='row payment-option-list'>
                        <div className='col-lg-4 col-md-6'>
                            <div className='p-o-b_2  d-flex flex-column justify-content-between'>
                            <div>
                                <h2 className='m-txt-2 m-0'>3 Months</h2>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='pm-a-2'><i className='d-inline-block r-s'>`</i><span>66000</span>/Per month</div>
                                </div>
                            </div>
                            <div>
                            <p className='p-o-txt_ mb-2'>Due today: <i>`</i> <span>20,000</span></p>
                            <p className='p-o-txt_ mb-2'>Interest (7.9% p.a): <i>`</i> <span>1200</span></p>
                            <p className='p-o-txt_ mb-3'>Total: <i>`</i> <span>21,200</span></p>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='pm-a'>
                                    <button className='btn btn-outline-secondary'>View Moratorium</button>
                                </div>

                                <button className='dropdown-amount'>
                                    <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className='p-o-b_2  d-flex flex-column justify-content-between'>
                            <div>
                                <h2 className='m-txt-2 m-0'>6 Months</h2>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='pm-a-2'><i className='d-inline-block r-s'>`</i><span>66000</span>/Per month</div>
                                </div>
                            </div>
                            <div>
                            <p className='p-o-txt_ mb-2'>Due today: <i>`</i> <span>20,000</span></p>
                            <p className='p-o-txt_ mb-2'>Interest (7.9% p.a): <i>`</i> <span>1200</span></p>
                            <p className='p-o-txt_ mb-3'>Total: <i>`</i> <span>21,200</span></p>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='pm-a'>
                                    <button className='btn btn-outline-secondary'>View Moratorium</button>
                                </div>

                                <button className='dropdown-amount'>
                                    <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className='p-o-b_2  d-flex flex-column justify-content-between'>
                            <div>
                                <h2 className='m-txt-2 m-0'>9 Months</h2>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='pm-a-2'><i className='d-inline-block r-s'>`</i><span>66000</span>/Per month</div>
                                </div>
                            </div>
                            <div>
                            <p className='p-o-txt_ mb-2'>Due today: <i>`</i> <span>20,000</span></p>
                            <p className='p-o-txt_ mb-2'>Interest (7.9% p.a): <i>`</i> <span>1200</span></p>
                            <p className='p-o-txt_ mb-3'>Total: <i>`</i> <span>21,200</span></p>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='pm-a'>
                                    <button className='btn btn-outline-secondary'>View Moratorium</button>
                                </div>

                                <button className='dropdown-amount'>
                                    <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className='p-o-b_2  d-flex flex-column justify-content-between'>
                            <div>
                                <h2 className='m-txt-2 m-0'>12 Months</h2>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='pm-a-2'><i className='d-inline-block r-s'>`</i><span>66000</span>/Per month</div>
                                </div>
                            </div>
                            <div>
                            <p className='p-o-txt_ mb-2'>Due today: <i>`</i> <span>20,000</span></p>
                            <p className='p-o-txt_ mb-2'>Interest (7.9% p.a): <i>`</i> <span>1200</span></p>
                            <p className='p-o-txt_ mb-3'>Total: <i>`</i> <span>21,200</span></p>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='pm-a'>
                                    <button className='btn btn-outline-secondary'>View Moratorium</button>
                                </div>

                                <button className='dropdown-amount'>
                                    <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className='p-o-b_2  d-flex flex-column justify-content-between'>
                            <div>
                                <h2 className='m-txt-2 m-0'>24 Months</h2>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='pm-a-2'><i className='d-inline-block r-s'>`</i><span>66000</span>/Per month</div>
                                </div>
                            </div>
                            <div>
                            <p className='p-o-txt_ mb-2'>Due today: <i>`</i> <span>20,000</span></p>
                            <p className='p-o-txt_ mb-2'>Interest (7.9% p.a): <i>`</i> <span>1200</span></p>
                            <p className='p-o-txt_ mb-3'>Total: <i>`</i> <span>21,200</span></p>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='pm-a'>
                                    <button className='btn btn-outline-secondary'>View Moratorium</button>
                                </div>

                                <button className='dropdown-amount'>
                                    <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className='p-o-b_2  d-flex flex-column justify-content-between'>
                            <div>
                                <h2 className='m-txt-2 m-0'>34 Months</h2>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='pm-a-2'><i className='d-inline-block r-s'>`</i><span>66000</span>/Per month</div>
                                </div>
                            </div>
                            <div>
                            <p className='p-o-txt_ mb-2'>Due today: <i>`</i> <span>20,000</span></p>
                            <p className='p-o-txt_ mb-2'>Interest (7.9% p.a): <i>`</i> <span>1200</span></p>
                            <p className='p-o-txt_ mb-3'>Total: <i>`</i> <span>21,200</span></p>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='pm-a'>
                                    <button className='btn btn-outline-secondary'>View Moratorium</button>
                                </div>

                                <button className='dropdown-amount'>
                                    <img src={asset+"images/icons/icon_dd.png"} alt="drop-down" className='rotate180'/>
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-lg-5 mb-3'>
                        <div className='col-sm-12 d-flex justify-content-end align-items-center'>
                            <p className='m-0 w-a-txt mr-3'>Expand all</p>
                            <label className="switch">
                                <input 
                                type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            </>
        )
    }
}

const mapSTP = state => {
    return {currentUser: state.currentUser}
}

export default connect(mapSTP)(BankScreen10)