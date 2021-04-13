import React from "react";
import styled from "styled-components";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import { Login, NotFound, Detail,Signup } from "../pages";
import { Header } from "../components";
import { Grid } from "../elements";

function App() {
  return (
    <AppGlobal>
      <Header />
      <Grid isRoot>
        <ConnectedRouter history={history}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/detail" component={Detail}/>
          <Route exact path="/signup" component={Signup}/>
          {/* 지정하지 않은 주소를 notfound로 가게 하기 */}
          {/* <Switch>
            <Route exact component={NotFound} />
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
