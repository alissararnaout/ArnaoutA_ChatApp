// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js"; // need to tell Vue to use this - set up instance

const socket = io(); // instantiate library on the client side

// the packet is whatever data we send through with the connect event
// from the server

// this is data destructuring - look it up
function setUserId(sID) {
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
        // emit message event to the server so that it can in turn send this to anyone thta's connected
        dispatchMessage() {
            console.log('handle emit message');

            // double pip is an "or" operator
            // if first value is set - use it
            // else - use whatever comes after the operator
            socket.emit('chat_message',{
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
}).$mount("#app");

socket.addEventListener('connected', setUserId); // listen to 'connected' event on the server
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);