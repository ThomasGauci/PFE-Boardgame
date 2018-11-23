import React, { Component } from 'react';

import './playerZone.css'

class PlayerZone extends Component {

    getCardImage = this.getCardImage.bind(this);

    render() {
        if(this.props.player)
            return (
                <div className='playerZone'>
                    <p>{this.props.player.name}</p>
                    <p>Money: {this.props.player.money}</p>
                    <img src={require(`../../assets/boards/${this.props.player.city}A.jpg`)}/>
                    <p>Played Cards:</p>
                    <div>
                        {this.props.player.playedCards.map(card => {
                            return (
                                <img src={this.getCardImage(card)}/>
                            );
                        })}
                    </div>
                </div>
            );
        else return null;
    }

    getCardImage(card){
        const cardType = card.charAt(0);
        const cardAge = card.charAt(1);
        if (cardType === 'A'){
            return require(`../../assets/cards/${cardType}${cardAge}.jpg`);
        } else if(cardType === 'E' || cardType === 'G'){
            return require(`../../assets/cards/${cardType}.jpg`);
        } else
            return require(`../../assets/cards/${card}_min.jpg`);

    }
}

export default PlayerZone;
