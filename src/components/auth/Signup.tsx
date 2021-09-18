import React, { Component } from 'react';


interface SignupProps {
    
}
 
interface SignupState {
    
}
 
class Signup extends Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
    super(props)
    this.state = { sessionToken: "" }
  }
    
    render() { 
      return ( 
          <div>
              Signup Component
        </div>);
    }
}
 
export default Signup;