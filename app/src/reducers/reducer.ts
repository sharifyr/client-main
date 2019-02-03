import * as redux from "redux";
import { Inject, Container } from "typescript-ioc";

import * as ModalActions from "../actions/modal";
import * as UIActions from "../actions/ui";
import * as Store from "../stores/store";
import {IUserData} from "../stores/store";
import { IUserReducer } from "./UserReducer";
import { IFormReducer, IForms } from "./FormReducer";

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

export enum ModalTypes {
  LOGIN = "MODAL_LOGIN",
  SIGNUP = "MODAL_SIGNUP",
  NONE = "MODAL_NONE"
}

// export const initialUserState: IUser = {
//   "id": 0,
//   "firstName": "",
//   "lastName": "",
//   "avatar": ""
// };

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

export class ReducerMap {
  @Inject
  private userReducer!: IUserReducer;
  @Inject
  private formReducer!: IFormReducer;
  public getMap = () => {
    console.log("do we have reducers? ", this.userReducer);
    return {
      "modal": (modalReducer as redux.Reducer<ModalTypes>),
      "userData": (this.userReducer.reducer as redux.Reducer<IUserData>),
      "forms": (this.formReducer.reducer as redux.Reducer<IForms>),
      "ui": (uiReducer as redux.Reducer<IUIState>)
    };
  }
}

const reducerMap = Container.get(ReducerMap);
const loadedMap = reducerMap.GetMap();


console.log("reducerMap got: ", reducerMap);
export const reducers = () => loadedMap;
