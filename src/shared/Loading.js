import React from 'react'
import styled from "styled-components";
import spinner from "../images/spinner.gif";

const Loading = () => {
    return (
        <Loader>
            <Spinner><img src={spinner}/></Spinner>
            <LoadingText>조금만 기다려주세요!</LoadingText>
        </Loader>
    )
}

const Loader = styled.div`
    display: 100%;
    margin: 20% auto;
`;

const Spinner = styled.div`
`;


const LoadingText = styled.div`
    font-size: 30px;
`;


export default Loading;
