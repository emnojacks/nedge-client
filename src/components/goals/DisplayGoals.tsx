import React, { Component } from 'react';
let APIURL ="http://localhost:3000"

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
              {this.props.climberGoals.length > 0 ? (
              <>
                  {this.props.climberGoals.map((goal: string, index: number)) => {
        
        </div>
              }
              
              
)



}
   </div>);
    }
}

export default DisplayGoals;

