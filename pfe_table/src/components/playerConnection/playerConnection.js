import React, { Component } from 'react';
import {Check} from "react-feather";
import  QRCode from 'qrcode.react';

import './playerConection.css'

class PlayerConnection extends Component {

    render() {
        if(this.props.player)
            return (
                <div className='playerReady'>
                    <span><Check size={200} color={'white'}/></span>
                    <h1>{this.props.player.name} is ready</h1>
                </div>
            );
        else return (
            <div className='playerReady'>
                <h1 className='connectionInstruction'>Scannez ce QRCode pour rejoindre la partie</h1>
                <span>
                    <QRCode className='qrCode'
                        value={`${this.props.serverIp};${this.props.position}`}
                        size={250}
                        bgColor='#fff'
                        fgColor='#000' />
                </span>
            </div>
        );
    }
}

export default PlayerConnection;
