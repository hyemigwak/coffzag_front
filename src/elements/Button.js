import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    bg,
    text,
    size,
    radius,
    bgopacity,
    color,
    isHome,
    isPay,
    _onClick,
    children,
  } = props;

  const styles = {
    bg: bg,
    bgopacity: bgopacity,
    text: text,
    color: color,
    size: size,
    radius: radius,
  };

  if (isHome) {
    return (
      <Btn isHome onClick={_onClick}>
        {text ? text : children}
      </Btn>
    );
  }

  if (isPay) {
    return (
      <Btn isPay onClick={_onClick}>
        {text ? text : children}
      </Btn>
    );
  }

  return (
    <BtnCircle {...styles} onClick={_onClick}>
      {text ? text : children}
    </BtnCircle>
  );

  // 아래꺼에 onClick 넣으면 안된다.. 왜안되는지 모르겠음 ㅠㅠㅠㅠㅠㅠ (disabled 빼고도 안됨 ㅠ)
  // return <CircleBtn disabled onClick={_onClick} {...styles} >{text? text : children}</CircleBtn>;
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  isPlay: false,
  isInfo: false,
  bg: false,
  bgopacity: false,
  text: false,
  color: false,
};

const Btn = styled.button`
  z-index: 500;
  cursor: pointer;
  padding: 0.5em 1.6em;
  margin-right: 0.5em;
  font-size: 1.25vw;
  font-weight: 700;
  outline: 0px;
  border: none;
  border-radius: 4px;
  text-align: center;
  background-color: ${(props) => (props.bg ? props.bg : "")};
  span {
    vertical-align: 0.2em;
  }
  ${(props) =>
    props.isHome
      ? `
  background-color:#FFC149;
  :hover {
    background-color:#FFC149bf;
  }`
      : props.isPay
      ? `
color: #fff;
    background-color:#5A5656b3;
    :hover {
      background-color:#5A565666;

  }`
      : ""}
`;

const BtnCircle = styled.button`
  width: 4rem;
  height: 4rem;
  color: #fff;
  cursor: pointer;
  outline: 0px;
  font-size: 1rem;
  z-index: 15;
  position: absolute;
  right: 10%;
  bottom: 36%;
  background-color: ${(props) => (props.bg ? props.bg && props.bgopacity : "")};
  border-radius: ${(props) => (props.radius ? props.radius : "")};
  border: 0.5px solid #fff;
  outline: 0;
`;

export default Button;
