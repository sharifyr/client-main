import * as fs from "fs";
import * as bunyan from "bunyan";
const bunyanLumberjack = require("bunyan-lumberjack");

import { ILogger } from "../../src/utils/ILogger";

export class Logger implements ILogger {

  //private logger: bunyan;
  private outStream: any;
  private projectName = "client-main";

  constructor() {
    // this.outStream = bunyanLumberjack({
    //     "tlsOptions": {
    //         "host": "logstash",
    //         "port": 5000,
    //         "ca": [fs.readFileSync("./snakeoilcert.pem", {"encoding": "utf-8"})]
    //     },
    //     "metadata": {"beat": "example", "type": "default"}
    // });
    // this.logger = bunyan.createLogger({
    //     "name": this.projectName,
    //     "src": true,
    //     "streams": [{"level": "info", "type": "raw", "stream": this.outStream}]
    // });
    // this.outStream.on("connect", () => {
    //     this.logger.info("Logger connected to stream");
    // });
    // this.outStream.on("dropped", (count: any) => {
    //     console.log("ERROR: Logger dropped " + count + " messages");
    // });
    // this.outStream.on("disconnect", (err: any) => {
    //     console.log("WARN : Logger disconnected", err);
    // });
  }

  public info = (...args: any[]) => {
    //this.logger.info(args);
  }

  public warn = (...args: any[]) => {
    //this.logger.warn(args);
  }

  public debug = (...args: any[]) => {
    //this.logger.debug(args);
  }

  public error = (...args: any[]) => {
    //this.logger.error(args);
  }
}
