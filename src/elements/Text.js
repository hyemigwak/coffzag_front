import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { size, weight, color, Bold, Black } = props;

  if (Bold) {
    return <TextA {...props} size="16px" weight="600" />;
  }

  if (Black) {
    return <TextB {...props} weight="900" />;
  }

  return <TextB {...props} />;
};

Text.defaultProps = {
  size: "14px",
  weight: "400",
  color: "#5a5656",
};

const TextA = styled.div`
  font-size: ${(props) => (props.size ? props.size : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  color: ${(props) => (props.weight ? props.weight : "")};
`;
const TextB = styled.span`
  font-size: ${(props) => (props.size ? props.size : "")};
  font-weight: ${(props) => (props.weight ? props.weight : "")};
  color: ${(props) => (props.weight ? props.weight : "")};
`;

export default Text;
