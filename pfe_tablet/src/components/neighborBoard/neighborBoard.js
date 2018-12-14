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

    rendrCards(type){
        let res = [];
        if(this.props.data){
            for(let card of this.props.data.playedCards){
                if(card.type === type){
                    res.push(card);
                }
            }
        }
        return res;
    }


    render(){
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.close}
                    dialogClassName="custom-modal">
                    <Modal.Body bsClass="my-modal-body">
                        <div className="board">
                            {
                                this.props.data ? <Image src={require("../../assets/boards/" + this.props.data.city + "A.jpg")} responsive/> : null
                            }

                            <div id="cards">
                                <div className="cardsDiv" >
                                    {this.rendrCards("resource").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.rendrCards("product").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.rendrCards("military").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/A"+ card.effect.value + ".jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.rendrCards("building").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.rendrCards("science").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/"+ card.id + "_min.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.rendrCards("economic").map((card,index) =>
                                        <Image key={index} className="res" src={require("../../assets/minCards/E.jpg")} onClick={() => this.setState({cardDetails: card, tangible: true})}/>
                                    )}
                                </div>

                                <div className="cardsDiv">
                                    {this.rendrCards("guild").map((card,index) =>
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