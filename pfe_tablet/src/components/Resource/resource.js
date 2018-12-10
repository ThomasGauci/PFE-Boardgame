import React, {Component} from "react";
import {Button, Image} from "react-bootstrap";
import {Check} from "react-feather";
import "./resource.css"
import Modal from "react-bootstrap/es/Modal";

class Resource extends Component {

    constructor(props) {
        super(props);
        this.state = {
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


    buyOrResource(cost, type){
        console.log(cost);
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
            if(this.props.seller !== 0){
                let purchases = this.props.purchases;
                purchases.push({seller: this.props.seller, resource: type, price: cost});
            }
            this.props.changeState({
                money: cost ? this.props.money - cost : this.props.money
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
        if(this.props.money < this.props.resource.cost){
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas assez d'argent pour acheter cette ressource"
            })
        }
        else if(this.props.resource.type.includes("/") && !this.props.missingResources.has(this.props.resource.type.split("/")[0]) && !this.props.missingResources.has(this.props.resource.type.split("/")[1])){
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas besoin de cette ressource"
            })
        }
        else if(this.props.resource.type.includes("/")){
            this.setState({
                choice1: this.props.resource.type.split("/")[0],
                choice2: this.props.resource.type.split("/")[1],
                chooseResource: true,
                choiceCost: this.props.resource.cost
            });
        }

        else if(!this.props.missingResources.has(this.props.resource.type)) {
            this.setState({
                errorModal: true,
                errorModalText: "Vous n'avez pas besoin de cette ressource"
            })
        }
        else {
            let quantityMissing = this.props.missingResources.get(this.props.resource.type);
            quantityMissing === 1 ? this.props.missingResources.delete(this.props.resource.type): this.props.missingResources.set(this.props.resource.type, quantityMissing - 1);
            if(this.props.seller !== 0){
                let purchases = this.props.purchases;
                purchases.push({seller: this.props.seller, resource: this.props.resource.type, price: this.props.resource.cost});
            }
            this.props.changeState({
                money: this.props.resource.cost ? this.props.money - this.props.resource.cost : this.props.money
            });
            this.setState({
               isChecked: true,
               choice: this.props.resource.type
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
            let index = 0;
            for(let purchase of this.props.purchases){
                if(purchase.seller === this.props.seller && purchase.resource === choice){
                    break
                }
                index++;
            }
            this.props.purchases.splice(index, 1);
            this.props.changeState({
                money: this.props.money + this.props.resource.cost,
                titleText: "Il vous manque des ressources pour construire ce bâtiment. Vous pouvez en acheter à vos voisins"
            });
            console.log(this.props.purchases);
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
                           src={require("../../assets/" + getCardPath(this.props.resource.type) + ".png")}
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