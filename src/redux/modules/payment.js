import { createAction, handleActions } from "redux-actions";
import {getCookie} from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";

//actions
const LOADING = "LOADING";
const SET_PAYMENT = "SET_PAYMENT"; //구매페이지 불러오기
const ADD_PAYMENT = "ADD_PAYMENT" //구매페이지 정보 보내주기(추가)

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setPayment = createAction(SET_PAYMENT, (payment) => ({ payment }));
const addPayment = createAction(ADD_PAYMENT, (payment) => ({ payment }));

//initialState
const initialState = {
  payment_info: {},
  is_loading: false,
};

//mock API
const payment_API =
  "https://run.mocky.io/v3/e43fb28b-19cc-4b8e-849a-8723a08fe6f3";

const setPaymentAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(payment_API)
      .then((res) => {
        console.log(res.data.results);
        if (res.data.ok) {
          dispatch(setPayment(res.data.results));
          dispatch(loading(false));
        } else {
          console.log("data.ok is false");
        }
      })
      .catch((e) => {
        console.log("setPaymentAPI 오류", e);
      });
  };
};

const addPaymentAPI = (coffeeId) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    let payment_data = {
      coffeeId: coffeeId,
    };
    axios({
      method: "POST",
      url: ``,
      data: payment_data,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(addPayment(coffeeId));
        window.alert("결제가 완료되었습니다.");
      })
      .catch((err) => {
        console.log("addPaymentAPI에서 오류발생", err);
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
    [SET_PAYMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.payment_info = action.payload.payment;
      }),
    [ADD_PAYMENT]: (state, action) =>
    produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading;
      if(!draft.payment.info){
        draft.payment_info = action.payload.payment;
      }
      draft.payment_info.unshift(action.payload.payment);
    }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  setPayment,
  setPaymentAPI,
  addPayment,
  addPaymentAPI,
};

export { actionCreators };
