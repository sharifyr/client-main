import * as fs from "fs";
import * as bunyan from "bunyan";
const bunyanLumberjack = require("bunyan-lumberjack");

import { ILogger } from "../../src/utils/ILogger";

export class Logger implements ILogger {

  public info = (...args: any[]) => {
    console.log("INFO:",args);
  }

  public warn = (...args: any[]) => {
    console.log("WARN:",args);
  }

  public debug = (...args: any[]) => {
    console.log("DEBUG:",args);
  }

  public error = (...args: any[]) => {
    console.log("ERROR:",args);
  }
}
