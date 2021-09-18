import * as React from 'react';
import { Component } from 'react';


interface GymIndexProps {
    
}
 
interface GymIndexState {
    
}
 
class GymIndex extends Component<GymIndexProps, GymIndexState> {
    constructor(props: GymIndexProps) {
        super(props)
        this.state = { sessionToken: "" }
    }

    
    render() {
        return (
            <div>
                GymIndex
            </div>);
    }
}
 
export default GymIndex;