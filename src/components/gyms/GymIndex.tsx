import { Component } from "react";
import { Container, Table } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Climber } from "../../types/Types";

let APIURL = "http://localhost:3000";

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
      const climberProfiles = await res.json();
      // console.log(climberProfiles)
      this.setState({
        climberProfiles: climberProfiles,
      });
      console.log(climberProfiles);
      // this.climberProfileMapper();
    } catch (error) {
      console.log(error);
      console.log("failed to fetch profiles");
    }
    console.log(this.state.climberProfiles);
  };

  climberProfileMapper = () => {
    if (this.state.climberProfiles.length > 0) {
      return this.state.climberProfiles.map((climberProfile, index) => {
        return (
          <tr key={this.state.climberProfiles[index].id}>
            <th scope="row"></th>
            <td>{this.state.climberProfiles[index].username}</td>
            <td>{this.state.climberProfiles[index].location}</td>
            <td>{this.state.climberProfiles[index].gymname}</td>
            <td>{this.state.climberProfiles[index].needpartner}</td>
            <td>{this.state.climberProfiles[index].climbingtype}</td>
            <td>{this.state.climberProfiles[index].experiencelevel}</td>
          </tr>
        );
      });
    }
  };

  render() {
    if (!this.props.sessionToken) return <Redirect to="/" />;

    if (!this.props.isAdmin) return <Redirect to="/" />;

    return (
      <div>
        <Container className="lighter-div">
          <Container className="inner-container">
            <div className="header-content">
              <h2>climbers on NEDGE</h2>
            </div>
            <div className="climber-display">
              <Table hover striped>
                <thead>
                  <tr>
                    <th>Climber Name</th>
                    <th>Location</th>
                    <th>Home Gym</th>
                    <th>Need Partner</th>
                    <th>Climbing Type</th>
                    <th>Experience Level</th>
                  </tr>
                </thead>
                <tbody>{this.climberProfileMapper}</tbody>
              </Table>
            </div>
          </Container>
        </Container>
      </div>
    );
  }
}

export default GymIndex;
