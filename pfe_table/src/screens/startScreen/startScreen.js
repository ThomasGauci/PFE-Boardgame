import React, { Component } from 'react';
import {Button, Col, Row, Modal} from "react-bootstrap";
import {Maximize, Settings} from "react-feather";
import openSocket from 'socket.io-client';

import ServerConfigModal from "../../modals/ServerConfigModal";
import './startScreen.css'
import PlayerConnection from "../../components/playerConnection/playerConnection";

class StartScreen extends Component {

    state={
        showConfigModal: false,
        showFullScreenButton: true,
        connecting: false,
        players: []
    }
    toggleConfigModal = this.toggleConfigModal.bind(this);
    toggleFullScreen = this.toggleFullScreen.bind(this);
    toggleFullScreenButton = this.toggleFullScreenButton.bind(this);
    setupSockets = this.setupSockets.bind(this);
    getPlayerOn = this.getPlayerOn.bind(this);

    constructor(){
        super();
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('mozfullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('fullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('MSFullscreenChange', this.toggleFullScreenButton, false);
        }
    }

    componentDidMount(){
        this.setupSockets(this.props.serverIp);
    }

    componentWillReceiveProps(nextProps){
        this.setupSockets(nextProps.serverIp);
    }

    render() {
        return (
            <div className='startScreen'>
                {this.state.showConfigModal ?
                    <ServerConfigModal serverIp={this.props.serverIp}
                                       validate={newValue => {
                                           this.toggleConfigModal();
                                           this.props.changeServerIp(newValue);
                                       }}
                                       close={this.toggleConfigModal}/>
                    : null
                }
                <div className='territoryBackground'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory1 upsideDown'>
                            <PlayerConnection
                                position={1}
                                player={this.getPlayerOn(1)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory2 upsideDown'>
                            <PlayerConnection
                                position={2}
                                player={this.getPlayerOn(2)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory3'>
                            <PlayerConnection
                                position={3}
                                player={this.getPlayerOn(3)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory4'>
                            <PlayerConnection
                                position={4}
                                player={this.getPlayerOn(4)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                </div>
                <div className='startScreenContent'>
                    <Button className='configButton' onClick={this.toggleConfigModal}>
                        <Settings/>
                    </Button>
                    {this.state.showFullScreenButton ?
                        <Button className='fullScreenButton' onClick={this.toggleFullScreen}>
                            <Maximize/>
                        </Button>
                        : null
                    }
                    <div>
                        {!this.state.connecting ?
                            null :
                            <Modal.Dialog className='qrCodeModal'>
                                <span className='qrCodeInstruction upsideDown'>Connection au serveur en cours...</span>
                                <span className='qrCodeInstruction'>Connection au serveur en cours...</span>
                            </Modal.Dialog>
                        }
                    </div>
                </div>
            </div>
        );
    }

    toggleConfigModal(){
        this.setState({showConfigModal: !this.state.showConfigModal});
    }

    toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
    }

    toggleFullScreenButton(){
        this.setState({showFullScreenButton: !this.state.showFullScreenButton});
    }

    setupSockets(serverIp){
        this.setState({connecting: true});
        const socket = openSocket(serverIp, {transports: ['websocket', 'polling', 'flashsocket']});
        socket.on('connect', () => {
            this.setState({connecting: false});
            socket.emit('newGame', response => {
                if (response.error)
                    console.error(response.error);
                else
                    console.log(response.data);
            });
            socket.on('playerJoined', data => {
                console.log(data);
                let players = this.state.players;
                players.push(data);
                this.setState({players: players});
            });
        });
    }

    getPlayerOn(position){
        for(let player of this.state.players){
            if(player.position === position)
                return player;
        }
        return null;
    }
}

export default StartScreen;
