import React, {Component} from "react";
import "./handView.css";
import * as utils from "../../utils"
import {Label, Image, Modal, Button} from 'react-bootstrap';

class HandView extends Component{

    constructor(props){
        super(props);
        this.state = {
            cards: [],
            currentCard: "R101",
            modal: false,
            turn: 0,
            age: 0
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
        let dataToSend = {
            cardId: this.state.currentCard,
            action: action,
            pseudo: this.props.data.pseudo
        };
        this.props.data.socket.emit('turnValidated', dataToSend);
        let newData = this.props.data;
        newData["label"] = "En attente d'un nouveau tour";
        this.props.changeData(newData);
        this.props.changeComponent("WaitScreen");
    }

    showModal(cardId){
        this.setState({
            currentCard: cardId,
            modal: true
        })
    }

    handleDismissModal(){
        this.setState({
            currentCard: "",
            modal: false
        })
    }

    render(){
        var divStyle = {
            background: utils.intToColor(this.props.data.position)
        };
        const hand = this.state.cards.map((card, index) => <Image key={index} rounded src={require("../../assets/cards/" + card + ".jpg")} id={card} className="card" onClick={() => this.showModal(card)}/>)
        return (
            <div>
                {this.state.modal ?
                    <Modal show={this.state.modal} onHide={this.handleDismissModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Veuillez choisir une action</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer id="modal-footer1">
                            <Image rounded id="modalCard" src={require("../../assets/cards/" + this.state.currentCard + ".jpg")}/>
                            <div id="buttonsDiv">
                                <Button onClick={() => this.validateTurn("building")}>Monter le batiment</Button>
                                <Button onClick={() => this.validateTurn("wonderStep")}>Monter une étape de merveille</Button>
                                <Button onClick={() => this.validateTurn("discarding")}>Défausser la carte</Button>
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