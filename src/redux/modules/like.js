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

//마이페이지에 좋아요 불러오기, 메인에 좋아요 리스트 부르기
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

//찜리스트 추가하기
const addLikeAPI = (coffeeId) => {
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
        console.log("add로 내려오는 데이터임", res);
        dispatch(addLike());
      })
      .catch((e) => {
        console.log("addLikeAPI 오류", e);
      });
  };
};

//찜리스트에서 삭제하기
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
