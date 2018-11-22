import React, {Component} from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import "./Join.css";

class Join extends Component{

    constructor(){
        super();
        this.state = {
            showModal: false,
            pseudo: "",
            emptyPseudo: false,
            data: {
                ip: "",
                position: 8
            }
        };
        this.intToColor = this.intToColor.bind(this);
    }

    componentDidMount(){
        let ipAdress = this.props.data.ipAdress;
        let ip = ipAdress.split(";")[0];
        let position = parseInt(ipAdress.split(";")[1]);
        let data = {
            position: position,
            ip: ip
        };
        this.setState({
            data: data
        });
    }

    handleDismissEmptyPseudo() {
        this.setState({ emptyPseudo: false });
    }


    handleChange(e){
        this.setState({pseudo: e.target.value});
    }

    intToColor(){
        switch (this.state.data.position) {
            case 1:
                return "dodgerblue";
            case 2:
                return "forestgreen";
            case 3:
                return "indianred";
            case 4:
                return "orange";
            default:
                return "white"
        }
    }

    handleValidate(){
        if(this.state.pseudo !== ""){
            var io = require('socket.io-client');
            const socket = io.connect(this.state.data.ip, { transports: ['websocket'], rejectUnauthorized: false });
            socket.emit('newPlayer',{name: this.state.pseudo, position: this.state.data.position});
        }
        else {
            this.setState({
                emptyPseudo: true
            });
        }
    }

    render(){
        var divStyle = {
            background: this.intToColor()
        };
        return (
            <div>
                {
                    this.state.emptyPseudo ?
                     <Modal.Dialog>
                        <Modal.Body>Veuillez indiquer votre pseudo s'il vous plait</Modal.Body>
                         <Modal.Footer>
                             <Button onClick={this.handleDismissEmptyPseudo.bind(this)}>Ok</Button>
                         </Modal.Footer>
                     </Modal.Dialog>
                        : null
                }
                    <div id="inputPseudo" style={divStyle}>
                        <FormControl
                            id="formControlPseudo"
                            type="text"
                            placeholder="Entrez votre pseudo"
                            value={this.state.pseudo}
                            onChange={this.handleChange.bind(this)}
                        />
                        <Button onClick={this.handleValidate.bind(this)} id="validateButton">Valider</Button>
                    </div>
            </div>
        );
    }
}

export default Join;