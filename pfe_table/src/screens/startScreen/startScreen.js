import React, { Component } from 'react';
import  QRCode from 'qrcode.react';
import {Button, Col, Row, Modal} from "react-bootstrap";
import {Maximize, Settings} from "react-feather";

import {ServerIp} from "../../ServerIp";
import ServerConfigModal from "../../modals/ServerConfigModal";
import './startScreen.css'

class StartScreen extends Component {

    static contextType = ServerIp;

    state={
        showConfigModal: false,
        showFullScreenButton: true
    }
    toggleConfigModal = this.toggleConfigModal.bind(this);
    toggleFullScreen = this.toggleFullScreen.bind(this);
    toggleFullScreenButton = this.toggleFullScreenButton.bind(this);

    constructor(){
        super();
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('mozfullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('fullscreenchange', this.toggleFullScreenButton, false);
            document.addEventListener('MSFullscreenChange', this.toggleFullScreenButton, false);
        }
    }

    render() {
        return (
            <div className='startScreen'>
                {this.state.showConfigModal ?
                    <ServerConfigModal serverIp={this.context}
                                       validate={newValue => {
                                           this.toggleConfigModal();
                                           this.props.changeServerIp(newValue);
                                       }}
                                       close={this.toggleConfigModal}/>
                    : null
                }
                <div className='territoryBackground'>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory1'></Col>
                        <Col md={6} className='territory territory2'></Col>
                    </Row>
                    <Row className='territoryRow'>
                        <Col md={6} className='territory territory3'></Col>
                        <Col md={6} className='territory territory4'></Col>
                    </Row>
                </div>
                <div className='startScreenContent'>
                    <Button className='configButton' onClick={this.toggleConfigModal}>
                        <Settings/>
                    </Button>
                    {this.state.showFullScreenButton ?
                        <Button className='fullScreenButton' onClick={this.toggleFullScreen}>
                            <Maximize/>
                        </Button>
                        : null
                    }
                    <div>
                        <Modal.Dialog className='qrCodeModal'>
                            <span className='qrCodeInstruction upsideDown'>Scannez le QRCode pour vous connecter à la partie</span>
                            <span>
                                <QRCode className='qrCode'
                                        value={this.context}
                                        size={400}
                                        bgColor='#0000'
                                        fgColor='#000' />
                            </span>
                            <span className='qrCodeInstruction'>Scannez le QRCode pour vous connecter à la partie</span>
                        </Modal.Dialog>
                    </div>
                </div>
            </div>
        );
    }

    toggleConfigModal(){
        this.setState({showConfigModal: !this.state.showConfigModal});
    }

    toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
    }

    toggleFullScreenButton(){
        this.setState({showFullScreenButton: !this.state.showFullScreenButton});
    }
}

export default StartScreen;
