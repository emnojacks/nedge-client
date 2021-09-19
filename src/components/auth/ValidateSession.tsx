import * as React from 'react';
import { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import {Button} from 'reactstrap'

interface ValidateSessionProps {
     updateSessionToken: (newToken: string) => void
}
 
interface ValidateSessionState {
  username: string,
  password: string,
  showsignup: boolean
}
 
class ValidateSession extends Component<ValidateSessionProps, ValidateSessionState> {
    constructor(props: ValidateSessionProps) {
    super(props)
      this.state = {
        username: "",
        password: "",
        showsignup: false
      }
  }
  
   toggleAuthType = () => { 
     this.setState({
        username: "",
        password: "",
        showsignup: !this.state.showsignup
      })
  }
  
  loginOrSignUpDisplay = () => {
    return this.state.showsignup ? (
      <Signup
        updateSessionToken={this.props.updateSessionToken}
      /> ) : 
      (<Login
        updateSessionToken={this.props.updateSessionToken}
      />
      )
  }
   
    render() { 
      return ( 
        <div>
          {/* //conditionally displays log in or sign up forms */}
          {this.loginOrSignUpDisplay()}
          {this.state.showsignup ? (
         <Button
              onClick={this.toggleAuthType}>
              Actually I need to Login
            </Button>) : (
              <Button
              onClick={this.toggleAuthType}>
              Create New Account
          </Button>)
}
        </div>);
    }
}
export default ValidateSession;