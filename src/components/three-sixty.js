import React, { Component } from "react";
import Helmet from "react-helmet";
import { connect } from 'react-redux'


class TreeSixty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {

    var threesixty = new ThreeSixty(document.getElementById('threesixty'), {
      image: 'images/brand/watch.jpg',
      width: 320,
      height: 320,
      count: 31,
      perRow: 4,
      speed: 100,
      prev: document.getElementById('prev'),
      next: document.getElementById('next') });
    
    
    threesixty.play();
   
  }
  render() {
    return (
      <>
      <h1>360</h1>
      <div className="wrapper">
        <div id="threesixty"></div>
          <div className="buttons-wrapper">
            <button className="button" id="prev">Prev</button>
            <button className="button" id="next">Next</button>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, isLoading } = state.auth;
  const { product, userMessage, product_id } = state.user;
  return {
      user,
      sfid,
      isLoading,
      product,
      product_id,
      userMessage
  };
}

export default connect(mapStateToProps)(TreeSixty);
