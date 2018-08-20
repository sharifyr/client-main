import * as path from "path";

import Logger from "./logger";

const logger = Logger(path.basename(__filename));

logger.info("websocket module loaded");

export const webSocket = new WebSocket("ws://localhost:1337");

webSocket.onerror = (error) => {
  logger.info("error: ", error);
};

webSocket.onopen = (socket) => {
  logger.info("open: ", socket);
};

webSocket.onmessage = (message) => {
  logger.info("got message: ", message);
};
