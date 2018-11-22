import React, {Component} from "react";
import {Button, Label} from 'react-bootstrap';
import "./qrView.css";
import QrReader from "react-qr-reader";
import Modal from "react-bootstrap/es/Modal";

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            delay: 300
        };
        this.handleScan = this.handleScan.bind(this);
        this.props.changeData({ipAdress: "192.168.1.8:8000;1"});
        this.props.changeComponent("Join");
    }

    handleScan(data) {
        if (data) {
            this.props.changeData({ipAdress: data});
            this.props.changeComponent("Join");
        }
    }

    handleError(err) {
        console.error(err);
    }

    render(){
        return (
            <div id="container">
                {this.state.showModal ?
                    <Modal.Dialog>
                        <Modal.Body>Partie rejointe avec succès, entrez votre pseudo et choisissez votre place pour commencer la partie</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleFullScreen.bind(this)}>Accepter</Button>
                            <Button bsStyle="primary" onClick={this.handleDismiss.bind(this)}>Refuser</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    : null
                }
                <Label id="label">Bienvenue scannez le QRCode affiché sur la table pour rejoindre la partie</Label>
            </div>
        );
    }
}

export default Home;