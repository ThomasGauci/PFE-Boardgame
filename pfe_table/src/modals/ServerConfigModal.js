import React, { Component } from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class StartScreen extends Component {

    constructor(props){
        super();
        this.state = {
            serverIp: props.serverIp
        }
    }

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Configuration du serveur</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Adresse IP du serveur</ControlLabel>
                            <FormControl componentClass="textarea"
                                         placeholder="Adresse IP du serveur"
                                         value={this.state.serverIp}
                                         onChange={event => this.setState({serverIp: event.target.value})} />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.close}>Annuler</Button>
                        <Button bsStyle="primary" onClick={() => this.props.validate(this.state.serverIp)}>Enregistrer</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default StartScreen;
