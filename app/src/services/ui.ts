import * as UIActions from "../actions/ui";
import { IStore } from "../stores/store";
import { Inject } from "typescript-ioc";

export abstract class IUiService {
  toggleMenu!: () => void;
}

export class UiService {

  @Inject
  private store!: IStore;

  public toggleMenu = () => {
    this.store.GetStore().dispatch({
      "type": UIActions.UIActionTypes.TOGGLE_MENU,
      "open": !this.store.GetStore().getState().ui.preferencesDropdownToggle
    });
  };
}
