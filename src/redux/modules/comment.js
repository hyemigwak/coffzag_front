import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { compose } from "redux";
import { ConfirmationNumberTwoTone } from "@material-ui/icons";

//actions
const LOADING = "LOADING";
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const getComment = createAction(
  GET_COMMENT,
  (coffeeId, product_info, comment_list) => ({
    coffeeId,
    product_info,
    comment_list,
  })
);

const addComment = createAction(ADD_COMMENT, (coffeeId, comment) => ({
  coffeeId,
  comment,
}));

const editComment = createAction(
  EDIT_COMMENT,
  (coffeeId, reviewId, comment) => ({ coffeeId, reviewId, comment })
);
const deleteComment = createAction(DELETE_COMMENT, (reviewId, comment) => ({
  reviewId,
  comment,
}));

//initialState
const initialState = {
  comment_list: {}, // []가 아닌 {}값으로 들어간다.
  product_info: [],
  is_loading: false,
};

//api 연결
const getCommentAPI = (coffeeId) => {
  return function (dispatch, getState, { history }) {
    if (!coffeeId) {
      return;
    }
    dispatch(loading(true));
    axios
      .get(`http://54.180.86.19/api/details/${coffeeId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          const product_info = res.data.products;

          const commentList = [];
          const response_data_reviews = res.data.reviews;
          response_data_reviews.forEach((c) => {
            commentList.push({ ...c });
            commentList.sort(function (a, b) {
              return a.createdAt > b.createdAt
                ? -1
                : a.createdAt < b.createdAt
                ? 1
                : 0;
            });
          });

          commentList.forEach((c) => {
            // List에 날짜 key만 추가
            c._createdAt = c.createdAt.split("T")[0];
          });
          console.log(commentList);

          dispatch(getComment(coffeeId, product_info, commentList));
          dispatch(loading(false));
        }
      })
      .catch((err) => console.log("getCommentAPI 에러", err));
  };
};

const addCommentAPI = (coffeeId, contents, createdAt) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login") || "";
    const user_info = getState().user.user;
    let comment_data = {
      coffeeId: coffeeId,
      createdAt: createdAt,
      contents: contents,
      username: user_info.username,
    };
    axios({
      method: "POST",
      url: `http://54.180.86.19/api/reviews/${coffeeId}`,
      data: comment_data,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(addComment(coffeeId, comment_data));
        window.alert("댓글이 작성되었습니다.");
      })
      .catch((err) => {
        console.log("addCommentAPI에서 오류발생", err);
        window.alert("댓글 작성에 실패했습니다.");
      });
  };
};

//const DeleteUrl = "http://54.180.86.19/api/reviews/${reviewId}"
const deleteCommentAPI = (coffeeId, reviewId) => {
  return function (dispatch, getState, { history }) {
    let token = getCookie("user_login");
    axios({
      method: "DELETE",
      url: `http://54.180.86.19/api/reviews/${reviewId}`,
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deleteComment(coffeeId, reviewId));
        window.alert("댓글이 삭제되었습니다.");
      })
      .catch((err) => {
        console.log("deleteCommentAPI에서 오류발생", err);
        window.alert("댓글 삭제에 실패했습니다.");
      });
  };
};

const editCommentAPI = () => {
  return function (dispatch, getState, { history }) {};
};

//reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    //[]리스트로 아예 갈아끼우면 매번 서버에 요청해야한다. 서버 과부하. 딕셔너리로 리덕스에 저장해두기
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // let data = {[coffeeId]:comment_list, ...}
        draft.is_loading = action.payload.is_loading;
        draft.comment_list[action.payload.coffeeId] =
          action.payload.comment_list;
        draft.product_info[action.payload.coffeeId] =
          action.payload.product_info;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        if (!draft.comment_list[action.payload.coffeeId]) {
          draft.comment_list[action.payload.coffeeId] = [
            action.payload.comment,
          ];
          return;
        }
        draft.comment_list[action.payload.coffeeId].unshift(
          action.payload.comment
        );
      }),

    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.commnet_list.findIndex(
          (c) => c.reviewId === action.payload.comment
        );

        draft.comment_list[action.payload.coffeeId][idx] = {
          ...draft.comment_list[action.payload.coffeeId][idx],
          ...action.payload.comment,
        };
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.comment_list[action.payload.coffeeId].filter(
          (c) => c.reviewId !== action.payload.reviewId
        );
      }),
  },
  initialState
);

//actionCreators export
const actionCreators = {
  getComment,
  addComment,
  editComment,
  deleteComment,
  getCommentAPI,
  addCommentAPI,
  editCommentAPI,
  deleteCommentAPI,
};

export { actionCreators };
