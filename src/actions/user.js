import {
  ADD_USER_ADDRESS, 
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_USER_ADDRESS,
  UPDATE_ACCOUNT_FAILD,
  UPDATE_SALARY_SUCCESS,
  UPDATE_SALARY_FAILD,
  UPDATE_SUB_SOURCE,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILD,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILD,
  GET_BANK_SUCCESS,
  GET_BANK_FAILD,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILD,
  UPDATE_SALARY,
  STORE_RESIDENT,
  LOADING_FAILD,
  LOADING_SUCCESS,
  UPDATE_USER_BANK,
  UPDATE_USER_BANK_DETAILS,
  GET_PRODUCT_FAILD,
  GET_PRODUCT_SUCCESS,
  GET_FAQ_FAILD,
  GET_FAQ_SUCCESS,
  GET_LEARN_FAILD,
  GET_LEARN_SUCCESS,
  GET_INSTRUCTOR_SUCCESS,
  GET_INSTRUCTOR_FAILD,
  GET_FEEDBACK_SUCCESS,
  GET_FEEDBACK_FAILD,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILD,
  GET_ENACH_SUCCESS,
  GET_ENACH_FAILD,
  ENACH_STATUS_SUCCESS,
  ENACH_STATUS_FAILD,
  GET_VIEWED_FAILD,
  GET_VIEWED_SUCCESS,
  VIEWED_PRODUCT_FAILD,
  VIEWED_PRODUCT_SUCCESS,
  SIMILAR_PRODUCT_FAILD,
  SIMILAR_PRODUCT_SUCCESS,
  GET_STORE_RATING_FAILD,
  GET_STORE_RATING_SUCCESS,
  GET_SELECTED_PRODUCT_FAILD,
  GET_SELECTED_PRODUCT_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import UserService from "../services/user.service";


export const ENTITY_SEACH_SUCCESS = "ENTITY_SEACH_SUCCESS";
export const ENTITY_SEACH_FAILD   = "ENTITY_SEACH_FAILD";
export const UPDATE_RENT_SUCCESS = "UPDATE_RENT_SUCCESS";
export const UPDATE_RENT_FAILD   = "UPDATE_RENT_FAILD";
export const UPDATE_USER_ADDRESS_SUCCESS = "UPDATE_USER_ADDRESS_SUCCESS";
export const UPDATE_USER_ADDRESS_FAILD   = "UPDATE_USER_ADDRESS_FAILD";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILD   = "UPDATE_USER_PROFILE_FAILD";
export const UPLOAD_DOCUMENT_SUCCESS = "UPLOAD_DOCUMENT_SUCCESS";
export const UPLOAD_DOCUMENT_FAILD   = "UPLOAD_DOCUMENT_FAILD";
export const GET_DIGILOCKER_SUCCESS  = "GET_DIGILOCKER_SUCCESS";
export const GET_DIGILOCKER_FAILD    = "GET_DIGILOCKER_FAILD";
export const OPEN_CAMERA_SUCCESS     = "OPEN_CAMERA_SUCCESS";
export const CLOSE_CAMERA_SUCCESS    = "CLOSE_CAMERA_SUCCESS";
export const SEARCH_ENTITY_SUCCESS   = "SEARCH_ENTITY_SUCCESS";
export const SEARCH_ENTITY_FAILD     = "SEARCH_ENTITY_FAILD";
export const CLEAR_SEARCH_ENTITY     = "CLEAR_SEARCH_ENTITY";
export const UPDATE_INCOME_DETAILS   = "UPDATE_INCOME_DETAILS";
export const BUY_PRODUCT_SUCCESS     = "BUY_PRODUCT_SUCCESS";
export const ONEMONEY_LINKED_SUCCESS = "ONEMONEY_LINKED_SUCCESS";
export const ONEMONEY_LINKED_FAILD   = "ONEMONEY_LINKED_FAILD";
export const GET_RELATED_CAT_SUCCESS = "GET_RELATED_CAT_SUCCESS";
export const GET_RELATED_CAT_FAILD   = "GET_RELATED_CAT_FAILD";
export const SET_LOAN_AMOUNT         = "SET_LOAN_AMOUNT";
export const ON_SEARCHING_TRUE       = "ON_SEARCHING_TRUE";
export const ON_SEARCHING_FALSE      = "ON_SEARCHING_FALSE";
export const SFID_UPDATE_SUCCESS     = "SFID_UPDATE_SUCCESS";
export const GET_HIGHER_LIMIT        = "GET_HIGHER_LIMIT";
export const UPDATE_USER_PROFILE_BASE = "UPDATE_USER_PROFILE_BASE";
export const UPDATE_PRODUCT_SUCCESS   = "UPDATE_PRODUCT_SUCCESS";
export const GET_STORE_SUCCESS       = "GET_STORE_SUCCESS";
export const GET_STORE_FAILD         = "GET_STORE_FAILD";
export const SEND_INCOME         = "SEND_INCOME";
export const SELF_EMPLOYEMENT_TYPE         = "SELF_EMPLOYEMENT_TYPE";


export const clearLocalStorage = (getData) => (dispatch) => {
  localStorage.removeItem("productId");
  localStorage.removeItem("product_id");
  localStorage.removeItem("higher_limit");
  localStorage.removeItem("previousPath");
  localStorage.removeItem("merchant_id");
}

export const getHigherLimit = () => (dispatch) => {
  localStorage.setItem("higher_limit", true);
  dispatch({
    type: GET_HIGHER_LIMIT
  });
}
export const noLimit = () => (dispatch) => {
  localStorage.setItem("limit_Available", false);
  dispatch({
    type: GET_HIGHER_LIMIT
  });
}
export const buyProduct = (getData) => (dispatch) => {
  localStorage.setItem("productId", getData);
  localStorage.setItem("product_id", getData);
  dispatch({
    type: BUY_PRODUCT_SUCCESS,
    payload: getData
  });
}

export const updatePaymentData = (getData) => (dispatch) => {
  localStorage.setItem("plan_id", getData.plan);
  localStorage.setItem("product_id", getData.product_id);
  dispatch({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: getData
  });
}

export const downloadBankStatementFaild = (getData) => (dispatch) => {
  dispatch({
    type: ONEMONEY_LINKED_FAILD
  });
}


export const updateBank = (getData) => (dispatch) => {
  localStorage.setItem("userBank", JSON.stringify(getData));
  dispatch({
    type: UPDATE_USER_BANK,
    payload: getData
  });
}

export const updateBankDetails = (getData) => (dispatch) => {
  localStorage.setItem("accountNo", getData);
  dispatch({
    type: UPDATE_USER_BANK_DETAILS,
    payload: getData
  });
}

export const getTnC = () => (dispatch) => {
  return UserService.post('','terms_and_conditions').then(
    (response) => {
      return response;
    });
};
export const getPP = () => (dispatch) => {
  return UserService.post('','privacy_policy').then(
    (response) => {
      return response;
    });
};
export const getLegal = () => (dispatch) => {
  return UserService.post('','legal').then(
    (response) => {
      return response;
    });
};


export const getBankDetails = (givendata) => (dispatch) => {
  return UserService.post(givendata,'get_account_bank').then(
    (response) => {
      return response;
    });
};


export const add_user_address = (useraddress) => (dispatch) =>{
  dispatch({
    type: ADD_USER_ADDRESS,
    payload : useraddress
  })
}

export const createRazorPayOrder = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(givendata,'enash_payment').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    }).catch(()=>{
      dispatch({ type: LOADING_FAILD});
    });
};
export const physicalNachRazorpay = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(givendata,'physicalnach_payment').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    }).catch(()=>{
      dispatch({ type: LOADING_FAILD});
    });
};

