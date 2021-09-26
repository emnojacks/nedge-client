import React, { Component } from "react";
import { Button, ButtonGroup, Input, Form, FormGroup} from "reactstrap";
import { Link } from "react-router-dom";
let APIURL = "http://localhost:3000";

interface CreateGoalsProps {
  sessionToken: string;
  fetchClimberGoals: CallableFunction;
}

interface CreateGoalsState {
  goaldescription: string;
  goalpriority: number;
  goalachieved: boolean;
}

class CreateGoals extends Component<CreateGoalsProps, CreateGoalsState> {
  constructor(props: CreateGoalsProps) {
    super(props);
    this.state = {
      goaldescription: "",
      goalpriority: 1,
      goalachieved: false,
    };
  }

  submitGoal = async () => {
    return await fetch(`${APIURL}/goal/create/`, {
      method: "POST",
      body: JSON.stringify({
        goal: {
          goaldescription: this.state.goaldescription,
          goalpriority: 1,
          goalachieved: false,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    });
  };

  handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (this.state.goaldescription) {
      try {
        let res = await this.submitGoal();
        if (res?.ok) {
          console.log("goal created");
        }
      } catch {}
      this.props.fetchClimberGoals();
    } else {
      console.log("empty goal attempt");
      window.alert(
        "You can't add emtpy goals. Click an option from the list or add a unique goal in the text input."
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Set a Goal</h1>
        <p>
          Set a common climbing goal or create you own.
          P.S. It's not realistic to work on more than 3 goals at a time so don't go
          crazy, Ondra.{" "}
        </p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          <ButtonGroup>
            <Button
              className="btn-goal"
              size="sm"
              outline
              active={this.state.goaldescription === "increase endurance"}
              onClick={() =>
                this.setState({
                  goaldescription: "increase endurance",
                })
              }
            >
              increase endurance
            </Button>

            <Button
              className="btn-goal"
              size="sm"
              outline
              active={this.state.goaldescription === "increase tendon strength"}
              onClick={() =>
                this.setState({ goaldescription: "increase tendon strength" })
              }
            >
              increase tendon strength
            </Button>

            <Button
              className="btn-goal"
              size="sm"
              outline
              active={this.state.goaldescription === "increase muscle strength"}
              onClick={() =>
                this.setState({
                  goaldescription: "increase muscle strength",
                })
              }
            >
              increase muscle strength
            </Button>

            <Button
              className="btn-goal"
              size="sm"
              outline
              active={this.state.goaldescription === "improve mental game"}
              onClick={() =>
                this.setState({
                  goaldescription: "improve mental game",
                })
              }
            >
              improve mental game
            </Button>
            <Button
              className="btn-goal"
              size="sm"
              outline
              active={this.state.goaldescription === "work on technique"}
              onClick={() =>
                this.setState({
                  goaldescription: "work on technique",
                })
              }
            >
              work on technique
            </Button>
            <br></br>
          </ButtonGroup>
        
          <Button size="sm" type="submit">
            Add Goal
          </Button>
</FormGroup>
<FormGroup>
          <br></br>
          <Input
            className="text-input"
            name="othergoal"
            placeholder="or add a personal goal"
            type="text"
            onBlur={(event) =>
              this.setState({
                goaldescription: event.target.value,
              })
            }
          />
          <br></br>
          <Button size="sm" type="submit">
            Add Personal Goal
          </Button>
</FormGroup>
          {/* <p>Goal set to {this.state.goaldescription}</p> */}
        </Form>
      </div>
    );
  }
}
//eventually want to make this a bulk post request that creates distint records
//also want to limit it to three goals
//and want user defined goals
export default CreateGoals;

// onClick={() => {
//                           this.setState({
//                               goaldescription: "work on technique"
//                           });
//                         this.onRadioBtnClick("work on technique")}
//                       }
