import socketio from 'socket.io-client';
import { API } from '../utils/constants';

const socket = socketio(API, {
    autoConnect: false
});

const subscribeToNewDevs = (subscribeFunction) => {
    socket.on('new-dev', subscribeFunction);
};

const connect = (latitude, longitude, techs) => {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }

    socket.connect();
}

const disconnect = () => {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
} 