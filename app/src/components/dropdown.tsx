import * as React from "react";
import { connect } from "react-redux";

import { IUiService, UiService } from "../services/ui";
import { IAppState, IStore } from "../stores/store";
import { config } from "../config";
import { Inject } from "typescript-ioc";

interface IStateProps extends IOwnProps {
  dropdownOpen: boolean;
}

interface IOwnProps {
  image: string;
}

const mapStateToProps = (state: IAppState, props: IOwnProps): IStateProps => {
  return {
    ...props,
    ...{"dropdownOpen": state.ui.preferencesDropdownToggle}
  };
};

class Dropdown extends React.Component<IStateProps> {

  @Inject
  private store!: IStore;

  @Inject
  private uiService!: IUiService;

  private toggleDropdown = () => {
    this.uiService.toggleMenu();
  };

  public render() {
    return (
      <div className="relative">
        <div className={"avatarThumb button"} onClick={this.toggleDropdown}>
          <div className="fa-chevron-down left"/>
          <img src={this.props.image ? this.props.image : (config.frontendDomain + "/avatar.jpg")} />
        </div>
        {this.props.dropdownOpen
            ?
              <div className="dropdown absolute">
                <div className="dropdownElement">One</div>
                <div className="dropdownElement">Two</div>
                <div className="dropdownElement">Three</div>
              </div>
            : null
          }
      </div>
  
    );
  }
}

const dropdown =  connect(mapStateToProps)(Dropdown);
export {dropdown as Dropdown};
