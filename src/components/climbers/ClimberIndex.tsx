import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap'
import SessionIndex from '../sessions/SessionIndex'
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
            <Container>
            <div>
            
                 <SessionIndex
                sessionToken={this.props.sessionToken}
                />
                
                <GoalIndex
                sessionToken={this.props.sessionToken}
                />
                
                </div>
                </Container>);
    }
}
 
export default ClimberIndex;