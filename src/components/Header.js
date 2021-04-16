import React, { useEffect } from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import "./Header.css";
import { getCookie, deleteCookie, setCookie } from "../shared/Cookie";
import { Grid, Text } from "../elements/";

import styled from "styled-components";
import { TextureRounded } from "@material-ui/icons";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";

const Header = (props) => {
  const dispatch = useDispatch(); // 액션을 디스패치를 타고 와서 뿌려준다
  const is_login = useSelector((state) => state.user.is_login); // state를 가져오는 것
  const cookie = getCookie("user_login") ? true : false;

  const siteLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      dispatch(userActions.logOut());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  const headerChange = () => {
    const navbox = document.querySelector(".nav");
    if (window.scrollY > 35) {
      navbox.style.position = "fixed";
      navbox.style.zIndex = "1500";
      navbox.style.backgroundColor = "#ffffffCC";
      navbox.style.backdropFilter = "blur(6px)";
      navbox.style.boxShadow = "0 0 5px #0000004d";
    } else {
      navbox.style.backgroundColor = "white";
      navbox.style.boxShadow = "0 0 0 #0000004d";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerChange);
    return () => window.removeEventListener("scroll", headerChange);
  }, []);

  if (cookie && is_login) {
    return (
      <HeaderWrap className="nav">
        <Grid is_flex padding="0 4% 0 4%">
          <Grid>
            <Logo
              onClick={() => {
                history.push("/");
              }}
            >
              Coffzag
            </Logo>
          </Grid>
          <Grid textAlign="right">
            <HeaderText onClick={siteLogout}>로그아웃</HeaderText>
            <HeaderText>
              <ShoppingBasketRoundedIcon
                style={{ verticalAlign: "-5px" }}
                onClick={() => {
                  history.push("/cart");
                }}
              />
            </HeaderText>
          </Grid>
        </Grid>
      </HeaderWrap>
    );
  } else {
    return (
      <HeaderWrap className="nav">
        <Grid is_flex padding="0 4% 0 4%">
          <Grid>
            <Logo
              onClick={() => {
                history.push("/");
              }}
            >
              Coffzag
            </Logo>
          </Grid>

          <Grid textAlign="right">
            <HeaderText
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </HeaderText>
            <HeaderText
              onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </HeaderText>
          </Grid>
        </Grid>
      </HeaderWrap>
    );
  }
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

  // Animation
  transition-timing-function: ease-in-out;
  transition: all 0.5s;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: 900;
  cursor: pointer;
`;

const HeaderText = styled.span`
  font-size: 14px;
  margin-left: 2%;
  font-weight: 700;
  cursor: pointer;
`;

export default Header;
