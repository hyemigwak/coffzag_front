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
    flex,
    margin,
    align,
    zIndex,
    back_center,
    hidden,
    size,
    opacity,
    position,
    column,
  } = props;

  const styles = {
    padding: padding,
    is_flex: is_flex,
    bg: bg ? bg : false,
    bgimg: bgimg ? bgimg : false,
    width: width,
    height: height,
    flex: flex,
    margin: margin,
    align: align,
    zIndex: zIndex,
    back_center: back_center,
    hidden: hidden,
    size: size,
    opacity: opacity,
    position: position,
    column: column,
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
  height: false,
  flex: false,
  margin: false,
  align: false,
  zIndex: false,
  back_center: false,
  hidden: false,
  opacity: false,
  position: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  background-image: ${(props) => `url(${props.bgimg})`};
  background-size: ${(props) => props.size};
  opacity: ${(props) => props.opacity};
  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  ${(props) => (props.back_center ? `background-position: center;` : "")}
  ${(props) => (props.hidden ? `overflow: hidden;` : "")}
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items: center; justify-content:flex-start; `
      : ""};
  ${(props) =>
    props.column ? `flex-direction: column;` : `flex-direction: row;`}
`;

const RootContainer = styled.div`
  position: relative;
  z-index: 0;
  background-color: transparent;
  color: black;
  min-height: 80vh;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  flex-wrap: wrap;
  display: flex;
`;

export default Grid;
