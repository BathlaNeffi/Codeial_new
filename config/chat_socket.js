module.exports.chatSockets=(socketServer)=>{
    // let io= require('socket.io')(socketServer);
    let io = require("socket.io")(socketServer, {
        cors: {
          origin: ["http://127.0.0.1:8000","http://localhost:8000"],
          methods: ["GET", "POST"],
        }
      });

    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect',function(){
            // console.log('socket Disconnected!')
        });

        socket.on('join_room',function(data){
            // console.log('joining request recived!:',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data)
        });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })

    });
   
}