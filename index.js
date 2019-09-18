/*jshint esversion: 8 */
const help = require('./secondary.js');

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
server.listen(3000);

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'chat';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const doDatabase = (func, ...params) => {
    MongoClient.connect(
        url,
        dbOptions,
        function (err, client) {
            assert.equal(null, err);
            console.log('database connected');
            const db = client.db(dbName);
            func(db, ...params, () => {
                client.close();
                console.log('database closed');
            });
        }
    );
};

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
        doDatabase(
            help.logIn,
            (res) => {
                if (res == undefined) {
                    console.log('SERVER ' + socket.user.id + ': ' + 'failed login');
                } else {
                    console.log('SERVER ' + socket.user.id + ': ' + 'login succeed');
                    socket.user.username = res.info.username;
                    socket.user.color = res.info.color;
                }
            },
            login,
            password
        );
    });

    socket.on('register', (login, password) => {
        doDatabase(
            help.register,
            (obj) => {
                if (obj.status == 'error') {
                    console.log('SERVER ' + socket.user.id + ': ' + 'failed register');
                } else if (obj.status == 'success') {
                    console.log('SERVER ' + socket.user.id + ': ' + 'register succeeded');
                }
            },
            login,
            password
        );
    });
});