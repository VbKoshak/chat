/*jshint esversion: 8 */
const express = require('express');
const app = express();
const HELP = require('./server/secondary.js');
const DB = require("./server/db.js");
const MESSAGES = require("./server/messages.js");

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const assert = require('assert');

server.listen(3000,()=>{
    HELP.terminalLog("Listening on port 3000");
});

DB.initPool(() => {
    HELP.terminalLog("db connected");
});

let messageStorage = [];
let usersCount = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pages/index.html');
});
app.use(express.static('./public'));

io.on('connection', (socket) => {
    socket.user = {};
    socket.user.id = ++usersCount;
    socket.user.username = 'guest';
    socket.user.color = HELP.generateColor();

    HELP.terminalLog('user#' + socket.user.id + ' connected');
    socket.emit('chat history', messageStorage);

    socket.on('disconnect', function () {
        HELP.terminalLog('user#' + socket.user.id + ' disconnected');
    });

    socket.on('reconnect',() => {
        HELP.terminalLog('user#' + socket.user.id + ' reconnected');
    });

    socket.on('chat message', (msg) => {
        HELP.terminalLog("" + socket.user.id + " : " + msg);
        messageStorage.push([socket.user, msg]);
        socket.broadcast.emit('chat message', socket.user, msg);
        io.to(''+socket.id).emit('self-message', socket.user,msg);
    });

    socket.on('logIn', (login, password) => {
        DB.getInstance((db) => {
            const userCollection = db.collection('users');
            userCollection.find({
                login,
                password
            }).toArray(function (err, docs) {
                assert.equal(err, null);
                if (docs[0] === undefined) {
                    console.log(MESSAGES);
                    HELP.terminalLog(`SERVER ${socket.user.id}: ${MESSAGES.logInFail}`);
                    io.to('' + socket.id).emit('notification', HELP.systemUser, MESSAGES.logInFail);
                } else {
                    HELP.terminalLog(`SERVER ${socket.user.id}: ${MESSAGES.logInSuccess}`);
                    socket.user.username = docs[0].info.username;
                    socket.user.color = docs[0].info.color;
                    io.to('' + socket.id).emit('notification', HELP.systemUser, MESSAGES.logInSuccess);
                }
            });
        });
    });

    socket.on('register', (login, password) => {
        DB.getInstance((db) => {
            const userCollection = db.collection('users');
            userCollection.find({
                login,
                password
            }).toArray(function (err, docs) {
                assert.equal(err, null);
                if (docs.length > 0) {
                    HELP.terminalLog(`SERVER ${socket.user.id}: ${MESSAGES.registerFail}`);
                } else {
                    userCollection.insertOne(
                        HELP.createUser(login, password)
                    ).then(() => {
                        HELP.terminalLog(`SERVER ${socket.user.id}: ${MESSAGES.registerSuccess}`);
                    });
                }
            });
        });
    });
});