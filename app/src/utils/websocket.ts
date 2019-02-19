import * as path from "path";

import { Logger } from "./logger";
import { IStore } from "../stores/store";
import { Inject } from "typescript-ioc";

const logger = new Logger();

logger.info("websocket module loaded");

export class WebSocketConnectionSingleton {

  @Inject
  private store!: IStore;
  private static instance: WebSocketConnectionSingleton;
  private constructor() {}

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  public connect = () => {
    const webSocket: WebSocket = new WebSocket("ws://localhost:1337");
    webSocket.onerror = (error) => {
      logger.info({"obj": error}, "error: ");
    };

    webSocket.onopen = (socket) => {
      logger.info({"obj": socket}, "open: ");

      const userData = this.store.GetStore().getState().userData;
      if ( userData !== null && userData.currentUserId !== null) {
        webSocket.send(JSON.stringify(userData));
      }
    };

    webSocket.onmessage = (message) => {
      logger.info({"obj": message}, "got message: ");
    };
  }
}
