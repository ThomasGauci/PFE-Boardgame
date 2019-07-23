import React, { Component } from 'react';
import {Button, Col, Row, Modal} from "react-bootstrap";
import {Maximize, Settings, XCircle} from "react-feather";

import ServerConfigModal from "../../modals/ServerConfigModal";
import './startScreen.css'
import PlayerConnection from "../../components/playerConnection/playerConnection";

class StartScreen extends Component {

    state={
        showConfigModal: false,
        showFullScreenButton: true
    }
    toggleConfigModal = this.toggleConfigModal.bind(this);
    toggleFullScreen = this.toggleFullScreen.bind(this);
    toggleFullScreenButton = this.toggleFullScreenButton.bind(this);
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

    render() {
        return (
            <div className='startScreen'>
                {this.state.showConfigModal ?
                    <ServerConfigModal serverIp={this.props.serverIp}
                                       seedName={this.props.seedName}
                                       gameSeed={this.props.gameSeed}
                                       validate={(serverIp, seedName, gameSeed) => {
                                           this.toggleConfigModal();
                                           this.props.changeConfig(serverIp, seedName, gameSeed);
                                       }}
                                       searchSeed={this.props.searchSeed}
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
                                position={4}
                                player={this.getPlayerOn(4)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory4'>
                            <PlayerConnection
                                position={3}
                                player={this.getPlayerOn(3)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                </div>
                <div className='startScreenContent'>
                    {this.state.showFullScreenButton ?
                        <Button className='fullScreenButton' onClick={this.toggleFullScreen}>
                            <Maximize/>
                        </Button>
                        : null
                    }
                    <div>
                        {this.props.connectionError ?
                            <Modal.Dialog className='errorModal'>
                                <Modal.Header className='errorContent upsideDown'>
                                    <span className='errorText'>Connexion au serveur impossible</span>
                                    <Button className='errorButton' onClick={this.toggleConfigModal}>Changer l'adresse du serveur</Button>
                                </Modal.Header>
                                <Modal.Body className='errorBody'>
                                    <XCircle size={100} color={'white'}/>
                                </Modal.Body>
                                <Modal.Footer className='errorContent'>
                                    <span className='errorText'>Connexion au serveur impossible</span>
                                    <Button className='errorButton' onClick={this.toggleConfigModal}>Changer l'adresse du serveur</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                            :
                            <Button className='configButton' onClick={this.toggleConfigModal}>
                                <Settings/>
                            </Button>
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

    getPlayerOn(position){
        for(let player of this.props.players){
            if(player.position === position)
                return player;
        }
        return null;
    }
}

export default StartScreen;
