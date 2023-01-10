import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import $ from "jquery"
import About from "../common/about";
import { getHelpSuport } from '../actions/user'

class FinePrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      help_support: [],
      ques_ans: [],
      showing_answer: false,
      answer: ""
    };
  }

  componentDidMount() {



    this.props.dispatch(getHelpSuport()).then((response) => {
      if (response.status === "success") {
        this.setState({ help_support: response.data })
      }
    })


  }

  handleToggle = (val) => {
    $('#' + val).slideToggle();
    // $('#' + val).toggle();
  }

  handleLoadAnswer = (ques, answer) => {
    this.setState({ showing_answer: true })
    this.setState({ answer: answer })
    this.setState({ question: ques })
  }

  goBack = () => {
    this.setState({ showing_answer: false })
    this.setState({ answer: "" })
    this.setState({ question: "" })
  }


  handleSelectCat = (title) => {
    let res = this.state.help_support.filter((obj) => {
      return obj.title == title;
    })
    this.setState({ ques_ans: res[0].data })
  }

  render() {
    const { user, username, isSearching, searchDet, history } = this.props;
    const { help_support } = this.state
    return (
      <>
        <Helmet>
          <title> Support </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
        />
        <div className="inner-page support">
          <div className="container mb-5"> 
            <div className='row'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper pt-3'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Fine Prints</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-lg-3 mb-3">
              <div class="col-sm-12 manage_bck">
                <a href="/setting"><span>Fine Prints</span></a>
              </div> 

              <div className="fineTab col-sm-12 d-flex">
              
                <nav className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                  <div className="col-lg-12 fine_left">
                    <div class="nav " id="nav-tab" role="tablist">
                      <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        
                        <img src="images/t_c_img.png" alt="" class="img-icon" />

                        <h5>Terms & Conditions</h5>

                        <a href="" class="forward_btn tutu"><img src="images/icons/arrow_right.png" alt="" /></a>
                      </button>
                      
                      <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">

                    
                      <img src="images/privacy_img.png" alt="" class="img-icon" />

                      <h5>Data Privacy</h5>

                      <a href="" class="forward_btn tutu"><img src="images/icons/arrow_right.png" alt="" /></a>
                      </button>
                      
                      <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                      
                      <img src="images/legal_img.png" alt="" class="img-icon" />

                      <h5>Legal</h5>

                      <a href="" class="forward_btn tutu"><img src="images/icons/arrow_right.png" alt="" /></a>
                      </button>
                    </div>
                  </div>
                </nav>

                <div class="tab-content col-lg-7 col-md-7 col-sm-12 col-xs-12" id="nav-tabContent" >
                  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="fine_content">

                      <h6>Terms & Conditions</h6>

                      <ul class="pl-3">

                        <li><b>Stride Act:</b> This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                        </li>
                        
                        <li><b>Act No. 3:</b> This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of careers.myntra.com, life.myntra.com & blog.myntra.com website.
                        </li>

                        <li><b>Product Policy:</b> The use of any product, service or feature (the “Materials”) available through careers.myntra.com, life.myntra.com & blog.myntra.com (hereinafter referred to as “Website”) is owned by Myntra Designs Private Limited, a company incorporated under the Companies Act, 1956 with its registered office at 3rd floor, AKR Tech Park, 7th Mile, Krishna Reddy Industrial Area, Kudlu Gate, Bangalore-560068, Karnataka, India (hereinafter referred to as “Myntra”).
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. Myntra allows the User to surf the Website without registering on the Website. The term “We”, “Us”, “Our” shall mean Myntra Designs Private Limited.
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. 
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. Myntra allows the User to surf the Website without registering on the Website. The term “We”, “Us”, “Our” shall mean Myntra Designs Private Limited.
                        </li>

                      </ul>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div class="fine_content">

                      <h6>Data Privacy</h6>

                      <ul class="pl-3">

                        <li><b>Stride Act:</b> This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                        </li>
                        
                        <li><b>Act No. 3:</b> This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of careers.myntra.com, life.myntra.com & blog.myntra.com website.
                        </li>

                        <li><b>Product Policy:</b> The use of any product, service or feature (the “Materials”) available through careers.myntra.com, life.myntra.com & blog.myntra.com (hereinafter referred to as “Website”) is owned by Myntra Designs Private Limited, a company incorporated under the Companies Act, 1956 with its registered office at 3rd floor, AKR Tech Park, 7th Mile, Krishna Reddy Industrial Area, Kudlu Gate, Bangalore-560068, Karnataka, India (hereinafter referred to as “Myntra”).
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. Myntra allows the User to surf the Website without registering on the Website. The term “We”, “Us”, “Our” shall mean Myntra Designs Private Limited.
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. 
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. Myntra allows the User to surf the Website without registering on the Website. The term “We”, “Us”, “Our” shall mean Myntra Designs Private Limited.
                        </li>

                      </ul>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <div class="fine_content">

                      <h6>Legal</h6>

                      <ul class="pl-3">

                        <li><b>Stride Act:</b> This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                        </li>
                        
                        <li><b>Act No. 3:</b> This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of careers.myntra.com, life.myntra.com & blog.myntra.com website.
                        </li>

                        <li><b>Product Policy:</b> The use of any product, service or feature (the “Materials”) available through careers.myntra.com, life.myntra.com & blog.myntra.com (hereinafter referred to as “Website”) is owned by Myntra Designs Private Limited, a company incorporated under the Companies Act, 1956 with its registered office at 3rd floor, AKR Tech Park, 7th Mile, Krishna Reddy Industrial Area, Kudlu Gate, Bangalore-560068, Karnataka, India (hereinafter referred to as “Myntra”).
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. Myntra allows the User to surf the Website without registering on the Website. The term “We”, “Us”, “Our” shall mean Myntra Designs Private Limited.
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. 
                        </li>

                        <li><b>Purpose of Terms:</b>For the purpose of these Terms of Use, wherever the context so requires “You” or “User” shall mean any natural or legal person who visits or uses the Website. Myntra allows the User to surf the Website without registering on the Website. The term “We”, “Us”, “Our” shall mean Myntra Designs Private Limited.
                        </li>

                      </ul>
                      </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet } = state.product
  return {
    isSearching,
    isLoading,
    searchDet,
    username,
    user,
    sfid
  };
}

export default connect(mapStateToProps)(FinePrint);
