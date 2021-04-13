import React from "react";
import "./Header.css";
import { Grid, Text } from "../elements/";

import styled from "styled-components";

const Header = (props) => {
  const headerChange = () => {
    const navbox = document.querySelector(".nav");
    if (window.scrollY > 35) {
      navbox.style.position = "fixed";
      navbox.style.zIndex = "1500";
      navbox.style.backgroundColor = "white";
      navbox.style.boxShadow = "0 0 5px #0000004d";
    } else {
      navbox.style.backgroundColor = "white";
      navbox.style.boxShadow = "0 0 0 #0000004d";
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", headerChange);

    return () => window.removeEventListener("scroll", headerChange);
  }, []);

  return (
    <HeaderWrap className="nav">
      <Grid is_flex padding="0 4% 0 4%">
        <Grid>
          <Logo>Coffzag</Logo>
        </Grid>
        <Grid textAlign="right">
          <LoginSignup>로그인</LoginSignup>
          <LoginSignup>회원가입</LoginSignup>
        </Grid>
      </Grid>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  height: 40px;
  width: 100%;
  position: fixed;
  z-index: 1500;
  padding: 10px;
  display: flex;
  flex-direction: row;
  color: #5a5656;

  //Animation
  transition-timing-function: ease-in-out;
  transition: all 0.5s;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: 900;
`;

const LoginSignup = styled.span`
  font-size: 16px;
  margin-left: 2%;
  font-weight: 700;
`;

export default Header;
