import React, {useEffect} from "react";
import { useDispatch} from "react-redux";
import styled from "styled-components";
import { Grid, Badge } from "../elements/";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as commentActions } from "../redux/modules/comment";

const Product = (props) => {
  const dispatch = useDispatch();
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

  const commentList = useSelector((state)=>state.comment.comment_list);
  
  //가격에 콤마 붙여주는 정규식 표현
  const coffee_price = coffeePrice
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

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
          <h4>{coffee_price} 원</h4>
        </Grid>
        <Grid>
          <p>{commentList[coffeeId]? commentList[coffeeId][0].contents : contents }</p>
        </Grid>
      </CardBody>

      <CardFooter>
        <Grid>
          <span>{commentList[coffeeId]? commentList[coffeeId][0].createdAt : createdAt }</span>
        </Grid>
        <Grid textAlign="right">
          <span>by </span>
          {commentList[coffeeId]? commentList[coffeeId][0].username : username}
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
  contents:
    "첫 리뷰어가 되어주세요!",
  createdAt: "",
  username: "Coffzag",
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
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  text-align: right;
  transition: background-size 0.3s ease-in-out;
  :hover {
    background-size: 110%;
  }
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

export default Product;
