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
  CardFooter
} from "reactstrap";
import { Goal } from "../../types/Types";
let APIURL = "http://localhost:3000";

interface DisplayGoalsProps {
  sessionToken: string;
  climberGoals: Array<Goal>;
  fetchClimberGoals: CallableFunction;
  openModal: () => void;
  setGoalToUpdate: (goal: Goal) => void;
  //edit and delete goal funcs
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

  componentDidMount() {
    // console.log("display comp mounted");
    // this.props.fetchClimberGoals();
  }

  componentDidUpdate() {
    // console.log(this.props.climberGoals);
    // this.props.fetchClimberGoals();
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
    console.log(this.props.climberGoals);

    return (
      <div className="goal-display">
        <Container>
          <h1>Goal Deck</h1>
          {this.props.climberGoals.length > 0 ? (
            this.props.climberGoals.map((goal: Goal, index: number) => (
              <Row key={index}>
                <Col sm="7">
                  <Card key={goal.id}>
                    <CardHeader> priority: {goal.goalpriority}</CardHeader>
                    <CardBody>
                      <CardTitle tag="h6">
                        {/* {index + 1} */}
                        {goal.goaldescription}
                      </CardTitle>

                            </CardBody>
                            <CardFooter>
                             <Button
                        color="success"
                        onClick={() => this.deleteGoal(goal)}
                      >
                       Done
                                </Button>
                                &nbsp;
                                 <Button
                        color="secondary"
                        onClick={() => {
                          this.props.setGoalToUpdate(goal);
                          this.props.openModal();
                        }}
                      >
                        Change
                      </Button>
                            </CardFooter>
                  </Card>
                </Col>
              </Row>
            ))
          ) : (
            <p>
              Your goal deck is empty. Set a Goal to start working towards the
              climber you want to be.
            </p>
          )}
        </Container>
      </div>
    );
  }
}

export default DisplayGoals;