export const createOrder = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(givendata,'create_transaction').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    }).catch(()=>{
      dispatch({ type: LOADING_FAILD});
    });
};

export const makePayment = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(givendata,'make_payment').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    }).catch((err)=>{
      dispatch({ type: LOADING_FAILD});
      return err;
    });
};

export const updateAccountStatus = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(givendata,'update_user_status').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    }).catch(()=>{
      dispatch({ type: LOADING_FAILD});
    });
};
export const enachRegistration = (givendata) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(givendata,'enach_registration').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    }).catch(()=>{
      dispatch({ type: LOADING_FAILD});
    });
};

export const updateUserAddress = (getData) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_ADDRESS,
    payload: getData
  });
}

export const openCamera = () => (dispatch) => {
  dispatch({
    type: OPEN_CAMERA_SUCCESS
  });
}

export const closeCamera = () => (dispatch) => {
  dispatch({
    type: CLOSE_CAMERA_SUCCESS
  });
}

export const storeIncome = (getData) => (dispatch) => {
  dispatch({
    type: UPDATE_SALARY,
    payload: getData,
  });
}

export const storeSubSource = (getData) => (dispatch) => {
  dispatch({
    type: UPDATE_SUB_SOURCE,
    payload: getData,
  });
}

export const clearSearchEntity = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_ENTITY,
  });
}

