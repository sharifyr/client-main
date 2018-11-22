import * as redux from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";

import * as Reducers from "../reducers/reducer";
import { IForms, initialFormsState } from "../reducers/FormReducer";
import { IUserSerialized } from "../models/IUserSerialized";

export interface IAppState {
  "modal": Reducers.ModalTypes;
  "forms": IForms;
  "ui": Reducers.IUIState;
  "userData": IUserData;
}

export interface IUserData {
  "currentUserId": number;
  "discoveryUsers": number[];
  "auth": string;
  "users": Map<number, IUserSerialized>;
}

export const initialState: IAppState = {
  "modal": Reducers.ModalTypes.NONE,
  "userData": {
    "currentUserId": 0,
    "discoveryUsers": [],
    "auth": window.sessionStorage ? window.sessionStorage.accessToken || "" : "",
    "users": new Map<number, IUserSerialized>()
  },
  "forms": initialFormsState,
  "ui": Reducers.initialUIState
};

export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

export const store: redux.Store<IAppState> = redux.createStore(
  Reducers.reducers,
  initialState,
  composeWithDevTools((redux.applyMiddleware(thunk, historyMiddleware)))
);
