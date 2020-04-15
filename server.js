const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;


const io = require('socket.io')(PORT);

io.on("connection", (socket) => {
    console.log('Connection connected');
    socket.on('text', (data)=>{
        console.log(data)

        io.emit('text',data);
    });
    
socket.on("disconnect", () => {console.log("Client disconnected") })
})


if (process.env.NODE_ENV === 'production') {

    app.use(express.static('/client/build'));
}
app.get("/", (req, res) => {
    if (process.env.NODE_ENV === 'production') {

        app.use(express.static('client/build'));
    }
  });



