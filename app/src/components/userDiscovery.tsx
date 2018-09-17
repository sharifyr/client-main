import * as React from "react";

import UserCard from "./userCard";
import * as UserService from "../services/user";
import {store} from "../stores/store";

class UserDiscovery extends React.Component {
  public componentDidMount() {
    UserService.getUserList()(store.dispatch);
  }

  public render() {
    return (
      <div className={"mainPanel"}>
        <div className={"placeholderText"}>
          <div className={"width100"}>User Discovery</div>
          {store.getState().userData.discoveryUsers.map((uid) => <UserCard userId={uid}/>)}
        </div>
      </div>
    );
  }
}

export default UserDiscovery;
