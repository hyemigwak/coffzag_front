import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "../elements/";
import Loading from "../shared/Loading";
import { ProductList } from "../components/";

const Main = (props) => {
  const is_loading = useSelector((state) => state.product.is_loading);

  // if (is_loading) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   );
  // }

  return (
    <>
    {/* {is_loading && <Loading/>} */}
      <ProductList />
    </>
  );
};

export default Main;
