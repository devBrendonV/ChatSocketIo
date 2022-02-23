const express = require("express");
const app = express()
const http = require('http');
const cors = require('cors')
const {Server} = require('socket.io')
app.use(cors())
const server = http.createServer(app);

const io = new Server (server,{
    cors:{ 
        origin: 'http://localhost:3000', 
        methods: ["GET","POST"], 
    }
})

io.on('connection', (socket)=>{  
    console.log('User connected',socket.id) 

    socket.on('join_room',(data)=>{ 
        socket.join(data.sala)
        console.log(`O usuario ${data.nome}, com o id ${socket.id}, conectou na sala ${data.sala}`)
    })

    socket.on('send_message',(data)=>{
        socket.to(data.sala).emit('receive_message',data)
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected', socket.id)
    })
})
server.listen(3001, ()=>{
    console.log('Servidor online')
})

