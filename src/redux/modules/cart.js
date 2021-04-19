import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

//actions
const ADD_CART = "ADD_CART"; //카트에 추가
const GET_CART = "GET_CART"; //카트에서 불러오기 
const DELETE_CART = "DELETE CART"; //카트에서 삭제하기
const BUY_CART = "BUY_CART"; //카트에서 구매하기 누를때

//action creators
const addCart = createAction(ADD_CART, (cart_item) => ({cart_item}));
const getCart = createAction(GET_CART, (cart_item) => ({cart_item}));
const deleteCart = createAction(DELETE_CART, (item) => ({item}));
const buyCart = createAction(BUY_CART, (something) => ({something}));

//initialState
const initialState = {
    cart_list = [],
};

//api
cart_API = "https://run.mocky.io/v3/c3a5889e-da2b-4360-b253-686c38f3a1a9"
const getCartAPI = () => {
    axios({
        method: "GET",
        url: cart_API,
        headers: {
          "X-AUTH-TOKEN": token,
        },
      })
    .then((res) => {
          console.log(res);
          dispatch(getCart());
    })
    .catch((err) => {
          console.log("getCommentAPI에서 오류발생", err);
    });
}

//reducers
const default handleActions({
    [GET_CART]: (state,action) => produce(state,(draft) => {
        draft.cart_list = action.payload.cart_item
    }),
    [ADD_CART]: (state,action) => produce(state,(draft) => {
        draft.cart_list.unshift(action.payload.cart_item)
    }),
    [DELETE_CART]: (state,action) => produce(state,(draft) => {
        
    }),
    [BUY_CART]: (state,action) => produce(state,(draft) => {
        
    }),
}, initialState)


//export
const actionCreators = {
    getCartAPI,
}

export {actionCreators}