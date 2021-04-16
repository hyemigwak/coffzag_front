import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// # 만들어야하는 버튼 종류
// 로그인 / 회원가입 / 장바구니 / 구매하기 / 리뷰등록

// # 버튼 element 구성 순서
// 1. import Button from @material-ui
// 2. material-ui 버튼 커스텀 스타일 참조 (makeStyles)
// 3. JS에서 태그 style = {{ color : "red" }} 와 같은 문법이 아래 형식에 동일하게 적용
// 4. element로 버튼을 넘겨줄 경우 onClick 기능을 따로 지정해야 한다. () => {}
// 5. react hooks 에서는 if문의 분기 처리가 안된다고 오류가 뜨는데 *** 이 부분 공부해보기

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
      {props.text ? props.text : props.children}
    </Button>
  );
}
