import * as React from "react";
import * as SwaggerService from "../services/swagger";

class SwaggerTest extends React.Component {
  public componentDidMount() {
    SwaggerService.getSpec();
  }

  public render() {
    return (
      <div id="swaggerContainer" />
    );
  }
}

export default SwaggerTest;
