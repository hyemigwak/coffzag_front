import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";

//actions
const LOADING = "LOADING";
const GET_PAYMENT_USER = "GET_PAYMENT_USER"; //구매페이지 사용자 불러오기
const ADD_PAYMENT = "ADD_PAYMENT"; // 결제시키기 (변수명 뭘로 할지 곰인)

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getPaymentUser = createAction(GET_PAYMENT_USER, (user) => ({ user }));
const addPayment = createAction(ADD_PAYMENT, () => ({}));

//initialState
const initialState = {
  user: [],
  is_loading: false,
};

// https://run.mocky.io/v3/e43fb28b-19cc-4b8e-849a-8723a08fe6f3
const payment_API = "http://54.180.86.19/api/payments/";

const getPaymentUserAPI = () => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    dispatch(loading(true));
    axios({
      method: "GET",
      url: "http://54.180.86.19/api/payments/userInfo",
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        if (res.data.ok) {
          dispatch(getPaymentUser(res.data));
          dispatch(loading(false));
        } else {
          console.log("data.ok is false");
        }
      })
      .catch((e) => {
        console.log("getPaymentUserAPI 오류", e);
      });
  };
};

const addPaymentAPI = (userPhone, userAddress, totalPrice, payMethod) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    let addPayment_data = {
      userPhone: userPhone,
      userAddress: userAddress,
      totalPrice: totalPrice,
      payMethod: payMethod,
    };
    dispatch(loading(true));
    axios({
      method: "POST",
      url: "http://54.180.86.19/api/payments",
      headers: {
        "X-AUTH-TOKEN": token,
      },
      data: addPayment_data,
    })
      .then((res) => {
        console.log(res.data.msg);
        dispatch(addPayment("구매하기: ", res.data.results));
        dispatch(loading(false));
      })
      .catch((e) => {
        console.log("addPaymentAPI 오류", e);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [GET_PAYMENT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        console.log(draft.user);
      }),
    [ADD_PAYMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.payment_info = action.payload.payment;
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  getPaymentUser,
  getPaymentUserAPI,
  addPayment,
  addPaymentAPI,
};

export { actionCreators };
