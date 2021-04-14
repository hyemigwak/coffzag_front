import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid, Button } from "../elements/";

import CartProduct from "../components/CartProduct";

const ProductList = (props) => {
  
  return (
    <>
      <Grid is_flex column>
        <h1>장바구니</h1>
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </Grid>
      <Buttons>
        <Button isPay text="쇼핑 더하기" />
        <Button isHome text="구매" />
      </Buttons>
    </>
  );
};

const Buttons = styled.div`
  margin: 3rem 0;
`;

export default ProductList;
