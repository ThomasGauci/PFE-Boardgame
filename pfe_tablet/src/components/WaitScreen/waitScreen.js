import React, {Component} from "react";
import "./waitScreen.css";
import * as utils from "../../utils"
import * as Icon from 'react-feather';
import {Label} from 'react-bootstrap';

class WaitScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            label: ""
        }

    }

    componentDidMount(){
        this.setState ({
           label: this.props.data.label
        });
        var io = require('socket.io-client');
        const socket = io.connect(this.props.data.ip, { transports: ['websocket'], rejectUnauthorized: false });
        socket.on('newTurn',(data) => {
            let newData = {
                position: this.props.data.position,
                pseudo: this.props.data.pseudo,
                cards: data.cards,
                trun: data.turn,
                age: data.age
            };
            this.props.changeData(newData);
            this.props.changeComponent("HandView");
        });
        socket.on('gameStart',() => {
            this.setState({
               label: "Partie débutée, préparation du prochain tour"
            });
        });
    }


    render(){
        var divStyle = {
            background: "blue"//utils.intToColor(this.props.data.position)
        };
        return (
            <div id="container" style={divStyle}>
                <Icon.Clock id="clockIcon" size={500}/>
                <Label id="waitLabel" style={divStyle}>{this.state.label}</Label>
            </div>
        );
    }
}

export default WaitScreen;