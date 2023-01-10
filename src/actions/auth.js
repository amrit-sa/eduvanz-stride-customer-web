import {
  CLEAR_AUTH_MESSAGE,
  PREVIOUS_PATH_UPDATE,
  SALESFORCE_LOGIN_SUCCESS,
  SALESFORCE_LOGIN_FAILD,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILD,
  PROFILE_UPDATE_FAILD,
  PROFILE_UPDATE_SUCCESS,
  PAN_UPDATE_SUCCESS,
  PAN_UPDATE_FAILD,
  MPIN_UPDATE_SUCCESS,
  MPIN_UPDATE_FAILD,
  REGISTER_SUCCESS,
  GOOGLE_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING_SUCCESS,
  CLEAR_MESSAGE,
  LOADING_FAILD,
  UPDATE_APP_URL,
  LOGOUT,
  SET_MESSAGE,
  UPDATE_MOBILE,
} from "./types";

import AuthService from "../services/auth.service";

export const updatePreviousPath = (getData) => (dispatch) => {
  localStorage.setItem("previousPath", getData);
  dispatch({
    type: PREVIOUS_PATH_UPDATE,
    payload: getData,
  });
};

export const updateMobile = (getData) => (dispatch) => {
  dispatch({
    type: UPDATE_MOBILE,
    payload: getData,
  });
};

export const register = (getData) => (dispatch) => {
  return AuthService.login(getData, 'web_login').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      let getdata = {
          responseCode: data.responseCode,
          verificationType: data.verificationType,
          mpin: data.verificationType ==='mPin'?data.message:'',
          message: data.verificationType ==='otp'?data.message:'',
          id: data.id,
          otp: data.otp,
          logId: data.logId,
          onBoard: data.onBoard
        }
        localStorage.setItem('pro_id', data.id);
        localStorage.setItem('log', data.logId);
        localStorage.setItem('isNewUser', data.isNewUser);
        localStorage.setItem('onbord', data.onBoard);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: getdata,
      });

      return data
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
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

