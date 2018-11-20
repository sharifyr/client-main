import * as path from "path";
import { Inject } from "typescript-ioc";

import { config } from "../config";
import { IUserSerialized } from "../models/IUserSerialized";
import { ILoginFormData } from "../models/ILoginFormData";
import { IState as ISignupState } from "../components/signup";
import { IUserClient } from "./IUserClient";
import { IHttp } from "../utils/IHttp";
import { ILogger } from "../utils/ILogger";

export class UserClient implements IUserClient {

    @Inject
    private http!: IHttp;
    @Inject
    private logger!: ILogger;

    public signup = async (state: ISignupState) => {
        this.logger.info("userClient signup");
        const response = await this.http.Post(config.authDomain + "/user/signup", state);

        this.logger.info({"obj": response}, "signup response data: ");
        if (!response) {
          throw Error("No response returned from server");
        }
        return response as {"authToken": string, "user": IUserSerialized};
    }

    public getUser = async (userId: string) => {
        const response = await this.http.Get(config.authDomain + "/user/" + userId);

        this.logger.info({"obj": response}, "dispatching data: " + JSON.stringify(response));
        if (!response) {
          throw Error("No response returned from server");
        }
        return response as IUserSerialized;
    }

    public getUserList = async () => {
        const response = await this.http.Get(config.authDomain + "/user/");

        this.logger.info({"obj": response}, "dispatching data: " + JSON.stringify(response));
        if (!response) {
          throw Error("No response returned from server");
        }
        return response as IUserSerialized[];
    }

    public del = async (state: IUserSerialized) => {
        const response = await this.http.Delete(config.authDomain + "/user/" + state.id);
        this.logger.info({"obj": response}, "dispatching data: ");
        if (!response) {
          throw Error("No response returned from server");
        }
    }

    public login = async (state: ILoginFormData) => {
        this.logger.info({"obj": state}, "user service login state");
        const response = await this.http.Post(config.authDomain + "/user/login", state);

        this.logger.info({"obj": response}, "dispatching data: ");
        if (!response) {
          throw Error("No response returned from server");
        }
        return response as {"authToken": string, "user": IUserSerialized};
    }
}
