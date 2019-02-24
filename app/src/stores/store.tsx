import * as redux from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory, History } from "history";
import { routerMiddleware } from "connected-react-router";
import { Inject } from "typescript-ioc";

import { IReducer, ModalTypes, IUIState, initialUIState } from "../reducers/reducer";
import { IForms, initialFormsState } from "../reducers/FormReducer";
import { IUserSerialized } from "../models/IUserSerialized";
import { ILogger } from "../utils/ILogger";

export interface IAppState {
  "modal": ModalTypes;
  "forms": IForms;
  "ui": IUIState;
  "userData": IUserData;
  "router": any;
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
  "ui": initialUIState,
  "router": null
};

export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

export abstract class IStore {
  public GetStore!: () => redux.Store<IAppState>
  public GetHistory!: () => History<any>;
}

export class Store implements IStore {

  private static store: redux.Store<IAppState>;
  private static history: History<any>;

  @Inject
  private reducer!: IReducer;

  @Inject
  private logger!: ILogger;

  public GetStore = () => {
    
    if(Store.history == null) {
      this.GetHistory();
    }
    
    if (Store.store == null) {
      this.logger.debug("getstore called; first run inits singleton");
      const historyMiddleware = routerMiddleware(history);
      Store.store = redux.createStore(
        this.reducer.getRootReducer(history),
        initialState,
        composeWithDevTools(redux.applyMiddleware(thunk, historyMiddleware))
      );
      
    }

    return Store.store;
  }

  public GetHistory = () => {
    if (Store.history == null) {
      Store.history = createBrowserHistory();
    }

    return Store.history;
  }
}
