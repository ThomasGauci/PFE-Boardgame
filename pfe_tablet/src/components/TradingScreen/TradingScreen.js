import React, {Component} from "react";
import {Button} from "react-bootstrap";

import './TradingScreen.css'

class TradingScreen extends Component {

    render(){
        return (
            <div className="tradingScreen">
                <div className="tradingScreenContent">
                    <div className="tradingScreenBox shadow">
                        <div className="tradingScreenTitle">Il vous manque des ressources pour fabriquer cette carte. Vous pouvez en acheter à vos voisins :</div>
                        <div className="tradingScreenMissingResources">
                            Ressources manquantes:
                            <div className="missingResourcesList"></div>
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