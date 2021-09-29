import { Component } from "react";
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button,
} from "reactstrap";
import { Redirect } from 'react-router-dom';
import { Climber } from "../../types/Types";

let APIURL = "http://localhost:3000";

interface GymIndexProps {
  sessionToken: string;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface GymIndexState {
  climberProfiles: Array<Climber>;
  //the CardImg won't accept a prop of HTMLImageElement
  profilePic: string;
}

class GymIndex extends Component<GymIndexProps, GymIndexState> {
  constructor(props: GymIndexProps) {
    super(props);
    this.state = {
      profilePic: "",
      climberProfiles: [],
    };
  }

  componentDidMount() {
    this.fetchClimberProfiles();
  }

  // changeProfilePic = () => {
  //     let climbingtype = this.state.climberProfiles;
  //     if (climbingtype) {
  //         switch (climbingtype) {
  //             case "gym rat":
  //                 this.setState({
  //                     profilePic: AdamOndra
  //                 })
  //                 break;
  //             case "boulder bro":
  //                 this.setState({
  //                     profilePic: DanielWoods
  //                 })
  //                 break;
  //             case "bolt clipper":
  //                 this.setState({
  //                     profilePic: BelaySpecs
  //                 })
  //                 break;
  //             case "trad dad":
  //                 this.setState({
  //                     profilePic: RoyalRobbins
  //                 })
  //                 break;
  //             case "ice picker":
  //                 this.setState({
  //                     profilePic: IcePicker
  //                 })
  //                 break;
  //             case "alpinist":
  //                 this.setState({
  //                     profilePic: Alpinist
  //                 })
  //                 break;
  //             case "soloist":
  //                 this.setState({
  //                     profilePic: SadoCracktivist
  //                 })
  //                 break;
  //             default:
  //                 this.setState({
  //                     profilePic: AidClimber
  //                 })
  //         }
  //     }
  // }

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
      // this.changeProfilePic();
      console.log(climberProfiles);
    } catch (error) {
      console.log(error);
      console.log("failed to fetch profiles");
    }
    console.log(this.state.climberProfiles);
  };

  render() {
    
    if  (!this.props.sessionToken) 
        return <Redirect to= "/" />
    
    if (!this.props.isAdmin)
      return <Redirect to="/" />
    
    return (
      <Container>
        <div>
          <Card className="climber-profile-card">
            <CardImg
              // top width="50%"
              id="profilePic"
              src={this.state.profilePic}
              alt="Card image cap"
            />
            <CardHeader tag="h4">
              {/* {this.state.climberProfile.username} */}
            </CardHeader>
            <CardBody>
              <CardTitle tag="h5">
                {/* {this.state.climberProfile.experiencelevel}{" "}
                {this.state.climberProfile.climbingtype} */}
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {/* {this.state.climberProfile.gymname},{" "}
                {this.state.climberProfile.location}{" "} */}
              </CardSubtitle>
            </CardBody>
            <CardFooter>
              <Button size="sm" className="btn-profile-edit">
                Edit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    );
  }
}

export default GymIndex;
