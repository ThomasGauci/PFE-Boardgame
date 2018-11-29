import React, {Component} from "react";

import './CardDetails.css'
import {X} from "react-feather";

class CardDetails extends Component {

    render(){
        return (
            <div className="cardInfos">
                <div className="cardInfosContent">
                    <div className="cardInfosBox">
                        <X className="cardInfosClose" color={"white"} size={40} onClick={this.props.close}/>
                        <img className="cardInfosCard" src={require(`../../assets/cards/${this.props.card.id}.jpg`)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardDetails;