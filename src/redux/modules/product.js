import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";

//actions
const LOADING = "LOADING";
const SET_PRODUCT = "SET_PRORUCT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProduct = createAction(SET_PRODUCT, (data) => ({ data }));

//initialState
const initialState = {
  product_list: [],
  is_loading: false,
};
// http://54.180.86.19/api/products
// http://localhost:8080/api/products
//mockAPI = "https://run.mocky.io/v3/eca60b5e-b520-427f-8f54-7b88df09acc1"
const product_API = "http://54.180.86.19/api/products";
const setProductAPI = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(product_API)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          dispatch(setProduct(res.data.products));
          dispatch(loading(false));
        }
      })
      .catch((e) => {
        console.log("setProductAPi 오류", e);
      });
  };
};
// const Detail_API = "",
const setOneProductAPI = (id) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(product_API)
      .then((res) => {
        const product_list = res.data.products;
        const product_idx = product_list.findIndex(
          (p) => p.coffeeId === Number(id)
        );
        const product = product_list[product_idx];
        console.log(product);
        if (res.data.ok) {
          dispatch(setProduct([product]));
          dispatch(loading(false));
        }
      })
      .catch((e) => console.log("setOneProductAPI 오류", e));
  };
};

//reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [SET_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.product_list = action.payload.data;
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  setProduct,
  setProductAPI,
  setOneProductAPI,
};

export { actionCreators };
