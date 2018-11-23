import React, {Component} from "react";
import "./waitScreen.css";
import * as utils from "../../utils"
import * as Icon from 'react-feather';
import {Label} from 'react-bootstrap';

class WaitScreen extends Component{

    render(){
        var divStyle = {
            background: utils.intToColor(this.props.data.position)
        };
        return (
            <div id="container" style={divStyle}>
                <Icon.Clock id="clockIcon" size={500}/>
                <Label id="waitLabel" style={divStyle}>{this.props.data.label}</Label>
            </div>
        );
    }
}

export default WaitScreen;