import TUIOWidget from "tuiomanager/core/TUIOWidget";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';

export default class GameWidget extends TUIOWidget{
    constructor(){
        super(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    }

    onTouchCreation(tuioTouch){
        console.log(tuioTouch);
    }
}