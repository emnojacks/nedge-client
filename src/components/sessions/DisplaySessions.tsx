import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
  Container
} from "reactstrap";
import { Session } from "../../types/Types";
let APIURL = "http://localhost:3000";

interface DisplaySessionsProps {
  sessionToken: string;
  climberSessions: Array<Session>;
  fetchClimberSessions: CallableFunction;
  openModal: () => void;
  setSessionToUpdate: (session: Session) => void;
}

interface DisplaySessionsState {
  id: number;
  sessiondate: string;
  sessionsuccessful: boolean;
  sessionlength?: string;
  sessionpartner: boolean;
  crosstraining?: boolean;
  nutritioncondition: string;
  sleepcondition: string;
  stresscondition: string;
  egocondition: string;
  sessionnotes?: string;
}

class DisplaySessions extends Component<
  DisplaySessionsProps,
  DisplaySessionsState
> {
  constructor(props: DisplaySessionsProps) {
    super(props);
    this.state = {
      id: 1,
      sessiondate: "",
      sessionsuccessful: false,
      sessionlength: "",
      sessionpartner: false,
      crosstraining: false,
      nutritioncondition: "",
      sleepcondition: "",
      stresscondition: "",
      egocondition: "",
      sessionnotes: " ",
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
  
  }

  deleteSession = async (session: Session) => {
    console.log(session);
    try {
      const sessionToDelete = await fetch(
        `${APIURL}/session/delete/${session.id}`,
        {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.sessionToken}`,
          }),
        }
      );
      console.log(`${sessionToDelete} session removed`);
    } catch {
      window.alert("couldn't delete session");
    }
    this.props.fetchClimberSessions();
  };

  render() {
    console.log(this.props.climberSessions);

    return (
        <div className="mainDiv">
        <Container>
          <h1>Sessions</h1>
          <div className="session-display">
          {this.props.climberSessions.length > 0 ? (
          this.props.climberSessions.map((session: Session, index: number) => (
           
                      <Card key={session.id} style={{ backgroundColor: session.sessionsuccessful ? "#E8FFB3" : "#FFDED2"}}>
                  <CardHeader tag="h5"
                  >{session.sessiondate}</CardHeader>
                  <CardBody>
                    <CardTitle tag="h6">Session Deets</CardTitle>

                    <CardText>
                           {session.sessionlength} hr
                      <br></br>
                                  {session.sessionpartner ? " 👥 " : ""}
                                    
                        {session.crosstraining ? " 🏋️" : " "}
                          <br></br>
                      <small className="text-muted">
                                      Nutrition {session.nutritioncondition >= "3" ? "✅" : "❌"}
                                      <br></br>
                                      Sleep  {session.sleepcondition >= "3" ? "✅" : "❌"}
                                      <br></br>
                                      Stress {session.stresscondition  >= "3" ? "✅" : "❌"}
                                      <br></br>
                                      Ego {session.egocondition  >= "3" ? "✅" : "❌"}
                                      <br></br>
                      </small>
  <br></br>
                 {session.sessionnotes}
                    </CardText>
              
                  </CardBody>
                  <CardFooter>
                  
                              <Button
                                  color="secondary"
                      onClick={() => {
                        this.props.setSessionToUpdate(session);
                        this.props.openModal();
                      }}
                    >
                      ✏️
                </Button>
                {" "}
                              <Button
                                  color="warning"
                                  onClick={() => this.deleteSession(session)}>
                     🚫
                    </Button>
              </CardFooter>
                </Card>
          ))
        ) : (
          <p>
            Your session log is empty. Log your first session to start building
            your session data.
          </p>
          )}
          </div>
</Container>
      </div>
    );
  }
}

export default DisplaySessions;
