import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/";

const CartProduct = (props) => {
  const { coffee_name, coffee_price, coffee_image, coffee_cnt } = props;
  return (
    <Grid is_flex column>
      <Grid is_flex>
        <ProductLine is_flex>
          <ProductImg bgimg={coffee_image} />
          <Grid textAlign="left" padding="10px">
            <h3>{coffee_name}</h3>
            {coffee_price}원/1슬리브(10캡슐)
          </Grid>
        </ProductLine>
        <Grid width="15%" textAlign="right">
          {coffee_cnt} sleeves
        </Grid>
      </Grid>
      <Line />
    </Grid>
  );
};

CartProduct.defaultProps = {
  coffee_name: "더블 에스프레소 스쿠로",
  coffee_price: 12000,
  coffee_image:
    "https://www.nespresso.com/shared_res/agility/enhancedPDP/vertuo/images/Vertuo_Double-espresso-Scuro_resp.jpg",
  coffee_cnt: 3,
};

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  width: 7rem;
  height: 7rem;
  background-size: cover;
  background-position: center;
  text-align: right;
  display: block;
`;

const Line = styled.div`
  border-top: 0.5px solid #d2d2d2;
  width: 100%;
  height: 1px;
`;
const ProductLine = styled.div`
  display: flex;
  width: 100%;
`;

export default CartProduct;
