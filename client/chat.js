/*jshint esversion: 6 */

import createMsg from './secondary';


let socket = io({
    autoConnect: true
});

const ml = document.querySelector('#messages');

socket.on('chat message', (user, msg) => {
    ml.appendChild(createMsg(user, msg));
});

socket.on('self-message',(user,msg) => {
    let li = createMsg(user,msg,true);
    li.classList.add('self');
    ml.appendChild(li);
})

socket.on('chat history', (msgs) => {
    for(let i in msgs){
        ml.appendChild(createMsg(msgs[i][0],msgs[i][1]));
    }
});

socket.on('notification', (user, msg) => {
    ml.appendChild(createMsg(user,msg));
})

export default socket;