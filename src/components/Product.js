import React from "react";
import styled from "styled-components";
import { Grid, Badge, Line } from "../elements/";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as likeActions } from "../redux/modules/like";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Product = (props) => {
  const dispatch = useDispatch();
  const likeList = useSelector((state) => state.like.like_list);
  const is_login = useSelector((state) => state.user.is_login);


  const {
    coffeeName,
    coffeePrice,
    coffeeImg,
    coffeeBrand,
    coffeeId,
    coffeeInfo,
    username,
    createdAt,
    contents,
    idx,
  } = props;

  const reviewList = useSelector((state) => state.product.latest_review);
  const like = {coffeeName, coffeePrice, coffeeImg, coffeeBrand, coffeeId, coffeeInfo}

  const addheart = () => {
    if(is_login){
      dispatch(likeActions.addLikeAPI(coffeeId))
      if(window.confirm("찜리스트에 추가되었습니다. 마이페이지로 이동할까요?")){
        history.replace('/mypage')
      }else{
        return;
      }
    }else{
      window.alert("로그인해주세요!")
    }
    

  }
  const deleteheart = () => {
    if(is_login){
      dispatch(likeActions.deleteLikeAPI(coffeeId));
      window.alert("삭제완료!");
    }else{
      window.alert("로그인해주세요!")
    }
  }

  return (
    <Card
      // onClick={() => {
      //   history.push(`/detail/${coffeeId}`);
      // }}
    >
      <div onClick={() => {
        history.push(`/detail/${coffeeId}`);
      }}>
        {coffeeBrand === "nespresso" ? (
          <ProductImg className="nomargin" NoMargin bgimg={coffeeImg}>
            <Badge>{coffeeBrand}</Badge>
          </ProductImg>
        ) : (
          <ProductImg bgimg={coffeeImg}>
            <Badge>{coffeeBrand}</Badge>
          </ProductImg>
        )}
      </div>
      {reviewList[idx]?.username ? (
        <>
          <CardBody>
            <div onClick={() => {
              history.push(`/detail/${coffeeId}`);
            }}>
              <h1>{coffeeName}</h1>
              <p>
                {reviewList[idx]?.contents
                  ? reviewList[idx].contents
                  : "첫 리뷰를 써주세요!"}
              </p>
            </div>
          <>
            {
            likeList.findIndex((l) => l.product.coffeeId === coffeeId) >= 0?
            (
              <FavoriteIcon onClick={deleteheart} className="heartIcon2"/>
            ):(
              <FavoriteBorderIcon onClick={addheart} className="heartIcon"/>
            )
            }
          </>  
          </CardBody>
          <CardFooter onClick={() => {
            history.push(`/detail/${coffeeId}`);
          }}>
            <Grid>
              <span>
                {reviewList[idx]?.createdAt
                  ? reviewList[idx].createdAt.split("T")[0]
                  : ""}
              </span>
            </Grid>
            <Grid textAlign="right">
              <span>by&ensp;</span>
              {reviewList[idx].username}
            </Grid>
          </CardFooter>
        </>
      ) : (
        <>
          <CardBody Null>
            <h1>{coffeeName}</h1>
            <p>
              {reviewList[idx]?.contents
                ? reviewList[idx].contents
                : "첫 리뷰를 써주세요!"}
            </p>
            <>
            {
            likeList.findIndex((l) => l.product.coffeeId === coffeeId) >= 0 ?
            (
              <FavoriteIcon onClick={deleteheart} className="heartIcon2"/>
            ):(
              
              <FavoriteBorderIcon onClick={addheart} className="heartIcon"/>
            )
            }
          </>
          </CardBody>
          <CardFooter Null>
            <Grid>
              <span>
                {reviewList[idx]?.createdAt
                  ? reviewList[idx].createdAt.split("T")[0]
                  : ""}
              </span>
            </Grid>
            <Grid textAlign="right">
              <span>by&ensp;</span>
              Coffzag
            </Grid>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

Product.defaultProps = {
  coffeeName: "Coffee",
  coffeeBrand: "Brand",
  contents: "",
  createdAt: "",
  username: "Coffzag",
};

const Card = styled.div`
  z-index: 0;
  margin: 1rem;
  width: 16rem;
  min-height: 30rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px #0000001a;
  border: transparent;
  display: block;

  display: block;

  transition: box-shadow 0.3s ease-in-out;
  :hover {
    box-shadow: 0 0 10px #00000038;
    border: inset 0.5px solid #0000001a;
    div {
      background-size: 107%;
      transition: background-size 0.3s ease-in-out;
    }
    .nomargin {
      background-size: 83%;
      transition: background-size 0.3s ease-in-out;
    }
  }
`;

const ProductImg = styled.div`
  margin: auto;
  object-fit: contain;
  background-image: ${(props) => `url(${props.bgimg})`};
  max-width: 100%;
  height: 16rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  ${(props) =>
    props.NoMargin ? "background-size: 75%;" : "background-size: 101%;"}
  background-position: center;
  background-repeat: no-repeat;
  text-align: right;
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
  ${(props) =>
    props.Null
      ? `
      p {
  color:#d2d2d2;}
  `
      : ""}
  .heartIcon {
    color: #F6AFAF;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin: 0.5rem;
    position: relative;
    bottom: 10px;
    left: 180px;
    z-index: 3000,
  }


  .heartIcon2 {
    color: #F6AFAF;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin: 0.5rem;
    position: relative;
    bottom: 10px;
    left: 180px;
    z-index: 3000,
    }

`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 0.8rem 1rem 1rem 1rem;

  border-top: 0.5px solid #d2d2d2;
  font-size: 18px;
  font-weight: 700;
  // 사용자 => 고유 닉네임 처리
  text-transform: capitalize;
  white-space: nowrap;
  span {
    text-transform: initial;
    font-size: 11px;
    font-weight: 600;
  }
  ${(props) =>
    props.Null
      ? `
  background-color: #d2d2d21a;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color:#d2d2d2;
  user-select:none;
  `
      : ""}
`;

export default Product;
