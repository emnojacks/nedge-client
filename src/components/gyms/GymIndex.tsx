import { Component } from "react";
import { Container, Table, Row, Input, Label } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Climber } from "../../types/Types";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface GymIndexProps {
  sessionToken: string;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface GymIndexState {
  climberProfiles: Array<Climber>;
  climberProfile: Climber;
  memberOnlyRows: boolean;
}

class GymIndex extends Component<GymIndexProps, GymIndexState> {
  constructor(props: GymIndexProps) {
    super(props);
    this.state = {
      climberProfile: {
        id: 0,
        username: "",
        password: " ",
      },
      climberProfiles: [],
      memberOnlyRows: true,
    };
  }

  componentDidMount() {
    this.fetchClimberProfile();
    this.fetchClimberProfiles();
  }

  fetchClimberProfile = async () => {
    try {
      console.log("fetching climber profile");
      const res = await fetch(`${APIURL}/climber/profile`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      const climberProfile = await res.json();
      this.setState({
        climberProfile: climberProfile,
      });
      console.log(this.state.climberProfile);
    } catch (error) {
      console.log(error, "failed to fetch profile");
    }
  };

  fetchClimberProfiles = async () => {
    try {
      console.log("fetching climber profiles");
      const res = await fetch(`${APIURL}/gym/profiles`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      const climberProfiles = await res.json();
      this.setState({
        climberProfiles: climberProfiles.climberProfiles,
      });
    } catch (error) {
      console.log(error, "failed to fetch profiles");
    }
    console.log(this.state.climberProfiles);
    console.log(this.state.climberProfiles.length);
  };


  //this won't work when i specify that it will intake an array of climbers
  //says that the "this" keyword could possibly be undefined &
  //that a and b dont exist on type climber

  sortClimberProfiles = () => {
    if (this.state.climberProfiles.length > 0) {
      this.state.climberProfiles.sort(function (a, b) {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      });
    }
  };

  toggleTableView = (): void => {
    this.setState({
      memberOnlyRows: !this.state.memberOnlyRows,
    });
    if (this.state.memberOnlyRows === true) {
      this.filterClimberProfiles();
    } else {
      this.fetchClimberProfiles();
    }
  };

  filterClimberProfiles = () => {
    if (this.state.climberProfile.gymname) {
      const gymname = this.state.climberProfile.gymname;
      const climberProfiles = this.state.climberProfiles;
      const membersOnly = climberProfiles.filter(
        (climber) => climber.gymname === gymname
      );
      this.setState({
        climberProfiles: membersOnly,
      });
    }
  };

  render() {
    if (!this.props.sessionToken) return <Redirect to="/" />;
    if (!this.props.isAdmin) return <Redirect to="/" />;
    this.sortClimberProfiles();

    return (
      <div>
        <Container className="lighter-div">
          <Container>
            <div className="header-content">
              <h2>climbers on NEDGE</h2>
              <Row>
                {this.state.climberProfile.gymname ? (
                  <Container>
                    <p>
                      Looks like you're currently haunt the walls of{" "}
                      <strong> {this.state.climberProfile.gymname}</strong>.
                      Toggle to see members at your gym.
                    </p>
                    <Label className="switch">
                      <Input
                        id="tableViewToggler"
                        type="checkbox"
                        onClick={this.toggleTableView}
                      />
                      <span className="slider round"></span>
                    </Label>
                  </Container>
                ) : (
                  <>
                    Looks like you don't have a homegym. If that's changed,
                    update your profile.{" "}
                  </>
                )}
              </Row>
              <br></br>
            </div>
            <div className="climber-display">
              <Table hover striped className="gym-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Location</th>
                    <th>Home Gym</th>
                    <th id="gym-table-style-header">Style</th>
                    <th id="gym-table-experience-header">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.climberProfiles.length > 0 ? (
                    this.state.climberProfiles.map(
                      (climberProfile: Climber, index: number) => (
                        <tr key={index}>
                          <td>{climberProfile.username}</td>
                          <td>{climberProfile.location}</td>
                          <td>{climberProfile.gymname}</td>
                          <td id="gym-table-style-col">
                            {climberProfile.climbingtype}
                          </td>
                          <td id="gym-table-experience-col">
                            {climberProfile.experiencelevel}
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <>No climbers to display</>
                  )}
                </tbody>
              </Table>
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default GymIndex;
