import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import axios from 'axios';
import moment from "moment";
import { history } from "../configureStore";
import { getCookie } from "../../shared/Cookie";


//actions
const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";


//actionCreators
const getComment = createAction(GET_COMMENT, (coffee_id, comment_list) => ({coffee_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (coffee_id, comment) => ({coffee_id, comment}));


//initialState
const initialState = {
    comment_list: {}, // []가 아닌 {}값으로 들어간다.
};

//api 연결

const commentAPI = "https://run.mocky.io/v3/4b6783c1-18e5-4dc0-b9c4-f10cc6b39441"
const getCommentAPI = (coffee_id) => {
    return function (dispatch, getState, {history}){
        if(!coffee_id){
            return;
        }
        axios
        .get(commentAPI)
        .then((res) => {
            if(res.data.ok){
                let commentList = [];
                let response_data = res.data.results;
                response_data.forEach((c) => {
                    commentList.push({...c});
                });
                commentList.sort()
                dispatch(getComment(coffee_id,commentList));
                //시간순 내림차순 정렬하기
            }
        })
        .catch((err) => 
        console.log("getCommentAPI 에러", err));
    };
};

const addCommentAPI = (coffee_id, contents, created_at) => {
    return function (dispatch, getState, {history}){
        const user_info = getState.user.user;
        let comment_data = {
            coffee_id: coffee_id,
            created_at: created_at,
            username: user_info.username,
            content: contents,
        };
        axios({
            method:"POST",
            url: commentAPI,
            data: comment_data,
        })
        .then(res => {
            console.log(res);
            dispatch(addComment(coffee_id, comment_data))
            window.alert("댓글이 작성되었습니다.");
        })
        .catch(err => {
            console.log("addCommentAPI에서 오류발생", err);
            window.alert("댓글 작성에 실패했습니다.");
        })
    }
}


//reducer
export default handleActions({
    
    //[]리스트로 아예 갈아끼우면 매번 서버에 요청해야한다. 서버 과부하. 딕셔너리로 리덕스에 저장해두기
    [GET_COMMENT]: (state,action) => produce(state,(draft) => {
        // let data = {[coffee_id]:comment_list, ...}
        draft.comment_list[action.payload.coffee_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state,action) => produce(state,(draft) => {
        if(!draft.comment_list[action.payload.coffee_id]){
            draft.comment_list[action.payload.coffee_id] = [action.payload.comment];
            return;
        }
        draft.comment_list[action.payload.coffee_id].unshift(action.payload.comment);
    }),




},initialState);


//actionCreators export
const actionCreators = {
    getComment,
    addComment,
    getCommentAPI,
    addCommentAPI,
};

export { actionCreators };
