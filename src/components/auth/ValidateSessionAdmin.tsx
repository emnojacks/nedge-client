import * as React from 'react';
import { Component } from 'react';
import Login from './Login';
import Signup from './Signup';


interface ValidateSessionAdminProps {
    
}
 
interface ValidateSessionAdminState {
    
}
 
class ValidateSessionAdmin extends Component<ValidateSessionAdminProps, ValidateSessionAdminState> {
    constructor(props: ValidateSessionAdminProps) {
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
export default ValidateSessionAdmin;