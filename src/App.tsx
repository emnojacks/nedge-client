//yes touch this

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {
  
}
 
interface AppState {
  sessionToken: null | string
  //this goes for both admin and nonadmin roles
}

//putting the token in the state not in the props bc props is readonly?
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { sessionToken: "" }
  }
  
  componentDidMount() {
    //this used to be useeffect
    //updates sessionToken state variable if browser has saved a sessionToken in localStorage.  
    if (localStorage.getItem("sessionToken")) {
      this.setState({
        sessionToken: localStorage.getItem("sessionToken")
      })
    }
  }
  
  //sets current token to new token
  updateSessionToken = (newToken: string) => {
    localStorage.setItem("sessionToken", newToken);
    this.setState({
      sessionToken: newToken
    });
  }
  
  //clear token at end of session 
    clearSessionToken = () => {
      localStorage.clear();
        this.setState({   sessionToken: ""});
    }
  
  
  userOnlyViews = () => {
    return this.state.sessionToken === localStorage.getItem("sessionToken") ?
      (<Component
        sessionToken={this.state.sessionToken} />)
      : (<Component
updateSessionToken = {this.updateSessionToken}/>)
}
    
  render() { 
    return (
      
      <div className="App">
        
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h1 className="appheader">NEDGE</h1>
      </header>
        
        <div>
        put components here 
        </div>
    </div>
 );
  }
}
 
export default App;

  

