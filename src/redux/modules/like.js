import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { produce } from "immer";
import axios from "axios";

//actions
const ADD_LIKE = "ADD_LIKE"; //좋아요
const DELETE_LIKE = "DELETE_LIKE"; //좋아요 빼기

//actionCreators
const addLike = createAction(ADD_LIKE, (coffeeId, is_like) => ({
  coffeeId,
  is_like,
}));
const deleteLike = createAction(DELETE_LIKE, (coffeeId, is_like) => ({
  coffeeId,
  is_like,
}));

//initialState
const initialState = {
  is_like: false,
};

const addLikeAPI = (coffeeId, is_like) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    axios({
      method: "POST",
      url: `http://54.180.86.19/api/`,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        if (res.data.ok) {
          dispatch(addLike(coffeeId, is_like));
        } else {
          console.log("data.ok is false");
        }
      })
      .catch((e) => {
        console.log("addLikeAPI 오류", e);
      });
  };
};

const deleteLikeAPI = (coffeeId, is_like) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    axios({
      method: "DELETE",
      url: `http://54.180.86.19/api/`,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteLike(coffeeId, is_like));
      })
      .catch((err) => {
        console.log("deleteLikeAPI에서 오류발생", err);
      });
  };
};

//reducer
export default handleActions(
  {
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = action.payload.is_like;
        draft.is_like = true;
      }),
    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.is_like = action.payload.is_like;
        draft.is_like = false;
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  addLikeAPI,
  deleteLikeAPI,
};

export { actionCreators };
