import * as React from "react";
import {Inject} from "typescript-ioc";
import * as path from "path";
import { push } from "react-router-redux";

import { IUserService } from "../services/IUserService";
import { Logger } from "../utils/logger";
import { IStore } from "../stores/store";
import { ILoginFormData } from "../models/ILoginFormData";
import { FormService, IFormService } from "../services/forms";
import { IModalService, ModalService } from "../services/modal";

const logger = new Logger();

class Login extends React.Component<ILoginFormData, {}> {

  @Inject
  private userService!: IUserService;

  @Inject
  private formService!: IFormService;

  @Inject
  private store!: IStore;

  @Inject
  private modalService!: IModalService;

  private usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.formService.loginEditUsername(event.target.value);
  }

  private passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.formService.loginEditPassword(event.target.value);
  }

  public submit = async (formData: ILoginFormData) => {
    await this.userService.login(formData);
    const state = this.store.GetStore().getState();
    if (state.userData.auth !== "") {
      await this.modalService.closeModal();
      await this.store.GetStore().dispatch(push("/Api"));
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
