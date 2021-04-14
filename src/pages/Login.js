import React, {useCallback} from "react";
import {history} from "../redux/configureStore";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

const Login = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const onChangeUsername = useCallback((e) => setUsername(e.target.value),[])
  const onChangePwd = useCallback((e) => setPwd(e.target.value),[])

  const sitelogIn = () => {
    if(username === "" || pwd === ""){
      window.alert("아이디와 패스워드 모두 입력해주세요!");
      return;
    }
    dispatch(userActions.loginAPI(username,pwd));
    history.push("/");
  }
  
  return(
    <div style={{margin:"10% auto"}}>
      <LoginText>
        로그인
      </LoginText>
      <InputArea>
        <Section>
          <LoginInfo style={{marginRight:"2rem"}}>ID</LoginInfo>
          <div>
            <LoginInput type="text" placeholder="아이디를 입력해주세요!" value={username} onChange={onChangeUsername}/>
          </div>
        </Section>
        <Section>
          <LoginInfo>PWD</LoginInfo>
          <div>
            <LoginInput type="password" placeholder="비밀번호를 입력해주세요!" value={pwd} onChange={onChangePwd}/>
          </div>
        </Section>
      </InputArea>
      <ButtonArea>
        <LoginBtn onClick={sitelogIn}>Login</LoginBtn>
        <SignupBtn onClick={()=>{history.push("/signup")}}>SignUp</SignupBtn>
      </ButtonArea>
    </div>
  );
};

const LoginText = styled.div`
  font-size: 36px;
  font-weight: 600;
  position: relative;
  left: 10rem;
  padding: 1rem 0;
`;

const LoginInput = styled.input`
  width: 18rem;
  height: 2.4rem;
  border:none;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  ::placeholder {
    color: #A09C9C;
    font-size: 12px;
    padding-left: 1rem;
}
`;

const LoginInfo = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #5A5656;
  margin-right: 1rem;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem;
`;

const InputArea = styled.div`
  width: 30rem;
  text-align: left;
  display: inline-block;
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: 5%;
  left: 22%;

`;

const LoginBtn = styled.button`
  width: 6rem;
  height: 2.5rem;
  background-color: #FFC149;
  color: #ffffff;
  border:none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  line-height: 2.2rem;
  margin-right: 1rem;
`;

const SignupBtn = styled(LoginBtn)`
  background-color: #5A5656;
  
`;  

export default Login;
