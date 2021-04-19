import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

//actions
const ADD_CART = "ADD_CART"; //카트에 추가
const GET_CART = "GET_CART"; //카트에서 불러오기 
const DELETE_CART = "DELETE CART"; //카트에서 삭제하기
const BUY_CART = "BUY_CART"; //카트에서 구매하기 누를때 카트 비워주기, 데이터 보내기
const UPDATE_CART = "UPDATE_CART" //카트에서 수량 조절할때

//action creators
const addCart = createAction(ADD_CART, (cofeeId, cart_item) => ({cofeeId, cart_item}));
const getCart = createAction(GET_CART, (cart_item) => ({cart_item}));
const deleteCart = createAction(DELETE_CART, (coffeeId) => ({coffeeId}));
const buyCart = createAction(BUY_CART, () => ({}));
const updateCart = createAction(UPDATE_CART, (cofeeId, cart_item) => ({cofeeId, cart_item}));

//initialState
const initialState = {
    cart_list: [],
};

//api
const cart_API = "https://run.mocky.io/v3/a33a1443-2455-4cbe-aaa8-3b84909216ee"
const rear_API = "http://54.180.86.19/api/order"
const getCartAPI = () => {
    return function (dispatch, getState, {history}){
        let token = getCookie("user_login") || "";
        axios({
            method: "GET",
            url: cart_API,
            headers: {
              "X-AUTH-TOKEN": token,
            },
          })
        .then((res) => {
              console.log(res);
              if(res.data.ok){
                  let cart_item = []
                  let _cart_data = [...res.data.orderList];
                  _cart_data.forEach((c)=>{
                      cart_item.push({...c})
                  })
                  console.log(cart_item);
                dispatch(getCart(cart_item));
              }
              
        })
        .catch((err) => {
              console.log("getCartAPI에서 오류발생", err);
        });
    }
    
}

// const cart_API = "https://run.mocky.io/v3/a33a1443-2455-4cbe-aaa8-3b84909216ee"
const addCartAPI = (coffeeId, orderCnt) => {
    return function (dispatch, getState, {history}){
        let token = getCookie("user_login") || "";
        let addCart_data = {
            orderCnt: orderCnt,
        }
        axios({
            method: "POST",
            url: `http://54.180.86.19/api/order/${coffeeId}`,
            headers: {
              "X-AUTH-TOKEN": token,
            },
            data: addCart_data,
        })
        .then((res) => {
            console.log(res);
            dispatch(addCart(coffeeId,addCart_data));    
        })
        .catch((err) => {
            console.log("addCartAPI에서 오류발생", err);
        });
    }
    
}

const deleteCartAPI = (coffeeId) => {
    return function (dispatch, getState, { history }) {
        let token = getCookie("user_login");
        axios({
          method: "DELETE",
          url: `http://54.180.86.19/api/order/${coffeeId}`,
          headers: {
            "X-AUTH-TOKEN": token,
          },
        })
          .then((res) => {
            console.log(res);
            dispatch(deleteCart(coffeeId));
            window.alert("삭제완료.");
          })
          .catch((err) => {
            console.log("deleteCartAPI에서 오류발생", err);
          });
      };
}

const updateCartAPI = (coffeeId,orderCnt) => {
    return function (dispatch, getState, { history }) {
        let token = getCookie("user_login");
        let updateCart_data = {
          orderCnt: orderCnt,
        };
        axios({
          method: "PUT",
          url: `http://54.180.86.19/api/order/${coffeeId}`,
          headers: {
            "X-AUTH-TOKEN": token,
          },
          data: updateCart_data,
        })
          .then((res) => {
            console.log(res);
            const cartList = getState().cart.cart_list
            let idx = cartList.findIndex((item) => item.orderCnt === orderCnt)
            let cart = cartList[idx];
            cart = {...cart, orderCnt: orderCnt}
            dispatch(updateCart(coffeeId, cart));
          })
          .catch((err) => {
            console.log("updateCartAPI에서 오류발생", err);
          });
      };
}

const buyCartAPI = () => {
    return function (dispatch, getState, { history }){

    }
}

//reducers
export default handleActions({
    [GET_CART]: (state,action) => produce(state,(draft) => {
        console.log(draft.cart_list)
        draft.cart_list = action.payload.cart_item
    }),
    [ADD_CART]: (state,action) => produce(state,(draft) => {
        if(!draft.cart_list){
            draft.cart_list = action.payload.cart_item
        }
        draft.cart_list.unshift(action.payload.cart_item)
        console.log(draft.cart_list);
    }),
    [DELETE_CART]: (state,action) => produce(state,(draft) => {
        let idx = draft.cart_list.findIndex((i) => i.coffee.coffeeId === action.payload.coffeeId);
        draft.cart_list.splice(idx,1);
    }),
    [BUY_CART]: (state,action) => produce(state,(draft) => {
        draft.list = [];
    }),
    [UPDATE_CART]: (state,action) => produce(state,(draft) => {
        let idx = draft.cart_list.findIndex((i) => i.coffee.coffeeId === action.payload.coffeeId);
        draft.cart_list[idx] = {...draft.cart_list[idx], ...action.payload.cart_item}
    }),
}, initialState)


//export
const actionCreators = {
    getCart,
    getCartAPI,
    addCartAPI,
    deleteCartAPI,
    updateCartAPI,
}

export {actionCreators}