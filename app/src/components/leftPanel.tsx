import * as React from "react";
import { connect } from "react-redux";

import { NavBar } from "../components/navbar";
import { IAppState } from "../stores/store";
import { ModalTypes, ILeftPanelWidget } from "../reducers/reducer";
import { LeftPanelItem } from "./leftPanelItem";

interface IStateProps {
  "loginModal": boolean;
  "signupModal": boolean;
  "loggedIn": boolean;
  "widgets": ILeftPanelWidget[];
  "selectedWidget": number;
}

const mapStateToProps = (state: IAppState, props: {}): IStateProps => {
  return {
    "loginModal": state.modal === ModalTypes.LOGIN,
    "signupModal": state.modal === ModalTypes.SIGNUP,
    "loggedIn": state.userData.auth !== "",
    "widgets": state.ui.leftPanel.widgets,
    "selectedWidget": state.ui.leftPanel.selectedWidget
  };
};

class LeftPanel extends React.Component<IStateProps> {

  public render() {
    return (
      <div className={"leftPanel"}>
          <div className={"placeholderText"}>
            <NavBar {...this.props}/>
            <div className="accordionContainer">
              {this.props.widgets.map((w) => <LeftPanelItem name={w.name}/>)}
            </div>
          </div>
      </div>
    );
  }
}

var leftPanel = connect(mapStateToProps)(LeftPanel)
export {leftPanel as LeftPanel};

