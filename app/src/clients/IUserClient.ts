import { IUserSerialized } from "../models/IUserSerialized";
import { ILoginFormData } from "../models/ILoginFormData";
import { IState as ISignupState } from "../components/signup";

export abstract class IUserClient {
    public signup!: (state: ISignupState) => Promise<{"authToken": string, "user": IUserSerialized}>;
    public getUser!: (userId: string) => Promise<IUserSerialized>;
    public getUserList!: () => Promise<IUserSerialized[]>;
    public del!: (state: IUserSerialized) => void;
    public login!: (state: ILoginFormData) => Promise<{"authToken": string, "user": IUserSerialized}>;
}
