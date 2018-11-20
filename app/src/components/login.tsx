import * as React from "react";
import {Inject} from "typescript-ioc";
import * as path from "path";
import { push } from "react-router-redux";

import { IUserService } from "../services/IUserService";
import { Logger } from "../utils/logger";
import { store } from "../stores/store";
import { ILoginFormData } from "../models/ILoginFormData";
import * as FormService from "../services/forms";
import * as ModalService from "../services/modal";

const logger = new Logger();

class Login extends React.Component<ILoginFormData, {}> {

  @Inject
  private userService!: IUserService;

  private usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.loginEditUsername(event.target.value);
  }

  private passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.loginEditPassword(event.target.value);
  }

  public submit = async (formData: ILoginFormData) => {
    await this.userService.login(formData);
    const state = store.getState();
    if (state.userData.auth !== "") {
      await ModalService.closeModal()(store.dispatch);
      await store.dispatch(push("/Api"));
    } else {
      logger.info("Login failed!");
    }
  }

  public render = () => {
    return (
      <form>
        <p>username</p><input type="text" onChange={this.usernameChange}/>
        <p>password</p><input type="password" onChange={this.passwordChange}/>
        <input type="button" value="Submit" onClick={() => this.submit(this.props)}/>
      </form>
    );
  }
}

export default Login;
