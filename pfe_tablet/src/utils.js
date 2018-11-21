export function getParty(ipAdress) {
    var io = require('socket.io-client');
    const socket = io.connect(ipAdress, { transports: ['websocket'], rejectUnauthorized: false });
    socket.emit('getPositions', "");
    socket.on("getPositions",(data) => {
        return data;
    })
}