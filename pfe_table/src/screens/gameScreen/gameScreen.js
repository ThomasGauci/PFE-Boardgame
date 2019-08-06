import React, { Component } from 'react';
import {Col, Row, Modal} from "react-bootstrap";

import PlayerZone from "../../components/playerZone/playerZone";
import './gameScreen.css';
import DiscardedCards from "../../components/discardedCards/discardedCards";

class GameScreen extends Component {

    state={
        currentAnimation: null,
        currentBattle: null,
        playedActions: []
    }
    getPlayerOn = this.getPlayerOn.bind(this);
    getAction = this.getAction.bind(this);
    sleep = this.sleep.bind(this);

    async componentWillReceiveProps(nextProps) {
        this.setState({playedActions: []});
        if(nextProps.latestActions) {
            for (let action of nextProps.latestActions) {
                this.setState({currentAnimation: action.player.position});
                await this.sleep(3500);
            }
            this.setState({currentAnimation: null});
            console.log("Emitting next turn demand");
            if(this.props.socket)
                this.props.socket.emit('readyTurn');
            //this.props.resetLatestActions();
        }
        if(nextProps.war) {
            for (let battle of nextProps.war) {
                this.setState({currentBattle: battle});
                await this.sleep(3000);
            }
            this.setState({currentBattle: null});
            console.log("Emitting next age demand");
            if(this.props.socket)
                this.props.socket.emit('readyAge');
        }
    }
    // {this.props.purchaseState!= null ? <ANIMATION/> : null}

    render() {
        return (
            <div className='gameScreen'>
                <div className='territoryBackground'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory1 upsideDown'></Col>
                        <Col md={6} className='territory territory2 upsideDown'></Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory3'></Col>
                        <Col md={6} className='territory territory4'></Col>
                    </Row>
                </div>
                <div className='territoryFront'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory upsideDown'>
                            <PlayerZone
                                position={1}
                                player={this.getPlayerOn(1)}
                                serverIp={this.props.serverIp}
                                age={this.props.age}
                                turn={this.props.turn}
                                isReady={this.props.playerReady[1]}
                                action={this.getAction(1)}
                                isAnimated={this.state.currentAnimation === 1}
                                animationCallback={() => {
                                    let playedActions = this.state.playedActions;
                                    playedActions.push(this.getAction(1));
                                    this.setState({playedActions: playedActions});
                                }}/>
                        </Col>
                        <Col md={6} className='territory upsideDown'>
                            <PlayerZone
                                position={2}
                                player={this.getPlayerOn(2)}
                                serverIp={this.props.serverIp}
                                age={this.props.age}
                                turn={this.props.turn}
                                isReady={this.props.playerReady[2]}
                                action={this.getAction(2)}
                                isAnimated={this.state.currentAnimation === 2}
                                animationCallback={() => {
                                    let playedActions = this.state.playedActions;
                                    playedActions.push(this.getAction(2));
                                    this.setState({playedActions: playedActions});
                                }}/>
                        </Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory'>
                            <PlayerZone
                                position={4}
                                player={this.getPlayerOn(4)}
                                serverIp={this.props.serverIp}
                                age={this.props.age}
                                turn={this.props.turn}
                                isReady={this.props.playerReady[4]}
                                action={this.getAction(4)}
                                isAnimated={this.state.currentAnimation === 4}
                                animationCallback={() => {
                                    let playedActions = this.state.playedActions;
                                    playedActions.push(this.getAction(4));
                                    this.setState({playedActions: playedActions});
                                }}/>
                        </Col>
                        <Col md={6} className='territory'>
                            <PlayerZone
                                position={3}
                                player={this.getPlayerOn(3)}
                                serverIp={this.props.serverIp}
                                age={this.props.age}
                                turn={this.props.turn}
                                isReady={this.props.playerReady[3]}
                                action={this.getAction(3)}
                                isAnimated={this.state.currentAnimation === 3}
                                animationCallback={() => {
                                    let playedActions = this.state.playedActions;
                                    playedActions.push(this.getAction(3));
                                    this.setState({playedActions: playedActions});
                                }}/>
                        </Col>
                    </Row>
                </div>
                <DiscardedCards
                    discardedCards={this.props.discardedCards}
                    actions={this.props.latestActions}
                    playedActions={this.state.playedActions}/>
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
                                <img alt="swords" className='warImage warImageFirst' src={require("../../assets/swords.svg")}/>
                                <img alt="swords" className='warImage upsideDown' src={require("../../assets/swords.svg")}/>
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

    getAction(position){
        if(this.props.latestActions)
            for(let action of this.props.latestActions){
                if(action.player.position === position)
                    return action;
            }
        else
            return null;
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
// rajouter dans game screen this.props.purchaseState8=nul alors lancer l'animation