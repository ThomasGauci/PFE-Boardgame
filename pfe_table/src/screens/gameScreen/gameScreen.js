import React, { Component } from 'react';
import {Col, Row, Modal} from "react-bootstrap";

import PlayerZone from "../../components/playerZone/playerZone";
import './gameScreen.css';

class GameScreen extends Component {

    state={
        currentAction: null,
        currentBattle: null
    }
    getPlayerOn = this.getPlayerOn.bind(this);
    sleep = this.sleep.bind(this);

    async componentWillReceiveProps(nextProps) {
        if(nextProps.latestActions) {
            for (let action of nextProps.latestActions) {
                this.setState({currentAction: action});
                await this.sleep(3000);
            }
            this.setState({currentAction: null});
            console.log("Next turn plz");
            this.props.socket.emit('readyTurn');
        }
        if(nextProps.war) {
            for (let battle of nextProps.war) {
                this.setState({currentBattle: battle});
                await this.sleep(3000);
            }
            this.setState({currentBattle: null});
            console.log("Next age plz");
            this.props.socket.emit('readyAge');
        }
    }

    render() {
        return (
            <div className='gameScreen'>
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
                                position={4}
                                player={this.getPlayerOn(4)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                        <Col md={6} className='territory territory4'>
                            <PlayerZone
                                position={3}
                                player={this.getPlayerOn(3)}
                                serverIp={this.props.serverIp}/>
                        </Col>
                    </Row>
                </div>
                { this.state.currentAction ?
                    <div>
                        <Modal.Dialog className='actionModal'>
                            <h1 className='actionTextZone upsideDown'>
                                <span className='actionPlayer' style={{color: this.getPlayerColor(this.state.currentAction.player.position)}}>{this.state.currentAction.player.name}</span> a {this.getActionLabel(this.state.currentAction.action)}
                            </h1>
                            <div>
                                <img className='gameCard actionCard' src={this.getActionImage(this.state.currentAction.action, this.state.currentAction.cardId)}/>
                                <img className='gameCard actionCard upsideDown' src={this.getActionImage(this.state.currentAction.action, this.state.currentAction.cardId)}/>
                            </div>
                            <h1 className='actionTextZone'>
                                <span className='actionPlayer' style={{color: this.getPlayerColor(this.state.currentAction.player.position)}}>{this.state.currentAction.player.name}</span> a {this.getActionLabel(this.state.currentAction.action)}
                            </h1>
                        </Modal.Dialog>
                    </div>
                    : null
                }
                {this.state.currentBattle ?
                    <div>
                        <Modal.Dialog className='actionModal'>
                            <h1 className='actionTextZone upsideDown'>
                                <span className='actionPlayer'
                                      style={{color: this.getPlayerColor(this.state.currentBattle.winner.position)}}>{this.state.currentBattle.winner.name}</span> a
                                battu <span className='actionPlayer'
                                            style={{color: this.getPlayerColor(this.state.currentBattle.loser.position)}}>{this.state.currentBattle.loser.name}</span>
                            </h1>
                            <div className='warHeader'>
                                <img className='warImage warImageFirst' src={require("../../assets/swords.svg")}/>
                                <img className='warImage upsideDown' src={require("../../assets/swords.svg")}/>
                            </div>
                            <h1 className='actionTextZone'>
                                <span className='actionPlayer'
                                      style={{color: this.getPlayerColor(this.state.currentBattle.winner.position)}}>{this.state.currentBattle.winner.name}</span> a
                                battu <span className='actionPlayer'
                                            style={{color: this.getPlayerColor(this.state.currentBattle.loser.position)}}>{this.state.currentBattle.loser.name}</span>
                            </h1>
                        </Modal.Dialog>
                    </div>
                    : null
                }
            </div>
        );
    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    getPlayerOn(position){
        for(let player of this.props.players){
            if(player.position === position)
                return player;
        }
        return null;
    }

    getActionLabel(action){
        switch (action) {
            case 'building':
                return 'construit';
            case 'wonderStep':
                return 'amélioré sa merveille';
            case 'discarding':
                return 'vendu une carte';
            default:
                return "utilisé une technique secrète qui n'est pas sensé exister";
        }
    }

    getActionImage(action, cardId){
        if(action === 'building')
            return require(`../../assets/cards/${this.state.currentAction.cardId}.jpg`);
        else{
            const age = cardId.charAt(1);
            return require(`../../assets/cards/back${age}.jpg`);
        }
    }

    getPlayerColor(position){
        switch (position) {
            case 1:
                return 'dodgerblue';
            case 2:
                return 'forestgreen';
            case 3:
                return 'orange';
            case 4:
                return 'indianred';
            default:
                return 'gray';
        }
    }
}

export default GameScreen;
