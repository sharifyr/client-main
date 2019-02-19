import * as fs from "fs";
import * as bunyan from "bunyan";
import * as util from "util";
const bunyanLumberjack = require("bunyan-lumberjack");

import { ILogger } from "../../src/utils/ILogger";

export class Logger implements ILogger {

  public info = (...args: any[]) => {
    console.log("INFO:",util.inspect(args));
  }

  public warn = (...args: any[]) => {
    console.log("WARN:", util.inspect(args));
  }

  public debug = (...args: any[]) => {
    console.log("DEBUG:",util.inspect(args));
  }

  public error = (...args: any[]) => {
    console.log("ERROR:",util.inspect(args));
  }
}
