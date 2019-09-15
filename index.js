/*jshint esversion: 6 */

//io - server
//socket - user

const help = require('./secondary.js');

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
server.listen(3000);

let messageStorage = [];

let usersCount = 0;



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));


io.on('connection', (socket) => {

    socket.user = {};
    socket.user.id = ++usersCount;
    socket.user.username = 'guest';
    socket.user.color = help.generateColor();
    socket.user.user = {};

    console.log('user#' + socket.user.id + ' connected');
    socket.emit('chat history', messageStorage);

    socket.on('disconnect', function () {
        console.log('user#' + socket.user.id + ' disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log("" + socket.user.id + " : " + msg);
        messageStorage.push([socket.user,msg]);
        io.emit('chat message', socket.user, msg);
    });
});