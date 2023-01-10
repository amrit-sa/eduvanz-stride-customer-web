import React from "react";
import 'react-multi-carousel/lib/styles.css';
import $ from 'jquery';
import { favProduct , getViewedProduct , getSimilarProduct} from "../actions/user";
import { getFavoriteProductCount  } from "../actions/product";

export default class ProductBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ip: ""
        }
    }

    // checkBoxLimit() {
    //     var checkBoxGroup = document.getElementsByName('check[]');			
    //     var limit = 3;
    //     for (var i = 0; i < checkBoxGroup.length; i++) {
    //         checkBoxGroup[i].onclick = function() {
    //             var checkedcount = 0;
    //             for (var i = 0; i < checkBoxGroup.length; i++) {
    //                 checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
    //             }
    //             if (checkedcount > limit) {
    //                 // console.log("You can select maximum of " + limit + " checkboxes.");
    //                 // alert("You can select maximum of " + limit + " checkboxes.");						
    //                 this.checked = false;
    //             }
    //         }
    //     }
    // }

    setFavourite(pid, id) {
        const { user, sfid } = this.props;
        //console.log(this.props,'SetFav');
        //return;
        if (sfid) {
            let data = {
                user_sfid: sfid,
                product_id: pid,
                device_id: ''
            }

            

            this.props.dispatch(favProduct(data)).then((response) => {
                if (response && response.status && response.status === "success") {
                    this.getFavCount();

                    this.props.dispatch(getViewedProduct({ user_id: sfid }));


                    let youmight_alsoLike = {
                        sub_category_id: this.props.item.category_id,
                        user_sfid: sfid
                    }
                    this.props.dispatch(getSimilarProduct(youmight_alsoLike));


                    /*if ($(`#${id}`).hasClass('active')) {
                        $(`#${id}`).removeClass('active');
                    } else {
                        $(`#${id}`).addClass('active');
                    }*/
                    if ($(`#${id}`).hasClass('active')) {
                        $(`#${id}`).removeClass('active')
                        $(`#${id}`).removeClass('fa-heart')
                        $(`#${id}`).addClass('fa-heart-o')
                    } else {
                        $(`#${id}`).addClass('active')
                        $(`#${id}`).addClass('fa-heart')
                        $(`#${id}`).removeClass('fa-heart-o')

                    }
                }
            });
        } else {
            this.props.pushPage('/login');
        }
    }

    getFavCount = () => {
        const { sfid } = this.props;
        let data = {
            user_sfid: sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    productDetail(pid) {
        window.location = '/product-details/' + pid;
        // this.props.pushPage('/product-details/' + pid)
        // window.location.reload(false)
    }

    

    render() {
        const { index, item, isCompareEnable } = this.props;
    //   this.checkBoxLimit();
        return (
            <>
                {



                    this.props.page == 'accomodation' ?
                        <>
                            <div className="item d-flex flex-column">
                                {/* <button className="wish"><i className="fa fa-heart-o" aria-hidden="true"></i></button> */}
                                <div className="bottom">
                                    <h4>{item.name.split(' ').splice(0, 3).join(' ')}</h4>
                                    <p><span className="d-block">No Cost EMI Starting ₹{item.min_avi_emi__c}/mo </span></p>
                                </div>
                                <div className="img-box" onClick={() => this.productDetail(item.sfid)}>
                                    <img src={item.image_url__c && item.image_url__c} alt="" className="img-fluid" />
                                </div>
                            </div>
                        </>
                        :
                        this.props.page == 'map_view' ?
                            <>
                                <div key={`product-item-${index}`} className='col-lg-6 col-md-6'>
                                    <div className='search-result-box mb-4'>
                                        {isCompareEnable && (
                                            <div className='compare-check compare-checkbox'>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" ref={`ref_${item.id}`} id={item.id} onChange={e => this.props.onSelectClick(e, item)} value={item.id} defaultChecked={this.props.selectedItem.includes(item.sfid)} />
                                                    <label className="custom-control-label" htmlFor={item.id}> Compare </label>
                                                </div>
                                            </div>
                                        )}
                                        <div className='img-box mb-4 noverlay fff' onClick={() => this.productDetail(item.sfid)}>
                                            <img src={item.image_url__c && item.image_url__c} alt="" className='img-fluid mt-0 ' />
                                        </div>
                                        
                                        <div className='px-3 pb-3'>
                                            <div onClick={() => this.productDetail(item.sfid)}>
                                                <p>{item.name.split(' ').splice(0, 3).join(' ')}</p>
                                                <h5 className='emi_txt'>EMI Starting ₹{item.min_avi_emi__c}/mo</h5>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex' onClick={() => this.productDetail(item.sfid)}>
                                                    <div className='price-width-discount'>
                                                        <p className='mb-0 p2'>Stride Price</p>

                                                        <span className='current-price'>₹{item.price__c}</span>
                                                        <span className='previous-price ml-2'>₹{item.mrp__c}</span>
                                                    </div>
                                                    <div className='discount ml-2 border-left pl-2'>
                                                        <span className='d-block'>{item.discountRate}%</span>OFF
                                                    </div>
                                                </div>
                                                <div className='wishlist'>

                                                    <button type='button' style={{ zIndex: 9999 }}>
                                                        <i
                                                            aria-hidden="true"
                                                            onClick={() =>
                                                                this.setFavourite(
                                                                    item.sfid,
                                                                    `fav-prod-item-${item.sfid}`,
                                                                )
                                                            }
                                                            id={`fav-prod-item-${item.sfid}`}
                                                            className={`d-flex justify-content-center align-items-center ${item.isFavorite ? "active fa fa-heart" : "fa fa-heart-o"}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </>
                            :

                            <>
                                {this.props.page == 'plp' ? (
                                    <div key={`product-item-${index}`} className='col-lg-3 col-md-4'>
                                        <div className='search-result-box mb-4'>
                                            {isCompareEnable  &&  (
                                                <div className='compare-check compare-checkbox'>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox"  className="custom-control-input" ref={`ref_${item.id}`} id={item.id} onChange={e => this.props.onSelectClick(e, item)} value={item.id} defaultChecked={this.props.selectedItem.includes(item.sfid)} name="check[]" />
                                                        <label className="custom-control-label" htmlFor={item.id}> Compare </label>
                                                    </div>
                                                </div>
                                            )}
                                            <div className='img-box mb-4 noverlay' onClick={() => this.productDetail(item.sfid)}>
                                                <img src={item.image_url__c && item.image_url__c} alt="" className='img-fluid mt-0 ' />
                                            </div>
                                            <div className="tags">Top Deal</div>
                                            <div className='px-3 pb-3'>
                                                <div onClick={() => this.productDetail(item.sfid)}>
                                                    <p>{item.name.split(' ').splice(0, 3).join(' ')}</p>
                                                    <h5 className='emi_txt'>EMI Starting ₹{item.min_avi_emi__c}/mo</h5>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-end'>
                                                    <div className='d-flex' onClick={() => this.productDetail(item.sfid)}>
                                                        <div className='price-width-discount'>
                                                            <p className='mb-0 p2'>Stride Price</p>

                                                            <span className='current-price'>₹{Number(item.price__c).toFixed(2)}</span>
                                                            <span className='previous-price ml-2'>₹{Number(item.mrp__c).toFixed(2)}</span>
                                                        </div>
                                                        <div className='discount ml-2 border-left pl-2'>
                                                            <span className='d-block'>{item.discountRate}%</span>OFF
                                                        </div>
                                                    </div>

                                                    <div className="notifyMe d-none">
                                                        <h4>Out of Stock</h4>

                                                        <button type="button" class="pay-btn notifyMebtn">Notify Me</button>
                                                    </div>

                                                    <div className='wishlist'>

                                                        <button type='button' style={{ zIndex: 9999 }}>
                                                            <i
                                                                aria-hidden="true"
                                                                onClick={() =>
                                                                    this.setFavourite(
                                                                        item.sfid,
                                                                        `fav-prod-item-${item.sfid}`,
                                                                    )
                                                                }
                                                                id={`fav-prod-item-${item.sfid}`}
                                                                className={`d-flex justify-content-center align-items-center ${item.isFavorite ? "active fa fa-heart" : "fa fa-heart-o"}`}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                

                                            </div>

                                        </div>

                                    </div>
                                ) : (
                                    <div key={'item' + index} className="cursor-point p-3 item d-flex flex-column bg-pro rounded-4 electric">
                                        <div className="d-flex align-items-baseline justify-content-end">
                                            <div className='wishlist'>
                                                <button type='button' className="wish" >
                                                    <i
                                                        aria-hidden="true"
                                                        onClick={() =>
                                                            this.setFavourite(
                                                                item.sfid,
                                                                `fav-prod-item-${item.sfid}`,
                                                            )
                                                        }
                                                        id={`fav-prod-item-${item.sfid}`}
                                                        className={`d-flex justify-content-center align-items-center ${item.isFavorite ? "active fa fa-heart" : "fa fa-heart-o"}`}></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div onClick={() => this.productDetail(item.sfid)}>
                                            <div className="img-box" style={{ height: "10.5rem" }}>
                                                <img src={item.image_url__c} className="img-fluid"
                                                    style={{ height: "100%" }} />
                                            </div>
                                            <div className="top">
                                                <p className="mb-2">{item.name.split(' ').splice(0, 3).join(' ')}</p>
                                                {item.no_cost_emi__c && <h4>
                                                    No Cost EMI
                                                    <span className="d-block">Starting at₹{item.min_avi_emi__c} </span>
                                                </h4>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                }
            </>
        );
    }
}








