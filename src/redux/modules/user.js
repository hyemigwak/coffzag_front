import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import axios from "axios";

//actions
const LOG_IN = "LOG_IN"; //로그인
const LOG_OUT = "LOG_OUT"; //로그아웃
const LOGIN_CHECK = "LOGIN_CHECK"; //로그인 유지

//actionCreators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (cookie) => ({ cookie }));

//initialState
const initialState = {
  user: [],
  is_login: false,
};

//api연결

const loginAPI = (username, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://54.180.86.19/api/authenticate",
      data: {
        username: username,
        password: pwd,
      },
    })
      .then((res) => {
        console.log(res);
        const jwtToken = res.data.token;
        setCookie("user_login", jwtToken); //쿠키에 user_login 이라는 이름으로 저장
        axios.defaults.headers.common["Authorization"] = `${jwtToken}`; //디폴트로 헤더에 토큰 담아주기
        dispatch(
          logIn({
            username: username,
            password: pwd,
          })
        );
        history.push("/");
        window.alert("정상적으로 로그인 되었습니다!");
      })
      .catch((err) => {
        console.log("loginAPI에서 오류 발생", err);
      });
  };
};

const signupAPI = (username, pwd, email) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://54.180.86.19/api/signup",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        username: username,
        password: pwd,
        email: email,
      },
    })
      .then((res) => {
        console.log(res);
        history.push("/login");
        window.alert("축하합니다. coffzag의 회원이 되어주셔서 감사합니다.");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("회원가입에 실패했습니다.");
      });
  };
};

//reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("user_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.cookie;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  logIn,
  logOut,
  loginCheck,
  loginAPI,
  signupAPI,
};

export { actionCreators };
