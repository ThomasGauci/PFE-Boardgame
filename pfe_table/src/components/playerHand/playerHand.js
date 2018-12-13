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
    discardLeft: {
        position: 'absolute',
        top:-571,
        left: 512,
        right: 'auto'
    },
    discardRight: {
        position: 'absolute',
        top:-571,
        left: 'auto',
        right: 448
    },
    wonder: {
        position: 'absolute',
        top:-275
    }
});

class PlayerHand extends Component {

    state={
        cardImage: null,
        nbCards: 0,
        animationPhase: 0
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
        if(nbCards !==1 && this.state.animationPhase === 2) {
            this.setState({animationPhase: 0, cardImage: require(`../../assets/cards/back${nextProps.age}.jpg`)}, () => {
                this.props.resetAnimation();
            });
        }
        this.setState({nbCards: nbCards});
    }

    displayCards(){
        let result = [];
        for (let i = 0; i < this.state.nbCards; i++) {
            const startRotation = Math.floor(this.state.nbCards/2) * -5;
            let rotation = startRotation + (i*5);
            result.push(
                <Card
                    key={`card${this.props.position}${i}`}
                    className='playerHandCard'
                    pose={this.getAnimation()}
                    onPoseComplete={() => {
                        if(this.props.action && this.props.action.action === 'building' && this.state.animationPhase === 0){
                            this.setState({
                                animationPhase: 1,
                                cardImage: require(`../../assets/cards/${this.props.action.cardId}.jpg`)
                            });
                        } else if(this.props.action && this.props.action.action === 'building' && this.state.animationPhase === 1){
                            setTimeout(() => {
                                this.setState({animationPhase: 2});
                            }, 2000);
                        } else if(this.props.action && this.props.action.action === 'building' && this.state.animationPhase === 2){
                            this.props.callback();
                        } else if(this.props.action && (this.props.action.action === 'discarding' || this.props.action.action === 'wonderStep') && this.state.animationPhase === 0){
                            setTimeout(() => {
                                this.setState({animationPhase: 1});
                            }, 2000);
                        } else if(this.props.action && (this.props.action.action === 'discarding' || this.props.action.action === 'wonderStep') && this.state.animationPhase === 1){
                            this.props.callback();
                            this.setState({animationPhase: 2});
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
        console.log(this.props.isAnimated, this.state.animationPhase, this.props.action);
        if(this.props.isAnimated || this.state.animationPhase !== 0) {
            if(this.props.action) {
                if (this.props.action.action === 'building') {
                    switch (this.state.animationPhase) {
                        case 0:
                            return 'return';
                        case 1:
                            return 'play';
                        case 2:
                            return 'hidden';
                        default:
                            return 'hidden';
                    }
                } else if (this.props.action.action === 'discarding') {
                    switch (this.state.animationPhase) {
                        case 0:
                            return this.props.action.player.position === 1 || this.props.action.player.position === 3 ? 'discardRight' : 'discardLeft';
                        case 1:
                            return 'hidden';
                        default:
                            return 'hidden';
                    }
                } else if (this.props.action.action === 'wonderStep') {
                    switch (this.state.animationPhase) {
                        case 0:
                            return 'wonder';
                        case 1:
                            return 'hidden';
                        default:
                            return 'hidden';
                    }
                }
            } else {
                return 'waiting';
            }
        } else {
            return 'waiting';
        }
    }
}

export default PlayerHand;
