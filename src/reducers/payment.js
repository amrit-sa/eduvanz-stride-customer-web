const planId = localStorage.getItem("plan");

const initialState = {
  selectedplan: planId ? planId : null,
  plans: [],
  planData: {},
  product: {},
  activeCards: {
    data: []
  },
  schemeSummary: [],
  moratoriumTenure: [],
  repaymentStarts: [],
  on_time_payments:null

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SELECTED_PLAN':
      return {
        ...state,
        selectedplan: payload
      };
    case 'GET_PLAN_SUCCESS':
      return {
        ...state,
        plans: payload
      };
    case 'GET_PLAN_FAILD':
      return {
        ...state,
        plans: []
      };
    case 'GET_PLAN_TIMELINE':
      return {
        ...state,
        schemeSummary: payload.schemeSummary,
        moratoriumTenure: payload.moratoriumTenure,
        repaymentStarts: payload.repaymentStarts
      };
    case 'GET_PLAN_TIMELINE_FAILD':
      return {
        ...state,
        schemeSummary: [],
        moratoriumTenure: [],
        repaymentStarts: []
      };
    case 'GET_ACCOUNT_PRODUCT_SUCCESSS':
      return {
        ...state,
        product: payload
      };
    case 'GET_ACCOUNT_PRODUCT_FAILD':
      return {
        ...state,
        product: {}
      };
    case 'GET_PLAN_DETAILS_SUCCESS':
      return {
        ...state,
        planData: payload
      };
    case 'GET_PLAN_DETAILS_FAILD':
      return {
        ...state,
        planData: {}
      };
    case 'ACTIVE_CARDS':
      return {
        ...state,
        activeCards: payload
      };
      case 'ON_TIMES_PAYMENTS':
      return {
        ...state,
        on_time_payments: payload
      };
    default:
      return state;
  }
}
