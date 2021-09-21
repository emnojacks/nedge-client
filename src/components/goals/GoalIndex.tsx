import * as React from 'react';
import { Component } from 'react';
import CreateGoals from '../goals/CreateGoals'
import DisplayGoals from '../goals/DisplayGoals'
//eventually import edit and delete goals
let APIURL = "http://localhost:3000";

interface GoalIndexProps {
    sessionToken: string 
}
 
interface GoalIndexState {
    climberGoals: Array<object>
}
 
class GoalIndex extends Component<GoalIndexProps, GoalIndexState> {
    constructor(props: GoalIndexProps) {
        super(props)
        this.state = {
            climberGoals: []
        }
    }
    
    fetchClimberGoals = async () => {
        try {
            console.log("fetching climber goals");
            const res = await fetch(`${APIURL}/goal/mine/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.sessionToken}`
                }),
            })
            const data = await res.json();
            this.setState({
            climberGoals: data
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        };
    };
    
    componentDidMount() {
        this.fetchClimberGoals();
      //this.fetchSessions();       
    };

    
    render() {
        return (
            <div>
                ClimberIndex
                <CreateGoals
                    sessionToken={this.props.sessionToken}
                    fetchClimberGoals={this.fetchClimberGoals}
                />
                <DisplayGoals
                 climberGoals={this.state.climberGoals}
                    sessionToken={this.props.sessionToken}
                    fetchClimberGoals={this.fetchClimberGoals}
                />
                {/* //edit component here  */}
                
            </div>);
    }
}
 
export default GoalIndex;