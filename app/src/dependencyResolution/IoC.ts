import {Container} from "typescript-ioc";
import { UserService } from "../services/user";
import { IUserService } from "../services/IUserService";
import { UserClient } from "../clients/userClient";
import { IUserClient } from "../clients/IUserClient";
import { IUserReducer, UserReducer } from "../reducers/UserReducer";
import { IFormReducer, FormReducer } from "../reducers/FormReducer";
import { ILogger } from "../utils/ILogger";
import { Logger } from "../utils/logger";
import { Http } from "../utils/http";
import { IHttp } from "../utils/IHttp";

console.log("IOC imported")
export const configure = () => {
  console.log("IOC set up")
  Container.bind(IUserService).to(UserService);
  Container.bind(IUserClient).to(UserClient);
  Container.bind(IUserReducer).to(UserReducer);
  Container.bind(IFormReducer).to(FormReducer);
  Container.bind(ILogger).to(Logger);
  Container.bind(IHttp).to(Http);
};
