import React, { Component } from 'react';

import './playerResult.css';

class PlayerResult extends Component {

    render() {
        let gold = this.props.points.gold;
        let wonder = gold + (this.props.points.wonder !== 0 ? this.props.points.wonder + 5 : 0);
        let victory = wonder + (this.props.points.victory !== 0 ? this.props.points.victory + 5 : 0);
        let economy = victory + (this.props.points.economy !== 0 ? this.props.points.economy + 5 : 0);
        let guild = economy + (this.props.points.guild !== 0 ? this.props.points.guild + 5 : 0);
        let science = guild + (this.props.points.science !== 0 ? this.props.points.science + 5 : 0);
        let warStart = science;
        let warEnd = warStart + this.props.points.war;

        gold = (gold*450)/100;
        wonder = (wonder*450)/100;
        victory = (victory*450)/100;
        economy = (economy*450)/100;
        guild = (guild*450)/100;
        science = (science*450)/100;
        warStart = (warStart*450)/100;
        warEnd = (warEnd*450)/100;

        if(warStart > warEnd){
            let temp = warStart;
            warStart = warEnd;
            warEnd = temp;
        }

        return (
            <div className='playerResult'>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'goldCircle resultCircle resultCircleTopLeft' : 'goldCircle resultCircle resultCircleTopRight'} style={{width: gold, height: gold}}>
                    <span>gold</span>
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'wonderCircle resultCircle resultCircleTopLeft' : 'wonderCircle resultCircle resultCircleTopRight'} style={{width: wonder, height: wonder}}>
                    <span>wonder</span>
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'victoryCircle resultCircle resultCircleTopLeft' : 'victoryCircle resultCircle resultCircleTopRight'} style={{width: victory, height: victory}}>
                    <span>victory</span>
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'economyCircle resultCircle resultCircleTopLeft' : 'economyCircle resultCircle resultCircleTopRight'} style={{width: economy, height: economy}}>
                    <span>economy</span>
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'guildCircle resultCircle resultCircleTopLeft' : 'guildCircle resultCircle resultCircleTopRight'} style={{width: guild, height: guild}}>
                    <span>guild</span>
                </div>
                <div className={this.props.position === 1 || this.props.position === 3 ? 'scienceCircle resultCircle resultCircleTopLeft' : 'scienceCircle resultCircle resultCircleTopRight'} style={{width: science, height: science}}>
                    <span>science</span>
                </div>
                {warEnd > science ?
                    <div className={this.props.position === 1 || this.props.position === 3 ? 'militaryCircle resultCircle resultCircleTopLeft' : 'militaryCircle resultCircle resultCircleTopRight'} style={{width: warEnd, height: warEnd}}>
                        <span>war</span>
                    </div>
                    :
                    warStart != science ?
                        <svg
                            width={warEnd}
                            height={warEnd}
                            className={this.props.position === 2 || this.props.position === 4 ? 'rightWarCircle' : 'leftWarCircle'}>
                            <defs>
                                <pattern id="img1" x="0" y="0" patternUnits="userSpaceOnUse" width="50" height="50">
                                    <image xlinkHref={require("../../assets/warStripes.png")}
                                           x="0" y="0"
                                           width="50" height="50"/>
                                </pattern>
                            </defs>
                            <path
                                d={`M 0,${warStart} C ${warStart / 2},${warStart+10},${warStart+10},${warStart / 2},${warStart},0 l ${warEnd - warStart},0 C ${warEnd},${warEnd / 2 + 15},${warEnd / 2 + 15},${warEnd},0,${warEnd} L 0,${warStart} z`}
                                fill={"url(#img1)"}
                                className={this.props.position === 2 || this.props.position === 4 ? 'rightPath' : null}/>
                        </svg>
                        : null
                }
            </div>
        );
    }
}

export default PlayerResult;
