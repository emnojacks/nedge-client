import React, { Component } from 'react';
import { Button, Input, Form, Label, InputGroupText } from 'reactstrap'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
let APIURL = "http://localhost:3000"


interface CreateSessionProps {
    sessionToken: string
}
 
interface CreateSessionState {
    sessiondate: string
    sessionsuccessful: boolean
    sessionlength?: string
    sessionpartner: boolean
    crosstraining?: boolean
    nutritioncondition: string
    sleepcondition: string
    stresscondition: string
    egocondition: string
    sessionnotes?: string
}

 
class CreateSession extends Component<CreateSessionProps, CreateSessionState> {
    constructor(props: CreateSessionProps) {
        super(props)
        this.state = {
            sessiondate: "", 
            sessionsuccessful: false,
            sessionlength: "",
            sessionpartner: false,
            crosstraining: false, 
            nutritioncondition: "",
            sleepcondition: "",
            stresscondition: "",
            egocondition: "",
            sessionnotes: " ",
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
                // window.alert("session logged")
            })
            .catch((error) => {
            console.log(error.message)
            window.alert('failed to log session')
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
                      onChange={() => this.setState({ sessionpartner: !this.state.sessionpartner })}
                      >
            </Input>
                   {/* X TRAINING OPTIONAL */}
                  <Label
                    className="form-label"
                    htmlFor="crosstraining">Recently Crosstrained</Label>
                  <Input
                    type="checkbox"
                      name="crosstraining"
                      onChange={() => this.setState({ crosstraining: !this.state.crosstraining })}
                      >
            </Input>
                {/* SESSION LENGTH */}
                  <Label
                    className="form-label"
                    htmlFor="sessionlength">Session length (hrs)</Label>
                  <Input
                        type="number"
                        max={7}
                        min={.5}
                        step={.5}
                        onChange={(event: React.ChangeEvent<HTMLInputElement> )=> this.setState({ sessionlength: event.target.value })}
                      >
            </Input>
                
                {/* NUTRITIONCONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="nutritioncondition">Nutrition Condition</Label>
                  <Input
                      type="range"
                        max={5}
                        min={0}
                        step={1}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>)=> this.setState({ nutritioncondition: event.target.value })}
                      
                      >
                  </Input>
                  
                       {/* SLEEPCONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="sleepcondition">Sleep State</Label>
                  <Input
                      type="range"
                        max={5}
                        min={0}
                        step={1}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> this.setState({ sleepcondition: event.target.value })}
                      >
                  </Input>
                  
             {/* STRESS CONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="stresscondition">Stress State</Label>
                  <Input
                      type="range"
                        max={5}
                        min={0}
                        step={1}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> this.setState({ stresscondition: event.target.value })}
                      >
                  </Input>
                  
                     {/* EGO CONDITION */}
                  <Label
                    className="form-label"
                    htmlFor="egocondition">Ego State</Label>
                  <Input
                      type="range"
                        max={5}
                        min={0}
                        step={1}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>)=> this.setState({ egocondition: event.target.value })}
                      >
                  </Input>
                  
              
              
                     {/* SESSIONNOTES OPTIONAL */}
                  <Input
                className="text-input"
                name="sessionnotes"
                placeholder="'sent first v4'"
                type="text"
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({
                          sessionnotes: event.target.value
                      })}
              />      
                  
                <Button
                  size="sm"
                  type="submit">
                  Log Session
              </Button>
                
</Form>
        </div>);
    }
}

export default CreateSession;

  
                // {/* NUTRITIONCONDITION */}
                //   <Label
                //     className="form-label"
                //     htmlFor="nutritioncondition">Nutrition Condition</Label>
                //   <InputRange
                //         maxValue={5}
                //         minValue={0}
                //         step={1}
                //         value={this.state.value}
                //         onChange={(value)=> this.setState({ nutritioncondition: this.state.value })}
                //       >
                //   </InputRange>