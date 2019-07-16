import React, {Component} from 'react';

import posed from "react-pose";

const Wonder = posed.div({
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: 0 }
    }
});

class WonderStep extends Component {
    render() {
        return (
            <Wonder className='wonderStep' pose={this.getAnimation()}>
                <img
                    className='shadow'
                    alt="wonderImage"
                    src={require(`../../assets/cards/back${this.props.age}_min.jpg`)}/>
            </Wonder>
        );
    }

    getAnimation(){
        if(this.props.isLast) {
            if(this.props.action){
                if(this.props.action.action === 'wonderStep'){
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
}

export default WonderStep;