import * as React from "react";

import * as ContactService from "../services/contacts";
import { Inject } from "typescript-ioc";
import { IStore } from "../stores/store";

class UserDiscovery extends React.Component {
  
  @Inject
  private store!: IStore;

  public componentDidMount() {
    ContactService.getContacts()(this.store.GetStore().dispatch);
  }

  public render() {
    return (
      <div className={"mainPanel"}>
        <div className={"placeholderText"}>
          <div className={"width100"}>Contact Requests</div>
        </div>
      </div>
    );
  }
}

export default UserDiscovery;
