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
import pen from "../../assets/pen-blck.png";
import trash from "../../assets/trash-blck.png";
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
            <p>Your sessions and climbing conditions will be green if successful and red if not. Click into each day to update or expand! 
              <br></br>You've logged <span className="highlighted">&nbsp;{this.props.climberSessions.length} climbing sessions&nbsp;</span> recently.
              {this.props.climberSessions.length <= 10 ? " That's not very many! Log more sessions to get to the edge of your ability." : this.props.climberSessions.length
                <20 ? " That's a good amount. Keep recording your sessions to help you get to the edge of your ability." : " Wow, you are on a roll. Have you noticed any patterns?"}
            </p>
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
                      <CardHeader style={{padding: "0px"}}>
                        <Button
                          className="session-date-btn"
                          size="sm"
                          outline
                          color="transparent"
                          onClick={() => {
                            this.props.setSessionToUpdate(session);
                            this.props.openModal();
                          }}
                        >
                          {session.sessiondate.slice(5)}
                        </Button>
                      </CardHeader>

                      <CardBody id="session-card-body">
                        <CardText>
                          <div className="session-card-deets">
                            <section>{session.sessionlength} hr</section>
                            <section>
                              {session.sessionpartner ? <img src="https://cdn-icons-png.flaticon.com/512/4726/4726440.png" width="20px" alt="two people"/> : ""}
                              {session.crosstraining ? <img src="https://cdn-icons-png.flaticon.com/512/1000/1000008.png" width="20px" alt="barbell"/> : " "}
                            </section>
                            <section className="session-card-insights"
                              style={{ color: session.nutritioncondition>="4" ? "green" : session.nutritioncondition<="1" ? "red" : "#282c34" }}>
                              nutrition
                              {session.nutritioncondition > "3" ? "" : ""}
                            </section>
                            <section
                            className="session-card-insights"
                              style={{ color: session.sleepcondition>="4" ? "green" : session.sleepcondition<="1" ? "red" : "#282c34" }}>
                              sleep{" "}
                            </section>
                            <section className="session-card-insights"
                              style={{ color: session.stresscondition>="4" ? "green" : session.stresscondition<="1" ? "red" : "#282c34" }}>
                              stress{" "}
                            </section>
                            <section
                            className="session-card-insights"
                              style={{ color: session.egocondition>="4" ? "green" : session.egocondition<="1" ? "red" : "#282c34" }}>
                              ego
                            </section>
                            <section style={{ fontStyle:"italic"}}>{session.sessionnotes}</section>
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
                          <img src={pen} width="15px" alt="pencil icon"/>
                        </Button>
                        <Button
                          style={{ margin: "0px" }}
                          outline
                          color="transparent"
                          onClick={() => this.deleteSession(session)}
                        >
                          <img src={trash} width="15px" alt="trash icon"/>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                )
              ) : (
                <p>
                  Your session log is empty. Log one to start
                  building your session insights.
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
