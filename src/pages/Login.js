import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

import styled from "styled-components";
import { Grid, Button } from "../elements";

const Login = (props) => {
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const onChangeUsername = useCallback((e) => setUsername(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);

  const sitelogIn = () => {
    if (username === "" || pwd === "") {
      window.alert("아이디와 패스워드 모두 입력해주세요!");
      return;
    }
    dispatch(userActions.loginAPI(username, pwd));
  };

  return (
    <Grid is_flex column width="25%" padding="4%">
      <h1>로그인</h1>
      <Grid is_flex column margin="3%">
        <Grid is_flex margin="3%">
          <LoginInfo>ID</LoginInfo>
          <LoginInput
            type="text"
            placeholder="아이디를 입력해주세요!"
            value={username}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid is_flex margin="3%">
          <LoginInfo>PWD</LoginInfo>
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            value={pwd}
            onChange={onChangePwd}
          />
        </Grid>
        <Button
          yellow
          text="로그인"
          _onClick={sitelogIn}
          width="102%"
          margin=".5rem 0"
        />
        <Button
          width="102%"
          text="회원 가입"
          _onClick={() => {
            history.push("/signup");
          }}
        />
      </Grid>
    </Grid>
  );
};

const LoginInput = styled.input`
  width: 100%;
  height: 2.4rem;
  border: none;
  outline: none;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.1s ease-in-out;
  padding: 0 12px;
  ::placeholder {
    color: #a09c9c;
    font-size: 12px;
  }
  :focus {
    box-shadow: 0px 2px 10px rgba(255, 193, 73, 0.7);
  }
`;

const LoginInfo = styled.span`
  width: 15%;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: #5a5656;
`;

export default Login;
