import {    
  ADD_USER_ADDRESS,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_USER_ADDRESS,
  UPDATE_ACCOUNT_FAILD,
  UPDATE_SALARY_SUCCESS,
  UPDATE_SALARY_FAILD,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILD,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAILD,
  UPDATE_SUB_SOURCE,
  GET_BANK_SUCCESS,
  UPDATE_USER_BANK,
  GET_BANK_FAILD,
  UPDATE_SALARY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILD,
  GET_PRODUCT_SUCCESS,
  UPDATE_USER_BANK_DETAILS,
  GET_PRODUCT_FAILD,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAILD,
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
  GET_SELECTED_PRODUCT_SUCCESS,
  GET_SELECTED_PRODUCT_FAILD,
  SFID_UPDATE_SUCCESS,
  STORE_RESIDENT
} from "../actions/types";
let isResident = localStorage.getItem("isRented");
let rentAmount = localStorage.getItem("rent_amount");
let userBank = localStorage.getItem("userBank");
let product_id = localStorage.getItem("product_id");
let plan_id = localStorage.getItem("plan_id");
let loan_amount = localStorage.getItem("loan_amount");
const productId = localStorage.getItem("productId");
const userBase = localStorage.getItem("userBase");
const accountNo = localStorage.getItem("accountNo");
const higherLimit = localStorage.getItem("higher_limit");
const down_payment = localStorage.getItem("down_payment");
const initialState = {
  down_payment: down_payment?down_payment:0,
  leads: [],
  userMessage: '',
  digilocker_link:'',
  higherLimit: higherLimit?higherLimit:null,
  isSuccess:0,
  banks: [],
  accountNo: accountNo?accountNo:null,
  selectedBank: userBank?JSON.parse(userBank):null,
  incomeSource: '',
  sub_source: '',
  userData: {},
  companyName: '',
  workAddress: '',
  monthlyIncome: '',
  userAddress: [],
  currentAddress: {},
  isResident: isResident?isResident:0,
  rentAmount: rentAmount?rentAmount:0,
  loan_amount: loan_amount?loan_amount:0,
  isOpenCamera: false,
  entity: [],
  category: [],
  store: null,
  userBase: userBase?userBase:null,
  entitySearch: false,
  selectedAddress: 0,
  alladdresses : [],
  product_id: product_id?product_id:0,
  productId: productId?productId:0,
  product: '',
  product_search: null,
  faqs: '',
  learn:'',
  instructor:'',
  feedback: '',
  profile: '',
  denach: '',
  senach: '',
  viewed: '',
  recentProd: '',
  similarProd: '',
  bank_linked: 0,
  plan_id: plan_id?plan_id:null,
  store_rating: 0,
  cancelCard : {},
  userId:{}
};

