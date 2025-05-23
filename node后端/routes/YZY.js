                                                                     var express = require('express');
var router = express.Router();
const multer = require("multer");
var path = require('path');
const fs = require("fs");
const uploadDir = path.join(__dirname, "/uploads");

const { HiddenTroubleModel, TypeModel, loginModel, } = require('../db/index')

// 登陆的用户接口
router.get('/login', async (req, res) => {

  let loginFind = await loginModel.find()

  res.send({
    code: 200,
    data: loginFind,

  })

})
// 上报隐患数据接口
router.get('/hidden', async (req, res) => {


  let hiddenFind = await HiddenTroubleModel.find().populate('userName')

  res.send({
    code: 200,
    data: hiddenFind,

  })
})
// 上报隐患类型数据接口
router.get('/type', async (req, res) => {

  let typeFind = await TypeModel.find()

  res.send({
    code: 200,
    data: typeFind,

  })
})
// 提交隐患
router.post('/hiddenAdd', (req, res) => {
  let add = req.body
  console.log(add.time);

  HiddenTroubleModel.create(add)

  res.send({
    code: 200,
    msg: "提交成功",

  })
})

// 大文件上传
router.post("/check", (req, res) => {
  const { fileHash } = req.body;

  const fileChunkDir = path.join(uploadDir, fileHash); // 分片存储目录
  console.log(fileChunkDir, 'asaaaadas');

  if (!fs.existsSync(fileChunkDir)) {
    return res.json([]); // 如果目录不存在，返回空数组
  }

  // 读取目录中的所有分片文件名
  const uploadedChunks = fs.readdirSync(fileChunkDir).map((chunk) => {
    return parseInt(chunk.split("-")[1]); // 提取分片索引
  });
  res.json(uploadedChunks);
  // 将接收到的信息传到前端
  res.send({
    code: 200,
    fileHashs: fileHash,

  })
});

// multer处理文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileHash = req.query.fileHash; // 并将分片存储到fileHash目录中
    const chunkDir = path.join(uploadDir, fileHash);
    // 确保切片目录存在
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }
    cb(null, chunkDir);
  },
  filename: (req, file, cb) => {
    const { chunkIndex } = req.query;
    cb(null, `chunk-${chunkIndex}`);
  },

});

const upload = multer({ storage: storage });

// 上传文件分片
router.post("/upload", upload.single("chunk"), (req, res) => {
  const { fileHash } = req.body;
  res.status(200).send("分片上传成功");
});

// 合并分片
router.post("/merge", (req, res) => {
  const { fileName, fileHash, totalChunks } = req.body;
  // console.log("fileName",req.body)
  const fileChunkDir = path.join(uploadDir, fileHash);
  const filePath = path.join(uploadDir, fileName);

  // 创建可写流用于最终合并文件
  const writeStream = fs.createWriteStream(filePath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(fileChunkDir, `chunk-${i}`);
    const data = fs.readFileSync(chunkPath); // 读取分片
    writeStream.write(data); // 写入最终文件
    // fs.unlinkSync(chunkPath); // 删除分片文件--留下来，可以看上传记录
  }

  writeStream.end(); // 关闭流
  //   fs.rmdirSync(fileChunkDir); // 删除分片目录--留下来，可以看上传记录
  res.send("文件合并完成");
});

module.exports = router;
