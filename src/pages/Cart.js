import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements/";
import { history } from "../redux/configureStore";

import CartProduct from "../components/CartProduct";

const Cart = (props) => {
  return (
    <Grid width="100vmin">
      <Grid is_flex column>
        <h1>장바구니</h1>
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </Grid>
      <Grid is_flex column margin="2rem 0">
        <Grid is_flex>
          <Grid textAlign="right">수량:</Grid>
          <Grid width="15%" textAlign="right">
            30 개
          </Grid>
        </Grid>
      </Grid>
      <Grid textAlign="right" margin="2rem 0">
        <Button
          text="쇼핑 더하기"
          margin="0 5px 0 0"
          _onClick={() => {
            history.push("/");
          }}
        />
        <Button yellow text="구매하기" margin="0 0 0 5px" />
      </Grid>
    </Grid>
  );
};

export default Cart;
