import React from "react";
import styled from "styled-components";
import { Grid, Badge } from "../elements/";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Product = (props) => {
  const {
    coffeeName,
    coffeePrice,
    coffeeImg,
    coffeeBrand,
    coffeeId,
    username,
    createdAt,
    contents,
  } = props;

  const reviewList = useSelector((state) => state.product.latest_review);

  return (
    <Card
      onClick={() => {
        history.push(`/detail/${coffeeId}`);
      }}
    >
      <ProductImg bgimg={coffeeImg}>
        <Badge>{coffeeBrand}</Badge>
      </ProductImg>
      <CardBody>
        <Grid>
          <h1>{coffeeName}</h1>
        </Grid>
        <Grid>
          <p>
            {reviewList[coffeeId]?.contents
              ? reviewList[coffeeId].contents
              : "첫 리뷰를 써주세요!"}
          </p>
        </Grid>
      </CardBody>
      <CardFooter>
        <Grid>
          <span>
            {reviewList[coffeeId]?.createdAt
              ? reviewList[coffeeId].createdAt.split("T")[0]
              : ""}
          </span>
        </Grid>
        <Grid textAlign="right">
          <span>by </span>
          {reviewList[coffeeId]?.username
            ? reviewList[coffeeId].username
            : "Coffzag"}
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
  contents: "",
  createdAt: "",
  username: "Coffzag",
};

const Card = styled.div`
  z-index: 1;
  margin: 1rem;
  width: 16rem;
  min-height: 30rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px #0000001a;
  border: transparent;
  display: block;

  transition: box-shadow 0.3s ease-in-out;
  :hover {
    box-shadow: 0 0 10px #00000038;
    border: inset 0.5px solid #0000001a;
    div {
      transition: background-size 0.3s ease-in-out;
      background-size: 107%;
    }
  }
`;

const ProductImg = styled.div`
  background-image: ${(props) => `url(${props.bgimg})`};
  width: 100%;
  height: 16rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  text-align: right;
`;

const CardFooter = styled.footer`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0.8rem 1rem 1rem 1rem;

  border-top: 0.5px solid #d2d2d2;
  font-size: 18px;
  font-weight: 700;
  
  span {
    font-size: 12px;
    font-weight: 600;
  }
`;

const CardBody = styled.div`
  height: 30%;
  padding: 1rem 1rem 0.5rem 1rem;

  h1 {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -1px;
    word-spacing: -1px;
    text-align: justify;
    line-height: 100%;
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

export default Product;
