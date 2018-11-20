import {store} from "../stores/store";
import * as FormActions from "../actions/forms";

export const loginEditUsername = (username: string) => {
  store.dispatch({
    "type": FormActions.FormActionTypes.LOGIN_EDIT,
    "data": {
      ...store.getState().forms.login,
      ...{
        "username": username
      }
    }
  });
};

export const loginEditPassword = (password: string) => {
  store.dispatch({
    "type": FormActions.FormActionTypes.LOGIN_EDIT,
    "data": {
      ...store.getState().forms.login,
      ...{
        "password": password
      }
    }
  });
};

export const signupEditPassword = (password: string) => {
  const oldForm = store.getState().forms.signup;
  store.dispatch({
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

export const signupEditAltPassword = (altPassword: string) => {
  const oldForm = store.getState().forms.signup;
  store.dispatch({
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

export const signupEditEmail = (email: string) => {
  const emailRegex = /\S+@\S+/;
  store.dispatch({
    "type": FormActions.FormActionTypes.SIGNUP_EDIT,
    "data": {
      ...store.getState().forms.signup,
      ...{
        "email": email,
        "validEmail": emailRegex.test(email)
      }
    }
  });
};

export const signupEditLastName = (lastName: string) => {
  store.dispatch({
    "type": FormActions.FormActionTypes.SIGNUP_EDIT,
    "data": {...store.getState().forms.signup, ...{"lastName": lastName}}
  });
};

export const signupEditFirstName = (firstName: string) => {
  store.dispatch({
    "type": FormActions.FormActionTypes.SIGNUP_EDIT,
    "data": {...store.getState().forms.signup, ...{"firstName": firstName}}
  });
};

export const signupEditUsername = (username: string) => {
  store.dispatch({
    "type": FormActions.FormActionTypes.SIGNUP_EDIT,
    "data": {
      ...store.getState().forms.signup,
      ...{
        "username": username,
        "validUsername": username !== null
      }
    }
  });
};
