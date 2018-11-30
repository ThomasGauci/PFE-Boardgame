import React, {Component} from "react";
import "./handView.css";
import * as utils from "../../utils"
import {Label, Image} from 'react-bootstrap';
import CardDetails from "../CardDetails/CardDetails";
import TradingScreen from "../TradingScreen/TradingScreen";

class HandView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [
                {
                    card: {
                        id: "A102",
                        cost: [{name: "wood", quantity: 1}]
                    },
                    isPlayable: true,
                    missingResources: [
                        {
                            type: 'wood',
                            quantity: 1,
                        },
                    ],
                    availableResources: [
                        {
                            player: {
                                position: 1,
                                name: "Test"
                            },
                            resources: [
                                {
                                    type: "wood/stone",
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
                                    quantity: 1
                                }
                            ]
                        }
                    ],
                    stayingResources: [
                        {
                            type: "clay",
                            quantity: 1
                        }
                    ],
                    usefullResources: []
                }
            ],
            currentCard: "R101",
            modal: false,
            turn: 0,
            age: 0,
            modalText: "Veuillez choisir une action",
            validated: false,
            trading: false,
            money: 5,
            buttons: {
                building: false,
                wonderStep: false,
                discarding: false
            }
        };
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.validateTurn = this.validateTurn.bind(this);
        this.getCardObject = this.getCardObject.bind(this);
    }

    componentDidMount() {
        this.setState({
            cards: this.props.data.cards,
            turn: this.props.data.turn,
            age: this.props.data.age
        })
    }

    getCardObject(cardId) {
        let cardsInfos = this.state.cards;
        for (let i = 0; i < this.state.cards.length; i++) {
            if (cardsInfos[i].card.id === cardId) {
                return cardsInfos[i];
            }
        }
    }

    validateTurn(action) {
        let cardObject = this.getCardObject(this.state.currentCard);
        console.log(cardObject);
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
                    cardId: this.state.currentCard,
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
                cardId: this.state.currentCard,
                action: action,
                position: this.props.data.position
            };
            this.props.data.socket.emit('turnValidated', dataToSend);
        }

    }

    showModal(cardId) {
        this.setState({
            currentCard: cardId,
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
            background: utils.intToColor(this.props.data.position)
        };
        const hand = this.state.cards.map((infos, index) => <Image key={index} rounded
                                                                   src={require("../../assets/cards/" + infos.card.id + ".jpg")}
                                                                   id={infos.card.id} className="card"
                                                                   onClick={() => this.showModal(infos.card.id)}/>)
        return (
            <div>
                {this.state.modal ?
                    <CardDetails card={this.state.cards[0].card}
                                 isHandCard
                                 isPlayable={this.state.cards[0].isPlayable}
                                 close={this.handleDismissModal}
                                 build={() => this.validateTurn("building")}
                                 buildWonder={() => this.validateTurn("wonderStep")}
                                 sell={() => this.validateTurn("discarding")}
                                 validated={this.state.validated}/>
                    : null
                }
                {this.state.trading ?
                    <TradingScreen close={() => this.closeTrading()}/>
                    : null
                }
                <div id="container" style={divStyle}>
                    <div id="labelsDiv">
                        <Label className="labels transparent">Âge {this.state.age}</Label>
                        <Label className="labels transparent">Tour {this.state.turn} </Label>
                    </div>
                    <Label className="labels label1 transparent">Choisissez une carte puis une action</Label>
                    <div id="handDiv">
                        {hand}
                    </div>
                </div>
            </div>
        );
    }
}

export default HandView;