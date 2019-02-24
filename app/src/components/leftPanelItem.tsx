import * as React from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import { IStore } from "../stores/store";
import { Inject } from "typescript-ioc";

interface IStateProps {
  "name": string;
}

export class LeftPanelItem extends React.Component<IStateProps> {

  @Inject
  private store!: IStore;

  private clickComponent = async (name: string) => {
    console.log("clicked component. about to dispatch push", name)
    await this.store.GetStore().dispatch(push(name));
  };
  public render() {
    return (
      <div className="relative">
        <button className="accordion" onClick={() => this.clickComponent(this.props.name)}>
          {this.props.name}
        </button>
      </div>
    );
  }
}


