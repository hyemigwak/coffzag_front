import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { Grid, Button } from "../elements";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdCheck, setPwdCheck] = React.useState("");
  const [email, setEmail] = React.useState("");
  const onChangeUsername = useCallback((e) => setUsername(e.target.value), []);
  const onChangePwd = useCallback((e) => setPwd(e.target.value), []);
  const onChangePwdCheck = useCallback((e) => setPwdCheck(e.target.value), []);
  const onChangeEmail = useCallback((e) => setEmail(e.target.value), []);

  const siteSignup = () => {
    if (username === "" || pwd === "" || email === "" || pwdCheck === "") {
      window.alert("모두 입력해주세요!");
      return;
    }
    if (pwd !== pwdCheck) {
      window.alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    dispatch(userActions.signupAPI(username, pwd, email));
    window.alert("회원가입이 완료되었습니다.");
  };

  return (
    <Grid is_flex column width="25%" padding="4%">
      <h1>회원가입</h1>
      <Grid is_flex column margin="3%">
        <Grid is_flex margin="3%">
          <SignupInfo>ID</SignupInfo>
          <Input
            type="text"
            placeholder="3자리 이상 입력해주세요."
            value={username}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid is_flex margin="3%">
          <SignupInfo>PWD</SignupInfo>
          <Input
            type="password"
            placeholder="3자리 이상 입력해주세요."
            value={pwd}
            onChange={onChangePwd}
          />
        </Grid>

        <Grid is_flex margin="3%">
          <SignupInfo>PWD</SignupInfo>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
            value={pwdCheck}
            onChange={onChangePwdCheck}
          />
        </Grid>

        <Grid is_flex margin="3%">
          <SignupInfo style={{ marginRight: "5px" }}>EMAIL</SignupInfo>
          <Input
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
