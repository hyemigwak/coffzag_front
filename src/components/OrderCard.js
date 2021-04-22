import React from 'react'
import { Grid, Button, Line, Text, Badge } from "../elements/";
import styled from "styled-components";
import coffee from "../images/coffee.JPG";
import CoffeeCard from "./CoffeeCard";

const OrderCard = (props) => {
    console.log("오더프롭스",props); 
    const {createdAt, payMethod, totalPrice, userAddress,
        userPhone, username, coffeeInfo, idx} = props;
    console.log("커피인포",coffeeInfo);
    console.log(idx);
    console.log(coffeeInfo[1][0].product.coffeeName);

    const productList = [];
    coffeeInfo.map((coffeeP,idx) => 
    productList.push(coffeeP[idx].product)
    );
    console.log(productList);


    
    return (
        <Card>
            <OrderDate>
                <span>주문일자:</span>{createdAt}
            </OrderDate>
            <div className="ordertext">주문정보</div>
            <Line bottom/>
            {coffeeInfo.map((c,idx) => 
                <CoffeeCard {...c} idx={idx} productList = {productList}/>
            )}

            <PriceArea>
                <div>
                    <span className="ordertext">총 결제금액:</span><span className="money">{totalPrice}원</span>({payMethod}결제)
                </div>
            </PriceArea>
            <Line bottom/>
            <DeliverTable>
                <div className="delivertext">배송지 정보</div>
                <div><span>주문자:</span> {username}</div>
                <div><span>연락처:</span> {userPhone}</div>
                <div><span>주소:</span> {userAddress}</div>
            </DeliverTable>
        </Card>
    )
}

const Card = styled.div`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  justify-content:center;
  align-items: center;
  border-radius: 20px;
  padding: 1rem;
  margin: 0.5rem;
  flex-grow: 1;
  .ordertext {
        font-size: 18px;
        color: #212121;
        font-weight: 600;
        padding: 0.5rem 0.5rem;
    }
  .delivertext {
        font-size: 18px;
        color: #212121;
        font-weight: 600;
        padding: 0.5rem 0rem;
  }
    .title {
        font-size: 22px;
        color: #212121;
        font-weight: 600;
        margin-bottom: 0.4rem;
    }
`;
const OrderDate = styled.div`
    font-size: 16px;
    color: #847D7D;
    margin: 1rem 0.5rem;
    span {
        font-size: 18px;
        color: #212121;
        font-weight: 600;
    }
`;


const DeliverTable = styled.div`
    padding: 1rem;
    span {
        font-size: 16px;
        color: #212121;
        font-weight: 600;
    }
    div {
        margin: 0.4rem 0rem;
    }
`;

const PriceArea = styled.div`
    display:flex;
    justify-content: flex-end;
    text-align: right;
    margin: 0.4rem 0rem;
    .money{
        font-weight: 500;
        font-size: 18px;
    }
`;

export default OrderCard
