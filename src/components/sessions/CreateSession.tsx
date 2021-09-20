import React, { Component } from 'react';
import { Button, Input, Form, Label } from 'reactstrap'
import InputRange, { Range } from 'react-input-range'
import { Link } from 'react-router-dom'
import { truncateSync } from 'fs';
let APIURL ="http://localhost:3000"

interface CreateSessionProps {
    sessionToken: string
}
 
interface CreateSessionState {
    sessiondate: string
    sessionsuccessful: boolean
    sessionlength: number
    sessionpartner: boolean
    crosstraining?: boolean
    nutritioncondition: number 
    sleepcondition: number
    stresscondition: number
    egocondition: number
    sessionnotes?: string
}

 
class CreateSession extends Component<CreateSessionProps, CreateSessionState> {
    constructor(props: CreateSessionProps) {
        super(props)
        this.state = {
            sessiondate: "", 
            sessionsuccessful: true,
            sessionlength: 2,
            sessionpartner: true,
            crosstraining: true, 
            nutritioncondition: 1,
            sleepcondition: 1,
            stresscondition: 1,
            egocondition: 1,
            sessionnotes: " "
        }
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        fetch(`${APIURL}/session/create/`, {
            method: "POST",
            body: JSON.stringify(
              {
                session: {
                    sessiondate: this.state.sessiondate, 
                    sessionsuccessful: this.state.sessionsuccessful,
                    sessionlength: this.state.sessionlength,
                    sessionpartner: this.state.sessionpartner,
                    crosstraining: this.state.crosstraining, 
                    nutritioncondition: this.state.nutritioncondition,
                    sleepcondition: this.state.sleepcondition,
                    stresscondition: this.state.stresscondition,
                    egocondition: this.state.egocondition,
                    sessionnotes: this.state.sessionnotes
                }
              }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("creating session");
                window.alert("session logged")
            })
            .catch((error) => {
            console.log(error.message)
            })
    };
    
    render() { 
      return (
          <div>
               
              <h1>Log a Session</h1>
              <h5>Log a climbing session for today.</h5>
              
              <Form onSubmit={this.handleSubmit}>
                  {/* SESSION DATE */}
                  <Label
                    className="form-label"
                    htmlFor="sessiondate">Session Date</Label>
                  <Input
                    type="date"
                      name="sessiondate"
                      min="2021-01-01"
                      required
                      value={this.state.sessiondate}
                      onChange={event => this.setState({ sessiondate: event.target.value })}
                  >
                </Input>
                  
                  {/* SESSION SUCCESS */}
                  <Label
                    className="form-label"
                    htmlFor="sessionsuccessful">Session successful?</Label>
                  <Input
                    type="checkbox"
                      name="sessionsuccessful"
                      required
                      checked
                      onChange={() => this.setState({ sessionsuccessful: !this.state.sessionsuccessful })}
                      >

                  </Input>
                  
                   {/* SESSION PARTNER */}
                  <Label
                    className="form-label"
                    htmlFor="sessionpartner">Partner</Label>
                  <Input
                    type="checkbox"
                      name="sessionpartner"
                      checked
                      required
                      onChange={() => this.setState({ sessionpartner: !this.state.sessionpartner })}
                      >
            </Input>
                
                {/* SESSION LENGTH */}
                  <Label
                    className="form-label"
                    htmlFor="sessionlength">Session length</Label>
                <Input>
                  <InputRange
                        maxValue={5}
                        minValue={0}
                        step={.5}
                        value={this.state.nutritioncondition}
                        onChange={()=> this.setState({ nutritioncondition: this.state.nutritioncondition })}
                      >
            </InputRange>
            </Input>
                
                {/* NUTRITIONCONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="nutritioncondition">Nutrition Condition</Label>
                <InputRange
                        maxValue={5}
                        minValue={0}
                        step={1}
                        value={this.state.nutritioncondition}
                        onChange={()=> this.setState({ nutritioncondition: this.state.nutritioncondition })}
                      >
                  </InputRange>
                  
                       {/* SLEEPCONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="sleepcondition">Sleep State</Label>
                <InputRange
                        maxValue={5}
                        minValue={0}
                        step={1}
                        value={this.state.sleepcondition}
                        onChange={()=> this.setState({ sleepcondition: this.state.sleepcondition })}
                      >
                  </InputRange>
                  
             {/* STRESS CONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="stresscondition">Stress State</Label>
                <InputRange
                        maxValue={5}
                        minValue={0}
                        step={1}
                        value={this.state.stresscondition}
                        onChange={()=> this.setState({ stresscondition: this.state.stresscondition })}
                      >
                  </InputRange>
                  
                     {/* EGO CONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="egocondition">Ego State</Label>
                <InputRange
                        maxValue={5}
                        minValue={0}
                        step={1}
                        value={this.state.egocondition}
                        onChange={()=> this.setState({ egocondition: this.state.egocondition })}
                      >
                  </InputRange>
                  
                 {/* X TRAINING OPTIONAL */}
                  <Label
                    className="form-label"
                    htmlFor="crosstraining">Recently Cross trained?</Label>
                  <Input
                    type="checkbox"
                      name="crosstraining"
                      checked
                      onChange={() => this.setState({ crosstraining: !this.state.crosstraining })}
                      >
            </Input>
              
                     {/* SESSIONNOTES OPTIONAL */}
                  <Input
                className="text-input"
                name="sessionnotes"
                placeholder="sent first v4"
                type="text"
                onBlur={(event) => this.setState({
                          sessionnotes: event.target.value
                      })}
              />      
                  
                <Button
                  size="sm"
                  type="submit">
                  Add Goal
              </Button>
                
</Form>
        </div>);
    }
}
 
export default CreateSession;

