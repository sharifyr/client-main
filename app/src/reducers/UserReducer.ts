import { Inject } from "typescript-ioc";
import * as redux from "redux";

import {IUserData} from "../stores/store";
import * as UserActions from "../actions/user";
import { IUserSerialized } from "../models/IUserSerialized";
import { ILogger } from "../utils/ILogger";

export abstract class IUserReducer {
    public reducer!: redux.Reducer<IUserData>;
}

const getAuthToken = () => {
    try {
        const token = window.sessionStorage ? window.sessionStorage.accessToken || "" : "";
        return token;
    } catch {
        console.log('getAuthToken exception (must be running tests)')
        return "";
    }
}
export const initialUserDataState: IUserData = {
    "currentUserId": 0,
    "discoveryUsers": [],
    "auth": getAuthToken(),
    "users": new Map<number, IUserSerialized>()
};

export class UserReducer implements IUserReducer {

    @Inject
    private logger!: ILogger;

    private addUsers = (state: IUserData, users: IUserSerialized[]) => {
        users.forEach((u) => state.users = state.users.set(u.id as number, u));
        return state;
    }

    private updateDiscovery = (state: IUserData, users: number[]) => {
        const allUsers = state.discoveryUsers.concat(users);
        const uniqueUsers = [...new Set(allUsers)];
        return {
        ...state,
        ...{"discoveryUsers": uniqueUsers}
        };
    }

    private login = (state: IUserData, userId: number, authToken: string) => {
        return {
        ...state,
        ...{"currentUserId": userId as number},
        ...{"auth": authToken}
        };
    }

    public reducer = (state: IUserData = initialUserDataState, action: UserActions.UserAction) => {
        this.logger.info({"obj": {"action": action, "state": state}}, "reducer hit:");
        let updatedState: IUserData;
        switch (action.type) {
            case UserActions.UserActionTypes.SIGN_UP:
            case UserActions.UserActionTypes.LOG_IN:
            console.log("signup reducer");
                this.logger.info({"obj": {"action": action, "state": state}}, "reducer SIGN_UP/LOG_IN");
                const authToken = (action as UserActions.ISignupAction).authToken;
                const user = (action as UserActions.ISignupAction).user;
                console.log("trying window.sessionstorage")
                try {// tests throw an exception when window.sessionStorage accessed
                    if (window.sessionStorage) {// mocha tests run without session storage
                        window.sessionStorage.accessToken = authToken;
                    }
                } catch {

                }
                console.log("done trying window.sessionstorage")
                updatedState = this.addUsers(state, [user]);
                updatedState = this.login(updatedState, user.id as number, authToken);
                console.log('reducer returning');
                return updatedState;
            case UserActions.UserActionTypes.LOG_OUT:
                try {
                    if (window.sessionStorage) {
                        delete window.sessionStorage.accessToken;
                    }
                } catch {

                }

                return this.login(state, 0, ""); // set values to default
            case UserActions.UserActionTypes.GET_USER:
                console.log("get_user reducer")
                this.logger.info({"obj": {"action": action, "state": state}}, "reducer GET_USER");
                return this.addUsers(state, [action.user]);
            case UserActions.UserActionTypes.GET_USER_LIST:
                this.logger.info({"obj": {"action": action, "state": state}}, "reducer GET_USER_LIST");
                updatedState = this.addUsers(state, action.users);
                const incomingUserIds = action.users.map((u) => u.id as number);
                updatedState = this.updateDiscovery(updatedState, incomingUserIds);
                return updatedState;
            default:
            this.logger.info({"obj": state}, "userReducer default");
            return state;
        }
    }
}
