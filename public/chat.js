/*jshint esversion: 6 */
let socket = io();

const ml = document.querySelector('#messages');

socket.on('chat message', (user, msg) => {
    ml.appendChild(createMsg(user, msg));
});

socket.on('chat history', (msgs) => {
    for(let i in msgs){
        ml.appendChild(createMsg(msgs[i][0],msgs[i][1]));
    }
});