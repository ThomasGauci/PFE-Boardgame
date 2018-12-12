import React, {Component} from "react";
import "./handView.css";
import * as utils from "../../utils"
import {Label, Image} from 'react-bootstrap';
import CardDetails from "../CardDetails/CardDetails";
import TradingScreen from "../TradingScreen/TradingScreen";
import {Check, X} from "react-feather";

class HandView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {
                    card: {
                        id: "B103",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    tree: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
                {
                    card: {
                        id: "S101",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
                {
                    card: {
                        id: "R101",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
                {
                    card: {
                        id: "P101",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
                {
                    card: {
                        id: "G301",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
                {
                    card: {
                        id: "E101",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
                {
                    card: {
                        id: "A101",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                        {
                            type: 'stone',
                            quantity: 1,
                        }
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "stone",
                                    cost: 2,
                                    quantity: 1
                                }
                            ]
                        },
                        {
                            player: {
                                position: 3,
                                name: "Test2"
                            },
                            resources: [
                                {
                                    type: "wood",
                                    cost: 2,
                                    quantity: 3
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "wood/stone",
                            quantity: 1
                        }
                    ],
                    usefullResources: [
                        {
                            type: "ore",
                            quantity: 1
                        }
                    ]
                },
            ],
            victoryPoints: 0,
            sciencePoints: 0,
            economyPoints: 0,
            wonderPoints: 0,
            warPoints: 0,
            guildPoints: 0,
            civilPoints: 0,
            currentCard: "R101",
            modal: false,
            turn: 0,
            age: 1,
            modalText: "Veuillez choisir une action",
            validated: false,
            trading: false,
            money: 5,
            action: "",
            buttons: {
                building: false,
                wonderStep: false,
                discarding: false
            },
            purchases: []
        };
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.validateTurn = this.validateTurn.bind(this);
        this.closeTrading = this.closeTrading.bind(this);
        this.submitPurchases = this.submitPurchases.bind(this);
    }

    componentDidMount() {
        /*this.setState({
            cards: this.props.data.cards,
            turn: this.props.data.turn,
            age: this.props.data.age,
            money: this.props.data.money,
            victoryPoints: this.props.data.points.victory,
            warPoints: this.props.data.points.war,
            sciencePoints: this.props.data.points.science,
            economyPoints: this.props.data.points.economy,
            wonderPoints: this.props.data.points.wonder,
            guildPoints: this.props.data.points.guild,
            civilPoints: this.props.data.points.civil
        });*/
    }

    submitPurchases(){
        this.setState({
            validated: true
        });
        let dataToSend = {
            cardId: this.state.currentCard.card.id,
            action: this.state.action,
            position: this.props.data.position,
            purchases: this.state.purchases
        };
        this.props.data.socket.emit('turnValidated', dataToSend);
    }

    validateTurn(action) {
        let cardObject = this.state.currentCard;
        this.setState({action: action});
        if (action === "building") {
            if (cardObject.isPlayable && !("availableResources" in cardObject)) {
                let buttons = this.state.buttons;
                for (let buttonId in buttons) {
                    if (buttonId === action) {
                        let newbuttons = {
                            building: false,
                            wonderStep: false,
                            discarding: false
                        };
                        newbuttons[buttonId] = true;
                        this.setState({
                            buttons: newbuttons
                        });
                    }
                }
                this.setState({
                    validated: true,
                    modalText: "Action validée"
                });
                let dataToSend = {
                    cardId: this.state.currentCard.card.id,
                    action: action,
                    position: this.props.data.position
                };
                this.props.data.socket.emit('turnValidated', dataToSend);
            }
            else if (cardObject.isPlayable) {
                this.setState({
                    trading: true,
                    modalText: "Vous n'avez pas assez de ressources mais vous pouvez en acheter"
                });
            }
            else {
                this.setState({
                    modalText: "Vous ne pouvez pas construire ce bâtiment"
                })
            }
        }
        else {
            let buttons = this.state.buttons;
            for (let buttonId in buttons) {
                if (buttonId === action) {
                    let newbuttons = {
                        building: false,
                        wonderStep: false,
                        discarding: false
                    };
                    newbuttons[buttonId] = true;
                    this.setState({
                        buttons: newbuttons
                    });
                }
            }
            this.setState({
                validated: true,
                modalText: "Action validée"
            });
            let dataToSend = {
                cardId: this.state.currentCard.card.id,
                action: action,
                position: this.props.data.position
            };
            this.props.data.socket.emit('turnValidated', dataToSend);
        }

    }

    showModal(cardInfos) {
        this.setState({
            currentCard: cardInfos,
            modal: true
        })
    }

    handleDismissModal() {
        let newbuttons = {
            building: false,
            wonderStep: false,
            discarding: false
        };
        this.setState({
            currentCard: "",
            modal: false,
            buttons: newbuttons,
            validated: false,
            modalText: "Veuillez choisir une action",
            trading: false
        })
    }

    closeTrading(){
        this.setState({trading: false});
    }

    render() {
        var divStyle = {
            background: utils.intToColor(1)//utils.intToColor(this.props.data.position)
        };
        const hand = this.state.cards.map((infos, index) => <div className="playableDiv" key={index}>
                                                                {this.state.cards[index].isPlayable?<Check id="playableCheck" color={"white"} size={35}/>:<X id="playableCross" color={"white"} size={35}/>}
                                                                {this.state.cards[index].tree?<Image className="treeImg" src={require("../../assets/cartes.png")}/>:null}
                                                                <Image  src={require("../../assets/cards/" + infos.card.id + ".jpg")}
                                                                        id={infos.card.id} className="card"
                                                                        onClick={() => this.showModal(infos)}/>
                                                            </div>);
        return (
            <div>
                {this.state.modal ?
                    <CardDetails card={this.state.currentCard.card}
                                 isHandCard
                                 isPlayable={this.state.currentCard.isPlayable}
                                 close={this.handleDismissModal}
                                 build={() => this.validateTurn("building")}
                                 buildWonder={() => this.validateTurn("wonderStep")}
                                 sell={() => this.validateTurn("discarding")}
                                 validated={this.state.validated}
                                 tangible={false}
                    type="red"/>
                    : null
                }
                {this.state.trading ?
                    <TradingScreen purchases={this.state.purchases} submitPurchases={this.submitPurchases} money={this.state.money} currentCard={this.state.currentCard}  close={this.closeTrading}/>
                    : null
                }
                <div id="container" style={divStyle}>
                    <div className="labelsDiv">
                        <Label className="labels transparent">Âge {this.state.age === 1 ? "I" : this.state.age === 2 ? "II" : "III" }</Label>
                        <Label className="labels transparent">Tour {this.state.turn} </Label>
                    </div>
                    <div className="labelsDiv1">
                        <Label className="labels nopad transparent">{this.state.warPoints}</Label>
                        <Image className="pointsImg" src={require("../../assets/war.png")}/>
                        <Label className="labels nopad transparent">{Math.floor(this.state.money/3)}</Label>
                        <Image className="pointsImg" src={require("../../assets/money.png")}/>
                        <Label className="labels nopad transparent">{this.state.wonderPoints}</Label>
                        <Image className="pointsImg" src={require("../../assets/wonderLogo.png")}/>
                        <Label className="labels nopad transparent">{this.state.civilPoints}</Label>
                        <Image className="pointsImg" src={require("../../assets/lauriersWhite.png")}/>
                        <Label className="labels nopad transparent">{this.state.sciencePoints}</Label>
                        <Image className="pointsImg" src={require("../../assets/science.png")}/>
                        <Label className="labels nopad transparent">{this.state.economyPoints}</Label>
                        <Image className="pointsImg" src={require("../../assets/economy.png")}/>
                        <Label className="labels nopad transparent">{this.state.guildPoints}</Label>
                        <Image className="pointsImg" src={require("../../assets/guild.png")}/>
                    </div>
                    <div className="labelsDiv1">
                        <Label className="transparent nopad totalLabel">Total actuel: {this.state.victoryPoints}</Label>
                    </div>
                    <Label text-center="true" className="labels label1 transparent">Choisissez une carte puis une action</Label>
                    <div id="handDiv">
                        {hand}
                    </div>
                </div>
            </div>
        );
    }
}

export default HandView;