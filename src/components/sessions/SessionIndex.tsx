import * as React from 'react';
import { Component } from 'react';
import CreateSession from '../sessions/CreateSession';
import DisplaySessions from '../sessions/DisplaySessions';
import UpdateSession from '../sessions/UpdateSession';
import { Session } from '../../types/Types';
let APIURL = "http://localhost:3000";


interface SessionIndexProps {
    sessionToken: string 
}
 
interface SessionIndexState {
    climberSessions: Array<Session>
    modalVisible: boolean
    sessionToUpdate: Session 
    }

class SessionIndex extends Component<SessionIndexProps, SessionIndexState> {
    constructor(props: SessionIndexProps) {
        super(props)
        this.state = {
            climberSessions: [],
            modalVisible: false,
            sessionToUpdate: {
                id: 0,
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
            },
        }
    }
    
    fetchClimberSessions = async () => {
        this.state.climberSessions.length = 260;
        console.log(this.state.climberSessions)
        try {
            console.log("fetching climber sessions");
            const res = await fetch(`${APIURL}/session/mine`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.sessionToken}`
                }),
            })
            const json = await res.json();
            this.setState({
            climberSessions: json.existingSessions
            })
            console.log(this.state.climberSessions)
        } catch (error) {
            console.log(error)
        };
    };
    
    componentDidMount() {
        this.fetchClimberSessions();    
    };

    setSessionToUpdate = (session: Session) => {
        this.setState({ sessionToUpdate: session })
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
                <DisplaySessions
                    openModal={this.openModal}
                    climberSessions={this.state.climberSessions}
                    sessionToken={this.props.sessionToken}
                    fetchClimberSessions={this.fetchClimberSessions}
                    setSessionToUpdate={this.setSessionToUpdate}
                />
                   <CreateSession
                    sessionToken={this.props.sessionToken}
                    fetchClimberSessions={this.fetchClimberSessions}
                />
                {this.state.modalVisible ?
                    <UpdateSession
                        sessionToken={this.props.sessionToken}
                        fetchClimberSessions={this.fetchClimberSessions}
                        climberSessions={this.state.climberSessions}
                        sessionToUpdate={this.state.sessionToUpdate}
                        closeModal={this.closeModal}
                        openModal={this.openModal}
                        modalVisible={this.state.modalVisible}  /> : <> </>}
                
            </div>);
    }
}
 
export default SessionIndex;