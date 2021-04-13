import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/";

const CartProduct = (props) => {
  const { coffee_name, coffee_price, coffee_image, coffee_cnt } = props;
  return (
    <Grid is_flex column width="60%">
      <Grid is_flex>
        <Grid is_flex margin="2px 2%">
          <ProductImg bgimg={coffee_image} />
        </Grid>
        <Grid textAlign="left" width="150%">
          <h3>{coffee_name}</h3>
          {coffee_price}원/1슬리브(10캡슐)
        </Grid>
        <Grid></Grid>
        <Grid textAlign="right">{coffee_cnt} sleeves</Grid>
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
  width: 10rem;
  height: 10rem;
  background-size: cover;
  background-position: center;
  text-align: right;
`;

const Line = styled.div`
  border-top: 0.5px solid #d2d2d2;
  width: 100%;
  height: 1px;
`;

export default CartProduct;
