import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Line, Text } from "../elements/";
import { history } from "../redux/configureStore";

import { PaymentProduct, PaymentButton } from "../components/";

import { actionCreators as paymentActions } from "../redux/modules/payment";
import { actionCreators as cartActions } from "../redux/modules/cart";

// 우편번호 찾기 API
import DaumPostcode from "react-daum-postcode";

const Payment = (props) => {
  const dispatch = useDispatch();
  console.log("구매하기 누를때 props있는지?", props);

  // 결제 페이지 불러오기
  useEffect(() => {
    dispatch(paymentActions.getPaymentUserAPI());
    dispatch(cartActions.getCartAPI());
  }, []);

  // user 가져오기 (사실 카트에 있긴 함)
  const _user = useSelector((state) => state.payment.user);
  // orderList 가져오기
  const _orderList = useSelector((state) => state.cart.cart_list);

  // 결제 수단
  const [payMethod, setPayMethod] = useState("_");

  // 핸드폰번호
  const [userPhone, setPhone] = useState("");
  const onChangePhone = useCallback((e) => setPhone(e.target.value), []);

  // 주소 검색 한 것 받음
  const [isZoneCode, setIsZoneCode] = useState();
  const [isAddress, setIsAddress] = useState();
  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열고 닫기

  // 상세주소
  const [isAddressPlus, setIsAddressPlus] = useState("");
  const onChangeAddressPlus = useCallback(
    (e) => setIsAddressPlus(e.target.value),
    []
  );
  // 총 금액 (int, return에서 string으로 변환)
  const totalPrice = _orderList
    .map((o) => o.orderCnt * o.coffee.coffeePrice)
    .reduce((acc, crr) => acc + crr, 0);

  // 우편번호 / 주소 찾기
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };

  // 정보 묶어서 PaymentButton 컴포넌트에 보냄
  const _payment_info = {
    userPhone,
    userAddress: `${isZoneCode} ${isAddress} ${isAddressPlus}`,
    totalPrice,
    payMethod,
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
                    value={_user.username}
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
                    value={_user.email}
                    // onChange={onChangePwd}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid is_flex margin="10px">
              <PaymentInfo>핸드폰 번호</PaymentInfo>
              <Grid is_flex column>
                <Grid is_flex>
                  <PaymentInput
                    type="text"
                    placeholder="010-0000-0000"
                    onChange={onChangePhone}
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
                    id="postcode"
                    value={isZoneCode}
                  />
                  <Button
                    text="주소 찾기"
                    margin="0 0 0 5px"
                    _onClick={() => {
                      setIsPostOpen(true);
                    }}
                  />
                </Grid>
                {isPostOpen && <DaumPostcode onComplete={handleComplete} />}
                <Grid is_flex margin="10px 0">
                  <PaymentInput
                    type="text"
                    placeholder="도로명 주소 또는 지번 주소"
                    value={isAddress}
                  />
                  <PaymentInput
                    type="text"
                    placeholder="상세 주소를 입력해주세요! (공란 가능)"
                    onChange={onChangeAddressPlus}
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
          {_orderList.map((o, idx) => (
            <PaymentProduct {...o} key={idx} />
          ))}
        </Grid>
        <h3>
          <br />
          결제정보&ensp;
          <span style={{ fontSize: "12px", fontWeight: "700" }}>
            *결제 수단을 선택하면 결제하실 수 있습니다.
          </span>
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
                {totalPrice
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                원
              </Text>
              을{" "}
              <Text Black size="22px">
                {payMethod}
              </Text>
              합니다.
            </Text>
          </Grid>
        </Grid>
        <Line bottom margin="20px 0" />

        <Grid textAlign="right">
          {payMethod !== "_" && <PaymentButton Payment {..._payment_info} />}
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
  margin-right: 12px;
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
