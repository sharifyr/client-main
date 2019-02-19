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
import { FormService, IFormService } from "../services/forms";
import { IUiService, UiService } from "../services/ui";
import { IModalService, ModalService } from "../services/modal";
import { IContactService, ContactService } from "../services/contacts";

export const configure = () => {
  Container.bind(IUserService).to(UserService);
  Container.bind(IFormService).to(FormService);
  Container.bind(IUiService).to(UiService);
  Container.bind(IContactService).to(ContactService);
  Container.bind(IModalService).to(ModalService);
  Container.bind(IUserClient).to(UserClient);
  Container.bind(IUserReducer).to(UserReducer);
  Container.bind(IFormReducer).to(FormReducer);
  Container.bind(ILogger).to(Logger);
  Container.bind(IHttp).to(Http);
};
