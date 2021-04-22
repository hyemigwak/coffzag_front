import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//actions
const LOADING = "LOADING";
const SET_PRODUCT = "SET_PRORUCT";
const SET_ONEPRODUCT = "SET_ONEPRODUCT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProduct = createAction(SET_PRODUCT, (products, reviews) => ({
  products,
  reviews,
}));
const setOneProduct = createAction(SET_ONEPRODUCT, (product) => ({
  product,
}));

//initialState
const initialState = {
  // 메인
  product_list: [],
  detail_list: [],
  latest_review: {},
  // 상세
  product: {},
  is_loading: false,
};

//mockAPI = "https://run.mocky.io/v3/eca60b5e-b520-427f-8f54-7b88df09acc1"

const setProductAPI = (page, size) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(`http://54.180.86.19/api/products?page=${page}&size=${size}`, {
        params: {
          page: page,
          size: size,
        },
      })
      .then((res) => {
        if (res.data.ok) {
          dispatch(setProduct(res.data.product, res.data.reviews));
          dispatch(loading(false));
        } else {
          console.log("data.ok is false"); // API OK TEST
        }
      })
      .catch((e) => {
        console.log("setProductAPI 오류", e);
      });
  };
};

const setOneProductAPI = (coffee_idx) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://54.180.86.19/api/details/${coffee_idx}`)
      .then((res) => {
        console.log("이거", res.data);
        if (res.data.ok) {
          dispatch(setOneProduct(res.data.products[0]));
          dispatch(loading(false));
        } else {
          console.log("data.ok is false");
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
        draft.product_list = action.payload.products.content;
        draft.latest_review = action.payload.reviews;
      }),
    [SET_ONEPRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.product = action.payload.product;
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  setProduct,
  setProductAPI,
  setOneProduct,
  setOneProductAPI,
};

export { actionCreators };
