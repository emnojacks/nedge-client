import * as React from 'react';
import { Component } from 'react';


interface ClimberIndexProps {
    sessionToken: string 
}
 
interface ClimberIndexState {
    
}
 
class ClimberIndex extends Component<ClimberIndexProps, ClimberIndexState> {
    constructor(props: ClimberIndexProps) {
        super(props)
        this.state = { sessionToken: "" }
    }

    
    render() {
        return (
            <div>
                ClimberIndex
            </div>);
    }
}
 
export default ClimberIndex;