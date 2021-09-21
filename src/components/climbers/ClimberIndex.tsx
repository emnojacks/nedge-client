import * as React from 'react';
import { Component } from 'react';
import CreateSession from '../sessions/CreateSession'
// import DisplayGoals from '../goals/DisplayGoals'
//cant display just Display bc of data 
import GoalIndex from '../goals/GoalIndex'
let APIURL = "http://localhost:3000";


interface ClimberIndexProps {
    sessionToken: string 
}
 
interface ClimberIndexState {
   
}
 
class ClimberIndex extends Component<ClimberIndexProps, ClimberIndexState> {
    constructor(props: ClimberIndexProps) {
        super(props)
        this.state = {
            sessionToken: ""
        }
    }
    
    componentDidMount() {
      //this.fetchSessions();       
    };

    
    render() {
        return (
            <div>
                ClimberIndex
                
                 <CreateSession
                sessionToken={this.props.sessionToken}
                />
                
                <GoalIndex
                sessionToken={this.props.sessionToken}
                
                />
                
            </div>);
    }
}
 
export default ClimberIndex;