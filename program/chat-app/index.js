const express = require('express');

const app = express();
const socketIo = require('socket.io');



const server = app.listen('8000',() => {
    console.log('服务器正在8000端口运行');
});
// 设置socket.io
const io = socketIo(server);
io.on('connection',(socket) => {
    
    // 获取从客户端发送过来的数据 聊天事件
    socket.on('chat',(data) => {
      console.log('监听chat事件')
      console.log(data);
      // io.emit会向所有的客户端发送
      io.emit('chat',data)
    });
    // 获取从客户端发送过来的数据 typing事件
    socket.on('typing',(data) => {
      // 广播事件发送给除自己以外的客户端
      socket.broadcast.emit('typing',data);
    })
})




app.use(express.static('public'));


