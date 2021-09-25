import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  DropdownToggle,
  DropdownItem,
  InputGroup,
  InputGroupButtonDropdown,
} from "reactstrap";
import { IndexKind } from "typescript";
import { Climber } from "../../types/Types";
let APIURL = "http://localhost:3000";

interface UpdateProfileProps {
  sessionToken: string;
  climberProfile: Climber;
  fetchClimberProfile: () => void;
}

interface UpdateProfileState {
  id: number;
  gymname: string | undefined;
  needpartner: boolean | undefined;
  experiencelevel: string | undefined;
  location: string | undefined;
  options: Array<string>;
}

class UpdateProfile extends Component<UpdateProfileProps, UpdateProfileState> {
  constructor(props: UpdateProfileProps) {
    super(props);
    this.state = {
      id: this.props.climberProfile.id,
      gymname: this.props.climberProfile.gymname,
      needpartner: this.props.climberProfile.needpartner,
      experiencelevel: this.props.climberProfile.experiencelevel,
      location: this.props.climberProfile.location,
      options: [
        "noob",
        "gumby but psyched",
        "intermediate",
        "veteran",
        "ondra",
      ],
    };
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    fetch(`${APIURL}/climber/profile/${this.props.climberProfile.id}`, {
      method: "PUT",
      body: JSON.stringify({
        climber: {
          gymname: this.props.climberProfile.gymname,
          needpartner: this.props.climberProfile.needpartner,
          experiencelevel: this.props.climberProfile.experiencelevel,
          location: this.props.climberProfile.location,
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
        this.props.fetchClimberProfile();
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
            <InputGroup>
              <Label className="form-label" htmlFor="gymname">
                Home Gym
              </Label>
              <Input
                name="gymname"
                placeholder="'climb time'"
                type="text"
                onChange={(event) =>
                  this.setState({ gymname: event.target.value })
                }
                value={this.state.gymname}
              />
            </InputGroup>
          </FormGroup>

          {/* NEEDPARTNER */}
          <FormGroup>
            <InputGroup>
              <Label className="form-label" htmlFor="needpartner">
                Need a Partner?
              </Label>
              <Input
                name="needpartner"
                type="checkbox"
                onChange={() => this.setState({ needpartner: true })}
              />
            </InputGroup>
          </FormGroup>

          {/* EXPERIENCELEVEL */}
          <FormGroup>
            <InputGroup>
              <Label className="form-label" htmlFor="experiencelevel">
                Experience Level
              </Label>
              <Input
                type="text"
                list="options"
                name="experiencelevel"
                id="experiencelevel"
                placeholder="beginner"
                onChange={(event) =>
                  this.setState({ experiencelevel: event.target.value })
                }
              />
              <select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
              {/* <datalist id="experiencelevel">
                {this.state.options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
               
              </datalist> */}
            </InputGroup>
          </FormGroup>

          {/* LOCATION */}
          <FormGroup>
            <InputGroup>
              <Label className="form-label" htmlFor="location">
                Location
              </Label>
              <Input
                name="location"
                placeholder="'Chicago'"
                type="text"
                onChange={(event) =>
                  this.setState({ location: event.target.value })
                }
                value={this.state.location}
              />
            </InputGroup>
          </FormGroup>

          <br></br>
          <Button className="btn-auth" type="submit">
            Update Profile
          </Button>
        </Form>
        <br></br>
      </div>
    );
  }
}

export default UpdateProfile;
