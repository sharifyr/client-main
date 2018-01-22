import * as React from "react";
import * as path from "path";
import { Grid, Row, Col } from "react-flexbox-grid";

import LeftPanel from "./leftPanel";
import MainPanel from "./mainPanel";

const Component: React.SFC<{}> = (props: {}) => {
  return (
    <Row middle-xs={12}>
      <LeftPanel />
      <MainPanel />
    </Row>
  );
};

export default Component;
