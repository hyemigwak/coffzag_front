import React from "react";
import { useDispatch } from "react-redux";
import {Button } from "../elements/";
import { history } from "../redux/configureStore";

import { actionCreators as paymentActions } from "../redux/modules/payment";

const PaymentButton = (props) => {
  const dispatch = useDispatch();

  const {
    DetailProduct,
    Cart,
    Payment,
    userPhone,
    userAddress,
    totalPrice,
    payMethod,
  } = props;

  const DetailtoGoPayment = () => {
    // 구현하지 않음
  };

  const GoPayment = () => {
    history.push("/payment");
  };

  //구매완료 버튼
  const PaymentSuccess = () => {
    if (
      window.confirm(
        `총 ${totalPrice
          .toString()
          .replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ","
          )}원을 ${payMethod} 하시겠습니까?`
      )
    ) {
      dispatch(
        paymentActions.addPaymentAPI(
          userPhone,
          userAddress,
          totalPrice,
          payMethod
        )
      );
      alert("결제가 완료되었습니다. 감사합니다.");
      history.push("/");
    } else return;
  };

  if (DetailProduct) {
    return (
      <Button
        yellow
        text="구매하기"
        margin="0 0 0 5px"
        _onClick={DetailtoGoPayment}
      />
    );
  }

  if (Cart) {
    return (
      <Button yellow text="구매하기" margin="0 0 0 5px" _onClick={GoPayment} />
    );
  }

  if (Payment) {
    return (
      <Button
        yellow
        text="결제하기"
        margin="0 0 0 5px"
        _onClick={PaymentSuccess}
      />
    );
  }
};

export default PaymentButton;
