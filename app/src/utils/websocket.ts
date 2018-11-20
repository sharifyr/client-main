import * as path from "path";

import { Logger } from "./logger";
import { store } from "../stores/store";

const logger = new Logger();

logger.info("websocket module loaded");

export class WebSocketConnectionSingleton {

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

      const userData = store.getState().userData;
      if ( userData !== null && userData.currentUserId !== null) {
        webSocket.send(JSON.stringify(userData));
      }
    };

    webSocket.onmessage = (message) => {
      logger.info({"obj": message}, "got message: ");
    };
  }
}
