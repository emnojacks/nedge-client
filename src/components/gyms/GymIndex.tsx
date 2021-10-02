import { Component } from "react";
import { Container, Table } from "reactstrap";
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
    // if (!this.props.isAdmin) return <Redirect to="/" />;

    return (
      <div>
        <Container className="lighter-div">
          <Container className="inner-container">
            <div className="header-content">
              <h2>climbers on NEDGE</h2>
            </div>
            <div className="climber-display">
              <Table hover striped
              
              >
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Location</th>
                    <th>Home Gym</th>
                    <th>Style</th>
                    <th>Experience</th>
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
                          <td>
                            {climberProfile.climbingtype}
                          </td>
                          <td>
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
