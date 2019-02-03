import {Container} from "typescript-ioc";
import { UserService } from "../services/user";
import { IUserService } from "../services/IUserService";
import { UserClient } from "../clients/userClient";
import { IUserClient } from "../clients/IUserClient";
import { IUserReducer, UserReducer } from "../reducers/UserReducer";
import { IFormReducer, FormReducer } from "../reducers/FormReducer";
import { Http } from "../utils/http";
import { IHttp } from "../utils/IHttp";

export const configure = () => {
  Container.bind(IUserService).to(UserService);
  Container.bind(IUserClient).to(UserClient);
  Container.bind(IUserReducer).to(UserReducer);
  Container.bind(IFormReducer).to(FormReducer);
  Container.bind(IHttp).to(Http);
};
