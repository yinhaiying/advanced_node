const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();


app.set('view engine','ejs');
app.use(express.static('./public'));

// multer 设置磁盘存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
// 初始化upload
const upload = multer({
  storage:storage,
  fileFilter:function(req, file, cb){
    checkFileType(file,cb);
  },
  limits:10
}).single('myImage');

function checkFileType(file,cb){
  const fileTypes = /jpg|jpeg|png|gif/;
  // 验证扩展名
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // 验证MIME
  const mimeType = fileTypes.test(file.mimetype);
  if(extname && mimeType){
    cb(null, true);
  }else{
    cb('只支持图片格式',false);
  }
}



// 渲染index页面
app.get('/',(req,res) => {
  res.render('index')
})

//上传图片接口
app.post('/upload',(req,res) => {
  upload(req,res,(err) => {
    if(err){
      res.render('index',{
        msg:err
      })
    }else{
      if(req.file === undefined){
        res.render('index',{
          msg:'请选择上传的文件'
        })
      }else{
        res.render('index',{
          msg:'文件已上传成功',
          file:`uploads/${req.file.filename}`
        })
      }
    }
  })
})

const port = "8001";
app.listen(port,() => {console.log(`${port}端口正在运行`)});
