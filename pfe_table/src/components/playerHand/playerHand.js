import React, { Component } from 'react';
import posed from 'react-pose';

import './playerHand.css'

const Card = posed.div({
    return: {
        width: 0
    },
    play: {
        position: 'absolute',
        top:-275,
        width: 140
    },
    waiting: {
        position: 'relative',
        top:0,
        left:0,
        width: 140
    },
    hidden: {
        opacity: 0
    },
    discard: {
        position: 'absolute',
        top:-525,
        left: 500
    },
    wonder: {
        position: 'absolute',
        top:-275
    }
});

class PlayerHand extends Component {

    state={
        cardImage: null,
        returned: false,
        played: false
    }

    componentWillMount(){
        this.setState({cardImage: require(`../../assets/cards/back${this.props.age}.jpg`)});
    }

    displayCards(){
        let nbCards = 7 - (this.props.turn-1);
        if(this.props.isReady)
            nbCards = 1;
        let result = [];
        for (let i = 0; i < nbCards; i++) {
            const startRotation = Math.floor(nbCards/2) * -5;
            let rotation = startRotation + (i*5);
            result.push(
                <Card key={`card${this.props.position}${i}`} className='playerHandCard' pose={this.getAnimation(this.props.action)} onPoseComplete={() => {
                    if(this.props.action && this.props.action.action === 'building') {
                        if (!this.state.returned) {
                            this.setState({
                                returned: true,
                                cardImage: require(`../../assets/cards/${this.props.action.cardId}.jpg`)
                            })
                        } else {
                            setTimeout(() => {
                                this.setState({played: true}, () => {
                                    setTimeout(() => {
                                        this.setState({returned: false, played: false});
                                    }, 2000);
                                });
                            }, 2000);
                        }
                    } else {
                        setTimeout(() => {
                            this.setState({played: true});
                        }, 2000);
                    }
                }
                }>
                    <img alt="card"
                         className='gameCard'
                         src={this.state.cardImage}
                         style={{transform:`rotate(${rotation}deg)`, marginTop:Math.abs(rotation)*2.5, width: '100%', height: 212}}/>
                </Card>
            );
        }
        return result;
    }

    render() {
        return (
            <div className='playerHand'>
                {
                    this.displayCards()
                }
            </div>
        );
    }

    getAnimation(action){
        if(this.state.played)
            return 'hidden';
        if(this.state.returned)
            return 'play';
        if(!action)
            return 'waiting';
        switch(action.action){
            case 'building':
                return 'return';
            case 'discarding':
                return 'discard';
            case 'wonderStep':
                return 'wonder';
            default:
                return 'waiting';
        }
    }
}

export default PlayerHand;
