import { Component } from "react";
import { Container, Table, Button } from "reactstrap";
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
}

class GymIndex extends Component<GymIndexProps, GymIndexState> {
  constructor(props: GymIndexProps) {
    super(props);
    this.state = {
      climberProfiles: [],
    };
  }

  componentDidMount() {
    this.fetchClimberProfiles();
    console.log('mounted');
  }

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
      const json = await res.json();
      this.setState({
        climberProfiles: json.climberProfiles,
      });
    } catch (error) {
      console.log(error,
      "failed to fetch profiles");
    }
     console.log(this.state.climberProfiles);
    console.log(this.state.climberProfiles.length);
  };

  fetchGymMembers = async () => {
    try {
      console.log("fetching climber profiles");
      const res = await fetch(`${APIURL}/gym/gym_members`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      const json = await res.json();
      this.setState({
        climberProfiles: json.climberProfiles,
      });
      console.log(this.state.climberProfiles)
    } catch (error) {
      console.log(error,
      "failed to fetch profiles");
    }
    console.log(this.state.climberProfiles);
    console.log(this.state.climberProfiles.length);
  };
      
  //this won't work when i specify that it will intake an array of climbers
  //says that the "this" keyword could possibly be undefined & 
  //that a and b dont exist on type climber
  sortClimberProfiles = () =>  {
    if (this.state.climberProfiles.length > 0) {
      this.state.climberProfiles.sort(function (a, b) {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      })
    }
  }

  render() {
    if (!this.props.sessionToken) return <Redirect to="/" />;
    this.sortClimberProfiles();
    if (!this.props.isAdmin) return <Redirect to="/" />;

    return (
      <div>
        <Container className="lighter-div">
          <Container>
            <div className="header-content">
              <h2>climbers on NEDGE</h2>
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
          
          <Button className="btn-auth"
          onClick={this.fetchGymMembers}
          >
          just climbers at my gym
          </Button>
        </Container>
      </div>
    );
  }
}

export default GymIndex;
