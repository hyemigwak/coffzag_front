import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//actions
const LOADING = "LOADING";
const SET_PRODUCT = "SET_PRORUCT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProduct = createAction(SET_PRODUCT, (products, reviews) => ({
  products,
  reviews,
}));

//initialState
const initialState = {
  product_list: [],
  latest_review: {},
  is_loading: false,
};

//mockAPI = "https://run.mocky.io/v3/eca60b5e-b520-427f-8f54-7b88df09acc1"
const product_API = "http://54.180.86.19/api/products";

const setProductAPI = (page,size) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios.get(`http://54.180.86.19/api/products?page=${page}&size=${size}`, {
      params: {
          page: page,
          size: size,
      }
    })
      .then((res) => {
        console.log("내려오는 데이터임", res.data);
        if (res.data.ok) {
          dispatch(setProduct(res.data.product, res.data.reviews));
          dispatch(loading(false));
        } else {
          console.log("data.ok is false"); // API OK TEST
        }
      })
      .catch((e) => {
        console.log("setProductAPi 오류", e);
      });
  };
};

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
        // console.log(product);
        if (res.data.ok) {
          dispatch(setProduct([product]));
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
        console.log(action.payload.products);

        draft.is_loading = action.payload.is_loading;
        draft.product_list = action.payload.products.content;
        draft.latest_review = action.payload.reviews;

        console.log(draft.product_list);


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
