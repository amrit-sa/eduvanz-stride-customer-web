import React from "react";
// import Carousel from 'react-bootstrap/Carousel'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import OutsideClickHandler from 'react-outside-click-handler';
import { asset } from "../common/assets";

class Slider extends React.Component {


  render() {
    return (
      <>
        <section className="section-slide">
          <Carousel
            showThumbs={false}
            showStatus={false}
          >
            <div className="slider-column">
              <div className="leftcol">

                <picture>

                  <source srcSet={`${asset}images/slider/slide-01.png`} media="(min-width: 568px)" />
                  <img src={`${asset}images/slider/slide-mob.png`} alt="" />
                </picture>
              </div>
              <div className="caption position1">
                <h3>  <img src={`${asset}images/store/apple_logo.png`} /> MacBook Air</h3>
                <h2>No Cost EMI<span className=""> Starting ₹2,200 </span></h2>
              </div>
            </div>
            <div className="slider-column">
              <div className="leftcol">

                <picture>

                  <source srcSet={`${asset}images/slider/slide-01.png`} media="(min-width: 568px)" />
                  <img src={`${asset}images/slider/slide-mob.png`} alt="" />
                </picture>
              </div>
              <div className="caption position1">
                <h3>  <img src={`${asset}images/store/apple_logo.png`} /> MacBook Air</h3>
                <h2>No Cost EMI<span className=""> Starting ₹2,200 </span></h2>
              </div>
            </div>
            <div className="slider-column">
              <div className="leftcol">

                <picture>

                  <source srcSet={`${asset}images/slider/slide-01.png`} media="(min-width: 568px)" />
                  <img src={`${asset}images/slider/slide-mob.png`} alt="" />
                </picture>
              </div>
              <div className="caption position1">
                <h3>  <img src={`${asset}images/store/apple_logo.png`} /> MacBook Air</h3>
                <h2>No Cost EMI<span className=""> Starting ₹2,200 </span></h2>
              </div>
            </div>
            <div className="slider-column">
              <div className="leftcol">
                <picture>

                  <source srcSet={`${asset}images/slider/slide-01.png`} media="(min-width: 568px)" />
                  <img src={`${asset}images/slider/slide-mob.png`} alt="" />
                </picture>
              </div>
              <div className="caption position1">
                <h3>  <img src={`${asset}images/store/apple_logo.png`} /> MacBook Air</h3>
                <h2>No Cost EMI<span className="">Starting ₹2,200 </span></h2>
              </div>
            </div>
            <div className="slider-column">
              <div className="leftcol">
                <picture>

                  <source srcSet={`${asset}images/slider/slide-01.png`} media="(min-width: 568px)" />
                  <img src={`${asset}images/slider/slide-mob.png`} alt="" />
                </picture>
              </div>
              <div className="caption position1">
                <h3>  <img src={`${asset}images/store/apple_logo.png`} /> MacBook Air</h3>
                <h2>No Cost EMI<span className=""> Starting ₹2,200 </span></h2>
              </div>
            </div>
          </Carousel>
        </section>
        <div className="mobile-search-bar-block d-block d-md-none">
          <div className='top_search_box_wrapper '>
            <div className='top_search_box '>
              <input
                className='header-search-input'
                type="text"
                placeholder='Search for Brands, Products and more'
                name="search"
                autoComplete="off" />
              <button className='search-clear' type="" >
                <img src={`${asset}images/icons/cross3.png`} alt="" className='img-fluid' />
              </button>

              <button type="button" className='search_btn'>
                <img src={`${asset}images/icons/search_icon.png`} alt="" className='img-fluid' />
              </button>
            </div>

          </div>
        </div>
      </>
    )
  }
}

export default Slider;