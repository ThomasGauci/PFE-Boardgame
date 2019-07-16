import React, {Component} from 'react';
import posed from "react-pose";

import './coin.css';

const CoinImage = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },
    moveTop: {
        position: 'absolute',
        top: -65,
        transition: { duration: 750 }
    },
    moveRight: {
        position: 'absolute',
        right: -245,
        left: 'auto',
        transition: { duration: 750 }
    },
    moveLeft: {
        position: 'absolute',
        left: -245,
        right: 'auto',
        transition: { duration: 750 }
    }
});

class Coin extends Component {

    state={
        animationPhase: 0
    }

    render() {
        return (
            <CoinImage
                className='coin'
                pose={this.getAnimation()}
                onPoseComplete={() => {
                    if(this.state.animationPhase < 2){
                        this.setState({animationPhase: this.state.animationPhase + 1});
                    }
                }}>
                <img alt="coin" src={require("../../assets/silver_front.png")}/>
            </CoinImage>
        );
    }

    getAnimation(){
        if(this.props.isAnimated) {
            switch (this.state.animationPhase) {
                case 0:
                    return 'visible';
                case 1:
                    switch(this.props.buyer){
                        case 1:
                            if(this.props.seller === 4)
                                return 'moveTop';
                            else
                                return 'moveLeft';
                        case 2:
                            if(this.props.seller === 3)
                                return 'moveTop';
                            else
                                return 'moveRight';
                        case 3:
                            if(this.props.seller === 2)
                                return 'moveTop';
                            else
                                return 'moveLeft';
                        case 4:
                            if(this.props.seller === 1)
                                return 'moveTop';
                            else
                                return 'moveRight';
                        default:
                            return 'hidden';
                    }
                case 2:
                    return 'hidden';
                default:
                    return 'hidden';
            }
        } else {
            return 'hidden';
        }
    }
}

export default Coin;