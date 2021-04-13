import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../redux/configureStore";
import styled from "styled-components";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdCheck, setPwdCheck] = React.useState("");
  const [email, setEmail] = React.useState("");
  const onChangeUsername = useCallback((e) => setUsername(e.target.value),[])
  const onChangePwd = useCallback((e) => setPwd(e.target.value),[])
  const onChangePwdCheck = useCallback((e) => setPwdCheck(e.target.value),[])
  const onChangeEmail = useCallback((e) => setEmail(e.target.value),[])

  return(
    <div style={{margin:"10% auto"}}>
      <SignUpSign>
        회원가입
      </SignUpSign>
      <InputArea>
        <Section>
          <SignupInfo style={{marginRight:"36px"}}>
            ID
          </SignupInfo>
          <div>
            <Input type="text" placeholder="3자리 이상 입력해주세요" value={username} onChange={onChangeUsername}/>
          </div>
          <div className="idcheck">
            <CheckBtn>Check</CheckBtn>
          </div>
        </Section>
        <Section>
          <SignupInfo>
            PWD
          </SignupInfo>
          <div>
            <Input type="password" placeholder="3자리 이상 입력해주세요" value={pwd} onChange={onChangePwd}/>
          </div>
        </Section>
        <Section>
          <SignupInfo>
            PWD
          </SignupInfo>
          <div>
            <Input type="password" placeholder="비밀번호를 한번 더 입력해주세요" value={pwdCheck} onChange={onChangePwdCheck}/>
          </div>
        </Section>
        <Section>
          <SignupInfo style={{marginRight:"5px"}}>
            EMAIL
          </SignupInfo>
          <div>
            <Input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail}/>
          </div>
        </Section>
      </InputArea>
      <BtnArea>
        <SignBtn>SignUp</SignBtn>
      </BtnArea>
    </div>
  );
};

const SignUpSign = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 2rem 8.5rem;
`;


const Input = styled.input`
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

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem;
  .idcheck {
    margin-left: 1rem;
  }
`;

const SignupInfo = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #5A5656;
  margin-right: 1rem;
`;

const SignBtn = styled.button`
  width: 6rem;
  height: 2.4rem;
  background-color: #FFC149;
  color: #ffffff;
  border:none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
`;

const InputArea = styled.div`
  width: 30rem;
  text-align: left;
  display: inline-block;
`;

const BtnArea = styled.div`
  width: 30rem;
  position: relative;
  left:-6%;
  top: 5%;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
`;

const CheckBtn = styled(SignBtn)`
  background-color: #5A5656;
`;


export default Signup;
