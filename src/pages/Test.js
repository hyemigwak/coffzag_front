import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TestProduct from "../components/TestProduct";
import { actionCreators as testActions } from "../redux/modules/test";
import { Grid, Line } from "../elements";

const Test = (props) => {
    const dispatch = useDispatch();
    const coffees = useSelector((state) => state.product.product_list);
  
    useEffect(() => {
      if (coffees.length < 2) {
        dispatch(testActions.PagingProductAPI(1,8));
      }
    }, [coffees]);
  
    return (
      <>
        {coffees.map((coffee, idx) => (
          <TestProduct {...coffee} key={idx} />
        ))}
      </>
    );
}

export default Test
