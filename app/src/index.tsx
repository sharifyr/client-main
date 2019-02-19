import * as IoC from "./dependencyResolution/IoC";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { Container } from "typescript-ioc";

import {history, IStore } from "./stores/store";
import LandingPage from "./pages/landing";
import NotFoundPage from "./pages/notFound";
import PrivateRoute from "./components/privateRoute";
import Api from "./pages/api";
import UserDiscovery from "./pages/userDiscovery";
import ContactRequests from "./pages/contactRequests";
import "./styles/basicTest.scss";
import "./styles/swagger-ui.css";
import {WebSocketConnectionSingleton} from "./utils/websocket";


IoC.configure();
WebSocketConnectionSingleton.Instance.connect();

const store = Container.get(IStore);

const App = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage as any}/>
        <PrivateRoute exact path="/Swagger" component={Api} />
        <PrivateRoute exact path="/UserDiscovery" component={UserDiscovery} />
        <PrivateRoute exact path="/ContactRequests" component={ContactRequests} />
        <PrivateRoute path="/*" component={NotFoundPage as any} />
      </Switch>
    </ConnectedRouter>
  </Provider>);

ReactDOM.render(App, document.getElementById("reactContainer"));
