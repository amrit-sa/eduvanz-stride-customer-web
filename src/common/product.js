import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Product extends React.Component{

    render(){
        return(
            <>
            <section className="bg0 p-t-23 p-b-30">
                <div className="container">
                  <div className="p-b-10">
                    <h3 className="ltext-103 cl5">Product Overview</h3>
                  </div>
                  <div className="flex-w flex-sb-m p-b-52">
                    <div className="flex-w flex-l-m filter-tope-group m-tb-10">
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                        data-filter="*"
                      >
                        All Products
                      </button>
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-filter=".Electronics"
                      >
                        Electronics
                      </button>
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-filter=".Fashion"
                      >
                        Fashion
                      </button>
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-filter=".Education"
                      >
                        Education
                      </button>
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-filter=".Health"
                      >
                        Health Care
                      </button>
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-filter=".Travel"
                      >
                        Travel
                      </button>
                      <button
                        className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                        data-filter=".Automobile"
                      >
                        Automobile
                      </button>
                    </div>
                    <div className="flex-w flex-c-m m-tb-10">
                      <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                        <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search" />
                        <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none" />
                        Search
                      </div>
                    </div>
                    {/* Search product */}
                    <div className="dis-none panel-search w-full p-t-10 p-b-15">
                      <div className="bor8 dis-flex p-l-15">
                        <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                          <i className="zmdi zmdi-search" />
                        </button>
                        <input
                          className="mtext-107 cl2 size-114 plh2 p-r-15"
                          type="text"
                          name="search-product"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row isotope-grid">
                    <div className="col-sm-4 col-md-2 col-lg-2 p-b-35 isotope-item Education">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/services/education.png" alt="IMG-PRODUCT" />
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l texttopservices">
                            <a
                              href="#"
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              Education
                            </a>
                          </div>
                          <div className="block2-txt-child2 flex-r p-t-3 clickicon">
                            <Link
                              to="/bank_screen9"
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                              <i className="lnr lnr-arrow-right-circle right-circle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-2 col-lg-2 p-b-35 isotope-item Electronics">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/services/electrical.png" alt="IMG-PRODUCT" />
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l texttopservices">
                            <a
                              href="#"
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              Electronics
                            </a>
                          </div>
                          <div className="block2-txt-child2 flex-r p-t-3 clickicon">
                            <Link
                              to="/bank_screen9"
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                              <i className="lnr lnr-arrow-right-circle right-circle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-2 col-lg-2 p-b-35 isotope-item Fashion">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/services/fashion.png" alt="IMG-PRODUCT" />
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l texttopservices">
                            <a
                              href="#"
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              Fashion
                            </a>
                          </div>
                          <div className="block2-txt-child2 flex-r p-t-3 clickicon">
                            <Link
                              to="/bank_screen9"
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                              <i className="lnr lnr-arrow-right-circle right-circle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-2 col-lg-2 p-b-35 isotope-item Health">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/services/healthcare.png" alt="IMG-PRODUCT" />
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l texttopservices">
                            <a
                              href="#"
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              Health Care
                            </a>
                          </div>
                          <div className="block2-txt-child2 flex-r p-t-3 clickicon">
                            <Link
                              to="/bank_screen9"
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                              <i className="lnr lnr-arrow-right-circle right-circle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-2 col-lg-2 p-b-35 isotope-item Travel">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/services/travel.png" alt="IMG-PRODUCT" />
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l texttopservices">
                            <a
                              href="#"
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              Travel
                            </a>
                          </div>
                          <div className="block2-txt-child2 flex-r p-t-3 clickicon">
                            <Link
                             to="/bank_screen9"
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                              <i className="lnr lnr-arrow-right-circle right-circle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-2 col-lg-2 p-b-35 isotope-item Automobile">
                      {/* Block2 */}
                      <div className="block2">
                        <div className="block2-pic hov-img0">
                          <img src="images/services/auto.png" alt="IMG-PRODUCT" />
                        </div>
                        <div className="block2-txt flex-w flex-t p-t-14">
                          <div className="block2-txt-child1 flex-col-l texttopservices">
                            <a
                              href="#"
                              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                            >
                              Automobile
                            </a>
                          </div>
                          <div className="block2-txt-child2 flex-r p-t-3 clickicon">
                            <Link
                              to="/bank_screen9"
                              className="btn-addwish-b2 dis-block pos-relative js-addwish-b2"
                            >
                              <i className="lnr lnr-arrow-right-circle right-circle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
        )
    }
}

export default connect()(Product);