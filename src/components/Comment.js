import React from "react";
import { Grid, Button, Line } from "../elements";
import styled from "styled-components";

const Comment = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid width="20%">
          <User>{props.username}</User>
        </Grid>
        <Grid>
          <Content>{props.contents}</Content>
        </Grid>
        <Grid width="30%" textAlign="right">
          <Date>{props.createdAt}</Date>
        </Grid>
      </Grid>
      <Line bottom margin="20px 0" />
    </React.Fragment>
  );
};

Comment.defaultProps = {
  contents: "좋네요",
  name: "경미니",
  insert_dt: "2021-04-14 10:00:00",
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