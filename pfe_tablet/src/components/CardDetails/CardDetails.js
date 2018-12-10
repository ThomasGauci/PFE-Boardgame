import React, {Component} from "react";

import './CardDetails.css'
import {Check, X, Info} from "react-feather";
import {Button, Image} from "react-bootstrap";

class CardDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tree: false
        };
        this.showTree = this.showTree.bind(this);
    }

    showTree(){
        this.setState({
            tree: true
        })
    }

    handleDismiss(){
        this.setState({
            tree: false
        })
    }

    render(){
        return (
            <div id="mainDiv">
                {this.state.tree ? <div className="treeInfos"><div onClick={this.handleDismiss.bind(this)} className="cardInfosContent">
                    <X className="cardInfosClose1" color={"white"} size={40} onClick={this.handleDismiss.bind(this)}/>
                    <div className="treeDiv"><Image src={require("../../assets/trees/" + this.props.card.id + "Tree.png")}/></div>
                </div></div>: null}
                <div className="cardInfos">

                    <div className="cardInfosContent">
                        <div className="cardInfosBox">
                            <X className="cardInfosClose" color={"white"} size={40} onClick={this.props.close}/>
                            {console.log("hoy",this.props.card)}
                            {this.props.card.offer ? <Info className="cardInfosTree" color={"white"} size={35} onClick={this.showTree}/>:null}
                            <img
                                className="cardInfosCard"
                                src={require(`../../assets/cards/${this.props.card.id}.jpg`)}
                                style={this.props.validated ? {
                                    filter: "grayscale(100%)",
                                    "WebkitFilter": "grayscale(100%)",
                                    "MozFilter": "grayscale(100%)",
                                } : null}/>
                            {this.props.validated ?
                                <Check size={200} color="green" className="cardInfosCheck"/>
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
            </div>

        );
    }
}

export default CardDetails;