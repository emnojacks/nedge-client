import * as React from "react";
import { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Button, Container } from "reactstrap";

interface ValidateSessionProps {
  updateSessionToken: (newToken: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface ValidateSessionState {
  username: string;
  password: string;
  showsignup: boolean;
}

class ValidateSession extends Component<
  ValidateSessionProps,
  ValidateSessionState
> {
  constructor(props: ValidateSessionProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showsignup: false,
    };
  }

  toggleAuthType = () => {
    this.setState({
      username: "",
      password: "",
      showsignup: !this.state.showsignup,
    });
  };

  loginOrSignUpDisplay = (): JSX.Element => {
    return this.state.showsignup ? (
      <Signup
        updateSessionToken={this.props.updateSessionToken}
        setIsAdmin={this.props.setIsAdmin}
      />
    ) : (
      <Login
        updateSessionToken={this.props.updateSessionToken}
        setIsAdmin={this.props.setIsAdmin}
      />
    );
  };

  render() {
    return (
      <div>
        <Container>
          {this.loginOrSignUpDisplay()}
          {this.state.showsignup ? (
            <Button
              color="link"
              className="btn-link-auth-toggle"
              onClick={this.toggleAuthType}
            >
              actually I need to login
            </Button>
          ) : (
            <Button
              color="link"
              className="btn-link-auth-toggle"
              onClick={this.toggleAuthType}
            >
              actually I need to create an account
            </Button>
          )}
        </Container>
      </div>
    );
  }
}
export default ValidateSession;
