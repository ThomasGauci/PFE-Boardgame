import React, {Component} from 'react';
import Coin from "../coin/coin";

class Coins extends Component {

    state={
        currentPurchase: -1,
        currentCoinAnimated: -1
    }
    sleep = this.sleep.bind(this);

    async componentWillReceiveProps(nextProps){
        if(nextProps.isAnimated && nextProps.action && nextProps.action.purchases){
            let purchaseIndex = 0;
            for(let purchase of nextProps.action.purchases){
                for (let i = 0; i < purchase.price; i++) {
                    this.setState({currentPurchase: purchaseIndex, currentCoinAnimated: i});
                    await this.sleep(700);
                }
                purchaseIndex++;
            }
            this.state.currentCoinAnimated = -1;
            this.state.currentPurchase = -1;
            //Animation pièce
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.action && this.props.action.purchases ?
                        this.props.action.purchases.map((purchase, index) => {
                            let result = [];
                            for(let i = 0; i < purchase.price; i++) {
                                result.push(
                                    <Coin
                                        key={i}
                                        buyer={this.props.player.position}
                                        seller={purchase.seller}
                                        isAnimated={this.state.currentPurchase === index && this.state.currentCoinAnimated === i}/>
                                );
                            }
                            return result;
                        })
                        : null
                }
            </div>
        );
    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

export default Coins;