import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardTitle, CardText, Row, Col } from 'reactstrap'
import { Session } from '../../types/Types'
let APIURL = "http://localhost:3000"

interface DisplaySessionsProps {
    sessionToken: string
    climberSessions: Array<Session>
    fetchClimberSessions: CallableFunction
    openModal: () => void
    setSessionToUpdate: (session: Session) => void
}
 
interface DisplaySessionsState {
    id: number
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

class DisplaySessions extends Component<DisplaySessionsProps, DisplaySessionsState> {
    constructor(props: DisplaySessionsProps) {
        super(props)
        this.state = {
            id: 1,
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
    
    componentDidMount() {
    }
    
    componentDidUpdate() {
    }

    deleteSession = async (session: Session) => {
        console.log(session)
        try {
            const sessionToDelete = await fetch(`${APIURL}/session/delete/${session.id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${this.props.sessionToken}`
                })
            })
            console.log(`${sessionToDelete} session removed`)
        } catch {
        window.alert("couldn't delete session")
        }
        this.props.fetchClimberSessions()
    }
    
    render()
    {
        console.log(this.props.climberSessions)
        
        return (
            <div className="session-display">
                <h1>Session Display</h1>
                {this.props.climberSessions.length > 0 ? (
                    this.props.climberSessions.map((session: Session, index: number) =>
                        <Row>
      <Col sm="3">
                        <Card key={session.id}>
    <CardHeader>{session.sessiondate}</CardHeader>
        <CardBody>
                                        <CardTitle tag="h5">{index + 1} {session.sessiondate}</CardTitle>
                                        
                                        <CardText>
                                            Length:{session.sessionlength}
                                            Successful? {session.sessionsuccessful}
                                            Partnered? {session.sessionpartner}
                                            Recently Crosstrained? {session.crosstraining}
                                            Nutrition Condition? {session.nutritioncondition}
                                            Sleep Condition? {session.sleepcondition}
                                            Stress Condition? {session.stresscondition}
                                            Ego Condition? {session.egocondition}
                                            Session Notes: {session.sessionnotes}
                              
</CardText>
                                        <Button
                                            onClick={() => {
                                            this.props.setSessionToUpdate(session)
                                                this.props.openModal()
                                            }}
                                        >Edit</Button>
                                        <Button
                                          onClick={()=>this.deleteSession(session)}
                                        >Remove</Button>
                                    </CardBody>
                                    <CardFooter>{session.sessionnotes}</CardFooter>
                                </Card>
</Col>
                                </Row>
                        )) :
                    (<p>Your session log is empty. Log your first session to start building your session data.</p>)}

   </div>);
    }
}

export default DisplaySessions;


