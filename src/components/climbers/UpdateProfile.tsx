import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
} from "reactstrap";
import { Climber } from "../../types/Types";
let APIURL = "http://localhost:3000";

interface UpdateProfileProps {
  sessionToken: string;
  climberProfile: { [key: string]: any }
  fetchClimberProfile: () => void;
}

interface UpdateProfileState {
  id: number;
  gymname?: string;
  needpartner?: boolean;
  experiencelevel?: string;
  climbingtype?: string;
  location?: string;
  // options: Array<string>;
}

class UpdateProfile extends Component<UpdateProfileProps, UpdateProfileState> {
  constructor(props: UpdateProfileProps) {
    super(props);
    this.state = {
      id: this.props.climberProfile.id,
      gymname: this.props.climberProfile.gymname,
      needpartner: this.props.climberProfile.needpartner,
      experiencelevel: this.props.climberProfile.experiencelevel,
      climbingtype: this.props.climberProfile.climbingtype,
      location: this.props.climberProfile.location,
    };
  }

  handleChange=(event: React.ChangeEvent<HTMLInputElement>): void=>{
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    } as unknown as Pick<Climber, keyof Climber>);
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
          climbingtype: this.props.climberProfile.climbingtype,
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
                placeholder="'Climb Time'"
                type="text"
                onChange={this.handleChange}
                value={this.state.gymname}
              />
            </InputGroup>
          </FormGroup>

          {/* NEEDPARTNER */}
          <FormGroup>
            <InputGroup>
              <Label className="form-label" htmlFor="needpartner">
                Need a Belay?
              </Label>
              <Input
                name="needpartner"
                type="checkbox"
                onChange={this.handleChange}
              />
            </InputGroup>
          </FormGroup>

          {/* EXPERIENCELEVEL */}
          <FormGroup>
            <InputGroup>
              <Label className="form-label" htmlFor="experiencelevel">
                Experience Level
                <select
                  name="experiencelevel"
                  onChange={(event) =>
                    this.setState({ experiencelevel: event.target.value })
                  }
                >
                  <option value="noob">noob - gumby </option>
                  <option value="gumby but psyched">
                    intermediate - weekend warrior
                  </option>
                  <option value="veteran">incumbent dirtbag</option>
                  <option value="veteran">seasoned veteran - trad dad</option>
                </select>
              </Label>
              {/* <datalist id="experiencelevel">
                {this.state.options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
               
              </datalist> */}
            </InputGroup>
          </FormGroup>

          {/* LOCATION */}
          <FormGroup>
            <Label className="form-label" htmlFor="experiencelevel">
              What are you psyched on?
              <select
                name="experiencelevel"
                onChange={(event) =>
                  this.setState({ climbingtype: event.target.value })
                }
              >
                <option value="bouldering">booldering</option>
                <option value="sport">clipping bolts</option>
                <option value="trad">plugging gear</option>
                <option value="ice">picking ice</option>
                <option value="alpine">big wall</option>
              </select>
            </Label>
          </FormGroup>

          {/* LOCATION */}
          <FormGroup>
            <InputGroup>
              <Label className="form-label" htmlFor="location">
                City
              </Label>
              <Input
                name="location"
                placeholder="'Chicago'"
                type="text"
                onChange={this.handleChange}
                value={this.state.location}
              />
            </InputGroup>
          </FormGroup>

          <br></br>
          <Button type="submit">Update Climber Profile</Button>
        </Form>
        <br></br>
      </div>
    );
  }
}

export default UpdateProfile;
