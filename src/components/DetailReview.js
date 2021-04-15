import React, { useState, useEffect, useCallback } from "react";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Button } from "../elements";
import Comment from "./Comment";
import { actionCreators as commentActions } from "../redux/modules/comment";
import moment from "moment";
import Loading from "../shared/Loading";

const DetailReview = (props) => {
  const { coffeeId } = props;

  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.comment.product_info);
  const commentList = useSelector((state) => state.comment.comment_list);

  const is_login = useSelector((state) => state.user.is_login);
  const createdAt = moment().format("YYYY-MM-DD hh:mm:ss");
  const [contents, setReview] = useState("");
  const onChangeReview = useCallback((e) => setReview(e.target.value), []);

  if (commentList[coffeeId]) {
    console.log(commentList[coffeeId][0]);
  }

  useEffect(() => {
    if (!commentList[coffeeId]) {
      dispatch(commentActions.getCommentAPI(coffeeId));
    }
  }, []);

  const siteAddComment = () => {
    if (!is_login) {
      if (window.confirm("로그인 창으로 이동합니다.")) {
        history.push("/login");
        return;
      } else {
        return;
      }
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
      <div className="reviewcount">
        리뷰 {commentList[coffeeId] ? commentList[coffeeId].length : 0}개
        (최신순)
      </div>
      <ReviewInput>
        {is_login ? (
          <>
            <input
              type="text"
              placeholder="리뷰를 작성해주세요!"
              value={contents}
              onChange={onChangeReview}
            />
            <Button yellow text="리뷰 등록" _onClick={siteAddComment} />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="로그인을 해야 등록 할 수 있습니다."
              value={contents}
              onChange={onChangeReview}
              disabled
            />
            <Button text="리뷰 등록" _onClick={siteAddComment} />
          </>
        )}
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
    :disabled {
      background-color: #d2d2d2;
      ::placeholder {
        color: #ffffff;
      }
    }
  }
  button {
    min-width: 15%;
  }
`;

export default DetailReview;
