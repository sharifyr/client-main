import * as React from "react";

import * as ContactService from "../services/contacts";
import {store} from "../stores/store";

class UserDiscovery extends React.Component {
  public componentDidMount() {
    ContactService.getContacts()(store.dispatch);
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
