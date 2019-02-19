import * as path from "path";
import * as jwt from "jsonwebtoken";
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
        const payload = {
            "id": 1,
            "iss": "sharifyr",
            "sub": this.user + "@localhost",
            "scopes": ["user"]
        };
    
        const jwtSignOptions: jwt.SignOptions = {
            "expiresIn": 1440 // expires in 24 hours
        };
        const token = jwt.sign(payload, "secret", jwtSignOptions);
        return {"authToken": token, "user": this.user};
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
