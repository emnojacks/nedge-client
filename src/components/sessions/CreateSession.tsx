import React, { Component } from "react";
import { Button, Input, Form, Label, FormGroup } from "reactstrap";
// import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css";
let APIURL = "http://localhost:3000";

interface CreateSessionProps {
  sessionToken: string;
  fetchClimberSessions: CallableFunction;
}

interface CreateSessionState {
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

class CreateSession extends Component<CreateSessionProps, CreateSessionState> {
  constructor(props: CreateSessionProps) {
    super(props);
    this.state = {
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

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    fetch(`${APIURL}/session/create`, {
      method: "POST",
      body: JSON.stringify({
        session: {
          sessiondate: this.state.sessiondate,
          sessionsuccessful: this.state.sessionsuccessful,
          sessionlength: this.state.sessionlength,
          sessionpartner: this.state.sessionpartner,
          crosstraining: this.state.crosstraining,
          nutritioncondition: this.state.nutritioncondition,
          sleepcondition: this.state.sleepcondition,
          stresscondition: this.state.stresscondition,
          egocondition: this.state.egocondition,
          sessionnotes: this.state.sessionnotes,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("session logged");
        // this.setState({
        //   sessiondate: "",
        //   sessionsuccessful: false,
        //   sessionlength: "",
        //   sessionpartner: false,
        //   crosstraining: false,
        //   nutritioncondition: "",
        //   sleepcondition: "",
        //   stresscondition: "",
        //   egocondition: "",
        //   sessionnotes: " ",
        // });
        // this.clearInputs();
        this.props.fetchClimberSessions();
      })
      .catch((error) => {
        console.log(error.message);
        window.alert("failed to log session");
      });
  };

  clearInputs = () => {
    this.setState({
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
    });
  };

  render() {
    return (
      <div>
        <h1>Today's Session</h1>

        <Form onSubmit={this.handleSubmit}>
          {/* SESSION DATE */}
          <FormGroup>
            <Label className="form-label" htmlFor="sessiondate">
              Session Date
            </Label>
            <Input
              type="date"
              name="sessiondate"
              min="2021-01-01"
              required
              //change this to be today - stretch
              value={this.state.sessiondate}
              onChange={(event) =>
                this.setState({ sessiondate: event.target.value })
              }
            ></Input>
          </FormGroup>
          {/* SESSION SUCCESS */}
          <FormGroup>
            <Label className="form-label" htmlFor="sessionsuccessful">
              Successful?
            </Label>
            &nbsp;
            <Input
              type="checkbox"
              title="Do you feel good about your sesh or was it a high gravity day?"
              name="sessionsuccessful"
              onChange={() =>
                this.setState({
                  sessionsuccessful: !this.state.sessionsuccessful,
                })
              }
            ></Input>
          </FormGroup>
          {/* SESSION PARTNER */}
          <FormGroup>
            <Label className="form-label" htmlFor="sessionpartner">
              Partner
            </Label>
            &nbsp;
            <Input
              type="checkbox"
              name="sessionpartner"
              onChange={() =>
                this.setState({ sessionpartner: !this.state.sessionpartner })
              }
            ></Input>
          </FormGroup>
          {/* X TRAINING OPTIONAL */}
          <FormGroup>
            <Label className="form-label" htmlFor="crosstraining">
              Recently Crosstrained{" "}
            </Label>
            &nbsp;
            <Input
              type="checkbox"
              name="crosstraining"
              onChange={() =>
                this.setState({ crosstraining: !this.state.crosstraining })
              }
            ></Input>
          </FormGroup>
          {/* SESSION LENGTH */}
          <FormGroup>
            <Label className="form-label" htmlFor="sessionlength">
              Length (hrs):{" "}
            </Label>
            &nbsp;
            <Input
              type="number"
              max={7}
              min={0.5}
              step={0.5}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ sessionlength: event.target.value })
              }
            ></Input>
          </FormGroup>
          {/* NUTRITIONCONDITION */}
          <h4>Conditions</h4>
          <p>
            What did have in the tank? <br></br>
          </p>
          <small className="text-muted">
            {" "}
            bad → subprime → neutral → good → optimal{" "}
          </small>
          <FormGroup>
            <Label className="form-label" htmlFor="nutritioncondition">
              Nutrition
            </Label>
            &nbsp;
            <Input
              type="range"
              max={5}
              min={0}
              step={1}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ nutritioncondition: event.target.value })
              }
            ></Input>
            <br></br>
            <small className="text-muted">
              you hydrated? complex carbs? macros met?{" "}
            </small>
            &nbsp;
          </FormGroup>
          {/* SLEEPCONDITION */}
          <FormGroup>
            <Label className="form-label" htmlFor="sleepcondition">
              Sleep
            </Label>
            &nbsp;
            <Input
              type="range"
              max={5}
              min={0}
              step={1}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ sleepcondition: event.target.value })
              }
            ></Input>
            <br></br>
            <small className="text-muted">
              sleep deprivation is worse than alcohol
            </small>
            &nbsp;
          </FormGroup>
          {/* STRESS CONDITION */}
          <FormGroup>
            <Label className="form-label" htmlFor="stresscondition">
              Stress
            </Label>
            &nbsp;
            <Input
              type="range"
              max={5}
              min={0}
              step={1}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ stresscondition: event.target.value })
              }
            ></Input>
            <br></br>
            <small className="text-muted">
              stress releases cortisol which causes fatique
            </small>
            &nbsp;
          </FormGroup>
          {/* EGO CONDITION */}
          <FormGroup>
            <Label className="form-label" htmlFor="egocondition">
              Ego
            </Label>
            &nbsp;
            <Input
              type="range"
              max={5}
              min={0}
              step={1}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({ egocondition: event.target.value })
              }
            ></Input>
            <br></br>
            <small className="text-muted">
              climbing is 90% mental - any negative thought loops?
            </small>
            &nbsp;
          </FormGroup>
          <FormGroup>
            {/* SESSIONNOTES OPTIONAL */}
            <Input
              className="text-input"
              name="sessionnotes"
              placeholder="deets to help you recall sesh"
              type="text"
              title="what happened that was memorable? Recording deets will help you remember why this sesh was diff than the rest."
              maxLength={50}
              onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({
                  sessionnotes: event.target.value,
                })
              }
            />
          </FormGroup>
          <Button size="sm" type="submit">
            Log Session
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateSession;
