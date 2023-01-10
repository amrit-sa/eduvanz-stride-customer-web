import React from "react";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import {getBestDeals} from "../actions/product";
import {getProductsJSX} from "../helpers/DealLayoutGenerator";


class TopBikeDeal extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
            products:[]
        };
        
      }
    
      componentDidMount()
      {
          this.props.dispatch(getBestDeals()).then((response)=>{
              this.setState({products:response})
          });
      }

    render(){
        return(
            <>
            <section className="bg0 pt-3 pb-5 overflow-hidden top-deal">
                <div className="container pl-3">
                  <div className="row">
                    <div className="col">
                    <h3 className="section_title mb-lg-4 mb-3">
                            Best Deals
                        </h3>
                      <div className="topdeal_wrapper">
                        <ul className="d-flex topdeal list-unstyled">
                            {getProductsJSX(this.state.products)}
                        </ul>
                        </div>
                    </div>
                  </div>
                </div>
                  
             
                <div className="container">
                  <div className="col d-flex  justify-content-end">
                      <div className="cont">
                        {/* <p><input type="text" id="amount"/></p> */}
                        <div id="slider-range-max2"></div>
                      </div>
                  </div>
                </div>
              </section>
            </>
        )
    }
}

export default connect()(TopBikeDeal);