import * as React from 'react';
import { Component } from 'react';
import { Container } from 'reactstrap'
import SessionIndex from '../sessions/SessionIndex'
import UpdateProfile from './UpdateProfile'
import {Climber} from '../../types/Types'
// import DisplayGoals from '../goals/DisplayGoals'
//cant display just Display bc of data 
import GoalIndex from '../goals/GoalIndex'
let APIURL = "http://localhost:3000";


interface ClimberIndexProps {
    sessionToken: string 
}
 
interface ClimberIndexState {
    climberProfile: Climber
}
 
class ClimberIndex extends Component<ClimberIndexProps, ClimberIndexState> {
    constructor(props: ClimberIndexProps) {
        super(props)
        this.state = {
            climberProfile: {
            id: 0,
            username:"",
            password: "",
            gymname: "",
            }
        }
    }
    
    componentDidMount() {
       this.fetchClimberProfile();        
    };
    
    
    setClimber=(climber: Climber)=>{
     this.setState({
        climberProfile: climber
    })
    }
    
    fetchClimberProfile = async () => {
        try {
            console.log("fetching climber profile");
            const res = await fetch(`${APIURL}/climber/profile`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.sessionToken}`
                }),
            })
            const json = await res.json();
            this.setState({
            climberProfile: json.climberProfile
            })
            console.log(this.state.climberProfile)
        } catch (error) {
            console.log(error)
        };
    };

  
    render() {
        return (
            <Container>
            <div>
                    <UpdateProfile
                        sessionToken={this.props.sessionToken}
                        fetchClimberProfile={this.fetchClimberProfile}
                        climberProfile={this.state.climberProfile}
                    />
                    
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