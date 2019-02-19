import * as redux from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import { Inject } from "typescript-ioc";

import { IReducer, ModalTypes, IUIState, initialUIState } from "../reducers/reducer";
import { IForms, initialFormsState } from "../reducers/FormReducer";
import { IUserSerialized } from "../models/IUserSerialized";
import { ILogger } from "../utils/ILogger";
import { Logger } from "client-main/app/test/mocks/Logger";

export interface IAppState {
  "modal": ModalTypes;
  "forms": IForms;
  "ui": IUIState;
  "userData": IUserData;
}

export interface IUserData {
  "currentUserId": number;
  "discoveryUsers": number[];
  "auth": string;
  "users": Map<number, IUserSerialized>;
}

const getAuthToken = () => {
  try {
      const token = window.sessionStorage ? window.sessionStorage.accessToken || "" : "";
      return token;
  } catch {
    console.log('getAuthToken exception (must be running tests)')
      return "";
  }
}

export const initialState: IAppState = {
  "modal": ModalTypes.NONE,
  "userData": {
    "currentUserId": 0,
    "discoveryUsers": [],
    "auth": getAuthToken(),
    "users": new Map<number, IUserSerialized>()
  },
  "forms": initialFormsState,
  "ui": initialUIState
};

export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

export abstract class IStore {
  public GetStore!: () => redux.Store<IAppState>
}

export class Store implements IStore {

  private static store: redux.Store<IAppState>;

  @Inject
  private reducer!: IReducer;

  @Inject
  private logger!: ILogger;

  public GetStore = () => {
    
    if (Store.store == null) {
      this.logger.debug("getstore called; first run inits singleton");
      Store.store = redux.createStore(
        this.reducer.getRootReducer(),
        initialState,
        composeWithDevTools(redux.applyMiddleware(thunk, historyMiddleware))
      );
      
    }

    return Store.store;
  }
}
