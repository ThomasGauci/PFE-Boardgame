import React, {Component} from "react";
import "./handView.css";
import * as utils from "../../utils"
import {Label, Image, Button} from 'react-bootstrap';
import CardDetails from "../CardDetails/CardDetails";
import TradingScreen from "../TradingScreen/TradingScreen";
import {Check, X} from "react-feather";
import NeighborBoard from "../neighborBoard/neighborBoard";
import Modal from "react-bootstrap/es/Modal";

class HandView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wonderStepResources: {
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
            cards: [
                {
                    card: {
                        id: "B103",
                        cost: [{name: "wood", quantity: 2},{name: "stone", quantity: 1}],
                        offer: ["B201"]
                    },
                    isPlayable: true,
                    tree: true,
                    cardResources: {
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
                    }
                }
            ],
            neighbors: [{
                name: 'jean',
                position: 1,
                money: 1,
                city: 5,
                army: 2,
                playedCards: [{
                    id: "A101",
                    name: "Caserne",
                    age: 1,
                    type: "military",
                    effect: {
                        target: "army",
                        value: 1,
                    },
                    cost: [{name: "ore", quantity: 1}]
                },{type:"economic",id: 'E101'},{type:"science",id: 'S101'},{type:"guild",id: 'G302'},{type:"building",id: 'B303'},{type:"product",id: 'P101'},{type:"resource",id: 'R101'}],
                victory: 7,
                wonders: []},
                {
                name: 'kader',
                position: 3,
                money: 5,
                city: 3,
                army: 6,
                playedCards: [{type:"resource",id: 'R107'},{type:"resource",id: 'R108'},{type:"resource",id: 'R201'},{type:"building",id: 'B303'}],
                victory: 2,
                wonders: [] }],
            current : undefined,
            victoryPoints: 0,
            sciencePoints: 0,
            economyPoints: 0,
            wonderPoints: 0,
            warPoints: 0,
            guildPoints: 0,
            civilPoints: 0,
            currentCard: "R101",
            modal: false,
            showBoard : false,
            turn: 0,
            age: 1,
            modalText: "Veuillez choisir une action",
            validated: false,
            trading: false,
            money: 5,
            action: "",
            purchases: [],
            isWonderStepBuildable: true
        };

        this.closeNeighborBoard = this.closeNeighborBoard.bind(this);
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.validateTurn = this.validateTurn.bind(this);
        this.closeTrading = this.closeTrading.bind(this);
        this.submitPurchases = this.submitPurchases.bind(this);
    }

    componentWillMount() {
        this.setState({
            cards: this.props.data.cards,
            wonderStepResources: this.props.data.wonderStepResources,
            isWonderStepBuildable: this.props.data.isWonderStepBuildable,
            turn: this.props.data.turn,
            age: this.props.data.age,
            money: this.props.data.money,
            victoryPoints: this.props.data.points.victory,
            warPoints: this.props.data.points.war,
            sciencePoints: this.props.data.points.science,
            economyPoints: this.props.data.points.economy,
            wonderPoints: this.props.data.points.wonder,
            guildPoints: this.props.data.points.guild,
            civilPoints: this.props.data.points.civil,
            neighbors: this.props.data.neighbors
        });
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

    /**
     * compute what to do from user action (open trading screen, send infos to backend...)
     * @param action (building/wonderStep/discarding)
     */
    validateTurn(action) {
        let cardObject = this.state.currentCard;
        this.setState({action: action});
        if (action === "building" || action === "wonderStep") {
            //the user can build the building with it's own resources
            if ((action === "building" && cardObject.isPlayable && !(cardObject.cardResources.hasOwnProperty("availableResources"))) || (action === "wonderStep" && this.state.isWonderStepBuildable && !(this.state.wonderStepResources.hasOwnProperty("availableResources")))) {
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
            //the user needs neighbors resources
            else if ((action === "building" && cardObject.isPlayable) || (action === "wonderStep" && this.state.isWonderStepBuildable)) {
                this.setState({
                    trading: true,
                    modalText: "Vous n'avez pas assez de ressources mais vous pouvez en acheter"
                });
                // -------------------------------------------------------------------------------
                let dataToSend = {
                    cardId: this.state.currentCard.card.id,
                    action: action,
                    position: this.props.data.position
                };
                this.props.data.socket.emit('startPurchase',dataToSend);
                // -------------------------------------------------------------------------------
            }
            //The user can't build the building
            else {
                this.setState({
                    modalText: "Vous ne pouvez pas construire ce bâtiment"
                })
            }
        }
        //the user is discarding the card
        else {
            let newbuttons = {
                building: false,
                wonderStep: false,
                discarding: false
            };
            newbuttons["discarding"] = true;
            this.setState({
                buttons: newbuttons
            });
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
        this.setState({
            currentCard: "",
            modal: false,
            validated: false,
            modalText: "Veuillez choisir une action",
            trading: false
        })
    }

    closeTrading(){
        this.setState({trading: false, purchases: []});
    }

    showNeighborBoard(neighbor){
        this.setState({
            showBoard: true,
            current : neighbor
        })
    }

    closeNeighborBoard(){
        this.setState({
            showBoard: false
        })
    }

    render() {
        var divStyle = {
            background: utils.intToColor(this.props.data.position)
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
                                 isWonderStepBuildable={this.state.isWonderStepBuildable}
                                 close={this.handleDismissModal}
                                 build={() => this.validateTurn("building")}
                                 buildWonder={() => this.validateTurn("wonderStep")}
                                 sell={() => this.validateTurn("discarding")}
                                 validated={this.state.validated}
                                 tangible={false}
                                 help={this.props.data.help}
                    type="red"/>
                    : null
                }
                {this.state.trading ?
                    <TradingScreen purchases={this.state.purchases} submitPurchases={this.submitPurchases} money={this.state.money} resourcesObject={this.state.action ==="building"?this.state.currentCard.cardResources: this.state.wonderStepResources}  close={this.closeTrading}/>
                    : null
                }

                <NeighborBoard show={this.state.showBoard} close={this.closeNeighborBoard} data={this.state.current}/>

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

                    <div className="labelsDiv1 label2" id="visualisation">
                        <Image className="visImg" src={require("../../assets/left.png")} onClick={() => this.showNeighborBoard(this.state.neighbors[0])}/>
                        <Label className="transparent nopad totalLabel">Visualiser les plateaux de vos voisins</Label>
                        <Image className="visImg" src={require("../../assets/right.png")} onClick={() => this.showNeighborBoard(this.state.neighbors[1])}/>
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