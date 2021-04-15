import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Loading from "../shared/Loading";
import { Grid } from "../elements/";

import { ProductList } from "../components/";

const Main = (props) => {
  const is_loading = useSelector((state)=>state.product.is_loading);

  if(is_loading){
    return(
      <>
        <Loading/>
      </>
    );
  }

  return (
    <React.Fragment>
      <ProductList />
    </React.Fragment>
  );
};
const PListWrap = styled.div``;

export default Main;
