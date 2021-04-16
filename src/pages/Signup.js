import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import styled from "styled-components";
import { Grid, Button } from "../elements";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [email, setEmail] = useState("");
  const onChangeUsername = useCallback((e) => setUsername(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);
  const onChangePwdCheck = useCallback((e) => setPwdCheck(e.target.value), []);
  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);

  const _id = useRef();
  const _pwd = useRef();
  const _pwdChk = useRef();
  const _email = useRef();

  // const [alertDouble, setAlert] = useState("사용 가능한 ID입니다.");
  const doubleCheckLive = () => {
    if (dispatch(userActions.IDCheckAPI(username)) === "false") {
      console.log("중복!");
      // return setAlert("이미 존재하는 ID입니다.");
    } else {
      // console.log("중복임!");
      // return setAlert("사용 가능한 ID입니다.");
    }
    return;
  };
  // doubleCheckLive();

  const siteSignup = () => {
    // 이메일 체크 정규 표현식
    const emailPass = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (username === "" || pwd === "" || email === "" || pwdCheck === "") {
      window.alert("모두 입력해주세요!");
      return;
    }
    if (username.length < 3) {
      window.alert("아이디를 3자리 이상 입력해주세요.");
      _id.current.focus();
      return;
    }
    if (pwd.length < 3) {
      window.alert("비밀번호를 3자리 이상 입력해주세요.");
      _pwd.current.focus();
      return;
    }
    if (pwd !== pwdCheck) {
      window.alert("비밀번호가 일치하지 않습니다!");
      _pwdChk.current.focus();
      return;
    }
    if (!emailPass.test(email)) {
      window.alert("이메일 형식이 아닙니다!");
      _email.current.focus();
      return;
    }
    dispatch(userActions.signupAPI(username, pwd, email));
    window.alert("회원가입이 완료되었습니다.");
  };

  const tryDouble = () => {
    if (dispatch(userActions.IDCheckAPI(username)) === true) {
      console.log("가능");
      window.alert("가능");
    }
  };

  return (
    <Grid is_flex column width="25%" padding="4%">
      <h1>회원가입</h1>
      <Grid is_flex column margin="3%">
        <Grid is_flex margin="3%">
          <SignupInfo>ID</SignupInfo>
          <Input
            ref={_id}
            type="text"
            placeholder="3자리 이상 입력해주세요."
            value={username}
            onChange={onChangeUsername}
          />
        </Grid>
        {/* {alertDouble} */}
        <Grid is_flex margin="3%">
          <SignupInfo>PWD</SignupInfo>
          <Input
            ref={_pwd}
            type="password"
            placeholder="3자리 이상 입력해주세요."
            value={pwd}
            onChange={onChangePwd}
          />
        </Grid>

        <Grid is_flex margin="3%">
          <SignupInfo>PWD</SignupInfo>
          <Input
            ref={_pwdChk}
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            value={pwdCheck}
            onChange={onChangePwdCheck}
          />
        </Grid>

        <Grid is_flex margin="3%">
          <SignupInfo style={{ marginRight: "5px" }}>EMAIL</SignupInfo>
          <Input
            ref={_email}
            type="text"
            placeholder="your_email@coffzag.com"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>

        <Button
          _onClick={siteSignup}
          yellow
          text="회원가입"
          width="102%"
          margin=".5rem 0"
        />
      </Grid>

      <Button
        _onClick={tryDouble}
        text="중복쳌"
        width="102%"
        margin=".5rem 0"
      />
    </Grid>
  );
};

const Input = styled.input`
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

const SignupInfo = styled.span`
  width: 15%;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
`;

export default Signup;
