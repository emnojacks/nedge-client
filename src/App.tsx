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
import RoleDecision from './components/auth/RoleDecision';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import {Button} from 'reactstrap'

interface AppProps {
}
 
interface AppState {
  sessionToken: string;
  isGym: boolean;
}

//putting the token in the state not in the props bc props is readonly?
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      sessionToken: "",
      isGym: false,
    }
  }
  
  componentDidMount():void {
    //if there is a token in local storage - it sets it to your variable sessiontoken
    if (localStorage.getItem("token")) {
      console.log('token found')
      this.setState({
        sessionToken: localStorage.getItem("token")! //non-null assertion expression operator 
      })
    }
  }
  
  //sets current token to new token
  updateSessionToken = (newToken: string):void => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken
    });
    console.log(this.state.sessionToken)
  }
  
  //clear token at end of session 
    clearSessionToken = ():void => {
      localStorage.clear();
      this.setState({ sessionToken: "" });
      console.log("token cleared")
    }
  
  climberViews = (): JSX.Element => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
        <ClimberIndex
        sessionToken={this.state.sessionToken} />)
      : (<ValidateSession
        updateSessionToken = {this.updateSessionToken}/>)
}

  gymViews = (): JSX.Element => {
    return this.state.sessionToken === localStorage.getItem("token") ?
      (<GymIndex
        sessionToken={this.state.sessionToken} />)
      : (<ValidateSessionAdmin
        updateSessionToken = {this.updateSessionToken}/>)
  }
  //use token to determine which views are appropriate 
  //query after they have signed in - what is the user role 
  //render view based on that 
  
  render() { 
    return (
  
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <h1 className="appheader">NEDGE</h1>
      </header>
        <div>
          
         <Router>
           {/* //ternary to display gym login or climber login */}
            {this.state.sessionToken && (
          <Navigation
            // logout={this.clearToken}
            // token={this.state.token}
          />
        )}
            <Switch>
              <Route exact path='/'>
                {this.climberViews}
              </Route>
              
              <Route exact path='/climber'>
              </Route>
              
            <Route exact path='/gym'>
              {this.gymViews}
           </Route>

           </Switch>
          </Router>
          
          <Footer />
        </div>
    </div>
 );
  }
}
 
export default App;

  

  
//           <Router>
//             {/* //ternary to display gym login or climber login */}
//             {this.state.sessionToken}
// {/* //               ?
// //               <Redirect to='/home' /> :
// //               <Redirect to="/auth" />
// //  */}
//           <Switch>
//             <Route exact path='/'>
//               {this.gymViews}
//               </Route>
              
//             <Route exact path='/climber'>
//               {this.climberViews}
//            </Route>
          
//             <Route exact path='/gym'>
//               {this.gymViews}
//             </Route>

//           </Switch>
//           </Router>