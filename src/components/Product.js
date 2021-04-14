import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/";
import { history } from "../redux/configureStore";

const Product = (props) => {
  const {
    coffeeName,
    coffeePrice,
    coffeeImg,
    coffeeBrand,
    review,
    review_date,
    user_name,
    coffeeId,
  } = props.data;

  return (
    <Card
      onClick={() => {
        history.push(`/detail/${coffeeId}`);
      }}
    >
      <ProductImg bgimg={coffeeImg}>
        <BrandBadge>{coffeeBrand}</BrandBadge>
      </ProductImg>
      <CardBody>
        <Grid>
          <h1>{coffeeName}</h1>
          <h4>{coffeePrice} 원</h4>
        </Grid>
        <Grid>
          <p>{review}</p>
        </Grid>
      </CardBody>

      <CardFooter>
        <Grid>
          <span>{review_date}</span>
        </Grid>
        <Grid textAlign="right">
          <span>by </span>
          {user_name}
        </Grid>
      </CardFooter>
    </Card>
  );
};

Product.defaultProps = {
  coffeeName: "더블 에스프레소 스쿠로",
  coffeePrice: 12000,
  coffeeImg:
    "https://www.nespresso.com/shared_res/agility/enhancedPDP/vertuo/images/Vertuo_Double-espresso-Scuro_resp.jpg",
  coffeeBrand: "Nespresso",
  review:
    "에스프레소가 더블 진한맛과 다크로스팅 아로마 바이스 첫 산미감 어쩌구 저쩌구 김수한무",
  review_date: "2021-04-01",
  user_name: "mdnimi",
};

const Card = styled.div`
  z-index: 1;
  margin: 1rem;
  width: 16rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px #0000001a;
`;

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  width: 100%;
  height: 16rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-size: cover;
  background-position: right;
  text-align: right;
`;

const CardFooter = styled.footer`
  width: 100%;

  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  padding: 0.5em 1em 1em 1em;

  border-top: 0.5px solid #d2d2d2;
  margin-top: 2rem;
  font-size: 18px;
  font-weight: 600;
  span {
    font-size: 12px;
    font-weight: 600;
  }
`;

const CardBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1rem 0 1rem;
  h1 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -1px;
    word-spacing: -1px;
    text-align: justify;
    line-height: 100%;
  }
  h4 {
    font-size: 12px;
    font-weight: 600;
    line-height: 100%;
    margin-top: -10px;
  }
  p {
    letter-spacing: -1px;
    word-spacing: -1px;
    font-size: 16px;
    font-weight: 600;
    line-height: 150%;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;

const BrandBadge = styled.span`
  display: inline-block;
  margin: 1vmin 1vmin auto auto;
  padding: 5px 10px;
  border-radius: 15px;
  border: 10px;
  background-color: #ffc149;
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 0 2px #0000004d;
`;

export default Product;
