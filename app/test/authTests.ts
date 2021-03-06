import { suite, test } from "mocha-typescript";
import "isomorphic-fetch";
import * as assert from "assert";
import * as jwt from "jsonwebtoken";
import { Container, Inject } from "typescript-ioc";

import * as IoC from "./IoCUnitTest";
IoC.configure();

import { IState as SignupState } from "../src/components/signup";
import { IStore } from "../src/stores/store";
import { IUserService } from "../src/services/IUserService";


@suite class AuthProviderTests {

  @Inject
  private store!: IStore;

  @test public async canCreateUserAndLogin() {

    const signupData: SignupState = {
      "username": "myUser",
      "email": "myUser@example.com",
      "firstName": "first",
      "lastName": "last",
      "password": "password",
      "altPassword": "password",
      "validUsername": true,
      "validEmail": true,
      "validPassword": true,
      "passwordMatch": true,
      "contacts": []
    };
    const userService = Container.get(IUserService);
    await userService.signup(signupData);

    const signupState = this.store.GetStore().getState();

    const jwtData = jwt.decode(signupState.userData.auth) as any;
    
    await userService.getUser(jwtData.id);
    const newUser = [...this.store.GetStore().getState().userData.users.values()][0];

    await userService.del(newUser);
    const deletedUser = [...this.store.GetStore().getState().userData.users.values()][0];

    assert.equal("FirstName", newUser.firstName);
    assert.notEqual(0, newUser.id);

    // dispatch action. maybe rename access_token?

  }
}
