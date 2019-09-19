/*jshint esversion: 8 */
const help = require('./secondary.js');
const express = require('express');
const app = express();
const DB = require("./db.js");

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const assert = require('assert');

server.listen(3000);
console.log("Listening on port 3000");

DB.initPool();
console.log("db connected");

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

    console.log('user#' + socket.user.id + ' connected');
    socket.emit('chat history', messageStorage);

    socket.on('disconnect', function () {
        console.log('user#' + socket.user.id + ' disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log("" + socket.user.id + " : " + msg);
        messageStorage.push([socket.user, msg]);
        io.emit('chat message', socket.user, msg);
    });

    socket.on('logIn', (login, password) => {
        console.log(socket.id);
        DB.getInstance((db) => {
            const userCollection = db.collection('users');
            userCollection.find({
                login,
                password
            }).toArray(function (err, docs) {
                assert.equal(err, null);
                if (docs == undefined) {
                    console.log('SERVER ' + socket.user.id + ': ' + 'failed login');
                } else {
                    console.log('SERVER ' + socket.user.id + ': ' + 'login succeed');
                    socket.user.username = docs[0].info.username;
                    socket.user.color = docs[0].info.color;
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
                    console.log('SERVER ' + socket.user.id + ': ' + 'failed register');
                } else {
                    userCollection.insertOne(
                        help.createUser(login, password)
                    ).then(() => {
                        console.log('SERVER ' + socket.user.id + ': ' + 'register succeeded');
                    });
                }
            });
        });
    });
});