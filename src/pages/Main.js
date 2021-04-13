import React from "react";
import styled from "styled-components";
import { Grid } from "../elements/";

import { ProductList } from "../components/";

const Main = (props) => {
  return (
    <React.Fragment>
      <ProductList />
    </React.Fragment>
  );
};
const PListWrap = styled.div``;

export default Main;
