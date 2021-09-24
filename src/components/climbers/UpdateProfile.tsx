import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Climber } from "../../types/Types";
let APIURL = "http://localhost:3000";

interface UpdateProfileProps {
  sessionToken: string;
  climberToUpdate: Climber;
}

interface UpdateProfileState {
  id: number;
  gymname: string | undefined;
  needpartner: boolean | undefined;
  experiencelevel: string | undefined;
  location: string | undefined;
}

class UpdateProfile extends Component<UpdateProfileProps, UpdateProfileState> {
  constructor(props: UpdateProfileProps) {
    super(props);
    this.state = {
      id: this.props.climberToUpdate.id,
      gymname: this.props.climberToUpdate.gymname,
      needpartner: this.props.climberToUpdate.needpartner,
      experiencelevel: this.props.climberToUpdate.experiencelevel,
      location: this.props.climberToUpdate.location,
    };
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    fetch(`${APIURL}/climber/profile/${this.props.climberToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        climber: {
          gymname: this.props.climberToUpdate.gymname,
          needpartner: this.props.climberToUpdate.needpartner,
          experiencelevel: this.props.climberToUpdate.experiencelevel,
          location: this.props.climberToUpdate.location,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.sessionToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert(data.message);
        //this.fetchProfile
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    return (
      <div>
        <h1>Climber Profile</h1>
        <Form onSubmit={this.handleSubmit}>
          {/* HOMEGYM */}
          <FormGroup>
            <Label className="form-label" htmlFor="gymname">
              Home Gym
            </Label>
            <Input
              name="gymname"
              placeholder="climb time"
              type="text"
              onChange={(event) =>
                this.setState({ gymname: event.target.value })
              }
              value={this.state.gymname}
            />
          </FormGroup>

          {/* NEEDPARTNER */}
          <FormGroup>
            <Label className="form-label" htmlFor="needpartner">
              Need a Partner?
            </Label>
            <Input
              name="needpartner"
              type="checkbox"
              checked
              onChange={(event) => this.setState({ needpartner: false })}
            />
          </FormGroup>

          {/* EXPERIENCELEVEL */}
          <FormGroup>
            <Label className="form-label" htmlFor="experiencelevel">
              Experience Level
            </Label>
            <Input
              name="experiencelevel"
              placeholder="beginner"
              type="text"
              onChange={(event) =>
                this.setState({ experiencelevel: event.target.value })
              }
              value={this.state.experiencelevel}
            />
          </FormGroup>

          {/* LOCATION */}
          <FormGroup>
            <Label className="form-label" htmlFor="location">
              Location
            </Label>
            <Input
              name="location"
              placeholder="chicago"
              type="text"
              onChange={(event) =>
                this.setState({ location: event.target.value })
              }
              value={this.state.location}
            />
          </FormGroup>

          <br></br>
          <Button className="btn-auth" type="submit">
            {" "}
            Update Profile
          </Button>
        </Form>
        <br></br>
      </div>
    );
  }
}

export default UpdateProfile;
