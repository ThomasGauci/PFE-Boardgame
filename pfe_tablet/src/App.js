import React, {Component} from 'react';
import './App.css';
import Join from "./components/Join/join";
import QRView from "./components/QRView/qrView";
import Modal from "react-bootstrap/es/Modal";
import {Button} from "react-bootstrap";
import WaitScreen from "./components/WaitScreen/waitScreen";
import HandView from "./components/HandView/handView";
import Ressources from "./components/Ressources/ressources"
import CardDetails from "./components/CardDetails/CardDetails"

class App extends Component {

    //declared components
    components = {
        Join: Join,
        QRView: QRView,
        WaitScreen: WaitScreen,
        HandView: HandView,
        Ressources: Ressources
    };

    constructor() {
        super();
        this.state = {
            componentName: "QRView",
            data: {},
            showModal: true,
            fullScreen: false,
            cardDetails: null
        };
        this.exitHandler = this.exitHandler.bind(this);
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', this.exitHandler, false);
            document.addEventListener('mozfullscreenchange', this.exitHandler, false);
            document.addEventListener('fullscreenchange', this.exitHandler, false);
            document.addEventListener('MSFullscreenChange', this.exitHandler, false);
        }

    }

    exitHandler() {
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
            this.setState({
                fulScreen: false
            })
        }
    }

    //change dynamic component
    changeComponent(componentName) {
        this.setState({
            componentName: componentName
        })
    }

    //set data to pass to the new component
    changeData(data) {
        this.setState({
            data: data
        })
    }

    toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
            this.setState({
                fullScreen: false
            })
        }
        this.setState({showModal: false, fullScreen: true});
    }

    handleDismiss() {
        this.setState({showModal: false});
    }

    startSocket() {
        var io = require('socket.io-client');
        let ipAdress = this.state.data.ipAdress;
        let ip = ipAdress.split(";")[0];
        let position = parseInt(ipAdress.split(";")[1]);
        const socket = io.connect(ip, {transports: ['websocket'], rejectUnauthorized: false});
        let newData = {
            ip: ip,
            position: position,
            socket: socket
        };
        this.setState({
            data: newData
        });
        socket.on('newTurn', (data) => {
            console.log(data);
            let newData = {
                position: position,
                pseudo: this.state.data.pseudo,
                cards: data.cards,
                turn: data.turn,
                age: data.age,
                ip: this.state.data.ip,
                socket: this.state.data.socket,
                money: data.money
            };
            this.changeData(newData);
            this.changeComponent("HandView");
        });
        socket.on('gameStart', () => {
            let newData = this.state.data;
            newData["label"] = "Partie débutée, préparation du prochain tour";
            this.changeData(newData);
        });
        socket.on('endTurn', () => {
            let newData = this.state.data;
            newData["label"] = "En attente d'un nouveau tour";
            this.changeData(newData);
            this.changeComponent("WaitScreen");
        });
        socket.on('cardInformations', data => {
            this.setState({cardDetails: data});
        });
    }


    render() {
        let ComponentName = this.components[this.state.componentName];
        return (
            <div>
                {this.state.showModal ?
                    <Modal.Dialog>
                        <Modal.Body>Pour plus de confort nous vous conseillons de passer en plein écran</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleFullScreen.bind(this)}>Accepter</Button>
                            <Button bsStyle="primary" onClick={this.handleDismiss.bind(this)}>Refuser</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    : null
                }
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <ComponentName startSocket={this.startSocket.bind(this)} data={this.state.data}
                               changeData={this.changeData.bind(this)}
                               changeComponent={this.changeComponent.bind(this)}/>
                {
                    this.state.cardDetails ?
                        <CardDetails card={this.state.cardDetails} close={() => this.setState({cardDetails: null})}/>
                        : null
                }
            </div>
        );
    }
}

export default App;
