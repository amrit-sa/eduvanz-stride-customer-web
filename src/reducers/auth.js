import {
  CLEAR_AUTH_MESSAGE,
  SALESFORCE_LOGIN_SUCCESS,
  SALESFORCE_LOGIN_FAILD,
  PREVIOUS_PATH_UPDATE,
  PROFILE_UPDATE_FAILD,
  PROFILE_UPDATE_SUCCESS,
  PAN_UPDATE_SUCCESS,
  PAN_UPDATE_FAILD,
  MPIN_UPDATE_SUCCESS,
  MPIN_UPDATE_FAILD,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILD,
  GOOGLE_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOADING_SUCCESS,
  UPDATE_APP_URL,
  LOADING_FAILD,
  UPDATE_MOBILE,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const user     = parseInt(localStorage.getItem("user_id"));
const username = localStorage.getItem("username");
const pro_id   = parseInt(localStorage.getItem("pro_id"));
const token    = localStorage.getItem("token");
const sales_force_token = localStorage.getItem("force_token");
const newUser  = localStorage.getItem('isNewUser');
const log_id   = parseInt(localStorage.getItem("log"));
const onBord   = parseInt(localStorage.getItem('onbord'));
const sfid     = localStorage.getItem('sfid');
const previousPath  = localStorage.getItem('previousPath');
const mobile = localStorage.getItem('mobile');

const initialState = { 
    appUrl: null,
    previousPath: previousPath?previousPath:null,
    isLoggedIn: user?true:false, 
    userData: {},
    username: username?username:'',
    user:user?user:0, 
    sfid: sfid?sfid:null,
    pro_id: pro_id?pro_id:0,
    token: token?token:null,
    salesForceToken: sales_force_token?sales_force_token:null,
    isNewUser: newUser,
    googleData: {},
    isLoading: false,
    verificationType:'',
    verifivation_id: log_id?log_id:0,
    mpinMsg:'',
    successMsg: '',
    errorMsg:'',
    isValid: '',
    onBording: onBord?onBord:0,
    mobile: mobile?mobile:null,
  }

export default function (state = initialState, action) {
  const { type, payload } = action;
  // console.log('type', type);
  switch (type) {
    case UPDATE_MOBILE:
      return {
        ...state,
        mobile: payload,
      };
    case UPDATE_APP_URL:
      return {
        ...state,
        appUrl: payload,
      };
    case PREVIOUS_PATH_UPDATE:
      return {
        ...state,
        previousPath: payload,
      };
    case SALESFORCE_LOGIN_SUCCESS:
      return {
        ...state,
        salesForceToken: payload,
      };
    case SALESFORCE_LOGIN_FAILD:
      return {
        ...state,
        salesForceToken: null,
      };
    case GOOGLE_SUCCESS:
      return {
        ...state,
        googleData: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOADING_SUCCESS:
        return {
          ...state,
          isLoading: true,
        };
    case LOADING_FAILD:
        return {
          ...state,
          isLoading: false,
        };
    case LOGIN_SUCCESS:
      return {
        ...state,
        verificationType: payload.verificationType,
        successMsg: payload.message?payload.message:'',
        isNewUser: payload.isNewUser,
        isValid: 1,
        mpinMsg:payload.mpin?payload.mpin:'',
        verifivation_id: payload.logId,
        pro_id: payload.id,
        isLoading: false,
        onBording: payload.onBoard
      };
    case PAN_UPDATE_SUCCESS:
        return {
          ...state,
          errorMsg: '',
          successMsg: payload,
          isValid: 1,
          isLoading: false,
        };
    case PAN_UPDATE_FAILD:
        return {
          ...state,
          errorMsg: payload,
          successMsg:'',
          isValid: 0,
          isLoading: false,
        };
    case MPIN_UPDATE_SUCCESS:
        return {
          ...state,
          errorMsg: '',
          successMsg: payload,
          isValid: 1,
          isLoading: false,
        };
    case MPIN_UPDATE_FAILD:
        return {
          ...state,
          errorMsg: payload,
          successMsg:'',
          isValid: 0,
          isLoading: false,
        };
    case VERIFY_OTP_SUCCESS:
        return {
          ...state,
          errorMsg: '',
          successMsg: payload.message,
          sfid: payload.sfid,
          user: payload.user,
          username: payload.username,
          token: payload.token,
          isValid: 1,
          onBording: payload.onBoard,
          userData: payload.data,
          isLoading: false,
        };
    case VERIFY_OTP_FAILD:
        return {
          ...state,
          errorMsg: payload,
          successMsg:'',
          isValid: 0,
          isLoading: false,
        };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMsg: payload.message,
        onBording: payload.onBoard,
        username: payload.username,
        isValid: 1,
      };
    case PROFILE_UPDATE_FAILD:
      return {
        ...state,
        isLoading: false,
        successMsg: '',
        errorMsg: payload,
        isValid: 0,
      };
    case CLEAR_AUTH_MESSAGE:
        return {
          ...state,
          successMsg: '',
          errorMsg: '',
          isValid: '',
        };
    case 'SFID_UPDATE_SUCCESS':
      return {
        ...state,
        sfid: payload.sfid,
        user: payload.id
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        username: null,
      };
    default:
      return {...state,isLoading:false};
  }
}
