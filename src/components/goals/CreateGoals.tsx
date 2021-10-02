import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  Container,
} from "reactstrap";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

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
        <Container className="lighter-div">
          <Container className="inner-container">
            <div className="content-header">
              <h2>Set a Goal</h2>

              <p>
                Set a common climbing goal or create you own. P.S. It's not
                realistic to work on more than 3 goals at a time so don't go
                crazy, Ondra.{" "}
              </p>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ButtonGroup>
                  <Button
                    color="warning"
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
                    color="warning"
                    size="sm"
                    outline
                    active={
                      this.state.goaldescription === "increase tendon strength"
                    }
                    onClick={() =>
                      this.setState({
                        goaldescription: "increase tendon strength",
                      })
                    }
                  >
                    increase tendon strength
                  </Button>

                  <Button
                    className="btn-goal"
                    color="warning"
                    size="sm"
                    outline
                    active={
                      this.state.goaldescription === "increase muscle strength"
                    }
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
                    color="warning"
                    size="sm"
                    outline
                    active={
                      this.state.goaldescription === "improve mental game"
                    }
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
                    color="warning"
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

                <Button size="sm" color="warning" type="submit">
                  ✚ goal
                </Button>
              </FormGroup>

              <FormGroup>
                <br></br>
                <Input
                  className="sign-up-input-area"
                  name="othergoal"
                  placeholder="or add a personal goal"
                  type="text"
                  onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({
                      goaldescription: event.target.value,
                    })
                  }
                />
                <Button size="sm" color="warning" type="submit">
                  ✚ personal goal
                </Button>
              </FormGroup>
            </Form>
          </Container>
        </Container>
      </div>
    );
  }
}
//eventually want to make this a bulk post request that creates distinct records
//also want to limit it to 3 goals
//and want user defined goals
export default CreateGoals;
