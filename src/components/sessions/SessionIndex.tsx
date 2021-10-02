import { Component } from "react";
import CreateSession from "../sessions/CreateSession";
import DisplaySessions from "../sessions/DisplaySessions";
import UpdateSession from "../sessions/UpdateSession";
import { Container } from "reactstrap";
import { Session } from "../../types/Types";
import { Redirect } from "react-router-dom";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface SessionIndexProps {
  sessionToken: string;
}

interface SessionIndexState {
  climberSessions: Array<Session>;
  modalVisible: boolean;
  sessionToUpdate: Session;
}

class SessionIndex extends Component<SessionIndexProps, SessionIndexState> {
  constructor(props: SessionIndexProps) {
    super(props);
    this.state = {
      climberSessions: [],
      modalVisible: false,
      sessionToUpdate: {
        id: 0,
        sessiondate: "",
        sessionsuccessful: false,
        sessionlength: "",
        sessionpartner: false,
        crosstraining: false,
        nutritioncondition: "",
        sleepcondition: "",
        stresscondition: "",
        egocondition: "",
        sessionnotes: "",
      },
    };
  }

  fetchClimberSessions = async () => {
    this.state.climberSessions.length = 260;
    console.log(this.state.climberSessions);
    try {
      console.log("fetching climber sessions");
      const res = await fetch(`${APIURL}/session/mine`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      const json = await res.json();
      this.setState({
        climberSessions: json.existingSessions,
      });
      this.sortClimberSessions();
      console.log(this.state.climberSessions);
    } catch (error) {
      console.log(error);
    }
  };

  sortClimberSessions = () =>  {
    if (this.state.climberSessions.length > 0) {
      this.state.climberSessions.sort(function (a, b) {
        if (a.sessiondate < b.sessiondate) {
          return -1;
        }
        if (a.sessiondate > b.sessiondate) {
          return 1;
        }
        return 0;
      })
    }
  }
  
  componentDidMount() {
    this.fetchClimberSessions();
  }

  setSessionToUpdate = (session: Session) => {
    this.setState({ sessionToUpdate: session });
  };

  openModal = (): void => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = (): void => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    if (!this.props.sessionToken) return <Redirect to="/" />;

    return (
      <div>
        <Container>
          <CreateSession
            sessionToken={this.props.sessionToken}
            fetchClimberSessions={this.fetchClimberSessions}
          />
          <DisplaySessions
            sortClimberSessions={this.sortClimberSessions}
            openModal={this.openModal}
            climberSessions={this.state.climberSessions}
            sessionToken={this.props.sessionToken}
            fetchClimberSessions={this.fetchClimberSessions}
            setSessionToUpdate={this.setSessionToUpdate}
          />

          {this.state.modalVisible ? (
            <UpdateSession
              sessionToken={this.props.sessionToken}
              fetchClimberSessions={this.fetchClimberSessions}
              climberSessions={this.state.climberSessions}
              sessionToUpdate={this.state.sessionToUpdate}
              closeModal={this.closeModal}
              openModal={this.openModal}
              modalVisible={this.state.modalVisible}
            />
          ) : (
            <> </>
          )}
        </Container>
      </div>
    );
  }
}

export default SessionIndex;
