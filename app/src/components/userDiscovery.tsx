import * as React from "react";
import {Inject} from "typescript-ioc";

import UserCard from "./userCard";
import { IUserService } from "../services/IUserService";
import {store} from "../stores/store";

class UserDiscovery extends React.Component {

  @Inject
  private userService!: IUserService;

  public componentDidMount = () => {
    this.userService.getUserList();
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
