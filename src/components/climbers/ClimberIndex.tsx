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
  Col,
  Row,
  Button
} from "reactstrap";
import AdamOndra from "../../assets/profilepics/AdamOndra.jpeg";
import AidClimber from "../../assets/profilepics/AidClimber.jpeg";
import Alpinist from "../../assets/profilepics/Alpinist.jpeg";
import BelaySpecs from "../../assets/profilepics/BelaySpecs.jpeg";
import DanielWoods from "../../assets/profilepics/DanielWoods.webp";
import RoyalRobbins from "../../assets/profilepics/RoyalRobbins.webp";
import SadoCracktivist from "../../assets/profilepics/SadoCracktivist.jpeg";
import IcePicker from "../../assets/profilepics/IcePicker.jpg";
import { Avatar } from "@mui/material";
import { Climber } from "../../types/Types";
import { Link } from "react-router-dom";
let APIURL = "http://localhost:3000";

interface ClimberIndexProps {
  sessionToken: string;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface ClimberIndexState {
  climberProfile: Climber;
  //the CardImg won't accept a prop of HTMLImageElement
  profilePic: string;
}

class ClimberIndex extends Component<ClimberIndexProps, ClimberIndexState> {
  constructor(props: ClimberIndexProps) {
    super(props);
    this.state = {
      profilePic: "",
      climberProfile: {
        id: 0,
        username: "",
        password: " ",
      },
    };
  }

  componentDidMount() {
    this.fetchClimberProfile();
  }

  changeProfilePic = () => {
    let climbingtype = this.state.climberProfile.climbingtype;
    if (climbingtype) {
      switch (climbingtype) {
        case "gym rat":
          this.setState({
            profilePic: AdamOndra,
          });
          break;
        case "boulder bro":
          this.setState({
            profilePic: DanielWoods,
          });
          break;
        case "bolt clipper":
          this.setState({
            profilePic: BelaySpecs,
          });
          break;
        case "trad dad":
          this.setState({
            profilePic: RoyalRobbins,
          });
          break;
        case "ice picker":
          this.setState({
            profilePic: IcePicker,
          });
          break;
        case "alpinist":
          this.setState({
            profilePic: Alpinist,
          });
          break;
        case "soloist":
          this.setState({
            profilePic: SadoCracktivist,
          });
          break;
        default:
          this.setState({
            profilePic: AidClimber,
          });
      }
    }
  };

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
      // console.log(climberProfile)
      this.setState({
        climberProfile: climberProfile,
      });
      this.changeProfilePic();
      console.log(climberProfile);
    } catch (error) {
      console.log(error);
      console.log("failed to fetch profile");
    }
    console.log(this.state.climberProfile);
  };

  render() {
    return (
      
      <div>
        <Container>
          <Container className="spaced-div">
            <div className="content-header">
          <h2>What's up, {this.state.climberProfile.username}</h2>
          <h3>You pullin plastic today?</h3>
</div>
          <Row>
            <Col>
              <Card className="climber-profile-card">
                <CardImg
                  id="profilePic"
                  src={this.state.profilePic}
                  alt="Card image cap"
                />
                <CardHeader tag="h3" style={{ fontWeight: "bolder" }}>
                  {this.state.climberProfile.username}
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h4">
                    {this.state.climberProfile.experiencelevel}
                    {" // "}
                    {this.state.climberProfile.climbingtype}
                  </CardTitle>
                  <CardSubtitle tag="h5" className="mb-2">
                    {this.state.climberProfile.gymname},{" "}
                    {this.state.climberProfile.location}{" "}
                  </CardSubtitle>
                  <a href=" " target="blank">
                    @mtprojhndl
                  </a>
                </CardBody>

                <CardFooter>
                  <Row>
                    <Col>
                      <Button outline color="warning" size="sm"
                        disabled
                   
                        // style={{
                        //   borderRadius:".5em",
                        //   backgroundColor: "#BD520F",
                        //   border: "none",
                        //   marginBottom: "2px"
                         
                        // }}
                      >
                        <Link to="/climber/sessions">edit profile</Link>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        
                        style={{
                          backgroundColor: "#df9627"
                        }}
                        size="sm"
                        color="warning"
                      >
                        <Link to="/climber/sessions"> new sesh</Link>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
</Col>
          </Row>
</Container>
         </Container>
        </div>
     
    );
  }
}

export default ClimberIndex;


  
                        