export const updateLimit = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(getData, 'update_ipabureau').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD});
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};
export const isStatementUpload = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(getData, 'doc_status_verification').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD});
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};
export const getDocumentByType = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(getData, 'getDocumentByType').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD});
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};


export const getLenderbyId = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(getData, 'get_lender_by_opp_id').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD});
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const checkIfsc = (getData) => (dispatch) => {
  dispatch({ type: LOADING_SUCCESS});
  return UserService.post(getData, 'check_ifsc').then(
    (response) => {
      dispatch({ type: LOADING_FAILD});
      return response;
    },
    (error) => {
      dispatch({ type: LOADING_FAILD});
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const checkAccount = (getData) => (dispatch) => {
  return UserService.post(getData, 'check_bank_account').then(
    (response) => {
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const updateUserBank = (getData) => (dispatch) => {
  return UserService.post(getData, 'update_bank').then(
    (response) => {
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};



export const convertToBase64 = (getData) => (dispatch) => {
  return UserService.post(getData, 'base64_encode').then(
    (response) => {
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};
export const getHelpSuport = () => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('help_and_support').then(
      (response) => {
        dispatch({
          type: LOADING_SUCCESS
        });
        return response;
      }).catch((error) => {
        dispatch({
          type: LOADING_FAILD
        });
        return Promise.reject();
      })
};

export const load_city_state_list= () => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('get_city_state').then(
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

export const getSpecificDetails = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('help_and_support?queryid='+givenData).then(
      (response) => {
        dispatch({
          type: LOADING_SUCCESS
        });
        return response;
      }).catch((error) => {
        dispatch({
          type: LOADING_FAILD
        });
        return Promise.reject();
      })
};


export const sendEmailOtp = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'send_email_otp').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};


export const sendOtp = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'send_mobile_otp').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const Update_mobile = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_user_mobile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const getMoreSeller = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'more_sellers').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const Update_email = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_user_email').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};


export const documentSubmit = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'heroku_upload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};


export const createTransApp = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'create_trans_app').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const updateEmpType = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_employment').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const submitCoApplicant = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'coApplicant').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const removeDocument = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'removeDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const removeProfile = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'removeProfile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const getIncomeDetails = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getIncomeDetails').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {
        let getdata = response.data
          dispatch({
            type: UPDATE_SALARY,
            payload: getdata.employer_type__c,
          });
          dispatch({
            type: UPDATE_INCOME_DETAILS,
            payload: getdata
          })
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
    }
  );
};

export const searchEntity = (givendata) => (dispatch) => {
  dispatch({
    type: ENTITY_SEACH_SUCCESS
  });
  return UserService.post(givendata,'check_entity').then(
    (response) => {
      dispatch({
        type: ENTITY_SEACH_FAILD
      });
      if(response.status ==="success")
      {
        dispatch({
          type: SEARCH_ENTITY_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: ENTITY_SEACH_FAILD
      });
      dispatch({
        type: SEARCH_ENTITY_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getDigilocker = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getDigilockerDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {
        dispatch({
          type: GET_DIGILOCKER_SUCCESS,
          payload: response.data
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_DIGILOCKER_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const downloadDigilocker = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'digilockerDownload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const storeResident = (getData) => (dispatch) => {
  localStorage.setItem("isRented", getData.isRented);
  localStorage.setItem("rent_amount", getData.rent_amount);
  dispatch({
    type: STORE_RESIDENT,
    payload: getData,
  });
}

export const getBureau = (getData) => (dispatch) => {
  return UserService.post(getData, 'bureau-api').then(
    (response) => {
      console.log("response", response);
    },
    (error) => {
     console.log("error", error);
    }
  );
};

export const updateResidentType = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_res_type').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const updateUserRent = (givendata) => (dispatch) => {
          localStorage.setItem('pk',"fbufrgref")
          dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_user_address').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {    
        dispatch({
          type: UPDATE_USER_ADDRESS_SUCCESS,
          payload: response.message,
        });
      }else{
        dispatch({
          type: UPDATE_USER_ADDRESS_FAILD,
          payload: response.message,
        });
      }
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: UPDATE_USER_ADDRESS_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const sendUserOtp = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'sentUserOtp').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const updateRent = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_resident_data').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {    
        dispatch({
          type: UPDATE_RENT_SUCCESS,
          payload: response.message,
        });
      }else{
        dispatch({
          type: UPDATE_RENT_FAILD,
          payload: response.message,
        });
      }
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: UPDATE_RENT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const removeAddress = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'remove_address').then(
    (response) => {
      // dispatch({
      //   type: LOADING_FAILD
      // });
      if(response.status ==="success")
      {    
        
      //   dispatch({
      //     type: "REMOVE_ADDRESS_SUCCESS",
      //     payload: givendata,
      //   });
      }else{
        dispatch({
          type: GET_ADDRESS_FAILD
        });
      }
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_ADDRESS_FAILD
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getAddress = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_user_address').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {    
        let obj = {
          address: response.data,
          currentAddress: response.current_address
        }
        dispatch({
          type: GET_ADDRESS_SUCCESS,
          payload: obj,
        });
      }else{
        dispatch({
          type: GET_ADDRESS_FAILD
        });
      }
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_ADDRESS_FAILD
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};



export const addressEdit = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'updateAddressById').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    })
};



export const addressUpdate = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_resident').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    })
};




