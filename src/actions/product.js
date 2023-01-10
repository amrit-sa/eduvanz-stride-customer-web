import {
  LOADING_FAILD,
  LOADING_SUCCESS,
  GET_STORE_FAILD,
  GET_STORE_SUCCESS,
  GET_CATEGORY_BRAND_FAILD,
  GET_CATEGORY_BRAND_SUCCESS, GET_CATEGORY_FILTER_FAILD, GET_CATEGORY_FILTER_SUCCESS, SET_MESSAGE
} from "./types";
import UserService from "../services/user.service";

export const GLOBAL_SEARCH_SUCCESS = "GLOBAL_SEARCH_SUCCESS";
export const GLOBAL_SEARCH_FAILD = "GLOBAL_SEARCH_FAILD";
export const CATEGORY_SEARCH_SUCCESS = "CATEGORY_SEARCH_SUCCESS";
export const CATEGORY_SEARCH_FAILD = "CATEGORY_SEARCH_FAILD";
export const GET_VIRTUAL_CARD_LIST_SUCCESS = "GET_VIRTUAL_CARD_LIST_SUCCESS";
export const GET_VIRTUAL_CARD_LIST_FAILD = "GET_VIRTUAL_CARD_LIST_FAILD";
export const GET_VIRTUAL_ACTIVE_CARD_SUCCESS = "GET_VIRTUAL_ACTIVE_CARD_SUCCESS";
export const GET_VIRTUAL_ACTIVE_CARD_FAILD = "GET_VIRTUAL_ACTIVE_CARD_FAILD";
export const GET_VIRTUAL_CLOSED_CARD_SUCCESS = "GET_VIRTUAL_CLOSED_CARD_SUCCESS";
export const GET_VIRTUAL_CLOSED_CARD_FAILD = "GET_VIRTUAL_CLOSED_CARD_FAILD";
export const GET_FAVORITE_PRODUCT_SUCCESS = "GET_FAVORITE_PRODUCT_SUCCESS";
export const GET_FAVORITE_PRODUCT_FAILD = "GET_FAVORITE_PRODUCT_FAILD";
export const GET_SEARCH_HISTORY_SUCCESS = "GET_SEARCH_HISTORY_SUCCESS";
export const GET_SEARCH_HISTORY_FAILD = "GET_SEARCH_HISTORY_FAILD";
export const GET_FAVORITE_PRODUCT_COUNT_SUCCESS = "GET_FAVORITE_PRODUCT_COUNT_SUCCESS";
export const GET_FAVORITE_PRODUCT_COUNT_FAILD = "GET_FAVORITE_PRODUCT_COUNT_FAILD";
export const ON_SEARCHING_TRUE = "ON_SEARCHING_TRUE";
export const ON_SEARCHING_FALSE = "ON_SEARCHING_FALSE";
export const UPDATE_MERCHANT = "UPDATE_MERCHANT";
export const GET_PIN_CODE = "GET_PIN_CODE";
export const SET_STORE = "SET_STORE";
export const SEARCH_STORE_SUCCESS = "SEARCH_STORE_SUCCESS";
export const SEARCH_STORE_FAILURE = "SEARCH_STORE_FAILURE";
export const ADD_HOME_PRODUCT_LIST = "ADD_HOME_PRODUCT_LIST"

export const updateMerchant = (getData) => (dispatch) => {
  localStorage.setItem("merchant_id", getData);
  dispatch({
    type: UPDATE_MERCHANT,
    payload: getData
  });
}
export const setStore = (getData) => (dispatch) => {
  // localStorage.setItem("merchant_id", getData);
  dispatch({
    type: SET_STORE,
    payload: getData
  });
}
export const getGlobalSearch = (givendata) => (dispatch) => {
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post(givendata, `search`).then(
    (response) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      if (response && response.status === "success") {
        dispatch({
          type: GLOBAL_SEARCH_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GLOBAL_SEARCH_FAILD,
          payload: []
        });
      }
      return response;
    });
};

export const searchGlobalProduct = (givendata, page, sfid) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post('', `search?search=${givendata}&page=${page}${sfid ? '&user_sfid=' + sfid : ''}`).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      if (response && response.length > 0) {
        dispatch({
          type: GLOBAL_SEARCH_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: GLOBAL_SEARCH_FAILD,
          payload: []
        });
      }
      return response;
    });
};



