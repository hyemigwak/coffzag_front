import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid } from "../elements/";
import { history } from "../redux/configureStore";

import Product from "./Product";
import { actionCreators as productActions } from "../redux/modules/product";
// import { _axios } from "../shared/axios";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.product.product_list);

  useEffect(() => {
    if (coffees.length < 2) {
      dispatch(productActions.setProductAPI());
    }
  }, [coffees]);

  return (
    <React.Fragment>
      <ProductContainer>
        {coffees.map((coffee, idx) => (
          <Product data={coffee} key={idx} />
        ))}
      </ProductContainer>
    </React.Fragment>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default ProductList;
