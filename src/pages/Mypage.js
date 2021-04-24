import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Line } from "../elements/";
import styled from "styled-components";
import LikeCard from "../components/LikeCard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { actionCreators as likeActions } from "../redux/modules/like";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const username = localStorage.getItem("user_name");
  const likeList = useSelector((state) => state.like.like_list);

  // 찜리스트 GET
  useEffect(() => {
    dispatch(likeActions.getLikeAPI());
  }, [likeList]);

  //찜리스트가 비면 "찜리스트가 비었습니다" 보여주기 위해 분기
  if (likeList.length === 0) {
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
            <Card>
              <p>찜리스트를 추가해주세요</p>
              <FavoriteIcon className="heart" />
            </Card>
          </LikeCardWrap>
        </Grid>
      </Grid>
    );
  }
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
          {likeList.map((like, idx) => (
            <LikeCard {...like} idx={idx} />
          ))}
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

const Card = styled.div`
  width: 34rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 1rem;
  margin: 0.5rem;
  flex-grow: 1;
  p {
    font-size: 32px;
    font-weight: bold;
  }
  .heart {
    width: 38px;
    height: 38px;
    margin-right: 10px;
  }
`;

export default Mypage;
