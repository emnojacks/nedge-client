import * as React from 'react';
import { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import { Button } from 'reactstrap'


interface ValidateSessionProps {
  updateSessionToken: (newToken: string) => void
  setIsAdmin: (isAdmin: boolean) => void;
}
 
interface ValidateSessionState {
  username: string,
  password: string,
  showsignup: boolean
  // climberProfile: Climber 
}
 
class ValidateSession extends Component<ValidateSessionProps, ValidateSessionState> {
    constructor(props: ValidateSessionProps) {
    super(props)
      this.state = {
        // climberProfile: {
        //   id: 0,
        //   username: " ",
        //   password: " "},
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
        setIsAdmin={this.props.setIsAdmin}
        // setClimberProfile={this.setClimberProfile}
     
      /> ) : 
      (<Login
        updateSessionToken={this.props.updateSessionToken}
        setIsAdmin={this.props.setIsAdmin}
        // setClimberProfile={this.setClimberProfile}
      />
      )
  }
    // setClimberProfile = (climber: Climber) => {
    //   this.setState({ climberProfile: climber })
    // };
  
    render() { 
      return ( 
        <div>
          {/* //conditionally displays log in or sign up forms */}
          {this.loginOrSignUpDisplay()}
          {this.state.showsignup ? (
         <Button
              color="link"
              onClick={this.toggleAuthType}>
              Actually I need to login
            </Button>) : (
              <Button
                color="link"
              onClick={this.toggleAuthType}>
              or create an account
          </Button>)
}
        </div>);
    }
}
export default ValidateSession;