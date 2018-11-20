import * as React from "react";
import * as path from "path";
import {Inject} from "typescript-ioc";

import Button from "../components/button";
import { Logger } from "../utils/logger";
import { IUserService } from "../services/IUserService";
import * as ModalService from "../services/modal";
import { store } from "../stores/store";
import Modal from "../components/modal";
import Login from "../components/login";
import Signup from "../components/signup";
import Dropdown from "../components/dropdown";

const logger = new Logger();

interface INavBarProps {
  "loginModal": boolean;
  "signupModal": boolean;
  "loggedIn": boolean;
}
class Navbar extends React.Component<INavBarProps, {}> {

  @Inject
  private userService!: IUserService;

  private signupClick = () => {
    ModalService.openSignupModal()(store.dispatch);
  }

  private logoutClick = () => {
    this.userService.logout();
  }

  private loginClick = () => {
    logger.info("login Click");
    ModalService.openLoginModal()(store.dispatch);
  }

  private exitClick = () => {
    ModalService.closeModal()(store.dispatch);
  }

  public render = () => {
    const loggedOut = (
      <div>
        <div className={"width50 floatLeft"}>
          <Button text="Login" onClick={this.loginClick}/>
        </div>
        <div className={"width50 floatRight"}>
          <Button text="Signup" onClick={this.signupClick}/>
        </div>
      </div>
    );

    const loggedIn = (
      <div>
        <div className={"width50 floatLeft"}>
          <Button text="Logout" onClick={this.logoutClick}/>
        </div>
        <div className={"width50 floatRight"}>
          <Dropdown image={""} />
        </div>
      </div>
    );

    return (
      <div>
        <Modal isOpen={this.props.loginModal} onExitClick={this.exitClick}>
          <Login {...store.getState().forms.login}/>
        </Modal>
        <Modal isOpen={this.props.signupModal} onExitClick={this.exitClick}>
          <Signup {...store.getState().forms.signup}/>
        </Modal>
        <div>
          <div>
            {this.props.loggedIn ? loggedIn : loggedOut }
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
