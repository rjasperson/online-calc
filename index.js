const SocketIO = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = SocketIO(server);

var clients = [];

server.listen(PORT, () => {
    console.log("server up");
});

io.on("connection", (client) => {
    console.log("new client");
    clients.push(client);

    client.on("calculate", (message) => {
        console.log("new calculate");
        result = Math.floor(+eval(message.input)); //calculation on server side to update table for all clients

        console.log(message);
        console.log(result);

        for(var i = 0; i < clients.length; i++){
            
            clients[i].emit("new_result", {input: message.input, result: result});           
        }
    });

});

console.log("init finished");