import {Container} from "typescript-ioc";
import { UserService } from "../src/services/user";
import { IUserService } from "../src/services/IUserService";
import { UserClient } from "./mocks/userClient";
import { IUserClient } from "../src/clients/IUserClient";
import { IHttp } from "../src/utils/IHttp";
import { Http } from "../src/utils/http";
import { ILogger } from "../src/utils/ILogger";
import { Logger } from "./mocks/Logger";

export const configure = () => {
  Container.bind(IUserService).to(UserService);
  Container.bind(IUserClient).to(UserClient);
  Container.bind(IHttp).to(Http);
  Container.bind(ILogger).to(Logger);
};
