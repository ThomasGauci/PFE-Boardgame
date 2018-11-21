import openSocket from 'socket.io-client';

export function getParty(ipAdress) {
    console.log(ipAdress);
    const socket = openSocket(ipAdress, {transports: ['websocket', 'polling', 'flashsocket']});
    return socket.emit('getPositions', "", function (data) {
        return data;
    });
}