export const updateAddressById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'updateAddressById').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {    
        dispatch({
          type: UPDATE_SALARY_SUCCESS,
          payload: response.message,
        });
      }else{
        dispatch({
          type: UPDATE_SALARY_FAILD,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: UPDATE_SALARY_SUCCESS,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAddressById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getAddressById').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const incomeUpdate = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_income').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      let resData = {
        incomeSource: givendata.source,
        sub_source: givendata.isProfessional
      }
      if(response.status ==="success")
      {    
        resData.message = response.message;
        dispatch({
          type: UPDATE_SALARY_SUCCESS,
          payload: resData
        });
      }else{  
        resData.message = response.message;
        dispatch({
          type: UPDATE_SALARY_FAILD,
          payload: resData
        });
      }
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        dispatch({
          type: LOADING_FAILD
        });

        dispatch({
          type: UPDATE_SALARY_SUCCESS,
          payload: message,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

      return Promise.reject();
    }
  );
};

export const getOneMoneyBanks = () => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('getOneMoneyBank').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 400)
      {    
        dispatch({
          type: GET_BANK_FAILD,
          payload: response.message,
        });
      }else{
        dispatch({
          type: GET_BANK_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BANK_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getBanks = () => (dispatch) => {
  return UserService.get('banks').then(
    (response) => {
      if(response.responseCode !== undefined && response.responseCode === 400)
      {    
        dispatch({
          type: GET_BANK_FAILD,
          payload: response.message,
        });
      }else{
        dispatch({
          type: GET_BANK_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_BANK_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const getBrandlanding = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_brand_landing').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};


export const updateAccount = (getData) => (dispatch) => {
  return UserService.post(getData,'update_account').then(
    (response) => {
      if(response.status === "success")
      {
        dispatch({
          type: UPDATE_ACCOUNT_SUCCESS,
          payload: response.message?response.message:''
        }); 
      }else{   
        dispatch({
          type: UPDATE_ACCOUNT_FAILD,
          payload: response.message?response.message:''
        });
      }
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_ACCOUNT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAccountProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData,'account_profile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status === "success")
      {
       /*  localStorage.setItem("sfid", response.accountDet?response.accountDet.sfid:'');
        localStorage.setItem("user_id", response.accountDet?response.accountDet.id:''); */
        const getdata = response.accountDet;
        let obj = {
          sfid: getdata && getdata.sfid?getdata.sfid:'',
          id: getdata && getdata.id?getdata.id:''
        }
        dispatch({
          type: SFID_UPDATE_SUCCESS,
          payload: obj
        });
        dispatch({
          type: GET_ACCOUNT_SUCCESS,
          payload: response.accountDet
        }); 
      }else{   
        dispatch({
          type: GET_ACCOUNT_FAILD
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ACCOUNT_FAILD
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};





export const updateBre1 = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData,'update_bre1').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const updateOneMoney = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData,'update_onemoney').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status !=="success")
      {
        dispatch({
          type: ONEMONEY_LINKED_FAILD
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: ONEMONEY_LINKED_FAILD
      });
      return error;
    }
  );
};

export const getStore = () => (dispatch) => { 
  dispatch({
    type: LOADING_SUCCESS
  }); 
  return UserService.get('get_store').then(
    
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 400)
      {    
        dispatch({
          type: GET_STORE_FAILD,
          payload: null,
        });
      }else{
        
        dispatch({
          type: GET_STORE_SUCCESS,
          payload: response
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_STORE_FAILD,
        payload: null,
      });
      return Promise.resolve();
    }
  );
};

export const uploadOneMoneyStatement = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData,'upload_onmoney_statement').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: ONEMONEY_LINKED_FAILD
      });
      dispatch({
        type: LOADING_FAILD
      });
      return error;
    }
  );
};

export const downloadBankStatement = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData,'before_bank_statement_upload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {
        if(response.isvalid)
        {
          dispatch({
            type: ONEMONEY_LINKED_SUCCESS
          });
          this.setState({ status: 1});
        }else{
          dispatch({
            type: ONEMONEY_LINKED_FAILD
          });
          this.setState({ status: 2});
        }
      }
      return response;
    },
    (error) => {
      dispatch({
        type: ONEMONEY_LINKED_FAILD
      });
      return error;
    }
  );
};

