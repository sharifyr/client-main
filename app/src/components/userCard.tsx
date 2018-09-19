import * as React from "react";
import { connect } from "react-redux";

import { IAppState } from "../stores/store";
import { IUserSerialized } from "../models/IUserSerialized";

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

const Component: React.SFC<IStateProps> = (props: IStateProps) => {
  return (
    <div className={"contactCard"}>
      <div className={"width20 floatRight fa-plus contactCardPlus"}></div>
      <div className={"title width75 floatLeft"}>{props.user.username}</div>
      <div className={"subtitle width75 floatLeft"}>{props.user.firstName + " " + props.user.lastName}</div>
    </div>
  );
};
export default connect(mapStateToProps)(Component);
