import React, { useEffect } from "react";
import DetailProduct from "../components/DetailProduct";
import DetailReview from "../components/DetailReview";
import { actionCreators as productActions } from "../redux/modules/product";
import { useDispatch, useSelector } from "react-redux";

const Detail = (props) => {
  const dispatch = useDispatch();

  const coffees = useSelector((state) => state.product.product_list);
  const id = props.match.params.id;
  const coffee_idx = coffees.findIndex((c) => c.coffee_id === Number(id));
  const coffee = coffees[coffee_idx];
  console.log(coffee);

  useEffect(() => {
    if (coffee) {
      return;
    }
    dispatch(productActions.setOneProductAPI(id));
  }, []);

  return (
    <div>
      <DetailProduct data={coffee} />
      <DetailReview data={coffee} />
    </div>
  );
};

export default Detail;
