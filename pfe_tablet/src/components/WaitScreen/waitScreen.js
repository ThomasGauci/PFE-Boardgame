import React, {Component} from "react";
import "./waitScreen.css";
import * as utils from "../../utils"
import * as Icon from 'react-feather';
import {Label, Image} from 'react-bootstrap';

class WaitScreen extends Component{

    render(){
        var divStyle = {
            background: utils.intToColor(1)//utils.intToColor(this.props.data.position)
        };
        return (
            <div id="container" style={divStyle}>
                <div id="subContainer">
                    <Label className="waitLabel" id="waitLabel1" style={divStyle}>En attente d'un nouveau tour{/*this.props.data.label*/}</Label>
                    <Label className="waitLabel" style={divStyle}>Affichage en cours sur la table</Label>
                    <Image className="tableImg" src={require("../../assets/table1.png")}/>
                </div>
            </div>
        );
    }
}

export default WaitScreen;