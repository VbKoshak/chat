document.querySelector('#button').onclick = () => {
    socket.emit('chat message', document.querySelector('#message').value);
    document.querySelector('#message').value = "";
};