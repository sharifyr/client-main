import * as path from "path";
import * as redux from "redux";

import { Http } from "../utils/http";
import { config } from "../config";
import { Logger } from "../utils/logger";
import { IUserSerialized } from "../models/IUserSerialized";

const logger = new Logger();

const http = new Http();
export const createRequest = (userId: number) => {
  return async (dispatch: redux.Dispatch<IUserSerialized>) => {
    try {
      const response = await http.Put(config.authDomain + "/contacts/requests/" + userId, {});

      logger.info({"obj": response}, "signup response data: ");
      if (!response) {
        throw Error("No response returned from server");
      }
    } catch (err) {
      logger.error("Error getting data: ", err);
    }
  };
};

export const getContacts = () => {
  return async (dispatch: redux.Dispatch<IUserSerialized>) => {
    try {
      const response = await http.Get(config.authDomain + "/contacts/requests");

      logger.info({"obj": response}, "signup response data: ");
      if (!response) {
        throw Error("No response returned from server");
      }

      // dispatch({
      //   "type": UserActions.UserActionTypes.SIGN_UP,
      //   "authToken": response.authToken,
      //   "user": response.user
      // });
    } catch (err) {
      logger.error("Error getting data: ", err);
    }
  };
};