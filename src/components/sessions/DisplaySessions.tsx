import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
  Container,
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

  componentDidUpdate() {}

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
      <div>
        <Container className="lighter-div">
          <Container className="inner-container">
          <h2>recent sessions</h2>
          <div className="session-display">
            {this.props.climberSessions.length > 0 ? (
              this.props.climberSessions.map(
                (session: Session, index: number) => (
                  <Card
                    className="session-card"
                    key={session.id}
                    style={{
                      backgroundColor: session.sessionsuccessful
                        ? "#E8FFB3"
                        : "#FFDED2",
                    }}
                  >
                    <CardHeader tag="h5">{session.sessiondate}</CardHeader>
                    <CardBody>
                      <CardText>
                        {session.sessionlength} hr
                        <br></br>
                        {session.sessionpartner ? " 👥 " : ""}
                        {session.crosstraining ? " 🏋️" : " "}
                        <br></br>
                        <div className="session-card-deets">
                       <div>
                          Nutrition{session.nutritioncondition >= "3" ? "✅" : "❌"}
                          </div>
                          <div>
                          Sleep {session.sleepcondition >= "3" ? "✅" : "❌"}
                          </div>
                          <div>
                          Stress {session.stresscondition >= "3" ? "✅" : "❌"}
                          </div>
                          <div>
                          Ego {session.egocondition >= "3" ? "✅" : "❌"}
                          </div>
</div>
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
                      </Button>{" "}
                      <Button
                        color="warning"
                        onClick={() => this.deleteSession(session)}
                      >
                        🚫
                      </Button>
                    </CardFooter>
                  </Card>
                )
              )
            ) : (
              <p>
                Your session log is empty. Log your first session to start
                building your session data.
              </p>
            )}
          </div>
        </Container>
        </Container>
      </div>
    );
  }
}

export default DisplaySessions;
