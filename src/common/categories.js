import React from "react";
import { connect } from 'react-redux';
import { getCategory } from "../actions/user";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from "../common/assets";
import {getMasterCategory} from "../actions/product";


const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items:4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


class Categories extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        content: "",
        appUrl: null
      };
    }

    componentDidMount(){
       this.props.dispatch(getCategory({"parent_id":"0"}));
        // this.props.dispatch(getMasterCategory({"parent_id":"0"})).then((response) => {
        //     this.setState({allCategoryData: response})
        //     console.log(response,'mastercat')
        // });

       if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        const appUrl = process.env.REACT_APP_PUBLIC_DEV_URL;
        this.setState({appUrl: appUrl})
      } else {
        const appUrl = process.env.REACT_APP_PUBLIC_LIVE_URL;
        this.setState({appUrl: appUrl})
      }
    }
    render(){
        const { userMessage, category, isLoading } = this.props;
        return(
            <>
            <section className="bg0 pt-lg-3 pb-lg-3 overflow-hidden category-sliders-card">
                <div className="container ">
                <div className="d-flex justify-content-center slider-after-bg">
                  <div className="col-lg-9">
                  <div className="row w-100">
                        <div className="col-lg-12 category_carousel px-lg-5 ">
                            <Carousel responsive={responsive}>
                                {category && category !== undefined && category.length > 0 &&
                                category.map((item, index)=>(
                                    <div className="item" key={'item'+index} onClick={()=> this.props.history.push("/products-list?category="+encodeURIComponent(item.category_name)) } >
                                        <div className="c_box">
                                            <div className="d-inline-flex align-items-center justify-content img-box edu">
                                                <img src={item.category_image} className="img-fluid"/></div>
                                            <h5>{item.category_name}</h5>
                                        </div>
                                    </div> 
                                ))}
                            </Carousel>
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

function mapStateToProps(state) {
    const {isLoading, user, token} = state.auth;
    const { category, userMessage, isSuccess } = state.user;
    return {
      category,
      isLoading,
      userMessage,
      isSuccess,
      user,
      token
    };
  }

export default connect(mapStateToProps)(Categories);