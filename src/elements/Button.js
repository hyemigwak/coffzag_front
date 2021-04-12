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
    isPlay,
    isInfo,
    isLogout,
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

  if (isPlay) {
    return (
      <Btn isPlay="isPlay" onClick={_onClick}>
        {text ? text : children}
      </Btn>
    );
  }

  if (isInfo) {
    return (
      <Btn isInfo="isInfo" onClick={_onClick}>
        {text ? text : children}
      </Btn>
    );
  }

  if (isLogout) {
    return (
      <LogoutBtn isLogout="isLogout" onClick={_onClick}>
        {text ? text : children}
      </LogoutBtn>
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
    props.isPlay
      ? `
  background-color:#ffffff;
  :hover {
    background-color:#ffffffbf;
  }`
      : props.isInfo
      ? `
color: #fff;
    background-color:#6d6d6eb3;
    :hover {
      background-color:#6d6d6e66;

  }`
      : ""}
`;

const LogoutBtn = styled.button`
  display: none;
  border: none;
  padding: 4px;
  margin: 0px 12px;
  font-size: 0.9rem;
  outline: 0px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: #6d6d6eb3;
  &:hover {
    background-color: #6d6d6e66;
  }
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
