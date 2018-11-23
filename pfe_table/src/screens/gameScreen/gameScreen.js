import React, { Component } from 'react';
import {Button, Col, Row} from "react-bootstrap";

import {Maximize} from "react-feather";
import PlayerZone from "../../components/playerZone/playerZone";

class GameScreen extends Component {

    state={
        currentAction: null
    }
    toggleFullScreen = this.toggleFullScreen.bind(this);
    toggleFullScreenButton = this.toggleFullScreenButton.bind(this);
    getPlayerOn = this.getPlayerOn.bind(this);
    sleep = this.sleep.bind(this);

    constructor(){
        super();
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('mozfullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('fullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('MSFullscreenChange', this.toggleFullScreenButton, false);
        }
    }

    async componentWillReceiveProps(nextProps) {
        for (let action of nextProps.latestActions) {
            this.setState({currentAction: action});
            await this.sleep(3000);
        }
        this.setState({currentAction: null});
        this.props.socket.emit('readyTurn', '');
    }

    render() {
        return (
            <div className='startScreen'>
                {this.state.showFullScreenButton ?
                    <Button className='fullScreenButton' onClick={this.toggleFullScreen}>
                        <Maximize/>
                    </Button>
                    : null
                }
                <div className='territoryBackground'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory1 upsideDown'>
                            <PlayerZone
                                position={1}
                                player={this.getPlayerOn(1)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory2 upsideDown'>
                            <PlayerZone
                                position={2}
                                player={this.getPlayerOn(2)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory3'>
                            <PlayerZone
                                position={3}
                                player={this.getPlayerOn(3)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory4'>
                            <PlayerZone
                                position={4}
                                player={this.getPlayerOn(4)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                </div>
                <div style={{zIndex: 9999999, background: 'white'}}>
                    {this.state.currentAction ? `${this.state.currentAction.player} ${this.state.currentAction.action} ${this.state.currentAction.card}` : null}
                </div>
            </div>
        );
    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
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

export default GameScreen;
