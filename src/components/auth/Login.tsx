import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  InputGroup,
} from "reactstrap";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface LoginProps {
  updateSessionToken: (newToken: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface LoginState {
  username: string;
  password: string;
  isAdmin: boolean;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
    };
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    fetch(`${APIURL}/climber/login`, {
      method: "POST",
      body: JSON.stringify({
        climber: {
          username: this.state.username,
          password: this.state.password,
          isAdmin: this.state.isAdmin,
          //added the above to get rid of object undefined notification
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
            // if (data.isAdmin) {
            // this.props.updateAdmin(data.isAdmin);
            // }
            if (data.climber.isAdmin === true) {
              this.props.setIsAdmin(this.state.isAdmin);
              console.log("climber set to admin via login");
            }
          }
        }
      )
      .catch((error) => {
        window.alert(error.message);
      });
  };

  render() {
    return (
      <div>
        <Container className="spaced-div">
          <div className="content-header">
            <h2>climber log in</h2>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Label
                  className="form-label"
                  htmlFor="username"
                  style={{ marginRight: "1em" }}
                >
                  username
                </Label>

                <Input
                  className="sign-up-input-area"
                  name="username"
                  type="text"
                  aria-required="true"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ username: event.target.value })
                  }
                  value={this.state.username}
                />
              </InputGroup>
            </FormGroup>
            <br></br>
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Label
                  className="form-label"
                  htmlFor="password"
                  style={{ marginRight: "1em" }}
                >
                  password
                </Label>

                <Input
                  className="sign-up-input-area"
                  pattern="^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$"
                  title="Password must be at least 6 characters, and contain at least 1 uppercase character, a lowercase character, a number, and a special character."
                  name="password"
                  aria-required="true"
                  type="password"
                  required
                  minLength={6}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.state.password}
                />
              </InputGroup>
            </FormGroup>
            <Button className="btn-auth" type="submit" color="warning">
              login
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
