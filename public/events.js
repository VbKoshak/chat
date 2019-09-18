/*jshint esversion: 6 */

document.querySelector('#button').onclick = () => {
    socket.emit('chat message', document.querySelector('#message').value);
    document.querySelector('#message').value = "";
};

document.querySelector('#logInButton').onclick = () => {
    socket.emit('logIn',document.querySelector('#login').value,document.querySelector('#password').value);
    document.querySelector('#password').value = "";
    document.querySelector('#login').value = "";
};

document.querySelector('#registerButton').onclick = () => {
    socket.emit('register', document.querySelector('#login').value, document.querySelector('#password').value);
    document.querySelector('#password').value = "";
    document.querySelector('#login').value = "";
};