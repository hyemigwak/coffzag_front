import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Line, Text } from "../elements/";
import { PaymentButton, CartProduct } from "../components/";
import { history } from "../redux/configureStore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { actionCreators as cartActions } from "../redux/modules/cart";




const Cart = (props) => {
  const dispatch = useDispatch();

  //장바구니 리스트 불러오기
  useEffect(() => {
    dispatch(cartActions.getCartAPI());
  }, []);

  const _carts = useSelector((state) => state.cart.cart_list);

  // typedarray.reduce(callback[, initialValue])
  // acc: accumulator & crr: current
  // 가격 "," 정규 표현 바로 붙이기

  //장바구니 총 갯수 누산하기, 정규표현식
  const totalCnt = _carts
    .map((_cart) => _cart.orderCnt)
    .reduce((acc, crr) => acc + crr, 0)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  //장바구니 총 가격 누산하기, 정규표현식
  const totalPrice = _carts
    .map((_cart) => _cart.coffee.coffeePrice * _cart.orderCnt)
    .reduce((acc, crr) => acc + crr, 0)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  //장바구니에 상품이 없으면 비었다는 문구 보여줄 수 있도록 분기
  if (_carts.length === 0) {
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
            <Grid width="7%"> </Grid>
          </Grid>
          <Line bottom />
          <Card>
            <AddShoppingCartIcon className="cartIcon" />
            <p>장바구니가 텅 비었어요!</p>
          </Card>
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
          <Button
            yellow
            text="구매하기"
            margin="0 0 0 5px"
            _onClick={() => {
              history.push("/payment");
            }}
          />
        </Grid>
      </Grid>
    );
  }
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
          <Grid width="7%"> </Grid>
        </Grid>
        <Line bottom />
        {_carts.map((_cart, idx) => (
          <CartProduct {..._cart} key={idx} />
        ))}
      </Grid>
      <Grid is_flex>
        <Grid>
          {_carts.length !== 0 && (
            <DeleteWrap
              onClick={() => {
                dispatch(cartActions.buyCartAPI());
                window.alert("모두 삭제하였습니다.");
              }}
            >
              <HighlightOffIcon className="Minus" />
              &ensp;모두삭제
            </DeleteWrap>
          )}
        </Grid>
        <Grid is_flex column margin="2rem 0">
          <Grid is_flex>
            <Grid textAlign="right">총 수량:</Grid>
            <Grid width="30%" textAlign="right">
              {totalCnt} 개
            </Grid>
          </Grid>
          <Grid is_flex>
            <Grid textAlign="right">결제 금액:</Grid>
            <Grid width="30%" textAlign="right">
              {totalPrice} 원
            </Grid>
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
        <PaymentButton Cart />
      </Grid>
    </Grid>
  );
};

const Card = styled.div`
  width: 35rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 1rem;
  margin: 0.5rem;
  flex-grow: 1;
  p {
    font-size: 34px;
    font-weight: bold;
  }
  .cartIcon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`;
const DeleteWrap = styled.span`
  cursor: pointer;
  svg.Minus {
    color: #d2d2d2;
    vertical-align: -6px;
    transition: color 0.3s ease-in-out;
  }
  :hover {
    svg.Minus {
      color: #5a5656;
    }
  }
`;

export default Cart;
