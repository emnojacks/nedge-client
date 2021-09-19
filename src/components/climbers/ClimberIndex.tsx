import * as React from 'react';
import { Component } from 'react';
import CreateGoals from '../goals/CreateGoals'

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

    
    render() {
        return (
            <div>
                ClimberIndex
                <CreateGoals
                sessionToken={this.props.sessionToken}
                />
            </div>);
    }
}
 
export default ClimberIndex;