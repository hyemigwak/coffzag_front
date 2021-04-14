import React, { useState, useEffect} from "react";
import {useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid } from "../elements/";
import Product from "./Product";
import {actionCreators as productActions} from "../redux/modules/product";
// import { _axios } from "../shared/axios";

const ProductList = (props) => {

  const dispatch = useDispatch()
  const coffees = useSelector((state) => state.product.product_list);

  useEffect(()=>{
    if(coffees.length < 2){
      dispatch(productActions.setProductAPI())
    }
  },[coffees])

  // const [coffee, setCoffee] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // await ~ get을 해주어야 array가 보임 -> 공부하기
  //     const request = await _axios.get();
  //     if (request.data.ok) {
  //       setCoffee(request.data.results);
  //     }
  //     return request;
  //   }
  //   fetchData();
  // }, []);

  // console.log(coffee);

  return (
    <React.Fragment>
      <ProductContainer>
        {coffees.map((coffee,idx) => <Product data={coffee} key={idx}/>)}
      </ProductContainer>



      {/* {coffees.map((coffee) => {
        console.log(coffee);
        return <Product{...coffee} />;
      })} */}
      {/* {coffee.map((coffees) => {
        console.log(coffees);
        return <Product {...coffees} />;
      })}
      {coffee.map((coffees) => {
        console.log(coffees);
        return <Product {...coffees} />;
      })} */}
    </React.Fragment>
  );
};

const ProductContainer = styled.div`
  display:flex;
  flex-wrap: wrap;
`;


export default ProductList;
