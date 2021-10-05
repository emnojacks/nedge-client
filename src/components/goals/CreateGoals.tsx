import React, { Component } from "react";
import {
  Button,
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
              <h2>Set a New Goal</h2>

              <p>
                Set a common climbing goal or create you own. It's not realistic
                to work on more than <span style={{ backgroundColor: "#f2a54180", fontWeight: "bolder" }}>&nbsp;3 goals at a time.&nbsp;</span>{" "}
                <br></br>
              </p>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
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
                  &nbsp;
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
                  &nbsp;
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
                  &nbsp;
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
                  &nbsp;
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
                &nbsp;
                <Button className="btn-auth"
                  size="sm" type="submit">
                  ✚ common goal
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
                <Button size="sm" className="btn-auth" type="submit">
                  ✚ personal goal
                </Button>
              </FormGroup>
              <br></br>
                <small>Now go prioritize your new goals.</small>
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
