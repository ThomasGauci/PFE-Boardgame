import React, {Component} from "react";
import { Button, Modal, Image, FormControl } from 'react-bootstrap';
import icon from "../../assets/icon.jpg";
import "./home.css";

class Home extends Component{

    constructor(){
        super();
        this.state = {
            showModal: false,
            pseudo: "",
            emptyPseudo: false
        }
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
        this.setState({showModal: false});
    }

    handleDismiss() {
        this.setState({ showModal: false });
    }

    handleDismissEmptyPseudo() {
        this.setState({ emptyPseudo: false });
    }


    handleChange(e){
        this.setState({pseudo: e.target.value});
    }

    handleValidate(){
        if(this.state.pseudo !== ""){
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
                {this.state.showModal ?
                    <Modal.Dialog>
                        <Modal.Body>Pour plus de confort nous vous conseillons de passer en plein écran</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleFullScreen.bind(this)}>Accepter</Button>
                            <Button bsStyle="primary" onClick={this.handleDismiss.bind(this)}>Refuser</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    : null
                }
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

export default Home;