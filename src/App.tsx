//yes touch this

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/site/Navigation'
import Footer from './components/site/Footer'
import ValidateSession from './components/auth/ValidateSession'
import ValidateSessionAdmin from './components/auth/ValidateSessionAdmin'
import GymIndex from './components/gyms/GymIndex'
import ClimberIndex from './components/climbers/ClimberIndex'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

interface AppProps {
  
}
 
interface AppState {
  sessionToken: string;
}

//putting the token in the state not in the props bc props is readonly?
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      sessionToken: "",
    }
  }
  
  componentDidMount() {
    //if there is a token in local storage - it sets it to your variable sessiontoken
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token")
      })
      console.log("token found")
    }
  }
  
  //sets current token to new token
  updateSessionToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken
    });
    console.log(this.state.sessionToken)
  }
  
  //clear token at end of session 
    clearSessionToken = () => {
      localStorage.clear();
      this.setState({ sessionToken: "" });
      console.log("token cleared")
    }
  
  
  climberViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
        <ClimberIndex
        sessionToken={this.state.sessionToken} />)
      
      : (<ValidateSession
        updateSessionToken = {this.updateSessionToken}/>)
}

  gymViews = () => {
    return this.state.sessionToken === localStorage.getItem("token") ?
      (<GymIndex
        sessionToken={this.state.sessionToken} />)
      : (<ValidateSessionAdmin
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
  
          <Switch>
            
            <Route exact path='/climber'>
              {this.climberViews}
           </Route>
          
            <Route exact path='/gym'>
              {this.gymViews}
              
            </Route>

          </Switch>

          
          <Footer />
        </div>
    </div>
 );
  }
}
 
export default App;

  

