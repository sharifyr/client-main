import * as React from "react";
import { connect } from "react-redux";

import { IAppState } from "../stores/store";
import { IUserSerialized } from "../models/IUserSerialized";
import { IContactService } from "../services/contacts";
import { IStore } from "../stores/store";
import { Inject } from "typescript-ioc";

interface IStateProps extends IOwnProps  {
  "user": IUserSerialized;
}

interface IOwnProps {
  "userId": number;
}

const mapStateToProps = (state: IAppState, props: IOwnProps): IStateProps => {
  return {
    "userId": props.userId,
    "user": ([...state.userData.users.values()].find((u) => u.id === props.userId) as IUserSerialized)
  };
};

class UserCard extends React.Component<IStateProps> {

  @Inject
  private store!:IStore;

  @Inject
  private contactService!: IContactService;

  private addUser = (userId: number) => {
    this.contactService.createRequest(userId);
  };

  public render() {
    return (
      <div className={"contactCard"}>
        <div className={"width20 floatRight fa-plus contactCardPlus"} onClick={() => this.addUser(this.props.userId)}></div>
        <div className={"title width75 floatLeft"}>{this.props.user.username}</div>
        <div className={"subtitle width75 floatLeft"}>
          {this.props.user.firstName + " " + this.props.user.lastName}
        </div>
      </div>
    );
  }
}

var userCard = connect(mapStateToProps)(UserCard)
export {userCard as UserCard};
