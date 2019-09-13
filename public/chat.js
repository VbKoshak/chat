/*jshint esversion: 6 */
//import io from 'socket.io-client';
let socket = io();

// io.on('connection',(socket) => {
//     socket.broadcast.emit('welcome message', 'I am here');
// });

document.querySelector('#button').onclick = () => {
    socket.emit('chat message', document.querySelector('#message').value);
};

let ml = document.querySelector('#messages');

let createMsg = (msg) => {
    let li = document.createElement('li');
    li.innerText = msg;
    return li;
};

socket.on('chat message', (msg) => {
    ml.appendChild(createMsg(msg));
});

socket.on('chat history', (msgs) => {
    for(let msg in msgs){
        ml.appendChild(createMsg(msgs[msg]));
    }
});