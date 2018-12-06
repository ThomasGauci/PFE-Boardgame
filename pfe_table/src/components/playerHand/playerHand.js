import React, { Component } from 'react';

import './playerHand.css'

class PlayerHand extends Component {

    displayCards(){
        let nbCards = 7 - (this.props.turn-1);
        if(this.props.isReady)
            nbCards = 1;
        let result = [];
        for (let i = 0; i < nbCards; i++) {
            const startRotation = Math.floor(nbCards/2) * -5;
            let rotation = startRotation + (i*5);
            result.push(
                <img className='gameCard playerHandCard'
                     src={require(`../../assets/cards/back${this.props.age}.jpg`)}
                     style={{transform:`rotate(${rotation}deg)`, marginTop:Math.abs(rotation)*2.5}}/>
            );
        }
        return result;
    }

    render() {
        console.log(this.props);
        return (
            <div className='playerHand'>
                {
                    this.displayCards()
                }
            </div>
        );
    }
}

export default PlayerHand;
