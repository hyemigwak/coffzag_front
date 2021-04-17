import React, { useState, useEffect } from "react";
import { Grid, Button, Line } from "../elements";
import EditComment from "./EditComment";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { history } from "../redux/configureStore";

const Comment = (props) => {
  const { reviewId , contents, _createdAt, coffeeId, username, createdAt, modifiedAt } = props;
  const commentList = useSelector((state) => state.comment.comment_list);
  const dispatch = useDispatch();
 

  //모달 설정 부분
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "unset";
  };


  //댓글 삭제 부분
  const delCmt = () => {
    if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
      dispatch(commentActions.deleteCommentAPI(coffeeId,reviewId));

    }
  };

 
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
          <Date>{createdAt.split("T")[0] || _createdAt || modifiedAt}</Date>
        </Grid>
        <Grid width="20%" textAlign="right">
          <DeleteIcon onClick={delCmt} />
          <EditIcon onClick={openModal} />
          <EditComment open={modalOpen} close={closeModal} coffeeId={coffeeId} reviewId={reviewId} />
        </Grid>
      </Grid>
      <Line bottom margin="20px 0" />
    </React.Fragment>
  );
};

// Comment.defaultProps = {
//   contents: "좋네요",
//   username: "경미니",
//   _createdAt: "2021-04-14",
// };

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
