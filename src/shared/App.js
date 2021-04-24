import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { getCookie } from "./Cookie";

import "./App.css";
import { Grid } from "../elements";

import {
  Main,
  Detail,
  Cart,
  Login,
  Signup,
  NotFound,
  Mypage,
  Payment,
} from "../pages";
import { Header, Footer } from "../components";

function App() {
  const dispatch = useDispatch();
  const cookie = getCookie("user_login") ? true : false;

  useEffect(() => {
    if (cookie);
    dispatch(userActions.loginCheck(cookie));
  }, []);

  return (
    <React.Fragment>
      <Grid isRoot>
        <Header />
        <ConnectedRouter history={history}>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/mypage" component={Mypage} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/notfound" component={NotFound} />
        </ConnectedRouter>
        <Footer />
      </Grid>
    </React.Fragment>
  );
}

export default App;
