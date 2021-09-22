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
}
 
interface UpdateGoalsState {
    id: number
    goaldescription: string
    goalpriority: string
    goalachieved: boolean
    modalVisible: 
}

class UpdateGoals extends Component<UpdateGoalsProps, UpdateGoalsState> {
    constructor(props: UpdateGoalsProps) {
        super(props)
        this.state = {
            id: this.props.id,
            goaldescription: this.props.goaldescription,
            goalpriority: this.props.goalpriority,
            goalachieved: this.props.goalachieved
        }
    }
    
    componentDidMount() {
    }
    
    componentDidUpdate() {
    }
    
    const toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }     
    
    updateGoal = async (goal: Goal) => {
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
                    <Form
                        onSubmit={this.updateGoal(goal: Goal)}>
                    <FormGroup>
                        <Label className="modalLabel" htmlFor="goaldescription">Goal:</Label>
                        <Input name="goaldescription" value={this.state.goaldescription} onChange={(e) =>
                            setEditIngredient(e.target.value)} />
                    </FormGroup>

                    <FormGroup>
                    <Label className="modalLabel" htmlFor="goalpriority">Priority</Label>
                            <Input
                                type="text"
                                name="quantity"
                                value={this.state.} onChange={(e) => this.setState(e.target.value)} />
                    </FormGroup>
                    <br></br>
                    <Button type="submit"
                            style={{ backgroundColor: "#82c787", margin: "3px" }}>Prioritize</Button>
                        
                    <Button 
                    style={{backgroundColor:"#AC663E"}} onClick={this.toggleModal}>Nvm</Button>
                </Form>
            </ModalBody>
        </Modal>
           );
    }
}

export default UpdateGoals;

