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
  latest_review: {},
  // 상세
  product: {},
  is_loading: false,
};



//메인페이지 상품 불러오기(페이징)
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

//디테일 페이지 상품 하나 불러오기
const setOneProductAPI = (coffeeId) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(`http://54.180.86.19/api/details/${coffeeId}`)
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
