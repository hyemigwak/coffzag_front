import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import axios from 'axios';

//actions
const LOG_IN = "LOG_IN"; //로그인
const LOG_OUT = "LOG_OUT"; //로그아웃
const GET_USER = "GET_USER"; //유저정보 가져오기

//actionCreators
const logIn = createAction(LOG_IN, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));

//initialState
const initialState = {
    user: [],
    is_login: false,
};

//api연결

const loginAPI = (username,pwd) => {
    return function(dispatch, getState, {history}){
        axios({
            method:"POST",
            url:"https://run.mocky.io/v3/a0426349-6b6b-4045-8488-30eefc6ac179",
            data: {
                "username":username,
                "password":pwd,
            },
        })
        .then((res) => {
            // const jwtToken = res. 받은 토큰 어딨니. 받아서 쿠키에 저장해주자
            // setCookie("user_login", jwtToken); 쿠키에 user_login 이라는 이름으로 저장
            // axios.defaults.headers.common['Authorization'] = `${jwtToken}`; 디폴트로 헤더에 토큰 담아주기
            dispatch(logIn({
                username: username,
                password: pwd,
            }));
            history.push("/");
            window.alert("정상적으로 로그인 되었습니다!");
        })
        .catch(err => {
            console.log("loginAPI에서 오류 발생", err);
        })
    }
}

const signupAPI = (username,pwd,email) => {
    return function(dispatch, getState, {history}){
        axios({
            method:"POST",
            // url: ""
            headers: {
                "Accept": "application/json", //클라이언트가 서버한테 요청(원하는) 타입 but 서버는 그대로 안줄 수 있음
                "Content-Type": "application/json;charset=UTF-8", //현재 서버에게 보내는 데이터 타입, 한글깨짐 방지
                "Access-Control-Allow-Origin" : '*'
            },
            body: JSON.stringify({
                "username":username,
                "password":pwd,
                "email":email,
            }),
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            history.push("/login");
            window.alert("축하합니다. coffezag의 회원이 되어주셔서 감사합니다.");
        })
        .catch(err => {
            console.log("signupAPI에서 오류발생", err);
            window.alert("회원가입에 실패했습니다.");
        })
    }
}



//reducer
export default handleActions({
    [LOG_IN]: (state,action) => produce(state,(draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state,action) => produce(state,(draft) => {
        deleteCookie('user_login');
        draft.user = null;
        draft.is_login = false;
    })
}, initialState);

//action creator export
const actionCreators = {
    logIn,
    logOut,
    getUser,
    loginAPI,
    signupAPI,
};

export {actionCreators};
