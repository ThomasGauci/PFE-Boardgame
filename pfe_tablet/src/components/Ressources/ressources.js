import React, {Component} from "react";
import "./ressources.css";
import * as utils from "../../utils"
import {Label} from 'react-bootstrap';

class Ressources extends Component{

    render(){
        var divStyle = {
            background: utils.intToColor(1),//utils.intToColor(this.props.data.position)
            overflowY: 'auto'
        };
        return (
            <div id="container" style={divStyle}>
                <Label id="waitLabel" style={divStyle}>Achète tes ressources ok</Label>
            </div>
        );
    }
}

export default Ressources;