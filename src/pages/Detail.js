import React, { useEffect } from "react";
import { DetailProduct, DetailReview }  from "../components";
import Loading from "../shared/Loading";
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const Detail = (props) => {
  const dispatch = useDispatch();
  const is_loading = useSelector((state) => state.product.is_loading);
  const id = props.match.params.id;
  const _product = useSelector((state) => state.product.product);
  const coffeeIdx= _product.coffeeId

  useEffect(() => {
    dispatch(productActions.setOneProductAPI(id));
    dispatch(commentActions.getCommentAPI(id));
  }, []);

  if (is_loading) {
    return <Loading />;
  }

  return (
    <div>
      <DetailProduct {..._product} />
      <DetailReview coffeeId={coffeeIdx} />
    </div>
  );
};

export default Detail;
