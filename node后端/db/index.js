const { text } = require('body-parser');
const mongoose = require('mongoose');

<<<<<<< HEAD
// 连接 MongoDB 数据库
mongoose.connect('mongodb+srv://2660023684:151416@medicalitems.5hia4.mongodb.net/MyProjects')
  .then(() => {
    console.log('连接成功');
  })
  .catch(() => {
    console.log('连接失败');
  });
=======
//此处应为共享仓库  还没整
mongoose.connect('mongodb+srv://qiusheng:Rosedale1314@public-project.avgf0.mongodb.net/project').then(() => {
    console.log('over!');
}).catch(err => {
    console.log('out');
})



>>>>>>> 8401dce89ca237daa3080cb332b9af1a52392237

// 隐患类型模式
const TypeSchema = new mongoose.Schema({
  text: String,
  value:String,
});

// 隐患类型模型
const TypeModel = mongoose.model('Type', TypeSchema, 'type');

// 上报隐患模式
const HiddenTroubleSchema = new mongoose.Schema({
  // 隐患信息
  detail: String,
  // 照片或视频
  PhotosOrVideos: String,
  // 隐患地点
  place: String,
  // 是否处理
  dispose: {
    type: Boolean,
    default: false
  },
  // 隐患类型
  type: {
    type: mongoose.Types.ObjectId,
    ref: 'Type' // 引用 Type 模型
  }
});

<<<<<<< HEAD
// 上报隐患模型
const HiddenTroubleModel = mongoose.model('HiddenTrouble', HiddenTroubleSchema, 'hidden');

module.exports = {
  HiddenTroubleModel,
  TypeModel
};
=======
module.exports = {

}

>>>>>>> 8401dce89ca237daa3080cb332b9af1a52392237
