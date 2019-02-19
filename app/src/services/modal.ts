import * as redux from "redux";
import * as ModalActions from "../actions/modal";
import { Inject } from "typescript-ioc";
import { IStore } from "../stores/store";

export abstract class IModalService {
  openLoginModal!: () => void;
  openSignupModal!: () => void;
  closeModal!: () => void;
}

export class ModalService extends IModalService {

  @Inject
  private store!: IStore;

  public openLoginModal = () => {
    this.store.GetStore().dispatch({
      "type": ModalActions.ModalActionTypes.LOGIN_MODAL
    });
  };

  public openSignupModal = () => {
    this.store.GetStore().dispatch({
      "type": ModalActions.ModalActionTypes.SIGNUP_MODAL
    });
  };
  
  public closeModal = () => {
    this.store.GetStore().dispatch({
      "type": ModalActions.ModalActionTypes.CLOSE_MODAL
    });
  };
}