import React, { Component } from 'react';

import './playerZone.css'

class PlayerZone extends Component {

    getCardImage = this.getCardImage.bind(this);

    render() {
        if(this.props.player)
            return (
                <div className='playerZone'>
                    <div className='playerMoney shadow'>
                        <div>{this.props.player.money}</div>
                    </div>
                    <div className='playerBoard'>
                        <img className='gameBoard shadow' src={require(`../../assets/boards/${this.props.player.city}A.jpg`)}/>
                    </div>
                    <div className='playedCards'>
                        <p>Cartes jouées :</p>
                        {this.props.player.playedCards ?
                            <div>
                                {this.props.player.playedCards.map((card, index) => {
                                    return (
                                        <img className='shadow' key={`${this.props.player.position}${index}`} src={this.getCardImage(card)}/>
                                    );
                                })}
                            </div>
                            : null
                        }
                    </div>
                </div>
            );
        else return null;
    }

    getCardImage(card){
        const cardType = card.id.charAt(0);
        const cardAge = card.id.charAt(1);
        if (cardType === 'A'){
            return require(`../../assets/cards/${cardType}${cardAge}.jpg`);
        } else if(cardType === 'E' || cardType === 'G'){
            return require(`../../assets/cards/${cardType}.jpg`);
        } else
            return require(`../../assets/cards/${card.id}_min.jpg`);

    }
}

export default PlayerZone;
