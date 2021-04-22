import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";

//action
const GET_ORDERS = "GET_ORDERS";

//actionCreators
const getOrders = createAction(GET_ORDERS, (orders) => ({orders}))

//initialState
const initialState = {
    order_list: [],
  };

//api

const getOrderAPI = () => {
    return function (dispatch, getState, { history }){
      let token = getCookie("user_login") || "";
          axios({
              method: "GET",
              url: "http://54.180.86.19/api/payments",
              headers: {
                "X-AUTH-TOKEN": token,
              },
            })
          .then((res) => {
            console.log("오더 get DB 입니다",res);
            if(res.data.ok){
              dispatch(getOrders(res.data.payments));
            } else {
              console.log("data.ok is false");
            }
          })
          .catch((err) => {
                console.log("getOrderAPI에서 오류발생", err);
          });
    }
  }


//reducer
export default handleActions(
    {
        [GET_ORDERS]: (state, action) =>
        produce(state, (draft) => {
          console.log("액션에서 내려오는 오더", action.payload.orders);
          draft.order_list = action.payload.orders;
        }),

    },initialState
)

//actionCreators export
const actionCreators = {
    getOrderAPI,
};
  
export { actionCreators };