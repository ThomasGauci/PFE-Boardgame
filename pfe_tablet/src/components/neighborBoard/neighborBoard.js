import React, {Component} from "react";
import {Button, Image} from 'react-bootstrap';
import "./neighborBoard.css";
import Modal from "react-bootstrap/es/Modal";
import CardDetails from "../CardDetails/CardDetails";

class NeighborBoard extends Component{

    constructor(props){
        super(props);
        this.state = {
            cardDetails: null
        };
    }

    renderCards(type){
        let res = [];
        if(this.props.data && this.props.data.playedCards){
            for(let card of this.props.data.playedCards){
                if(card.type === type){
                    res.push(card);
                }
            }
        }
        return res;
    }


    render(){
        console.log(this.props);
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.close}
                    dialogClassName="custom-modal">
                    <Modal.Body bsClass="my-modal-body">
                        <div className="board">
                            {
                                (this.props.data && this.props.data.city ) ? <Image src={require("../../assets/boards/" + this.props.data.city + "A.jpg")} responsive/> : null
                            }

                            <div id="cards">
                                <div className="cardsDiv" >
                                    {this.renderCards("resource").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.renderCards("product").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.renderCards("military").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/A"+ card.effect.value + ".jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.renderCards("building").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.renderCards("science").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.renderCards("economic").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/E.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.renderCards("guild").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/G.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>
                            </div>

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {
                    this.state.cardDetails ?
                        <CardDetails tangible={true}  card={this.state.cardDetails} close={() => this.setState({cardDetails: null})}/>
                        : null
                }
            </div>
        );
    }
}

export default NeighborBoard;