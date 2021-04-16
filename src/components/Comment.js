import React from "react";
import { Grid, Button, Line } from "../elements";
import styled from "styled-components";

const Comment = (props) => {
  const { username, contents, createdAt } = props;

  const onlyDate = createdAt.split("T")[0];

  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid width="20%">
          <User>{username}</User>
        </Grid>
        <Grid>
          <Content>{contents}</Content>
        </Grid>
        <Grid width="30%" textAlign="right">
          <Date>{onlyDate}</Date>
        </Grid>
      </Grid>
      <Line bottom margin="20px 0" />
    </React.Fragment>
  );
};

Comment.defaultProps = {
  contents: "좋네요",
  name: "경미니",
  onlyDate: "2021-04-14",
};

const User = styled.div`
  font-weight: bold;
`;

const Content = styled.div`
  color: #5a5656;
  margin-left: 1.5rem;
  font-weight: bold;
`;

const Date = styled.div`
  color: #d2d2d2;
  font-size: 14px;
`;

export default Comment;
