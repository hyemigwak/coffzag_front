import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Line, Text } from "../elements/";
import { history } from "../redux/configureStore";

import { PaymentProduct } from "../components/";

import { actionCreators as paymentActions } from "../redux/modules/payment";

const Payment = (props) => {
  const dispatch = useDispatch();

  // 결제 페이지 불러오기
  useEffect(() => {
    dispatch(paymentActions.setPaymentAPI());
  }, []);

  // payment_info 가져오기
  const _payment = useSelector((state) => state.payment.payment_info);

  //payment 모듈 이후 삭제할 부분
  const username = "나이름";
  const email = "나이멜@네이버.컴";
  const totalPrice = "!총 금액!";

  //결제 상태 변경
  const [paymentMethod, setPayMethod] = useState("__");

  //구매완료 버튼? 페이지 만들기 전에 빠르게 확인용으로!
  const PaymentSuccess = () => {
    if (window.confirm("구매가 완료되었습니다! 감사합니다!")) {
      return history.push("/");
    }
  };

  return (
    <Grid is_flex column width="75%">
      <h1>구매하기</h1>
      <Grid>
        <h3>배송정보</h3>
        <Line bottom margin="0 0 20px 0" />
        <Grid textAlign="left">
          <Grid is_flex column>
            <Grid is_flex margin="10px">
              <PaymentInfo>주문자</PaymentInfo>
              <Grid is_flex column>
                <Grid is_flex>
                  <PaymentInput
                    type="text"
                    placeholder="받는 분의 성함을 입력해주세요!"
                    value={username}
                    // onChange={onChangeUsername}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid is_flex margin="10px">
              <PaymentInfo>이메일</PaymentInfo>
              <Grid is_flex column>
                <Grid is_flex>
                  <PaymentInput
                    type="text"
                    placeholder="받는 분의 이메일을 입력해주세요!"
                    value={email}
                    // onChange={onChangePwd}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid is_flex margin="10px">
              <PaymentInfo>주소</PaymentInfo>
              <Grid is_flex column>
                <Grid is_flex>
                  <PaymentInput
                    type="text"
                    placeholder="우편 번호"
                    // onChange={onChangePwd}
                  />
                  <Button
                    text="주소 찾기"
                    margin="0 0 0 5px"
                    _onClick={() => {
                      // history.push("/");
                    }}
                  />
                </Grid>
                <Grid is_flex margin="10px 0">
                  <PaymentInput
                    type="text"
                    placeholder="상세 주소를 입력해주세요!"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <h3>
          <br />
          상품정보
        </h3>
        <Line bottom margin="0 0 10px 0" />
        <Grid is_flex>
          <Grid textAlign="center">
            <Text Bold>상품명</Text>
          </Grid>
          <Grid width="30%" textAlign="center">
            <Text Bold>수량</Text>
          </Grid>
          <Grid width="30%" textAlign="center">
            <Text Bold>상품가격</Text>
          </Grid>
        </Grid>

        <Grid textAlign="left">
          {/* {_payment.map((p, idx) => (
            <PaymentProduct {...p} key={idx} />
          ))} */}
        </Grid>
        <h3>
          <br />
          결제정보
        </h3>
        <Line bottom margin="0 0 20px 0" />
        <Grid is_flex>
          <Grid textAlign="left">
            <Button
              payment
              text="무통장입금"
              margin="0 0 0 5px"
              _onClick={() => {
                setPayMethod("무통장입금");
              }}
            />{" "}
            <Button
              payment
              active
              text="카드결제"
              margin="0 0 0 5px"
              _onClick={() => {
                setPayMethod("카드결제");
              }}
            />
          </Grid>
          <Grid textAlign="right">
            <Text size="22px">
              총{" "}
              <Text Black size="22px">
                {totalPrice}원
              </Text>
              을{" "}
              <Text Black size="22px">
                {paymentMethod}
              </Text>
              합니다.
            </Text>
          </Grid>
        </Grid>
        <Line bottom margin="20px 0" />

        <Grid textAlign="right">
          <Button
            yellow
            text="구매하기"
            margin="0 0 0 5px"
            _onClick={PaymentSuccess}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

Payment.defaultProps = {};

const PaymentInput = styled.input`
  width: 20em;
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
    props.sub ? " font-weight: 400; " : "width: 10%;font-weight: 600;"}
  font-size: 14px;
  text-align: left;
  color: #5a5656;
`;

export default Payment;
