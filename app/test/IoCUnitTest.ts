import {Container} from "typescript-ioc";
import { UserService } from "../src/services/user";
import { IUserService } from "../src/services/IUserService";
import { UserClient } from "./mocks/userClient";
import { IUserClient } from "../src/clients/IUserClient";
import { IStore, Store } from "../src/stores/store";
import { IUserReducer, UserReducer } from "../src/reducers/UserReducer";
import { IFormReducer, FormReducer } from "../src/reducers/FormReducer";
import { IReducer, Reducer} from "../src/reducers/reducer";
import { IHttp } from "../src/utils/IHttp";
import { Http } from "../src/utils/http";
import { ILogger } from "../src/utils/ILogger";
import { Logger } from "./mocks/Logger";

export const configure = () => {
  Container.bind(IUserService).to(UserService);
  Container.bind(IUserClient).to(UserClient);
  Container.bind(IUserReducer).to(UserReducer);
  Container.bind(IFormReducer).to(FormReducer);
  Container.bind(IReducer).to(Reducer);
  Container.bind(IStore).to(Store);
  Container.bind(ILogger).to(Logger);
  Container.bind(IHttp).to(Http);
};
