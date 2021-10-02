import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Input,
  ButtonGroup
} from "reactstrap";
import { Session } from "../../types/Types";
import APIURL from "../../helpers/environment.js";
// let APIURL = "http://localhost:3000";

interface UpdateSessionProps {
  sessionToken: string;
  climberSessions: Array<Session>;
  fetchClimberSessions: CallableFunction;
  closeModal: () => void;
  modalVisible: boolean;
  openModal: () => void;
  sessionToUpdate: Session;
}

interface UpdateSessionState {
  id: number;
  modalVisible: boolean;
  sessiondate: string;
  sessionsuccessful: boolean;
  sessionlength?: string;
  sessionpartner: boolean;
  crosstraining?: boolean;
  nutritioncondition: string;
  sleepcondition: string;
  stresscondition: string;
  egocondition: string;
  sessionnotes?: string;
}

class UpdateSession extends Component<UpdateSessionProps, UpdateSessionState> {
  constructor(props: UpdateSessionProps) {
    super(props);
    this.state = {
      id: this.props.sessionToUpdate.id,
      sessiondate: this.props.sessionToUpdate.sessiondate,
      sessionsuccessful: this.props.sessionToUpdate.sessionsuccessful,
      sessionlength: this.props.sessionToUpdate.sessionlength,
      sessionpartner: this.props.sessionToUpdate.sessionpartner,
      crosstraining: this.props.sessionToUpdate.crosstraining,
      nutritioncondition: this.props.sessionToUpdate.nutritioncondition,
      sleepcondition: this.props.sessionToUpdate.sleepcondition,
      stresscondition: this.props.sessionToUpdate.stresscondition,
      egocondition: this.props.sessionToUpdate.egocondition,
      sessionnotes: this.props.sessionToUpdate.sessionnotes,
      modalVisible: true,
      //may not need modalvisible
    };
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  updateSession = async () => {
    console.log(this.props.sessionToUpdate);
    return await fetch(
      `${APIURL}/session/update/${this.props.sessionToUpdate.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
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
            sessionnotes: this.state.sessionnotes,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.sessionToken}`,
        }),
      }
    );
  };

  handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (this.state.sessiondate) {
      try {
        let res = await this.updateSession();
        if (res?.ok) {
          console.log("session updated");
        }
      } catch {}
      this.props.fetchClimberSessions();
    } else {
      console.log("emtpty session update attempt");
      window.alert("You can't set emtpy sessions.");
    }
    this.props.closeModal();
  };

  render() {
    console.log(this.props.sessionToUpdate);
    return (
      <Modal className="update-modal" isOpen={true} toggle={this.toggleModal}>
        <ModalHeader className="modalHeader">
          Your Climbing Sesh
        </ModalHeader>
        <ModalBody className="modalBody">
          <Form onSubmit={this.handleSubmit}>
            {/* SESSION DATE */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="sessiondate">
                Session Date
              </Label>
              {" "}
              <Input
                name="sessiondate"
                type="date"
                value={this.state.sessiondate}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({
                    sessiondate: e.target.value,
                  })
                }
              />
            </FormGroup>
            {/* SESSION LENGTH */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="sessionlength">
                Session length (hrs)
              </Label>
               {" "}
              <Input
                required
                type="number"
                max={7}
                min={0.5}
                step={0.5}
                value={this.state.sessionlength}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ sessionlength: event.target.value })
                }
              ></Input>
            </FormGroup>
            {/* SESSION SUCCESS */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="sessionsuccessful">
                Session Successful?
              </Label>
               {" "}
              <Input
                type="checkbox"
                name="sessionsuccessful"
                checked={this.state.sessionsuccessful}
                onChange={() =>
                  this.setState({
                    sessionsuccessful: !this.state.sessionsuccessful,
                  })
                }
              />
            </FormGroup>
            {/* SESSION PARTNER */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="sessionpartner">
                Partnered
              </Label>
                {" "}
              <Input
                type="checkbox"
                name="sessionpartner"
                checked={this.state.sessionpartner}
                onChange={() =>
                  this.setState({ sessionpartner: !this.state.sessionpartner })
                }
              ></Input>
            </FormGroup>
            {/* X TRAINING OPTIONAL */}
            <FormGroup>
              <Label className="modalLabel"  htmlFor="crosstraining">
                Recently Crosstrained
              </Label>
              {" "}
              <Input
                type="checkbox"
                check={this.state.crosstraining}
                name="crosstraining"
                onChange={() =>
                  this.setState({ crosstraining: !this.state.crosstraining })
                }
              ></Input>
            </FormGroup>
            {/* NUTRITIONCONDITION */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="nutritioncondition">
                Nutrition Condition
              </Label>
                {" "}
              <Input
                value={this.state.nutritioncondition}
                type="range"
                max={5}
                min={0}
                step={1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ nutritioncondition: event.target.value })
                }
              ></Input>
            </FormGroup>
            {/* SLEEPCONDITION */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="sleepcondition">
                Sleep State
              </Label>
                {" "}
              <Input
                value={this.state.sleepcondition}
                type="range"
                max={5}
                min={0}
                step={1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ sleepcondition: event.target.value })
                }
              ></Input>
            </FormGroup>
            {/* STRESS CONDITION */}
            <FormGroup>
              <Label className="modalLabel" htmlFor="stresscondition">
                Stress State
              </Label>
                {" "}
              <Input
                value={this.state.stresscondition}
                type="range"
                max={5}
                min={0}
                step={1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ stresscondition: event.target.value })
                }
              ></Input>
            </FormGroup>
            {/* EGO CONDITION */}
            <FormGroup>
              <Label className="modalLabel"  htmlFor="egocondition">
                Ego State
              </Label>
                {" "}
              <Input
                value={this.state.egocondition}
                type="range"
                max={5}
                min={0}
                step={1}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ egocondition: event.target.value })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              {/* SESSIONNOTES OPTIONAL */}
              <Label className="modalLabel" htmlFor="sessionnotes">
                Notes
              </Label>
                {" "}
              <Input
                value={this.state.sessionnotes}
                name="sessionnotes"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({
                    sessionnotes: event.target.value,
                  })
                }
              />
            </FormGroup>
            <br></br>
            <ButtonGroup>
              <Button color="warning" type="submit">
              update
              </Button>
               {" "}&nbsp;&nbsp;
            <Button color="secondary" onClick={this.props.closeModal}>
              close
            </Button>
           
</ButtonGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default UpdateSession;
