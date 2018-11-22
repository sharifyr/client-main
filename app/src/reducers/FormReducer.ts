import { Inject } from "typescript-ioc";

import { ILoginFormData } from "../models/ILoginFormData";
import * as FormActions from "../actions/forms";
import { ILogger } from "../utils/ILogger";

export interface IForms {
    "login": ILoginFormData;
    "signup": ISignupFormData;
}
const initialSignupFormState: ISignupFormData = {
    "username": "",
    "email": "",
    "firstName": "",
    "lastName": "",
    "password": "",
    "altPassword": "",
    "validUsername": false,
    "validEmail": false,
    "validPassword": false,
    "passwordMatch": true
};
export interface ISignupFormData {
    "username": string;
    "email": string;
    "firstName": string;
    "lastName": string;
    "password": string;
    "altPassword": string;
    "validUsername": boolean;
    "validEmail": boolean;
    "validPassword": boolean;
    "passwordMatch": boolean;
}
const initialLoginFormState: ILoginFormData =  {
    "username": "",
    "password": ""
};
export const initialFormsState = {
    "login": initialLoginFormState,
    "signup": initialSignupFormState
};

export interface IFormReducer {
    reducer: (state: IForms, action: FormActions.FormActions) => IForms;
}
export class FormReducer implements IFormReducer {

    @Inject
    private logger!: ILogger;

    public reducer = (state: IForms = initialFormsState, action: FormActions.FormActions) => {
        this.logger.info({"obj": {"action": action, "state": state}}, "reducer hit:");
        switch (action.type) {
        case FormActions.FormActionTypes.LOGIN_EDIT:
            return {
            ...state,
            "login": (action as FormActions.ILoginFormEditAction).data
            };
        case FormActions.FormActionTypes.SIGNUP_EDIT:
            return {
            ...state,
            "signup": (action as FormActions.ISignupFormEditAction).data
            };
        }
        return state;
    }
}
