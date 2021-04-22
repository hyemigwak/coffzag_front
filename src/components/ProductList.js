import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as likeActions } from "../redux/modules/like";
import { Grid, Line } from "../elements/";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.product.product_list);
  //커피 정보 8개씩만 받아온다

  const [page, setPage] = useState(1); //현재페이지, 1부터 시작
  const [size, setSize] = useState(8); //페이지당 post갯수 = 8개씩(고정값) 사실상 setSize 안써도 됨, 지워도 작동o

  //pageNumber = [1,2,3,4,5,6,7], length로 표시해라 상수로 표시 x
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(51 / size); i++) {
    pageNumber.push(i);
  }

  //paginate : page 바꾸기 setPage로 바꾼다
  const paginate = (PageNumber) => setPage(PageNumber);

  useEffect(() => {
    dispatch(productActions.setProductAPI(page, size));
    dispatch(likeActions.getLikeAPI());
  }, [page]);

  //페이지네이션 화살표 함수

  // 오른쪽 화살표 함수
  const forward = () => {
    if (page < 7) {
      setPage(page + 1);
    } else {
      window.alert("마지막 페이지에요!");
    }
  };
  // 왼쪽 화살표 함수
  const backward = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      window.alert("첫번째 페이지에요!");
    }
  };

  return (
    <Grid is_flex column>
      <CardWrap>
        {coffees.map((coffee, idx) => (
          <Product {...coffee} idx={idx} key={idx} />
        ))}
      </CardWrap>
      <Container>
        <ul className="pagination">
          <ArrowLeftIcon
            style={{ cursor: "pointer", verticalAlign: "-30px" }}
            onClick={backward}
          />
          {pageNumber.map((pageNum) => (
            <li key={pageNum} className="pagination_item">
              <PageSpan onClick={() => paginate(pageNum)}>{pageNum}</PageSpan>
            </li>
          ))}
          <ArrowRightIcon style={{ cursor: "pointer" }} onClick={forward} />
        </ul>
      </Container>
    </Grid>
  );
};

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 2rem;
  ul {
    list-style: none;
    display: flex;
  }
  li {
    font-weight: bold;
    cursor: pointer;
  }
  svg {
    padding-top: 1rem;
  }
`;

const PageSpan = styled.div`
  padding: 1rem;
  width: 1rem;
  border-radius: 10rem;
  text-align: center;
  transition: font-weight 100ms ease-in, background-color 100ms ease-in,
    color 100ms ease-in;
  :hover {
    font-weight: 900;
    background-color: #d2d2d21a;
    color: #212121;
  }
`;

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
`;

export default ProductList;
