
export function intToColor(position){
    switch (position) {
        case 1:
            return "dodgerblue";
        case 2:
            return "forestgreen";
        case 4:
            return "indianred";
        case 3:
            return "orange";
        default:
            return "white"
    }
}

export function toggleFullScreen(element) {
    var doc = window.document;
    var docEl = doc.documentElement;
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

export function exitHandler()
{

}