import * as React from "react";
import {Inject} from "typescript-ioc";
import * as jwt from "jsonwebtoken";
import { connect } from "react-redux";
import * as path from "path";

import { IAppState, store } from "../stores/store";
import { ISignupFormData } from "../reducers/FormReducer";
import SignupField from "../components/signupField";
import { IUserService } from "../services/IUserService";
import * as FormService from "../services/forms";
import { Logger } from "../utils/logger";
import { IState as ISignupState } from "../components/signup";

const logger = new Logger();
export interface IState {
  "username": string;
  "email": string;
  "firstName": string;
  "lastName": string;
  "password": string;
  "altPassword": string;
  "validUsername": boolean;
  "validEmail": boolean;
  "validPassword": boolean;
  "passwordMatch": boolean;
  "contacts": IState[];
}

class Signup extends React.Component<ISignupFormData, {}> {

  @Inject
  private userService!: IUserService;

  public static mapStateToProps = (state: IAppState, props: ISignupFormData): ISignupFormData => {
    logger.info({"obj": state}, "signup mapping state to props");
    return state.forms.signup;
  }

  constructor(props: ISignupFormData) {
    super(props);
  }

  private usernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.signupEditUsername(event.target.value);
  }

  private firstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.signupEditFirstName(event.target.value);
  }

  private lastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.signupEditLastName(event.target.value);
  }

  private emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.signupEditEmail(event.target.value);
  }

  private passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.signupEditPassword(event.target.value);
  }

  private altPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    FormService.signupEditAltPassword(event.target.value);
  }

  private submit = async (formData: ISignupFormData) => {
    logger.info({"obj": formData}, "submit clicked");
    if (formData.validUsername
      && formData.validEmail
      && formData.validPassword
      && formData.passwordMatch) {
      await this.userService.signup({...formData, ...{"contacts": []}});
      const state = store.getState();
      const jwtData = (jwt.decode(state.userData.auth)as any);
      const userId = jwtData.id;
      await this.userService.getUser(userId as string);
    }
  }

  public render = () => {
    return (
      <form>
        <div>
          <SignupField
            label={"username"}
            name={"username"}
            type={"text"}
            status={this.props.validUsername}
            onChange={this.usernameChange}/>
          <SignupField
            label={"first name"}
            name={"firstname"}
            type={"text"}
            status={true}
            onChange={this.firstNameChange}/>
          <SignupField
            label={"last name"}
            name={"lastname"}
            type={"text"}
            status={true}
            onChange={this.lastNameChange}/>
          <SignupField
            label={"email"}
            name={"email"}
            type={"text"}
            status={this.props.validEmail}
            onChange={this.emailChange}/>
          <SignupField
            label={"password"}
            name={"password"}
            type={"password"}
            status={this.props.passwordMatch}
            onChange={this.passwordChange}/>
          <SignupField
            label={"repeat password"}
            name={"altpassword"}
            type={"password"}
            status={this.props.passwordMatch}
            onChange={this.altPasswordChange}/>
          <div>
            <input type="button" value="Submit" onClick={() => this.submit(this.props)}/>
          </div>
        </div>
      </form>
    );
  }

}
export default connect(Signup.mapStateToProps)(Signup);