export const oneMoneyRequest = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData,'onemoney_requestconsent').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return error;
    }
  );
};

export const activateLimit = (getData) => (dispatch) => {
  return UserService.post(getData,'activate_limit').then(
    (response) => {
      return response;
    }
  );
};

export const updateProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadProfile(getData).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      localStorage.setItem("userBase", getData.base64);
      dispatch({
        type: UPDATE_USER_PROFILE_BASE,
        payload: getData.base64
      })
      if(response.status ==="success")
      {
        dispatch({
          type: UPDATE_USER_PROFILE_SUCCESS,
          payload: response.message
        })
      }else{
        dispatch({
          type: UPDATE_USER_PROFILE_FAILD,
          payload: response.message
        })
      }
      console.log("Response", response);
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const uploadDocument = (getData) => (dispatch) => {
  console.log('getDatagetData',getData)
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadEduDocuments(getData).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status ==="success")
      {
        localStorage.removeItem("userBase")
        dispatch({
          type: UPLOAD_DOCUMENT_SUCCESS,
          payload: response.message
        })
      }else{
        dispatch({
          type: UPLOAD_DOCUMENT_FAILD,
          payload: response.message
        })
      }
      return response.status;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getPanDocument = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getPanDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const livenessCheck = (getData) => (dispatch) => {
  return UserService.uploadPhoto(getData, 'liveness').then(
    (response) => {
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return Promise.reject();
    }
  );
};

export const getMonthlyStride = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'monthly_strides').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getAllTransaction = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'payment_transactions').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};



export const checkLiveliness = (givendata) => (dispatch) => {      
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata,'heroku_upload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    }).catch((error) => {
    dispatch({
      type: LOADING_FAILD
    });
    return dispatch({
        type: SET_MESSAGE,
        payload: error,
      });
  });
};

export const fraudCheck = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata,'fraud_check').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const ocrCheck = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.ocrUploadFile(givendata,'orc_verification').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const faceMatch = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata,'face_match').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const validatePan = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.uploadFile(givendata,'validate_pan').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getProfileDocument = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getProfileDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getDocument = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getDocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getOtherDocument = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'getOtherdocument').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getCategory = (data) => (dispatch) => {
    // console.log('called','catresp')

    return UserService.post(data,'getCategory').then(
    (response) => {
        // console.log(response,'catresp')
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_CATEGORY_FAILD,
          payload: response.message,
        });
      }else{
        dispatch({
          type: GET_CATEGORY_SUCCESS,
          payload: response
        });
      }
      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_CATEGORY_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSubCategory = (getData) => (dispatch) => {
  return UserService.post(getData, 'get_sub_category').then(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject();
    }
  );
};

export const getProductByCategory = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post(givendata,'get_product_by_category').then(
    (response) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getHomeData = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post(givendata,'homescreen').then(
    (response) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getElectronicFilter = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post(givendata,'get_electronics_filter').then(
    (response) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const getEducationFilter = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post(givendata,'get_education_filter').then(
    (response) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getRelatedCategory = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_category_landing').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.message && response.message ==="success")
      {
        
        dispatch({
          type: GET_RELATED_CAT_SUCCESS,
          payload: response.data.categorydata
        });
      }else{
        dispatch({
          type: GET_RELATED_CAT_FAILD
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_RELATED_CAT_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const favProduct = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'fav_product').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};



export const user_query_submit = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'help_support_request').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
     
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const markStage = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'stage_marking').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const updateTransApp = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_trans_app').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      return Promise.reject();
    }
  );
};

