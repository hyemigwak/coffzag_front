import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { actionCreators as productActions } from "../redux/modules/product";
import { Grid } from "../elements/";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.product.product_list);

  useEffect(() => {
    if (coffees.length < 2) {
      dispatch(productActions.setProductAPI());
    }
  }, [coffees]);

  return (
    <Grid>
      {coffees.map((coffee, idx) => (
        <Product {...coffee} key={idx} />
      ))}
    </Grid>
  );
};

export default ProductList;
