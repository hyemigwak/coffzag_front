import React from "react";
import { Grid, Button, Line } from "../elements/";
import styled from "styled-components";
import LikeCard from "../components/LikeCard";

const Mypage = (props) => {
  const username = localStorage.getItem("user_name");

  return (
    <Grid width="100vmin">
      <Grid is_flex column>
        <h1>찜 리스트</h1>
        <Grid is_flex>
          <Grid textAlign="right" margin="0.5rem 0">
            <UserName>{username}</UserName>님 안녕하세요!
          </Grid>
        </Grid>
        <Line bottom />
        <LikeCardWrap>
          <LikeCard />
          <LikeCard />
          <LikeCard />
          <LikeCard />
          <LikeCard />
          <LikeCard />
          <LikeCard />
        </LikeCardWrap>
      </Grid>
    </Grid>
  );
};

const UserName = styled.span`
  font-weight: 800;
  font-size: 18px;
`;

const LikeCardWrap = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: flex-start;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export default Mypage;