export const getProductById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_product_by_id').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_PRODUCT_FAILD,
          payload: response.message,
        });
      }else{
        const serarchDet = response.search;
        const searchData = serarchDet && serarchDet.status?serarchDet.data: null;
        let obj = {
          data: response.data,
          search: searchData
        }
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: obj
        });
      }
      return response;
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_PRODUCT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSelectedProduct = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_product_details').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_SELECTED_PRODUCT_FAILD,
          payload: response.message,
        });
      }else{
        dispatch({
          type: GET_SELECTED_PRODUCT_SUCCESS,
          payload: response.data,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_SELECTED_PRODUCT_FAILD,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getFaqsById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_faqs_by_id').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_FAQ_SUCCESS,
          payload: response.data
        });
       
      }else{
        dispatch({
          type: GET_FAQ_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_FAQ_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_FAQ_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getLearnById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_learn_by_id').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_LEARN_SUCCESS,
          payload: response.data
        });
       
      }else{
        dispatch({
          type: GET_LEARN_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_LEARN_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_LEARN_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getInstructorById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_instructor_by_id').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_INSTRUCTOR_SUCCESS,
          payload: response.data
        });
      
      }else{
        dispatch({
          type: GET_INSTRUCTOR_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_INSTRUCTOR_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_INSTRUCTOR_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getFeedbackById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_feedback_by_id').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_FEEDBACK_SUCCESS,
          payload: response.data
        });
      
      }else{
        dispatch({
          type: GET_FEEDBACK_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_FEEDBACK_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_FEEDBACK_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  ).catch(err=>{
    dispatch({
      type: LOADING_FAILD
    });
  })
};

export const getProfileById = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_user_profile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.responseCode !== undefined && response.responseCode === 200)
      {    
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: response
        });
      
      }else{
        dispatch({
          type: GET_PROFILE_FAILD,
          payload: response.message,
        });
      }
      return response;
      // return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_PROFILE_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_PROFILE_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateEnachDownload = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_enach_download').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status !== undefined && response.status === "success")
      {    
        dispatch({
          type: GET_ENACH_SUCCESS,
          payload: response
        });
      
      }else{
        dispatch({
          type: GET_ENACH_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_ENACH_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ENACH_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getEnachStatus = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_enach_status').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status !== undefined && response.status === "success")
      {    
        dispatch({
          type: ENACH_STATUS_SUCCESS,
          payload: response.data
        });
      
      }else{
        dispatch({
          type: ENACH_STATUS_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: ENACH_STATUS_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ENACH_STATUS_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateViewedProduct = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'update_viewed_products').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status !== undefined && response.status === "success")
      {    
        dispatch({
          type: GET_VIEWED_SUCCESS,
          payload: response
        });
      
      }else{
        dispatch({
          type: GET_VIEWED_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_VIEWED_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_VIEWED_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getViewedProduct = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'recently_viewed').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response.status !== undefined && response.status === "success")
      {    
        dispatch({
          type: VIEWED_PRODUCT_SUCCESS,
          payload: response.data
        });
      
      }else{
        dispatch({
          type: VIEWED_PRODUCT_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: VIEWED_PRODUCT_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: VIEWED_PRODUCT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSimilarProduct = (givendata) => (dispatch) => {
  return UserService.post(givendata,'get_product_by_category').then(
    (response) => {
      if(response.status !== undefined && response.status === "success")
      {    
        dispatch({
          type: SIMILAR_PRODUCT_SUCCESS,
          payload: response.data
        });
      
      }else{
        dispatch({
          type: SIMILAR_PRODUCT_FAILD,
          payload: response.message,
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SIMILAR_PRODUCT_FAILD
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SIMILAR_PRODUCT_FAILD,
        payload: message,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const addStoreRating = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: GET_STORE_RATING_SUCCESS,
    payload: givendata && givendata.rating?givendata.rating:null
  });
  return UserService.post(givendata,'add_store_feedback').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};

export const getStoreRating = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'get_store_feedback').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.status && response.status === "success")
      {
        const getdata = response.data;
        dispatch({
          type: GET_STORE_RATING_SUCCESS,
          payload: getdata && getdata.star_count?getdata.star_count:null
        });
      }else{
        dispatch({
          type: GET_STORE_RATING_FAILD,
          payload: null
        });
      }
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: GET_STORE_RATING_FAILD,
        payload: null
      });
      return error;
    }
  );
};



export const addProductRating = (givendata) => (dispatch) => {
  
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'add_product_feedback').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};
export const getEductionBrandLanding = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'education_brand_landing').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};

export const setLoanAmount = (amt) => (dispatch) => {
  localStorage.setItem("loan_amount", amt);
  dispatch({
      type: SET_LOAN_AMOUNT,
      payload: amt
  });
}
export const sendIncomeData = (getData) => (dispatch) => {
  dispatch({
    type: SEND_INCOME,
    payload: getData,
  });
}
export const sendSelfEmployementType = (getData) => (dispatch) => {
  dispatch({
    type: SELF_EMPLOYEMENT_TYPE,
    payload: getData,
  });
}
export const paymentStatus = (getData) => (dispatch) => {
  localStorage.setItem("paymentStatus", getData.plan);
  dispatch({
    type: 'PAYMENT_STATUS',
    payload: getData
  });
}
export const uploadProfile = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'upload_profile').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};
export const profileUpload = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'fileupload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};
export const uploadBankStatement = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'bankstatement_upload').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};

