import * as React from 'react';
import { Component } from 'react';
import CreateGoals from '../goals/CreateGoals';
import DisplayGoals from '../goals/DisplayGoals';
import UpdateGoals from '../goals/UpdateGoals';
import { Goal } from '../../types/Types';
let APIURL = "http://localhost:3000";

//eventually import edit and delete goals

interface GoalIndexProps {
    sessionToken: string 
}
 
interface GoalIndexState {
    climberGoals: Array<Goal>
    modalVisible: boolean
    goalToUpdate: Goal
    }

class GoalIndex extends Component<GoalIndexProps, GoalIndexState> {
    constructor(props: GoalIndexProps) {
        super(props)
        this.state = {
            climberGoals: [],
            modalVisible: false,
            goalToUpdate: {
                id: 0,
                goaldescription: "",
                goalpriority: "first",
                goalachieved: false,
            },
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
    };

    updateGoal = (goal: Goal) => {
        this.setState({ goalToUpdate: goal })
    };
    
   openModal = ():void => {
        this.setState({
        modalVisible: true
        })
    }
    
    closeModal = ():void => {
        this.setState({
        modalVisible: false
        })
    }
    
    render() {
        return (
            <div>
            <h2>Goal Index</h2>
                <DisplayGoals
                    openModal={this.openModal}
                    climberGoals={this.state.climberGoals}
                    sessionToken={this.props.sessionToken}
                    fetchClimberGoals={this.fetchClimberGoals}
                />
                   <CreateGoals
                    sessionToken={this.props.sessionToken}
                    fetchClimberGoals={this.fetchClimberGoals}
                />
                {this.state.modalVisible ?
                    <UpdateGoals
                        sessionToken={this.props.sessionToken}
                        fetchClimberGoals={this.fetchClimberGoals}
                        climberGoals={this.state.climberGoals}
                        goalToUpdate={this.state.goalToUpdate}
                        closeModal={this.closeModal}
                        openModal={this.openModal}
                        modalVisible={this.state.modalVisible}
                    /> : <> </>}
                
            </div>);
    }
}
 
export default GoalIndex;