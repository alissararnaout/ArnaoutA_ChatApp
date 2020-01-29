// imports always go first - if we're importing anything

const socket = io(); // instantiate library on the client side

// the packet is whatever data we send through with the connect event
// from the server
function setUserId(packet) {
    // debugger;
    console.log(packet);
}

function showDisconnectMessage(){
    console.log('a user disconnected');
}

socket.addEventListener('connected', setUserId); // listen to 'connected' event on the server
socket.addEventListener('disconnect', showDisconnectMessage)