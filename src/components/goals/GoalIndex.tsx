import { Component } from "react";
import { Container } from "reactstrap";
import CreateGoals from "../goals/CreateGoals";
import DisplayGoals from "../goals/DisplayGoals";
import UpdateGoals from "../goals/UpdateGoals";
import { Goal } from "../../types/Types";
import { Redirect } from "react-router-dom";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface GoalIndexProps {
  sessionToken: string;
}

interface GoalIndexState {
  climberGoals: Array<Goal>;
  modalVisible: boolean;
  goalToUpdate: Goal;
  goalA: number;
  goalB: number;
  goal: Goal;
}

class GoalIndex extends Component<GoalIndexProps, GoalIndexState> {
  constructor(props: GoalIndexProps) {
    super(props);
    this.state = {
      climberGoals: [],
      modalVisible: false,
      goalToUpdate: {
        id: 0,
        goaldescription: "update your goal",
        goalpriority: 0,
        goalachieved: false,
      },
      //added all three below
       goal: {
        id: 0,
        goaldescription: "",
        goalpriority: 0,
        goalachieved: false,
      },
      goalA: 1,
      goalB: 1
    };
  }

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
      })
      this.sortClimberGoals();
    } catch (error) {
      alert(error);
    }
  };
  
  //this won't work when i specify that it will intake an array of goals
  //says that the "this" keyword could possibly be undefined & 
  //that a and b dont exist of type Goal.
  sortClimberGoals = () =>  {
    if (this.state.climberGoals.length > 0) {
      this.state.climberGoals.sort(function (a, b) {
        if (a.goalpriority < b.goalpriority) {
          return -1;
        }
        if (a.goalpriority > b.goalpriority) {
          return 1;
        }
        return 0;
      })
    }
  }

  componentDidMount() {
    this.fetchClimberGoals();
  }

  setGoaltoUpdate = (goal: Goal) => {
    this.setState({ goalToUpdate: goal });
  };

  openModal = (): void => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = (): void => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    if (!this.props.sessionToken) return <Redirect to="/" />;

    return (
      <Container>
        <div>
          <DisplayGoals
            openModal={this.openModal}
            climberGoals={this.state.climberGoals}
            sessionToken={this.props.sessionToken}
            fetchClimberGoals={this.fetchClimberGoals}
            setGoalToUpdate={this.setGoaltoUpdate}
            sortClimberGoals={this.sortClimberGoals}
          />
          <CreateGoals
            sessionToken={this.props.sessionToken}
            fetchClimberGoals={this.fetchClimberGoals}
          />
          {this.state.modalVisible ? (
            <UpdateGoals
              sessionToken={this.props.sessionToken}
              fetchClimberGoals={this.fetchClimberGoals}
              climberGoals={this.state.climberGoals}
              goalToUpdate={this.state.goalToUpdate}
              closeModal={this.closeModal}
              openModal={this.openModal}
              modalVisible={this.state.modalVisible}
            />
          ) : (
            <> </>
          )}
        </div>
      </Container>
    );
  }
}

export default GoalIndex;
