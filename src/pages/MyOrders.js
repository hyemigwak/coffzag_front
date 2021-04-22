import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Line } from "../elements/";
import OrderCard from "../components/OrderCard";
import styled from "styled-components";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { actionCreators as orderActions } from "../redux/modules/order";


const MyOrders = (props) => {
    const dispatch = useDispatch();
    const username = localStorage.getItem("user_name");
    const orderList = useSelector((state) => state.order.order_list);
    console.log("오더리스트",orderList);
    
    const coffee_info = [];
    orderList.map((coffee)=>
    coffee_info.push(coffee.orderHistories))
    console.log(coffee_info);

    useEffect(()=>{
        dispatch(orderActions.getOrderAPI());
    },[])

  return (
    <div>
      <Grid width="100vmin">
        <Grid is_flex column>
          <h1>구매 목록</h1>
          <Grid is_flex>
            <Grid textAlign="right" margin="0.5rem 0">
              <UserName>{username}</UserName>님 안녕하세요!
            </Grid>
          </Grid>
          <Line bottom />
          <LikeCardWrap>
            <Card>
              <p>구매목록이 비었어요</p>
              <ShoppingCartIcon className="cartIcon"/>
            </Card>
            {orderList.map((order,idx) => (
                <OrderCard {...order} coffeeInfo={coffee_info} idx={idx}/>
            ))}
          </LikeCardWrap>

        </Grid>
      </Grid>
    </div>
  );
};

const Card = styled.div`
  width: 35rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  display:flex;
  justify-content:center;
  align-items: center;
  border-radius: 20px;
  padding: 1rem;
  margin: 0.5rem;
  flex-grow: 1;
  p {
    font-size: 34px;
    font-weight: bold;
  }
  .cartIcon {
    width: 38px;
    height: 38px;
    margin-left: 10px;
  }
`;

const UserName = styled.span`
  font-weight: 800;
  font-size: 18px;
`;

const LikeCardWrap = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: flex-start;
  box-sizing: border-box;
  flex-wrap: wrap;
`;


export default MyOrders;
