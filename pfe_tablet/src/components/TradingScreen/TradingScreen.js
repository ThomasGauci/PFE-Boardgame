import React, {Component} from "react";
import {Button, Image, Label, Modal} from "react-bootstrap";
import './TradingScreen.css'
import Resource from "../Resource/resource"

class TradingScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            money: 0,
            missingResources: new Map(),
            titleText: "Il vous manque des ressources pour construire ce bâtiment. Vous pouvez en acheter à vos voisins",
            missingResourceModal: false
        };
        this.displayResource = this.displayResource.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    componentWillMount(){
        this.setState({
            money: this.props.money,
            missingResources: this.arrayToMap(this.props.currentCard.missingResources)
        })
    }

    changeState(newState){
        this.setState(newState);
    }

    submitPurchases(){
        if(Array.from(this.state.missingResources.keys()).length > 0){
            this.setState({
                missingResourceModal: true,
            });
        }
        else {
            this.props.close();
            this.props.submitPurchases();
        }
    }

    arrayToMap(resourceArray){
        let result = new Map();
        for(let resource of resourceArray){
            result.set(resource.type, resource.quantity);
        }
        return result
    }

    displayResource(resource, isChecked, seller) {
        console.log(resource);
        let result = [];
        for (let i = 0; i < resource.quantity; i++) {
            result.push(<Resource changeState={this.changeState.bind(this)} key={i} resource={resource}
                                  isChecked={isChecked} money={this.state.money} missingResources={this.state.missingResources}
                                  cancellable={!isChecked} purchases={this.props.purchases} seller={seller}/>);
        }
        return result;
    }

    handleDismiss(){
        this.setState({
            missingResourceModal: false,
        });
    }

    render(){
        return (
            <div className="tradingScreen">
                {
                    this.state.missingResourceModal ?
                        <Modal.Dialog>
                            <Modal.Body bsClass="modalStyle1">Il vous manque des ressources pour construire cette carte</Modal.Body>
                            <Modal.Footer bsClass="modalStyle1">
                                <Button onClick={this.handleDismiss.bind(this)}>OK</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                        : null
                }
                <div className="tradingScreenContent">
                    <div className="tradingScreenBox shadow">
                        <div className="header">
                            <div className="tradingScreenTitle"><Label className="titleLabel">{this.state.titleText}</Label></div>
                            <div id="money"><Label className="titleLabel">Il vous reste {this.state.money}</Label> <Image style={{height: "3vh"}} src={require("../../assets/or.png")}/></div>
                        </div>
                        <div className="tradingScreenMissingResources">
                            Ressources manquantes:
                            <div className="missingResourcesList">
                                {
                                    Array.from(this.state.missingResources.keys()).map((missingResourceName,index) =>
                                        <div className="resourceDiv" key={index}>
                                            {this.displayResource({type: missingResourceName, quantity: this.state.missingResources.get(missingResourceName)}, false, 0)}
                                        </div>
                                )}
                            </div>
                        </div>
                        <div className="tradingScreenResources">
                            <div className="tradingScreenResourcesCol">
                                Mes ressources :
                                <div className="resourcesDiv">
                                    {this.props.currentCard.usefullResources.map((usefullResource,index) =>
                                        <div className="resourceDiv" key={index}>
                                            {this.displayResource(usefullResource, true, 0)}
                                        </div>
                                    )}
                                    {this.props.currentCard.stayingResources.map((stayingResource,index) =>
                                        <div className="resourceDiv" key={index}>
                                            {this.displayResource(stayingResource, false, 0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="tradingScreenResourcesCol">
                                Ressources de {this.props.currentCard.availableResources[0].player.name} :
                                <div className="resourcesDiv">
                                    {this.props.currentCard.availableResources[0].resources.map((availableResource,index) =>
                                        <div className="resourceDiv" key={index}>
                                            {this.displayResource(availableResource, false, this.props.currentCard.availableResources[0].player.position)}
                                            <div className="goldCoin">
                                                <Image style={{height: "3vh"}} src={require("../../assets/or.png")}/>
                                                <div className="price">{availableResource.cost}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="tradingScreenResourcesCol">
                                Ressources de {this.props.currentCard.availableResources[1].player.name} :
                                <div className="resourcesDiv">
                                    {
                                        this.props.currentCard.availableResources[1].resources.map((availableResource,index) =>
                                            <div className="resourceDiv">
                                                <div className="resources" key={index}>
                                                {this.displayResource(availableResource, false, this.props.currentCard.availableResources[1].player.position)}
                                                </div>
                                                <div className="goldCoin">
                                                    <Image style={{height: "3vh"}} src={require("../../assets/or.png")}/>
                                                    <div className="price">{availableResource.cost}</div>
                                                </div>
                                            </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="tradingScreenButtons">
                            <Button className="tradingScreenButton" bsStyle="danger" onClick={this.props.close}>Annuler</Button>
                            <Button className="tradingScreenButton" bsStyle="success" onClick={()=>this.submitPurchases()}>Valider</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradingScreen;