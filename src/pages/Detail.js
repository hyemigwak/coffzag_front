import React, { useEffect } from "react";
import DetailProduct from "../components/DetailProduct";
import DetailReview from "../components/DetailReview";
import Loading from "../shared/Loading";
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const Detail = (props) => {
  const dispatch = useDispatch();
  const is_loading = useSelector((state) => state.product.is_loading);
  const id = props.match.params.id;
  const coffees = useSelector((state) => state.product.product_list);
  const coffee_idx = coffees.findIndex((c) => c.coffeeId === Number(id));
  const coffee = coffees[coffee_idx];

  useEffect(() => {
    if (coffee) {
      return coffee;
    }
    dispatch(productActions.setOneProductAPI(id));
    dispatch(commentActions.getCommentAPI(id));
  }, [coffee]);

  if (is_loading) {
    return <Loading />;
  }

  return (
    <div>
      <DetailProduct {...coffee} />
      <DetailReview {...coffee} />
    </div>
  );
};

export default Detail;
