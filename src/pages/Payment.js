import React from "react";
import styled from "styled-components";
import { Grid, Badge, Button, Line } from "../elements/";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import { CartProduct } from "../components/";

const Payment = (props) => {
  //payment 모듈 이후 삭제할 부분
  const username = "나이름";
  const email = "나이멜@네이버.컴";

  const _carts = useSelector((state) => state.cart.cart_list);

  return (
    <Grid is_flex column width="75%" padding="4%" text>
      <h1>구매하기</h1>
      <Grid>
        <h3>배송정보</h3>
        <Line bottom />
        <Grid textAlign="left">
          <Grid is_flex column>
            <Grid is_flex margin="10px">
              <PaymentInfo>주문자</PaymentInfo>
              <PaymentInput
                type="text"
                placeholder="받는 분의 성함을 입력해주세요!"
                value={username}
                // onChange={onChangeUsername}
              />
            </Grid>
            <Grid is_flex margin="10px">
              <PaymentInfo>이메일</PaymentInfo>
              <PaymentInput
                type="text"
                placeholder="받는 분의 이메일을 입력해주세요!"
                value={email}
                // onChange={onChangePwd}
              />
            </Grid>
            <Grid is_flex margin="10px">
              <PaymentInfo>주소</PaymentInfo>
              <PaymentInfo sub>우편번호</PaymentInfo>
              <PaymentInput
                type="text"
                placeholder="우편 번호"
                // onChange={onChangePwd}
              />
              <Button
                text="주소 찾기"
                width="30%"
                margin="0 0 0 5px"
                _onClick={() => {
                  // history.push("/");
                }}
              />
            </Grid>
            <Grid is_flex margin="10px">
              <PaymentInfo></PaymentInfo>
              <PaymentInfo sub>상세주소</PaymentInfo>
              <PaymentInput
                type="text"
                placeholder="상세 주소를 입력해주세요!"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <h3>
          <br />
          상품정보
        </h3>
        <Line bottom />
        <Grid textAlign="left">
          {_carts.map((_cart, idx) => (
            <CartProduct {..._cart} key={idx} />
          ))}
        </Grid>
        <h3>
          <br />
          결제정보
        </h3>
        <Line bottom margin="0 0 10px 0" />
        <Grid textAlign="left">
          <Button
            payment
            text="무통장입금"
            margin="0 0 0 5px"
            _onClick={() => {
              // history.push("/");
            }}
          />{" "}
          <Button
            payment
            active
            text="카드 결제"
            margin="0 0 0 5px"
            _onClick={() => {
              // history.push("/");
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Payment.defaultProps = {};

const PaymentInput = styled.input`
  width: 100%;
  height: 2.4rem;
  border: none;
  outline: none;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.1s ease-in-out;
  padding: 0 12px;
  ::placeholder {
    color: #a09c9c;
    font-size: 12px;
  }
  :focus {
    box-shadow: 0px 2px 10px rgba(255, 193, 73, 0.7);
  }
`;

const PaymentInfo = styled.span`
  ${(props) =>
    props.sub
      ? "width: 110px; padding: 0 0 0  30px;font-weight: 400;"
      : "width: 80px;font-weight: 600;"}
  font-size: 14px;
  text-align: left;
  color: #5a5656;
`;

const PaymentButton = styled.button`
  :hover {
    background-color: red;
  }
`;

export default Payment;
