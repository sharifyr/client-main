import * as React from "react";
import * as path from "path";

import LeftPanel from "../components/leftPanel";
import ContactRequests from "../components/contactRequests";

const Component = () => {
  return (
    <div className={"contentContainer"}>
      <LeftPanel />
      <ContactRequests />
    </div>
  );
};

export default Component;
