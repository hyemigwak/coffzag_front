import React,{ useCallback, useState }  from 'react';
import styled from "styled-components";
import { Button } from "../elements/";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const EditComment = (props) => {

    const {open, close} = props;

    const [contents, setContents] = useState("");
    const onChangeContents = useCallback((e)=> setContents(e.target.value),[]);

    const editCmt = () => {
        window.alert("수정되었습니다!");
        close();
    }

    return (
        <>
            {open? (
                <OutsideModal>
                    <ModalBox>
                        <input type="text" placeholder="리뷰를 수정해주세요!" value={contents} onChange={onChangeContents}/>
                        <Button _onClick={editCmt}>수정완료</Button>
                        <Button _onClick={close}>X</Button>
                    </ModalBox>
                </OutsideModal>
            ) : null }
        </>
        
    )
}
const OutsideModal = styled.div`
    background-color: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
`;


const ModalBox = styled.div`
    position: absolute;
    top: calc(50vh - 100px);
    left: calc(50vw - 200px);
    background-color:rgba(255, 255, 255, 1);
    width: 30rem;
    height: 10rem;
    position: relatvie;
    z-index: 50;
    opacity:1;
    text-align: center;
`;


export default EditComment;
