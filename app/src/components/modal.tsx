import * as React from "react";

import { Logger } from "../utils/logger";

const logger = new Logger();

interface IProps {
  isOpen: boolean;
  onExitClick: () => void;
  children?: any;
}

const Component: React.SFC<IProps> = (props: IProps) => {
  return (props.isOpen ?
    <div className="modalGreyout">
      <div className="modalContent">
        <div>
          <div>
            <div className="modalNavbar">
              <div className="fa-times-circle-o icon" onClick={props.onExitClick} />
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </div>
    : null
  );
};

export default Component;
