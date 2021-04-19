import React from "react";
import { Grid, Text } from "../elements/";
import styled from "styled-components";

const Footer = (props) => {
  return (
    <>
      <Grid
        is_flex
        column
        padding="0 4% 0 4%"
        margin="10% auto 5% auto"
        style={{ color: "#d2d2d2" }}
      >
        <Grid is_flex column>
          <b>📍 여기는 COFFZAG</b>
        </Grid>
        <Grid is_flex column>
          HANGHAE99 TEAM
        </Grid>
        <Grid is_flex column>
          <Grid is_flex row>
            <Grid textAlign="right">Frontend</Grid>
            <Grid width="5%" textAlign="center">
              +
            </Grid>
            <Grid>Backend</Grid>
          </Grid>
          <Grid is_flex row>
            <Grid textAlign="right">곽혜미 최경민</Grid>
            <Grid width="5%" textAlign="center">
              +
            </Grid>
            <Grid>이세정 이정빈 박은진</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
