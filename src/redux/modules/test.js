import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

//actions
const LOADING = "LOADING";
const SET_PRODUCT = "SET_PRORUCT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const setProduct = createAction(SET_PRODUCT, (products, reviews, paging) => ({products,reviews,paging}));

//initialState
const initialState = {
  product_list: [],
  paging: {start:null, next:null, size:8},
  is_loading: false,
};


const PagingProductAPI = (page, size) => {
    return function (dispatch, getState, { history }) {
        dispatch(loading(true));
        let paging_data = {
        };
        axios({
            method: "GET",
            url: `http://54.180.86.19/api/products?page=${page}&size=${size}`,
            data: paging_data,
        })
        .then((res) => {
            console.log(res);
            if (res.data.ok) {
            dispatch(setProduct(res.data.products, res.data.reviews));
            dispatch(loading(false));
            } else {
            console.log("data.ok is false"); // API OK TEST
            }
        })  
        .catch((e) => {
        console.log("PagingProductAPI 오류", e);
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
    [SET_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
        draft.product_list = action.payload.products;
        draft.latest_review = action.payload.reviews;
        draft.paging = action.payload.paging;
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  setProduct,
  PagingProductAPI,
};

export { actionCreators };
