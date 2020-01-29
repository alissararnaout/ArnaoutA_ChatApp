var express = require('express');
var app = express();

// add socket here
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// attach chat server to our app
io.attach(server);

io.on('connection', function(socket) { // socket is our connection
    console.log('a user has connected');
    socket.emit('connected', {sID: socket.id, message: "new connection"}); // this is the packet we're passing through the event

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    })
})