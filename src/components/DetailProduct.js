import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Button, Badge } from "../elements";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { PaymentButton } from "../components/";
import { actionCreators as cartActions } from "../redux/modules/cart";
import { actionCreators as productActions } from "../redux/modules/product";

const DetailProduct = (props) => {
  const dispatch = useDispatch();
  const cookie = getCookie("user_login") ? true : false;
  const is_login = useSelector((state) => state.user.is_login);
  const _product = useSelector((state) => state.product.product);

  useEffect(() => {
    if (!_product) {
      dispatch(productActions.setOneProductAPI(coffeeId));
    }
  }, [_product]);

  const { coffeeName, coffeePrice, coffeeImg, coffeeBrand, coffeeUnit, coffeeInfo, coffeeId } = props;

  console.log(props);

  const [orderCnt, setOrderCnt] = useState(1);
  const cntPlus = () => {
    setOrderCnt(orderCnt + 1);
  };
  const cntMinus = () => {
    if (orderCnt > 1) {
      setOrderCnt(orderCnt - 1);
    }
  };

  const siteaddCart = () => {
    if (!is_login && !cookie) {
      if (window.confirm("로그인 후 이용해주세요!")) {
        history.push("/login");
      }
      return;
    }
    dispatch(cartActions.addCartAPI(coffeeId, orderCnt, coffeePrice, coffeeName, coffeeImg, coffeeBrand, coffeeUnit));
    if (window.confirm("장바구니로 이동하시겠습니까?")) {
      history.push("/cart");
    } else {
      return;
    }
  };

  //가격에 콤마 붙여주는 정규식 표현
  const coffee_price = (_product.coffeePrice || coffeePrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  // 정보 묶어서 PaymentButton 컴포넌트에 보냄
  const buy_oneproduct_info = {
    coffeeBrand,
    coffeeName,
    coffee_price,
    coffeeUnit,
    coffeeInfo,
    orderCnt,
  };

  return (
    <Grid margin="0 auto">
      <Container>
        <Contents>
          <CardRight>
            <CircleImage>
              <img src={coffeeImg} alt="커피이미지" />
            </CircleImage>
          </CardRight>
          <CardLeft>
            <BrandNameArea>
              <div className="Btn">
                <Badge>{coffeeBrand}</Badge>
              </div>
            </BrandNameArea>
            <ProductName>
              <div className="Pname">{coffeeName}</div>
            </ProductName>
            <PriceLine>
              <div className="Pprice">{coffee_price} 원</div>
              <div className="capsulePack">{coffeeUnit}</div>
            </PriceLine>
            <DetailLine>
              <p>{coffeeInfo}</p>
            </DetailLine>
            <QtyLine>
              <div className="plusminusBtn">
                <RemoveCircleOutlineIcon onClick={cntMinus} />
                &ensp;{orderCnt}개&ensp;
                <AddCircleOutlineIcon onClick={cntPlus} style={{ marginRight: "0.4rem" }} />
              </div>
            </QtyLine>
            <BtnLine>
              <Button _onClick={siteaddCart} text="장바구니" margin="0 10px 0 0" />
              <PaymentButton DetailProduct {...buy_oneproduct_info} />
            </BtnLine>
          </CardLeft>
        </Contents>
      </Container>
    </Grid>
  );
};

DetailProduct.defaultProps = {
  coffeeImg: false,
  coffeeBrand: "CoffeeBrand",
  coffeeName: "Coffee",
  coffeePrice: "",
  coffeeUnit: "1슬리브(10캡슐)",
  coffeeInfo: "",
};

const Container = styled.div`
  width: 800px;
  padding: 1rem 1rem;
  margin: 5% auto;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
  color: #5a5656;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const CardRight = styled.div`
  width: 23rem;
`;

const CircleImage = styled.div`
  display: inline-flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 70%;
  overflow: hidden;
  width: 20rem;
  height: 20rem;
  box-shadow: 0 0 10px #0000001a;
  img {
    max-width: 100%;
    margin: auto;
    object-fit: contain;
  }
`;

const CardLeft = styled.div`
  width: 25rem;
  margin-left: 3rem;
`;

const ProductName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  padding: 1rem 0rem;
  border-bottom: 1px solid #9a9292;
  margin-bottom: 0.6rem;

  .Pname {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const BrandNameArea = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PriceLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0.5rem;
  .Pprice {
    font-size: 2rem;
    font-weight: 600;
  }
  div::before {
    content: "";
    width: 1px;
    height: 5px;
    border-right: 1px solid #aba8a8;
    margin: 0px 1.5rem;
  }
  div:first-child::before {
    content: none;
  }
`;

const DetailLine = styled.div`
  color: #5a5656;
  font-size: 1rem;
  padding: 0.5rem 0;
  margin: 1rem 0.5rem;
  display: flex;
  justify-content: flex-start;
  p {
    display: flex;
    text-align: start;
  }
`;

const QtyLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.2rem;
  margin: 1rem;
  span {
    font-weight: bold;
  }
  .plusminusBtn {
    cursor: pointer;
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
`;

const BtnLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  margin: 1rem 0;
`;

export default DetailProduct;