// this includes list of all kinds of pproducts seperated by different categories that we want to show on
// home page in those carousals and all category landing pages 
export const setShowableProducts = (givendata) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(givendata, 'homescreen').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.message && response.message === "success") {

        dispatch({
          type: ADD_HOME_PRODUCT_LIST,
          payload: response.data
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
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const setLatLon = (getdata) => (dispatch) => {
  console.log(getdata,"action product")
  dispatch({
    type: "SET_LAT_LON",
    payload: getdata
  });
}

export const getCategoryFilters = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_filter').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });

      if (response) {
        dispatch({
          type: GET_CATEGORY_FILTER_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_CATEGORY_FILTER_FAILD,
        });
      }
      return response;
    });
};

export const getEducationFilterOptions = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_education_fiters').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status && response.status == "success") {
        // console.log(response.data,"DISPATCH TO REDUX!")
        dispatch({
          type: GET_CATEGORY_FILTER_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_CATEGORY_FILTER_FAILD,
        });
      }
      return response;
    });
};

export const getCategoryBrands = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_category_brands').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status && response.status == "success") {
        dispatch({
          type: GET_CATEGORY_BRAND_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_CATEGORY_BRAND_FAILD,
        });
      }
      return response;
    });
};

export const getCategorySearch = (search, category) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('search?search=' + search + '&category=' + category).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.length > 0) {
        dispatch({
          type: CATEGORY_SEARCH_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: CATEGORY_SEARCH_FAILD,
          payload: []
        });
      }
      return response;
    });
};

export const categoryGlobalSearch = (search, category) => (dispatch) => {
  return UserService.get('global_category_search?keyword=' + search + '&category=' + category).then(
    (response) => {
      if (response && response.length > 0) {
        dispatch({
          type: CATEGORY_SEARCH_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: CATEGORY_SEARCH_FAILD,
          payload: []
        });
      }
      return response;
    });
};

export const getSearchHistory = (getData) => (dispatch) => {
  return UserService.post(getData, 'get_search_history').then(
    (response) => {
      if (response && response.status === "success") {
        dispatch({
          type: GET_SEARCH_HISTORY_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_SEARCH_HISTORY_FAILD,
          payload: null
        });
      }
      return response;
    });
};

export const addSearchHistory = (getData) => (dispatch) => {
  return UserService.post(getData, 'search_history').then(
    (response) => {
      return response;
    });
};

export const productSearch = (keyword, search) => (dispatch) => {
  return UserService.get('search_product?keyword=' + keyword + '&search=' + search).then(
    (response) => {
      return response;
    });
};

export const catProductSearch = (keyword, search) => (dispatch) => {
  return UserService.get('category_product_search?keyword=' + keyword + '&search=' + search).then(
    (response) => {
      return response;
    });
};

