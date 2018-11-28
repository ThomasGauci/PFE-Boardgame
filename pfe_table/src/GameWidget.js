import TUIOWidget from "tuiomanager/core/TUIOWidget";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';

export default class GameWidget extends TUIOWidget{
    constructor(socket, players){
        super(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        this.socket = socket;
        this.players = players;
        //this.players = [{tagId: 31, name:'TEST'}, {tagId: 62, name:'TEST2'}];
    }

    onTouchCreation(tuioTouch){
        console.log(tuioTouch);
    }

    onTagCreation(tuioTag) {
        console.log(tuioTag);
        const player = this.getPlayerWithTag(tuioTag._id);
        console.log(player);
        if (this.socket)
            ;//this.socket.emit('getInformations', {playerPosition: 1, cardId: 'B101'});
    }

    setPlayers(players){
        this.players = players;
    }

    setSocket(socket){
        this.socket = socket;
    }

    getPlayerWithTag(tag){
        for(let player of this.players){
            if(player.tagId === tag)
                return player;
        }
    }
}