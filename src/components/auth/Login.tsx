import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
let APIURL ="http://localhost:3000"

interface LoginProps {
 updateSessionToken: (newToken: string) => void
}
 
interface LoginState {
  username: string
  password: string
  //isAdmin?: boolean
}
 
class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
    super(props)
      this.state = {
        username: "",
        password: ""
      }
    }
  
  handleSubmit = (event: React.FormEvent):void => {
        event.preventDefault();
        fetch(`${APIURL}/climber/login`, {
            method: "POST",
            body: JSON.stringify(
              {
                climber: {
                  username: this.state.username,
                  password: this.state.password
                }
              }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then((res) => res.json())
            .then((data) =>
                //takes the session token from the response and passes it to the updatetoken object
            {
                //displays what message the server has programmed
                window.alert(data.message);
                if (data.sessionToken) {
                this.props.updateSessionToken(data.sessionToken);
                }
            })
            .catch((error) => {
            console.log(error.message)
            })
    };

    render() { 
      return (
        <div>
         <h1>Climber LogIn</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                    
              <Label
                className="form-label"
                htmlFor="username">username</Label>
              <Input
                name="username"
                placeholder="alexhandhold"
                type="text"
                aria-required="true"
                required
                onChange={(event) => this.setState({ username: event.target.value })}
                value={this.state.username}
              />
            </FormGroup>
                
            <FormGroup>
              <Label
                className="form-label"
                htmlFor="password">password</Label>
              <Input
                name="password"
                placeholder="secrety-secret"
                aria-required="true"
                type="password"
                required
                minLength={6}
                onChange={(event) => this.setState({ password: event.target.value })}
                value={this.state.password}
              />
            </FormGroup>
            <br>
            </br>
            <Button
              className="btn-auth"
              type="submit"
            > Login
            </Button> 
          </Form>
          <br>
          </br>
        </div>);
    }
}
 
export default Login;