import React, {Component} from "react";
import { Button, Modal, FormControl } from 'react-bootstrap';
import "./join.css";
import * as utils from "../../utils";
import * as Icon from 'react-feather';

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
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.changeData({});
        this.props.changeComponent("QRView");
    }

    componentDidMount(){
        this.props.startSocket();
        let ipAdress = this.props.data.ipAdress;
        let position = parseInt(ipAdress.split(";")[1]);
        this.setState({
            data: {
                position: position
            }
        });
    }

    handleDismissEmptyPseudo() {
        this.setState({ emptyPseudo: false });
    }


    handleChange(e){
        this.setState({pseudo: e.target.value});
    }

    handleValidate(){
        if(this.state.pseudo !== ""){
            this.props.data.socket.emit('newPlayer',{name: this.state.pseudo, position: this.state.data.position});
            let data = {
                position: this.props.data.position,
                ip: this.props.data.ip,
                pseudo: this.state.pseudo,
                label: "Bienvenue " + this.state.pseudo + ", en attente des autres joueurs",
                socket: this.props.data.socket
            };
            this.props.changeData(data);
            this.props.changeComponent("WaitScreen");
        }
        else {
            this.setState({
                emptyPseudo: true
            });
        }
    }

    render(){
        var divStyle = {
            background: utils.intToColor(this.state.data.position)
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
                        <Icon.ArrowLeftCircle id="iconBack" size={50} onClick={this.goBack}/>
                        <div id="subDiv">
                            <label id="bienvenue">Bienvenue, pour jouer, entrez votre pseudo</label>
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
            </div>
        );
    }
}

export default Join;