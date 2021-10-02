import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardText,
  Container,
} from "reactstrap";
import { Session } from "../../types/Types";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface DisplaySessionsProps {
  sessionToken: string;
  climberSessions: Array<Session>;
  fetchClimberSessions: CallableFunction;
  openModal: () => void;
  setSessionToUpdate: (session: Session) => void;
  sortClimberSessions: () => void;
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
    this.props.sortClimberSessions();

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
                          ? "#9ACCB1"
                          : "#f9b09e",
                      }}
                    >
                      <CardHeader tag="h5" style={{ fontWeight: "bold" }}>
                        <Button
                          style={{ margin: "0px" }}
                          size="sm"
                          outline
                          color="transparent"
                          onClick={() => {
                            this.props.setSessionToUpdate(session);
                            this.props.openModal();
                          }}
                        >
                          {session.sessiondate}
                        </Button>
                      </CardHeader>

                      <CardBody id="session-card-body">
                        <CardText>
                          <div className="session-card-deets">
                            <section>{session.sessionlength} hr</section>
                            <section>
                              {session.sessionpartner ? " 👥 " : ""}
                              {session.crosstraining ? " 🏋️" : " "}
                            </section>
                            <section>
                              Nutrition
                              {session.nutritioncondition >= "3" ? "✅" : "❌"}
                            </section>
                            <section>
                              Sleep{" "}
                              {session.sleepcondition >= "3" ? "✅" : "❌"}
                            </section>
                            <section>
                              Stress{" "}
                              {session.stresscondition >= "3" ? "✅" : "❌"}
                            </section>
                            <section>
                              Ego {session.egocondition >= "3" ? "✅" : "❌"}
                            </section>
                            <section>{session.sessionnotes}</section>
                          </div>
                        </CardText>
                      </CardBody>
                      <CardFooter className="session-card-footer">
                        <Button
                          style={{ margin: "0px" }}
                          outline
                          color="transparent"
                          onClick={() => {
                            this.props.setSessionToUpdate(session);
                            this.props.openModal();
                          }}
                        >
                          ✏️
                        </Button>
                        <Button
                          style={{ margin: "0px" }}
                          outline
                          color="transparent"
                          onClick={() => this.deleteSession(session)}
                        >
                          🗑
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
