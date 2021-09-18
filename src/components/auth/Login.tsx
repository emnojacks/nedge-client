import React, { Component } from 'react';


interface LoginProps {
    
}
 
interface LoginState {
    
}
 
class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
    super(props)
    this.state = { sessionToken: "" }
  }

    
    
    render() { 
      return ( 
        <div>
          Login Component
        </div>);
    }
}
 
export default Login;