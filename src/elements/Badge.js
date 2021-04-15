import React from "react";
import styled from "styled-components";

const Badge = (props) => {
  const { bg, text, _onClick, children } = props;

  console.log(children);

  if (children === "illy") {
    return (
      <BrandBadge bg="#d12420" onClick={_onClick}>
        {children}
      </BrandBadge>
    );
  }
  if (children === "nespresso") {
    return (
      <BrandBadge bg="#bd6416" onClick={_onClick}>
        {children}
      </BrandBadge>
    );
  }

  if (children === "starbucks") {
    return (
      <BrandBadge bg="#006241" onClick={_onClick}>
        {children}
      </BrandBadge>
    );
  }
  return (
    <BrandBadge {...props} onClick={_onClick}>
      {children}
    </BrandBadge>
  );
};

Badge.defaultProps = {
  bg: "#5a5656",
  text: false,
  children: null,
  _onClick: () => {},
};

const BrandBadge = styled.div`
  display: inline-block;
  margin: 1vmin 1vmin auto auto;
  padding: 5px 10px;
  border-radius: 15px;
  border: 10px;
  background-color: ${(props) => props.bg};
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 0 2px #0000004d;
`;

export default Badge;
