import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { Goal } from "../../types/Types";
let APIURL = "http://localhost:3000";

interface DisplayGoalsProps {
  sessionToken: string;
  climberGoals: Array<Goal>;
  fetchClimberGoals: CallableFunction;
  openModal: () => void;
  setGoalToUpdate: (goal: Goal) => void;
  //edit and delete goal funcs
}

interface DisplayGoalsState {
  id: number;
  goaldescription: string;
  goalpriority: number;
  goalachieved: boolean;
}

class DisplayGoals extends Component<DisplayGoalsProps, DisplayGoalsState> {
  constructor(props: DisplayGoalsProps) {
    super(props);
    this.state = {
      id: 1,
      goaldescription: "",
      goalpriority: 1,
      goalachieved: false,
    };
  }

  componentDidMount() {
    // console.log("display comp mounted");
    // this.props.fetchClimberGoals();
  }

  componentDidUpdate() {
    // console.log(this.props.climberGoals);
    // this.props.fetchClimberGoals();
  }

  //     goalMapper = () =>{
  //         if (this.props.climberGoals.length > 0) {
  //             return this.props.climberGoals.map((goal: object, index: number) => {
  //                 return (
  //                     <li key={index}>
  //                         {goal}</li>)
  //             })
  //         } else {
  //           <p>Your goal deck is empty. Set a Goal to start working towards the climber you want to be.</p>
  //   }

  // updateGoal = async (goal: Goal) => {
  //     console.log(goal)
  //     try {
  //     const goalToUpdate = await fetch(`${APIURL}/goal/update/${goal.id}`, {
  //         method: "PUT",
  //         body: JSON.stringify(
  //             {
  //                 goal: {
  //                     goaldescription: this.state.goaldescription,
  //                     goalpriority: this.state.goalpriority,
  //                     goalachieved: false
  //                 }
  //             }),
  //             headers: new Headers({
  //                 "Content-Type": "application/json",
  //                 'Authorization': `Bearer ${this.props.sessionToken}`
  //             })
  //         })
  //         console.log(`${goalToUpdate} updated`)
  //     } catch {
  //     window.alert("couldn't update goal")
  //     }
  //     this.props.fetchClimberGoals()
  // }

  deleteGoal = async (goal: Goal) => {
    console.log(goal);
    try {
      const goalToDelete = await fetch(`${APIURL}/goal/delete/${goal.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      });
      console.log(`${goalToDelete} achieved`);
    } catch {
      window.alert("couldn't delete goal");
    }
    this.props.fetchClimberGoals();
  };

  render() {
    console.log(this.props.climberGoals);

    return (
      <div className="goal-display">
        <h1>Goal Display</h1>
        {this.props.climberGoals.length > 0 ? (
          this.props.climberGoals.map((goal: Goal, index: number) => (
              <Row key={index}>
              <Col sm="3">
                <Card key={goal.id}>
                  <CardBody>
                    <CardTitle tag="h5">
                      {index + 1} {goal.goaldescription}
                    </CardTitle>
                    <CardText>
                      {goal.goalachieved} priority: {goal.goalpriority}
                    </CardText>
                    <Button
                      onClick={() => {
                        this.props.setGoalToUpdate(goal);
                        this.props.openModal();
                      }}
                    >
                      Prioritize
                    </Button>
                    <Button onClick={() => this.deleteGoal(goal)}>
                      Achieved
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))
        ) : (
          <p>
            Your goal deck is empty. Set a Goal to start working towards the
            climber you want to be.
          </p>
        )}
      </div>
    );
  }
}

export default DisplayGoals;

//   {this.props.climberGoals.length > 0 ? (
//       <div className="goal-table">
//           <Table striped>
//               <thead>
//                   <tr>
//                       <th scope="row">Goal</th>
//                       <th>Priority</th>
//                       <th>Achieved</th>
//                   </tr>
//               </thead>
//               <tbody>

//                   {this.props.climberGoals.map((goal: any, index: number) =>
//                       <tr key={index}>
//                           <td>{index}</td>
//                           <td>{goal}</td>
//                           <td>
//                               <Button
//                               // onClick={(e) => this.setAchieved(index, e)}
//                               >Achieved
//                               </Button></td> </tr>)}
//               </tbody>
//           </Table>
//       </div>
//   ) : (
//       <p>Your goal deck is empty. Set a Goal to start working towards the climber you want to be.</p>)}
