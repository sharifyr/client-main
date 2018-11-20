import * as path from "path";

import { ILogger  } from "../utils/ILogger";
import { config } from "../config";
import { store } from "../stores/store";
import { IHttp } from "./IHttp";
import { Inject } from "typescript-ioc";

export class Http implements IHttp {

  @Inject
  private logger!: ILogger;

  public Get = (url: string): Promise<any> => {

    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", config.authDomain);

    const auth = store.getState().userData.auth;
    if ( auth !== null) {
      myHeaders.append("Authorization", "Bearer " + auth);
    }

    const cache = "default" as "default" | "no-store" | "reload" | "no-cache" | "force-cache" | undefined;
    const mode = "cors" as "cors" | "navigate" | "same-origin" | "no-cors" | undefined;
    const requestConfig = {
      "method": "GET",
      "headers": myHeaders,
      "mode": mode,
      "cache": cache
    };

    const request = new Request(url, requestConfig);

    return fetch(request).then((response) => {
      this.logger.info("response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response: any) => {
      this.logger.info("response: ", response);
      return response;
    })
    .catch((err: any) => {
      this.logger.info("fetch error: ", err);
      return null;
    });

  }

  public Delete = (url: string): Promise<any> => {

    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", config.authDomain);

    const auth = store.getState().userData.auth;
    if ( auth !== null) {
      myHeaders.append("Authorization", "Bearer " + auth);
    }

    const cache = "default" as "default" | "no-store" | "reload" | "no-cache" | "force-cache" | undefined;
    const mode = "cors" as "cors" | "navigate" | "same-origin" | "no-cors" | undefined;
    const requestConfig = {
      "method": "DELETE",
      "headers": myHeaders,
      "mode": mode,
      "cache": cache
    };

    const request = new Request(url, requestConfig);

    return fetch(request).then((response) => {
      this.logger.info("response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response: any) => {
      this.logger.info("response: ", response);
      return response;
    })
    .catch((err: any) => {
      this.logger.info("fetch error: ", err);
      return null;
    });

  }

  public Post = (url: string, data: any): Promise<any> => {
    this.logger.info({"obj": data}, "posting body");
    const body = new FormData();
    // Object.keys(data).map((value: string, index: number)=>{body.append(value, data[value])});
    body.append( "json", JSON.stringify( data ) );
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", config.authDomain);
    myHeaders.append("Content-Type", "application/json; charset=utf-8");

    const auth = store.getState().userData.auth;
    if ( auth !== null) {
      myHeaders.append("Authorization", "Bearer " + auth);
    }

    const cache = "default" as "default" | "no-store" | "reload" | "no-cache" | "force-cache" | undefined;
    const mode = "cors" as "cors" | "navigate" | "same-origin" | "no-cors" | undefined;
    const requestConfig = {
      "method": "POST",
      "headers": myHeaders,
      "mode": mode,
      "cache": cache,
      "body": JSON.stringify(data)
    };

    const request = new Request(url, requestConfig);

    return fetch(request).then((response) => {
      this.logger.info("response", response);
      return response.json();
    })
    .then((response: any) => {
      this.logger.info("response: ", response);
      return response;
    })
    .catch((err: any) => {
      this.logger.info("error: ", err);
    });

  }

  public Put = (url: string, data: any): Promise<any> => {
    this.logger.info({"obj": data}, "put body");
    this.logger.info({"obj": config.authDomain}, "put auth domain");
    const body = new FormData();
    // Object.keys(data).map((value: string, index: number)=>{body.append(value, data[value])});
    body.append( "json", JSON.stringify( data ) );
    const myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", config.authDomain);
    myHeaders.append("Content-Type", "application/json; charset=utf-8");

    const auth = store.getState().userData.auth;
    if ( auth !== null) {
      myHeaders.append("Authorization", "Bearer " + auth);
    }

    const cache = "default" as "default" | "no-store" | "reload" | "no-cache" | "force-cache" | undefined;
    const mode = "cors" as "cors" | "navigate" | "same-origin" | "no-cors" | undefined;
    const requestConfig = {
      "method": "PUT",
      "headers": myHeaders,
      "mode": mode,
      "cache": cache,
      "body": JSON.stringify(data)
    };

    const request = new Request(url, requestConfig);

    return fetch(request).then((response) => {
      this.logger.info("response", response);
      return response.json();
    })
    .then((response: any) => {
      this.logger.info("response: ", response);
      return response;
    })
    .catch((err: any) => {
      this.logger.info("error: ", err);
    });

  }
}
