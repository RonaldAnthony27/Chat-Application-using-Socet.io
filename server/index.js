const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io");
const { log } = require("console");
app.use(cors());

const server = http.createServer(app);//This is basicall nodejs ka server method to connect nodeJs and Socketio
const io = new Server(server, {//socket io ka server
    cors: {
        origin: "http://localhost:5173",//vite ka server 5173 pe chalta hai
        method: ["GET", "POST"]
    },

});
io.on("connection", (socket) => {
    console.log(`User connected:${socket.id}`);
    socket.on("send-message", (message) => {
        //Broadcast the mesage to all the connected users
        io.emit("recieved-message",message)
    })
    socket.on("dissconnect",()=>console.log("User disconnected"))
})
server.listen(5000,()=>console.log("server Running at port 5000"))