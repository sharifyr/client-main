import { IStore } from "../stores/store";
import * as FormActions from "../actions/forms";
import { Inject } from "typescript-ioc";

export abstract class IFormService {
  loginEditUsername!: (username: string) => void;
  loginEditPassword!: (password: string) => void;
  signupEditPassword!: (password: string) => void;
  signupEditAltPassword!: (altPassword: string) => void;
  signupEditEmail!: (email: string) => void;
  signupEditLastName!: (lastName: string) => void;
  signupEditFirstName!: (firstName: string) => void;
  signupEditUsername!: (username: string) => void;
}

export class FormService implements IFormService{

  @Inject
  private store!:IStore;
  
  public loginEditUsername = (username: string) => {
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.LOGIN_EDIT,
      "data": {
        ...this.store.GetStore().getState().forms.login,
        ...{
          "username": username
        }
      }
    });
  };
  
  public loginEditPassword = (password: string) => {
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.LOGIN_EDIT,
      "data": {
        ...this.store.GetStore().getState().forms.login,
        ...{
          "password": password
        }
      }
    });
  };
  
  public signupEditPassword = (password: string) => {
    const oldForm = this.store.GetStore().getState().forms.signup;
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.SIGNUP_EDIT,
      "data": {
        ...oldForm,
        ...{
          "password": password,
          "validPassword": password !== null,
          "passwordMatch": password === oldForm.altPassword
        }
      }
    });
  };
  
  public signupEditAltPassword = (altPassword: string) => {
    const oldForm = this.store.GetStore().getState().forms.signup;
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.SIGNUP_EDIT,
      "data": {
        ...oldForm,
        ...{
          "altPassword": altPassword,
          "passwordMatch": altPassword === oldForm.password
        }
      }
    });
  };
  
  public signupEditEmail = (email: string) => {
    const emailRegex = /\S+@\S+/;
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.SIGNUP_EDIT,
      "data": {
        ...this.store.GetStore().getState().forms.signup,
        ...{
          "email": email,
          "validEmail": emailRegex.test(email)
        }
      }
    });
  };
  
  public signupEditLastName = (lastName: string) => {
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.SIGNUP_EDIT,
      "data": {...this.store.GetStore().getState().forms.signup, ...{"lastName": lastName}}
    });
  };
  
  public signupEditFirstName = (firstName: string) => {
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.SIGNUP_EDIT,
      "data": {...this.store.GetStore().getState().forms.signup, ...{"firstName": firstName}}
    });
  };
  
  public signupEditUsername = (username: string) => {
    this.store.GetStore().dispatch({
      "type": FormActions.FormActionTypes.SIGNUP_EDIT,
      "data": {
        ...this.store.GetStore().getState().forms.signup,
        ...{
          "username": username,
          "validUsername": username !== null
        }
      }
    });
  };
}

