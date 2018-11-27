import React, {Component} from "react";
import "./handView.css";
import * as utils from "../../utils"
import {Label, Image, Modal, Button} from 'react-bootstrap';
import * as Icon from 'react-feather';

class HandView extends Component{

    constructor(props){
        super(props);
        this.state = {
            cards: ["R101", "A101", "E101", "S101", "P101", "R103", "S102"],
            currentCard: "R101",
            modal: false,
            turn: 0,
            age: 0,
            modalText: "Veuillez choisir une action",
            validated: false,
            buttons: {
                building: false,
                wonderStep: false,
                discarding: false
            }
        };
        this.handleDismissModal = this.handleDismissModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.validateTurn = this.validateTurn.bind(this);
    }

    componentDidMount(){
        this.setState({
            cards: this.props.data.cards,
            turn: this.props.data.turn,
            age: this.props.data.age
        })
    }

    validateTurn(action) {
        let buttons = this.state.buttons;
        for(let buttonId in buttons) {
            if(buttonId === action){
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
            pseudo: this.props.data.pseudo
        };
        this.props.data.socket.emit('turnValidated', dataToSend);
    }

    showModal(cardId){
        this.setState({
            currentCard: cardId,
            modal: true
        })
    }

    handleDismissModal(){
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
            modalText: "Veuillez choisir une action"
        })
    }

    render(){
        var divStyle = {
            background: utils.intToColor(this.props.data.position)
        };
        let imgStyle = this.state.validated ? {
            filter: "grayscale(100%)",
            "WebkitFilter": "grayscale(100%)",
            "MozFilter" : "grayscale(100%)",
        } : null;
        let buildingStyle = {
          background: this.state.buttons["building"] ? "green" : null
        };
        let wonderStepStyle = {
            background: this.state.buttons["wonderStep"] ? "green" : null
        };
        let discardingStyle = {
            background: this.state.buttons["discarding"] ? "green" : null
        };
        const hand = this.state.cards.map((card, index) => <Image key={index} rounded src={require("../../assets/cards/" + card + ".jpg")} id={card} className="card" onClick={() => this.showModal(card)}/>)
        return (
            <div>
                {this.state.modal ?
                    <Modal show={this.state.modal} onHide={this.handleDismissModal}>
                        <Modal.Header className="modalStyle" closeButton>
                            <Modal.Title className="modalStyle modalTitle text-center">{this.state.modalText}</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer className="modalStyle" id="modal-footer1">
                            <div className="modalImgDiv">
                                <Image style={imgStyle} rounded id="modalCard" src={require("../../assets/cards/" + this.state.currentCard + ".jpg")} />
                                {this.state.validated ? <Icon.Check size={200} id="checkIcon" color="green"/> : null}
                            </div>
                            <div id="buttonsDiv">
                                <Button style={buildingStyle} id="building" disabled={this.state.buttons["building"]} bsStyle="primary" onClick={() => this.validateTurn("building")}>Construire le batiment</Button>
                                <Button style={wonderStepStyle} id="wonderStep" disabled={this.state.buttons["wonderStep"]} bsStyle="primary" onClick={() => this.validateTurn("wonderStep")}>Améliorer sa merveille</Button>
                                <Button style={discardingStyle} id="discarding" disabled={this.state.buttons["discarding"]} bsStyle="primary" onClick={() => this.validateTurn("discarding")}>Vendre la carte pour <Image className="orImg" src={require("../../assets/or.png")}/> </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                :null}
                <div id="container" style={divStyle}>
                    <div id="labelsDiv">
                        <Label className="labels transparent">Tour {this.state.turn} </Label>
                        <Label className="labels transparent">Âge {this.state.age}</Label>
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