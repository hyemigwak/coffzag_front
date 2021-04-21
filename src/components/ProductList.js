import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";
import { actionCreators as productActions } from "../redux/modules/product";
import { Grid, Line } from "../elements/";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';


const ProductList = (props) => {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.product.product_list);
  console.log(coffees);
  //커피 정보 8개씩만 받아온다

	const [page, setPage] = useState(1); //현재페이지, 1부터 시작
	const [size, setSize] = useState(8); //페이지당 post갯수 = 8개씩(고정값) 사실상 setSize 안써도 됨, 지워도 작동o

  //pageNumber = [1,2,3,4,5,6,7]
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(51/size); i++){
      pageNumber.push(i);
  }

  //paginate : page 바꾸기 setPage로 바꾼다
  const paginate = (PageNumber) => setPage(PageNumber);
  
    

  useEffect(() => {
      dispatch(productActions.setProductAPI(page,size));
  }, [page]);

  //페이지네이션 화살표 함수

  // 오른쪽 화살표 함수
  const forward = () => {
    if(page < 7){
      setPage(page + 1)
    }else{
      window.alert("마지막 페이지에요!")
    }
  }
  // 왼쪽 화살표 함수
  const backward = () => {
    if(page > 1){
      setPage(page - 1)
    }else{
      window.alert("첫번째 페이지에요!")
    }
  }

  return (
    <ScreenArea>
      <CoffeeBox>
        {coffees.map((coffee, idx) => (
          <Product {...coffee} key={idx} />
        ))}
      </CoffeeBox>
      <Container>
        <ul className="pagination">
        <ArrowLeftIcon style={{cursor:"pointer"}} onClick={backward}/>
        {pageNumber.map((pageNum) => (
          <li key={pageNum}
            className="pagination_item">
            <PageSpan onClick={()=>paginate(pageNum)}>
              <div className="active">{pageNum}</div>
            </PageSpan>
          </li>
        ))}
        <ArrowRightIcon style={{cursor:"pointer"}} onClick={forward}/>
        </ul>
      </Container>
    </ScreenArea>
  );
};

const ScreenArea = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CoffeeBox = styled.div`
  display:flex;
  flex-wrap:wrap;
`;
const Container = styled.div`
  display:block;
  ul {
      list-style:none;
      display:flex;
  }
  li {
      margin: 0rem 0.5rem;
      font-weight: bold;
      cursor:pointer;
  }

`;

const PageSpan = styled.span`
    /* div.hover {
      background-color: #0000001A;
      color: #212121;
      font-weight: bold;
      cursor:pointer;
    } */
    div:hover {
      font-size: 18px;
    }

    div.focus {
    background-color: #0000001A;
    color: #212121;
    font-weight: bold;
  }
`;



export default ProductList;
