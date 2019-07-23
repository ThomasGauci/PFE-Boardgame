import React, { Component } from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class StartScreen extends Component {

    constructor(props){
        super();
        this.state = {
            serverIp: props.serverIp,
            searchingSeed: false,
            seedName: props.seedName,
            gameSeed: props.gameSeed,
            searchName: ''
        }
    }

    updateSearch(search) {
        this.setState({searchName: search});
        this.props.searchSeed(search, response => {
            let seeds = response.seeds;
            if (seeds.length > 0) {
                let datalist = document.querySelector('#seeds');
                datalist.innerHTML = '';

                for (let i in seeds) {
                    for (let name in seeds[i]) {
                        let option = document.createElement('option');
                        option.value = name;
                        let gs = document.createAttribute('gameSeed');
                        gs.value = seeds[i][name];
                        option.setAttributeNode(gs);
                        datalist.appendChild(option);
                    }
                }
            }
        });
    }

    setSeed(seedName, gameSeed) {
        console.log(seedName + ' ' + gameSeed);
        this.setState({seedName, gameSeed, searchingSeed: false});
    }

    validateSeed() {
        console.log(this.searchName);
        if (this.state.searchName === '') {
            this.props.validate(this.state.serverIp, this.state.seedName, this.state.gameSeed);
        } else {
            let datalist = document.querySelector('#seeds');
            let sn = datalist.firstChild.value;
            let gs = datalist.firstChild.getAttribute('gameSeed');

            this.props.validate(this.state.serverIp, sn, gs);
        }
    }

    render() {
        let searchingSeed = this.state.searchingSeed;
        let seedForm;

        if (searchingSeed) {
            seedForm = <div>
                <FormGroup>
                    <ControlLabel>Nom de la graine</ControlLabel>
                    <FormControl componentClass="input"
                        placeholder="Partie 1"
                        value={this.state.searchName}
                        list="seeds"
                        onChange={event => this.updateSearch(event.target.value)} />
                    <datalist id="seeds">
                    </datalist>
                </FormGroup>

                Ou <a href="#" onClick={() => this.setState({searchingSeed: false})}>entrez une graine</a>
            </div>;
        } else {
            seedForm = <div>
                <FormGroup>
                    <ControlLabel>Nom de la graine</ControlLabel>
                    <FormControl componentClass="input"
                        placeholder="Partie 1"
                        value={this.state.seedName}
                        onChange={event => this.setState({seedName: event.target.value})} />
                </FormGroup>

                <FormGroup controlId="formControlsInput">
                    <ControlLabel>Graine de jeu</ControlLabel>
                    <FormControl componentClass="input"
                        placeholder="Graine"
                        value={this.state.gameSeed}
                        onChange={event => this.setState({gameSeed: event.target.value})} />
                </FormGroup>

                Ou <a href="#" onClick={() => this.setState({searchingSeed: true})}>recherchez une graine</a>
            </div>;
        }

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

                        {seedForm}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.close}>Annuler</Button>
                        <Button bsStyle="primary" onClick={() => this.validateSeed()}>Enregistrer</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default StartScreen;
