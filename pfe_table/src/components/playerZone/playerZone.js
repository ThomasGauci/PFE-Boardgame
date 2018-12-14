import React, { Component } from 'react';

import './playerZone.css'

class PlayerZone extends Component {

    getCardImage = this.getCardImage.bind(this);

    render() {
        if(this.props.player) {
            let resources = [];
            let products = [];
            let economics = [];
            let militarys = [];
            let buildings = [];
            let sciences = [];
            let guilds = [];

            this.props.player.playedCards.map(card => {
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
                                    <img className="playerZoneWarPoint" src={require(`../../assets/war${warPoint}.png`)}/>
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
                                            <img id={card.id} className='gameCardMin playerCardMin shadow' key={`${this.props.player.position}${index}`}
                                            src={this.getCardImage(card)}/>
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
                                                <img id={card.id} className='gameCardMin playerCardMin shadow'
                                                     key={`${this.props.player.position}${index}`}
                                                     src={this.getCardImage(card)}/>
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
                                                    <img id={card.id} className='gameCardMin playerCardMin shadow'
                                                         key={`${this.props.player.position}${index}`}
                                                         src={this.getCardImage(card)}/>
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
                                                    <img id={card.id} className='gameCardMin playerCardMin shadow'
                                                         key={`${this.props.player.position}${index}`}
                                                         src={this.getCardImage(card)}/>
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
                                                    <img id={card.id} className='gameCardMin playerCardMin shadow'
                                                         key={`${this.props.player.position}${index}`}
                                                         src={this.getCardImage(card)}/>
                                                );
                                            })
                                        }
                                    </div>
                                    : null
                                }
                                <img className='gameBoard playerBoardImage shadow'
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
                                                <img id={card.id} className='gameCardMin playerCardMin shadow'
                                                     key={`${this.props.player.position}${index}`}
                                                     src={this.getCardImage(card)}/>
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
                                            <img id={card.id} className='gameCardMin playerCardMin shadow' key={`${this.props.player.position}${index}`}
                                            src={this.getCardImage(card)}/>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            );
        }
        else return null;
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

export default PlayerZone;