export const salesForceLogin = (getData) => (dispatch) => {
  return AuthService.post(getData, 'salesforce_auth').then(
    (response) => {
      if(response.status ==="success")
      {
        localStorage.setItem("force_token", response.data.access_token);
        dispatch({
          type: SALESFORCE_LOGIN_SUCCESS,
          payload: response.data.access_token,
        });
      }else{
        dispatch({
          type: SALESFORCE_LOGIN_FAILD
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
        type: SALESFORCE_LOGIN_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updateProfile = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(getData, 'account_basic').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD,
      });
      localStorage.setItem("username", getData.first_name);
      if(response.status ==="success")
      {
        const getData = response.data?response.data:null;
        if(getData && getData.id)
        {
          localStorage.setItem('user_id', getData.id);
        }
        let obj = {
          message: response.message,
          onBoard: response.onBoard,
          username: getData.first_name
        }
        dispatch({
          type: PROFILE_UPDATE_SUCCESS,
          payload: obj,
        });
      }else{
        dispatch({
          type: PROFILE_UPDATE_FAILD,
          payload: response.message,
        });
      }

      return response;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: PROFILE_UPDATE_FAILD,
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

export const login = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.login(givenData, 'web_login').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      let getdata = {
          responseCode: data.responseCode,
          verificationType: data.verificationType,
          mpin: data.verificationType ==='mPin'?data.message:'',
          message: data.verificationType ==='otp'?data.message:'',
          id: data.id,
          otp: data.otp,
          logId: data.logId,
          isNewUser: data.isNewUser,
          onBoard: data.onBoard
      }
        localStorage.setItem('pro_id', data.id);
        localStorage.setItem('log', data.logId);
        localStorage.setItem('isNewUser', data.isNewUser);
        localStorage.setItem('onbord', data.onBoard);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: getdata,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
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

export const sendOtp = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.login(givenData, 'send_otp').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      let getdata = {
          responseCode: data.responseCode,
          verificationType: data.verificationType,
          mpin: data.verificationType ==='mPin'?data.message:'',
          message: data.verificationType ==='otp'?data.message:'',
          isNewUser: data.isNewUser,
          onBoard: data.onBoard,
          logId: data.id,
          otp: data.otp,
          id: data.id
      }
        localStorage.setItem('log', data.id);
        localStorage.setItem('isNewUser', data.isNewUser);
        localStorage.setItem('onbord', data.onBoard);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: getdata,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const verifyMpin = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'verify_mpin').then(
    (data) => {
      console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.status === 'success' )
      {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('sfid', data.sfid);
        localStorage.setItem('username', data.first_name);
        let obj = {
          user: data.id,
          token: data.token,
          sfid: data.sfid,
          username: data.first_name,
          message: data.message,
          data: data.data
        }
        dispatch({
          type: VERIFY_OTP_SUCCESS,
          payload: obj,
        });
       
      }else{
        dispatch({
          type: VERIFY_OTP_FAILD,
          payload: data.message,
        });
      }
      return data;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: VERIFY_OTP_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const getPan = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'getPan').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      let pan;
      if(data.status ==='success' )
      {
        dispatch({
          type: PAN_UPDATE_SUCCESS,
          payload: data.message,
        });
        pan = data.pan
      }else{
        dispatch({
          type: PAN_UPDATE_FAILD,
          payload: data.message,
        });
        
      }
      return pan;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: PAN_UPDATE_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updatePanStatus = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'check_pan').then(
    (data) => {
    //  console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.status ==='success' )
      {
        dispatch({
          type: PAN_UPDATE_SUCCESS,
          payload: data.message,
        });
      }else{
       /*  dispatch({
          type: PAN_UPDATE_FAILD,
          payload: data.message,
        }); */
        
      }
      return data.status;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

     /*  dispatch({
        type: PAN_UPDATE_FAILD,
        payload: message,
      }); */
      return Promise.reject();
    }
  );
};

export const updatePan = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'update_pan_status').then(
    (data) => {
      console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.status === 'success' )
      {
        dispatch({
          type: PAN_UPDATE_SUCCESS,
          payload: data.message,
        });
      }else{
        dispatch({
          type: PAN_UPDATE_FAILD,
          payload: data.message,
        });
      }
      return data.status;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: PAN_UPDATE_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const updateMpin = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.post(givenData, 'mpin_update').then(
    (data) => {
      console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.responseCode ===500 )
      {
        dispatch({
          type: MPIN_UPDATE_FAILD,
          payload: data.message,
        });
      }else{
        dispatch({
          type: MPIN_UPDATE_SUCCESS,
          payload: data.message,
        });
      }
      const next = localStorage.getItem('next');
      localStorage.removeItem('next');
      let obj = {
        next: next,
        code: data.responseCode
      }
      return obj;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: MPIN_UPDATE_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const checkOtp = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.login(givenData, 'verify_otp').then(
    (data) => {
     // console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.status ==='success' )
      {
         localStorage.setItem('token', data.token);
         localStorage.setItem('user_id', data.id);
         localStorage.setItem('sfid', data.sfid);
         localStorage.setItem('username', data.first_name);
         let obj = {
          user: data.id,
          token: data.token,
          sfid: data.sfid,
          username: data.first_name,
          onBoard: data.onBoard,
          message: data.message,
          data: data.data
        }
      dispatch({
        type: VERIFY_OTP_SUCCESS,
        payload: obj,
      });
      }else{
        dispatch({
          type: VERIFY_OTP_FAILD,
          payload: data.message,
        });
      }
      const next = localStorage.getItem('next');
      let page;
      if(next === '1')
      {
        page = "/update_mpin";
      }
      let obj = {
        status: data.status,
        page: page
      }
      return obj;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: VERIFY_OTP_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const verifyUserOtp = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.login(givenData, 'verify_user_otp').then(
    (data) => {
      dispatch({
        type: LOADING_FAILD,
      });
      return data;
    });
};

export const verifyOtp = (givenData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
  return AuthService.login(givenData, 'verify_otp').then(
    (data) => {
     // console.log('data', data);
      dispatch({
        type: LOADING_FAILD,
      });
      if(data.status ==='success' )
      {
         localStorage.setItem('token', data.token);
         localStorage.setItem('user_id', data.id);
         localStorage.setItem('sfid', data.sfid);
         localStorage.setItem('username', data.first_name);
         let obj = {
          user: data.id,
          token: data.token,
          sfid: data.sfid,
          username: data.first_name,
          onBoard: data.onBoard,
          message: data.message,
          data: data.data
        }
      dispatch({
        type: VERIFY_OTP_SUCCESS,
        payload: obj,
      });
      }else{
        dispatch({
          type: VERIFY_OTP_FAILD,
          payload: data.message,
        });
      }
      return data;
    },
    (error) => {
      dispatch({
        type: LOADING_FAILD,
      });
      console.log('error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: VERIFY_OTP_FAILD,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const clearAuthMessage = () => (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_MESSAGE,
  });
  dispatch({
    type: CLEAR_MESSAGE,
  });
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const updateAppUrl = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_APP_URL,
    payload: data
  });
};

export const googleSuccess = (data) => (dispatch) => {
  dispatch({
    type: GOOGLE_SUCCESS,
    payload: data,
  });
};
