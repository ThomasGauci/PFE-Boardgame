import React, { Component } from 'react';

import './playerResult.css';

class PlayerResult extends Component {

    render() {
        const gold = this.props.points.gold;
        console.log('gold', gold);
        const wonder = gold + this.props.points.wonder + 5;
        console.log('wonder', wonder);
        const victory = wonder + this.props.points.victory + 5;
        console.log('victory', victory);
        const economy = victory + this.props.points.economy + 5;
        console.log('economy', economy);
        const science = economy + this.props.points.science + 5;
        console.log('science', science);
        const war = science + this.props.points.war + 5;
        console.log('war', war);
        return (
            <div className='playerResult'>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'goldCircle resultCircle resultCircleTopLeft' : 'goldCircle resultCircle resultCircleTopRight'} style={{width: (gold*450)/100, height: (gold*450)/100}}>
                    gold
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'wonderCircle resultCircle resultCircleTopLeft' : 'wonderCircle resultCircle resultCircleTopRight'} style={{width: (wonder*450)/100, height: (wonder*450)/100}}>
                    wonder
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'victoryCircle resultCircle resultCircleTopLeft' : 'victoryCircle resultCircle resultCircleTopRight'} style={{width: (victory*450)/100, height: (victory*450)/100}}>
                    victory
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'economyCircle resultCircle resultCircleTopLeft' : 'economyCircle resultCircle resultCircleTopRight'} style={{width: (economy*450)/100, height: (economy*450)/100}}>
                    economy
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'scienceCircle resultCircle resultCircleTopLeft' : 'scienceCircle resultCircle resultCircleTopRight'} style={{width: (science*450)/100, height: (science*450)/100}}>
                    science
                </div>
                {/*<div className={this.props.position === 1 || this.props.position === 3 ? 'militaryCircle resultCircle resultCircleTopLeft' : 'militaryCircle resultCircle resultCircleTopRight'} style={{width: (war*450)/100, height: (war*450)/100}}></div>
            */}</div>
        );
    }
}

export default PlayerResult;
