import React from "react";
import styled from "styled-components";
import {Grid, Button, Input} from "../elements";
import coffee from "../images/coffee.JPG";
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const Detail = (props) => {
  return(
    <div style={{margin:"0 auto"}}>
      <Container>
        <CurrentBuy>
          <span>50</span>명 구매 완료!
        </CurrentBuy>
        <Contents>
          <CardRight>
            <CircleImage><img src={coffee} alt="콜롬비아"/></CircleImage>
          </CardRight>
          <CardLeft>
            <ProductName>
              <div className="Pname">
                콜롬비아
              </div>
              <div className="Btn">
                <CoffeeBrandBtn>Nespresso</CoffeeBrandBtn>
              </div>
              <div className="starRank">
                <StarRoundedIcon style={{ color: "#FFC149"}}/>
                <StarRoundedIcon style={{ color: "#FFC149"}}/>
                <StarHalfRoundedIcon style={{ color: "#FFC149"}}/>
                <StarOutlineRoundedIcon style={{ color: "#FFC149"}}/>
                <StarOutlineRoundedIcon style={{ color: "#FFC149"}}/>
              </div>
              <div className="startNum">
                4.7
              </div>
            </ProductName>
            <PriceLine>
              <div className="Pprice">
                6,900원
              </div>
              <div className="capsulePack">
                1 슬리브 (10캡슐)
              </div>
            </PriceLine>
            <DetailLine>
              <p>산뜻한 풍미와 과일향이 나는 커피입니다.</p>
            </DetailLine>
            <QtyLine>
              <div>
                <span>개수</span>: 1개
              </div>
              <div className="plusminusBtn">
                <AddCircleOutlineIcon style={{marginRight:"0.4rem"}}/>
                <RemoveCircleOutlineIcon/>
              </div>
            </QtyLine>
            <BtnLine>
              <CartBtn>장바구니</CartBtn>
              <BuyBtn>구매하기</BuyBtn>
            </BtnLine>
          </CardLeft>
        </Contents>
      </Container>
      <ReviewContainer>
        <div className="reviewcount">
          리뷰 10개 (최신순)
        </div>
        <ReviewInput>
          <input type="text" placeholder="리뷰를 작성해주세요!"/>
          <button>리뷰등록</button>
        </ReviewInput>
        <ShowingReview>
          <Review1>
            <div className="reviewuser">혜미</div>
            <div className="reviewcontent">크레마가 풍부해서 좋네요</div>
          </Review1>
            <div className="reviewdate">2021-04-12 19:25:34</div>
        </ShowingReview>
        
      </ReviewContainer>
    </div>
  )

}

const Container = styled.div`
  width: 800px;
  padding: 1rem 1rem;
  height: 28rem;
  margin: 5% auto;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.07);
  color: #5A5656;
`;

const CurrentBuy = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  margin: 1rem 1rem;
  span {
    font-weight: bold;
    font-size: 1.4rem;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-text: center;
`;

const CardRight = styled.div`
  width: 23rem;
  img {
    max-width: 100%;
  }
`;

const CircleImage = styled.div`
  border-radius: 70%;
  overflow:hidden;
  width: 20rem;
  height: 20rem;
  border: 1px solid #FFC149;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const CardLeft = styled.div`
  width: 25rem;
  margin-left: 3rem;
`;
const ProductName = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem;
  border-bottom: 1px solid #9A9292;
  margin-bottom: 0.6rem;

  .Pname {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  .starRank {
    margin-right: 0.5rem;
  }
`;

const CoffeeBrandBtn = styled.button`
  border:none;
  border-radius: 1rem;
  font-size: 0.8rem;
  color: #ffffff;
  background-color: #FFC149;
  width: 6.2rem;
  height: 1.8rem;
  text-align: center;
  margin-right: 0.5rem;
  
`;

const PriceLine = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items:center;
  margin: 1rem 0.5rem;
  .Pprice {
    font-size: 2rem;
    font-weight: 500;
  }
  div::before {
    content: "";
    width: 1px;
    height: 5px;
    border-right: 1px solid #ABA8A8;
    margin: 0px 1.5rem;
  }
  div:first-child::before {
    content:none;
  }
`;

const DetailLine = styled.div`
  color:#5A5656;
  font-size: 1rem;
  padding: 0.5rem 0;
  margin: 1rem 0.5rem;
  display:flex;
  justify-content:flex-start;
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
    display:flex;
    align-items:center;
  }
`;

const BtnLine = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  padding: 1rem 0;
  margin: 1rem 0;
`;

const CartBtn = styled.button`
  background-color: #5A5656;
  color: #ffffff;
  border: none;
  border-radius: 19.5px;
  width: 120px;
  height: 35px;
  margin-right: 25px;
  cursor:pointer;
  text-align:center;
  font-weight: 500;
`;

const BuyBtn = styled(CartBtn)`
  background-color: #FFC149;
`;

const ReviewContainer = styled.div`
  width: 800px;
  margin: 5% auto;
  .reviewcount {
    font-size: 0.8rem;
    color: #5A5656;
    margin-left: 1.5rem;
    font-weight: bold;
  }
`;

const ReviewInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 90%;
    height: 2rem;
    border-radius: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border:none;
    margin: 1rem 1rem;
    padding: 0.3rem 0.8rem;
    
  }
  button {
    width: 6rem;
    height: 2rem;
    background-color: #FFC149;
    border-radius: 1.2rem;
    border:none;
    cursor:pointer;
    font-weight: bold;
  }

`;

const ShowingReview = styled.div`
  width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5A5656;
  .reviewuser {
    margin: 0 2.5rem 0 2rem;
    font-weight: bold;
  }
  .reviewdate {
    color: #D2D2D2;
    font-size: 14px;
  }
`;

const Review1 = styled.div`
  display: flex;
  justify-content:flex-start;
  align-items: center;
`;


export default Detail;
