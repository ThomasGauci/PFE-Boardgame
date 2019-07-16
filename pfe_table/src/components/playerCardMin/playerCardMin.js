import React, {Component} from 'react';

import './playerCardMin.css';
import posed from "react-pose";

const CardMin = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
});

class PlayerCardMin extends Component {

    getCardImage = this.getCardImage.bind(this);

    render() {
        return (
            <CardMin pose={this.getAnimation()}
                     className="playerCardMinDiv">
                <img alt={`${this.props.card.type}_card_min`}
                     id={this.props.card.id}
                     className='gameCardMin playerCardMin shadow'
                     src={this.getCardImage(this.props.card)}/>
            </CardMin>
        );
    }

    getAnimation(){
        if(this.props.card.isLast) {
            if(this.props.action){
                if(this.props.action.action === 'building'){
                    if(this.props.animationPhase !== 0) {
                        return 'visible';
                    } else {
                        return 'hidden';
                    }
                } else {
                    return 'visible';
                }
            } else {
                return 'visible'
            }
        } else {
            return 'visible';
        }
    }

    getCardImage(card){
        const cardType = card.id.charAt(0);
        const cardAge = card.id.charAt(1);
        if (cardType === 'A'){
            return require(`../../assets/cards/${cardType}${cardAge}.jpg`);
        } else
            return require(`../../assets/cards/${card.id}_min.jpg`);
    }
}

export default PlayerCardMin;