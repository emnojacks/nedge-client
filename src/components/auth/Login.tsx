import React, { Component } from "react";
import {Climber} from '../../types/Types'
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
let APIURL = "http://localhost:3000";

interface LoginProps {
  updateSessionToken: (newToken: string) => void;
  // setClimberProfile: (climber: Climber) => void
}

interface LoginState {
  username: string;
  password: string;
  //isAdmin?: boolean
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

    // setClimberProfile = (climber: Climber) => {
  //     this.setState({ climberProfile: climber })
  //   };
  
  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    fetch(`${APIURL}/climber/login`, {
      method: "POST",
      body: JSON.stringify({
        climber: {
          username: this.state.username,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        //takes the session token from the response and passes it to the updatetoken object
        {
          //displays what message the server has programmed
          window.alert(data.message);
          if (data.sessionToken) {
            this.props.updateSessionToken(data.sessionToken);
// this.setClimberProfile()
          }
        }
      )
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div>
        <h1>Climber Log In</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label className="form-label" htmlFor="username">
              username
            </Label>
            <Input
              name="username"
              placeholder="alexhandhold"
              type="text"
              aria-required="true"
              required
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
              value={this.state.username}
            />
          </FormGroup>

          <FormGroup>
            <Label className="form-label" htmlFor="password">
              password
            </Label>
            <Input
              pattern="^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$"
              title="Password must be at least 6 characters, and contain at least 1 uppercase character, a lowercase character, a number, and a special character."
              name="password"
              placeholder="S3cret!"
              aria-required="true"
              type="password"
              required
              minLength={6}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              value={this.state.password}
            />
          </FormGroup>
          <br></br>
          <Button className="btn-auth" type="submit">
            {" "}
            Login
          </Button>
        </Form>
        <br></br>
      </div>
    );
  }
}

export default Login;
