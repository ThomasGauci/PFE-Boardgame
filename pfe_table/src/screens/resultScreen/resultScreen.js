import React, { Component } from 'react';
import {Col, Row} from "react-bootstrap";
import PlayerResult from "../../components/playerResult/playerResut";

class ResultScreen extends Component {

    state={

    }
    getPlayerPoints = this.getPlayerPoints.bind(this);

    render() {
        return (
            <div className='startScreen'>
                <div className='territoryBackground'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory1 upsideDown'>
                            <PlayerResult position={1} points={this.getPlayerPoints(1)}/>
                        </Col>
                        <Col md={6} className='territory territory2 upsideDown'>
                            <PlayerResult position={2} points={this.getPlayerPoints(2)}/>
                        </Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory3'>
                            <PlayerResult position={4} points={this.getPlayerPoints(4)}/>
                        </Col>
                        <Col md={6} className='territory territory4'>
                            <PlayerResult position={3} points={this.getPlayerPoints(3)}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    getPlayerPoints(playerPosition){
        for(let playerPoints of this.props.points){
            if(playerPoints.player.position === playerPosition){
                return playerPoints;
            }
        }
        return null;
    }
}

export default ResultScreen;
