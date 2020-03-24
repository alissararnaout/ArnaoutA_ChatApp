// imports always go first
import ChatMessage from "./modules/ChatMessage.js";

const socket = io(); // instantiate library on the client side

// the packet is whatever data we send through with the connect event
// from the server

// this is data destructuring 
function setUserId({sID}) {
    // debugger;
    console.log(sID);
    vm.socketID = sID; 
}

function showDisconnectMessage(){
    console.log('a user disconnected');
}

function appendMessage(message) {
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: []
    },

    methods: {
        // emit a message event to the server so that it can then send this to anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');

            // double pipe || is an "or" operator
            // if first value is set, use it
            // else use whatever comes after the "or" operator
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })

            this.message = "";
        }
    },

    mounted: function() {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatMessage
    }
}).mount("#app");

socket.addEventListener('connected', setUserId); // listen to 'connected' event on the server
socket.addEventListener('disconnect', showDisconnectMessage)
socket.addEventListener('new_message', appendMessage);