import * as path from "path";
import { IUserSerialized } from "../../src/models/IUserSerialized";
import { ILoginFormData } from "../../src/models/ILoginFormData";
import { IState as ISignupState } from "../../src/components/signup";
import { IUserClient } from "../../src/clients/IUserClient";
import { ILogger } from "../../src/utils/ILogger";
import { Inject } from "typescript-ioc";

export class UserClient implements IUserClient {

    @Inject
    private logger!: ILogger;

    private user: IUserSerialized = {
        "firstName": "FirstName",
        "lastName": "LastName",
        "email": "email@email.com",
        "username": "username",
        "password": "password",
        "contacts": []
      };

    public signup = async (state: ISignupState) => {
        this.logger.info("mock signup");
        return {"authToken": "token", "user": this.user};
    }

    public getUser = async (userId: string) => {
        return this.user;
    }

    public getUserList = async () => {
        return [this.user];
    }

    public del = async (state: IUserSerialized) => {
        return;
    }

    public login = async (state: ILoginFormData) => {
        return {"authToken": "token", "user": this.user};
    }
}
