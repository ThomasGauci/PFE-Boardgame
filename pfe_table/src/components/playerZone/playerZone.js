import React, { Component } from 'react';

import './playerZone.css'
import PlayerHand from "../playerHand/playerHand";
import PlayerCardMin from "../playerCardMin/playerCardMin";

class PlayerZone extends Component {

    state={
        animationPhase: 0
    }
    setAnimationPhase = this.setAnimationPhase.bind(this);

    render() {
        if(this.props.player) {
            let resources = [];
            let products = [];
            let economics = [];
            let militarys = [];
            let buildings = [];
            let sciences = [];
            let guilds = [];

            this.props.player.playedCards.forEach((card, index) => {
                if(index === this.props.player.playedCards.length-1)
                    card.isLast = true;
                switch (card.type) {
                    case "resource":
                        resources.push(card);
                        break;
                    case "product":
                        products.push(card);
                        break;
                    case "economic":
                        economics.push(card);
                        break;
                    case "military":
                        militarys.push(card);
                        break;
                    case "building":
                        buildings.push(card);
                        break;
                    case "science":
                        sciences.push(card);
                        break;
                    case "guild":
                        guilds.push(card);
                        break;
                    default:
                        break;
                }
            });

            return (
                <div className='playerZone'>
                    <div className={this.props.player.position === 1 || this.props.player.position === 3 ? 'playerZoneStatsLeft' : 'playerZoneStatsRight'}>
                        {
                            this.props.player.position === 1 || this.props.player.position === 3 ?
                                <div className='playerMoney shadow'>
                                    <div>{this.props.player.money}</div>
                                </div>
                                : null
                        }
                        <div className="playerZoneWarPoints">
                            {this.props.player.warPointsDisplay.map(warPoint => {
                                return (
                                    <img alt="warPoint" className="playerZoneWarPoint" src={require(`../../assets/war${warPoint}.png`)}/>
                                );
                            })}
                        </div>
                        {
                            this.props.player.position === 2 || this.props.player.position === 4 ?
                                <div className='playerMoney shadow'>
                                    <div>{this.props.player.money}</div>
                                </div>
                                : null
                        }
                    </div>
                    <div className='playerBoard'>
                        <div className='playerBoardContent'>
                            {economics.length > 0 ?
                                <div className='playedEconomics'>
                                    {
                                        economics.map((card, index) => {
                                            return (
                                                <PlayerCardMin
                                                    card={card}
                                                    key={`${this.props.player.position}${index}`}
                                                    animationPhase={this.state.animationPhase}
                                                    action={this.props.action}
                                                    isAnimated={this.props.isAnimated}/>
                                            );
                                        })
                                    }
                                </div>
                                : null
                            }
                            {resources.length > 0 ?
                                <div className='playedResources'>
                                    {
                                        resources.map((card, index) => {
                                            return (
                                                <PlayerCardMin
                                                    card={card}
                                                    key={`${this.props.player.position}${index}`}
                                                    animationPhase={this.state.animationPhase}
                                                    action={this.props.action}
                                                    isAnimated={this.props.isAnimated}/>
                                            );
                                        })
                                    }
                                </div>
                                : null
                            }
                            <div className="boardZone">
                                {products.length > 0 ?
                                    <div className='playedProducts'>
                                        {
                                            products.map((card, index) => {
                                                return (
                                                    <PlayerCardMin
                                                        card={card}
                                                        key={`${this.props.player.position}${index}`}
                                                        animationPhase={this.state.animationPhase}
                                                        action={this.props.action}
                                                        isAnimated={this.props.isAnimated}/>
                                                );
                                            })
                                        }
                                    </div>
                                    : null
                                }
                                {guilds.length > 0 ?
                                    <div className='playedGuilds'>
                                        {
                                            guilds.map((card, index) => {
                                                return (
                                                    <PlayerCardMin
                                                        card={card}
                                                        key={`${this.props.player.position}${index}`}
                                                        animationPhase={this.state.animationPhase}
                                                        action={this.props.action}
                                                        isAnimated={this.props.isAnimated}/>
                                                );
                                            })
                                        }
                                    </div>
                                    : null
                                }
                                {buildings.length > 0 ?
                                    <div className='playedBuildings'>
                                        {
                                            buildings.map((card, index) => {
                                                return (
                                                    <PlayerCardMin
                                                        card={card}
                                                        key={`${this.props.player.position}${index}`}
                                                        animationPhase={this.state.animationPhase}
                                                        action={this.props.action}
                                                        isAnimated={this.props.isAnimated}/>
                                                );
                                            })
                                        }
                                    </div>
                                    : null
                                }
                                <img alt="playerBoard"
                                     className='gameBoard playerBoardImage shadow'
                                     src={require(`../../assets/boards/${this.props.player.city}A.jpg`)}/>
                            </div>
                            <div className='wonders'>
                                {
                                    this.props.player.wonders ?
                                        this.props.player.wonders.map((card, index) => {
                                            return (
                                                <div key={index}>
                                                    <img
                                                        className='shadow'
                                                        alt="wonderImage"
                                                        src={require(`../../assets/cards/back${card.age}_min.jpg`)}/>
                                                </div>
                                            );
                                        })
                                        : null
                                }
                            </div>
                            {sciences.length > 0 ?
                                <div className='playedSciences'>
                                    {
                                        sciences.map((card, index) => {
                                            return (
                                                <PlayerCardMin
                                                    card={card}
                                                    key={`${this.props.player.position}${index}`}
                                                    animationPhase={this.state.animationPhase}
                                                    action={this.props.action}
                                                    isAnimated={this.props.isAnimated}/>
                                            );
                                        })
                                    }
                                </div>
                                : null
                            }
                        </div>
                        {militarys.length > 0 ?
                            <div className='playerBoardContentRight'>
                                <div className='playedMilitarys'>
                                    {
                                        militarys.map((card, index) => {
                                            return (
                                                <PlayerCardMin
                                                    card={card}
                                                    key={`${this.props.player.position}${index}`}
                                                    animationPhase={this.state.animationPhase}
                                                    action={this.props.action}
                                                    isAnimated={this.props.isAnimated}/>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <PlayerHand
                        position={this.props.player.position}
                        age={this.props.age}
                        turn={this.props.turn}
                        isReady={this.props.isReady}
                        action={this.props.action}
                        isAnimated={this.props.isAnimated}
                        callback={() => {
                            this.setAnimationPhase(1);
                            this.props.animationCallback();
                        }}
                        resetAnimation={() => {
                            this.setAnimationPhase(0);
                        }}/>
                </div>
            );
        }
        else return null;
    }

    setAnimationPhase(phase){
        this.setState({animationPhase: phase});
    }
}

export default PlayerZone;
