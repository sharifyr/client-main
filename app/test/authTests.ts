import { suite, test } from "mocha-typescript";
import "isomorphic-fetch";
import * as assert from "assert";
import * as jwt from "jsonwebtoken";

import * as IoC from "./IoCUnitTest";
import { IState as SignupState } from "../src/components/signup";
import * as Store from "../src/stores/store";
import { Container, Inject } from "typescript-ioc";
import { IUserService } from "../src/services/IUserService";



@suite class AuthProviderTests {

  @test public async canCreateUserAndLogin() {
    IoC.configure();
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
    const signupState = Store.store.getState();

    console.log('signupstate ', signupState);

    const jwtData = jwt.decode(Store.store.getState().userData.auth) as any;

    console.log("jwt data", jwtData);
    
    await userService.getUser(jwtData.id);
    const newUser = [...Store.store.getState().userData.users.values()][0];

    await userService.del(newUser);
    const deletedUser = [...Store.store.getState().userData.users.values()][0];

    assert.equal("first", newUser.firstName);
    assert.notEqual(0, newUser.id);

    // dispatch action. maybe rename access_token?

  }
}
