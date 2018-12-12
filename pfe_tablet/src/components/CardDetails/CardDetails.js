import React, {Component} from "react";
import * as descriptions from "../../assets/labels/CardDescriptions";
import './CardDetails.css'
import {Check, X, Info, HelpCircle} from "react-feather";
import {Button, Image, Label} from "react-bootstrap";
import Modal from "react-bootstrap/es/Modal";

class CardDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tree: false,
            infos: false
        };
        this.showTree = this.showTree.bind(this);
        this.cardInfos = this.cardInfos.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    showTree(){
        this.setState({
            tree: true,
        })
    }

    handleDismiss(){
        this.setState({
            tree: false,
            infos: false
        })
    }

    cardInfos(id){
        this.setState({
            infos: true
        })
    }

    render(){
        let cardInfosStyle = {
            zIndex: this.props.tangible ? 99991 : 99980
        };
        let buttonsStyle = {
            zIndex: this.props.tangible ? 99992 : 99981
        };
        let modalsStyle = {
            zIndex: this.props.tangible ? 99993 : 99982
        };
        let modalbuttonStyle = {
            zIndex: this.props.tangible ? 99994 : 99983
        };
        return (
            <div id="mainDiv">
                {this.state.infos ? <Modal.Dialog style={modalsStyle} bsClass="infosDialog">
                    <Modal.Body className="backWhite">
                        <HelpCircle className="helpIcon" color="green" size={100}/>
                        <div className="infosLabel">{descriptions.getDescriptions(this.props.card.id[0])}</div>
                    </Modal.Body>
                    <Modal.Footer className="backWhite">
                        <Button bsStyle="primary" onClick={()=>this.handleDismiss()}>OK</Button>
                    </Modal.Footer>
                </Modal.Dialog>:null}
                {this.state.tree ? <div style={modalsStyle} className="treeInfos"><div onClick={()=>this.handleDismiss()} className="cardInfosContent">
                    <X className="cardInfosClose1" style={modalbuttonStyle} color={"white"} size={40} onClick={()=>this.handleDismiss()}/>
                    <div className="treeDiv"><Image src={require("../../assets/trees/" + this.props.card.id + "Tree.png")}/></div>
                </div></div>: null}
                <div className="cardInfos" style={cardInfosStyle}>

                    <div className="cardInfosContent">
                        <div className="cardInfosBox">
                            <X className="cardInfosClose" style={buttonsStyle} color="white" size={40} onClick={this.props.close}/>
                            <HelpCircle className="cardInfosHelp" style={buttonsStyle} color="white" size={35} onClick={()=>this.cardInfos()}/>
                            {this.props.card.offer ? <Info className="cardInfosTree" style={buttonsStyle} color={"white"} size={35} onClick={()=>this.showTree()}/>:null}
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