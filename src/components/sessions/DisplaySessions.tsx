import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardText,
  Row,
    Col,
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
        <div className="session-display">
            <Container>
        <h1>Sessions</h1>
        {this.props.climberSessions.length > 0 ? (
          this.props.climberSessions.map((session: Session, index: number) => (
            // <Row key={index}>
            //   <Col sm="3">
                      <Card key={session.id} style={{ backgroundColor: session.sessionsuccessful ? "#E8FFB3" : "#FFDED2"}}>
                  <CardHeader tag="h4"
                  style={{ fontWeight: "bold" }}
                  >{session.sessiondate}</CardHeader>
                  <CardBody>
                    <CardTitle tag="h5">Session Deets</CardTitle>

                    <CardText>
                          Length: {session.sessionlength} hrs
                      <br></br>
                                  {session.sessionpartner ? "Partnered 👥 " : ""}
                                         <br></br>
                        {session.crosstraining ? "Crosstrained: 🏋️" : " "}
                          <br></br>
                      <small className="text-muted">
                                      Nutrition: {session.nutritioncondition >= "3" ? "✅" : "❌"}
                                      <br></br>
                                      Sleep:  {session.sleepcondition >= "3" ? "✅" : "❌"}
                                      <br></br>
                                      Stress: {session.stresscondition  >= "3" ? "✅" : "❌"}
                                      <br></br>
                                      Ego: {session.egocondition  >= "3" ? "✅" : "❌"}
                                      <br></br>
                      </small>
                    </CardText>
                              <Button
                                  color="secondary"
                      onClick={() => {
                        this.props.setSessionToUpdate(session);
                        this.props.openModal();
                      }}
                    >
                      Edit
                    </Button>
                              <Button
                                  color="warning"
                                  onClick={() => this.deleteSession(session)}>
                      Remove
                    </Button>
                  </CardBody>
                  <CardFooter
                      tag="h6"
                      style={{ fontWeight: "bold" }}> {session.sessionnotes}</CardFooter>
                </Card>
            //       {/* </Col>
            // </Row> */}
          ))
        ) : (
          <p>
            Your session log is empty. Log your first session to start building
            your session data.
          </p>
        )}
</Container>
      </div>
    );
  }
}

export default DisplaySessions;
