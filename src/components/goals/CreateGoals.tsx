import React, { Component } from 'react';
import { Button, ButtonGroup, Input, Form } from 'reactstrap'
import { Link } from 'react-router-dom'
let APIURL ="http://localhost:3000"

interface CreateGoalsProps {
    sessionToken: string
}
 
interface CreateGoalsState {
    goaldescription: string
    goalpriority: string
    goalachieved: boolean
}
 
class CreateGoals extends Component<CreateGoalsProps, CreateGoalsState> {
    constructor(props: CreateGoalsProps) {
        super(props)
        this.state = {
            goaldescription: "",
            goalpriority: "first",
            goalachieved: false
        }
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        fetch(`${APIURL}/goal/create/`, {
            method: "POST",
            body: JSON.stringify(
              {
                goal: {
                goaldescription: this.state.goaldescription,
                goalpriority: "first",
                goalachieved: false
                }
              }),
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("creating goal");
                window.alert("goal created")
            })
            .catch((error) => {
            console.log(error.message)
            })
    };
    
   
    render() { 
      return (
          <div>
               
              <h1>Create Goals</h1>
              <h5>Here are some common goals climbers work on. Don't get crazy. Choose no more than three goals.</h5>
              <Form onSubmit={this.handleSubmit}>
                   
              <ButtonGroup>
                  <Button
                      className="btn-goal"
                      size="sm"
                      outline
                    active={this.state.goaldescription==="increase endurance"}
                      onClick={() => 
                          this.setState({
                              goaldescription: "increase endurance"
                          })
                      }
              >
            increase endurance  
                      </Button>

              <Button
                  className="btn-goal"
                    size="sm"
                      outline
                      active={this.state.goaldescription==="increase tendon strength"}
                      onClick={() => 
                          this.setState({ goaldescription: "increase tendon strength" })
                      }
              >
              increase tendon strength
            </Button>

              <Button
                          className="btn-goal"
                          size="sm"
                          outline
                          active={this.state.goaldescription === "increase muscle strength"}
                          onClick={() => 
                              this.setState({
                                  goaldescription: "increase muscle strength"
                              })
                          }         
              >
              increase muscle strength
              </Button>
              
              <Button
                  className="btn-goal"
                      size="sm"
                      outline
                       active={this.state.goaldescription==="improve mental game"}
                      onClick={() => 
                          this.setState({
                              goaldescription: "improve mental game"
                          })
                      }
              >
             improve mental game
              </Button>
              
              <Button
                      className="btn-goal"
                      size="sm"
                      outline
                      active={this.state.goaldescription==="work on technique"}
                      onClick={() => 
                          this.setState({
                              goaldescription: "work on technique"
                          })
                      }
              >
             work on technique
            </Button>
                  </ButtonGroup>
                  
                <Button
                  size="sm"
                  type="submit">
                  Add Goal
              </Button>
                  
                  <Input
                className="text-input"
                name="othergoal"
                placeholder="other goal"
                type="text"
                onBlur={(event) => this.setState({
                          goaldescription: event.target.value
                      })}
              />  
              <Button
                  size="sm"
                  type="submit">
                  Add Personal Goal
              </Button>
              
            <p>Selected: {this.state.goaldescription}</p>
        
           
</Form>
        </div>);
    }
}
 //eventually want to make this a bulk post request that creates distint records
//also want to limit it to three goals 
//and want user defined goals 
export default CreateGoals;

// onClick={() => {
//                           this.setState({
//                               goaldescription: "work on technique"
//                           });
//                         this.onRadioBtnClick("work on technique")}
//                       }