import * as path from "path";

import * as http from "../utils/http";
import { config } from "../config";
import Logger from "../utils/logger";

const SwaggerUi = require("swagger-ui");
const logger = Logger(path.normalize(path.basename(__filename)));

export const getSpec = async () => {
  try {
    const response = await http.get(config.swaggerUrl);

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
