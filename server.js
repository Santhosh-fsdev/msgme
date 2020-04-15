const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app)



const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = require('socket.io')(server);

io.on("connection", (socket) => {
    console.log('Connection connected on port'+ PORT );
    socket.on('text', (data)=>{
        console.log(data)

        io.emit('text',data);
    });
    
socket.on("disconnect", () => {console.log("Client disconnected") })
})


if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build/index.html'));

}

server.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})






