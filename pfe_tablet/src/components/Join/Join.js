import React, {Component} from "react";
import { Button, Modal, Image, FormControl } from 'react-bootstrap';
import icon from "../../assets/icon.jpg";
import "./Join.css";

class Join extends Component{

    constructor(){
        super();
        this.state = {
            showModal: false,
            pseudo: "",
            emptyPseudo: false
        }
    }



    handleDismissEmptyPseudo() {
        this.setState({ emptyPseudo: false });
    }


    handleChange(e){
        this.setState({pseudo: e.target.value});
    }

    handleValidate(){
        if(this.state.pseudo !== ""){
            let data = {
                pseudo: this.state.pseudo
            };
            this.props.changeData(data);
            this.props.changeComponent("QRView");
        }
        else {
            this.setState({
                emptyPseudo: true
            });
        }
    }

    render(){
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
                <div id="container">
                   <Image id="imageIcon" responsive rounded src={icon}/>
                   <div id="inputPseudo">
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