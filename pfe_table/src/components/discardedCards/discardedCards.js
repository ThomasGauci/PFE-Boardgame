import React, {Component} from 'react';

import './discardedCards.css';
import posed from "react-pose";

const DiscardedCard = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: 0 }
    }
});

class DiscardedCards extends Component {
    render() {
        return (
            <div className='discardedCards'>
                <img alt="discardedCardBackground" className='gameCard' src={require("../../assets/cards/cardEmpty.png")}/>
                {
                    this.displayDiscardedCards()
                }
            </div>
        );
    }

    displayDiscardedCards(){
        if(this.props.discardedCards) {
            let discardedCards = this.props.discardedCards.slice();
            discardedCards = discardedCards.map(card => {
                card.isHidden = false;
                return card;
            });
            let nbCardsToRemove = 0;
            if(this.props.actions) {
                for (let action of this.props.actions) {
                    if (action.action === 'discarding')
                        nbCardsToRemove++;
                }
            }
            for (let action of this.props.playedActions) {
                if (action.action === 'discarding')
                    nbCardsToRemove--;
            }
            for (let i = 1; i <= nbCardsToRemove; i++) {
                discardedCards[discardedCards.length - i].isHidden = true;
            }

            if (discardedCards)
                return discardedCards.map((card, index) => {
                    return (
                        <DiscardedCard pose={card.isHidden ? 'hidden' : 'visible'}>
                            <img
                                alt="discardedCard"
                                key={index} className='gameCard discardedCard'
                                src={require(`../../assets/cards/back${card.age}.jpg`)}/>
                        </DiscardedCard>
                    );
                });
        }
    }
}

export default DiscardedCards;