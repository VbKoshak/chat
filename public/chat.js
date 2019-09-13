/*jshint esversion: 6 */
//import io from 'socket.io-client';
let socket = io();

// io.on('connection',(socket) => {
//     socket.broadcast.emit('welcome message', 'I am here');
// });

document.querySelector('#button').onclick = () => {
    socket.emit('chat message', document.querySelector('#message').value);
};

socket.on('chat message', (msg) => {
    let li = document.createElement('li');
    let ml = document.querySelector('#messages');
    li.innerText = msg;
    ml.appendChild(li);
});