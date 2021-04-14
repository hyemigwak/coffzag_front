import React, { useEffect } from "react";
import styled from "styled-components";
import { actionCreators as productActions } from "../redux/modules/product";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Input, Button } from "../elements";

import StarRoundedIcon from "@material-ui/icons/StarRounded";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import StarHalfRoundedIcon from "@material-ui/icons/StarHalfRounded";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const DetailProduct = (props) => {
  const {
    coffeeName,
    coffeePrice,
    coffeeImg,
    coffeeBrand,
    coffeeUnit,
    coffeeInfo,
  } = props;

  //가격에 콤마 붙여주는 정규식 표현
  const coffee_price = coffeePrice
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div style={{ margin: "0 auto" }}>
      <Container>
        <CurrentBuy>
          <span>50</span>명 구매 완료!
        </CurrentBuy>
        <Contents>
          <CardRight>
            <CircleImage>
              <img src={coffeeImg} alt="커피이미지" />
            </CircleImage>
            <StarArea>
              <div className="starRank">
                <StarRoundedIcon style={{ color: "#FFC149" }} />
                <StarRoundedIcon style={{ color: "#FFC149" }} />
                <StarHalfRoundedIcon style={{ color: "#FFC149" }} />
                <StarOutlineRoundedIcon style={{ color: "#FFC149" }} />
                <StarOutlineRoundedIcon style={{ color: "#FFC149" }} />
              </div>
              <div className="startNum">
                <span>2.5</span> 점
              </div>
            </StarArea>
          </CardRight>
          <CardLeft>
            <BrandNameArea>
              <div className="Btn">
                <CoffeeBrandBtn>{coffeeBrand}</CoffeeBrandBtn>
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
              <div>
                <span>개수</span>: 1개
              </div>
              <div className="plusminusBtn">
                <AddCircleOutlineIcon style={{ marginRight: "0.4rem" }} />
                <RemoveCircleOutlineIcon />
              </div>
            </QtyLine>
            <BtnLine>
              <Button text="장바구니" margin="0 10px 0 0" />
              <Button yellow text="구매하기" />
            </BtnLine>
          </CardLeft>
        </Contents>
      </Container>
    </div>
  );
};

DetailProduct.defaultProps = {
  coffeeImg:
    "https://www.nespresso.com/shared_res/agility/enhancedPDP/vertuo/images/Vertuo_Double-espresso-Scuro_resp.jpg",
  coffeeBrand: "Nespresso",
  coffeeName: "네스프레소",
  coffeePrice: "7,900",
  coffeeUnit: "1슬리브(10캡슐)",
  coffeeInfo: "향이 풍부한 커피입니다.",
};

const Container = styled.div`
  width: 800px;
  padding: 1rem 1rem;
  height: 30rem;
  margin: 5% auto;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.07);
  color: #5a5656;
`;

const CurrentBuy = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 1rem;
  span {
    font-weight: bold;
    font-size: 1.4rem;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const CardRight = styled.div`
  width: 23rem;
  img {
    max-width: 100%;
  }
`;

const CircleImage = styled.div`
  border-radius: 70%;
  overflow: hidden;
  width: 20rem;
  height: 20rem;
  border: 1px solid #ffc149;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right;
  }
`;

const StarArea = styled.div`
  padding-top: 1.4rem;
  span {
    font-weight: bold;
  }
  .startNum {
    padding-top: 0.4rem;
  }
`;

const CardLeft = styled.div`
  width: 25rem;
  margin-left: 3rem;
`;
const ProductName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const CoffeeBrandBtn = styled.button`
  border: none;
  border-radius: 1rem;
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #ffc149;
  width: 6.2rem;
  height: 1.8rem;
  text-align: center;
  margin-right: 0.5rem;
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
  justify-content: flex-start;
  font-size: 1.2rem;
  margin: 1rem 0.5rem;
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
