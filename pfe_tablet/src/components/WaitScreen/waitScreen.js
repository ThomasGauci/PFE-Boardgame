import React, {Component} from "react";
import "./waitScreen.css";
import * as utils from "../../utils";
import {Label, Image} from 'react-bootstrap';

class WaitScreen extends Component{

    render(){
        var divStyle = {
            background: utils.intToColor(this.props.data.position)
        };
        return (
            <div id="container1" style={divStyle}>
                <div id="subContainer">
                    <Label className="waitLabel" id="waitLabel1">{this.props.data.label}</Label>
                    <Label className="waitLabel">Affichage en cours sur la table</Label>
                    <Image className="tableImg" src={require("../../assets/table.svg")}/>
                </div>
            </div>
        );
    }
}

export default WaitScreen;