//客户端socket的设置
var socket = io.connect('http://localhost:8000');



var message = document.getElementById('message');
var handle = document.getElementById('handle');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

var btn = document.getElementById('send');

btn.addEventListener('click',() => {
    // 实现客户端向服务器发送数据
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })
});

// 获取从服务器发送的数据

socket.on('chat',(data) => {
    feedback.innerHTML = "";
    output.innerHTML += `<p><strong>${data.handle}:${data.message}</strong></p>`
})


// typing事件
message.addEventListener('keypress',() => {
    socket.emit('typing',handle.value);
})


// 获取从服务器广播的typing事件
socket.on('typing',(data) => {
    feedback.innerHTML = `<p><em>${data}正在输入</em></p>`;
})