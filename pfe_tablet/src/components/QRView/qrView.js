import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import "./qrView.css";
import QrReader from "react-qr-reader";
import Modal from "react-bootstrap/es/Modal";

class QrView extends Component{

    constructor(props){
        super(props);
        this.state = {
            delay: 300
        };
        this.handleScan = this.handleScan.bind(this);
        /*this.props.changeData({ipAdress: "https://192.168.1.9:8000;4"});
        this.props.changeComponent("Join");*/
    }

    handleScan(data) {
        if (data) {
            console.dir(data);
            this.props.changeData({ipAdress: data, help: false});
            this.props.changeComponent("Join");
        }
    }


    handleBtn(num) {
        if (num && (! isNaN(num)) && ((num >= 1) && (num <=4))) {
            this.props.changeData({ipAdress: "http://127.0.0.1:8000;"+num, help: false});
            console.log("http://127.0.0.1:8000;"+num);
            this.props.changeComponent("Join");
        }
    }

    handleError(err) {
        console.error(err);
    }

    render(){
        return (
            <div id="container">
                /*
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
                */
                <label id="label">Bienvenue scannez le QRCode affiché sur la table pour rejoindre la partie</label>
                <nav>
                    <button onClick={(e) => this.handleBtn(1)}>position 1</button>
                    <button onClick={(e) => this.handleBtn(2)}>position 2</button>
                    <button onClick={(e) => this.handleBtn(3)}>position 3</button>
                    <button onClick={(e) => this.handleBtn(4)}>position 4</button>

                </nav>
                <div id="QRDiv">
                    <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                </div>
            </div>
        );
    }
}

export default QrView;