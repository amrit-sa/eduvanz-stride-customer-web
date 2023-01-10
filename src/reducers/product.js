import {
  GET_STORE_SUCCESS,
  GET_STORE_FAILD,
  GET_CATEGORY_BRAND_FAILD,
  GET_CATEGORY_BRAND_SUCCESS, GET_CATEGORY_FILTER_SUCCESS, GET_CATEGORY_FILTER_FAILD, GET_PIN_CODE
} from "../actions/types";
const merchantId = localStorage.getItem("merchant_id");
const initialState = {
  globalSearch: [],
  isSearching: false,
  searchDet: true,
  searchHistory: null,
  virtual_cards: [],
  virtual_active_cards: [],
  virtual_closed_cards: [],
  sub_categories: null,
  category_brands: null,
  category_filters: null,
  favorite_list: [],
  favorite_count: null,
  store: null,
  merchant_id: merchantId ? merchantId : null,
  storeDetails: {
    name: "",
    icon: "",
    id: ''
  },
  showable_products:[],
  coordinates :{
    lat:null,
    lng:null
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    
    case "SET_LAT_LON":
      return {
        ...state,
        coordinates: payload,
      };
    case GET_CATEGORY_FILTER_SUCCESS:
      return {
        ...state,
        category_filters: payload,
      };
    case GET_CATEGORY_FILTER_FAILD:
      return {
        ...state,
        category_filters: null,
      };
    case GET_CATEGORY_BRAND_SUCCESS:
      return {
        ...state,
        category_brands: payload,
      };
    case GET_CATEGORY_BRAND_FAILD:
      return {
        ...state,
        category_brands: null,
      };
    case GET_STORE_SUCCESS:
      return {
        ...state,
        store: payload,
      };
    case GET_STORE_FAILD:
      return {
        ...state,
        store: null,
      };
    case GET_PIN_CODE:
      return {
        ...state,
        store: payload,
      };
    case 'UPDATE_MERCHANT':
      return {
        ...state,
        merchant_id: payload,
      };
    case 'SET_STORE':
      return {
        ...state,
        storeDetails: payload,
      };
    case 'SEARCH_STORE_SUCCESS':
      return {
        ...state,
        storeSearch: payload,
      };
    case 'ADD_HOME_PRODUCT_LIST':
      return {
        ...state,
        showable_products: payload,
      };
    case 'GET_RELATED_CAT_SUCCESS':
      return {
        ...state,
        sub_categories: payload,
      };
    case 'GET_RELATED_CAT_FAILD':
      return {
        ...state,
        sub_categories: null,
      };
    case 'GET_SEARCH_HISTORY_SUCCESS':
      return {
        ...state,
        searchHistory: payload,
      };
    case 'GET_SEARCH_HISTORY_FAILD':
      return {
        ...state,
        searchHistory: null,
      };
    case 'GET_VIRTUAL_CLOSED_CARD_SUCCESS':
      return {
        ...state,
        virtual_closed_cards: payload,
      };
    case 'GET_VIRTUAL_CLOSED_CARD_FAILD':
      return {
        ...state,
        virtual_closed_cards: [],
      };
    case 'GET_VIRTUAL_ACTIVE_CARD_SUCCESS':
      return {
        ...state,
        virtual_active_cards: payload,
      };
    case 'GET_VIRTUAL_ACTIVE_CARD_FAILD':
      return {
        ...state,
        virtual_active_cards: [],
      };
    case 'GET_VIRTUAL_CARD_LIST_SUCCESS':
      return {
        ...state,
        virtual_cards: payload,
      };
    case 'GET_VIRTUAL_CARD_LIST_FAILD':
      return {
        ...state,
        virtual_cards: [],
      };
    case 'GET_FAVORITE_PRODUCT_COUNT_SUCCESS':
      return {
        ...state,
        favorite_count: payload ? payload : null,
      };
    case 'GET_FAVORITE_PRODUCT_COUNT_FAILD':
      return {
        ...state,
        favorite_count: null,
      };
    case 'GET_FAVORITE_PRODUCT_SUCCESS':
      return {
        ...state,
        favorite_list: payload,
      };
    case 'GET_FAVORITE_PRODUCT_FAILD':
      return {
        ...state,
        favorite_list: [],
      };
    case 'GLOBAL_SEARCH_SUCCESS':
      return {
        ...state,
        globalSearch: payload,
        searchDet: true,
      };
    case 'GLOBAL_SEARCH_FAILD':
      return {
        ...state,
        globalSearch: [],
        searchDet: false,
      };
    case 'ON_SEARCHING_TRUE':
      return {
        ...state,
        isSearching: true,
        searchDet: true
      };
    case 'ON_SEARCHING_FALSE':
      return {
        ...state,
        isSearching: false,
        searchDet: true
      };
    // case 'GET_PLAN':
    // return {
    //     ...state, 

    // };
    default:
      return state;
  }
}
