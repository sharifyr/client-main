import * as redux from "redux";

import { Http } from "../utils/http";
import { config } from "../config";
import { IUserSerialized } from "../models/IUserSerialized";
import { Inject } from "typescript-ioc";
import { ILogger } from "../utils/ILogger";
import { IStore } from "../stores/store";

const http = new Http();
export abstract class IContactService {
  createRequest!: (userId: number) => void;
  getContacts!: () => void;
}

export class ContactService extends IContactService {

  @Inject
  private logger!: ILogger;

  @Inject
  private store!: IStore;

  public createRequest = async (userId: number) => {

      try {
        const response = await http.Put(config.authDomain + "/contacts/requests/" + userId, {});
  
        this.logger.info({"obj": response}, "signup response data: ");
        if (!response) {
          throw Error("No response returned from server");
        }
      } catch (err) {
        this.logger.error("Error getting data: ", err);
      }
  };
  
  public getContacts = async () => {

      try {
        const response = await http.Get(config.authDomain + "/contacts/requests");
  
        this.logger.info({"obj": response}, "signup response data: ");
        if (!response) {
          throw Error("No response returned from server");
        }
  
        // dispatch({
        //   "type": UserActions.UserActionTypes.SIGN_UP,
        //   "authToken": response.authToken,
        //   "user": response.user
        // });
      } catch (err) {
        this.logger.error("Error getting data: ", err);
      }

  };
}
