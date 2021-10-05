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
  Button,
} from "reactstrap";
import AdamOndra from "../../assets/profilepics/AdamOndra.jpeg";
import AidClimber from "../../assets/profilepics/AidClimber.jpeg";
import Alpinist from "../../assets/profilepics/Alpinist.jpeg";
import BelaySpecs from "../../assets/profilepics/BelaySpecs.jpeg";
import DanielWoods from "../../assets/profilepics/DanielWoods.webp";
import RoyalRobbins from "../../assets/profilepics/RoyalRobbins.webp";
import SadoCracktivist from "../../assets/profilepics/SadoCracktivist.jpeg";
import IcePicker from "../../assets/profilepics/IcePicker.jpg";
import { Climber } from "../../types/Types";
import { Goal } from "../../types/Types";
import { Link } from "react-router-dom";
import APIURL from "../../helpers/environment.js";
import { JsxElement } from "typescript";
// let APIURL = "http://localhost:3000";

interface ClimberIndexProps {
  sessionToken: string;
  setIsAdmin: (isAdmin: boolean) => void;
}

interface ClimberIndexState {
  climberProfile: Climber;
  //the CardImg won't accept a prop of HTMLImageElement
  profilePic: string;
  climberGoals: Array<Goal>;
  topGoal: Goal;
  goal: Goal;
  topGoalDescription: string;
  tipToDisplay: JSX.Element;
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
      goal: {
        id: 0,
        goaldescription: "",
        goalpriority: 0,
        goalachieved: false,
      },
      topGoal: {
        id: 0,
        goaldescription: "",
        goalpriority: 0,
        goalachieved: false,
      },
      climberGoals: [],
      topGoalDescription: "",
      tipToDisplay: <ul></ul>,
    };
  }

  componentDidMount() {
    this.fetchClimberProfile();
    this.fetchClimberGoals();
  }

  changeProfilePic = (): void => {
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
      this.setState({
        climberProfile: climberProfile,
      });
      this.changeProfilePic();
    } catch (error) {
      console.log(error, "failed to fetch profile");
    }
  };

  fetchClimberGoals = async () => {
    try {
      console.log("fetching climber goals");
      const res = await fetch(`${APIURL}/goal/mine`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      const json = await res.json();
      this.setState({
        climberGoals: json.existingGoals,
      });
      this.findTopGoal();
    } catch (error) {
      alert(error);
    }
  };

  findTopGoal = async () => {
    if (this.state.climberGoals.length > 0) {
      const topGoal = this.state.climberGoals.find(
        (goal) => goal.goalpriority === 1
      );
      this.setState({
        topGoal: topGoal!,
        // topGoalDescription: this.state.topGoal.goaldescription
      });
      console.log(this.state.topGoal.goaldescription);
      this.determineTrainingTip();
    } else {
      console.log("no top goals");
    }
  };

  determineTrainingTip = () => {
    console.log(this.state.topGoal.goaldescription);
    if (this.state.topGoal.goaldescription === "increase endurance") {
      this.setState({
        tipToDisplay: (
          <ul>
            <li> do 2 full circuits of easy routes on the boulder wall</li>
            <li> double up on rope climbs</li>
            <li>
              traverse the boulder wall or roped areas during gym slow time
            </li>
          </ul>
        ),
      });
    } else if (
      this.state.topGoal.goaldescription === "increase tendon strength"
    ) {
      this.setState({
        tipToDisplay: (
          <ul>
            <li>do up and downs on the tension board at 50% lift</li>
            <li>do a short hangboard warmup before you start your session</li>
            <li>do a longer hangboard interval session after you climb</li>
            <li>remember proper form is to engage your core and shoulders</li>
          </ul>
        ),
      });
    } else if (
      this.state.topGoal.goaldescription === "increase muscle strength"
    ) {
      this.setState({
        tipToDisplay: (
          <ul>
            <li>cross train at least once a week</li>
            <li>do 10 lat pull downs</li>
            <li>squat the bar, then add weight slowly</li>
            <li>
              start deadlifting with a primary goal of 100% of your bodyweight,
              then 1.5x - 2x your body weight
            </li>
          </ul>
        ),
      });
    } else if (this.state.topGoal.goaldescription === "improve mental game") {
      this.setState({
        tipToDisplay: (
          <ul>
            <li>Read Maxiumum Climbing or Climbing Warrior</li>
            <li>
              Meditate for 5 minutes in your car before you get in the gym
            </li>
            <li>
              Consciously relax each part of your body before you get on the
              wall
            </li>
          </ul>
        ),
      });
    } else if (this.state.topGoal.goaldescription === "work on technique") {
      this.setState({
        tipToDisplay: (
          <ul>
            <li>Focus on a singler chosen technique for the whole session</li>
            <li>
              When you top out or clip the chains, ask yourself if you focused
              on that technique for that climb or how you did
            </li>
            <li>
              Here are some to get you started: breathwork, locking off, hanging
              low on slopers, and not climbing square to the wall{" "}
            </li>
          </ul>
        ),
      });
    } else {
      <></>;
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Container className="spaced-div-auto">
            <div className="content-header">
              <h2>Hey, {this.state.climberProfile.username}</h2>
              <h3>Hopefully your climbing sessions are going well!</h3>
              <h4 style={{ paddingTop: "10px" }}>
                {this.state.topGoal.goaldescription !== "" ? (
                  <span className="highlighted">
                    &nbsp;Remember, your primary goal right now is to
                    <strong> {this.state.topGoal.goaldescription}</strong>
                    .&nbsp; Try these tips for your next sesh:
                  </span>
                ) : (
                  "Looks like you don't have any goals set as your top priority. Head over to the Goal Deck and set some up!"
                )}
              </h4>
              <div id="tip-display">{this.state.tipToDisplay}</div>
              <Button className="btn-auth">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/climber/sessions"
                >
                  {" "}
                  log new sesh
                </Link>
              </Button>
              &nbsp; &nbsp;
              <Button className="btn-auth">
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to="/climber/goals"
                >
                  {" "}
                  prioritize my goals
                </Link>
              </Button>
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
                    <a href="https://www.mountainproject.com/" target="blank">
                      @mtprojhndl
                    </a>
                  </CardBody>

                  <CardFooter>
                    <Row>
                      <Col>
                        <Button outline color="warning" size="sm" disabled>
                          <Link to="/climber/sessions">edit profile</Link>
                        </Button>
                      </Col>
                      <Col></Col>
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
