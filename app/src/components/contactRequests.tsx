import * as React from "react";

import { ContactService, IContactService } from "../services/contacts";
import { Inject } from "typescript-ioc";
import { IStore } from "../stores/store";

class UserDiscovery extends React.Component {
  
  @Inject
  private store!: IStore;

  @Inject
  private contactService!: IContactService;

  public componentDidMount() {
    this.contactService.getContacts();
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
