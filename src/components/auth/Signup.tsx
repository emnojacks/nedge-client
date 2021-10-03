import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Button,
  Col,
  Container,
  FormText,
} from "reactstrap";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface SignupProps {
  updateSessionToken: (newToken: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface SignupState {
  id: number;
  username: string;
  password: string;
  gymname: string;
  needpartner: boolean;
  experiencelevel: string;
  climbingtype: string;
  location: string;
  isAdmin: boolean;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      id: 0,
      username: "",
      password: "",
      gymname: "",
      needpartner: false,
      experiencelevel: "",
      climbingtype: "",
      location: "",
      isAdmin: false,
    };
  }

  handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    try {
      fetch(`${APIURL}/climber/create`, {
        method: "POST",
        body: JSON.stringify({
          climber: {
            username: this.state.username,
            password: this.state.password,
            gymname: this.state.gymname,
            needpartner: this.state.needpartner,
            experiencelevel: this.state.experiencelevel,
            climbingtype: this.state.climbingtype,
            location: this.state.location,
            isAdmin: this.state.isAdmin,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((res) => res.json())
        .then((data) =>
        //takes the session token from the response and passes it to the updatetoken object
        {
          //displays what message the server has programmed
          window.alert(data.message);
          if (data.sessionToken) {
            this.props.updateSessionToken(data.sessionToken);
            // console.log(data.climber.isAdmin);
            if (data.climber.isAdmin === true) {
              this.props.setIsAdmin(this.state.isAdmin);
              // console.log("climber set to admin via signup");
            }
          }
        }
        )
    }
    catch (error) {
      window.alert(error)
      console.log(error);
      };
  };

  render() {
    return (
      <div>
        <Container className="spaced-div">
          <div className="content-header">
            <h2>climber signup</h2>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Label className="form-label" htmlFor="username">
                  create username&nbsp;&nbsp;
                </Label>
                <Input
                  className="sign-up-input-area"
                  name="username"
                  title="Username should be at least 4 characters. Try your name or a nickname!"
                  minLength={4}
                  placeholder="AlexHandhold"
                  type="text"
                  aria-required="true"
                  required
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ username: event.target.value })
                  }
                  value={this.state.username}
                />
                
              </InputGroup>

              <FormText
              color="white"
            >hint: use your name or nickname so climbers can find you</FormText>
            </FormGroup>
            <br></br>
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Label className="form-label" htmlFor="password">
                  create password&nbsp;&nbsp;
                </Label>

                <Input
                  className="sign-up-input-area"
                  pattern="^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$"
                  title="Password must be at least 6 characters, and contain at least 1 uppercase character, a lowercase character, a number, and a special character."
                  name="password"
                  placeholder="s3cR3t!"
                  type="password"
                  aria-required="true"
                  required
                  minLength={6}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ password: event.target.value })
                  }
                  value={this.state.password}
                />
              </InputGroup>
                <FormText
              color="white"
            >hint: strong, spicy, special, & six chars</FormText>
            </FormGroup>
            <br></br>
            {/* GYMNAME*/}
            <FormGroup row className="sign-up-input-grp">
              <Col sm={5}>
                <Label className="form-label" htmlFor="gymname">
                  home gym&nbsp;&nbsp;
                  <select
                    className="sign-up-input-area"
                    name="gymname"
                    required
                    onChange={(event) =>
                      this.setState({ gymname: event.target.value })
                    }
                  >
                    <option value="Select your gym">your gym</option>
                    <option value="Ball State University Climbing">
                      Ball State University Climbing
                    </option>
                    <option value="Climb Time Indy">Climb Time Indy</option>

                    <option value="Columbus Rock Gym">Columbus Rock Gym</option>
                    <option value="Epic">Epic</option>
                    <option value="Hoosier Heights Bloomington">
                      Hoosier Heights Bloomington
                    </option>
                    <option value="Hoosier Heights Indy">
                      Hoosier Heights Indy
                    </option>
                    <option value="Indiana University Outdoor Adventures">
                      IU Outdoor Adventures
                    </option>
                    <option value="North Mass Boulder">
                      North Mass Boulder
                    </option>
                    <option value="Vertical eXcape Climbing">
                      Vertical eXcape Climbing
                    </option>
                  </select>
                </Label>
              </Col>
            </FormGroup>
            {/* stretch goal: <datalist id="experiencelevel">
                {this.state.options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
               
              </datalist> */}
            <br></br>
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Col sm={5}>
                  <Label check className="form-label" htmlFor="isAdmin">
                    Do you work at this gym? All gym employees can set up an
                    account with gym views.
                  </Label>
                </Col>
                <Col sm={5}>
                  <Input
                    name="isAdmin"
                    type="checkbox"
                    onChange={() => this.setState({ isAdmin: true })}
                  />
                </Col>
              </InputGroup>
            </FormGroup>
            <br></br>
            {/* NEEDPARTNER */}
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Col sm={5}>
                  <Label check className="form-label" htmlFor="needpartner">
                    Want a catch from time to time?
                  </Label>
                </Col>
                <Col sm={5}>
                  <Input
                    name="needpartner"
                    type="checkbox"
                    onChange={() =>
                      this.setState({ needpartner: !this.state.needpartner })
                    }
                  />
                </Col>
              </InputGroup>
            </FormGroup>
            <br></br>
            {/* EXPERIENCELEVEL */}
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Col sm={5}>
                  <Label className="form-label" htmlFor="experiencelevel">
                    climbing experience&nbsp;&nbsp;
                    <select
                      className="sign-up-input-area"
                      name="experiencelevel"
                      onChange={(event) =>
                        this.setState({ experiencelevel: event.target.value })
                      }
                    >
                      <option value="">your experience</option>
                      <option value="noob">noob</option>
                      <option value="gumby">gumby</option>
                      <option value="weekend warrior">weekend warrior</option>
                      <option value="plain psyched">plain psyched</option>
                      <option value="former, future, current dirtbag">
                        former, future, current dirtbag
                      </option>
                      <option value="FT climber PT human">
                        FT climber, PT human
                      </option>
                      <option value="dusty veteran">dusty veteran</option>
                    </select>
                  </Label>
                </Col>
              </InputGroup>
            </FormGroup>
            <br></br>
            {/* CLIMBINGTYPE*/}
            <FormGroup row className="sign-up-input-grp">
              <Col sm={5}>
                <Label className="form-label" htmlFor="climbingtype">
                  What are you psyched on?&nbsp;&nbsp;
                  <select
                    className="sign-up-input-area"
                    name="climbingtype"
                    onChange={(event) =>
                      this.setState({ climbingtype: event.target.value })
                    }
                  >
                    <option value="">your style</option>
                    <option value="gym rat">pulling plastic</option>
                    <option value="boulder bro">bouldering bro</option>
                    <option value="bolt clipper">clipping bolts</option>
                    <option value="trad dad">plugging gear</option>
                    <option value="ice picker">picking ice</option>
                    <option value="alpinist">big wall</option>
                    <option value="soloist">soloist</option>
                  </select>
                </Label>
              </Col>
            </FormGroup>
            <br></br>
            {/* LOCATION */}
            <FormGroup row>
              <InputGroup className="sign-up-input-grp">
                <Label className="form-label" htmlFor="location">
                  city&nbsp;&nbsp;
                </Label>
                <Input
                  className="sign-up-input-area"
                  name="location"
                  placeholder="'Indianapolis'"
                  type="text"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    this.setState({ location: event.target.value })
                  }
                  value={this.state.location}
                />
              </InputGroup>
            </FormGroup>
            <Button color="warning" className="btn-auth" type="submit">
              sign up
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Signup;
