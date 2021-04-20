import React from 'react';
import { Grid, Button, Line } from "../elements/";
import styled from "styled-components";
import LikeCard from "../components/LikeCard";

const Mypage = (props) => {
    return (
        <Grid is_flex column>
            <Title>
                <div>찜 리스트</div>
            </Title>
            <Grid is_flex>
                <Grid textAlign="right" margin="1.5rem 0">
                    <UserName>username</UserName>님 안녕하세요!
                </Grid>
            </Grid>
            <Line bottom />
            <LikeCardWrap>
                <LikeCard/>
                <LikeCard/>
                <LikeCard/>
            </LikeCardWrap>
        </Grid>

    )
}


const Title = styled.div`
    font-size: 34px;
    font-weight: bold;
`;

const UserName = styled.span`
    font-weight: bold;
    color: #212121;
    font-size: 18px;
`;

const LikeCardWrap = styled.div`
    display:flex;
    flex-wrap: flex;
`;



export default Mypage;
