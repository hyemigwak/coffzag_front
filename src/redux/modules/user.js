import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

//actions
const LOG_IN = "LOG_IN"; //로그인
const LOG_OUT = "LOG_OUT"; //로그아웃
const LOGIN_CHECK = "LOGIN_CHECK"; //로그인 유지
const GET_USER = "GET_USER"; //유저ID 받아오기

//actionCreators
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loginCheck = createAction(LOGIN_CHECK, (cookie) => ({ cookie }));
const getUser = createAction(GET_USER, (user) => ({ user })); // id 중복체크

//initialState
const initialState = {
  user: [],
  is_login: false,
  is_exist: false, // id 중복체크
};

//api연결
const loginAPI = (username, pwd) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://54.180.86.19/api/login",
      data: {
        username: username,
        password: pwd,
      },
    })
      .then((res) => {
        if (res.data.token != null) {
          console.log(res.data); // response 확인
          const jwtToken = res.data.token;
          const _user_name = res.data.username;
          setCookie("user_login", jwtToken); //쿠키에 user_login 이라는 이름으로 저장
          localStorage.setItem("user_name", _user_name); //유저네임을 로컬스토리지에 저장
          axios.defaults.headers.common["Authorization"] = `${jwtToken}`; //디폴트로 헤더에 토큰 담아주기
          dispatch(
            logIn({
              username: username,
              password: pwd,
            })
          );
          window.alert("정상적으로 로그인 되었습니다!");
          history.push("/");
        } else {
          window.alert("ID를 다시 확인해주세요.");
        }
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
        console.log(res); // signup 정보 확인
        window.alert("축하합니다. coffzag의 회원이 되어주셔서 감사합니다.");
        history.push("/login");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("회원가입에 실패했습니다.");
      });
  };
};

// 중복체크 api를 파줘야 할것같다
// login POST요청시 필요한 data는 username & password 인데
// 중복체크 요청은 request -> username만 해당
// # 로직
// 1. Signup에서 username을 받음 (버튼은 test 용)
// 2. username이 이미 존재하는 경우(-> false) != username 존재하지 않는 경우(-> true)
// 3. signupAPI함수 내 또는 Signup.js 에서 return값을 받아 if문작성, dispatch하면 될 듯
const IDCheckAPI = (username) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://54.180.86.19/api/signup/checkid",
      data: {
        username: username,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(getUser(res.data.ok));
      })
      .catch((err) => {
        console.log("IDCheckAPI에서 오류 발생", err);
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
        localStorage.removeItem("user_name");
        draft.user = null;
        draft.is_login = false;
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.cookie;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.is_exist = action.payload.user;
        console.log(action.payload);
        console.log(action.payload.user);
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
  IDCheckAPI,
};

export { actionCreators };
