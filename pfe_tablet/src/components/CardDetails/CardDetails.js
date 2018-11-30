import React, {Component} from "react";

import './CardDetails.css'
import {ArrowLeftCircle, Check, Info, X} from "react-feather";
import {Button, Image} from "react-bootstrap";

class CardDetails extends Component {

    render(){
        return (
            <div className="cardInfos">
                <div className="cardInfosContent">
                    <div className="cardInfosBox">
                        <X className="cardInfosClose" color={"white"} size={40} onClick={this.props.close}/>
                        {/*
                        //Todo: Remettre ça après la démo sinon ils vont cliquer et demander pourquoi ça marche pas
                        <Info className="cardInfosInfo" color={"white"} size={40} onClick={() => console.log("Display combo tree")}/>
                        */}
                        <img
                            className="cardInfosCard"
                            src={require(`../../assets/cards/${this.props.card.id}.jpg`)}
                            style={this.props.validated ? {
                                filter: "grayscale(100%)",
                                "WebkitFilter": "grayscale(100%)",
                                "MozFilter": "grayscale(100%)",
                            } : null}/>
                        {this.props.validated ?
                            <Check size={200} color="white" className="cardInfosCheck"/>
                            : null
                        }
                        { this.props.isHandCard ?
                            <div className="cardInfosButtons">
                                <Button disabled={this.props.isPlayable ? null : true} className="cardInfosButton shadow" onClick={this.props.build}>
                                    <Image src={require("../../assets/hammer.svg")} width={35}/>
                                </Button>
                                <Button className="cardInfosButton shadow" onClick={this.props.buildWonder}>
                                    <Image src={require("../../assets/wonder.png")}/>
                                </Button>
                                <Button className="cardInfosButton shadow" onClick={this.props.sell}>
                                    <Image src={require("../../assets/3or.png")}/>
                                </Button>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CardDetails;