import React from "react";
import { Grid, Button, Line, Text, Badge } from "../elements/";
import styled from "styled-components";
import FavoriteIcon from "@material-ui/icons/Favorite";
import coffee from "../images/coffee.JPG";

const LikeCard = (props) => {
  return (
    <Card>
        <ImageBox>
            <ProductImg bgimg={coffee}>
            <Badge id="badge">nespresso</Badge>
            </ProductImg>
            <Grid textAlign="left" textAlign="center" width="50%" padding="40px 0px 0px 0px">
                <h3>네스프레소 콜롬비아</h3>
                <h4>은은한 향과 풍미가 아주 좋아요</h4>
                <h4><span>6,900</span>원</h4>
            </Grid>
            <FavoriteIcon className="heartIcon"/>
        </ImageBox>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  margin: 2rem 0.8rem;
  .heartIcon {
      color: #F6AFAF;
      width: 50px;
      height: 50px;
      cursor: pointer;
      margin: 0.5rem;

  }
`;

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  width: 12rem;
  height: 10rem;
  margin: 1.5rem;
  border-radius: 70%;
  border: 1px solid #eeeeee;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: block;
`;

const ImageBox = styled.div`
  display: flex;
  h3 {
    font-size: 20px;
    line-height: 120%;
    text-align:left;
  }
  h4 {
    font-size: 16px;
    line-height: 120%;
    font-weight: 500;
    text-align:left;
    span {
        font-weight: bold;
        size: 18px;
    }
    
  }
`;

export default LikeCard;
