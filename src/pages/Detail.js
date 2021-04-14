import React, { useEffect } from "react";
import DetailProduct from "../components/DetailProduct";
import DetailReview from "../components/DetailReview";
import { actionCreators as productActions } from "../redux/modules/product";
import { useDispatch, useSelector } from "react-redux";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const coffees = useSelector((state) => state.product.product_list);
  const coffee_idx = coffees.findIndex((c) => c.coffeeId === Number(id));
  const coffee = coffees[coffee_idx];
  console.log(coffee);

  useEffect(() => {
    if(coffee) {
      return coffee;
    }
    dispatch(productActions.setOneProductAPI(id))
  },[coffee]);


  return (
    <div>
      <DetailProduct {...coffee} />
      <DetailReview {...coffee} />
    </div>
  );
};

export default Detail;