export const getActiveVirtualCards = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_virtual_active_cards').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status === "success") {
        dispatch({
          type: GET_VIRTUAL_ACTIVE_CARD_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_VIRTUAL_ACTIVE_CARD_FAILD,
          payload: []
        });
      }
      return response;
    }).catch((error) => {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const getClosedVirtualCards = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_virtual_active_cards').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status === "success") {
        dispatch({
          type: GET_VIRTUAL_CLOSED_CARD_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_VIRTUAL_CLOSED_CARD_FAILD,
          payload: []
        });
      }
      return response;
    }).catch((error) => {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const checkVirtualCards = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'check_virtual_card').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getFavoriteProduct = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_fav_product').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status === "success") {
        dispatch({
          type: GET_FAVORITE_PRODUCT_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_FAVORITE_PRODUCT_FAILD,
          payload: []
        });
      }
      return response;
    }).catch((error) => {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const getFavoriteProductCount = (getData) => (dispatch) => {
  return UserService.post(getData, 'get_fav_count').then(
    (response) => {
      if (response && response.status === "success") {
        dispatch({
          type: GET_FAVORITE_PRODUCT_COUNT_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_FAVORITE_PRODUCT_COUNT_FAILD
        });
      }
      return response;
    });
};

export const getRelatedBlog = () => (dispatch) => {
  return UserService.get('blogs').then(
    (response) => {
      return response;
    });
};

export const getStore = (dataShow, category) => (dispatch) => {
  if (!category) {
    category = 0
  }
  return UserService.get('top_stores?showAll=' + dataShow + '&category_id=' + category).then(
    (response) => {
      if (response && response.responseCode === undefined) {
        dispatch({
          type: GET_STORE_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: GET_STORE_FAILD
        });
      }
      return response;
    });
};
export const storeSearch = (getData) => (dispatch) => {
  return UserService.post(getData, 'store_search').then(
    (response) => {
      if (response && response.status === "success") {
        dispatch({
          type: SEARCH_STORE_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: SEARCH_STORE_FAILURE
        });
      }
      return response;
    });
};


export const brandSearch = (getData) => (dispatch) => {
  return UserService.post(getData, 'brand_search').then(
    (response) => {
      if (response && response.status === "success") {
        dispatch({
          type: SEARCH_STORE_SUCCESS,
          payload: response
        });
      } else {
        dispatch({
          type: SEARCH_STORE_FAILURE
        });
      }
      return response;
    });
};


export const trendingSearch = (getData) => (dispatch) => {
  return UserService.get('trending_search').then(
    (response) => {
      return response;
    });
};

export const getTopProducts = (getData) => (dispatch) => {
  return UserService.get('best_deal').then(
    (response) => {
      return response;
    });
};

export const trendingSearchRemove = (getData) => (dispatch) => {
  return UserService.post(getData, 'remove_search_content').then(
    (response) => {
      return response;
    });
};

export const getFavorieBrand = (getData) => (dispatch) => {
  return UserService.get('get_brand').then(
    (response) => {
      return response;
    });
};

export const getMasterCategory = (getData) => (dispatch) => {
  return UserService.post(getData, 'getCategory').then(
    (response) => {
      return response;
    });
};

export const getShopByCategory = (getData) => (dispatch) => {
  return UserService.post(getData, 'shop_by_category').then(
    (response) => {
      return response;
    });
};


export const getBlogs = (id) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('blogs?id=' + id).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};
export const getPincode = (getData) => (dispatch) => {
  return UserService.post(getData, 'get_pincode').then(
    (response) => {
      return response;
    });
};
// export const getPincode = (pincode) => (dispatch) => {
//   console.log(pincode,'--')
//   dispatch({
//       type: LOADING_SUCCESS
//   });
//   return UserService.get(`get_pincode?pincode=${pincode}`).then(
//       (response) => {
//           dispatch({
//               type: LOADING_FAILD
//           });
//           return response;
//       });
// };

export const getTestimonial = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_testimonial').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getCompareProducts = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'compare_products').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getBestDeals = () => (dispatch) => {

  return UserService.get('best_deal').then(
    (response) => {
      return response;
    });
};

export const getBestDealsbyId = (cat_id) => (dispatch) => {

  return UserService.get(`best_deal?category_id=${cat_id}`).then(
    (response) => {
      return response;
    });
};


export const removeFavoriteProduct = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'remove_favorite').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if (response && response.status === "success") {
        dispatch({
          type: GET_FAVORITE_PRODUCT_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GET_FAVORITE_PRODUCT_FAILD,
          payload: []
        });
      }
      return response;
    }).catch((error) => {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const getSupportSearch = (givendata) => (dispatch) => {
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.post(givendata, `support_search`).then(
    (response) => {
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      if (response && response.status === "success") {
        dispatch({
          type: GLOBAL_SEARCH_SUCCESS,
          payload: response.data
        });
      } else {
        dispatch({
          type: GLOBAL_SEARCH_FAILD,
          payload: []
        });
      }
      return response;
    });
};

// export const viewplans = (getData) => (dispatch) => {
//   return UserService.post(getData, 'palans').then(
//     (response) => {
//       if (response && response.length > 0) {
//         dispatch({
//           type: GET_PLAN,
//           payload: response
//         });
//       } else {
//         dispatch({
//           type: GET_PLAN,
//           payload: []
//         });
//       }
//       return response;
//     });
// };


