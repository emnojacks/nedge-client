import React, { Component } from "react";
import { Button, Input, Form, Label, FormGroup } from "reactstrap";
import { Container, InputGroup, Col, Row } from "reactstrap";
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
        <Container className="lighter-div">
          <Container className="inner-container">
          
            <Form onSubmit={this.handleSubmit}
              className="form">
           <h2>today's session</h2>
            {/* SESSION DATE */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="sessiondate">
                  session date &nbsp;
                </Label>
                <Input
                  style={{ maxWidth: "150px"}}
                  className="sign-up-input-area"
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
              </InputGroup>
            </FormGroup>
            {/* SESSION SUCCESS */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="sessionsuccessful">
                  successful? &nbsp;
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
              </InputGroup>
            </FormGroup>
            {/* SESSION PARTNER */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="sessionpartner">
                  partnered &nbsp;
                </Label>
                &nbsp;
                <Input
                  type="checkbox"
                  name="sessionpartner"
                  onChange={() =>
                    this.setState({
                      sessionpartner: !this.state.sessionpartner,
                    })
                  }
                ></Input>
              </InputGroup>
            </FormGroup>
            {/* X TRAINING OPTIONAL */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="crosstraining">
                  crosstrained recently &nbsp;
                </Label>
                &nbsp;
                <Input
                  type="checkbox"
                  name="crosstraining"
                  onChange={() =>
                    this.setState({ crosstraining: !this.state.crosstraining })
                  }
                ></Input>
              </InputGroup>
            </FormGroup>
            {/* SESSION LENGTH */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="sessionlength">
                  length (hrs): &nbsp;
                </Label>
                &nbsp;
                <Input
                  style={{ maxWidth: "100px"}}
                  className="sign-up-input-area"
                  placeholder="1"
                  type="number"
                  max={7}
                  min={0.5}
                  step={0.5}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ sessionlength: event.target.value })
                  }
                ></Input>
              </InputGroup>
            </FormGroup>
            <br></br>
            {/* NUTRITIONCONDITION */}
            <h3>conditions</h3>

            <p> <span style={{ fontWeight: "bolder" }}> 😩 &nbsp;bad → subprime → neutral → good → optimal &nbsp;😄 </span> </p>
            <FormGroup row>
              <InputGroup>
                <Label className="form-label" htmlFor="nutritioncondition">
                  nutrition
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
                <small className="tagline">
                       you hydrated? complex carbs? macros met?{" "}
                </small>
                &nbsp;
              </InputGroup>
            </FormGroup>
            {/* SLEEPCONDITION */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="sleepcondition">
                  sleep
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
                <small className="tagline">
                  sleep deprivation is worse than alcohol
                </small>
             
              </InputGroup>
            </FormGroup>
            {/* STRESS CONDITION */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="stresscondition">
                  stress
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
                <small className="tagline">
                  stress releases cortisol which causes fatique
                </small>
                &nbsp;
              </InputGroup>
            </FormGroup>
            {/* EGO CONDITION */}
            <FormGroup>
              <InputGroup>
                <Label className="form-label" htmlFor="egocondition">
                  ego
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
                <small className="tagline">
                  climbing is 90% mental - any negative thought loops?
                </small>
                &nbsp;
              </InputGroup>
            </FormGroup>
            <FormGroup>
              {/* SESSIONNOTES OPTIONAL */}
              <InputGroup>
                <Input
                  className="sign-up-input-area"
                  name="sessionnotes"
                  placeholder="add deets to help recall sesh"
                  type="text"
                  title="what happened that was memorable? Recording deets will help you remember why this sesh was diff than the rest."
                  maxLength={50}
                  onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({
                      sessionnotes: event.target.value,
                    })
                  }
                />
              </InputGroup>
              </FormGroup>
                    <Button className="btn-auth" color="warning" type="submit">
              ✚
            </Button>
            </Form>
          
</Container>
        </Container>
      </div>
    );
  }
}

export default CreateSession;
