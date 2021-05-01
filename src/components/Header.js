import React, { useEffect } from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as productActions } from "../redux/modules/product";
import "./Header.css";
import { getCookie } from "../shared/Cookie";
import { Grid } from "../elements/";

import styled from "styled-components";
import ShoppingBasketRoundedIcon from "@material-ui/icons/ShoppingBasketRounded";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const cookie = getCookie("user_login") ? true : false;

  const siteLogout = () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      dispatch(userActions.logOut());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  //스티키 헤더
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

  //로그인 시 헤더 분기
  //헤더 로고 눌렀을때 메인화면은 1페이지, 상품 8개 항상 보여주도록 함(페이지네이션)
  if (cookie && is_login) {
    return (
      <HeaderWrap className="nav">
        <Grid is_flex padding="0 4% 0 4%">
          <Grid>
            <Logo
              onClick={() => {
                history.push("/");
                dispatch(productActions.setProductAPI(1, 8));
              }}
            >
              Coffzag
            </Logo>
          </Grid>
          <Grid textAlign="right">
            <HeaderText>
              <ShoppingBasketRoundedIcon
                style={{ verticalAlign: "-5px" }}
                onClick={() => {
                  history.push("/cart");
                }}
              />
            </HeaderText>
            <HeaderText
              onClick={() => {
                history.push("/mypage");
              }}
            >
              찜리스트
            </HeaderText>
            <HeaderText onClick={siteLogout}>로그아웃</HeaderText>
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
  font-weight: 800;
  cursor: pointer;
`;

export default Header;
