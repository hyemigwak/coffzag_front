import React, { useState, useEffect, useCallback } from "react";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import Comment from "./Comment";
import { actionCreators as commentActions } from "../redux/modules/comment";
import moment from "moment";

const DetailReview = (props) => {
  const { coffeeId } = props;
  // console.log(coffeeId);

  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.comment.product_info);
  const commentList = useSelector((state) => state.comment.comment_list);

  const user = useSelector((state) => state.user.user);
  // console.log(user);
  const is_login = useSelector((state) => state.user.is_login);
  // const Cookie = getCookie("user_login");
  const createdAt = moment().format("YYYY-MM-DD hh:mm:ss");
  const [contents, setReview] = useState("");
  const onChangeReview = useCallback((e) => setReview(e.target.value), []);

  useEffect(() => {
    if (!commentList[coffeeId]) {
      dispatch(commentActions.getCommentAPI(coffeeId));
    }
  }, []);

  // 로딩 되기전에 commentList[coffeeId]를 불러오기 때문에 undefined가 뜬다.

  const is_loading = useSelector((state) => state.product.is_loading);

  // comment가 달린 coffeeId 지정
  // const commentProductId =
  //   commentList[coffeeId] != null ? commentList[coffeeId][0].coffeeId : "";

  // console.log("commentProductId가 뭐지?", commentProductId);
  // console.log("commentList[coffeeId]가 뭐지?", commentList[coffeeId]);

  // if (Object.keys(commentList[coffeeId]))
  // console.log("commentProductId가 뭐지?", Object.keys(commentList[coffeeId]));
  // 오브젝트 길이 구하기
  // null 또는 undefined가 뜨기 때문에 null이 아닌 경우 세어주는걸로 조건을 걸어야 할 듯
  // console.log(Object.keys(commentList[coffeeId]).length);
  // console.log(productInfo);
  // console.log(productInfo[coffeeId]);
  // console.log(commentList[coffeeId]);

  const siteAddComment = () => {
    if (!is_login) {
      window.alert("로그인해주세요!");
      history.push("/login");
      return;
    }
    if (contents === "") {
      window.alert("리뷰를 입력해주세요!");
      return;
    }
    dispatch(commentActions.addCommentAPI(coffeeId, contents, createdAt));
    setReview("");
  };

  return (
    <ReviewContainer>
      <div className="reviewcount">리뷰 0개 (최신순)</div>
      <ReviewInput>
        <input
          type="text"
          placeholder="리뷰를 작성해주세요!"
          value={contents}
          onChange={onChangeReview}
        />
        <Button yellow text="리뷰 등록" _onClick={siteAddComment} />
      </ReviewInput>
      <Grid width="95%" margin="0 auto">
        {commentList[coffeeId]?.map((c, idx) => {
          const commentProductId = commentList[coffeeId][0].coffeeId;
          if (coffeeId === commentProductId) {
            console.log("commentProductId :", commentProductId);
            return <Comment key={idx} {...c} />;
          }
        })}
      </Grid>
    </ReviewContainer>
  );
};

DetailReview.defaultProps = {
  username: "kale",
  contents: "맛있어요",
  createdAt: "2021-04-13 18:39:12",
};

const ReviewContainer = styled.div`
  width: 800px;
  margin: 5% auto;
  .reviewcount {
    font-size: 0.8rem;
    color: #5a5656;
    margin-left: 1.5rem;
    font-weight: bold;
  }
`;

const ReviewInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1rem auto;
  input {
    width: 100%;
    height: 2rem;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border: none;
    outline: none;
    margin: 1rem 1rem;
    padding: 0.3rem 0.8rem;
  }
  button {
    min-width: 15%;
  }
`;

export default DetailReview;
