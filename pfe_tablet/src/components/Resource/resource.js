import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import {Check} from "react-feather";
import "./resource.css"
import Modal from "react-bootstrap/es/Modal";

class Resource extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resource: {},
            isChecked: false,
            choice1: "",
            choice2: "",
            choiceCost: 0,
            chooseResource: false,
            errorModal: false,
            errorModalText: "",
            choice: ""
        };
        this.buyResource = this.buyResource.bind(this);
        this.buyOrResource = this.buyOrResource.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.cancelChoice = this.cancelChoice.bind(this);
    }

    handleDismiss(){
        this.setState({
            errorModal: false,
            errorModalText: ""
        });
    }

    componentWillMount() {
        this.setState({
            resource: this.props.resource,
            isChecked: this.props.isChecked
        })
    }


    buyOrResource(cost, type){
        this.setState({
            chooseResource: false
        });
        if(!this.props.missingResources.has(type)) {
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas besoin de cette ressource"
            })
        }
        else if(this.props.money < cost){
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas assez d'argent pour acheter cette ressource"
            })
        }
        else {
            let quantityMissing = this.props.missingResources.get(type);
            quantityMissing === 1 ? this.props.missingResources.delete(type): this.props.missingResources.set(type, quantityMissing - 1);
            this.props.changeState({
                money: this.props.money - cost
            });
            this.setState({
                isChecked: true,
                choice: type
            });
            if(Array.from(this.props.missingResources.keys()).length === 0){
                this.props.changeState({titleText: "Vous avez récupéré toutes les ressources dont vous aviez besoin"});
            }
        }
    }

    buyResource(){
        this.setState({
            chooseResource: false
        });
        if(this.state.resource.type.includes("/")){
            this.setState({
                choice1: this.state.resource.type.split("/")[0],
                choice2: this.state.resource.type.split("/")[1],
                chooseResource: true,
                choiceCost: this.state.resource.cost
            });
        }

        else if(!this.props.missingResources.has(this.state.resource.type)) {
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas besoin de cette ressource"
            })
        }
        else if(this.props.money < this.state.resource.cost){
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas assez d'argent pour acheter cette ressource"
            })
        }
        else {
            let quantityMissing = this.props.missingResources.get(this.state.resource.type);
            quantityMissing === 1 ? this.props.missingResources.delete(this.state.resource.type): this.props.missingResources.set(this.state.resource.type, quantityMissing - 1);
            this.props.changeState({
                money: this.props.money - this.state.resource.cost
            });
            this.setState({
               isChecked: true,
               choice: this.state.resource.type
            });
            if(Array.from(this.props.missingResources.keys()).length === 0){
                this.props.changeState({titleText: "Vous avez récupéré toutes les ressources dont vous aviez besoin"});
            }
        }
    }

    cancelChoice(){
        if(this.props.cancellable){
            let choice = this.state.choice;
            this.props.missingResources.has(choice) ? this.props.missingResources.set(choice, this.props.missingResources.get(choice) + 1) : this.props.missingResources.set(choice, 1);
            this.props.changeState({
                money: this.props.money + this.state.resource.cost,
                titleText: "Il vous manque des ressources pour fabriquer cette carte. Vous pouvez en acheter à vos voisins"
            });
            this.setState({
                isChecked: false,
                choice: ""
            })
        }

    }

    render() {
        return (
            <div>
                {
                    this.state.errorModal ?
                        <Modal.Dialog>
                            <Modal.Body bsClass="modalStyle1">{this.state.errorModalText}</Modal.Body>
                            <Modal.Footer bsClass="modalStyle1">
                                <Button onClick={this.handleDismiss.bind(this)}>OK</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                        : null
                }
                {this.state.chooseResource ? <Modal.Dialog>
                    <Modal.Header bsClass="modalStyle1">
                        <Modal.Title>Choisissez la resource</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer bsClass="modalStyle1">
                        <Button className="resButton" onClick={()=>this.buyOrResource(this.state.choiceCost, this.state.choice1)}><Image src={require("../../assets/" + this.state.choice1 + ".png")} bsStyle="primary"/></Button>
                        <Button className="resButton" onClick={()=>this.buyOrResource(this.state.choiceCost, this.state.choice2)}> <Image src={require("../../assets/" + this.state.choice2 + ".png")} bsStyle="primary"/></Button>
                    </Modal.Footer>
                </Modal.Dialog>:null}
                <div className='overlayDiv'>
                    {this.state.isChecked? <Check id="check" size="35" color="green" onClick={() => this.cancelChoice()}/> : null}
                    <Image rounded
                           src={require("../../assets/" + getCardPath(this.state.resource.type) + ".png")}
                           className="resource"
                           style={this.state.isChecked ? {filter: "grayscale(100%)",
                               "WebkitFilter": "grayscale(100%)",
                               "MozFilter": "grayscale(100%)"}: null}
                           onClick={() => this.buyResource()} />
                </div>
            </div>
        )
    };

}
function getCardPath(cardType) {
    if(!cardType.includes("/")){
        return cardType
    }
    else {
        let cardPath = cardType.split("/")[0] + "." + cardType.split("/")[1];
        try{
            require("../../assets/"+cardPath+".png");
            return cardPath;
        }
        catch (e) {
            return cardType.split("/")[1] + "." + cardType.split("/")[0];
        }
    }
}
export default Resource;