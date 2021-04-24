import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Button } from "../elements/";
import { useDispatch } from "react-redux";
import CloseIcon from '@material-ui/icons/Close';
import { actionCreators as commentActions } from "../redux/modules/comment";

//댓글 수정 모달창입니다.

const EditComment = (props) => {
  const { coffeeId, reviewId, open, close } = props;
  const dispatch = useDispatch();

  const [contents, setContents] = useState("");
  const onChangeContents = useCallback((e) => setContents(e.target.value), []);

  //수정하기 버튼 클릭시 실행되는 댓글 수정 함수입니다.
  //수정 api 디스패치 후, 모달창 닫고, 코멘트창 비워줍니다.
  const editCmt = () => {
    console.log(coffeeId, reviewId);
    if (window.confirm("댓글을 수정합니다.")) {
      dispatch(commentActions.editCommentAPI(coffeeId, reviewId, contents));
      close();
      setContents("");
    }
  };

  return (
    <>
      {open ? (
        <OutsideModal>
          <ModalBox>
            <InputBox>
              <EditBox
                type="text"
                placeholder="리뷰를 수정해주세요!"
                value={contents}
                onChange={onChangeContents}
              />
              <CloseIcon style={{cursor:"pointer"}} onClick={close}/>
            </InputBox>
            <Button yellow _onClick={editCmt} text="수정하기"></Button>
          </ModalBox>
        </OutsideModal>
      ) : null}
    </>
  );
};
const OutsideModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const ModalBox = styled.div`
  position: absolute;
  border-radius: 25px;
  top: calc(50vh - 100px);
  left: calc(50vw - 200px);
  background-color: rgba(255, 255, 255, 1);
  width: 30rem;
  height: 10rem;
  position: relative;
  z-index: 50;
  opacity: 1;
  text-align: center;
`;

const EditBox = styled.input`
  width: 70%;
  height: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  outline: none;
  margin: 1.8rem 1.5rem;
  padding: 0.3rem 0.8rem;
  :disabled {
    background-color: #d2d2d2;
    ::placeholder {
      color: #ffffff;
    }
`;

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default EditComment;
