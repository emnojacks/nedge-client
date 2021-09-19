import * as React from 'react';
import { Component } from 'react';


interface RoleDecisonProps {
    
}
 
interface RoleDecisonState {
    isGym: boolean
}
 
class RoleDecison extends Component<RoleDecisonProps, RoleDecisonState> {
    constructor(props: RoleDecisonProps) {
        super(props)
        this.state = {
            isGym: false
        }
    }
    render() {
        return (
            <div>
                RoleDecison
                <button>I'm a climber</button>
                <button
                    onClick={(event) => this.setState({ isGym: true })}>
                    I'm a gym
                </button>
                
            </div>
        
        );
    }
}
 
export default RoleDecison;