export const uploadCheque = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata,'ocr_cheque').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD
      });

      return error;
    }
  );
};

export const profileSearchHistory = (givendata) =>(dispatch)=>{
dispatch({
  type: LOADING_SUCCESS
});

return UserService.post(givendata,'get_search_history').then(
  (response)=>{
    dispatch({
      type:LOADING_FAILD
    });
   
    return response;
  },
  (error)=>{
    dispatch({
type:LOADING_FAILD
    });
    return error;
  }
);

}

export const newsLetter = (givenData)=> (dispatch) =>{
dispatch({
  type: LOADING_SUCCESS
});

return UserService.post(givenData,'newsletter').then(
  (response)=>{
    dispatch({
      type:LOADING_FAILD
    });
   
    return response;
  },
  (error)=>{
    dispatch({
type:LOADING_FAILD
    });
    return error;
  }
);
}
export const searchBank = (givenData)=> (dispatch) =>{
  dispatch({
    type: LOADING_SUCCESS
  });
  
  return UserService.post(givenData,'bank_search').then(
    (response)=>{
      dispatch({
        type:LOADING_FAILD
      });

      if(response && response.status == "success"){
        dispatch({
          type: GET_BANK_SUCCESS,
          payload:response.data
        });
       }
       else{
       dispatch({
        type: GET_BANK_SUCCESS,
        payload:[]
      });
    }
    return response;

  },
    
    (error)=>{
      dispatch({
  type:LOADING_FAILD
      });
      return error;
    }

  );
  }

  export const sendAppUrl = (givenData)=> (dispatch) =>{
    dispatch({
      type: LOADING_SUCCESS
    });
    
    return UserService.post(givenData,'send_app_url').then(
      (response)=>{
        dispatch({
          type:LOADING_FAILD
        });
       
        return response;
      },
      (error)=>{
        dispatch({
          type:LOADING_FAILD
        });
        return error;
      }
    );
    }


    export const customNotification = (givenData)=> (dispatch) =>{
      dispatch({
        type: LOADING_SUCCESS
      });
      
      return UserService.post(givenData,'custom_notifications').then(
        (response)=>{
          dispatch({
            type:LOADING_FAILD
          });
         
          return response;
        },
        (error)=>{
          dispatch({
      type:LOADING_FAILD
          });
          return error;
        }
      );
      }    

    export const getPaymentTransactions = (data) => (dispatch) => {
      return UserService.post(data,'payment_transactions').then(
        (response) => {
          return response;
        });
    };


    export const product_emi_summary = (givendata) => (dispatch) => {
      dispatch({
        type: LOADING_SUCCESS
      });
      return UserService.post(givendata,'product_emi_summary').then(
        (response) => {
          dispatch({
            type: LOADING_FAILD
          });
          return response;
        },
        (error) => {
          dispatch({
            type: LOADING_FAILD
          });
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
         
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
        }
      );
    };
