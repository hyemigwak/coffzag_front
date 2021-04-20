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
const addCart = createAction(ADD_CART, (coffeeId, cart_item) => ({coffeeId, cart_item}));
const getCart = createAction(GET_CART, (cart_item) => ({cart_item}));
const deleteCart = createAction(DELETE_CART, (coffeeId) => ({coffeeId}));
const buyCart = createAction(BUY_CART, () => ({}));
const updateCart = createAction(UPDATE_CART, (coffeeId, cart_item) => ({coffeeId, cart_item}));

//initialState
const initialState = {
    cart_list: [],
};

//api
const cart_API = "https://run.mocky.io/v3/a33a1443-2455-4cbe-aaa8-3b84909216ee"
const rear_API = "http://54.180.86.19/api/orders"
const getCartAPI = () => {
    return function (dispatch, getState, {history}){
        let token = getCookie("user_login") || "";
        axios({
            method: "GET",
            url: rear_API,
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
          } else {
            console.log("data.ok is false");
          }
        })
        .catch((err) => {
              console.log("getCartAPI에서 오류발생", err);
        });
    }
    
}

// const cart_API = "https://run.mocky.io/v3/a33a1443-2455-4cbe-aaa8-3b84909216ee"
const addCartAPI = (coffeeId, orderCnt,
  coffeePrice,coffeeName,coffeeImg,coffeeBrand,coffeeUnit) => {
    return function (dispatch, getState, {history}){
        let token = getCookie("user_login") || "";

        // console.log("id",coffeeId,"cnt",orderCnt,
        // "가격",coffeePrice,"이름",coffeeName,"이미지",coffeeImg,"브랜드",coffeeBrand,"단위",coffeeUnit);

        let addCart_data = {
            orderCnt: orderCnt,
            coffee : {
              coffeePrice: coffeePrice,
              coffeeName: coffeeName,
              coffeeImg: coffeeImg,
              coffeeBrand: coffeeBrand,
              coffeeUnit: coffeeUnit,
            }
        }
        axios({
            method: "POST",
            url: `http://54.180.86.19/api/orders/${coffeeId}`,
            headers: {
              "X-AUTH-TOKEN": token,
            },
            data: addCart_data,
        })
        .then((res) => {
            console.log(res);
            if(res.data.ok){
              console.log(res.data.order.coffee);
              console.log(res.data.order.orderCnt);
              dispatch(addCart(coffeeId, res.data.order));
            } else {
              console.log("data.ok is false");
            }
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
          url: `http://54.180.86.19/api/orders/${coffeeId}`,
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

const updateCartAPI = (coffeeId, _orderCnt, _unitPrice) => {
    return function (dispatch, getState, { history }) {
        let token = getCookie("user_login");
        let updateCart_data = {
          coffeeId: coffeeId,
          orderCnt: _orderCnt,
          unitPrice: _unitPrice,
        };
        axios({
          method: "PUT",
          url: `http://54.180.86.19/api/orders/${coffeeId}`,
          headers: {
            "X-AUTH-TOKEN": token,
          },
          data: updateCart_data,
        })
          .then((res) => {
            console.log(res);
            const cartList = getState().cart.cart_list;
            console.log(cartList);
            let idx = cartList.findIndex((item) => item.coffee.coffeeId === coffeeId);
            console.log(idx);
            let cart = cartList[idx];
            console.log(cart);
            console.log(_orderCnt);
            const updated_cart = {...cart, orderCnt: _orderCnt}
            console.log(updated_cart);
            dispatch(updateCart(coffeeId, updated_cart));
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
        console.log(action.payload.cart_item);
        draft.cart_list = action.payload.cart_item
    }),
    [ADD_CART]: (state,action) => produce(state,(draft) => {
      console.log(draft.cart_list);
      console.log(action.payload);
      console.log(action.payload.cart_item);

        if(!draft.cart_list){
            draft.cart_list = action.payload.cart_item
        }
        draft.cart_list.unshift(action.payload.cart_item);
    }),
    [DELETE_CART]: (state,action) => produce(state,(draft) => {
        let idx = draft.cart_list.findIndex((i) => i.coffee.coffeeId === action.payload.coffeeId);
        draft.cart_list.splice(idx,1);
    }),
    [UPDATE_CART]: (state,action) => produce(state,(draft) => {
        console.log(draft.cart_list);
        console.log(action.payload.cart_item);
        let idx = draft.cart_list.findIndex((i) => i.coffee.coffeeId === action.payload.cart_item.coffee.coffeeId);
        console.log(idx);
        console.log(draft.cart_list[idx])
        draft.cart_list[idx] = { ...draft.cart_list[idx], ...action.payload.cart_item }
        console.log({ ...draft.cart_list[idx], ...action.payload.cart_item });

    }),
    [BUY_CART]: (state,action) => produce(state,(draft) => {
        draft.list = [];
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