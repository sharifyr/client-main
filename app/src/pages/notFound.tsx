import * as React from "react";

import { Logger } from "../utils/logger";
import { LeftPanel } from "../components/leftPanel";
import NotFound from "../components/notFound";

const logger = new Logger();

const Component: React.SFC<{}> = () => {
  return (
    <div className={"contentContainer"}>
      <LeftPanel />
      <NotFound />
    </div>
  );
};

export default Component;
