import {
  LOADING_FAILD,
  LOADING_SUCCESS,
  ON_TIMES_PAYMENTS
} from "./types";
import UserService from "../services/user.service";

export const GET_SELECTED_PLAN = "GET_SELECTED_PLAN";
export const GET_PLAN_SUCCESS = "GET_PLAN_SUCCESS";
export const GET_PLAN_FAILD = "GET_PLAN_FAILD";
export const GET_DOWN_PAYMENT = 'GET_DOWN_PAYMENT';
export const GET_ACCOUNT_PRODUCT_SUCCESSS = "GET_ACCOUNT_PRODUCT_SUCCESSS";
export const GET_ACCOUNT_PRODUCT_FAILD = "GET_ACCOUNT_PRODUCT_FAILD";
export const GET_PLAN_DETAILS_SUCCESS = "GET_PLAN_DETAILS_SUCCESS";
export const GET_PLAN_DETAILS_FAILD = "GET_PLAN_DETAILS_FAILD";
export const TIMELINE_DATA = "TIMELINE_DATA";
export const CANCEL_CARD = "CANCEL_CARD";
export const ACTIVE_CARDS = "ACTIVE_CARDS"
export const ACTIVE_FAILURE = "ACTIVE_FAILURE"

export const selectPlan = (getData) => (dispatch) => {
  localStorage.setItem("plan", getData);
  console.log('getData',getData)
  dispatch({
    type: GET_SELECTED_PLAN,
    payload: getData
  });
}

export const storeDownPayment = (getData) => (dispatch) => {
  localStorage.setItem("down_payment", getData);
  dispatch({
    type: GET_DOWN_PAYMENT,
    payload: getData
  });
}

export const enquiry_now = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'enquiry_now').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    }).catch((err)=>{
      dispatch({
        type: LOADING_FAILD
      });
    })
};


export const getLoanAgreement = (opp_id) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get(`personal_loan/${opp_id}`).then(
      (response) => {
        dispatch({
          type: LOADING_FAILD
        });
        return response;
      }).catch((error) => {
        dispatch({
          type: LOADING_FAILD
        });
        return Promise.reject();
      })
};

export const enroll_now = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'enroll_now').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    }).catch((err)=>{
      dispatch({
        type: LOADING_FAILD
      });
    })
};

export const addCard = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'add_card').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const updatePayment = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'update_payment').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const generateVCard = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'generate_virtual_card').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const shareVcard = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'share_vcard').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getVCard = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'get_last_card').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getCards = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'cards').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const payCards = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'payCards').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const payUpiId = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'payUpi').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const payQrcode = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'payQrcode').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const payNetBanking = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'payNetbanking').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const payWallets = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'payWallets').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getPreferred = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'preferred_payment').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getPlanById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'getPlanById').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response.status === "success") {
        dispatch({
          type: GET_PLAN_DETAILS_SUCCESS,
          payload: response.data
        })
      }

      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_PLAN_DETAILS_FAILD
      })
    }
  );
};

export const getUserProduct = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'getAccountProduct').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response.status === "success") {
        dispatch({
          type: GET_ACCOUNT_PRODUCT_SUCCESSS,
          payload: response.data
        })
      }

      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_ACCOUNT_PRODUCT_FAILD
      })
    }
  ).catch(err => {
    dispatch({
      type: LOADING_FAILD
    });
    dispatch({
      type: GET_ACCOUNT_PRODUCT_FAILD
    })
  })
};

export const showTimeLine = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'merchant_product_payment_plan').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: "GET_PLAN_TIMELINE",
        payload: response
      })
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: "GET_PLAN_TIMELINE_FAILD"
      })
    }
  );
};

export const getPlans = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  // return UserService.post(givendata,'get_product_plan').then(
  return UserService.post(givendata, 'paymentplans').then(
    (response) => {
      console.log(response, 'resp')

      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_PLAN_SUCCESS,
        payload: response.paymentPlan
      })
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_PLAN_FAILD
      })
    }
  );
};

export const createRazorpay = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'enash_payment').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return Promise.reject();
    });
};
export const sendViewTimelineData = (getData) => (dispatch) => {
  dispatch({
    type: TIMELINE_DATA,
    payload: getData,
  });
};
export const cancelCard = (getData) => (dispatch) => {
  dispatch({
    type: CANCEL_CARD,
  });
  return UserService.post(getData, 'close_vitual_card').then(
    (response) => {
      dispatch({
        type: CANCEL_CARD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return Promise.reject();
    });
};
export const getActiveCards = (getData) => (dispatch) => {
  dispatch({
    type: ACTIVE_CARDS,
  });
  return UserService.post(getData, 'get_virtual_active_cards').then(
    (response) => {
      dispatch({
        type: ACTIVE_CARDS
      });
      return response;
    },
    (error) => {
      dispatch({
        type: ACTIVE_FAILURE,
      });
      return Promise.reject();
    });
};
