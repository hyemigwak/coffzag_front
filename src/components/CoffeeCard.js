import React from "react";
import { Grid, Button, Line, Text, Badge } from "../elements/";
import styled from "styled-components";

const CoffeeCard = (props) => {
    const { coffeeImg, coffeeName, coffeePrice, orderCnt, productList, idx } = props;
    console.log(props);
    console.log(idx);
    console.log(productList);
    

  return (
    <div>
      <Grid is_flex>
        <ProductImg bgimg={productList[idx].coffeeImg}></ProductImg>
        <Grid marginLeft="1rem">
          <div className="title">{productList[idx].coffeeName}</div>
          <div>
            <span>{productList[idx].coffeePrice}원</span> / {productList[idx].orderCnt}개
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
  margin: 1rem 2rem;
  width: 10rem;
  height: 7rem;
  border-radius: 70px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: left;
`;
export default CoffeeCard;
