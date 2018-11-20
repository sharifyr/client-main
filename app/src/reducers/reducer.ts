import * as redux from "redux";
import * as path from "path";

import * as FormActions from "../actions/forms";
import * as UserActions from "../actions/user";
import * as ModalActions from "../actions/modal";
import * as UIActions from "../actions/ui";
import { Logger } from "../utils/logger";
import * as Store from "../stores/store";
import {IUserData} from "../stores/store";
import { ILoginFormData } from "../models/ILoginFormData";
import * as jwt from "jsonwebtoken";
import { IUserSerialized } from "../models/IUserSerialized";

const logger = new Logger();

export interface IForms {
  "login": ILoginFormData;
  "signup": ISignupFormData;
}

export interface IUIState {
  "preferencesDropdownToggle": boolean;
  "leftPanel": ILeftPanelState;
}

export interface ILeftPanelState {
  "selectedWidget": number;
  "widgets": ILeftPanelWidget[];
}

export interface ILeftPanelWidget {
  "name": string;
}

export interface ISignupFormField {
  "label": string;
  "name": string;
  "type": string;
  "onChange": (event: React.ChangeEvent<HTMLInputElement>) => void;
  "status": boolean;
}

export interface ISignupFormData {
  "username": string;
  "email": string;
  "firstName": string;
  "lastName": string;
  "password": string;
  "altPassword": string;
  "validUsername": boolean;
  "validEmail": boolean;
  "validPassword": boolean;
  "passwordMatch": boolean;
}

export const initialUIState: IUIState = {
  "preferencesDropdownToggle": false,
  "leftPanel": {
    "selectedWidget": 0,
    "widgets": [
      {
        "name": "Dashboard"
      },
      {
        "name": "Swagger"
      },
      {
        "name": "Contacts"
      },
      {
        "name": "ContactRequests"
      },
      {
        "name": "UserDiscovery"
      }
    ]
  }
};

const initialSignupFormState: ISignupFormData = {
  "username": "",
  "email": "",
  "firstName": "",
  "lastName": "",
  "password": "",
  "altPassword": "",
  "validUsername": false,
  "validEmail": false,
  "validPassword": false,
  "passwordMatch": true
};

export enum ModalTypes {
  LOGIN = "MODAL_LOGIN",
  SIGNUP = "MODAL_SIGNUP",
  NONE = "MODAL_NONE"
}

const initialLoginFormState: ILoginFormData =  {
  "username": "",
  "password": ""
};

export const initialFormsState = {
  "login": initialLoginFormState,
  "signup": initialSignupFormState
};

// export const initialUserState: IUser = {
//   "id": 0,
//   "firstName": "",
//   "lastName": "",
//   "avatar": ""
// };

export const initialUserDataState: IUserData = {
  "currentUserId": 0,
  "discoveryUsers": [],
  "auth": window.sessionStorage ? window.sessionStorage.accessToken || "" : "",
  "users": new Map<number, IUserSerialized>()
};

function addUsers(state: IUserData, users: IUserSerialized[]): IUserData {
  users.forEach((u) => state.users = state.users.set(u.id as number, u));
  return state;
}

function updateDiscovery(state: IUserData, users: number[]): IUserData {
  const allUsers = state.discoveryUsers.concat(users);
  const uniqueUsers = [...new Set(allUsers)];
  return {
    ...state,
    ...{"discoveryUsers": uniqueUsers}
  };
}

function login(state: IUserData, userId: number, authToken: string) {
  return {
    ...state,
    ...{"currentUserId": userId as number},
    ...{"auth": authToken}
  };
}

function userReducer(state: IUserData = initialUserDataState, action: UserActions.UserAction): IUserData {
  logger.info({"obj": {"action": action, "state": state}}, "reducer hit:");
  let updatedState: IUserData;
  switch (action.type) {
    case UserActions.UserActionTypes.SIGN_UP:
    case UserActions.UserActionTypes.LOG_IN:
      logger.info({"obj": {"action": action, "state": state}}, "reducer SIGN_UP/LOG_IN");
      const authToken = (action as UserActions.ISignupAction).authToken;
      const user = (action as UserActions.ISignupAction).user;

      if (window.sessionStorage) {// mocha tests run without session storage
         window.sessionStorage.accessToken = authToken;
      }
      updatedState = addUsers(state, [user]);
      updatedState = login(updatedState, user.id as number, authToken);
      return updatedState;
    case UserActions.UserActionTypes.LOG_OUT:
      if (window.sessionStorage) {
        delete window.sessionStorage.accessToken;
      }
      return login(state, 0, ""); // set values to default
    case UserActions.UserActionTypes.GET_USER:
      logger.info({"obj": {"action": action, "state": state}}, "reducer GET_USER");
      return addUsers(state, [action.user]);
    case UserActions.UserActionTypes.GET_USER_LIST:
      logger.info({"obj": {"action": action, "state": state}}, "reducer GET_USER_LIST");
      updatedState = addUsers(state, action.users);
      const incomingUserIds = action.users.map((u) => u.id as number);
      updatedState = updateDiscovery(updatedState, incomingUserIds);
      return updatedState;
    default:
    logger.info({"obj": state}, "userReducer default");
    return state;
  }
}

function formReducer(state: IForms = initialFormsState, action: FormActions.FormActions): IForms {
  logger.info({"obj": {"action": action, "state": state}}, "reducer hit:");
  switch (action.type) {
    case FormActions.FormActionTypes.LOGIN_EDIT:
      return {
        ...state,
        "login": (action as FormActions.ILoginFormEditAction).data
      };
    case FormActions.FormActionTypes.SIGNUP_EDIT:
      return {
        ...state,
        "signup": (action as FormActions.ISignupFormEditAction).data
      };
  }
  return state;

}

function modalReducer(state: ModalTypes = ModalTypes.NONE, action: ModalActions.ModalActions): ModalTypes {
  switch (action.type) {
    case ModalActions.ModalActionTypes.LOGIN_MODAL:
      return ModalTypes.LOGIN;
    case ModalActions.ModalActionTypes.SIGNUP_MODAL:
      return ModalTypes.SIGNUP;
    case ModalActions.ModalActionTypes.CLOSE_MODAL:
      return ModalTypes.NONE;
  }
  return state;
}

function uiReducer(state: IUIState = initialUIState, action: UIActions.UIActions): IUIState {
  switch (action.type) {
    case UIActions.UIActionTypes.TOGGLE_MENU:
      const toggledState = {
        ...state,
        ...{"preferencesDropdownToggle": action.open}
      };
      return toggledState;
  }

  return state;
}

const statePropertyToReducerMap = {
  "modal": (modalReducer as redux.Reducer<ModalTypes>),
  "userData": (userReducer as redux.Reducer<IUserData>),
  "forms": (formReducer as redux.Reducer<IForms>),
  "ui": (uiReducer as redux.Reducer<IUIState>)
};

export const reducers = redux.combineReducers<Store.IAppState>(statePropertyToReducerMap);
