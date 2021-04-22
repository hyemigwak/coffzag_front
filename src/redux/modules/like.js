import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";

//actions
const GET_LIKE = "GET_LIKE"; //좋아요 DB 불러오기
const ADD_LIKE = "ADD_LIKE"; //좋아요 추가하기
const DELETE_LIKE = "DELETE_LIKE"; //좋아요 삭제하기

//actionCreators
const getLike = createAction(GET_LIKE, (like) => ({ like }));

const addLike = createAction(ADD_LIKE, (like) => ({ like }));
const deleteLike = createAction(DELETE_LIKE, (coffeeId) => ({ coffeeId }));

//initialState
const initialState = {
  like_list: [],
  is_like: false,
};

const getLikeAPI = () => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    axios({
      method: "GET",
      url: "http://54.180.86.19/api/myproducts",
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        if (res.data.ok) {
          dispatch(getLike(res.data.myProductList));
        } else {
          console.log("data.ok is false");
        }
      })
      .catch((err) => {
        console.log("getLikeAPI에서 오류발생", err);
      });
  };
};

const addLikeAPI = (coffeeId) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    // let data = {
    //   coffeeId: like.coffeeId,
    //   coffeeImg: like.coffeeImg,
    //   coffeeName: like.coffeeName,
    //   coffeePrice: like.coffeePrice,
    //   coffeeInfo: like.coffeeInfo,
    //   coffeeBrand: like.coffeeBrand,
    // }
    axios({
      method: "POST",
      url: `http://54.180.86.19/api/myproducts/${coffeeId}`,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log("add로 내려오는 데이터임", res);
        dispatch(addLike());
      })
      .catch((e) => {
        console.log("addLikeAPI 오류", e);
      });
  };
};

const deleteLikeAPI = (coffeeId) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    axios({
      method: "POST",
      url: `http://54.180.86.19/api/myproducts/${coffeeId}`,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteLike(coffeeId));
        // history.replace("/mypage")
      })
      .catch((err) => {
        console.log("deleteLikeAPI에서 오류발생", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.like_list) {
          return;
        }
        draft.like_list = action.payload.like;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // console.log("액션에서 내려오는 좋아요 라이크",action.payload.like);
        // if(!draft.like_list){
        //   draft.like_list = [...action.payload.like]
        // }
        // draft.like_list.unshift(action.payload.like);
        // draft.is_like = true;
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.like_list.findIndex(
          (l) => l.product.coffeeId === action.payload.coffeeId
        );
        draft.like_list.splice(idx, 1);
        draft.is_like = false;
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  getLikeAPI,
  addLikeAPI,
  deleteLikeAPI,
};

export { actionCreators };
