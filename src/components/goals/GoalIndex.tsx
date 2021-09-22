import * as React from 'react';
import { Component } from 'react';
import CreateGoals from '../goals/CreateGoals'
import DisplayGoals from '../goals/DisplayGoals'
import { Goal } from '../../types/Types';
let APIURL = "http://localhost:3000";

//eventually import edit and delete goals

interface GoalIndexProps {
    sessionToken: string 
}
 
interface GoalIndexState {
    climberGoals: Array<Goal>
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
            const json = await res.json();
            this.setState({
            climberGoals: json.existingGoals
            })
            console.log(this.state.climberGoals)
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
            <h2>Goal Index</h2>
                <DisplayGoals
                    climberGoals={this.state.climberGoals}
                    sessionToken={this.props.sessionToken}
                    fetchClimberGoals={this.fetchClimberGoals}
                />
                   <CreateGoals
                    sessionToken={this.props.sessionToken}
                    fetchClimberGoals={this.fetchClimberGoals}
                />
                {/* //edit component here  */}
                
            </div>);
    }
}
 
export default GoalIndex;