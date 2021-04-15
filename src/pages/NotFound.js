import React from "react";
import { Grid, Button } from "../elements";

const NotFound = (props) => {
  /* props뜯어보면 push, goBack, goForward .. 많음 */
  // console.log(props);

  return (
    <Grid is_flex column padding="180px">
      <h1>!</h1>
      <h5>주소를 찾을 수 없습니다.</h5>
      <p>
        <Button
          _onClick={() => {
            props.history.goBack();
          }}
          text="뒤로 가기"
        />
      </p>
    </Grid>
  );
};

export default NotFound;
