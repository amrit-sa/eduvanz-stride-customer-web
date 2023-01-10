import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import HeaderNew from '../common/headerNew';
import Footer from "../common/footer";
import AboutUs from "../common/about";
import { asset } from "../common/assets";

class CompareProduct extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
        }
    }



    componentDidMount(){ 
        $('.filter_accordion').eq(0).children('.content').show()
        $('.filter_accordion .tab').click(function(){
            $(this).parent().siblings().children('.tab').removeClass('show');
            $(this).addClass('show')
            $(this).parent().siblings().children('.content').slideUp();
            $(this).next().slideToggle();
        })
    }


    render() {
        
        return (
            <>
            <HeaderNew/>
            {/* banner */}
            <div className="pdesc-banner before-d-none">
                <div className="inner-page">
                    <div className="container banner-content">
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='breadCrumb_wrapper pt-3'>
                                    <ul className="breadcrumb_menu d-flex flex-wrap">
                                        <li><a href="#">Store</a></li>
                                        <li><a href="#">Electronics</a></li>
                                        <li><a href="#">Laptop</a></li>
                                        <li>Compare Products</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner */}
            <div className='inner-page'>
               <div className='container'>
                   <div className='row mb-4'>
                       <div className='col-12'>
                            <h4 className='mb-4'>Compare Products</h4>
                            <div className='compare-section'>
                               <table>
                                    <tr>
                                       <th>
                                           <div className='addToCompareBox'>
                                               <p className='text-left'>Product Name</p>
                                               <p className='text-left'>Offer Price</p>
                                           </div>
                                       </th>
                                       <th>
                                        <div className='addToCompareBox'>
                                            <button className="close">
                                                <img src={asset+"images/icons/icon-close2.png"} alt="upgard" className="img-fluid"/>
                                            </button>
                                            <div className='pro-img'>
                                                <img src={asset+"images/products/lap-01.png"} alt="upgard" className="img-fluid"/>
                                            </div>
                                            <p>Dell XPS 9500 15.6 inches FHD Laptop (10th Gen...</p>
                                            <h5>
                                                <small className='d-block mb-2'>EMI Starting</small>
                                                ₹3,000/month
                                            </h5>
                                            <button className='apply-btn'>Buy Now</button>
                                            <p className='mt-3'>Stride Price ₹81,990 </p>
                                        </div>
                                       </th>
                                       <th>
                                       <div className='addToCompareBox'>
                                            <button className="close">
                                                <img src={asset+"images/icons/icon-close2.png"} alt="upgard" className="img-fluid"/>
                                            </button>
                                            <div className='pro-img'>
                                                <img src={asset+"images/products/lap-01.png"} alt="upgard" className="img-fluid"/>
                                            </div>
                                            <p>Dell XPS 9500 15.6 inches FHD Laptop (10th Gen...</p>
                                            <h5>
                                                <small className='d-block mb-2'>EMI Starting</small>
                                                ₹3,000/month
                                            </h5>
                                            <button className='apply-btn'>Buy Now</button>
                                            <p className='mt-3'>Stride Price ₹81,990 </p>
                                        </div>
                                       </th>
                                       <th>
                                       <div className='addToCompareBox'>
                                                <button className='atc_btn'>
                                                    <span>+</span>
                                                    <p>Add to compare</p>
                                                </button>
                                        </div>
                                       </th>
                                       <th>
                                       <div className='addToCompareBox'>
                                            <button className='atc_btn'>
                                                <span>+</span>
                                                <p>Add to compare</p>
                                            </button>
                                        </div>
                                       </th>
                                   </tr>
                                   <tr>
                                       <td>Brand</td>
                                       <td>Dell</td>
                                       <td>Apple</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Dimensions(WxHxD)</td>
                                       <td>304.1 x 212.4 x 10.9 mm</td>
                                       <td>304.1 x 212.4 x 10.9 mm</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Colors</td>
                                       <td>Black</td>
                                       <td>Silver</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Operating System</td>
                                       <td>Windows 10 Home Basic	</td>
                                       <td>macOS Big Sur </td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Operating System Type</td>
                                       <td>64-bit</td>
                                       <td>NA</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Model</td>
                                       <td>17Z90P-G.AJ55A2</td>
                                       <td>M1 MGN93HN/A</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Operating System</td>
                                       <td>Windows 10 Home Basic	</td>
                                       <td>macOS Big Sur </td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Operating System Type</td>
                                       <td>64-bit</td>
                                       <td>NA</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Model</td>
                                       <td>17Z90P-G.AJ55A2</td>
                                       <td>M1 MGN93HN/A</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Operating System</td>
                                       <td>Windows 10 Home Basic	</td>
                                       <td>macOS Big Sur </td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Operating System Type</td>
                                       <td>64-bit</td>
                                       <td>NA</td>
                                       <td></td>
                                       <td></td>
                                   </tr>
                                   <tr>
                                       <td>Model</td>
                                       <td>17Z90P-G.AJ55A2</td>
                                       <td>M1 MGN93HN/A</td>
                                       <td></td>
                                       <td></td>
                                   </tr>

                               </table>
                            </div>
                       </div>
                   </div>
                  
                
                 
                  
               </div>
            </div>
            
            <AboutUs/>
            <Footer />
            <div className="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4>Filters</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <img src={asset+"images/icons/icon-close2.png"} alt="upgard" className="img-fluid"/>
                            </button>
                            
                        </div>

                        <div className="modal-body">
                        <div className="filter_accordion_wrap">
                              <div className="filter_accordion">
                                <div className="tab">EMI</div>
                                <div className="content">
                                <div className="price-range_ p-3" aria-labelledby="dropdownMenuButton">
                                            <div className='d-flex'>
                                            <p className='at'>Amount</p> 
                                            <div className='price-box'>
                                                <input type="text" id="priceAmount" readonly/></div>
                                            </div>
                                            <div id="price-range"></div>
                                            <ul className='r_l d-flex justify-content-between mt-2'>
                                               <li></li>
                                               <li></li>
                                               <li></li>
                                               <li></li>
                                            </ul>
                                            <ul className='r_l_t d-flex justify-content-between mt-2'>
                                                <li>1000 <span>Min</span></li>
                                                <li>15000</li>
                                                <li className='text-right'>30000<span>Max</span></li>
                                            </ul>
                                          
                                        </div>
                                </div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">Price</div>
                                <div className="content">Dimension and Weight</div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">Brands</div>
                                <div className="content">Transmission</div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">Processor</div>
                                <div className="content">Chassis and Suspension</div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">Color</div>
                                <div className="content">Braking</div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">Display Size</div>
                                <div className="content">Wheel and Tyres</div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">ROM</div>
                                <div className="content">Wheel and Tyres</div>
                              </div>
                              <div className="filter_accordion">
                                <div className="tab">RAM</div>
                                <div className="content">Wheel and Tyres</div>
                              </div>
                            </div>
                            <div className='text-right mt-3'>
                                <button className='link'>Clear All</button>
                                <button className='apply-btn ml-3'>Apply</button>
                            </div>
                        </div>

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

export default connect(mapSTP)(CompareProduct)