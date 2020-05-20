const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = requrie('path');

const app = express();


app.use(express.static(path.join(__dirname,'client')));



// 请求体解析中间件

app.use(bodyParser.json());


const port = 3000;
app.listen(port,() => {
    console.log(`服务器运行在${port}`)
})