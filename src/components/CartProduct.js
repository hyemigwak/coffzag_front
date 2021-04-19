import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Badge } from "../elements/";

import { useDispatch } from "react-redux";
import { actionCreators as cartActions } from "../redux/modules/cart";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const CartProduct = (props) => {
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
    setOrderCnt(_orderCnt + 1);
    setUnitPrice(_unitPrice + coffeePrice);
  };

  const cntMinus = () => {
    if (_orderCnt > 1) {
      setOrderCnt(_orderCnt - 1);
      setUnitPrice(_unitPrice - coffeePrice);
    }
  };

  return (
    <Container>
      <Grid is_flex>
        <Grid is_flex>
          <ProductImg bgimg={coffeeImg}>
            <Badge scale="0.9">{coffeeBrand}</Badge>
          </ProductImg>
          <Grid textAlign="left" padding="10px">
            <h3>{coffeeName}</h3>
            <h4>
              {coffeePrice
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              원 <span>{coffeeUnit}</span>
            </h4>
          </Grid>
          <Grid width="10%">
            <HighlightOffIcon className="Minus" onClick={siteDeleteCart} />
          </Grid>
        </Grid>

        <Grid width="30%" textAlign="center">
          <AddCircleOutlineIcon
            onClick={cntPlus}
            style={{ marginRight: "0.4rem" }}
          />
          <span>
            {_orderCnt
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <RemoveCircleOutlineIcon
            onClick={cntMinus}
            style={{ marginLeft: "0.4rem" }}
          />
        </Grid>

        <Grid width="30%" textAlign="right">
          <span>
            {_unitPrice
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
            원&ensp;&ensp;
          </span>
        </Grid>
      </Grid>
    </Container>
  );
};

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  width: 12rem;
  height: 8rem;
  margin: 0.5rem;
  background-size: cover;
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
  margin: 0.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
  color: #5a5656;
  h3 {
    font-size: 18px;
    line-height: 60%;
  }
  h4 {
    font-size: 14px;
    line-height: 60%;
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
  svg {
    cursor: pointer;
    color: #5a5656;
    vertical-align: -6px;
    transform: scale(0.8);
    .disabled {
      color: #d2d2d2;
    }
  }
  svg.Minus {
    cursor: pointer;
    color: #d2d2d2;
    vertical-align: -6px;
    transition: color 0.3s ease-in-out;
    :hover {
      color: #5a5656;
    }
  }
`;

export default CartProduct;
