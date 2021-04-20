import React from 'react';
import { Grid, Button, Line, Text } from "../elements/";
import styled from "styled-components";
import LikeCard from "../components/LikeCard";

const Mypage = () => {
    return (
        <div>
            <Grid>
                좋아요 리스트
            </Grid>
            <Grid>
                <span>username</span> 님 안녕하세요
            </Grid>
            <LikeCard/>
        </div>
    )
}

export default Mypage;
