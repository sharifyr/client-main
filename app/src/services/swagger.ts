import * as path from "path";

import { Http } from "../utils/http";
import { config } from "../config";
import { Logger } from "../utils/logger";

const http = new Http();
const SwaggerUi = require("swagger-ui");
const logger = new Logger();

export const getSpec = async () => {
  try {
    const response = await http.Get(config.swaggerUrl);

    logger.info({"obj": response}, "swagger data: ");
    if (!response) {
      throw Error("No response returned from server");
    }
    const ui = SwaggerUi({
      "dom_id": "#swaggerContainer",
      "spec": response,
      "securitySchemes": {
        "JWT": {
          "type": "apiKey",
          "description": "",
          "name": "Authorization",
          "in": "header"
        }
      },
      "presets": [SwaggerUi.presets.apis],
    });

  } catch (err) {
    logger.error("Error getting data: ", err);
  }
};
