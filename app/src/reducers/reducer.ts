import * as redux from "redux";
import { Inject } from "typescript-ioc";

import * as ModalActions from "../actions/modal";
import * as UIActions from "../actions/ui";
import { IUserData } from "../stores/store";
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
export abstract class IReducer {
  public getMap!: () => any
}

export class Reducer implements IReducer {
  @Inject
  private userReducer!: IUserReducer;
  @Inject
  private formReducer!: IFormReducer;

  private static reducer: any;
  public getMap = () => {

    if (Reducer.reducer == null) {
      console.log("get reducer map; first run inits singleton");
      Reducer.reducer = {
        "modal": (modalReducer as redux.Reducer<ModalTypes>),
        "userData": this.userReducer.reducer,
        "forms": (this.formReducer.reducer as redux.Reducer<IForms>),
        "ui": (uiReducer as redux.Reducer<IUIState>)
      };
    }
    console.log("get reducer map ", this.userReducer);
    return Reducer.reducer;
  }
}

// const reducerMap = Container.get(Reducer);
// const loadedMap = reducerMap.getMap();

// console.log("reducerMap got: ", loadedMap);
// export const reducers = () => loadedMap;
