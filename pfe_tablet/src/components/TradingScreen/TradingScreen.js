import React, {Component} from "react";
import {Button, Image, Label} from "react-bootstrap";

import './TradingScreen.css'

class TradingScreen extends Component {

    render(){
        console.log(this.props);
        return (
            <div className="tradingScreen">
                <div className="tradingScreenContent">
                    <div className="tradingScreenBox shadow">
                        <div className="tradingScreenTitle">Il vous manque des ressources pour fabriquer cette carte. Vous pouvez en acheter à vos voisins :</div>
                        <div className="tradingScreenMissingResources">
                            Ressources manquantes:
                            <div className="missingResourcesList">
                                {this.props.currentCard.missingResources.map((missingRessource,index) =>
                                    <div className="resourceDiv" key={index}>
                                        <Label>{missingRessource.quantity}</Label>
                                        <div>
                                            <Image rounded
                                                   src={require("../../assets//" + missingRessource.type + ".png")}
                                                   className="resource"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tradingScreenResources">
                            <div className="tradingScreenResourcesCol">
                                Mes ressources :
                            </div>
                            <div className="tradingScreenResourcesCol">
                                Ressources de ... :
                            </div>
                            <div className="tradingScreenResourcesCol">
                                Ressources de ... :
                            </div>
                        </div>
                        <div className="tradingScreenButtons">
                            <Button className="tradingScreenButton" bsStyle="danger" onClick={this.props.close}>Annuler</Button>
                            <Button className="tradingScreenButton" bsStyle="success">Valider</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradingScreen;