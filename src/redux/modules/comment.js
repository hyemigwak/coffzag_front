import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";
import { history } from "../configureStore";
import { getCookie } from "../../shared/Cookie";

//actions
const LOADING = "LOADING";
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

//actionCreators
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getComment = createAction(GET_COMMENT, (coffeeId, comment_list) => ({
  coffeeId,
  comment_list,
}));

const addComment = createAction(ADD_COMMENT, (coffeeId, comment) => ({
  coffeeId,
  comment,
}));

//initialState
const initialState = {
  comment_list: {}, // []가 아닌 {}값으로 들어간다.
  is_loading: false,
};

//api 연결

const commentAPI =
  "https://run.mocky.io/v3/9f67130f-1633-452f-80db-909349fd6909";
const getCommentAPI = (coffeeId) => {
  return function (dispatch, getState, { history }) {
    if (!coffeeId) {
      return;
    }
    dispatch(loading(true));
    axios
      .get(commentAPI)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          let commentList = [];
          let response_data = res.data.reviews;
          response_data.forEach((c) => {
            commentList.push({ ...c });
          });
          commentList.sort();
          dispatch(getComment(coffeeId, commentList));
          //시간순 내림차순 정렬하기
        }
      })
      .catch((err) => console.log("getCommentAPI 에러", err));
  };
};

const addCommentAPI = (coffeeId, contents, createdAt) => {
  return function (dispatch, getState, { history }) {
    const user_info = getState.user.user;
    let comment_data = {
      coffeeId: coffeeId,
      createdAt: createdAt,
      username: user_info.username,
      contents: contents,
    };
    axios({
      method: "POST",
      url: commentAPI,
      data: comment_data,
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

//reducer
export default handleActions(
  {
    //[]리스트로 아예 갈아끼우면 매번 서버에 요청해야한다. 서버 과부하. 딕셔너리로 리덕스에 저장해두기
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // let data = {[coffeeId]:comment_list, ...}
        draft.comment_list[action.payload.coffeeId] =
          action.payload.comment_list;
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
  },
  initialState
);

//actionCreators export
const actionCreators = {
  getComment,
  addComment,
  getCommentAPI,
  addCommentAPI,
};

export { actionCreators };
