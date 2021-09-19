import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
let APIURL ="http://localhost:3000"

interface SignupProps {
    updateSessionToken: (newToken: string) => void
}
 
interface SignupState {
  username: string
  password: string
  //isAdmin?: boolean
}

 
class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
    super(props)
    this.state = {
        username: "",
        password: ""
      }
  }
  
  handleSubmit = (event: React.FormEvent):void => {
        event.preventDefault();
        fetch(`${APIURL}/climber/create`, {
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
          <h1>Climber Signup</h1>
            <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                    
              <Label
                className="form-label"
                htmlFor="username">create username</Label>
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
                htmlFor="password">create password</Label>
              <Input
                pattern="^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$"
                title="Password must be at least 6 characters, and contain at least 1 uppercase character, a lowercase character, a number, and a special character."
                name="password"
                placeholder="S3cret!"
                type="password"
                aria-required="true"
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
            > Signup
            </Button> 
          </Form>
      
      </div>
      );
    }
}
 
export default Signup;