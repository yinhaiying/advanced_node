# 基于websocket实现的一个简易聊天室

1. 创建聊天应用，渲染页面
2. 使用socket.io通信接口
3. 实现客户端发送信息
4. 实现服务端广播信息


## socket.io
socket.io需要在服务器端和客户端同时进行设置，实现双向连接：
 先从服务器端说起。服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束。
1. 服务器端初始化socket：
```javascript
const socket = require('socket.io');
const server = app.listen('8000',() => {
    console.log('服务器正在8000端口运行');
});
// 设置socket.io
const io = socket(server);  // 将server服务器传递给socket
io.on('connection',(socket) => {
    console.log('a user connected');
})
```
2. 客户端初始化socket：
客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时客户端与服务器端的连接就建立了。
```html
<script src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost:8000');
</script>
```
客户端和服务器端建立好连接之后，客户端就可以像服务器端发送数据了。
3. 客户端发送数据请求
```javascript
btn.addEventListener('click',() => {
    // 实现客户端向服务器发送数据
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })
});
```
4. 服务器端接收请求并处理请求，然后把回应数据发送给客户端。
```javascript
io.on('connection',(socket) => {
    
    // 获取从客户端发送过来的数据
    socket.on('chat',(data) => {
      io.sockets.emit('chat',data)
    });
})
```
5. 客户端读取数据
```javascript
socket.on('chat',(data) => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:${data.message}</strong></p>`
})
```


## 服务端广播事件
1. io.emit()：向所有的客户端发送数据
2. socket.broadcast.emit():向除自己以外的客户端发送数据