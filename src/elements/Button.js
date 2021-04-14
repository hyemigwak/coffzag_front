import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// 버튼 종류
// 로그인 / 회원가입
// 장바구니 / 구매하기
// 리뷰등록
// 중복체크

const useStyles = makeStyles({
  yellow: (props) => ({
    background: `linear-gradient(45deg, #ff9449 30%, #ffc149 90%)`,
    border: 0,
    borderRadius: 30,
    boxShadow: "0 2px 5px 2px rgba(255, 148, 73, .3)",
    color: "white",
    height: 42,
    padding: "0 30px",
    margin: props.margin,
    width: props.width,
  }),
  dark: (props) => ({
    background: `linear-gradient(45deg, #333131 30%, #5a5656 90%)`,
    border: 0,
    borderRadius: 30,
    boxShadow: "0 2px 5px 2px rgba(90, 86, 86, .2)",
    color: "white",
    height: 42,
    padding: "0 30px",
    margin: props.margin,
    width: props.width,
  }),
});

Hook.defaultProps = {
  children: null,
  _onClick: () => {},
};

export default function Hook(props) {
  const classes = useStyles(props);
  const { _onClick } = props;
  return (
    <Button
      onClick={_onClick}
      className={props.yellow ? classes.yellow : classes.dark}
    >
      {props.text}
    </Button>
  );
}
