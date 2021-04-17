import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as commentActions } from "../redux/modules/comment";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.product.product_list);
  // const reviewList = useSelector((state) => state.product.review_list);
  // console.log(reviewList);
  console.log(coffees);


  useEffect(() => {
    if (coffees.length < 2) {
      dispatch(productActions.setProductAPI());
    }
  }, [coffees]);

  return (
    <React.Fragment>
      {coffees.map((coffee, idx) => (
        <Product {...coffee} key={idx} />
      ))}
    </React.Fragment>
  );
};

export default ProductList;
