import socketio from 'socket.io-client';

const socket = socketio('http://localhost:8000/');

export default socket;
