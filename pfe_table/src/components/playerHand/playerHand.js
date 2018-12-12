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
        width: 140,
        opacity: 1,
        transition: { duration: 0 }
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
        played: false,
        nbCards: 0
    }

    componentWillMount(){
        let nbCards = 7 - (this.props.turn-1);
        if(this.props.isReady)
            nbCards = 1;
        this.setState({nbCards: nbCards, cardImage: require(`../../assets/cards/back${this.props.age}.jpg`)});
    }

    componentWillReceiveProps(nextProps){
        let nbCards = 7 - (nextProps.turn-1);
        if(nextProps.isReady)
            nbCards = 1;
        if(nbCards !==1 && this.state.played === true)
            this.setState({played: false, returned: false});
        this.setState({nbCards: nbCards, cardImage: require(`../../assets/cards/back${nextProps.age}.jpg`)});
    }

    displayCards(){
        let result = [];
        for (let i = 0; i < this.state.nbCards; i++) {
            const startRotation = Math.floor(this.state.nbCards/2) * -5;
            let rotation = startRotation + (i*5);
            result.push(
                <Card key={`card${this.props.position}${i}`} className='playerHandCard' pose={this.getAnimation()} onPoseComplete={() => {
                    if(this.props.action && this.props.action.action === 'building') {
                        if (!this.state.returned) {
                            this.setState({
                                returned: true,
                                cardImage: require(`../../assets/cards/${this.props.action.cardId}.jpg`)
                            })
                        } else {
                            setTimeout(() => {
                                this.setState({played: true, returned: false}, () => {
                                    this.props.callback();
                                });
                            }, 2000);
                        }
                    } else if(this.props.action) {
                        setTimeout(() => {
                            this.setState({played: true}, () => {
                                this.props.callback();
                            });
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

    getAnimation(){
        if(this.state.played)
            return 'hidden';
        if(this.state.returned)
            return 'play';
        if(!this.props.isAnimated)
            return 'waiting';
        switch(this.props.action.action){
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
