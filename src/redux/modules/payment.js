import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//actions
const LOADING = "LOADING";
const SET_PAYMENT = "SET_PAYMENT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setPayment = createAction(SET_PAYMENT, (payment) => ({ payment }));

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
  },
  initialState
);

//actionCreators export
const actionCreators = {
  setPayment,
  setPaymentAPI,
};

export { actionCreators };
