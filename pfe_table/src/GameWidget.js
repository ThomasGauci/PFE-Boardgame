import TUIOWidget from "tuiomanager/core/TUIOWidget";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';

export default class GameWidget extends TUIOWidget{
    constructor(socket, players, cards){
        super(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        this.socket = socket;
        this.players = players;
        this.players = [{position: 2, tagId: "A6"}]
        this.cards = cards;
    }

    onTouchCreation(tuioTouch){
        const touchX = tuioTouch._x - 1920;
        const touchY = tuioTouch._y;
        console.log("Touch on ", touchX, touchY);
        for(let card of this.cards){
            if(touchX >= card.x1 && touchX <= card.x2 && touchY >= card.y1 && touchY <= card.y2){
                console.log("Card ", card.id, " touched !");
            }
        }
    }

    onTagCreation(tuioTag) {
        const tagX = tuioTag._x - 1920;
        const tagY = tuioTag._y;
        const playerPosition = this.getPlayerPositionWithTag(tuioTag._id);
        for(let card of this.cards){
            if(tagX >= card.x1 && tagX <= card.x2 && tagY >= card.y1 && tagY <= card.y2){
                console.log("Tag", tuioTag._id, "on", card.id);
                if(this.socket && playerPosition)
                    this.socket.emit('getInformations', {position: playerPosition, id: card.id});
            }
        }
    }

    setPlayers(players){
        this.players = players;
    }

    setSocket(socket){
        this.socket = socket;
    }

    setCards(cards){
        this.cards = cards;
    }

    getPlayerPositionWithTag(tag){
        switch(tag){
            case "B3":
                return 1;
            case "B4":
                return 2;
            case "B5":
                return 3;
            case "A6":
                return 4;
            default:
                return null;
        }
    }
}