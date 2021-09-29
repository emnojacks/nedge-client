import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./components/site/Navigation";
import Footer from "./components/site/Footer";
import ValidateSession from "./components/auth/ValidateSession";
import ClimberIndex from "./components/climbers/ClimberIndex";
import SessionIndex from "./components/sessions/SessionIndex";
import GoalIndex from "./components/goals/GoalIndex";
import GymIndex from "./components/gyms/GymIndex";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

interface AppProps {}

interface AppState {
  sessionToken: string;
  isAdmin: boolean;
}

//putting the token in the state not in the props bc props is readonly?
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: "",
      isAdmin: false,
    };
  }

  componentDidMount() {
    //if there is a token in local storage - it sets it to your variable sessiontoken, does the same for admin token
    if (localStorage.getItem("token")) {
      console.log("token found");
      this.setState({
        sessionToken: localStorage.getItem("token")!, //non-null assertion expression operator
      });
    }
    //     if (localStorage.getItem('isAdmin')){
    // this.setState({isAdmin: localStorage.getItem(true)!})
    //     }
  }

  //double duty in addition to form & jwt
  setIsAdmin = (isAdmin: boolean) => {
    this.setState({
      isAdmin: true,
    });
    console.log("climber set to admin");
  };

  //sets current token to new token
  updateSessionToken = (newToken: string): void => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
    console.log(this.state.sessionToken);
  };

  //clear token at end of session
  clearSessionToken = (): void => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
    console.log("token cleared");
  };

  climberViews = (): JSX.Element => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
      <ClimberIndex
        setIsAdmin={this.setIsAdmin}
        sessionToken={this.state.sessionToken}
      />
    ) : (
      <ValidateSession
        setIsAdmin={this.setIsAdmin}
        updateSessionToken={this.updateSessionToken}
      />
    );
  };

  gymViews = (): JSX.Element => {
    return this.state.isAdmin === true ? (
      <GymIndex
        setIsAdmin={this.setIsAdmin}
        isAdmin={this.state.isAdmin}
        sessionToken={this.state.sessionToken}
      />
    ) : (
      <></>
    );
  };

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
        <Router>
          {this.state.sessionToken && (
            <Navigation
              clearSessionToken={this.clearSessionToken}
              sessionToken={this.state.sessionToken}
              updateSessionToken={this.updateSessionToken}
            />
          )}
          <Container>
            <Switch>
              <Route exact path="/">
                {this.climberViews}
              </Route>
              <Route exact path="/climber/sessions">
                <SessionIndex sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/climber/goals">
                <GoalIndex sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/gym">
                {/* <GymIndex
                setIsAdmin={this.setIsAdmin}
                sessionToken={this.state.sessionToken}
                isAdmin = {this.state.isAdmin}
                /> */}
                {this.gymViews}
              </Route>
            </Switch>
          </Container>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
