import * as React from 'react';
import { Component } from 'react';
import Login from './Login';
import Signup from './Signup';


interface ValidateSessionProps {
    
}
 
interface ValidateSessionState {
    
}
 
class ValidateSession extends Component<ValidateSessionProps, ValidateSessionState> {
    constructor(props: ValidateSessionProps) {
    super(props)
    this.state = { sessionToken: "" }
  }
    
    render() { 
      return ( 
          <div>
              <Login/>
              <Signup/>
        </div>);
    }
}
export default ValidateSession;