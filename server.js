const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const server = require('http').Server(app)

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

}


const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = require('socket.io')(server);

io.on("connection", (socket) => {
    console.log('Connection connected on port'+ PORT );
    socket.on('text', (data)=>{
        console.log(data)

        io.emit('text1',data);
    });
    
socket.on("disconnect", () => {console.log("Client disconnected") })
})




app.get('/',(req, res)=>{
    res.send("hello world")
})

server.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})






