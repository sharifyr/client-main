import * as redux from "redux";
import { Inject } from "typescript-ioc";

import * as ModalActions from "../actions/modal";
import * as UIActions from "../actions/ui";
import { IAppState } from "../stores/store";
import { IUserReducer } from "./UserReducer";
import { IFormReducer, IForms } from "./FormReducer";
import { ILogger } from "../utils/ILogger";

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
  public getRootReducer!: () => redux.Reducer<IAppState>
}

export class Reducer implements IReducer {
  @Inject
  private userReducer!: IUserReducer;
  @Inject
  private formReducer!: IFormReducer;
  @Inject
  private logger!: ILogger;

  private static reducer: redux.Reducer<IAppState>;

  public getRootReducer = () => {

    if (Reducer.reducer == null) {
      this.logger.debug("get root reducer; first run inits singleton");
      Reducer.reducer = redux.combineReducers({
        "modal": (modalReducer as redux.Reducer<ModalTypes>),
        "userData": this.userReducer.reducer,
        "forms": (this.formReducer.reducer as redux.Reducer<IForms>),
        "ui": (uiReducer as redux.Reducer<IUIState>)
      });
    }
    return Reducer.reducer;
  }
}
