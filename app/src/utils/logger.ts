import * as bunyan from "browser-bunyan";

import { ILogger } from "./ILogger";

export class Logger implements ILogger {

  private logger: any;

  constructor() {
    this.logger = bunyan.createLogger({
      "name": "<missing filename>",
      "streams": [
        {
          "level": "info",
          "stream": new bunyan.ConsoleFormattedStream()
        }
      ],
      "serializers": bunyan.stdSerializers,
      "src": true
    });
  }

  public info = (...args: any[]) => {
    this.logger.info(args);
  }

  public warn = (...args: any[]) => {
    this.logger.warn(args);
  }

  public debug = (...args: any[]) => {
    this.logger.debug(args);
  }

  public error = (...args: any[]) => {
    this.logger.error(args);
  }
}
