import * as React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import { store } from "../stores/store";

interface IStateProps {
  "name": string;
}

const clickComponent = async (name: string) => {
  await store.dispatch(push(name));
};

const Component = (props: IStateProps) => {
  return (
    <div className="relative">
      <button className="accordion" onClick={() => clickComponent(props.name)}>{props.name}</button>
      <div className="fa-exclamation-circle notification-bang"></div>
    </div>
  );
};

export default Component;
