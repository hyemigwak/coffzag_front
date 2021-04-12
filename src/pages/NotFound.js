import React from "react";
import { Grid, Button } from "../elements";

const NotFound = (props) => {
  /* props뜯어보면 push, goBack, .. 많음 */
  console.log(props);

  return (
    <Grid is_flex>
      <Button
        _onClick={() => {
          window.alert("뒤로 갑니다.");
          if (true) {
            props.history.goBack();
          }
        }}
        isPlay
      >
        뒤로가기
      </Button>
    </Grid>
  );
};

export default NotFound;
