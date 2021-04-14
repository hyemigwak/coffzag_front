import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    isRoot,
    children,
    padding,
    is_flex,
    __click,
    bg,
    bgimg,
    width,
    height,
    margin,
    align,
    zIndex,
    back_center,
    overflow,
    size,
    opacity,
    position,
    column,
    //추가
    textAlign,
    color,
    top,
    right,
    left,
    borderRadius,
  } = props;

  const styles = {
    padding: padding,
    is_flex: is_flex,
    bg: bg ? bg : false,
    bgimg: bgimg ? bgimg : false,
    width: width,
    height: height,
    margin: margin,
    align: align,
    zIndex: zIndex,
    back_center: back_center,
    overflow: overflow,
    size: size,
    opacity: opacity,
    position: position,
    column: column,
    //추가
    textAlign: textAlign,
    color: color,
    top: top,
    right: right,
    left: left,
    borderRadius: borderRadius,
  };

  if (isRoot) {
    return <RootContainer>{children}</RootContainer>;
  }

  if (__click) {
    return (
      <GridBox
        onClick={() => {
          __click();
        }}
        {...styles}
      >
        {children}
      </GridBox>
    );
  }
  return <GridBox {...styles}>{children}</GridBox>;
};

Grid.defaultProps = {
  isRoot: false,
  children: null,
  is_flex: false,
  __click: null,
  bg: false,
  bgimg: false,
  width: "100%",
  height: null,
  margin: false,
  align: false,
  zIndex: false,
  back_center: false,
  opacity: null,
  position: false,
  // 아래 추가
  textAlign: false,
  color: "#5A5656",
  top: false,
  right: false,
  left: false,
  borderRadius: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => (props.height ? props.height : "")};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  background-image: ${(props) => `url(${props.bgimg})`};
  background-size: ${(props) => props.size};
  opacity: ${(props) => (props.opacity ? props.opacity : "")};
  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  ${(props) => (props.back_center ? `background-position: center;` : "")}
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items: center; justify-content:flex-start; `
      : ""};
  ${(props) =>
    props.column ? `flex-direction: column;` : `flex-direction: row;`}
  text-align:${(props) => props.textAlign};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  border-radius: ${(props) => props.borderRadius};
  background-repeat: no-repeat;
`;

const RootContainer = styled.div`
  // header 가려지는것 방지
  padding-top: 70px;

  overflow-x: hidden;
  flex-wrap: wrap;
  display: flex;
  position: relative;
  z-index: 0;
  background-color: transparent;
  color: #5a5656;
  margin: 0;
  align-items: center;
  justify-content: center;
  padding: 4%;
`;

export default Grid;
