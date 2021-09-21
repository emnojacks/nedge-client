import React, { Component } from 'react';
import {Table, Button} from 'reactstrap'
let APIURL = "http://localhost:3000"


interface DisplayGoalsProps {
    sessionToken: string
    climberGoals: Array<object>
    fetchClimberGoals: CallableFunction
    //edit and delete goal funcs
}
 
interface DisplayGoalsState {
    goaldescription: string
    goalpriority: string
    goalachieved: boolean
    climberGoals: Array <object>
}
 
class DisplayGoals extends Component<DisplayGoalsProps, DisplayGoalsState> {
    constructor(props: DisplayGoalsProps) {
        super(props)
        this.state = {
            goaldescription: "",
            goalpriority: "first",
            goalachieved: false,
            climberGoals: [],
        }
    }
   
    render() { 
      return (
          <div className="goal-display">
              <h1>Goal Display</h1>
          <div>
                <Table striped>
                <thead>
                <tr>
                <th scope="row">Goal</th>
                <th>Priority</th>
                <th>Achieved</th>
                </tr>
                </thead>
                <tbody>
                {this.props.climberGoals.map((goal: any, index: number) => 
                <tr key = {index}>                
             <td>{index}</td>
            <td>{goal}</td>
            <td>
            <Button   
                            // onClick={(e) => this.setAchieved(index, e)}
                            >Achieved
             </Button></td> </tr> )}
            </tbody>
            </Table>
              </div>
              <p>Your goal deck is empty. Set a Goal to start working towards the climber you want to be.</p>
   </div>);
    }
}

export default DisplayGoals;

