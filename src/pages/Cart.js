import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Line, Text } from "../elements/";
import { history } from "../redux/configureStore";

import CartProduct from "../components/CartProduct";
import { actionCreators as cartActions } from "../redux/modules/cart";

const Cart = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.getCartAPI());
  }, []);

  const _carts = useSelector((state) => state.cart.cart_list);
  console.log(_carts);

  // typedarray.reduce(callback[, initialValue])
  // acc: accumulator & crr: current
  // 가격 "," 정규 표현 바로 붙이기
  const totalCnt = _carts
    .map((_cart) => _cart.orderCnt)
    .reduce((acc, crr) => acc + crr, 0)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const totalPrice = _carts
    .map((_cart) => _cart.coffee.coffeePrice * _cart.orderCnt)
    .reduce((acc, crr) => acc + crr, 0)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Grid width="100vmin">
      <Grid is_flex column>
        <h1>장바구니</h1>
        <Grid is_flex>
          <Grid textAlign="center" margin="0.5rem 0">
            <Text Bold>상품명</Text>
          </Grid>
          <Grid width="30%" textAlign="center">
            <Text Bold>수량</Text>
          </Grid>
          <Grid width="30%" textAlign="center">
            <Text Bold>상품가격</Text>
          </Grid>
        </Grid>
        <Line bottom />
        {_carts.map((_cart, idx) => (
          <CartProduct {..._cart} key={idx} />
        ))}
      </Grid>
      <Grid is_flex column margin="2rem 0">
        <Grid is_flex>
          <Grid textAlign="right">총 수량:</Grid>
          <Grid width="15%" textAlign="right">
            {totalCnt} 개
          </Grid>
        </Grid>
        <Grid is_flex>
          <Grid textAlign="right">결제 금액:</Grid>
          <Grid width="15%" textAlign="right">
            {totalPrice} 원
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
