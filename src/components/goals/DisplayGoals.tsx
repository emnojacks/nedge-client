import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardHeader,
  Container,
  CardFooter,
} from "reactstrap";
import { Goal } from "../../types/Types";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface DisplayGoalsProps {
  sessionToken: string;
  climberGoals: Array<Goal>;
  fetchClimberGoals: CallableFunction;
  openModal: () => void;
  setGoalToUpdate: (goal: Goal) => void;
  sortClimberGoals: () => void;
}

interface DisplayGoalsState {
  id: number;
  goaldescription: string;
  goalpriority: number;
  goalachieved: boolean;
}

class DisplayGoals extends Component<DisplayGoalsProps, DisplayGoalsState> {
  constructor(props: DisplayGoalsProps) {
    super(props);
    this.state = {
      id: 1,
      goaldescription: "",
      goalpriority: 1,
      goalachieved: false,
    };
  }

  componentDidUpdate() {
    // console.log('comp updated');
    // this.props.sortClimberGoals();
  }

  deleteGoal = async (goal: Goal) => {
    console.log(goal);
    try {
      const goalToDelete = await fetch(`${APIURL}/goal/delete/${goal.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      console.log(`${goalToDelete} achieved`);
    } catch {
      window.alert("couldn't delete goal");
    }
    this.props.fetchClimberGoals();
  };

  render() {
    this.props.sortClimberGoals()
    
        return (
      <div className="mainDiv">
        <Container className="lighter-div">
          <Container className="inner-container">
            <div className="header-content">
              <h2>Goal Deck</h2>
            </div>
            <div className="goal-display">
                  {this.props.climberGoals.length > 0 ? (
                this.props.climberGoals.map((goal: Goal, index: number) => (
                  <Row key={index}>
                    <Col sm="10">
                      <Card
                        className="goal-card climber-profile-card"
                        key={goal.id}
                      >
                        <CardHeader> Priority #{goal.goalpriority}</CardHeader>
                        <CardBody>
                          <CardTitle tag="h5">
                            {goal.goaldescription}
                          </CardTitle>
                        </CardBody>
                        <CardFooter className="session-card-footer">
                          <Button
                            style={{ margin: "0px" }}
                            color="success"
                            onClick={() => {
                              this.deleteGoal(goal)
                            }}
                          >
                            sent it
                          </Button>
                          &nbsp;
                          <Button
                            style={{ margin: "0px" }}
                            color="transparent"
                            onClick={() => {
                              this.props.setGoalToUpdate(goal);
                              this.props.openModal();
                            }}
                          >
                            ✏️
                          </Button>
                        </CardFooter>
                      </Card>
                    </Col>
                  </Row>
                ))
              ) : (
                <p>
                  Your goal deck is empty. Set a Goal to start working towards the climber you want to be.
                </p>
              )}
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default DisplayGoals;
