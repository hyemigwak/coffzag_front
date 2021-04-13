import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "../elements/";

import Product from "./Product";

import { _axios } from "../shared/axios";

const ProductList = (props) => {
  const [coffee, setCoffee] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // await ~ get을 해주어야 array가 보임 -> 공부하기
      const request = await _axios.get();
      if (request.data.ok) {
        setCoffee(request.data.results);
      }
      return request;
    }
    fetchData();
  }, []);

  console.log(coffee);

  return (
    <React.Fragment>
      <Product />
      {coffee.map((coffees) => {
        console.log(coffees);
        return <Product {...coffees} />;
      })}
      {coffee.map((coffees) => {
        console.log(coffees);
        return <Product {...coffees} />;
      })}
      {coffee.map((coffees) => {
        console.log(coffees);
        return <Product {...coffees} />;
      })}
    </React.Fragment>
  );
};

export default ProductList;
