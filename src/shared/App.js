import React, { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import {getCookie} from "./Cookie";


import { Main, Detail, Cart, Login, Signup, NotFound } from "../pages";
import { Header } from "../components";
import { Grid } from "../elements";

function App() {
  const dispatch = useDispatch();
  const cookie = getCookie('user_login') ? true : false;

  useEffect(()=>{
    if(cookie);
    dispatch(userActions.loginCheck(cookie))
  },[])


  return (
    <AppGlobal>
      <Header />
      <Grid isRoot>
        <ConnectedRouter history={history}>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          {/* 지정하지 않은 주소를 notfound로 가게 하기 */}
          {/* <Switch>
            <Route component={NotFound} />
          </Switch> */}
        </ConnectedRouter>
      </Grid>
    </AppGlobal>
  );
}

const AppGlobal = styled.div`
  ${(props) => (props?.onClick || props?._onClick ? "cursor:pointer;" : "")}
`;

export default App;
