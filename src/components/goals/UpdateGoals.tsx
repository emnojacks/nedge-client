import React, { Component } from 'react';
import { Form, FormGroup, Button, Modal, ModalBody, ModalHeader, Label, Input} from 'reactstrap'
import { Goal } from '../../types/Types'
let APIURL = "http://localhost:3000"


interface UpdateGoalsProps {
    sessionToken: string
    climberGoals: Array<Goal>
    fetchClimberGoals: CallableFunction
    closeModal: () => void
    modalVisible: boolean
    openModal:()=>void
}
 
interface UpdateGoalsState {
    id: number
    goaldescription: string
    goalpriority: string
    goalachieved: boolean
    modalVisible: boolean
}


class UpdateGoals extends Component<UpdateGoalsProps, UpdateGoalsState> {
    constructor(props: UpdateGoalsProps) {
        super(props)
        this.state = {
            id: 0,
            goaldescription: "",
            goalpriority: "first",
            goalachieved: false,
            modalVisible: true,
        }
    }
    
    componentDidMount() {
    }
    
    componentDidUpdate() {
    }
    
    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }     
    
    updateGoal = async(goal: Goal) => {
        return await fetch(`${APIURL}/goal/update/${goal.id}`, {
            method: "PUT",
            body: JSON.stringify(
                {
                    goal: {
                        goaldescription: this.state.goaldescription,
                        goalpriority: this.state.goaldescription,
                        goalachieved: false
                    }
                }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
                })
        })
    }
        
    handleSubmit = async (event: { preventDefault: () => void; }, goal: Goal) => {
        event.preventDefault()
        if (this.state.goaldescription) {
            try {
                let res = await this.updateGoal(goal)
                if (res?.ok) {
                    console.log("goal created")
                }
            }
            catch {
            }
            this.props.fetchClimberGoals();
            this.props.closeModal();
        }
        else {
            console.log("emtpty goal attempt")
            window.alert("You can't set emtpy goals.")
        }
    };
    
    render()
    {
        console.log(this.props.climberGoals)
        
        return (
            <Modal
                isOpen={true}
                toggle={this.toggleModal}>
                <ModalHeader
                    className="modalHeader">Prioritize your Goals</ModalHeader>
            <ModalBody className="modalBody">
                    <Form>
                    <FormGroup>
                        <Label className="modalLabel" htmlFor="goaldescription">Goal:</Label>
                            <Input name="goaldescription"
                                type="text"
                                value={this.state.goaldescription} 
                                onChange={(e) =>
                                    this.setState({
                                        goaldescription: e.target.value
                                    })}/>
                    </FormGroup>

                    <FormGroup>
                    <Label className="modalLabel" htmlFor="goalpriority">Priority</Label>
                            <Input
                                type="text"
                                name="goalpriority"
                                value={this.state.goalpriority}
                                onChange={(e) => 
                                    this.setState({
                                        goalpriority: e.target.value
                                    })}/>
                        </FormGroup>
                        
                    <br></br>
                        <Button
                            onClick={this.handleSubmit}
                            // style={{ backgroundColor: "#82c787", margin: "3px" }}
                        > Prioritize</Button>
                        
                    <Button 
                    style={{backgroundColor:"#AC663E"}} onClick={this.props.closeModal}>Nvm</Button>
                </Form>
            </ModalBody>
        </Modal>
           );
    }
}

export default UpdateGoals;



updateGoal = async(goal: Goal) => {
        console.log(goal)
        try {
            const goalToUpdate = await fetch(`${APIURL}/goal/update/${goal.id}`, {
                method: "PUT",
                body: JSON.stringify(
                    {
                        goal: {
                            goaldescription: this.state.goaldescription,
                            goalpriority: this.state.goalpriority,
                            goalachieved: false
                        }
                    }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.sessionToken}`
                })
            })
            await goalToUpdate.json();
            console.log(`${goalToUpdate} updated`)
        } catch {
            window.alert("couldn't update goal")
        }
        this.props.fetchClimberGoals()
        this.props.closeModal();
    };