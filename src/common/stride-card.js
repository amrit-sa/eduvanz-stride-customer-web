import React from "react";
import { connect } from 'react-redux';
import { getAccountProfile } from "../actions/user";
import { asset } from "../common/assets";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


class StrideCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      userData: null,
      proData: null
    };
  }

  async componentDidMount() {
    const { user, sfid } = this.props;
    if (user) {
      let obj = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(obj)).then((response) => {
        if (response.status === "success") {
          const getObj = response.accountDet;
          const proData = getObj && getObj.account_profile ? getObj.account_profile : null;
          this.setState({ userData: getObj, proData: proData });
        }
      });
    }
  }

  handleProBuy = () => {
    const { history, user } = this.props
    if (!user) {
      window.location = "/login";
    } else {
      const getObj = this.state.userData;
      const address = getObj && getObj.current_address_id__c ? getObj.current_address_id__c : null;
      if (getObj.account_status__c === "Full User") {
        window.location = "/virtual_card1";
      } else if (!getObj.email__c) {
        window.location = "/ed_custdetails";
      } else if (getObj.pan_number__c && !getObj.pan_verified__c) {
        window.location = "/ed_pan_update";
      }
      else if (!getObj.pan_number__c) {
        window.location = "/ed_pan_update";
      } else if (!getObj.is_qde_1_form_done__c) {
        window.location = "/ed_qdform";
      } else if (!getObj.ipa_basic_bureau__c && getObj.pan_verified__c) {
        window.location = "/edawaiting";
      } else if (!getObj.ipa_basic_bureau__c && !getObj.pan_verified__c) {
        window.location = "/edreject";
      } else if (getObj.ipa_basic_bureau__c && !getObj.pan_verified__c) {
        window.location = "/edawaiting";
      } else if (getObj.ipa_basic_bureau__c && getObj.pan_verified__c && !getObj.is_limit_confirm__c) {
        window.location = "/ed_limit";
      } else if (!getObj.is_qde_2_form_done__c) {
        window.location = "/ed_salary";
      } else if (!address) {
        window.location = "/ed_address";
      } else if (!getObj.is_kyc_document_verified__c) {
        window.location = "/ed_doc_profile";
      } else if (!getObj.is_bank_detail_verified__c) {
        window.location = "/edonebanklist";
      } else {
        window.location = "/virtual_card1";
      }
    }


  }

  render() {
    return (
      <>
        <section className="bg0 pt-5 overflow-hidden bestSeller bottom-after-image">
          <div className="container">
            <div className="row justify-content-center px-3">
              <div className="col-sm-12   bg_GhostWhite card-bg-image position-rel">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-sm-6">
                    <div className="card_img">
                      <img src={`${asset}images/products/card.png`} className="img-fluid" />
                    </div>
                  </div>

                  {/* <div className="col-lg-8  col-sm-6 text-right stride_txt">

                    <div className="row">
                      <div className="col-sm-12 pr-lg-0">
                        <div className="py-lg-5 py-4 tex-left">
                          <h3>Stride <br/> Virtual Card</h3>
                          <p>Trusted by 7 million+Indians</p>
                           <button onClick={this.handleProBuy} className="mt-lg-3 strike-btn">Take a Stride</button>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="figure1 px-5">
                          <img src={`images/bg-blue-vector.png`} className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            
            </div>
          
          </div>
          
        </section>
        <div className="center-vector-img">
               <img src={`${asset}images/vector-dri.png`}/>
        </div>
      </>
    )
  }
}
function mapStateToProps(state) {
  const { user, sfid, isLoading } = state.auth;
  return {
    user,
    sfid,
    isLoading,
  };
}

export default connect(mapStateToProps)(StrideCard);