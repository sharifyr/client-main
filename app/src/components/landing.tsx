import * as React from "react";
import * as path from "path";

import NavBar from "../components/navbar";
import { IAppState } from "../stores/store";
import { ModalTypes } from "../reducers/reducer";
import { connect } from "react-redux";

interface IStateProps {
  "loginModal": boolean;
  "signupModal": boolean;
  "loggedIn": boolean;
}

const mapStateToProps = (state: IAppState, props: {}): IStateProps => {
  return {
    "loginModal": state.modal === ModalTypes.LOGIN,
    "signupModal": state.modal === ModalTypes.SIGNUP,
    "loggedIn": state.userData.auth !== ""
  };
};

const Component = (props: IStateProps) => {
  return (
    <div className={"placeholderText"}>
      <NavBar {...props} />
      <div>
        <h1>Sharifyr</h1>
        <h2>File Sharing. Socialized, Decentralized, Private.</h2>
        <p>Have you ever wanted to retrieve files on your home computer while on the go?</p>
        <p>Have you ever run into <a href="https://xkcd.com/949/">problems sending data to a friend?</a></p>
        <p>Are you reluctant to put your data in the hands of centralized cloud providers?</p>
        <p>Take back control of your data. Try Sharifyr.</p>
      </div>
      <div>
        <h2>Easy Signup</h2>
        <div className="landingBlock">
          <img className="landingImg" src="./Signup.png"/>
          <p className="landingParagraph">We aren't interested in your life story.
            Pick a username to share with your friends.
            Give us an email if you want to be able to recover a lost account.
            The rest is up to you.</p>
        </div>
        <h2>Find and Organize Friends</h2>
        <div className="landingBlock">
          <img className="landingImg" src="./UserDiscovery.png"/>
          <p className="landingParagraph">We make it easy to find those you care about.
            The data you see and share is limited to your circle of contacts.</p>
        </div>
        <h2>Add Files</h2>
        <div className="landingBlock">
          <p className="landingParagraph">Set up a background agent on your home desktop.
            As long as your home computer is on, you can download your files from anywhere you can access a browser.</p>
        </div>
        <h2>Manage Content Access</h2>
        <div className="landingBlock">
          <p className="landingParagraph">Let's face it.
            You might not want to share your spring break photos with your grandmother.
            We give you the power to decide who has access to what from your hosted content.</p>
        </div>
        <h2>Discover Content</h2>
        <div className="landingBlock">
          <p className="landingParagraph">
            Once you are all set up, we make it simple to search your entire peer network for content
            </p>
        </div>
        <h2>Download and Enjoy!</h2>
        <div className="landingBlock">
          <p className="landingParagraph">Files move from peer to peer.
            By removing ourselves as a central resource bottleneck we can focus on what we do best:
            enabling our users to share their lives with each other.</p>
          </div>
        <h2>First-Class Documentation</h2>
        <div className="landingBlock">
          <img className="landingImg" src="./ApiDashboard.png"/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Component);
