import React, { Component } from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class StartScreen extends Component {

    constructor(props){
        super();
        this.state = {
            serverIp: props.serverIp,
            gameSeed: props.gameSeed
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

                        <FormGroup controlId="formControlsInput">
                            <ControlLabel>Graine de jeu</ControlLabel>
                            <FormControl componentClass="input"
                                         placeholder="Graine"
                                         value={this.state.gameSeed}
                                         onChange={event => this.setState({gameSeed: event.target.value})} />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.close}>Annuler</Button>
                        <Button bsStyle="primary" onClick={() => this.props.validate(this.state.serverIp, this.state.gameSeed)}>Enregistrer</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default StartScreen;
