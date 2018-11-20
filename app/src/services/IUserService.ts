import { IState as ISignupState } from "../components/signup";
import { IUserSerialized } from "../models/IUserSerialized";
import { ILoginFormData } from "../models/ILoginFormData";

export abstract class IUserService {
  public signup!: (state: ISignupState) => void;
  public getUser!: (userId: string) => void;
  public getUserList!: () => void;
  public del!: (state: IUserSerialized) => void;
  public login!: (state: ILoginFormData) => void;
  public logout!: () => void;
}
