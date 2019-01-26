import { Inject } from "typescript-ioc";

import * as UserActions from "../actions/user";
import * as Store from "../stores/store";
import { ILogger } from "../utils/ILogger";
import { IState as ISignupState } from "../components/signup";
import { IUserSerialized } from "../models/IUserSerialized";
import { ILoginFormData } from "../models/ILoginFormData";
import { IUserClient } from "../clients/IUserClient";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {

  @Inject
  private userClient!: IUserClient;
  @Inject
  private logger!: ILogger;

  public signup = async (state: ISignupState) => {
    try {
      this.logger.info("signup service");
      const response = await this.userClient.signup(state);

      console.log("signup response0: ", response);
      console.log("signup response1: ", response.authToken);
      console.log("signup response2: ", response.user);
      Store.store.dispatch({
        "type": UserActions.UserActionTypes.SIGN_UP,
        "authToken": response.authToken,
        "user": response.user
      });
      console.log('signup dispatched');
    } catch (err) {
      this.logger.error("Error getting data: ", err);
    }
  }

  public getUser = async (userId: string) => {
    try {
      Store.store.dispatch({
        "type": UserActions.UserActionTypes.GET_USER,
        "user": await this.userClient.getUser(userId)
      });
    } catch (err) {
      this.logger.error("Error getting data: ", err);
    }
  }

  public getUserList = async () => {
    try {
      Store.store.dispatch({
        "type": UserActions.UserActionTypes.GET_USER_LIST,
        "users": await this.userClient.getUserList()
      });
    } catch (err) {
      this.logger.error("Error getting data: ", err);
    }
  }

  public del = async (state: IUserSerialized) => {
    try {
      await this.userClient.del(state);
      Store.store.dispatch({
        "type": UserActions.UserActionTypes.LOG_OUT
      });
    } catch (err) {
      this.logger.error("Error getting data: ", err);
    }
  }

  public login = async (state: ILoginFormData) => {
    try {
      const response = await this.userClient.login(state);
      Store.store.dispatch({
        "type": UserActions.UserActionTypes.LOG_IN,
        "authToken": response.authToken,
        "user": response.user
      });
    } catch (err) {
      this.logger.error("Error getting data: ", err);
    }
  }

  public logout() {
    Store.store.dispatch({
      "type": UserActions.UserActionTypes.LOG_OUT
    });
  }
}
