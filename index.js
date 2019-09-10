/*jshint esversion: 6 */

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
server.listen(3000);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log('connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


