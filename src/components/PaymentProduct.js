import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Badge } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as cartActions } from "../redux/modules/cart";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const PaymentProduct = (props) => {
  const dispatch = useDispatch();
  const {
    coffee: {
      coffeeId,
      coffeeBrand,
      coffeeName,
      coffeePrice,
      coffeeImg,
      coffeeUnit,
    },
    orderCnt,
  } = props;

  const siteDeleteCart = () => {
    dispatch(cartActions.deleteCartAPI(coffeeId));
  };

  // 판매 단위 정규 표현식
  const unitPrice = orderCnt * coffeePrice;

  // 수량 체크
  const [_orderCnt, setOrderCnt] = useState(orderCnt);

  // 수량 * 가격 체크
  const [_unitPrice, setUnitPrice] = useState(unitPrice);

  const cntPlus = () => {
    console.log(_orderCnt);
    console.log(_unitPrice);
    setOrderCnt(_orderCnt + 1);
    setUnitPrice(_unitPrice + coffeePrice);
    dispatch(cartActions.updateCartAPI(coffeeId, _orderCnt, _unitPrice));
  };

  const cntMinus = () => {
    if (_orderCnt > 1) {
      setOrderCnt(_orderCnt - 1);
      setUnitPrice(_unitPrice - coffeePrice);
      dispatch(cartActions.updateCartAPI(coffeeId, _orderCnt, _unitPrice));
    }
  };

  return (
    <Container>
      <Grid is_flex>
        <Grid is_flex>
          <ProductImg bgimg={coffeeImg}></ProductImg>
          <Grid textAlign="left" padding="10px">
            <h3>
              {coffeeName}
              <Badge scale="0.9">{coffeeBrand}</Badge>
            </h3>
            <h4>
              {coffeePrice
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              원 <span>{coffeeUnit}</span>
            </h4>
          </Grid>
        </Grid>

        <Grid width="30%" textAlign="center">
          <span style={{ fontWeight: "700" }}>
            {orderCnt
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </Grid>

        <Grid width="30%" textAlign="center">
          <span style={{ fontWeight: "700" }}>
            {unitPrice
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
            원
          </span>
        </Grid>
      </Grid>
    </Container>
  );
};

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  width: 6rem;
  height: 5rem;
  margin: 0.5rem;
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  text-align: right;
  display: block;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
  padding: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
  color: #5a5656;
  h3 {
    font-size: 18px;
    line-height: 60%;
  }
  h4 {
    font-size: 14px;
    line-height: 30%;
    font-weight: 500;
    span::before {
      content: "";
      border-right: 1px solid #d2d2d2;
      margin: 0px 1rem;
    }
    :first-child::before {
      content: none;
    }
  }
`;

export default PaymentProduct;