export default function (state = initialState, action) {
const { type, payload } = action;
switch (type) {
  case UPDATE_USER_BANK_DETAILS:
    return {
      ...state, 
      accountNo: payload,
    };
  case UPDATE_USER_BANK:
    return {
      ...state, 
      selectedBank: payload,
    };
  case GET_STORE_RATING_SUCCESS:
    return {
      ...state, 
      store_rating: payload,
      };
  case GET_STORE_RATING_FAILD:
    return {
      ...state, 
      store_rating: payload,
    };
  case UPDATE_USER_ADDRESS:
    return {
      ...state, 
      selectedAddress: payload,
      };
  case ADD_USER_ADDRESS:
    return {
      ...state, 
      alladdresses: payload,
      };
  case "GET_STORE_SUCCESS":
    return {
      ...state, 
      store: payload
    };
  case "GET_STORE_FAILD":
    return {
      ...state, 
      store: payload,
    };
  case "UPDATE_PRODUCT_SUCCESS":
    return {
      ...state, 
      product_id: payload.product_id,
      plan_id: payload.plan
    };
  case "GET_HIGHER_LIMIT":
    return {
      ...state, 
      higherLimit: true,
    };
  case "BUY_PRODUCT_SUCCESS":
    return {
      ...state, 
      product_id: payload,
      };
  case "CLEAR_SEARCH_ENTITY":
    return {
      ...state, 
      entitySearch: false,
      entity: []
      };
  case "ENTITY_SEACH_SUCCESS":
    return {
      ...state, 
      entitySearch: true,
      };
  case "ENTITY_SEACH_FAILD":
    return {
      ...state, 
      entitySearch: false,
      };
  case "SEARCH_ENTITY_SUCCESS":
    return {
      ...state, 
      entity: payload,
      };
  case "SEARCH_ENTITY_FAILD":
    return {
      ...state, 
      entity: [],
      };
  case "OPEN_CAMERA_SUCCESS":
    return {
      ...state, 
      isOpenCamera: true,
      };
  case "CLOSE_CAMERA_SUCCESS":
    return {
      ...state, 
      isOpenCamera: false,
      };
  case "GET_DIGILOCKER_SUCCESS":
    return {
      ...state, 
      digilocker_link: payload,
      };
  case "GET_DIGILOCKER_FAILD":
    return {
      ...state, 
      digilocker_link: '',
      };
  case "UPLOAD_DOCUMENT_SUCCESS":
    return {
      ...state, 
      userMessage: '',
      };
  case "UPLOAD_DOCUMENT_FAILD":
    return {
      ...state, 
      userMessage: payload,
      };
  case "ONEMONEY_LINKED_SUCCESS":
    return {
      ...state, 
      bank_linked: 1,
      };
  case "ONEMONEY_LINKED_FAILD":
    return {
      ...state, 
      bank_linked: 2,
      };
  case "UPDATE_INCOME_DETAILS":
    return {
      ...state, 
      companyName: payload.employer_name__c,
      workAddress: payload.industry,
      monthlyIncome: payload.monthly_income__c,
      sub_source: payload.occupation__c,
      };
  case GET_ADDRESS_SUCCESS:
    return {
      ...state, 
      userAddress: payload.address,
      currentAddress: payload.currentAddress
      };

  case "REMOVE_ADDRESS_SUCCESS":
    let rem = state.userAddress.filter((addr)=>{
      return addr.id != payload.address_id
    })
    return {
      ...state, 
      userAddress: rem,
      // currentAddress: payload.currentAddress
      };
  case GET_ADDRESS_FAILD:
    return {
      ...state, 
      userAddress: []
      };
  case 'UPDATE_RENT_SUCCESS':
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 1
      };
  case 'UPDATE_RENT_FAILD':
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 0
      };
  case 'UPDATE_USER_ADDRESS_SUCCESS':
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 1
      };
  case 'UPDATE_USER_ADDRESS_FAILD':
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 0
      };
  case 'UPDATE_USER_PROFILE_BASE':
    return {
      ...state, 
      userBase: payload,
      };
  case 'UPDATE_USER_PROFILE_SUCCESS':
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 1
      };
  case 'UPDATE_USER_PROFILE_FAILD':
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 0
      };
  case UPDATE_SALARY_SUCCESS:
    return {
      ...state, 
      incomeSource: payload.incomeSource,
      sub_source: payload.sub_source,
      userMessage: payload.message,
      isSuccess: 1
      };
  case UPDATE_SALARY_FAILD:
    return {
      ...state, 
      incomeSource: payload.incomeSource,
      sub_source: payload.sub_source,
      userMessage: payload.message,
      isSuccess: 0
      };
  case UPDATE_ACCOUNT_SUCCESS:
    return {
      ...state, 
      isResident: payload.isRented,
      rentAmount: payload.rent_amount
      };
  case UPDATE_ACCOUNT_SUCCESS:
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 1
      };
  case UPDATE_ACCOUNT_FAILD:
    return {
      ...state, 
      userMessage: payload,
      isSuccess: 0
      };

    case SFID_UPDATE_SUCCESS:
      return {
        ...state, 
        userId: payload,
        };
  case GET_ACCOUNT_SUCCESS:
    return {
      ...state, 
      userData: payload,
      };
  case GET_ACCOUNT_FAILD:
    return {
      ...state, 
      userData: {}
      };
  case UPDATE_SUB_SOURCE:
    return {
      ...state, 
        sub_source: payload.self,
        incomeSource: payload.source,
      };
  case UPDATE_SALARY:
    return {
      ...state, 
        incomeSource: payload 
      };
  case GET_BANK_SUCCESS:
    return {
      ...state, 
        banks: payload 
      };
  case GET_BANK_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_CATEGORY_SUCCESS:
    return {
      ...state, 
        category: payload 
      };
  case GET_CATEGORY_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_PRODUCT_SUCCESS:
    return {
      ...state, 
        product: payload.data,
        product_search: payload.search
    };
  case GET_SELECTED_PRODUCT_SUCCESS:
    return {
      ...state, 
        product: payload,
    };
  case GET_SELECTED_PRODUCT_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_PRODUCT_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_FAQ_SUCCESS:
    return {
      ...state, 
        faqs: payload 
      };
  case GET_FAQ_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_LEARN_SUCCESS:
    return {
      ...state, 
        learn: payload 
      };
  case GET_LEARN_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_INSTRUCTOR_SUCCESS:
    return {
      ...state, 
        instructor: payload 
      };
  case GET_INSTRUCTOR_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_FEEDBACK_SUCCESS:
    return {
      ...state, 
        feedback: payload 
      };
  case GET_FEEDBACK_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_PROFILE_SUCCESS:
    return {
      ...state, 
        profile: payload 
      };
  case GET_PROFILE_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_ENACH_SUCCESS:
    return {
      ...state, 
        denach: payload 
      };
  case GET_ENACH_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case ENACH_STATUS_SUCCESS:
    return {
      ...state, 
        senach: payload 
      };
  case ENACH_STATUS_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case GET_VIEWED_SUCCESS:
    return {
      ...state, 
        viewed: payload 
      };
  case GET_VIEWED_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case VIEWED_PRODUCT_SUCCESS:
    return {
      ...state, 
        recentProd: payload 
      };
  case VIEWED_PRODUCT_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case SIMILAR_PRODUCT_SUCCESS:
    return {
      ...state, 
        similarProd: payload 
      };
  case SIMILAR_PRODUCT_FAILD:
    return {
      ...state, 
        userMessage: payload 
      };
  case "SET_LOAN_AMOUNT":
        return {
          ...state, 
            loan_amount: payload 
          };
  case "GET_DOWN_PAYMENT":
    return {
      ...state, 
        down_payment: payload 
      };
      case "TIMELINE_DATA":
        return {
          ...state, 
            timelineData: payload 
          };
          case "CANCEL_CARD":
        return {
          ...state, 
            cancelCard: payload 
          };
          case "PAYMENT_STATUS":
            return {
              ...state, 
                paymentStatus: payload 
              };
  default:
    return state;
}
}
